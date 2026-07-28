import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { useTranslation } from "react-i18next";

export type Currency = "EUR" | "NOK";

export const currencies: { code: Currency; label: string; symbol: string }[] = [
  { code: "EUR", label: "Euro (€)", symbol: "€" },
  { code: "NOK", label: "Norske kroner (kr)", symbol: "kr" },
];

/** Vaste koers voor NOK-prijzen — de checkout rekent ook in NOK af. */
export const EUR_TO_NOK = 11.5;

/** Gratis-verzenddrempel en verzendkosten per valuta. Eén bron van waarheid. */
export const FREE_SHIPPING_EUR = 35;
export const SHIPPING_COST_EUR = 4.95;
export const FREE_SHIPPING_NOK = 400;
export const SHIPPING_COST_NOK = 59;

/**
 * Nette Noorse prijzen: rond af naar het dichtstbijzijnde bedrag dat op 9 eindigt
 * (218,5 kr → 219 kr). Alleen voor stuksprijzen — totalen worden opgebouwd uit
 * afgeronde stuksprijzen zodat wat de klant ziet exact is wat wordt afgerekend.
 */
const charmNOK = (nok: number) => {
  if (nok < 20) return Math.max(1, Math.round(nok));
  return Math.round((nok + 1) / 10) * 10 - 1;
};

const STORAGE_KEY = "yourmatcha-currency";

const defaultForLang = (lang: string): Currency => (lang?.startsWith("no") ? "NOK" : "EUR");

interface CurrencyContextValue {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  /** Lineaire koers naar de actieve valuta (1 voor EUR). Voor drempels en vaste kortingen. */
  rate: number;
  /** Converteert een EUR-stuksprijs naar de actieve valuta (charm-afgerond voor NOK). */
  convert: (eur: number) => number;
  /** Formatteert een EUR-stuksprijs in de actieve valuta. */
  format: (eur: number) => string;
  /** Formatteert een bedrag dat al in de actieve valuta staat (bv. totalen). */
  formatAmount: (amount: number) => string;
  /** Gratis-verzenddrempel in de actieve valuta. */
  freeShippingThreshold: number;
  /** Verzendkosten in de actieve valuta. */
  shippingCost: number;
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
    const isNOK = currency === "NOK";
    const rate = isNOK ? EUR_TO_NOK : 1;
    const convert = (eur: number) => (isNOK ? charmNOK(eur * EUR_TO_NOK) : eur);
    const locale = isNOK ? "nb-NO" : i18n.language || "nl-NL";
    const formatter = new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      ...(isNOK ? { maximumFractionDigits: 0 } : {}),
    });
    const formatAmount = (amount: number) => formatter.format(isNOK ? Math.round(amount) : amount);
    return {
      currency,
      setCurrency: (c: Currency) => {
        localStorage.setItem(STORAGE_KEY, c);
        setCurrencyState(c);
      },
      rate,
      convert,
      format: (eur: number) => formatter.format(convert(eur)),
      formatAmount,
      freeShippingThreshold: isNOK ? FREE_SHIPPING_NOK : FREE_SHIPPING_EUR,
      shippingCost: isNOK ? SHIPPING_COST_NOK : SHIPPING_COST_EUR,
    };
  }, [currency, i18n.language]);

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
};

export const useCurrency = (): CurrencyContextValue => {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used within CurrencyProvider");
  return ctx;
};
