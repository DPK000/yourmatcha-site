/**
 * BUQE Commerce config voor YourMatcha.
 * Centrale plek voor brand/payment/Supabase/email settings.
 * UI styling staat NIET hier — die zit in tailwind.config.ts en index.css.
 */

import type { BuqeConfig } from "@/lib/buqe-commerce/config";

export const buqeConfig: BuqeConfig = {
  brand: {
    name: "YourMatcha",
    slug: "yourmatcha",
    domain: "yourmatcha.com",
    logoUrl: "https://yourmatcha.com/logo.png",
    primaryColor: "#3D6B53",
  },

  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL || "https://exniwwddrdreihvwjokq.supabase.co",
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || "",
  },

  payments: {
    stripe: {
      enabled: true,
      publicKey: import.meta.env.VITE_STRIPE_PUBLIC_KEY || "",
      mode: (import.meta.env.VITE_STRIPE_MODE as "test" | "live") || "test",
    },
    paypal: {
      enabled: false,
      clientId: "",
      mode: "sandbox",
    },
  },

  email: {
    fromName: "YourMatcha",
    fromEmail: "orders@yourmatcha.com",
    replyTo: "hello@yourmatcha.com",
    siteUrl: "https://yourmatcha.com",
  },

  currency: {
    default: "EUR",
    supported: ["EUR", "NOK"],
  },

  shipping: {
    freeShippingThreshold: 50,
    defaultRate: 4.95,
  },
};
