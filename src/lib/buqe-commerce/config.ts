/**
 * BUQE Commerce config type — re-export voor gebruik in buqe.config.ts.
 * Origineel staat in de buqe-commerce repo (buqe.config.example.ts).
 */

export interface BuqeConfig {
  brand: {
    name: string;
    slug: string;
    domain: string;
    logoUrl: string;
    primaryColor: string;
  };
  supabase: {
    url: string;
    anonKey: string;
  };
  payments: {
    stripe: {
      enabled: boolean;
      publicKey: string;
      mode: "test" | "live";
    };
    paypal: {
      enabled: boolean;
      clientId: string;
      mode: "sandbox" | "live";
    };
  };
  email: {
    fromName: string;
    fromEmail: string;
    replyTo?: string;
    siteUrl: string;
  };
  currency: {
    default: string;
    supported: string[];
  };
  shipping: {
    freeShippingThreshold: number;
    defaultRate: number;
  };
}
