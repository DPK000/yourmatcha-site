/**
 * BUQE Commerce — vendored package.
 * Source of truth: https://github.com/DPK000/buqe-commerce
 *
 * Per-shop config in `/buqe.config.ts`. Geen UI in deze map — alleen logica/hooks/types.
 */

export { supabase } from "./supabase";
export { useBuqeCheckout } from "./useCheckout";
export { useBuqePaymentIntent, updateBuqeOrder } from "./useBuqePaymentIntent";
export { BuqeStripeElements } from "./BuqeStripeElements";
export type { CheckoutCustomer, CheckoutLineItem, CheckoutPayload, OrderStatus } from "./types";
export type { BuqeConfig } from "./config";
