import { useEffect } from "react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    fbq?: (
      command: string,
      event: string,
      params?: Record<string, unknown>
    ) => void;
  }
}

/** Waarde-events die Meta nodig heeft om conversies aan advertenties te koppelen. */
export interface PixelProduct {
  id: string;
  name: string;
  price: number;
  quantity?: number;
}

/**
 * Vuurt een Meta-standaardevent af. Faalt stil wanneer de pixel niet geladen is
 * (adblocker, of een omgeving zonder pixel) - tracking mag de winkel nooit breken.
 */
export function trackPixel(event: string, params?: Record<string, unknown>): void {
  if (typeof window.fbq !== "function") return;
  window.fbq("track", event, params);
}

/** Zet productgegevens om naar de vorm die Meta verwacht. */
const contentParams = (products: PixelProduct[], currency: string) => ({
  content_type: "product",
  content_ids: products.map(p => p.id),
  contents: products.map(p => ({ id: p.id, quantity: p.quantity ?? 1 })),
  value: Number(
    products.reduce((sum, p) => sum + p.price * (p.quantity ?? 1), 0).toFixed(2)
  ),
  currency,
});

export const trackViewContent = (product: PixelProduct, currency: string) =>
  trackPixel("ViewContent", {
    ...contentParams([product], currency),
    content_name: product.name,
  });

export const trackAddToCart = (product: PixelProduct, currency: string) =>
  trackPixel("AddToCart", {
    ...contentParams([product], currency),
    content_name: product.name,
  });

export const trackInitiateCheckout = (products: PixelProduct[], currency: string) =>
  trackPixel("InitiateCheckout", {
    ...contentParams(products, currency),
    num_items: products.reduce((n, p) => n + (p.quantity ?? 1), 0),
  });

export const trackPurchase = (
  products: PixelProduct[],
  currency: string,
  orderId?: string
) =>
  trackPixel("Purchase", {
    ...contentParams(products, currency),
    ...(orderId ? { order_id: orderId } : {}),
  });

/**
 * Vuurt PageView bij elke route change in de SPA. De base-code in index.html
 * doet bewust géén PageView, zodat de eerste paginaweergave niet dubbel telt -
 * zelfde opzet als useGAPageView.
 */
export function useMetaPixelPageView() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    trackPixel("PageView");
  }, [pathname, search]);
}
