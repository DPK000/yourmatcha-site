import { useEffect, useState } from "react";
import { supabase } from "./supabase";
import { buqeConfig } from "../../../buqe.config";
import type { CheckoutLineItem } from "./types";

interface UseBuqePaymentIntentArgs {
  items: CheckoutLineItem[];
  email: string;
  subtotal: number;
  shipping: number;
  total: number;
  /** ISO-valutacode (bv. "eur" of "nok"). Bedragen moeten in deze valuta zijn. Default: buqeConfig.currency.default */
  currency?: string;
  /** Re-create when this changes (bv. total verandert door discount). Default: items+total fingerprint */
  recreateKey?: string;
}

interface PaymentIntentState {
  clientSecret: string | null;
  orderId: string | null;
  orderNumber: string | null;
  loading: boolean;
  error: string | null;
}

/**
 * Maakt een draft order + PaymentIntent zodra email + items + total bekend zijn.
 * Returnt clientSecret zodat `<Elements>` de Stripe Payment Element kan tonen.
 *
 * Note: roept Edge Function `stripe-create-payment-intent` aan die order in DB schrijft.
 */
export function useBuqePaymentIntent(args: UseBuqePaymentIntentArgs): PaymentIntentState {
  const [state, setState] = useState<PaymentIntentState>({
    clientSecret: null,
    orderId: null,
    orderNumber: null,
    loading: false,
    error: null,
  });

  const currency = (args.currency ?? buqeConfig.currency.default).toLowerCase();

  const fingerprint =
    args.recreateKey ??
    `${args.email}|${currency}|${args.total.toFixed(2)}|${args.items.length}|${args.items.map(i => `${i.name}x${i.quantity}`).join(",")}`;

  useEffect(() => {
    if (!args.email || args.items.length === 0 || args.total <= 0) return;

    let cancelled = false;
    setState((s) => ({ ...s, loading: true, error: null }));

    (async () => {
      try {
        const { data, error } = await supabase.functions.invoke("stripe-create-payment-intent", {
          body: {
            items: args.items,
            email: args.email,
            subtotal: args.subtotal,
            shipping: args.shipping,
            total: args.total,
            currency,
            shopSlug: buqeConfig.brand.slug,
          },
        });
        if (cancelled) return;
        if (error || !data?.clientSecret) {
          throw new Error(error?.message || "Kon betaling niet voorbereiden");
        }
        setState({
          clientSecret: data.clientSecret,
          orderId: data.orderId,
          orderNumber: data.orderNumber,
          loading: false,
          error: null,
        });
      } catch (e) {
        if (cancelled) return;
        const msg = e instanceof Error ? e.message : "Onbekende fout";
        console.error("[useBuqePaymentIntent]", msg);
        setState((s) => ({ ...s, loading: false, error: msg }));
      }
    })();

    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fingerprint]);

  return state;
}

/**
 * Update een draft order met klantgegevens vlak voor stripe.confirmPayment.
 * Aanroepen op submit, vóór confirmPayment.
 */
export async function updateBuqeOrder(orderId: string, customer: {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}) {
  const { error } = await supabase.functions.invoke("stripe-update-order", {
    body: { orderId, ...customer },
  });
  if (error) throw new Error(error.message);
}
