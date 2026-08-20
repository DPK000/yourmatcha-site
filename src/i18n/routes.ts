import type { Lang } from "@/i18n";

/**
 * Eén bron van waarheid voor elke URL op de site, per taal.
 *
 * Elke pagina heeft een sleutel; de waarde is de slug in elke taal. De site
 * draait op één domein met een taalprefix: /nl/shop, /no/butikk, /fr/boutique.
 *
 * Toevoegen van een pagina = hier één regel bijzetten. De router, de
 * hreflang-tags, de sitemap en alle interne links lezen uit deze tabel, dus
 * ze blijven vanzelf in sync.
 */
export const LANGS: Lang[] = ["nl", "en", "de", "fr", "no"];

export const DEFAULT_LANG: Lang = "nl";

export type RouteKey =
  | "home" | "shop" | "product" | "bundle" | "compare" | "cart"
  | "about" | "origin" | "knowledge" | "knowledgeArticle"
  | "blog" | "blogPost" | "subscriptions" | "checkout" | "checkoutSuccess"
  | "thankYou" | "contact" | "faq" | "shipping" | "privacy" | "terms"
  | "recipes" | "recipeDetail" | "sustainability" | "glossary"
  | "landingPowder" | "landingAccessories" | "landingKits" | "landingTea"
  | "landingGifts" | "landingBeginners" | "landingAthletes"
  | "landingLowCaffeine" | "landingCoffeeSwap";

type SlugMap = Record<Lang, string>;

export const ROUTES: Record<RouteKey, SlugMap> = {
  home:             { nl: "",                          en: "",                         de: "",                          fr: "",                            no: "" },
  shop:             { nl: "shop",                      en: "shop",                     de: "shop",                      fr: "boutique",                    no: "butikk" },
  product:          { nl: "product",                   en: "product",                  de: "produkt",                   fr: "produit",                     no: "produkt" },
  bundle:           { nl: "bundel",                    en: "bundle",                   de: "bundle",                    fr: "coffret",                     no: "pakke" },
  compare:          { nl: "matcha-vergelijken",        en: "compare-matcha",           de: "matcha-vergleichen",        fr: "comparer-matcha",             no: "sammenlign-matcha" },
  cart:             { nl: "winkelwagen",               en: "cart",                     de: "warenkorb",                 fr: "panier",                      no: "handlekurv" },
  about:            { nl: "over-ons",                  en: "about",                    de: "ueber-uns",                 fr: "a-propos",                    no: "om-oss" },
  origin:           { nl: "herkomst",                  en: "origin",                   de: "herkunft",                  fr: "origine",                     no: "opprinnelse" },
  knowledge:        { nl: "kennis",                    en: "knowledge",                de: "wissen",                    fr: "savoir",                      no: "kunnskap" },
  knowledgeArticle: { nl: "kennis",                    en: "knowledge",                de: "wissen",                    fr: "savoir",                      no: "kunnskap" },
  blog:             { nl: "blog",                      en: "blog",                     de: "blog",                      fr: "blog",                        no: "blogg" },
  blogPost:         { nl: "blog",                      en: "blog",                     de: "blog",                      fr: "blog",                        no: "blogg" },
  subscriptions:    { nl: "abonnementen",              en: "subscriptions",            de: "abo",                       fr: "abonnements",                 no: "abonnement" },
  checkout:         { nl: "checkout",                  en: "checkout",                 de: "kasse",                     fr: "paiement",                    no: "kasse" },
  checkoutSuccess:  { nl: "checkout/success",          en: "checkout/success",         de: "kasse/erfolg",              fr: "paiement/succes",             no: "kasse/suksess" },
  thankYou:         { nl: "bedankt",                   en: "thank-you",                de: "danke",                     fr: "merci",                       no: "takk" },
  contact:          { nl: "contact",                   en: "contact",                  de: "kontakt",                   fr: "contact",                     no: "kontakt" },
  faq:              { nl: "faq",                       en: "faq",                      de: "faq",                       fr: "faq",                         no: "faq" },
  shipping:         { nl: "verzending",                en: "shipping",                 de: "versand",                   fr: "livraison",                   no: "frakt" },
  privacy:          { nl: "privacy",                   en: "privacy",                  de: "datenschutz",               fr: "confidentialite",             no: "personvern" },
  terms:            { nl: "voorwaarden",               en: "terms",                    de: "agb",                       fr: "conditions",                  no: "vilkar" },
  recipes:          { nl: "recepten",                  en: "recipes",                  de: "rezepte",                   fr: "recettes",                    no: "oppskrifter" },
  recipeDetail:     { nl: "recepten",                  en: "recipes",                  de: "rezepte",                   fr: "recettes",                    no: "oppskrifter" },
  sustainability:   { nl: "duurzaamheid",              en: "sustainability",           de: "nachhaltigkeit",            fr: "durabilite",                  no: "baerekraft" },
  glossary:         { nl: "matcha-woordenboek",        en: "matcha-glossary",          de: "matcha-glossar",            fr: "glossaire-matcha",            no: "matcha-ordbok" },

  landingPowder:      { nl: "matcha-poeder",             en: "matcha-powder",            de: "matcha-pulver",             fr: "poudre-de-matcha",            no: "matcha-pulver" },
  landingAccessories: { nl: "matcha-accessoires",        en: "matcha-accessories",       de: "matcha-zubehoer",           fr: "accessoires-matcha",          no: "matcha-tilbehor" },
  landingKits:        { nl: "matcha-kits",               en: "matcha-kits",              de: "matcha-sets",               fr: "coffrets-matcha",             no: "matcha-sett" },
  landingTea:         { nl: "japanse-thee",              en: "japanese-tea",             de: "japanischer-tee",           fr: "the-japonais",                no: "japansk-te" },
  landingGifts:       { nl: "cadeau-gids",               en: "gift-guide",               de: "geschenkeguide",            fr: "guide-cadeaux",               no: "gave-guide" },
  landingBeginners:   { nl: "matcha-voor-beginners",     en: "matcha-for-beginners",     de: "matcha-fuer-anfaenger",     fr: "matcha-pour-debutants",       no: "matcha-for-nybegynnere" },
  landingAthletes:    { nl: "matcha-voor-sporters",      en: "matcha-for-athletes",      de: "matcha-fuer-sportler",      fr: "matcha-pour-sportifs",        no: "matcha-for-utovere" },
  landingLowCaffeine: { nl: "cafeinearme-thee",          en: "low-caffeine-tea",         de: "koffeinarmer-tee",          fr: "the-faible-en-cafeine",       no: "koffeinfri-te" },
  landingCoffeeSwap:  { nl: "matcha-als-koffievervanger", en: "matcha-instead-of-coffee", de: "matcha-statt-kaffee",       fr: "matcha-au-lieu-du-cafe",      no: "matcha-istedenfor-kaffe" },
};

