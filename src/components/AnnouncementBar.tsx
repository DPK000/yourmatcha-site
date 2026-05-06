import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const AnnouncementBar = () => {
  const { t } = useTranslation();
  const messages = t("announcement", { returnObjects: true }) as string[];
  const doubled = [...messages, ...messages];

  return (
    <div className="bg-primary text-primary-foreground py-2 overflow-hidden">
      <motion.div
        className="flex whitespace-nowrap gap-8"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
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
