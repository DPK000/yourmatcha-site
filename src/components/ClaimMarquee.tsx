import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

/**
 * Doorlopende claim-band in donkergroen. Breekt de reeks lichte secties op de
 * homepage en geeft de pagina ritme. Elke claim heeft een cursief accentwoord,
 * in lijn met de koppen elders op de site.
 *
 * Puur decoratief: aria-hidden, zodat schermlezers de herhaling niet voorlezen.
 */
const CLAIM_KEYS = ["claim1", "claim2", "claim3", "claim4"] as const;

const ClaimMarquee = () => {
  const { t } = useTranslation();
  // Drie kopieën: de animatie loopt tot -33,333% en sluit dan naadloos aan.
  const claims = CLAIM_KEYS.map(k => ({
    lead: t(`home.${k}Lead`),
    accent: t(`home.${k}Accent`),
  }));
  const tripled = [...claims, ...claims, ...claims];

  return (
    <div className="bg-primary text-primary-foreground py-7 md:py-9 overflow-hidden" aria-hidden="true">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-33.333%"] }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
      >
        {tripled.map((claim, i) => (
          <span
            key={i}
            className="font-heading text-2xl md:text-4xl font-semibold flex items-center shrink-0"
          >
            <span className="px-8 md:px-12">
              {claim.lead} <span className="italic font-light">{claim.accent}</span>
            </span>
            <span className="text-primary-foreground/30 text-lg">·</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default ClaimMarquee;
