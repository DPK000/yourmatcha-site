# yourmatcha.de — Domein Setup

Korte handleiding om `yourmatcha.de` te koppelen aan de bestaande Vercel deploy. De code is al klaar:

- `src/i18n/index.ts` detecteert hostname `.de` en zet de taal automatisch op Duits.
- `src/components/SEO.tsx` zet hreflang tags per taal/domein en `og:locale` op `de_DE`.
- Producten, blog en (later) knowledge/recipes hebben Duitse vertalingen via `i18n.de` blocks.
- Supabase `shipping_zones` heeft `Germany {DE}` met `tax_rate: 19, free_threshold: €60` (zie `supabase/schema.sql`).

## Stap 1 — Domein registreren

Als je `yourmatcha.de` nog niet hebt: registreer bij een DNS provider die `.de` TLD ondersteunt (TransIP, OpenProvider, GoDaddy, Hostnet). `.de` registraties vereisen vaak DENIC-validatie van NAW-gegevens.

## Stap 2 — Domein toevoegen aan Vercel

1. Open je Vercel project: https://vercel.com/dashboard
2. Selecteer het `yourmatcha-site` project.
3. **Settings → Domains → Add**
4. Vul in: `yourmatcha.de`
5. Vercel toont DNS records die je moet toevoegen bij je registrar:
   - **A record** `@` → `76.76.21.21` (apex)
   - **CNAME** `www` → `cname.vercel-dns.com.`
6. Voeg in dezelfde stap ook `www.yourmatcha.de` toe als redirect naar de apex.

## Stap 3 — DNS bij registrar

Log in bij je registrar (waar het domein staat), open DNS-beheer voor `yourmatcha.de`:

| Type  | Naam | Waarde                  | TTL  |
|-------|------|-------------------------|------|
| A     | @    | 76.76.21.21             | 3600 |
| CNAME | www  | cname.vercel-dns.com.   | 3600 |

> **Tip:** Vercel toont de exacte records die nodig zijn — gebruik altijd die als bron. Hierboven is alleen de standaard configuratie.

DNS-propagatie duurt meestal 5–60 min, soms tot 24 uur.

## Stap 4 — SSL Certificaat

Vercel issued automatisch een Let's Encrypt SSL cert zodra het domein verifieert. Je hoeft niks te doen — wacht tot je een groen vinkje ziet bij het domein in de Vercel Dashboard.

## Stap 5 — Verificatie

Zodra propagatie klaar is, test in een browser:

1. Open `https://yourmatcha.de` — de site moet automatisch in het **Duits** verschijnen (taal-switcher in header staat op DE).
2. Klik door naar Shop, ProductDetail, Vergleichen — alles moet Duits zijn.
3. Open ook `https://yourmatcha.nl` — die moet Nederlands blijven.
4. Controleer met `view-source:`:
   - `<html lang="de">` op .de
   - `<link rel="alternate" hreflang="de-DE" href="https://yourmatcha.de/...">` aanwezig
   - `<meta property="og:locale" content="de_DE">` op .de

## Stap 6 — Google Search Console

Voeg `yourmatcha.de` toe als nieuw property in Google Search Console:

1. https://search.google.com/search-console → Add property → Domain
2. Verifieer via DNS TXT record (Vercel logs ondersteunen deze setup automatisch).
3. Dien de Duitse sitemap in: `https://yourmatcha.de/sitemap.xml`
4. **International Targeting** wordt nu automatisch geregeld via de hreflang tags die `SEO.tsx` rendert.

## Stap 7 — Analytics (optioneel)

Als je Google Analytics gebruikt:

1. Voeg `yourmatcha.de` toe als extra view/property in GA4.
2. Of gebruik dezelfde GA4 stream met `linker domain` config om cross-domain tracking te behouden.

## Stap 8 — Duitse BTW & Levering

Database-zijde is al ingesteld in `supabase/schema.sql`:

```sql
('Germany',  '{DE}',  5.95,  60.00, 2, 4,  19,  true, true, 3)
```

Verzendkosten: **€5,95** • Gratis vanaf **€60** • BTW: **19%** • Levertijd: **2–4 werkdagen**

> Als je migrate-products.sql al hebt gerund maar de DE zone ontbreekt, run `supabase/schema.sql` opnieuw (de `on conflict do nothing` clausule voorkomt duplicaten).

## Troubleshooting

- **Site verschijnt in het Nederlands op .de**: localStorage cache van eerder bezoek aan .nl. Open `yourmatcha.de` in incognito-modus om te testen.
- **404 op alle .de routes**: Vercel routing klopt niet — check dat `vercel.json` aanwezig is (rewrites `/(.*)` → `/index.html`).
- **SSL error**: Wacht 5 min, Vercel issued certificaat in achtergrond na DNS verificatie.

## Wat is er voor jou nu nog te doen?

1. Domein `yourmatcha.de` registreren (extern) — als nog niet gebeurd.
2. Vercel `Add Domain` → DNS records bij registrar invullen.
3. Wachten op DNS propagatie + SSL.
4. Verifiëren in browser.
5. Search Console toevoegen + sitemap submitten.
