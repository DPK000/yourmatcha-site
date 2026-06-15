import i18n from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import nl from "./locales/nl";
import en from "./locales/en";
import de from "./locales/de";
import fr from "./locales/fr";
import no from "./locales/no";

const hostnameLang = (() => {
  if (typeof window === "undefined") return null;
  const h = window.location.hostname.toLowerCase();
  if (h.endsWith(".de") || h === "yourmatcha.de") return "de";
  if (h.endsWith(".fr") || h === "yourmatcha.fr") return "fr";
  if (h.endsWith(".no") || h === "yourmatcha.no") return "no";
  if (h.endsWith(".com") || h === "yourmatcha.com") return "en";
  if (h.endsWith(".nl") || h === "yourmatcha.nl") return "nl";
  return null;
})();

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      nl: { translation: nl },
      en: { translation: en },
      de: { translation: de },
      fr: { translation: fr },
      no: { translation: no },
    },
    lng: hostnameLang ?? undefined,
    fallbackLng: "nl",
    supportedLngs: ["nl", "en", "de", "fr", "no"],
    interpolation: { escapeValue: false },
    detection: {
      order: hostnameLang ? ["querystring"] : ["localStorage", "navigator"],
      caches: ["localStorage"],
      lookupLocalStorage: "yourmatcha-lang",
    },
  });

export default i18n;

export const languages = [
  { code: "nl", label: "Nederlands", short: "NL", flag: "🇳🇱" },
  { code: "en", label: "English", short: "EN", flag: "🇬🇧" },
  { code: "de", label: "Deutsch", short: "DE", flag: "🇩🇪" },
  { code: "fr", label: "Français", short: "FR", flag: "🇫🇷" },
  { code: "no", label: "Norsk", short: "NO", flag: "🇳🇴" },
] as const;

export type Lang = "nl" | "en" | "de" | "fr" | "no";

export const getCurrentLang = (): Lang => {
  const code = (i18n.language || "nl").slice(0, 2);
  if (code === "en" || code === "de" || code === "fr" || code === "no") return code;
  return "nl";
};

/** Reactieve variant van getCurrentLang — re-rendert bij taalwissel. */
export const useLang = (): Lang => {
  const { i18n: inst } = useTranslation();
  void inst.language;
  return getCurrentLang();
};

export type Localized<T = string> = T | { nl: T; de?: T; en?: T; fr?: T; no?: T };

export const tr = <T,>(field: Localized<T> | undefined, lang: Lang): T | undefined => {
  if (field === null || field === undefined) return undefined;
  if (typeof field === "object" && field !== null && "nl" in (field as Record<string, unknown>)) {
    const obj = field as { nl: T; de?: T; en?: T; fr?: T; no?: T };
    return obj[lang] ?? obj.nl;
  }
  return field as T;
};
