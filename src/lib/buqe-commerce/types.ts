/**
 * BUQE Commerce types — gedeeld tussen client en Edge Functions.
 */

export interface CheckoutLineItem {
  productId?: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export interface CheckoutCustomer {
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface CheckoutPayload {
  items: CheckoutLineItem[];
  customer: CheckoutCustomer;
  subtotal: number;
  shipping: number;
  total: number;
  currency: string;
  /** Origin URL voor return/cancel pages */
  origin: string;
}

export type OrderStatus =
  | "pending"
  | "paid"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded";
