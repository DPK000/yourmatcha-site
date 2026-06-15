import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Leaf, Hand, Droplet } from "lucide-react";
import SEO from "@/components/SEO";
import ScrollReveal from "@/components/ScrollReveal";
import { useLang } from "@/i18n";
import originHero from "@/assets/origin-hero.jpg";
import originFarmer from "@/assets/origin-farmer.jpg";
import originStonemill from "@/assets/origin-stonemill.jpg";

const COPY = {
  nl: {
    seoTitle: "Herkomst — Onze matcha uit Uji, Kyoto",
    seoDescription:
      "Ontdek de reis van onze ceremoniële matcha: van de beschaduwde theevelden in Uji tot de traditionele steenmolens. Single-origin, biologisch en met respect voor traditie.",
    heroAlt: "Theeplantage in Uji, Japan bij zonsopgang",
    heroEyebrow: "Uji, Kyoto · Japan",
    heroTitleLine1: "Van de mistige",
    heroTitleLine2: "heuvels van Uji",
    heroSubtitle: "Acht eeuwen vakmanschap, drie generaties theeboeren — één pakje matcha.",
    introEyebrow: "Single Origin",
    introTitlePart1: "Eén regio. ",
    introTitlePart2: "Eén filosofie.",
    introText:
      "Onze matcha komt uit één regio in Japan: Uji, in de prefectuur Kyoto. Deze plek is sinds de 12e eeuw het epicentrum van Japanse theecultuur. De combinatie van koele ochtendmist, vulkanische grond en eeuwenoude vakkennis maakt Uji-matcha onnavolgbaar in smaak en kleur.",
    farmersBadge: "De boeren",
    farmersTitlePart1: "Familie Tanaka — ",
    farmersTitlePart2: "drie generaties theekunst",
    farmersP1:
      "We werken direct samen met de familie Tanaka, die al sinds 1948 tencha (de basis voor matcha) telen op een klein perceel van 2,8 hectare. Geen tussenpersonen, geen bulk inkoop — gewoon een eerlijke prijs voor uitzonderlijk werk.",
    farmersP2:
      "Elk jaar in de eerste week van mei plukken zij met de hand alleen de drie jongste, zachtste blaadjes. Deze \"ichibancha\" (eerste oogst) vormt de basis van onze ceremonial grade matcha.",
    farmerAlt: "Theeboer plukt verse blaadjes",
    processEyebrow: "Het proces",
    processTitlePart1: "Van blad ",
    processTitlePart2: "tot poeder",
    stepLabel: "Stap",
    steps: [
      { title: "Beschaduwen", desc: "20 dagen voor de oogst worden de planten met handgeweven netten beschaduwd. Dit verhoogt het chlorofyl en de L-theanine." },
      { title: "Handpluk", desc: "Alleen de drie jongste blaadjes worden geplukt — in de eerste week van mei, bij dauw." },
      { title: "Stomen & drogen", desc: "Binnen uren worden de blaadjes gestoomd, gedroogd en ontdaan van stelen. Dit wordt 'tencha' genoemd." },
      { title: "Steenmolen", desc: "Granieten ishi-usu molens malen 1 uur per 30 gram — voor het allerfijnste poeder." },
    ],
    millBadge: "⏱ 1 uur per 30 gram",
    millAlt: "Granieten steenmolen voor matcha",
    millTitlePart1: "De traagste, ",
    millTitlePart2: "mooiste manier",
    millText:
      "Een traditionele granieten ishi-usu molen draait slechts 30 toeren per minuut. Sneller draaien betekent warmte — en warmte verbrandt de delicate aroma's. Daarom kiezen we bewust voor langzaam: één molen produceert per uur slechts 30 gram matcha. Maar elke korrel is een microscopische 5 micron.",
    cta: "Ontdek onze matcha",
  },
  no: {
    seoTitle: "Opprinnelse — Vår matcha fra Uji, Kyoto",
    seoDescription:
      "Følg reisen til vår seremonielle matcha: fra de skyggelagte temarkene i Uji til de tradisjonelle steinkvernene. Single origin, økologisk og med dyp respekt for tradisjonen.",
    heroAlt: "Teplantasje i Uji, Japan ved soloppgang",
    heroEyebrow: "Uji, Kyoto · Japan",
    heroTitleLine1: "Fra de tåkekledde",
    heroTitleLine2: "åsene i Uji",
    heroSubtitle: "Åtte århundrer med håndverk, tre generasjoner tebønder — én pose matcha.",
    introEyebrow: "Single origin",
    introTitlePart1: "Én region. ",
    introTitlePart2: "Én filosofi.",
    introText:
      "Matchaen vår kommer fra én eneste region i Japan: Uji, i prefekturet Kyoto. Stedet har vært episenteret for japansk tekultur siden 1100-tallet. Kombinasjonen av kjølig morgentåke, vulkansk jord og århundregammel fagkunnskap gjør Uji-matcha uforlignelig i smak og farge.",
    farmersBadge: "Bøndene",
    farmersTitlePart1: "Familien Tanaka — ",
    farmersTitlePart2: "tre generasjoner tekunst",
    farmersP1:
      "Vi samarbeider direkte med familien Tanaka, som siden 1948 har dyrket tencha (grunnlaget for matcha) på et lite jorde på 2,8 hektar. Ingen mellomledd, ingen bulkinnkjøp — bare en rettferdig pris for eksepsjonelt arbeid.",
    farmersP2:
      "Hvert år, i den første uken av mai, plukker de for hånd kun de tre yngste og mykeste bladene. Denne \"ichibanchaen\" (førstehøsten) danner grunnlaget for vår ceremonial grade matcha.",
    farmerAlt: "Tebonde plukker friske blader",
    processEyebrow: "Prosessen",
    processTitlePart1: "Fra blad ",
    processTitlePart2: "til pulver",
    stepLabel: "Steg",
    steps: [
      { title: "Skyggelegging", desc: "20 dager før innhøsting skyggelegges plantene med håndvevde nett. Det øker innholdet av klorofyll og L-theanin." },
      { title: "Håndplukking", desc: "Kun de tre yngste bladene plukkes — i den første uken av mai, mens duggen fortsatt ligger." },
      { title: "Damping og tørking", desc: "I løpet av få timer dampes og tørkes bladene, og stilkene fjernes. Resultatet kalles 'tencha'." },
      { title: "Steinkvern", desc: "Ishi-usu-kverner av granitt maler i 1 time per 30 gram — for det aller fineste pulveret." },
    ],
    millBadge: "⏱ 1 time per 30 gram",
    millAlt: "Steinkvern av granitt for matcha",
    millTitlePart1: "Den langsomste, ",
    millTitlePart2: "vakreste måten",
    millText:
      "En tradisjonell ishi-usu-kvern av granitt roterer bare 30 omdreininger i minuttet. Raskere rotasjon betyr varme — og varme brenner bort de delikate aromaene. Derfor velger vi bevisst det langsomme: én kvern produserer bare 30 gram matcha i timen. Til gjengjeld er hvert korn mikroskopiske 5 mikron.",
    cta: "Utforsk matchaen vår",
  },
};

