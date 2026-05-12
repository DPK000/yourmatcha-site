// BUQE Commerce — verifieer PaymentIntent na redirect terug op /bedankt.
// Checkt status bij Stripe, update order naar "paid", triggert send-order-email.

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

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    if (!STRIPE_SECRET_KEY) throw new Error("STRIPE_SECRET_KEY not configured");
    if (!SUPABASE_SERVICE_ROLE_KEY) throw new Error("SUPABASE_SERVICE_ROLE_KEY not configured");

    const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: "2024-12-18.acacia" });
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const { paymentIntentId } = (await req.json()) as { paymentIntentId: string };
    if (!paymentIntentId) throw new Error("Missing paymentIntentId");

    const pi = await stripe.paymentIntents.retrieve(paymentIntentId);
    const orderId = pi.metadata?.order_id;
    if (!orderId) throw new Error("PaymentIntent missing order_id metadata");

    const isPaid = pi.status === "succeeded";
    const isProcessing = pi.status === "processing";

    const newStatus = isPaid ? "paid" : isProcessing ? "processing" : "pending";

    const { data: order, error: updateErr } = await supabase
      .from("orders")
      .update({
        status: newStatus,
        updated_at: new Date().toISOString(),
      })
      .eq("id", orderId)
      .select("*, order_items(*)")
      .single();

    if (updateErr) throw new Error(updateErr.message);

    await supabase.from("order_activity_log").insert({
      order_id: orderId,
      action: `payment_${pi.status}`,
      description: `Stripe PaymentIntent ${pi.id} → ${pi.status}`,
    });

    if (isPaid && order) {
      try {
        await supabase.functions.invoke("send-order-email", {
          body: {
            orderId,
            type: "confirmation",
            email: order.email,
            firstName: order.first_name,
            orderNumber: order.order_number,
          },
        });
      } catch (emailErr) {
        console.error("[stripe-verify-payment-intent] email invoke failed", emailErr);
      }
    }

    return new Response(
      JSON.stringify({
        status: pi.status,
        paid: isPaid,
        processing: isProcessing,
        orderNumber: order?.order_number,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error("[stripe-verify-payment-intent]", msg);
    return new Response(JSON.stringify({ error: msg }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
