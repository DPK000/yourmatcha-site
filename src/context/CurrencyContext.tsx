import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { useTranslation } from "react-i18next";

export type Currency = "EUR" | "NOK";

export const currencies: { code: Currency; label: string; symbol: string }[] = [
  { code: "EUR", label: "Euro (€)", symbol: "€" },
  { code: "NOK", label: "Norske kroner (kr)", symbol: "kr" },
];

/** Vaste weergavekoers — betaling gebeurt altijd in EUR via Stripe. */
export const EUR_TO_NOK = 11.5;

const STORAGE_KEY = "yourmatcha-currency";

const defaultForLang = (lang: string): Currency => (lang?.startsWith("no") ? "NOK" : "EUR");

interface CurrencyContextValue {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  /** Converteert een EUR-basisbedrag naar de actieve valuta. */
  convert: (eur: number) => number;
  /** Formatteert een EUR-basisbedrag in de actieve valuta. */
  format: (eur: number) => string;
}

const CurrencyContext = createContext<CurrencyContextValue | undefined>(undefined);

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const { i18n } = useTranslation();
  const [currency, setCurrencyState] = useState<Currency>(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
    if (stored === "EUR" || stored === "NOK") return stored;
    return defaultForLang(i18n.language || "nl");
  });

  // Geen expliciete keuze? Volg de taal (Noors → NOK, anders EUR).
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored !== "EUR" && stored !== "NOK") {
      setCurrencyState(defaultForLang(i18n.language || "nl"));
    }
  }, [i18n.language]);

  const value = useMemo<CurrencyContextValue>(() => {
    const convert = (eur: number) => (currency === "NOK" ? Math.round(eur * EUR_TO_NOK) : eur);
    const locale = currency === "NOK" ? "nb-NO" : i18n.language || "nl-NL";
    const formatter = new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      ...(currency === "NOK" ? { maximumFractionDigits: 0 } : {}),
    });
    return {
      currency,
      setCurrency: (c: Currency) => {
        localStorage.setItem(STORAGE_KEY, c);
        setCurrencyState(c);
      },
      convert,
      format: (eur: number) => formatter.format(convert(eur)),
    };
  }, [currency, i18n.language]);

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
};

export const useCurrency = (): CurrencyContextValue => {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used within CurrencyProvider");
  return ctx;
};
