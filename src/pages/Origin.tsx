import { motion } from "framer-motion";
import { Link } from "@/components/LocalizedLink";
import { ArrowRight, MapPin, Leaf, Hand, Droplet } from "lucide-react";
import SEO from "@/components/SEO";
import ScrollReveal from "@/components/ScrollReveal";
import { useLang } from "@/i18n";
import originHero from "@/assets/origin-hero.webp";
import originFarmer from "@/assets/origin-farmer.webp";
import originStonemill from "@/assets/origin-stonemill.webp";

const COPY = {
  nl: {
    seoTitle: "Herkomst - Onze matcha uit Uji, Kyoto",
    seoDescription:
      "Ontdek de reis van onze ceremoniële matcha: van de beschaduwde theevelden in Uji tot de traditionele steenmolens. Single-origin, biologisch en met respect voor traditie.",
    heroAlt: "Theeplantage in Uji, Japan bij zonsopgang",
    heroEyebrow: "Uji, Kyoto · Japan",
    heroTitleLine1: "Van de mistige",
    heroTitleLine2: "heuvels van Uji",
    heroSubtitle: "Acht eeuwen vakmanschap, drie generaties theeboeren - één pakje matcha.",
    introEyebrow: "Single Origin",
    introTitlePart1: "Eén regio. ",
    introTitlePart2: "Eén filosofie.",
    introText:
      "Onze matcha komt uit één regio in Japan: Uji, in de prefectuur Kyoto. Deze plek is sinds de 12e eeuw het epicentrum van Japanse theecultuur. De combinatie van koele ochtendmist, vulkanische grond en eeuwenoude vakkennis maakt Uji-matcha onnavolgbaar in smaak en kleur.",
    farmersBadge: "De boeren",
    farmersTitlePart1: "Familie Tanaka - ",
    farmersTitlePart2: "drie generaties theekunst",
    farmersP1:
      "We werken direct samen met de familie Tanaka, die al sinds 1948 tencha (de basis voor matcha) telen op een klein perceel van 2,8 hectare. Geen tussenpersonen, geen bulk inkoop - gewoon een eerlijke prijs voor uitzonderlijk werk.",
    farmersP2:
      "Elk jaar in de eerste week van mei plukken zij met de hand alleen de drie jongste, zachtste blaadjes. Deze \"ichibancha\" (eerste oogst) vormt de basis van onze ceremonial grade matcha.",
    farmerAlt: "Theeboer plukt verse blaadjes",
    processEyebrow: "Het proces",
    processTitlePart1: "Van blad ",
    processTitlePart2: "tot poeder",
    stepLabel: "Stap",
    steps: [
      { title: "Beschaduwen", desc: "20 dagen voor de oogst worden de planten met handgeweven netten beschaduwd. Dit verhoogt het chlorofyl en de L-theanine." },
      { title: "Handpluk", desc: "Alleen de drie jongste blaadjes worden geplukt - in de eerste week van mei, bij dauw." },
      { title: "Stomen & drogen", desc: "Binnen uren worden de blaadjes gestoomd, gedroogd en ontdaan van stelen. Dit wordt 'tencha' genoemd." },
      { title: "Steenmolen", desc: "Granieten ishi-usu molens malen 1 uur per 30 gram - voor het allerfijnste poeder." },
    ],
    millBadge: "⏱ 1 uur per 30 gram",
    millAlt: "Granieten steenmolen voor matcha",
    millTitlePart1: "De traagste, ",
    millTitlePart2: "mooiste manier",
    millText:
      "Een traditionele granieten ishi-usu molen draait slechts 30 toeren per minuut. Sneller draaien betekent warmte - en warmte verbrandt de delicate aroma's. Daarom kiezen we bewust voor langzaam: één molen produceert per uur slechts 30 gram matcha. Maar elke korrel is een microscopische 5 micron.",
    cta: "Ontdek onze matcha",
  },
  en: {
    seoTitle: "Origin - Our matcha from Uji, Kyoto",
    seoDescription:
      "Follow the journey of our ceremonial matcha: from the shaded tea fields of Uji to the traditional stone mills. Single-origin, organic and made with respect for tradition.",
    heroAlt: "Tea plantation in Uji, Japan at sunrise",
    heroEyebrow: "Uji, Kyoto · Japan",
    heroTitleLine1: "From the misty",
    heroTitleLine2: "hills of Uji",
    heroSubtitle: "Eight centuries of craft, three generations of tea farmers - one pouch of matcha.",
    introEyebrow: "Single Origin",
    introTitlePart1: "One region. ",
    introTitlePart2: "One philosophy.",
    introText:
      "Our matcha comes from a single region in Japan: Uji, in Kyoto prefecture. This place has been the epicentre of Japanese tea culture since the 12th century. Cool morning mist, volcanic soil and centuries-old expertise make Uji matcha unmatched in flavour and colour.",
    farmersBadge: "The farmers",
    farmersTitlePart1: "The Tanaka family - ",
    farmersTitlePart2: "three generations of tea craft",
    farmersP1:
      "We work directly with the Tanaka family, who have grown tencha (the base for matcha) on a small 2.8-hectare plot since 1948. No middlemen, no bulk buying - just a fair price for exceptional work.",
    farmersP2:
      "Every year in the first week of May they hand-pick only the three youngest, softest leaves. This \"ichibancha\" (first harvest) forms the base of our ceremonial grade matcha.",
    farmerAlt: "Tea farmer picking fresh leaves",
    processEyebrow: "The process",
    processTitlePart1: "From leaf ",
    processTitlePart2: "to powder",
    stepLabel: "Step",
    steps: [
      { title: "Shading", desc: "20 days before harvest the plants are shaded with hand-woven nets. This raises chlorophyll and L-theanine." },
      { title: "Hand picking", desc: "Only the three youngest leaves are picked - in the first week of May, while the dew is still on them." },
      { title: "Steaming & drying", desc: "Within hours the leaves are steamed, dried and stripped of stems. The result is called 'tencha'." },
      { title: "Stone mill", desc: "Granite ishi-usu mills grind for 1 hour per 30 grams - for the very finest powder." },
    ],
    millBadge: "⏱ 1 hour per 30 grams",
    millAlt: "Granite stone mill for matcha",
    millTitlePart1: "The slowest, ",
    millTitlePart2: "finest way",
    millText:
      "A traditional granite ishi-usu mill turns at just 30 revolutions per minute. Turning faster means heat - and heat burns off the delicate aromas. So we deliberately choose slow: one mill produces only 30 grams of matcha per hour. But every particle is a microscopic 5 microns.",
    cta: "Discover our matcha",
  },
  de: {
    seoTitle: "Herkunft - Unser Matcha aus Uji, Kyoto",
    seoDescription:
      "Entdecke die Reise unseres zeremoniellen Matcha: von den beschatteten Teefeldern in Uji bis zu den traditionellen Steinmühlen. Single Origin, biologisch und mit Respekt vor der Tradition.",
    heroAlt: "Teeplantage in Uji, Japan bei Sonnenaufgang",
    heroEyebrow: "Uji, Kyoto · Japan",
    heroTitleLine1: "Aus den nebligen",
    heroTitleLine2: "Hügeln von Uji",
    heroSubtitle: "Acht Jahrhunderte Handwerk, drei Generationen Teebauern - eine Packung Matcha.",
    introEyebrow: "Single Origin",
    introTitlePart1: "Eine Region. ",
    introTitlePart2: "Eine Philosophie.",
    introText:
      "Unser Matcha stammt aus einer einzigen Region in Japan: Uji in der Präfektur Kyoto. Dieser Ort ist seit dem 12. Jahrhundert das Epizentrum der japanischen Teekultur. Kühler Morgennebel, vulkanischer Boden und jahrhundertealtes Fachwissen machen Uji-Matcha unnachahmlich in Geschmack und Farbe.",
    farmersBadge: "Die Bauern",
    farmersTitlePart1: "Familie Tanaka - ",
    farmersTitlePart2: "drei Generationen Teekunst",
    farmersP1:
      "Wir arbeiten direkt mit der Familie Tanaka zusammen, die seit 1948 Tencha (die Basis für Matcha) auf einer kleinen Parzelle von 2,8 Hektar anbaut. Keine Zwischenhändler, kein Masseneinkauf - einfach ein fairer Preis für außergewöhnliche Arbeit.",
    farmersP2:
      "Jedes Jahr in der ersten Maiwoche pflücken sie von Hand nur die drei jüngsten, zartesten Blätter. Dieses \"Ichibancha\" (erste Ernte) bildet die Basis unseres zeremoniellen Matcha.",
    farmerAlt: "Teebauer pflückt frische Blätter",
    processEyebrow: "Der Prozess",
    processTitlePart1: "Vom Blatt ",
    processTitlePart2: "zum Pulver",
    stepLabel: "Schritt",
    steps: [
      { title: "Beschattung", desc: "20 Tage vor der Ernte werden die Pflanzen mit handgewebten Netzen beschattet. Das erhöht Chlorophyll und L-Theanin." },
      { title: "Handpflückung", desc: "Nur die drei jüngsten Blätter werden gepflückt - in der ersten Maiwoche, im Morgentau." },
      { title: "Dämpfen & Trocknen", desc: "Innerhalb weniger Stunden werden die Blätter gedämpft, getrocknet und entstielt. Das Ergebnis heißt 'Tencha'." },
      { title: "Steinmühle", desc: "Granitene Ishi-usu-Mühlen mahlen 1 Stunde pro 30 Gramm - für das allerfeinste Pulver." },
    ],
    millBadge: "⏱ 1 Stunde pro 30 Gramm",
    millAlt: "Granitsteinmühle für Matcha",
    millTitlePart1: "Der langsamste, ",
    millTitlePart2: "schönste Weg",
    millText:
      "Eine traditionelle Ishi-usu-Mühle aus Granit dreht sich mit nur 30 Umdrehungen pro Minute. Schneller drehen bedeutet Wärme - und Wärme verbrennt die feinen Aromen. Deshalb wählen wir bewusst langsam: eine Mühle produziert pro Stunde nur 30 Gramm Matcha. Dafür ist jedes Korn mikroskopisch feine 5 Mikrometer.",
    cta: "Entdecke unseren Matcha",
  },
  fr: {
    seoTitle: "Origine - Notre matcha d'Uji, Kyoto",
    seoDescription:
      "Découvrez le parcours de notre matcha cérémoniel : des champs de thé ombragés d'Uji aux meules de pierre traditionnelles. Single origin, bio et respectueux de la tradition.",
    heroAlt: "Plantation de thé à Uji, Japon au lever du soleil",
    heroEyebrow: "Uji, Kyoto · Japon",
    heroTitleLine1: "Des collines",
    heroTitleLine2: "brumeuses d'Uji",
    heroSubtitle: "Huit siècles de savoir-faire, trois générations de producteurs - un sachet de matcha.",
    introEyebrow: "Single Origin",
    introTitlePart1: "Une région. ",
    introTitlePart2: "Une philosophie.",
    introText:
      "Notre matcha provient d'une seule région du Japon : Uji, dans la préfecture de Kyoto. Ce lieu est l'épicentre de la culture du thé japonaise depuis le XIIe siècle. La brume matinale fraîche, le sol volcanique et un savoir séculaire rendent le matcha d'Uji inimitable en goût et en couleur.",
    farmersBadge: "Les producteurs",
    farmersTitlePart1: "La famille Tanaka - ",
    farmersTitlePart2: "trois générations d'art du thé",
    farmersP1:
      "Nous travaillons directement avec la famille Tanaka, qui cultive le tencha (la base du matcha) sur une petite parcelle de 2,8 hectares depuis 1948. Aucun intermédiaire, aucun achat en gros - juste un prix équitable pour un travail d'exception.",
    farmersP2:
      "Chaque année, la première semaine de mai, ils cueillent à la main uniquement les trois feuilles les plus jeunes et les plus tendres. Cet \"ichibancha\" (première récolte) constitue la base de notre matcha cérémoniel.",
    farmerAlt: "Producteur cueillant des feuilles fraîches",
    processEyebrow: "Le processus",
    processTitlePart1: "De la feuille ",
    processTitlePart2: "à la poudre",
    stepLabel: "Étape",
    steps: [
      { title: "Ombrage", desc: "20 jours avant la récolte, les théiers sont ombragés avec des filets tissés à la main. Cela augmente la chlorophylle et la L-théanine." },
      { title: "Cueillette à la main", desc: "Seules les trois plus jeunes feuilles sont cueillies - la première semaine de mai, à la rosée." },
      { title: "Étuvage & séchage", desc: "En quelques heures, les feuilles sont étuvées, séchées et débarrassées de leurs tiges. On obtient le 'tencha'." },
      { title: "Meule de pierre", desc: "Les meules ishi-usu en granit broient 1 heure pour 30 grammes - pour la poudre la plus fine qui soit." },
    ],
    millBadge: "⏱ 1 heure pour 30 grammes",
    millAlt: "Meule de pierre en granit pour le matcha",
    millTitlePart1: "La façon la plus lente, ",
    millTitlePart2: "la plus belle",
    millText:
      "Une meule ishi-usu traditionnelle en granit tourne à seulement 30 tours par minute. Tourner plus vite génère de la chaleur - et la chaleur brûle les arômes délicats. Nous choisissons donc délibérément la lenteur : une meule ne produit que 30 grammes de matcha par heure. Mais chaque particule mesure 5 microns.",
    cta: "Découvrir notre matcha",
  },
  no: {
    seoTitle: "Opprinnelse - Vår matcha fra Uji, Kyoto",
    seoDescription:
      "Følg reisen til vår seremonielle matcha: fra de skyggelagte temarkene i Uji til de tradisjonelle steinkvernene. Single origin, økologisk og med dyp respekt for tradisjonen.",
    heroAlt: "Teplantasje i Uji, Japan ved soloppgang",
    heroEyebrow: "Uji, Kyoto · Japan",
    heroTitleLine1: "Fra de tåkekledde",
    heroTitleLine2: "åsene i Uji",
    heroSubtitle: "Åtte århundrer med håndverk, tre generasjoner tebønder - én pose matcha.",
    introEyebrow: "Single origin",
    introTitlePart1: "Én region. ",
    introTitlePart2: "Én filosofi.",
    introText:
      "Matchaen vår kommer fra én eneste region i Japan: Uji, i prefekturet Kyoto. Stedet har vært episenteret for japansk tekultur siden 1100-tallet. Kombinasjonen av kjølig morgentåke, vulkansk jord og århundregammel fagkunnskap gjør Uji-matcha uforlignelig i smak og farge.",
    farmersBadge: "Bøndene",
    farmersTitlePart1: "Familien Tanaka - ",
    farmersTitlePart2: "tre generasjoner tekunst",
    farmersP1:
      "Vi samarbeider direkte med familien Tanaka, som siden 1948 har dyrket tencha (grunnlaget for matcha) på et lite jorde på 2,8 hektar. Ingen mellomledd, ingen bulkinnkjøp - bare en rettferdig pris for eksepsjonelt arbeid.",
    farmersP2:
      "Hvert år, i den første uken av mai, plukker de for hånd kun de tre yngste og mykeste bladene. Denne \"ichibanchaen\" (førstehøsten) danner grunnlaget for vår ceremonial grade matcha.",
    farmerAlt: "Tebonde plukker friske blader",
    processEyebrow: "Prosessen",
    processTitlePart1: "Fra blad ",
    processTitlePart2: "til pulver",
    stepLabel: "Steg",
    steps: [
      { title: "Skyggelegging", desc: "20 dager før innhøsting skyggelegges plantene med håndvevde nett. Det øker innholdet av klorofyll og L-theanin." },
      { title: "Håndplukking", desc: "Kun de tre yngste bladene plukkes - i den første uken av mai, mens duggen fortsatt ligger." },
      { title: "Damping og tørking", desc: "I løpet av få timer dampes og tørkes bladene, og stilkene fjernes. Resultatet kalles 'tencha'." },
      { title: "Steinkvern", desc: "Ishi-usu-kverner av granitt maler i 1 time per 30 gram - for det aller fineste pulveret." },
    ],
    millBadge: "⏱ 1 time per 30 gram",
    millAlt: "Steinkvern av granitt for matcha",
    millTitlePart1: "Den langsomste, ",
    millTitlePart2: "vakreste måten",
    millText:
      "En tradisjonell ishi-usu-kvern av granitt roterer bare 30 omdreininger i minuttet. Raskere rotasjon betyr varme - og varme brenner bort de delikate aromaene. Derfor velger vi bevisst det langsomme: én kvern produserer bare 30 gram matcha i timen. Til gjengjeld er hvert korn mikroskopiske 5 mikron.",
    cta: "Utforsk matchaen vår",
  },
};

const stepIcons = [Droplet, Hand, Leaf, MapPin];

const Origin = () => {
  const lang = useLang();
  const c = COPY[lang] ?? COPY.nl;

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
