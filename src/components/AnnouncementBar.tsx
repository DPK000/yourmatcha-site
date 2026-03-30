import { motion } from "framer-motion";

const messages = [
  "🍵 GRATIS VERZENDING BOVEN €35",
  "🚚 SNELLE LEVERING IN NL & BE",
  "🌿 100% CEREMONIËLE KWALITEIT",
  "✨ BESPAAR 15% MET EEN ABONNEMENT",
];

const AnnouncementBar = () => {
  const doubled = [...messages, ...messages];

  return (
    <div className="bg-primary text-primary-foreground py-2 overflow-hidden">
      <motion.div
        className="flex whitespace-nowrap gap-8"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((msg, i) => (
          <span key={i} className="text-xs font-medium tracking-widest px-4">
            {msg}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default AnnouncementBar;
