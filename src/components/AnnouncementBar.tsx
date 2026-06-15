import { motion } from "framer-motion";
import { Truck, Leaf, Heart, Sparkles } from "lucide-react";
import { useLang } from "@/i18n";

const COPY = {
  nl: [
    "Gratis verzending vanaf €35",
    "Levering binnen 48 uur in NL & BE",
    "100% biologisch uit Uji, Japan",
    "30 dagen niet goed, geld terug",
  ],
  no: [
    "Gratis frakt over 400 kr",
    "Rask levering",
    "100 % økologisk fra Uji, Japan",
    "30 dagers åpent kjøp",
  ],
} as const;

const icons = [Truck, Sparkles, Leaf, Heart];

const AnnouncementBar = () => {
  const lang = useLang();
  const texts = lang === "no" ? COPY.no : COPY.nl;
  const items = texts.map((text, i) => ({ icon: icons[i], text }));
  const doubled = [...items, ...items, ...items];

  return (
    <div className="bg-primary text-primary-foreground py-2 overflow-hidden border-b border-primary/20">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-33.333%"] }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((item, i) => (
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
