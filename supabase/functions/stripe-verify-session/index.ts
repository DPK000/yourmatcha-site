// BUQE Commerce — Stripe Checkout Session verification.
// Called by client when returning from Stripe Checkout. Verifies payment status,
// updates order row to "paid", invokes send-order-email.

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

    const { sessionId } = (await req.json()) as { sessionId: string };
    if (!sessionId) throw new Error("Missing sessionId");

    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const orderId = session.metadata?.order_id;
    if (!orderId) throw new Error("Stripe session missing order_id metadata");

    const isPaid = session.payment_status === "paid";

    const { data: order, error: updateErr } = await supabase
      .from("orders")
      .update({
        status: isPaid ? "paid" : "pending",
        payment_intent_id: typeof session.payment_intent === "string" ? session.payment_intent : null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", orderId)
      .select("*, order_items(*)")
      .single();

    if (updateErr) throw new Error(updateErr.message);

    if (isPaid) {
      // Log
      await supabase.from("order_activity_log").insert({
        order_id: orderId,
        action: "payment_received",
        description: `Stripe payment captured (session ${sessionId})`,
      });

      // Trigger confirmation email — fire-and-forget but await for visibility in Sprint 1
      try {
        await supabase.functions.invoke("send-order-email", {
          body: { orderId, type: "confirmation" },
        });
      } catch (emailErr) {
        console.error("[stripe-verify-session] email invoke failed", emailErr);
      }
    }

    return new Response(
      JSON.stringify({
        paid: isPaid,
        orderNumber: order?.order_number,
        order,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return new Response(JSON.stringify({ error: msg }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
