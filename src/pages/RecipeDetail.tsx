import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, Clock, ChefHat, Share2, ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import SEO from "@/components/SEO";
import ScrollReveal from "@/components/ScrollReveal";
import { getRecipeBySlug, recipes, type Recipe } from "@/data/recipes";
import { getProductBySlug } from "@/data/products";

const recommendedProductSlugs = (recipe: Recipe): string[] => {
  const slug = recipe.slug.toLowerCase();

  if (slug.includes("hojicha")) {
    return ["hojicha-poeder-50g", "ceremonial-matcha-100g", "starter-kit"];
  }

  const isIced =
    slug.includes("iced") ||
    slug.includes("lemonade") ||
    slug.includes("tonic") ||
    slug.includes("bubble") ||
    slug.includes("strawberry-latte");

  if (isIced) {
    return ["iced-matcha-blend-60g", "culinary-matcha-100g", "ceremonial-matcha-100g"];
  }

  if (recipe.category === "Drinks") {
    return ["ceremonial-matcha-100g", "culinary-matcha-100g", "starter-kit"];
  }

  return ["culinary-matcha-100g", "ceremonial-matcha-30g", "starter-kit"];
};

const recommendationReason = (recipe: Recipe): string => {
  const slug = recipe.slug.toLowerCase();
  if (slug.includes("hojicha")) {
    return "Hojicha poeder is essentieel voor dit recept. Onze ceremonial matcha is een mooie tegenhanger voor andere bereidingen.";
  }
  if (
    slug.includes("iced") ||
    slug.includes("lemonade") ||
    slug.includes("tonic") ||
    slug.includes("bubble") ||
    slug.includes("strawberry-latte")
  ) {
    return "Voor koude bereidingen is een speciaal gemalen iced blend ideaal — lost direct op, geen klontjes.";
  }
  if (recipe.category === "Drinks") {
    return "Voor een fluweelzachte latte: ceremonial voor de pure smaak, culinary voor dagelijks gebruik.";
  }
  return "Voor bakken en koken kies je culinary grade — robuust, hittebestendig en kosteneffectief.";
};

const RecipeDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const recipe = slug ? getRecipeBySlug(slug) : undefined;

  if (!recipe) return <Navigate to="/recepten" replace />;

  const related = recipes
    .filter((r) => r.slug !== recipe.slug && r.category === recipe.category)
    .slice(0, 3);

  const recommended = recommendedProductSlugs(recipe)
    .map((s) => getProductBySlug(s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  const priceFormatter = new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" });

  const recipeJsonLd = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: recipe.title,
    image: [recipe.image],
    description: recipe.description,
    recipeCategory: recipe.category,
    recipeCuisine: "Japans",
    totalTime: recipe.time,
    recipeIngredient: recipe.ingredients,
    recipeInstructions: recipe.steps.map((s) => ({ "@type": "HowToStep", text: s })),
  };

  return (
    <>
      <SEO
        title={`${recipe.title} — YourMatcha Recept`}
        description={recipe.description}
        image={recipe.image}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(recipeJsonLd) }} />

      <PageHero eyebrow={recipe.category} title={recipe.title} subtitle={recipe.description} />

      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <Link
            to="/recepten"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-10 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Alle recepten
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <ScrollReveal>
              <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-secondary shadow-xl">
                <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover" />
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div>
                <div className="flex items-center gap-5 text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-6">
                  <span className="inline-flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {recipe.time}</span>
                  <span className="inline-flex items-center gap-1.5"><ChefHat className="w-3.5 h-3.5" /> {recipe.level}</span>
                </div>

                {recipe.intro && (
                  <p className="text-muted-foreground leading-relaxed mb-8">{recipe.intro}</p>
                )}

                <h2 className="text-sm font-semibold uppercase tracking-wider mb-3">Ingrediënten</h2>
                <ul className="text-sm text-muted-foreground space-y-1.5 mb-10 list-disc pl-5">
                  {recipe.ingredients.map((i) => <li key={i}>{i}</li>)}
                </ul>

                <h2 className="text-sm font-semibold uppercase tracking-wider mb-3">Bereiding</h2>
                <ol className="text-sm text-muted-foreground space-y-3 list-decimal pl-5">
                  {recipe.steps.map((s) => <li key={s} className="leading-relaxed">{s}</li>)}
                </ol>

                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({ title: recipe.title, text: recipe.description, url: window.location.href });
                    } else {
                      navigator.clipboard.writeText(window.location.href);
                    }
                  }}
                  className="mt-10 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-primary hover:underline"
                >
                  <Share2 className="w-4 h-4" /> Deel dit recept
                </button>
              </div>
            </ScrollReveal>
          </div>

          {recommended.length > 0 && (
            <div className="mt-24 pt-16 border-t border-border">
              <div className="mb-8 max-w-2xl">
                <p className="text-[10px] tracking-[0.3em] uppercase text-primary mb-3">Bij dit recept</p>
                <h2 className="font-heading text-2xl md:text-3xl font-semibold mb-3">
                  Koop de juiste matcha voor dit recept
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {recommendationReason(recipe)}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {recommended.map((p) => (
                  <Link
                    key={p.id}
                    to={`/product/${p.slug}`}
                    className="group block bg-card rounded-2xl overflow-hidden border border-border/60 hover:border-primary/40 transition-all"
                  >
                    <div className="aspect-square bg-secondary overflow-hidden">
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <div className="p-5">
                      <p className="text-[10px] tracking-widest uppercase text-muted-foreground mb-1.5">{p.categoryLabel}</p>
                      <h3 className="font-heading text-base font-semibold leading-tight mb-2 group-hover:text-primary transition-colors">
                        {p.name}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed mb-3 line-clamp-2">{p.shortDescription}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold">{priceFormatter.format(p.price)}</span>
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary group-hover:gap-2 transition-all">
                          Bekijk <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {related.length > 0 && (
            <div className="mt-24 pt-16 border-t border-border">
              <h2 className="font-heading text-2xl md:text-3xl font-semibold mb-8">Meer {recipe.category.toLowerCase()}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    to={`/recepten/${r.slug}`}
                    className="group block"
                  >
                    <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-secondary mb-4">
                      <img src={r.image} alt={r.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <h3 className="font-heading text-lg font-semibold group-hover:text-primary transition-colors">{r.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{r.time} · {r.level}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default RecipeDetail;
