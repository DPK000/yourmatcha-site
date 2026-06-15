# yourmatcha.no — Domein Setup

Korte handleiding om `yourmatcha.no` te koppelen aan de bestaande Vercel deploy. De code is al klaar:

- `src/i18n/index.ts` detecteert hostname `.no` en zet de taal automatisch op Noors (Bokmål).
- `src/components/SEO.tsx` zet hreflang tags per taal/domein en `og:locale` op `nb_NO`.
- Producten, blog, knowledge en recipes hebben Noorse vertalingen via `i18n.no` blocks.
- Valuta: bezoekers met taal Noors zien prijzen standaard in NOK (vaste koers EUR→NOK 11,5 in `src/context/CurrencyContext.tsx`) en **rekenen ook echt af in NOK** via Stripe. De checkout stuurt de omgerekende kronen-bedragen + `currency: "nok"` naar de edge function; de order wordt met `currency: 'NOK'` opgeslagen en de bevestigingsmail toont kr-bedragen (en is in het Noors voor land NO).
- `public/sitemap-no.xml` staat klaar en is aangemeld in `robots.txt`.

## Stap 1 — Domein registreren

`.no` domeinen worden uitgegeven door Norid. Particulieren/bedrijven buiten Noorwegen hebben een Noors organisatienummer of een local presence-dienst nodig (veel registrars zoals Domeneshop, EuroDNS of 101domain bieden dit aan).

## Stap 2 — Domein toevoegen aan Vercel

1. Open je Vercel project: https://vercel.com/dashboard
2. Selecteer het `yourmatcha-site` project.
3. **Settings → Domains → Add**
4. Vul in: `yourmatcha.no`
5. Vercel toont DNS records die je moet toevoegen bij je registrar:
   - **A record** `@` → `76.76.21.21` (apex)
   - **CNAME** `www` → `cname.vercel-dns.com.`
6. Voeg ook `www.yourmatcha.no` toe als redirect naar de apex.

## Stap 3 — DNS bij registrar

| Type  | Naam | Waarde                  | TTL  |
|-------|------|-------------------------|------|
| A     | @    | 76.76.21.21             | 3600 |
| CNAME | www  | cname.vercel-dns.com.   | 3600 |

> **Tip:** Vercel toont de exacte records die nodig zijn — gebruik altijd die als bron.

DNS-propagatie duurt meestal 5–60 min, soms tot 24 uur.

## Stap 4 — SSL Certificaat

Vercel issued automatisch een Let's Encrypt SSL cert zodra het domein verifieert.

## Stap 5 — Search Console

1. Voeg `yourmatcha.no` toe als property in Google Search Console.
2. Dien `https://yourmatcha.no/sitemap-no.xml` in.

## NOK-betalingen activeren (eenmalig)

De code staat klaar, maar er zijn twee deploy-stappen nodig:

1. **Database-migratie** — voer `supabase/migrate-orders-currency.sql` uit in de Supabase SQL editor (voegt de kolom `orders.currency` toe; bestaande orders blijven EUR).
2. **Edge functions opnieuw deployen**:
   ```sh
   supabase functions deploy stripe-create-payment-intent
   supabase functions deploy send-order-email
   ```

In Stripe zelf hoeft niets aangezet te worden: kaarten, Apple Pay en Google Pay accepteren NOK direct (Stripe rekent de uitbetaling om naar je EUR-saldo, met Stripe's eigen wisselkoers + fee). Betaalmethodes die geen NOK ondersteunen (iDEAL, Bancontact) verbergt Stripe automatisch bij NOK-betalingen. Overweeg in het Stripe Dashboard **Klarna** te activeren — populair in Noorwegen en ondersteunt NOK.

> Let op: de site rekent met een vaste koers (11,5). Wijkt de echte koers veel af, pas dan `EUR_TO_NOK` aan in `src/context/CurrencyContext.tsx` (en de statische kr-bedragen in de Noorse teksten als je wilt dat die kloppen).

## Verzending naar Noorwegen

Noorwegen zit niet in de EU: houd rekening met douane/BTW (MVA) bij import. Overweeg een `Norway {NO}` shipping zone in Supabase `shipping_zones` (vergelijkbaar met de Duitse zone in `supabase/schema.sql`). De verzendtabel op de site toont voor Noorse bezoekers indicatief "149 kr · 4–7 virkedager".
