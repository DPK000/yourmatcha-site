import { useState } from "react";
import { supabase } from "./supabase";
import { buqeConfig } from "../../../buqe.config";
import type { CheckoutCustomer, CheckoutLineItem } from "./types";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

interface StartCheckoutArgs {
  items: CheckoutLineItem[];
  customer: CheckoutCustomer;
  subtotal: number;
  shipping: number;
  total: number;
}

interface StartCheckoutResult {
  orderId: string;
  orderNumber: string;
}

interface StartCheckoutError {
  message: string;
}

/**
 * BUQE Commerce checkout hook.
 *
 * 1. Slaat order op in Supabase (status: pending) + order_items
 * 2. Roept Edge Function `stripe-create-checkout` aan
 * 3. Redirect naar Stripe Checkout hosted page
 *
 * Geen UI — returnt enkel state + functies. UI in de shop blijft hetzelfde.
 */
export function useBuqeCheckout() {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startCheckout = async (args: StartCheckoutArgs): Promise<StartCheckoutResult | StartCheckoutError> => {
    setSubmitting(true);
    setError(null);

    try {
      const orderNumber = generateOrderNumber(buqeConfig.brand.slug);

      const { data: order, error: orderErr } = await supabase
        .from("orders")
        .insert({
          order_number: orderNumber,
          email: args.customer.email,
          first_name: args.customer.firstName,
          last_name: args.customer.lastName,
          phone: args.customer.phone || null,
          address: args.customer.address,
          city: args.customer.city,
          postal_code: args.customer.postalCode,
          country: args.customer.country,
          status: "pending",
          payment_method: "stripe",
          subtotal: args.subtotal,
          shipping: args.shipping,
          total: args.total,
        })
        .select()
        .single();

      if (orderErr || !order) {
        throw new Error(orderErr?.message || "Order kon niet worden aangemaakt");
      }

      const orderItems = args.items.map((it) => ({
        order_id: order.id,
        product_id: it.productId && UUID_RE.test(it.productId) ? it.productId : null,
        product_name: it.name,
        product_image: it.image,
        price: it.price,
        quantity: it.quantity,
      }));

      const { error: itemsErr } = await supabase.from("order_items").insert(orderItems);
      if (itemsErr) throw new Error(itemsErr.message);

      const { data: session, error: fnErr } = await supabase.functions.invoke(
        "stripe-create-checkout",
        {
          body: {
            orderId: order.id,
            orderNumber: order.order_number,
            items: args.items,
            shipping: args.shipping,
            currency: buqeConfig.currency.default.toLowerCase(),
            customerEmail: args.customer.email,
            successUrl: `${window.location.origin}/checkout/success?order=${order.order_number}`,
            cancelUrl: `${window.location.origin}/checkout?cancelled=1`,
          },
        }
      );

      if (fnErr || !session?.url) {
        throw new Error(fnErr?.message || "Kon Stripe checkout niet starten");
      }

      window.location.href = session.url;

      return { orderId: order.id, orderNumber: order.order_number };
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Onbekende fout bij afrekenen";
      console.error("[BUQE Checkout] error:", e);
      setError(msg);
      setSubmitting(false);
      return { message: msg };
    }
  };

  return { startCheckout, submitting, error };
}

function generateOrderNumber(slug: string): string {
  const date = new Date();
  const yymmdd = `${String(date.getFullYear()).slice(2)}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`;
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `${slug.toUpperCase().slice(0, 3)}-${yymmdd}-${rand}`;
}
