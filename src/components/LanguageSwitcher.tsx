import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { Globe, Check } from "lucide-react";
import { languages, type Lang } from "@/i18n";
import { translatePath } from "@/i18n/routes";
import { currencies, useCurrency } from "@/context/CurrencyContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const LABELS: Record<string, { currency: string; aria: string }> = {
  nl: { currency: "Valuta", aria: "Taal en valuta kiezen" },
  en: { currency: "Currency", aria: "Choose language and currency" },
  de: { currency: "Währung", aria: "Sprache und Währung wählen" },
  fr: { currency: "Devise", aria: "Choisir la langue et la devise" },
  no: { currency: "Valuta", aria: "Velg språk og valuta" },
};

const LanguageSwitcher = ({ minimal = false }: { minimal?: boolean }) => {
  const { i18n } = useTranslation();
  const { currency, setCurrency } = useCurrency();
  const current = languages.find(l => l.code === i18n.language.split("-")[0]) ?? languages[0];
  const labels = LABELS[current.code] ?? LABELS.nl;

  const location = useLocation();
  const navigate = useNavigate();

  /** Wisselt van taal én springt naar dezelfde pagina in die taal, zodat de
   *  URL de taal blijft weerspiegelen (/no/butikk i.p.v. /nl/shop). */
  const change = (code: string) => {
    i18n.changeLanguage(code);
    const target = translatePath(location.pathname, code as Lang);
    navigate(target + location.search + location.hash, { replace: true });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium text-foreground/70 hover:text-primary hover:bg-secondary transition-colors focus:outline-none"
        aria-label={labels.aria}
      >
        <Globe className="w-3.5 h-3.5" />
        {!minimal && (
          <span className="tracking-wide hidden sm:inline">
            {current.short} · {currency}
          </span>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[180px]">
        {languages.map(l => (
          <DropdownMenuItem
            key={l.code}
            onClick={() => change(l.code)}
            className="flex items-center justify-between gap-3 cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <span className="text-base leading-none">{l.flag}</span>
              <span>{l.label}</span>
            </span>
            {current.code === l.code && <Check className="w-3.5 h-3.5 text-primary" />}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="text-xs font-medium text-muted-foreground">{labels.currency}</DropdownMenuLabel>
        {currencies.map(c => (
          <DropdownMenuItem
            key={c.code}
            onClick={() => setCurrency(c.code)}
            className="flex items-center justify-between gap-3 cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <span className="w-5 text-center text-muted-foreground">{c.symbol}</span>
              <span>{c.code}</span>
            </span>
            {currency === c.code && <Check className="w-3.5 h-3.5 text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
