import PageHero from "@/components/PageHero";
import ScrollReveal from "@/components/ScrollReveal";
import { Leaf, Recycle, HandHeart, Globe2 } from "lucide-react";
import lifestyle3 from "@/assets/lifestyle-3.webp";
import SEO from "@/components/SEO";
import { useLang } from "@/i18n";

const COPY = {
  nl: {
    seoTitle: "Duurzaamheid - Biologische matcha, direct trade en CO₂-gecompenseerde verzending",
    seoDescription:
      "YourMatcha is biologisch gecertificeerd (EU-Bio + JAS), werkt direct met Japanse familieboerderijen in Uji en Kagoshima, en compenseert 100% van de verzendingen.",
    seoKeywords: "biologische matcha, duurzame matcha, direct trade thee, eerlijke matcha, CO2 neutraal verzenden",
    heroEyebrow: "Duurzaamheid",
    heroTitle: "Met respect voor land, mens en plant",
    heroSubtitle: "Premium matcha betekent voor ons ook: zorgvuldig omgaan met de mensen en plekken waar het vandaan komt.",
    pillars: [
      { title: "100% Biologisch", text: "Al onze thee is gecertificeerd biologisch (EU-Bio en JAS). Geen pesticiden, geen kunstmest, geen kortere wegen." },
      { title: "Direct Trade", text: "We werken al jaren met dezelfde familieboerderijen in Uji en Kagoshima. Eerlijke prijzen, langetermijn relaties, geen tussenhandel." },
      { title: "Recyclebaar", text: "Onze pouches zijn volledig recyclebaar en onze verzenddozen zijn gemaakt van 100% gerecycled karton zonder plastic vulling." },
      { title: "CO₂ Gecompenseerd", text: "We compenseren 100% van onze verzendingen via geverifieerde herbebossingsprojecten in Nederland en Indonesië." },
    ],
    partnersBadge: "🇯🇵 Onze partners",
    partnersTitlePart1: "Vier generaties ",
    partnersTitlePart2: "vakmanschap",
    partnersP1:
      "De familie Tanaka verzorgt al sinds 1924 de tuinen waar onze ceremonial matcha groeit. We bezoeken hen jaarlijks, proeven elke nieuwe oogst en betalen direct - zonder tussenpersonen.",
    partnersP2:
      "Door deze directe relatie kunnen we niet alleen de hoogste kwaliteit garanderen, maar ook eerlijke werkomstandigheden en investeringen in duurzame teeltmethodes.",
    partnersAlt: "Theeboerderij Uji",
    impactEyebrow: "Onze impact 2025",
    impactTitle: "In cijfers",
    stats: [
      ["12.400", "Bomen geplant"],
      ["100%", "CO₂ gecompenseerd"],
      ["8", "Familieboerderijen"],
      ["0", "Plastic in verpakking"],
    ] as [string, string][],
  },
  en: {
    seoTitle: "Sustainability - Organic matcha, direct trade and carbon-offset shipping",
    seoDescription:
      "YourMatcha is certified organic (EU-Bio + JAS), works directly with Japanese family farms in Uji and Kagoshima, and offsets 100% of its shipments.",
    seoKeywords: "organic matcha, sustainable matcha, direct trade tea, fair matcha, carbon neutral shipping",
    heroEyebrow: "Sustainability",
    heroTitle: "With respect for the land, the people and the plant",
    heroSubtitle: "For us, premium matcha also means caring for the people and places it comes from.",
    pillars: [
      { title: "100% organic", text: "All our tea is certified organic (EU-Bio and JAS). No pesticides, no artificial fertiliser, no shortcuts." },
      { title: "Direct trade", text: "We have worked with the same family farms in Uji and Kagoshima for years. Fair prices, long-term relationships, no middlemen." },
      { title: "Recyclable", text: "Our pouches are fully recyclable and our shipping boxes are made from 100% recycled cardboard with no plastic filler." },
      { title: "Carbon offset", text: "We offset 100% of our shipments through verified reforestation projects in the Netherlands and Indonesia." },
    ],
    partnersBadge: "🇯🇵 Our partners",
    partnersTitlePart1: "Four generations of ",
    partnersTitlePart2: "craftsmanship",
    partnersP1:
      "The Tanaka family has tended the gardens where our ceremonial matcha grows since 1924. We visit every year, taste each new harvest and pay them directly - no middlemen.",
    partnersP2:
      "This direct relationship lets us guarantee not just the highest quality, but also fair working conditions and investment in sustainable growing methods.",
    partnersAlt: "Tea farm in Uji",
    impactEyebrow: "Our impact 2025",
    impactTitle: "In numbers",
    stats: [
      ["12,400", "Trees planted"],
      ["100%", "Carbon offset"],
      ["8", "Family farms"],
      ["0", "Plastic in packaging"],
    ] as [string, string][],
  },
  de: {
    seoTitle: "Nachhaltigkeit - Bio-Matcha, Direct Trade und CO₂-kompensierter Versand",
    seoDescription:
      "YourMatcha ist bio-zertifiziert (EU-Bio + JAS), arbeitet direkt mit japanischen Familienbetrieben in Uji und Kagoshima und kompensiert 100% aller Sendungen.",
    seoKeywords: "Bio-Matcha, nachhaltiger Matcha, Direct Trade Tee, fairer Matcha, klimaneutraler Versand",
    heroEyebrow: "Nachhaltigkeit",
    heroTitle: "Mit Respekt für Boden, Mensch und Pflanze",
    heroSubtitle: "Premium-Matcha heißt für uns auch: sorgsam umgehen mit den Menschen und Orten, aus denen er kommt.",
    pillars: [
      { title: "100% biologisch", text: "Unser gesamter Tee ist bio-zertifiziert (EU-Bio und JAS). Keine Pestizide, kein Kunstdünger, keine Abkürzungen." },
      { title: "Direct Trade", text: "Wir arbeiten seit Jahren mit denselben Familienbetrieben in Uji und Kagoshima. Faire Preise, langfristige Beziehungen, kein Zwischenhandel." },
      { title: "Recycelbar", text: "Unsere Beutel sind vollständig recycelbar und unsere Versandkartons bestehen aus 100% Recyclingpappe ohne Plastikfüllung." },
      { title: "CO₂-kompensiert", text: "Wir kompensieren 100% unserer Sendungen über verifizierte Aufforstungsprojekte in den Niederlanden und Indonesien." },
    ],
    partnersBadge: "🇯🇵 Unsere Partner",
    partnersTitlePart1: "Vier Generationen ",
    partnersTitlePart2: "Handwerk",
    partnersP1:
      "Die Familie Tanaka pflegt die Gärten, in denen unser zeremonieller Matcha wächst, bereits seit 1924. Wir besuchen sie jedes Jahr, verkosten jede neue Ernte und zahlen direkt - ohne Zwischenhändler.",
    partnersP2:
      "Durch diese direkte Beziehung können wir nicht nur höchste Qualität garantieren, sondern auch faire Arbeitsbedingungen und Investitionen in nachhaltige Anbaumethoden.",
    partnersAlt: "Teegarten in Uji",
    impactEyebrow: "Unsere Wirkung 2025",
    impactTitle: "In Zahlen",
    stats: [
      ["12.400", "Bäume gepflanzt"],
      ["100%", "CO₂ kompensiert"],
      ["8", "Familienbetriebe"],
      ["0", "Plastik in der Verpackung"],
    ] as [string, string][],
  },
  fr: {
    seoTitle: "Durabilité - Matcha bio, direct trade et livraison compensée en CO₂",
    seoDescription:
      "YourMatcha est certifié bio (EU-Bio + JAS), travaille directement avec des fermes familiales japonaises à Uji et Kagoshima, et compense 100% de ses expéditions.",
    seoKeywords: "matcha bio, matcha durable, thé direct trade, matcha équitable, livraison neutre en carbone",
    heroEyebrow: "Durabilité",
    heroTitle: "Avec respect pour la terre, les gens et la plante",
    heroSubtitle: "Pour nous, un matcha premium implique aussi de prendre soin des personnes et des lieux dont il vient.",
    pillars: [
      { title: "100% bio", text: "Tous nos thés sont certifiés biologiques (EU-Bio et JAS). Sans pesticides, sans engrais de synthèse, sans raccourcis." },
      { title: "Direct trade", text: "Nous travaillons depuis des années avec les mêmes fermes familiales à Uji et Kagoshima. Prix justes, relations de long terme, aucun intermédiaire." },
      { title: "Recyclable", text: "Nos sachets sont entièrement recyclables et nos cartons d'expédition sont en carton 100% recyclé, sans calage plastique." },
      { title: "Compensé en CO₂", text: "Nous compensons 100% de nos expéditions via des projets de reforestation vérifiés aux Pays-Bas et en Indonésie." },
    ],
    partnersBadge: "🇯🇵 Nos partenaires",
    partnersTitlePart1: "Quatre générations de ",
    partnersTitlePart2: "savoir-faire",
    partnersP1:
      "La famille Tanaka entretient depuis 1924 les jardins où pousse notre matcha cérémoniel. Nous leur rendons visite chaque année, goûtons chaque nouvelle récolte et les payons directement - sans intermédiaire.",
    partnersP2:
      "Cette relation directe nous permet de garantir non seulement la plus haute qualité, mais aussi des conditions de travail justes et des investissements dans des méthodes de culture durables.",
    partnersAlt: "Ferme de thé à Uji",
    impactEyebrow: "Notre impact 2025",
    impactTitle: "En chiffres",
    stats: [
      ["12 400", "Arbres plantés"],
      ["100%", "CO₂ compensé"],
      ["8", "Fermes familiales"],
      ["0", "Plastique dans l'emballage"],
    ] as [string, string][],
  },
  no: {
    seoTitle: "Bærekraft - Økologisk matcha, direct trade og CO₂-kompensert frakt",
    seoDescription:
      "YourMatcha er økologisk sertifisert (EU-Bio + JAS), samarbeider direkte med japanske familiegårder i Uji og Kagoshima, og kompenserer 100 % av alle forsendelser.",
    seoKeywords: "økologisk matcha, bærekraftig matcha, direct trade te, rettferdig matcha, klimanøytral frakt",
    heroEyebrow: "Bærekraft",
    heroTitle: "Med respekt for jorden, menneskene og planten",
    heroSubtitle: "For oss betyr premium matcha også å ta godt vare på menneskene og stedene den kommer fra.",
    pillars: [
      { title: "100 % økologisk", text: "All teen vår er sertifisert økologisk (EU-Bio og JAS). Ingen sprøytemidler, ingen kunstgjødsel, ingen snarveier." },
      { title: "Direct trade", text: "Vi har samarbeidet med de samme familiegårdene i Uji og Kagoshima i årevis. Rettferdige priser, langsiktige relasjoner, ingen mellomledd." },
      { title: "Gjenvinnbart", text: "Posene våre er fullt gjenvinnbare, og fraktboksene er laget av 100 % resirkulert papp uten plastfyll." },
      { title: "CO₂-kompensert", text: "Vi kompenserer 100 % av forsendelsene våre gjennom verifiserte skogplantingsprosjekter i Nederland og Indonesia." },
    ],
    partnersBadge: "🇯🇵 Våre partnere",
    partnersTitlePart1: "Fire generasjoner ",
    partnersTitlePart2: "håndverk",
    partnersP1:
      "Familien Tanaka har stelt hagene der vår ceremonial matcha vokser, helt siden 1924. Vi besøker dem hvert år, smaker på hver nye høst og betaler direkte - uten mellomledd.",
    partnersP2:
      "Denne direkte relasjonen lar oss ikke bare garantere den høyeste kvaliteten, men også sikre rettferdige arbeidsforhold og investeringer i bærekraftige dyrkingsmetoder.",
    partnersAlt: "Tegård i Uji",
    impactEyebrow: "Vår påvirkning 2025",
    impactTitle: "I tall",
    stats: [
      ["12 400", "Trær plantet"],
      ["100 %", "CO₂ kompensert"],
      ["8", "Familiegårder"],
      ["0", "Plast i emballasjen"],
    ] as [string, string][],
  },
};

