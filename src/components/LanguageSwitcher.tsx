import { useTranslation } from "react-i18next";
import { Globe, Check } from "lucide-react";
import { languages } from "@/i18n";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const LanguageSwitcher = ({ minimal = false }: { minimal?: boolean }) => {
  const { i18n } = useTranslation();
  const current = languages.find(l => l.code === i18n.language.split("-")[0]) ?? languages[0];

  const change = (code: string) => {
    i18n.changeLanguage(code);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium text-foreground/70 hover:text-primary hover:bg-secondary transition-colors focus:outline-none"
        aria-label="Taal kiezen"
      >
        <Globe className="w-3.5 h-3.5" />
        {!minimal && <span className="tracking-wide hidden sm:inline">{current.short}</span>}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[160px]">
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
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
