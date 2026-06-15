import { Link } from "react-router-dom";
import { ArrowRight, Clock } from "lucide-react";
import SEO from "@/components/SEO";
import PageHero from "@/components/PageHero";
import { knowledgeArticles } from "@/data/knowledge";
import ScrollReveal from "@/components/ScrollReveal";
import { useLang } from "@/i18n";

const COPY = {
  nl: {
    seoTitle: "Matcha Kenniscentrum — alles over Japanse matcha",
    seoDescription: "Het complete kenniscentrum over Japanse matcha: bereidingsgidsen, gezondheidsvoordelen, ceremonial vs culinary, cafeïne en meer. Geschreven door theespecialisten.",
    jsonLdName: "YourMatcha Kenniscentrum",
    jsonLdDescription: "Alle gidsen en achtergrondartikelen over Japanse matcha.",
    heroEyebrow: "Kenniscentrum",
    heroTitle: "Alles over matcha",
    heroSubtitle: "Diepgaande gidsen over bereiding, gezondheid en herkomst — geschreven door onze theespecialisten.",
    readMore: "Lees verder",
  },
  no: {
    seoTitle: "Matcha kunnskapssenter — alt om japansk matcha",
    seoDescription: "Det komplette kunnskapssenteret om japansk matcha: tilberedningsguider, helsefordeler, ceremonial vs culinary, koffein og mer. Skrevet av tespesialister.",
    jsonLdName: "YourMatcha kunnskapssenter",
    jsonLdDescription: "Alle guider og bakgrunnsartikler om japansk matcha.",
    heroEyebrow: "Kunnskapssenter",
    heroTitle: "Alt om matcha",
    heroSubtitle: "Dyptgående guider om tilberedning, helse og opprinnelse — skrevet av våre tespesialister.",
    readMore: "Les mer",
  },
} as const;

const Knowledge = () => {
  const lang = useLang();
  const c = lang === "no" ? COPY.no : COPY.nl;

  return (
    <>
      <SEO
        title={c.seoTitle}
        description={c.seoDescription}
        canonical="/kennis"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: c.jsonLdName,
          description: c.jsonLdDescription,
          url: "https://yourmatcha.nl/kennis",
        }}
      />
      <PageHero
        eyebrow={c.heroEyebrow}
        title={c.heroTitle}
        subtitle={c.heroSubtitle}
      />

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {knowledgeArticles.map((a, i) => (
            <ScrollReveal key={a.slug} delay={i * 0.05}>
              <Link
                to={`/kennis/${a.slug}`}
                className="group flex flex-col h-full bg-card rounded-2xl p-6 border border-border/60 hover:border-primary/40 hover:shadow-card transition-all duration-300"
              >
                <p className="text-[10px] tracking-[0.3em] uppercase text-primary mb-3">{a.category}</p>
                <h2 className="font-heading text-xl font-semibold leading-tight mb-3 group-hover:text-primary transition-colors">
                  {a.title}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">{a.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="w-3 h-3" /> {a.readTime}
                  </span>
                  <span className="inline-flex items-center gap-1 text-primary font-semibold group-hover:gap-2 transition-all">
                    {c.readMore} <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </>
  );
};

export default Knowledge;