const pillarIcons = [Leaf, HandHeart, Recycle, Globe2];

const Sustainability = () => {
  const lang = useLang();
  const c = COPY[lang] ?? COPY.nl;

  return (
    <>
      <SEO
        title={c.seoTitle}
        description={c.seoDescription}
        canonical="/duurzaamheid"
        keywords={c.seoKeywords}
      />
      <PageHero
        eyebrow={c.heroEyebrow}
        title={c.heroTitle}
        subtitle={c.heroSubtitle}
      />

      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {c.pillars.map((p, i) => {
              const Icon = pillarIcons[i];
              return (
                <ScrollReveal key={i}>
                  <div className="bg-secondary rounded-2xl p-8 h-full">
                    <Icon className="w-8 h-8 text-primary mb-5" />
                    <h3 className="font-heading text-xl font-semibold mb-2">{p.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{p.text}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-5xl">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 text-xs tracking-wide bg-primary/10 text-primary px-3 py-1.5 rounded-full mb-6 font-medium">{c.partnersBadge}</span>
            <h2 className="font-heading text-3xl md:text-4xl font-light leading-tight mb-5">{c.partnersTitlePart1}<span className="italic">{c.partnersTitlePart2}</span></h2>
            <p className="text-muted-foreground leading-relaxed mb-4">{c.partnersP1}</p>
            <p className="text-muted-foreground leading-relaxed">{c.partnersP2}</p>
          </ScrollReveal>
          <div className="aspect-[4/3] rounded-2xl overflow-hidden">
            <img src={lifestyle3} alt={c.partnersAlt} loading="lazy" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
          <ScrollReveal>
            <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-3">{c.impactEyebrow}</p>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold mb-12">{c.impactTitle}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {c.stats.map(([n, l]) => (
                <div key={l} className="bg-secondary rounded-2xl p-6">
                  <div className="font-heading text-3xl md:text-4xl text-primary font-light">{n}</div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground mt-2">{l}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
};

export default Sustainability;
