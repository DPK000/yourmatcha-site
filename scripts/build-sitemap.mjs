#!/usr/bin/env node
/**
 * Sitemap-generator voor één domein met taalprefixen.
 *
 * De site draait op yourmatcha.com met de taal in het pad (/no/butikk). Dit
 * script leest de slugs per taal uit src/i18n/routes.ts, zodat er geen tweede
 * lijst met URL's ontstaat die uit de pas kan lopen: een pagina toevoegen doe
 * je daar, en de sitemap volgt vanzelf.
 *
 * Emit: public/sitemap.xml met elke pagina in elke taal, plus xhtml:link
 * hreflang-alternates tussen de taalvarianten. Blogposts komen per taal alleen
 * in de sitemap als er een vertaling is; producten met `hidden: true` nooit.
 */

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const TODAY = new Date().toISOString().slice(0, 10);

const SITE_URL = "https://yourmatcha.com";
const LANGS = ["nl", "en", "de", "fr", "no"];
const HREFLANG = { nl: "nl-NL", en: "en-GB", de: "de-DE", fr: "fr-FR", no: "nb-NO" };
const DEFAULT_LANG = "nl";

// ────────────────────────────────────────────────────────────────────────
// Routemanifest inlezen: ROUTES[key][lang] = slug
// ────────────────────────────────────────────────────────────────────────
const ROUTES = (() => {
  const src = readFileSync(join(ROOT, "src/i18n/routes.ts"), "utf8");
  const body = src.slice(
    src.indexOf("export const ROUTES"),
    src.indexOf("/** Route-keys die een")
  );
  const out = {};
  for (const m of body.matchAll(/(\w+):\s*\{([^}]*)\}/g)) {
    const slugs = {};
    for (const p of m[2].matchAll(/(\w+):\s*"([^"]*)"/g)) slugs[p[1]] = p[2];
    if (LANGS.every((l) => l in slugs)) out[m[1]] = slugs;
  }
  return out;
})();

/** Absoluut pad met taalprefix: ("shop", "no") → "/no/butikk" */
const pathFor = (key, lang, slug) =>
  "/" + [lang, ROUTES[key][lang], slug].filter(Boolean).join("/");

// ────────────────────────────────────────────────────────────────────────
// Parse slugs from a data file
// ────────────────────────────────────────────────────────────────────────
const extractSlugs = (relativePath) => {
  const content = readFileSync(join(ROOT, relativePath), "utf8");
  const matches = [...content.matchAll(/slug:\s*"([^"]+)"/g)];
  return [...new Set(matches.map((m) => m[1]))];
};

/**
 * Per slug-blok (van deze `slug:` tot de volgende) checken of een patroon
 * voorkomt — voor `hidden: true` en voor aanwezige taalblokken (`no:`/`de:`).
 */
const slugBlocksMatching = (relativePath, pattern, { invert = false, stopAt } = {}) => {
  let content = readFileSync(join(ROOT, relativePath), "utf8");
  // Begrens de scan tot de data-array: code en comments eronder mogen het
  // laatste slug-blok niet vervuilen (bv. een comment met `hidden: true`).
  if (stopAt && content.includes(stopAt)) content = content.slice(0, content.indexOf(stopAt));
  const matches = [...content.matchAll(/slug:\s*"([^"]+)"/g)];
  const out = [];
  for (let i = 0; i < matches.length; i++) {
    const start = matches[i].index;
    const end = i + 1 < matches.length ? matches[i + 1].index : content.length;
    const hit = pattern.test(content.slice(start, end));
    if (hit !== invert) out.push(matches[i][1]);
  }
  return [...new Set(out)];
};

