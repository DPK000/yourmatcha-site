// BUQE Commerce — Stripe PaymentIntent creation voor embedded checkout.
// Maakt draft-order in DB (status: pending) + PaymentIntent met order metadata,
// retourneert clientSecret zodat client Stripe Payment Element kan tonen.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import Stripe from "https://esm.sh/stripe@14.21.0?target=deno";

const STRIPE_SECRET_KEY = Deno.env.get("STRIPE_SECRET_KEY") || "";
const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface LineItem {
  productId?: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

interface RequestBody {
  items: LineItem[];
  email: string;
  subtotal: number;
  shipping: number;
  total: number;
  currency: string;
  shopSlug: string;
  discountCode?: string;
}

// Moet gelijk blijven aan EUR_TO_NOK in src/context/CurrencyContext.tsx
const EUR_TO_NOK = 11.5;

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function generateOrderNumber(slug: string): string {
  const d = new Date();
  const yymmdd = `${String(d.getFullYear()).slice(2)}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `${slug.toUpperCase().slice(0, 3)}-${yymmdd}-${rand}`;
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    if (!STRIPE_SECRET_KEY) throw new Error("STRIPE_SECRET_KEY not configured");
    if (!SUPABASE_SERVICE_ROLE_KEY) throw new Error("SUPABASE_SERVICE_ROLE_KEY not configured");

    const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: "2024-12-18.acacia" });
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const body = (await req.json()) as RequestBody;
    const orderNumber = generateOrderNumber(body.shopSlug || "shop");

    // Alleen expliciet ondersteunde valuta accepteren; alles anders valt terug op EUR
    const SUPPORTED_CURRENCIES = ["eur", "nok"];
    const currency = SUPPORTED_CURRENCIES.includes((body.currency || "").toLowerCase())
      ? body.currency.toLowerCase()
      : "eur";

    // 1) Kortingscode server-side valideren — de bedragen van de client zijn niet leidend.
    //    Bedragen in de body staan in de betaalvaluta; discount_value/min_order staan in EUR.
    const rate = currency === "nok" ? EUR_TO_NOK : 1;
    let discountAmount = 0;
    let appliedCode: string | null = null;
    if (body.discountCode) {
      const codeInput = body.discountCode.trim().replace(/[%_]/g, "");
      const { data: dc } = await supabase
        .from("discount_codes")
        .select("code, discount_type, discount_value, min_order, max_uses, uses, enabled, expires_at")
        .ilike("code", codeInput)
        .maybeSingle();

      const subtotalEur = body.subtotal / rate;
      const isValid = dc && dc.enabled &&
        (!dc.expires_at || new Date(dc.expires_at) > new Date()) &&
        (dc.max_uses == null || dc.uses < dc.max_uses) &&
        subtotalEur >= (dc.min_order ?? 0);

      if (isValid) {
        appliedCode = dc.code;
        if (dc.discount_type === "percentage") {
          discountAmount = (body.subtotal * dc.discount_value) / 100;
        } else if (dc.discount_type === "fixed") {
          discountAmount = dc.discount_value * rate;
        } else if (dc.discount_type === "free_shipping") {
          discountAmount = body.shipping;
        }
        discountAmount = Math.round(Math.min(discountAmount, body.subtotal + body.shipping) * 100) / 100;
      }
    }

    // Stripe accepteert geen bedragen onder ±€0,50
    const total = Math.max(0.5, Math.round((body.subtotal + body.shipping - discountAmount) * 100) / 100);

    // 2) Draft order in DB
    const { data: order, error: orderErr } = await supabase
      .from("orders")
      .insert({
        order_number: orderNumber,
        email: body.email,
        first_name: "",
        last_name: "",
        address: "",
        city: "",
        postal_code: "",
        country: "NL",
        status: "pending",
        payment_method: "stripe",
        subtotal: body.subtotal,
        shipping: body.shipping,
        discount_code: appliedCode,
        discount_amount: discountAmount,
        total,
        currency: currency.toUpperCase(),
      })
      .select()
      .single();

    if (orderErr || !order) throw new Error(orderErr?.message || "Order insert failed");

    // 3) Order items
    const orderItems = body.items.map((it) => ({
      order_id: order.id,
      product_id: it.productId && UUID_RE.test(it.productId) ? it.productId : null,
      product_name: it.name,
      product_image: it.image,
      price: it.price,
      quantity: it.quantity,
    }));
    const { error: itemsErr } = await supabase.from("order_items").insert(orderItems);
    if (itemsErr) throw new Error(itemsErr.message);

    // 4) PaymentIntent met automatic_payment_methods (toont iDEAL/Klarna/Card/etc automatisch
    //    afhankelijk van wat in Stripe Dashboard staat geactiveerd)
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(total * 100),
      currency,
      automatic_payment_methods: { enabled: true },
      receipt_email: body.email,
      metadata: {
        order_id: order.id,
        order_number: order.order_number,
      },
    });

    // 5) Link payment_intent_id terug naar order
    await supabase
      .from("orders")
      .update({ payment_intent_id: paymentIntent.id })
      .eq("id", order.id);

    return new Response(
      JSON.stringify({
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
        orderId: order.id,
        orderNumber: order.order_number,
        discountCode: appliedCode,
        discountAmount,
        total,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error("[stripe-create-payment-intent]", msg);
    return new Response(JSON.stringify({ error: msg }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
