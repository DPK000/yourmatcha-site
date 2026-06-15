import PageHero from "@/components/PageHero";
import ScrollReveal from "@/components/ScrollReveal";
import { Leaf, Recycle, HandHeart, Globe2 } from "lucide-react";
import lifestyle3 from "@/assets/lifestyle-3.jpg";
import SEO from "@/components/SEO";
import { useLang } from "@/i18n";

const COPY = {
  nl: {
    seoTitle: "Duurzaamheid — Biologische matcha, direct trade en CO₂-gecompenseerde verzending",
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
      "De familie Tanaka verzorgt al sinds 1924 de tuinen waar onze ceremonial matcha groeit. We bezoeken hen jaarlijks, proeven elke nieuwe oogst en betalen direct — zonder tussenpersonen.",
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
  no: {
    seoTitle: "Bærekraft — Økologisk matcha, direct trade og CO₂-kompensert frakt",
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
      "Familien Tanaka har stelt hagene der vår ceremonial matcha vokser, helt siden 1924. Vi besøker dem hvert år, smaker på hver nye høst og betaler direkte — uten mellomledd.",
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
  const c = COPY[lang === "no" ? "no" : "nl"];

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