const stepIcons = [Droplet, Hand, Leaf, MapPin];

const Origin = () => {
  const lang = useLang();
  const c = COPY[lang === "no" ? "no" : "nl"];

  return (
    <>
      <SEO
        title={c.seoTitle}
        description={c.seoDescription}
        canonical="/herkomst"
        image="/og-default.jpg"
      />

      {/* Hero */}
      <section className="relative h-[80vh] min-h-[560px] flex items-end overflow-hidden">
        <img
          src={originHero}
          alt={c.heroAlt}
          className="absolute inset-0 w-full h-full object-cover"
          width={1920}
          height={1280}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-24 max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 text-cream/80 text-[10px] tracking-[0.4em] uppercase mb-4"
          >
            <MapPin className="w-3 h-3" /> {c.heroEyebrow}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="font-heading text-5xl md:text-7xl font-light text-cream leading-[1.05]"
          >
            {c.heroTitleLine1}<br />
            <span className="italic">{c.heroTitleLine2}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-cream/85 text-lg md:text-xl max-w-xl mt-6 leading-relaxed"
          >
            {c.heroSubtitle}
          </motion.p>
        </div>
      </section>

      {/* Story intro */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
          <ScrollReveal>
            <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-4">{c.introEyebrow}</p>
            <h2 className="font-heading text-3xl md:text-5xl font-light leading-tight mb-6">
              {c.introTitlePart1}<span className="italic">{c.introTitlePart2}</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {c.introText}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* The farmers */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            <ScrollReveal>
              <span className="inline-flex items-center gap-2 text-xs tracking-wide bg-primary/10 text-primary px-3 py-1.5 rounded-full mb-5 font-medium">
                <Hand className="w-3 h-3" /> {c.farmersBadge}
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-light leading-tight mb-5">
                {c.farmersTitlePart1}<span className="italic">{c.farmersTitlePart2}</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {c.farmersP1}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {c.farmersP2}
              </p>
            </ScrollReveal>
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="aspect-[4/3] rounded-2xl overflow-hidden order-first md:order-last"
            >
              <img src={originFarmer} alt={c.farmerAlt} className="w-full h-full object-cover" loading="lazy" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-14 max-w-2xl mx-auto">
            <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3">{c.processEyebrow}</p>
            <h2 className="font-heading text-3xl md:text-5xl font-light leading-tight">
              {c.processTitlePart1}<span className="italic">{c.processTitlePart2}</span>
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {c.steps.map((s, i) => {
              const Icon = stepIcons[i];
              return (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="bg-secondary rounded-2xl p-6 text-center"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-1">{c.stepLabel} {i + 1}</p>
                  <h3 className="font-heading text-xl font-semibold mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stone mill */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="aspect-[4/3] rounded-2xl overflow-hidden"
            >
              <img src={originStonemill} alt={c.millAlt} className="w-full h-full object-cover" loading="lazy" />
            </motion.div>
            <ScrollReveal>
              <span className="inline-flex items-center gap-2 text-xs tracking-wide bg-primary-foreground/10 text-primary-foreground/80 px-3 py-1.5 rounded-full mb-5">
                {c.millBadge}
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-light leading-tight mb-5">
                {c.millTitlePart1}<span className="italic">{c.millTitlePart2}</span>
              </h2>
              <p className="text-primary-foreground/80 leading-relaxed mb-6">
                {c.millText}
              </p>
              <Link
                to="/shop?category=matcha-powder"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground text-sm font-bold rounded-full tracking-wide uppercase hover:scale-105 transition-transform"
              >
                {c.cta} <ArrowRight className="w-4 h-4" />
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
};

export default Origin;
