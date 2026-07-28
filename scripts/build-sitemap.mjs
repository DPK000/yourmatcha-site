#!/usr/bin/env node
/**
 * Dynamic multi-domain sitemap generator.
 *
 * Emits één sitemap per domein — public/sitemap.xml (yourmatcha.nl),
 * public/sitemap-no.xml (yourmatcha.no) en public/sitemap-de.xml
 * (yourmatcha.de) — met xhtml:link hreflang-alternates per URL.
 * Draait automatisch vóór `npm run build` via het `sitemap` script.
 *
 * Landingspagina's gebruiken op .no Noorse slugs (route-aliassen in App.tsx);
 * alle overige paden zijn op elk domein gelijk. Blogposts worden per taal
 * alleen opgenomen als er een vertaling bestaat. Producten met `hidden: true`
 * blijven overal buiten de sitemap.
 */

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const TODAY = new Date().toISOString().slice(0, 10);

const SITES = [
  { lang: "nl", hreflang: "nl-NL", domain: "https://yourmatcha.nl", file: "public/sitemap.xml" },
  { lang: "no", hreflang: "nb-NO", domain: "https://yourmatcha.no", file: "public/sitemap-no.xml" },
  { lang: "de", hreflang: "de-DE", domain: "https://yourmatcha.de", file: "public/sitemap-de.xml" },
];

// Noorse slugs voor landingspagina's (zelfde pagina's, eigen keyword-URL's)
const NO_LANDING_SLUGS = {
  "matcha-poeder":              "matcha-pulver",
  "matcha-accessoires":         "matcha-tilbehor",
  "matcha-kits":                "matcha-sett",
  "japanse-thee":               "japansk-te",
  "cadeau-gids":                "gave-guide",
  "matcha-voor-beginners":      "matcha-for-nybegynnere",
  "matcha-voor-sporters":       "matcha-for-utovere",
  "cafeinearme-thee":           "koffeinfri-te",
  "matcha-als-koffievervanger": "matcha-istedenfor-kaffe",
};

/** Vertaalt een pad naar het juiste pad voor een taal (nu alleen landing-slugs voor no). */
const localizePath = (loc, lang) => {
  if (lang !== "no") return loc;
  const slug = loc.replace(/^\//, "");
  return NO_LANDING_SLUGS[slug] ? `/${NO_LANDING_SLUGS[slug]}` : loc;
};

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
const slugBlocksMatching = (relativePath, pattern, { invert = false } = {}) => {
  const content = readFileSync(join(ROOT, relativePath), "utf8");
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

const productSlugs = slugBlocksMatching("src/data/products.ts", /hidden:\s*true/, { invert: true });
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
  { loc: "/", priority: 1.0 },

  // Commerce hubs
  { loc: "/shop", priority: 0.9 },
  { loc: "/bundel", priority: 0.8 },
  { loc: "/matcha-vergelijken", priority: 0.8 },
  { loc: "/abonnementen", priority: 0.8 },

  // Content hubs
  { loc: "/kennis", priority: 0.8 },
  { loc: "/blog", priority: 0.8 },
  { loc: "/recepten", priority: 0.8 },
  { loc: "/matcha-woordenboek", priority: 0.7 },

  // Brand
  { loc: "/over-ons", priority: 0.7 },
  { loc: "/herkomst", priority: 0.8 },
  { loc: "/duurzaamheid", priority: 0.7 },

  // Support
  { loc: "/contact", priority: 0.6 },
  { loc: "/faq", priority: 0.7 },
  { loc: "/verzending", priority: 0.6 },

  // Legal (low priority — needed but not promotional)
  { loc: "/privacy", priority: 0.3 },
  { loc: "/voorwaarden", priority: 0.3 },
];

const entriesForLang = (lang) => {
  const entries = [
    ...staticEntries,
    ...landingSlugs.map((slug) => ({
      loc: `/${slug}`,
      priority: HIGH_PRIORITY_LANDINGS.has(slug) ? 0.9 : 0.8,
    })),
    ...productSlugs.map((slug) => ({ loc: `/product/${slug}`, priority: 0.7 })),
    ...knowledgeSlugs.map((slug) => ({
      loc: `/kennis/${slug}`,
      priority: HIGH_PRIORITY_KNOWLEDGE.has(slug) ? 0.9 : 0.7,
    })),
    ...blogSlugsPerLang[lang].map((slug) => ({ loc: `/blog/${slug}`, priority: 0.6 })),
    ...recipeSlugs.map((slug) => ({ loc: `/recepten/${slug}`, priority: 0.7 })),
  ];
  const seen = new Set();
  return entries.filter((e) => {
    if (seen.has(e.loc)) return false;
    seen.add(e.loc);
    return true;
  });
};

// ────────────────────────────────────────────────────────────────────────
// Emit XML per site, met hreflang-alternates naar de andere domeinen
// ────────────────────────────────────────────────────────────────────────
const alternates = (loc) =>
  [
    ...SITES.map(
      (s) =>
        `    <xhtml:link rel="alternate" hreflang="${s.hreflang}" href="${s.domain}${localizePath(loc, s.lang)}"/>`,
    ),
    `    <xhtml:link rel="alternate" hreflang="x-default" href="https://yourmatcha.nl${loc}"/>`,
  ].join("\n");

for (const site of SITES) {
  const entries = entriesForLang(site.lang);
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries
  .map(
    (e) => `  <url>
    <loc>${site.domain}${localizePath(e.loc, site.lang)}</loc>
${alternates(e.loc)}
    <lastmod>${TODAY}</lastmod>
    <priority>${e.priority.toFixed(1)}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;
  writeFileSync(join(ROOT, site.file), xml);
  console.log(`✓ ${site.file} — ${entries.length} URLs (${site.domain})`);
}
