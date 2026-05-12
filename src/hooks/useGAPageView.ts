import { useEffect } from "react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    gtag?: (command: string, target: string, config?: Record<string, unknown>) => void;
  }
}

/**
 * Fire GA4 page_view event op elke route change in de React SPA.
 * Standaard tracked GA alleen de initial page load — voor SPA's moeten we 't zelf doen.
 * `send_page_view: false` in index.html voorkomt dubbele tracking op first load.
 */
export function useGAPageView() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    if (typeof window.gtag !== "function") return;
    window.gtag("event", "page_view", {
      page_path: pathname + search,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname, search]);
}
