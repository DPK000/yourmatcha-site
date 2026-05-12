// BUQE Commerce — Stripe Checkout Session creation.
// Reads STRIPE_SECRET_KEY from env. Creates a hosted Stripe Checkout Session
// and returns the URL for client redirect.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0?target=deno";

const STRIPE_SECRET_KEY = Deno.env.get("STRIPE_SECRET_KEY") || "";

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
  orderId: string;
  orderNumber: string;
  items: LineItem[];
  shipping: number;
  currency: string;
  customerEmail: string;
  successUrl: string;
  cancelUrl: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    if (!STRIPE_SECRET_KEY) throw new Error("STRIPE_SECRET_KEY not configured");

    const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: "2024-12-18.acacia" });

    const body = (await req.json()) as RequestBody;

    const isWebUrl = (u?: string) => !!u && /^https?:\/\//i.test(u);

    const line_items = body.items.map((it) => ({
      price_data: {
        currency: body.currency,
        product_data: {
          name: it.name,
          images: isWebUrl(it.image) ? [it.image] : undefined,
        },
        unit_amount: Math.round(it.price * 100),
      },
      quantity: it.quantity,
    }));

    if (body.shipping > 0) {
      line_items.push({
        price_data: {
          currency: body.currency,
          product_data: { name: "Verzending" },
          unit_amount: Math.round(body.shipping * 100),
        },
        quantity: 1,
      });
    }

    // Append session_id placeholder so client can verify on return
    const successUrl = body.successUrl.includes("session_id=")
      ? body.successUrl
      : `${body.successUrl}${body.successUrl.includes("?") ? "&" : "?"}session_id={CHECKOUT_SESSION_ID}`;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      customer_email: body.customerEmail,
      success_url: successUrl,
      cancel_url: body.cancelUrl,
      metadata: {
        order_id: body.orderId,
        order_number: body.orderNumber,
      },
      payment_intent_data: {
        metadata: {
          order_id: body.orderId,
          order_number: body.orderNumber,
        },
      },
    });

    return new Response(JSON.stringify({ url: session.url, sessionId: session.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return new Response(JSON.stringify({ error: msg }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
