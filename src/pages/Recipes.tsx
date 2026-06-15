import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Clock, ChefHat, ArrowRight, Search, X } from "lucide-react";
import PageHero from "@/components/PageHero";
import SEO from "@/components/SEO";
import ScrollReveal from "@/components/ScrollReveal";
import RecipeSwiper from "@/components/RecipeSwiper";
import { recipes } from "@/data/recipes";
import { useLang } from "@/i18n";

const parseMinutes = (time: string) => {
  const m = time.match(/(\d+)/);
  return m ? parseInt(m[1], 10) : 0;
};

const timeBuckets = [
  { key: "all", match: () => true },
  { key: "fast", match: (t: string) => parseMinutes(t) < 10 },
  { key: "mid", match: (t: string) => parseMinutes(t) >= 10 && parseMinutes(t) <= 30 },
  { key: "long", match: (t: string) => parseMinutes(t) > 30 },
] as const;

const COPY = {
  nl: {
    seoTitle: "Matcha Recepten — 20+ matcha latte, smoothie en bak ideeën met Japanse matcha",
    seoDescription: "Ontdek heerlijke matcha recepten: ijskoffie matcha latte, matcha smoothie bowl, matcha cookies, hojicha latte en meer. Gemakkelijk te maken met ceremoniële Japanse matcha.",
    seoKeywords: "matcha recepten, matcha latte recept, matcha smoothie, matcha cookies, hojicha latte, matcha bakken, matcha gerechten",
    heroEyebrow: "Recepten",
    heroTitle: "Maak het zelf",
    heroSubtitle: "Onze favoriete recepten — van klassieke bereidingen tot moderne creaties met matcha en hojicha.",
    searchPlaceholder: "Zoek op naam of ingrediënt…",
    searchAria: "Zoek recepten",
    filterCategory: "Categorie",
    filterTime: "Tijd",
    filterLevel: "Level",
    allCategories: "Alle categorieën",
    allLevels: "Alle levels",
    timeLabels: { all: "Alle tijden", fast: "Onder 10 min", mid: "10–30 min", long: "30+ min" },
    foundOne: "recept",
    foundMany: "recepten",
    found: "gevonden",
    resetFilters: "Reset filters",
    emptyState: "Geen recepten gevonden voor deze filters.",
    moreRecipes: "Wil je nog meer recepten? Ontdek ons receptenboek.",
  },
  no: {
    seoTitle: "Matcha-oppskrifter — 20+ ideer til matcha latte, smoothie og baking med japansk matcha",
    seoDescription: "Oppdag deilige matcha-oppskrifter: iskald matcha latte, matcha smoothie bowl, matcha cookies, hojicha latte og mer. Enkle å lage med seremoniell japansk matcha.",
    seoKeywords: "matcha oppskrifter, matcha latte oppskrift, matcha smoothie, matcha cookies, hojicha latte, matcha baking, matcha retter",
    heroEyebrow: "Oppskrifter",
    heroTitle: "Lag det selv",
    heroSubtitle: "Våre favorittoppskrifter — fra klassiske tilberedninger til moderne kreasjoner med matcha og hojicha.",
    searchPlaceholder: "Søk på navn eller ingrediens…",
    searchAria: "Søk i oppskrifter",
    filterCategory: "Kategori",
    filterTime: "Tid",
    filterLevel: "Nivå",
    allCategories: "Alle kategorier",
    allLevels: "Alle nivåer",
    timeLabels: { all: "Alle tider", fast: "Under 10 min", mid: "10–30 min", long: "30+ min" },
    foundOne: "oppskrift",
    foundMany: "oppskrifter",
    found: "funnet",
    resetFilters: "Nullstill filtre",
    emptyState: "Ingen oppskrifter funnet med disse filtrene.",
    moreRecipes: "Vil du ha enda flere oppskrifter? Utforsk oppskriftsboken vår.",
  },
} as const;

