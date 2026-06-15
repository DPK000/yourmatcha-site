import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Search } from "lucide-react";
import SEO from "@/components/SEO";
import { useGlossaryTerms, groupLabel, type GlossaryTerm } from "@/data/glossary";
import { useLang } from "@/i18n";

const groups: GlossaryTerm["group"][] = [
  "Types",
  "Tools",
  "Bereiding",
  "Regio & Herkomst",
  "Gezondheid & Stoffen",
  "Cultuur",
];

const COPY = {
  nl: {
    eyebrow: "Woordenboek",
    title: "Matcha woordenboek",
    intro: (n: number) =>
      `Alle termen op één plek. Van chasen tot EGCG, van Uji tot wabi-sabi — ${n} definities, doorzoekbaar.`,
    searchPlaceholder: "Zoek een term (bv. chasen, koicha, EGCG)...",
    searchAria: "Zoek in woordenboek",
    alsoPrefix: "ook:",
    noResults: (q: string) => `Geen termen gevonden voor "${q}".`,
    readMore: "Verder lezen",
    seoTitle: "Matcha Woordenboek: Termen, Definities & Uitleg (A-Z)",
    seoDescription:
      "Het complete matcha lexicon. Van chasen tot EGCG, van Uji tot wabi-sabi — alle Japanse thee- en matcha-termen op één plek.",
    links: {
      whatIsMatcha: "Wat is matcha?",
      ceremony: "Japanse theeceremonie",
      bestMatcha: "Beste matcha kopen 2026",
    },
  },
  no: {
    eyebrow: "Ordbok",
    title: "Matcha-ordbok",
    intro: (n: number) =>
      `Alle begreper på ett sted. Fra chasen til EGCG, fra Uji til wabi-sabi — ${n} definisjoner, søkbare.`,
    searchPlaceholder: "Søk etter et begrep (f.eks. chasen, koicha, EGCG)...",
    searchAria: "Søk i ordboken",
    alsoPrefix: "også:",
    noResults: (q: string) => `Ingen begreper funnet for «${q}».`,
    readMore: "Les mer",
    seoTitle: "Matcha-ordbok: Begreper, definisjoner og forklaringer (A-Å)",
    seoDescription:
      "Det komplette matcha-leksikonet. Fra chasen til EGCG, fra Uji til wabi-sabi — alle japanske te- og matcha-begreper på ett sted.",
    links: {
      whatIsMatcha: "Hva er matcha?",
      ceremony: "Japansk teseremoni",
      bestMatcha: "Beste matcha å kjøpe 2026",
    },
  },
};

const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const Glossary = () => {
  const [query, setQuery] = useState("");
  const lang = useLang();
  const c = lang === "no" ? COPY.no : COPY.nl;
  const glossaryTerms = useGlossaryTerms();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return glossaryTerms;
    return glossaryTerms.filter(t => {
      const haystack = [t.term, ...(t.alternativeNames || []), t.definition].join(" ").toLowerCase();
      return haystack.includes(q);
    });
  }, [query, glossaryTerms]);

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
    name: c.title,
    description: c.seoDescription,
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
      { "@type": "ListItem", position: 2, name: c.title, item: "https://yourmatcha.nl/matcha-woordenboek" },
    ],
  };

  return (
    <>
      <SEO
        title={c.seoTitle}
        description={c.seoDescription}
        canonical="/matcha-woordenboek"
        jsonLd={[definedTermSchema, breadcrumbSchema]}
      />

      <section className="py-16 md:py-20 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <p className="text-[10px] tracking-[0.3em] uppercase text-primary mb-4">{c.eyebrow}</p>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-light leading-tight mb-6">
            {c.title}
          </h1>
          <p className="text-base md:text-lg text-foreground/75 leading-relaxed max-w-2xl mx-auto mb-10">
            {c.intro(glossaryTerms.length)}
          </p>
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder={c.searchPlaceholder}
              className="w-full pl-11 pr-4 py-3 rounded-full bg-background border border-border focus:border-primary outline-none transition-colors text-sm"
              aria-label={c.searchAria}
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
                  {groupLabel(g, lang)} {count > 0 && <span className="text-muted-foreground ml-1">{count}</span>}
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
                  {groupLabel(g, lang)}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                  {items.map(t => (
                    <article key={t.term} id={slugify(t.term)}>
                      <h3 className="font-heading text-lg font-semibold mb-1.5">{t.term}</h3>
                      {t.alternativeNames && t.alternativeNames.length > 0 && (
                        <p className="text-xs text-muted-foreground italic mb-2">
                          {c.alsoPrefix} {t.alternativeNames.join(", ")}
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
              <p className="text-muted-foreground">{c.noResults(query)}</p>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <h2 className="font-heading text-2xl font-semibold mb-6">{c.readMore}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              to="/kennis/wat-is-matcha"
              className="group block bg-card rounded-xl p-5 border border-border/60 hover:border-primary/40 transition-all"
            >
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                {c.links.whatIsMatcha} <ChevronRight className="w-4 h-4" />
              </span>
            </Link>
            <Link
              to="/kennis/japanse-theeceremonie-chanoyu"
              className="group block bg-card rounded-xl p-5 border border-border/60 hover:border-primary/40 transition-all"
            >
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                {c.links.ceremony} <ChevronRight className="w-4 h-4" />
              </span>
            </Link>
            <Link
              to="/kennis/beste-matcha-kopen-2026"
              className="group block bg-card rounded-xl p-5 border border-border/60 hover:border-primary/40 transition-all"
            >
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                {c.links.bestMatcha} <ChevronRight className="w-4 h-4" />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Glossary;
