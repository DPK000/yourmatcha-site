import { Truck, ShieldCheck, RotateCcw, Leaf } from "lucide-react";
import { motion } from "framer-motion";
import { useLang } from "@/i18n";

const COPY = {
  nl: [
    { icon: Truck, label: "Gratis verzending", sub: "Boven €35" },
    { icon: Leaf, label: "100% Biologisch", sub: "Ceremoniële kwaliteit" },
    { icon: RotateCcw, label: "14 dagen", sub: "Retourgarantie" },
    { icon: ShieldCheck, label: "Veilig betalen", sub: "iDEAL & meer" },
  ],
  no: [
    { icon: Truck, label: "Gratis frakt", sub: "Over 400 kr" },
    { icon: Leaf, label: "100 % økologisk", sub: "Seremoniell kvalitet" },
    { icon: RotateCcw, label: "14 dager", sub: "Returgaranti" },
    { icon: ShieldCheck, label: "Trygg betaling", sub: "Kort & mer" },
  ],
} as const;

const TrustBadges = () => {
  const lang = useLang();
  const badges = lang === "no" ? COPY.no : COPY.nl;

  return (
    <section className="py-6 border-b border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {badges.map((badge, i) => (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="flex items-center gap-3 justify-center py-3"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <badge.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground leading-tight">{badge.label}</p>
                <p className="text-xs text-muted-foreground">{badge.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
