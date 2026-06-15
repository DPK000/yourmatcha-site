#!/usr/bin/env node
/**
 * Dynamic sitemap generator.
 *
 * Parses slug fields from data files and emits public/sitemap.xml.
 * Runs automatically before `npm run build` via the `prebuild` hook.
 *
 * Static routes are listed below. Generated routes (products, recipes,
 * knowledge, blog, landings) are derived from src/data/*.ts.
 *
 * Excludes admin/checkout/cart routes — those should not be indexed.
 */

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const SITE_URL = "https://yourmatcha.nl";
const TODAY = new Date().toISOString().slice(0, 10);

// ────────────────────────────────────────────────────────────────────────
// Parse slugs from a data file
// ────────────────────────────────────────────────────────────────────────
const extractSlugs = (relativePath) => {
  const content = readFileSync(join(ROOT, relativePath), "utf8");
  const matches = [...content.matchAll(/slug:\s*"([^"]+)"/g)];
  return [...new Set(matches.map((m) => m[1]))];
};

// Products flagged `hidden: true` are temporarily offline — keep them out of
// the sitemap (they 404 on the site too). Each product's `hidden` flag sits in
// the block between its own `slug:` and the next product's `slug:`.
const extractVisibleProductSlugs = () => {
  const content = readFileSync(join(ROOT, "src/data/products.ts"), "utf8");
  const matches = [...content.matchAll(/slug:\s*"([^"]+)"/g)];
  const visible = [];
  for (let i = 0; i < matches.length; i++) {
    const start = matches[i].index;
    const end = i + 1 < matches.length ? matches[i + 1].index : content.length;
    if (/hidden:\s*true/.test(content.slice(start, end))) continue;
    visible.push(matches[i][1]);
  }
  return [...new Set(visible)];
};

const productSlugs = extractVisibleProductSlugs();
const recipeSlugs = extractSlugs("src/data/recipes.ts");
const knowledgeSlugs = extractSlugs("src/data/knowledge.ts");
const blogSlugs = extractSlugs("src/data/blog.ts");
const landingSlugs = extractSlugs("src/data/landings.ts");

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
// Build entries
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

const landingEntries = landingSlugs.map((slug) => ({
  loc: `/${slug}`,
  priority: HIGH_PRIORITY_LANDINGS.has(slug) ? 0.9 : 0.8,
}));

const productEntries = productSlugs.map((slug) => ({
  loc: `/product/${slug}`,
  priority: 0.7,
}));

const knowledgeEntries = knowledgeSlugs.map((slug) => ({
  loc: `/kennis/${slug}`,
  priority: HIGH_PRIORITY_KNOWLEDGE.has(slug) ? 0.9 : 0.7,
}));

const blogEntries = blogSlugs.map((slug) => ({
  loc: `/blog/${slug}`,
  priority: 0.6,
}));

const recipeEntries = recipeSlugs.map((slug) => ({
  loc: `/recepten/${slug}`,
  priority: 0.7,
}));

const allEntries = [
  ...staticEntries,
  ...landingEntries,
  ...productEntries,
  ...knowledgeEntries,
  ...blogEntries,
  ...recipeEntries,
];

// ────────────────────────────────────────────────────────────────────────
// Dedupe (in case a static route overlaps with a generated one)
// ────────────────────────────────────────────────────────────────────────
const seen = new Set();
const deduped = allEntries.filter((e) => {
  if (seen.has(e.loc)) return false;
  seen.add(e.loc);
  return true;
});

// ────────────────────────────────────────────────────────────────────────
// Emit XML
// ────────────────────────────────────────────────────────────────────────
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${deduped
  .map(
    (e) => `  <url>
    <loc>${SITE_URL}${e.loc}</loc>
    <lastmod>${TODAY}</lastmod>
    <priority>${e.priority.toFixed(1)}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

writeFileSync(join(ROOT, "public/sitemap.xml"), xml);

console.log(`✓ public/sitemap.xml — ${deduped.length} URLs`);
console.log(
  `  static: ${staticEntries.length}  ·  landings: ${landingEntries.length}  ·  products: ${productEntries.length}  ·  knowledge: ${knowledgeEntries.length}  ·  blog: ${blogEntries.length}  ·  recipes: ${recipeEntries.length}`,
);