const productSlugs = slugBlocksMatching("src/data/products.ts", /hidden:\s*true/, {
  invert: true,
  stopAt: "// ─── EINDE productsRaw ───",
});
const recipeSlugs = extractSlugs("src/data/recipes.ts");
const knowledgeSlugs = extractSlugs("src/data/knowledge.ts");
const landingSlugs = extractSlugs("src/data/landings.ts");
const blogSlugsAll = extractSlugs("src/data/blog.ts");
const blogSlugsPerLang = {
  nl: blogSlugsAll,
  no: slugBlocksMatching("src/data/blog.ts", /\bno:\s*\{/),
  de: slugBlocksMatching("src/data/blog.ts", /\bde:\s*\{/),
};

// ────────────────────────────────────────────────────────────────────────
// High-priority slugs get a boosted score
// ────────────────────────────────────────────────────────────────────────
const HIGH_PRIORITY_LANDINGS = new Set([
  "matcha-poeder",
  "cadeau-gids",
  "matcha-voor-beginners",
]);

const HIGH_PRIORITY_KNOWLEDGE = new Set([
  "beste-matcha-kopen-2026",
  "matcha-vs-koffie",
  "matcha-bereiden",
  "matcha-latte-maken",
  "matcha-tijdens-zwangerschap",
  "matcha-en-afvallen",
  "matcha-cadeau-ideeen",
  "matcha-starterspakket",
  "iced-matcha-bereiden",
]);

// ────────────────────────────────────────────────────────────────────────
// Build entries (canonical Dutch paths; localizePath vertaalt per site)
// ────────────────────────────────────────────────────────────────────────
const staticEntries = [
  { key: "home", priority: 1.0 },

  // Commerce
  { key: "shop", priority: 0.9 },
  { key: "bundle", priority: 0.8 },
  { key: "compare", priority: 0.8 },
  { key: "subscriptions", priority: 0.8 },

  // Content
  { key: "knowledge", priority: 0.8 },
  { key: "blog", priority: 0.8 },
  { key: "recipes", priority: 0.8 },
  { key: "glossary", priority: 0.7 },

  // Merk
  { key: "about", priority: 0.7 },
  { key: "origin", priority: 0.8 },
  { key: "sustainability", priority: 0.7 },

  // Support
  { key: "contact", priority: 0.6 },
  { key: "faq", priority: 0.7 },
  { key: "shipping", priority: 0.6 },

  // Juridisch — nodig, niet promotioneel
  { key: "privacy", priority: 0.3 },
  { key: "terms", priority: 0.3 },
];

/** Landingspagina-slug uit landings.ts → route-key in het manifest. */
const LANDING_KEYS = {
  "matcha-poeder": "landingPowder",
  "matcha-accessoires": "landingAccessories",
  "matcha-kits": "landingKits",
  "japanse-thee": "landingTea",
  "cadeau-gids": "landingGifts",
  "matcha-voor-beginners": "landingBeginners",
  "matcha-voor-sporters": "landingAthletes",
  "cafeinearme-thee": "landingLowCaffeine",
  "matcha-als-koffievervanger": "landingCoffeeSwap",
};

/**
 * Alle pagina's als {key, slug, priority}. Taal-onafhankelijk: pathFor zet ze
 * later om naar het pad per taal, zodat elke URL in elke taal bestaat.
 */
const allPages = (lang) => {
  const entries = [
    ...staticEntries.map((e) => ({ key: e.key, priority: e.priority })),
    ...landingSlugs
      .filter((slug) => LANDING_KEYS[slug])
      .map((slug) => ({
        key: LANDING_KEYS[slug],
        priority: HIGH_PRIORITY_LANDINGS.has(slug) ? 0.9 : 0.8,
      })),
    ...productSlugs.map((slug) => ({ key: "product", slug, priority: 0.7 })),
    ...knowledgeSlugs.map((slug) => ({
      key: "knowledgeArticle",
      slug,
      priority: HIGH_PRIORITY_KNOWLEDGE.has(slug) ? 0.9 : 0.7,
    })),
    ...(blogSlugsPerLang[lang] || blogSlugsPerLang.nl).map((slug) => ({
      key: "blogPost",
      slug,
      priority: 0.6,
    })),
    ...recipeSlugs.map((slug) => ({ key: "recipeDetail", slug, priority: 0.7 })),
  ];
  const seen = new Set();
  return entries.filter((e) => {
    const id = e.key + "|" + (e.slug || "");
    if (seen.has(id)) return false;
    seen.add(id);
    return true;
  });
};

// ────────────────────────────────────────────────────────────────────────
// Emit: één sitemap met elke pagina in elke taal
// ────────────────────────────────────────────────────────────────────────
const alternates = (page) =>
  [
    ...LANGS.map(
      (l) =>
        `    <xhtml:link rel="alternate" hreflang="${HREFLANG[l]}" href="${SITE_URL}${pathFor(page.key, l, page.slug)}"/>`
    ),
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}${pathFor(page.key, DEFAULT_LANG, page.slug)}"/>`,
  ].join("\n");

const urls = [];
for (const lang of LANGS) {
  for (const page of allPages(lang)) {
    urls.push(`  <url>
    <loc>${SITE_URL}${pathFor(page.key, lang, page.slug)}</loc>
${alternates(page)}
    <lastmod>${TODAY}</lastmod>
    <priority>${page.priority.toFixed(1)}</priority>
  </url>`);
  }
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join("\n")}
</urlset>
`;
writeFileSync(join(ROOT, "public/sitemap.xml"), xml);
console.log(`✓ public/sitemap.xml — ${urls.length} URLs (${LANGS.length} talen)`);
