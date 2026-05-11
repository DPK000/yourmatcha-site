import { Link } from "react-router-dom";
import { ArrowRight, Clock } from "lucide-react";
import SEO from "@/components/SEO";
import PageHero from "@/components/PageHero";
import { knowledgeArticles } from "@/data/knowledge";
import ScrollReveal from "@/components/ScrollReveal";

const Knowledge = () => (
  <>
    <SEO
      title="Matcha Kenniscentrum — alles over Japanse matcha"
      description="Het complete kenniscentrum over Japanse matcha: bereidingsgidsen, gezondheidsvoordelen, ceremonial vs culinary, cafeïne en meer. Geschreven door theespecialisten."
      canonical="/kennis"
      jsonLd={{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "YourMatcha Kenniscentrum",
        description: "Alle gidsen en achtergrondartikelen over Japanse matcha.",
        url: "https://yourmatcha.nl/kennis",
      }}
    />
    <PageHero
      eyebrow="Kenniscentrum"
      title="Alles over matcha"
      subtitle="Diepgaande gidsen over bereiding, gezondheid en herkomst — geschreven door onze theespecialisten."
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
                  Lees verder <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </section>
  </>
);

export default Knowledge;
