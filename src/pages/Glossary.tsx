import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Search } from "lucide-react";
import SEO from "@/components/SEO";
import { glossaryTerms, type GlossaryTerm } from "@/data/glossary";

const groups: GlossaryTerm["group"][] = [
  "Types",
  "Tools",
  "Bereiding",
  "Regio & Herkomst",
  "Gezondheid & Stoffen",
  "Cultuur",
];

const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const Glossary = () => {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return glossaryTerms;
    return glossaryTerms.filter(t => {
      const haystack = [t.term, ...(t.alternativeNames || []), t.definition].join(" ").toLowerCase();
      return haystack.includes(q);
    });
  }, [query]);

  const grouped = useMemo(() => {
    const map = new Map<GlossaryTerm["group"], GlossaryTerm[]>();
    for (const g of groups) map.set(g, []);
    for (const t of filtered) {
      map.get(t.group)?.push(t);
    }
    for (const g of groups) {
      map.get(g)?.sort((a, b) => a.term.localeCompare(b.term));
    }
    return map;
  }, [filtered]);

  const definedTermSchema = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: "Matcha woordenboek",
    description:
      "Compleet matcha lexicon met termen, definities en uitleg — van chasen tot EGCG, van Uji tot wabi-sabi.",
    hasDefinedTerm: glossaryTerms.map(t => ({
      "@type": "DefinedTerm",
      name: t.term,
      alternateName: t.alternativeNames,
      description: t.definition,
      inDefinedTermSet: "https://yourmatcha.nl/matcha-woordenboek",
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://yourmatcha.nl/" },
      { "@type": "ListItem", position: 2, name: "Matcha woordenboek", item: "https://yourmatcha.nl/matcha-woordenboek" },
    ],
  };

  return (
    <>
      <SEO
        title="Matcha Woordenboek: Termen, Definities & Uitleg (A-Z)"
        description="Het complete matcha lexicon. Van chasen tot EGCG, van Uji tot wabi-sabi — alle Japanse thee- en matcha-termen op één plek."
        canonical="/matcha-woordenboek"
        jsonLd={[definedTermSchema, breadcrumbSchema]}
      />

      <section className="py-16 md:py-20 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <p className="text-[10px] tracking-[0.3em] uppercase text-primary mb-4">Woordenboek</p>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-light leading-tight mb-6">
            Matcha woordenboek
          </h1>
          <p className="text-base md:text-lg text-foreground/75 leading-relaxed max-w-2xl mx-auto mb-10">
            Alle termen op één plek. Van chasen tot EGCG, van Uji tot wabi-sabi — {glossaryTerms.length} definities,
            doorzoekbaar.
          </p>
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Zoek een term (bv. chasen, koicha, EGCG)..."
              className="w-full pl-11 pr-4 py-3 rounded-full bg-background border border-border focus:border-primary outline-none transition-colors text-sm"
              aria-label="Zoek in woordenboek"
            />
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <nav className="mb-12 flex flex-wrap gap-2 justify-center">
            {groups.map(g => {
              const count = grouped.get(g)?.length || 0;
              return (
                <a
                  key={g}
                  href={`#${slugify(g)}`}
                  className={`text-xs tracking-wider uppercase px-4 py-2 rounded-full border transition-colors ${
                    count === 0
                      ? "border-border/40 text-muted-foreground/40 pointer-events-none"
                      : "border-border hover:border-primary hover:text-primary"
                  }`}
                >
                  {g} {count > 0 && <span className="text-muted-foreground ml-1">{count}</span>}
                </a>
              );
            })}
          </nav>

          {groups.map(g => {
            const items = grouped.get(g) || [];
            if (items.length === 0) return null;
            return (
              <section key={g} id={slugify(g)} className="mb-16 last:mb-0 scroll-mt-24">
                <h2 className="font-heading text-2xl md:text-3xl font-semibold mb-8 pb-3 border-b border-border">
                  {g}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                  {items.map(t => (
                    <article key={t.term} id={slugify(t.term)}>
                      <h3 className="font-heading text-lg font-semibold mb-1.5">{t.term}</h3>
                      {t.alternativeNames && t.alternativeNames.length > 0 && (
                        <p className="text-xs text-muted-foreground italic mb-2">
                          ook: {t.alternativeNames.join(", ")}
                        </p>
                      )}
                      <p className="text-sm text-foreground/80 leading-relaxed">{t.definition}</p>
                      {t.relatedLink && (
                        <Link
                          to={t.relatedLink.to}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:gap-2 transition-all mt-2"
                        >
                          {t.relatedLink.label} <ChevronRight className="w-3 h-3" />
                        </Link>
                      )}
                    </article>
                  ))}
                </div>
              </section>
            );
          })}

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">Geen termen gevonden voor "{query}".</p>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <h2 className="font-heading text-2xl font-semibold mb-6">Verder lezen</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              to="/kennis/wat-is-matcha"
              className="group block bg-card rounded-xl p-5 border border-border/60 hover:border-primary/40 transition-all"
            >
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                Wat is matcha? <ChevronRight className="w-4 h-4" />
              </span>
            </Link>
            <Link
              to="/kennis/japanse-theeceremonie-chanoyu"
              className="group block bg-card rounded-xl p-5 border border-border/60 hover:border-primary/40 transition-all"
            >
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                Japanse theeceremonie <ChevronRight className="w-4 h-4" />
              </span>
            </Link>
            <Link
              to="/kennis/beste-matcha-kopen-2026"
              className="group block bg-card rounded-xl p-5 border border-border/60 hover:border-primary/40 transition-all"
            >
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                Beste matcha kopen 2026 <ChevronRight className="w-4 h-4" />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Glossary;
