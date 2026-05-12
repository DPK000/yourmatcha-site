// Re-export shim: admin pages importeren uit `@/lib/supabase`, BUQE Commerce levert
// de daadwerkelijke client. Eén bestand zodat we geen 15 imports hoeven te wijzigen.

export { supabase } from "./buqe-commerce/supabase";

// Type re-exports voor admin pages die `DbProduct` / `DbOrder` etc. importeren
export interface DbProduct {
  id: string;
  name: string;
  slug: string;
  category: "main" | "accessories" | "bundle";
  price: number;
  original_price?: number;
  image: string;
  description: string;
  short_description: string;
  rating: number;
  review_count: number;
  badge?: string;
  in_stock: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface DbOrder {
  id: string;
  order_number: string;
  email: string;
  first_name: string;
  last_name: string;
  address: string;
  city: string;
  postal_code: string;
  country: string;
  phone?: string;
  status: "pending" | "paid" | "processing" | "shipped" | "delivered" | "cancelled" | "refunded";
  payment_method?: string;
  payment_intent_id?: string;
  paypal_order_id?: string;
  paypal_capture_id?: string;
  subtotal: number;
  shipping: number;
  discount_amount?: number;
  discount_code?: string;
  total: number;
  notes?: string;
  tracking_code?: string;
  tracking_number?: string;
  tracking_carrier?: string;
  refund_reason?: string;
  created_at: string;
  updated_at?: string;
  order_items?: DbOrderItem[];
}

export interface DbOrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product_name: string;
  product_image: string;
  price: number;
  quantity: number;
  created_at: string;
}