const Recipes = () => {
  const lang = useLang();
  const c = lang === "no" ? COPY.no : COPY.nl;
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [level, setLevel] = useState<string>("all");
  const [timeKey, setTimeKey] = useState<string>("all");

  const categories = useMemo(() => ["all", ...Array.from(new Set(recipes.map((r) => r.category)))], []);
  const levels = useMemo(() => ["all", ...Array.from(new Set(recipes.map((r) => r.level)))], []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const timeFilter = timeBuckets.find((b) => b.key === timeKey)!;
    return recipes.filter((r) => {
      if (category !== "all" && r.category !== category) return false;
      if (level !== "all" && r.level !== level) return false;
      if (!timeFilter.match(r.time)) return false;
      if (q) {
        const hay = `${r.title} ${r.description} ${r.category} ${r.ingredients.join(" ")}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [query, category, level, timeKey]);

  const hasActiveFilters = query || category !== "all" || level !== "all" || timeKey !== "all";
  const reset = () => { setQuery(""); setCategory("all"); setLevel("all"); setTimeKey("all"); };

  return (
    <>
      <SEO
        title={c.seoTitle}
        description={c.seoDescription}
        canonical="/recepten"
        keywords={c.seoKeywords}
      />
      <PageHero
        eyebrow={c.heroEyebrow}
        title={c.heroTitle}
        subtitle={c.heroSubtitle}
      />
      <RecipeSwiper />

      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <ScrollReveal className="mb-10">
            <div className="bg-secondary/60 border border-border rounded-3xl p-5 md:p-7">
              <div className="flex flex-col lg:flex-row gap-4 lg:items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={c.searchPlaceholder}
                    aria-label={c.searchAria}
                    className="w-full pl-11 pr-4 py-3 rounded-full bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 lg:w-auto">
                  <FilterSelect label={c.filterCategory} value={category} onChange={setCategory}
                    options={categories.map((cat) => ({ value: cat, label: cat === "all" ? c.allCategories : cat }))} />
                  <FilterSelect label={c.filterTime} value={timeKey} onChange={setTimeKey}
                    options={timeBuckets.map((b) => ({ value: b.key, label: c.timeLabels[b.key] }))} />
                  <FilterSelect label={c.filterLevel} value={level} onChange={setLevel}
                    options={levels.map((l) => ({ value: l, label: l === "all" ? c.allLevels : l }))} />
                </div>
              </div>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/60">
                <p className="text-xs text-muted-foreground">
                  {filtered.length} {filtered.length === 1 ? c.foundOne : c.foundMany} {c.found}
                </p>
                {hasActiveFilters && (
                  <button onClick={reset} className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline">
                    <X className="w-3.5 h-3.5" /> {c.resetFilters}
                  </button>
                )}
              </div>
            </div>
          </ScrollReveal>

          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground mb-4">{c.emptyState}</p>
              <button onClick={reset} className="text-sm font-semibold text-primary hover:underline">{c.resetFilters}</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((r) => (
                <Link
                  key={r.slug}
                  to={`/recepten/${r.slug}`}
                  className="group block bg-background rounded-3xl overflow-hidden border border-border hover:shadow-2xl transition-all duration-500"
                >
                  <div className="aspect-[4/5] overflow-hidden bg-secondary relative">
                    <img src={r.image} alt={r.title} loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <span className="absolute top-4 left-4 px-3 py-1.5 text-[10px] tracking-[0.2em] uppercase bg-background/90 backdrop-blur rounded-full font-semibold">
                      {r.category}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-heading text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{r.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{r.description}</p>
                    <div className="flex items-center gap-4 text-[11px] tracking-wider uppercase text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {r.time}</span>
                      <span className="inline-flex items-center gap-1.5"><ChefHat className="w-3.5 h-3.5" /> {r.level}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="text-center pt-16 mt-16 border-t border-border">
            <p className="text-muted-foreground mb-5">{c.moreRecipes}</p>
            <Link to="/product/the-matcha-ritual-book" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3.5 rounded-full text-sm font-bold tracking-wide uppercase hover:scale-105 transition-transform">
              The Matcha Ritual <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

const FilterSelect = ({
  label, value, onChange, options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) => (
  <label className="relative block">
    <span className="sr-only">{label}</span>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label={label}
      className="w-full appearance-none px-4 py-3 pr-9 rounded-full bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm cursor-pointer"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">▾</span>
  </label>
);

export default Recipes;
