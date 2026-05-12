import { type ReactNode, useMemo } from "react";
import { loadStripe, type Stripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { buqeConfig } from "../../../buqe.config";

let stripePromise: Promise<Stripe | null> | null = null;
function getStripe() {
  if (!stripePromise) {
    const key = buqeConfig.payments.stripe.publicKey;
    if (!key) {
      console.error("[BUQE Commerce] VITE_STRIPE_PUBLIC_KEY ontbreekt — voeg toe aan .env");
      return null;
    }
    stripePromise = loadStripe(key);
  }
  return stripePromise;
}

interface Props {
  clientSecret: string;
  children: ReactNode;
  /** Override Stripe Element appearance theme (zie Stripe docs). Default = matcht buqe.config.brand */
  appearance?: Parameters<typeof Elements>[0]["options"] extends infer O
    ? O extends { appearance?: infer A }
      ? A
      : never
    : never;
}

/**
 * Wrapt children in Stripe `<Elements>` provider met clientSecret + branded theming.
 * Gebruik in je Checkout-page direct rond de `<PaymentElement />` (uit @stripe/react-stripe-js).
 *
 * Voorbeeld:
 *   <BuqeStripeElements clientSecret={clientSecret}>
 *     <PaymentElement />
 *   </BuqeStripeElements>
 */
export function BuqeStripeElements({ clientSecret, appearance, children }: Props) {
  const stripe = getStripe();

  const options = useMemo(
    () => ({
      clientSecret,
      appearance:
        appearance ?? {
          theme: "flat" as const,
          variables: {
            colorPrimary: buqeConfig.brand.primaryColor,
            colorBackground: "#ffffff",
            colorText: "#1a1a1a",
            fontFamily: "system-ui, -apple-system, sans-serif",
            borderRadius: "8px",
            fontSizeBase: "14px",
          },
        },
    }),
    [clientSecret, appearance]
  );

  if (!stripe) return null;

  return (
    <Elements stripe={stripe} options={options}>
      {children}
    </Elements>
  );
}
