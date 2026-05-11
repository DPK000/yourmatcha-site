import { motion } from "framer-motion";
import { Truck, Leaf, Heart, Sparkles } from "lucide-react";

const items = [
  { icon: Truck, text: "Gratis verzending vanaf €35" },
  { icon: Sparkles, text: "Levering binnen 48 uur in NL & BE" },
  { icon: Leaf, text: "100% biologisch uit Uji, Japan" },
  { icon: Heart, text: "30 dagen niet goed, geld terug" },
];

const AnnouncementBar = () => {
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