/** Route-keys die een `:slug` parameter achter de basis-slug hebben. */
export const DETAIL_ROUTES: RouteKey[] = [
  "product", "knowledgeArticle", "blogPost", "recipeDetail",
];

/** Bouwt een absoluut pad met taalprefix: ("shop", "no") → "/no/butikk". */
export const localizedPath = (key: RouteKey, lang: Lang, slug?: string): string => {
  const base = ROUTES[key][lang];
  const parts = [lang, base, slug].filter(Boolean);
  return "/" + parts.join("/");
};

/**
 * Zoekt op welke pagina een Nederlands pad hoort. Interne links in de code
 * gebruiken nog de NL-paden (`/shop`, `/over-ons`); de Link-wrapper vertaalt
 * die hiermee naar de actieve taal. Retourneert null voor onbekende paden.
 */
export const matchDutchPath = (
  pathname: string
): { key: RouteKey; slug?: string } | null => {
  const clean = pathname.split(/[?#]/)[0].replace(/^\/+|\/+$/g, "");
  if (clean === "") return { key: "home" };

  // Langste NL-slug eerst, zodat "checkout/success" wint van "checkout".
  const byLength = (Object.keys(ROUTES) as RouteKey[])
    .filter(k => ROUTES[k].nl !== "")
    .sort((a, b) => ROUTES[b].nl.length - ROUTES[a].nl.length);

  for (const key of byLength) {
    const nlSlug = ROUTES[key].nl;
    if (clean === nlSlug) {
      // Detailroutes delen hun basis met de overzichtspagina (kennis, blog).
      return { key: DETAIL_ROUTES.includes(key) ? overviewOf(key) : key };
    }
    if (clean.startsWith(nlSlug + "/")) {
      const rest = clean.slice(nlSlug.length + 1);
      const detail = detailKeyFor(nlSlug);
      if (detail) return { key: detail, slug: rest };
      return { key, slug: rest };
    }
  }
  return null;
};

/** Overzichtspagina die bij een detailroute hoort. */
const overviewOf = (key: RouteKey): RouteKey => {
  if (key === "knowledgeArticle") return "knowledge";
  if (key === "blogPost") return "blog";
  if (key === "recipeDetail") return "recipes";
  return key;
};

/** Detailroute die bij een NL-basisslug hoort, indien die bestaat. */
const detailKeyFor = (nlSlug: string): RouteKey | null => {
  if (nlSlug === ROUTES.product.nl) return "product";
  if (nlSlug === ROUTES.knowledge.nl) return "knowledgeArticle";
  if (nlSlug === ROUTES.blog.nl) return "blogPost";
  if (nlSlug === ROUTES.recipes.nl) return "recipeDetail";
  return null;
};

/** Leest de taal uit het eerste padsegment. Null als er geen taalprefix staat. */
export const langFromPath = (pathname: string): Lang | null => {
  const first = pathname.split("/").filter(Boolean)[0];
  return LANGS.includes(first as Lang) ? (first as Lang) : null;
};

/**
 * Vertaalt een volledig pad mét taalprefix naar een andere taal - voor de
 * taalwisselaar en de hreflang-tags. Valt terug op de homepage van de
 * doeltaal als het pad niet herkend wordt.
 */
export const translatePath = (pathname: string, target: Lang): string => {
  const current = langFromPath(pathname);
  if (!current) return localizedPath("home", target);

  const rest = pathname.split("/").filter(Boolean).slice(1).join("/");
  if (rest === "") return localizedPath("home", target);

  const byLength = (Object.keys(ROUTES) as RouteKey[])
    .filter(k => ROUTES[k][current] !== "")
    .sort((a, b) => ROUTES[b][current].length - ROUTES[a][current].length);

  for (const key of byLength) {
    const slug = ROUTES[key][current];
    if (rest === slug) return localizedPath(key, target);
    if (rest.startsWith(slug + "/")) {
      const detail = detailKeyFor(ROUTES[key].nl);
      return localizedPath(detail ?? key, target, rest.slice(slug.length + 1));
    }
  }
  return localizedPath("home", target);
};
