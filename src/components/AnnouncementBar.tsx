import { motion } from "framer-motion";
import { Truck, Leaf, Heart, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useCurrency } from "@/context/CurrencyContext";

const ITEMS = [
  { key: "freeShipping", icon: Truck },
  { key: "delivery", icon: Sparkles },
  { key: "organic", icon: Leaf },
  { key: "guarantee", icon: Heart },
] as const;

const AnnouncementBar = () => {
  const { t, i18n } = useTranslation();
  const { currency, freeShippingThreshold } = useCurrency();

  // Drempel zonder decimalen: "€35" leest prettiger dan "€35,00" in een balk.
  const threshold = new Intl.NumberFormat(currency === "NOK" ? "nb-NO" : i18n.language || "nl-NL", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(freeShippingThreshold);

  const items = ITEMS.map(({ key, icon }) => ({
    icon,
    text: t(`announcement.${key}`, { amount: threshold }),
  }));
  // Drie kopieën: de animatie loopt tot -33,333% en sluit dan naadloos aan.
  const tripled = [...items, ...items, ...items];

  return (
    <div className="bg-primary text-primary-foreground py-2 overflow-hidden border-b border-primary/20">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-33.333%"] }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
      >
        {tripled.map((item, i) => (
          <span key={i} className="flex items-center gap-2 px-8 text-[11px] font-medium tracking-[0.18em] uppercase">
            <item.icon className="w-3.5 h-3.5 opacity-80" />
            {item.text}
            <span className="ml-8 opacity-30">·</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default AnnouncementBar;
