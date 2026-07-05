// YourMatcha — Transactional email via Resend
// Types: confirmation | shipped | payment_failed
// Languages: nl | en | de | no | fr

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const RESEND_API_KEY   = Deno.env.get("RESEND_API_KEY") || "";
const SHOP_NAME        = Deno.env.get("SHOP_NAME") || "YourMatcha";
const FROM_EMAIL       = Deno.env.get("FROM_EMAIL") || `YourMatcha <orders@yourmatcha.com>`;
const REPLY_TO         = Deno.env.get("REPLY_TO") || "hello@yourmatcha.com";
const SHOP_URL         = (Deno.env.get("SHOP_URL") || "https://yourmatcha.com").replace(/\/$/, "");
const PRIMARY          = Deno.env.get("SHOP_PRIMARY_COLOR") || "#3D6B53";
const PRIMARY_DARK     = "#2d5040";
const TAGLINE          = Deno.env.get("SHOP_TAGLINE") || "FROM UJI, JAPAN";
const SUPPORT_EMAIL    = Deno.env.get("REPLY_TO") || "hello@yourmatcha.com";

type Lang = "nl" | "en" | "de" | "no" | "fr";

const COUNTRY_LANG: Record<string, Lang> = {
  NL: "nl", BE: "nl", LU: "nl",
  DE: "de", AT: "de", CH: "de",
  NO: "no",
  FR: "fr",
  AU: "en", US: "en", GB: "en", CA: "en", IE: "en", NZ: "en",
};

function getLang(language?: string, country?: string): Lang {
  const l = language as Lang;
  if (l && ["nl","en","de","no","fr"].includes(l)) return l;
  if (country) return COUNTRY_LANG[country.toUpperCase()] || "en";
  return "en";
}

function escHtml(s: string): string {
  return String(s || "").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
}

function fmtAmount(amount: number, currency: string): string {
  const c = (currency || "EUR").toUpperCase();
  if (c === "NOK") return `${Math.round(amount).toLocaleString("nb-NO")} kr`;
  return `€ ${Number(amount).toFixed(2).replace(".", ",")}`;
}

function trackingUrl(carrier: string, code: string): string {
  const cl = (carrier || "").toLowerCase();
  if (cl.includes("postnl"))   return `https://postnl.nl/tracktrace/?B=${code}`;
  if (cl.includes("dhl"))      return `https://www.dhl.com/nl-nl/home/tracking.html?tracking-id=${code}`;
  if (cl.includes("ups"))      return `https://www.ups.com/track?tracknum=${code}`;
  if (cl.includes("dpd"))      return `https://tracking.dpd.de/status/en_US/parcel/${code}`;
  if (cl.includes("fedex"))    return `https://www.fedex.com/fedextrack/?trknbr=${code}`;
  if (cl.includes("bpost"))    return `https://track.bpost.be/btr/web/#/search?itemCode=${code}`;
  if (cl.includes("intime"))   return `https://portal.intime.delivery/trace/${code}`;
  if (cl.includes("auspost"))  return `https://auspost.com.au/mypost/track/#/details/${code}`;
  return `https://track.aftership.com/${code}`;
}

function resolveImage(src: string): string {
  if (!src) return "";
  if (src.startsWith("http")) return src;
  // Relative assets (Vite build hashes) — prepend SHOP_URL
  return `${SHOP_URL}${src.startsWith("/") ? "" : "/"}${src}`;
}

// ── Translations ────────────────────────────────────────────

const T: Record<Lang, Record<string, string>> = {
  nl: {
    confirmSubject:    "Bestelling #{order} bevestigd ✓",
    confirmHeadline:   "Bestelling bevestigd!",
    confirmIntro:      "Hoi {name}, bedankt voor je bestelling bij {shop}. We verwerken hem zo snel mogelijk.",
    shippedSubject:    "Je bestelling #{order} is onderweg! 🚀",
    shippedHeadline:   "Je pakket is onderweg!",
    shippedIntro:      "Hoi {name}, goed nieuws — je bestelling #{order} is zojuist verstuurd.",
    failedSubject:     "Betaling mislukt — bestelling #{order}",
    failedHeadline:    "Betaling mislukt",
    failedIntro:       "Hoi {name}, helaas is je betaling voor bestelling #{order} niet gelukt. Probeer het opnieuw.",
    retryBtn:          "Opnieuw proberen",
    orderLabel:        "Bestelling",
    dateLabel:         "Datum",
    totalLabel:        "Totaal",
    itemsTitle:        "Jouw producten",
    qty:               "Aantal",
    subtotal:          "Subtotaal",
    shipping:          "Verzendkosten",
    freeShip:          "Gratis",
    discount:          "Korting",
    total:             "Totaal",
    addressTitle:      "Bezorgadres",
    trackBtn:          "Volg je pakket",
    trackNote:         "Het kan tot 24 uur duren voordat tracking beschikbaar is.",
    trackLabel:        "Track & Trace",
    carrierLabel:      "Vervoerder",
    shopBtn:           "Verder winkelen",
    helpTitle:         "Hulp nodig?",
    helpText:          "Vragen over je bestelling? Ons team staat voor je klaar.",
    contactBtn:        "Neem contact op",
    trust1:            "100% biologisch",
    trust2:            "Snel bezorgd",
    trust3:            "30 dagen retour",
    footerRights:      "Alle rechten voorbehouden.",
    footerAddress:     "YourMatcha · Uji, Japan",
    unsubscribe:       "Uitschrijven",
    defaultName:       "daar",
    statusPending:     "In behandeling",
    estimatedDelivery: "Verwachte levering",
    days:              "werkdagen",
  },
  en: {
    confirmSubject:    "Order #{order} confirmed ✓",
    confirmHeadline:   "Order confirmed!",
    confirmIntro:      "Hi {name}, thank you for your order at {shop}. We're processing it as fast as we can.",
    shippedSubject:    "Your order #{order} is on its way! 🚀",
    shippedHeadline:   "Your package is on its way!",
    shippedIntro:      "Hi {name}, great news — your order #{order} has just been dispatched.",
    failedSubject:     "Payment failed — order #{order}",
    failedHeadline:    "Payment failed",
    failedIntro:       "Hi {name}, unfortunately your payment for order #{order} did not succeed. Please try again.",
    retryBtn:          "Try again",
    orderLabel:        "Order",
    dateLabel:         "Date",
    totalLabel:        "Total",
    itemsTitle:        "Your items",
    qty:               "Qty",
    subtotal:          "Subtotal",
    shipping:          "Shipping",
    freeShip:          "Free",
    discount:          "Discount",
    total:             "Total",
    addressTitle:      "Shipping address",
    trackBtn:          "Track your package",
    trackNote:         "Tracking information may take up to 24 hours to update.",
    trackLabel:        "Tracking number",
    carrierLabel:      "Carrier",
    shopBtn:           "Continue shopping",
    helpTitle:         "Need help?",
    helpText:          "Questions about your order? Our team is here for you.",
    contactBtn:        "Contact us",
    trust1:            "100% organic",
    trust2:            "Fast delivery",
    trust3:            "30-day returns",
    footerRights:      "All rights reserved.",
    footerAddress:     "YourMatcha · Uji, Japan",
    unsubscribe:       "Unsubscribe",
    defaultName:       "there",
    statusPending:     "Processing",
    estimatedDelivery: "Estimated delivery",
    days:              "business days",
  },
  de: {
    confirmSubject:    "Bestellung #{order} bestätigt ✓",
    confirmHeadline:   "Bestellung bestätigt!",
    confirmIntro:      "Hallo {name}, vielen Dank für deine Bestellung bei {shop}. Wir bearbeiten sie so schnell wie möglich.",
    shippedSubject:    "Deine Bestellung #{order} ist unterwegs! 🚀",
    shippedHeadline:   "Dein Paket ist unterwegs!",
    shippedIntro:      "Hallo {name}, gute Nachrichten — deine Bestellung #{order} wurde soeben versandt.",
    failedSubject:     "Zahlung fehlgeschlagen — Bestellung #{order}",
    failedHeadline:    "Zahlung fehlgeschlagen",
    failedIntro:       "Hallo {name}, leider war die Zahlung für Bestellung #{order} nicht erfolgreich. Bitte versuche es erneut.",
    retryBtn:          "Erneut versuchen",
    orderLabel:        "Bestellung",
    dateLabel:         "Datum",
    totalLabel:        "Gesamt",
    itemsTitle:        "Deine Produkte",
    qty:               "Menge",
    subtotal:          "Zwischensumme",
    shipping:          "Versand",
    freeShip:          "Kostenlos",
    discount:          "Rabatt",
    total:             "Gesamt",
    addressTitle:      "Lieferadresse",
    trackBtn:          "Paket verfolgen",
    trackNote:         "Es kann bis zu 24 Stunden dauern, bis die Tracking-Informationen verfügbar sind.",
    trackLabel:        "Sendungsnummer",
    carrierLabel:      "Versanddienstleister",
    shopBtn:           "Weiter einkaufen",
    helpTitle:         "Hilfe benötigt?",
    helpText:          "Fragen zu deiner Bestellung? Unser Team ist für dich da.",
    contactBtn:        "Kontakt aufnehmen",
    trust1:            "100% biologisch",
    trust2:            "Schnelle Lieferung",
    trust3:            "30 Tage Rückgabe",
    footerRights:      "Alle Rechte vorbehalten.",
    footerAddress:     "YourMatcha · Uji, Japan",
    unsubscribe:       "Abmelden",
    defaultName:       "dort",
    statusPending:     "In Bearbeitung",
    estimatedDelivery: "Voraussichtliche Lieferung",
    days:              "Werktage",
  },
  no: {
    confirmSubject:    "Bestilling #{order} bekreftet ✓",
    confirmHeadline:   "Bestillingen er bekreftet!",
    confirmIntro:      "Hei {name}, takk for bestillingen hos {shop}. Vi behandler den så raskt vi kan.",
    shippedSubject:    "Bestillingen din #{order} er på vei! 🚀",
    shippedHeadline:   "Pakken din er på vei!",
    shippedIntro:      "Hei {name}, gode nyheter — bestillingen din #{order} er nettopp sendt.",
    failedSubject:     "Betaling mislyktes — bestilling #{order}",
    failedHeadline:    "Betaling mislyktes",
    failedIntro:       "Hei {name}, dessverre mislyktes betalingen for bestilling #{order}. Vennligst prøv igjen.",
    retryBtn:          "Prøv igjen",
    orderLabel:        "Bestilling",
    dateLabel:         "Dato",
    totalLabel:        "Totalt",
    itemsTitle:        "Dine produkter",
    qty:               "Antall",
    subtotal:          "Delsum",
    shipping:          "Frakt",
    freeShip:          "Gratis",
    discount:          "Rabatt",
    total:             "Totalt",
    addressTitle:      "Leveringsadresse",
    trackBtn:          "Spor pakken din",
    trackNote:         "Det kan ta opptil 24 timer før sporingsinformasjon er tilgjengelig.",
    trackLabel:        "Sporingsnummer",
    carrierLabel:      "Transportør",
    shopBtn:           "Fortsett å handle",
    helpTitle:         "Trenger du hjelp?",
    helpText:          "Spørsmål om bestillingen din? Teamet vårt er her for deg.",
    contactBtn:        "Kontakt oss",
    trust1:            "100% økologisk",
    trust2:            "Rask levering",
    trust3:            "30 dagers retur",
    footerRights:      "Alle rettigheter forbeholdt.",
    footerAddress:     "YourMatcha · Uji, Japan",
    unsubscribe:       "Avslutt abonnement",
    defaultName:       "der",
    statusPending:     "Behandles",
    estimatedDelivery: "Estimert levering",
    days:              "virkedager",
  },
  fr: {
    confirmSubject:    "Commande #{order} confirmée ✓",
    confirmHeadline:   "Commande confirmée !",
    confirmIntro:      "Bonjour {name}, merci pour votre commande chez {shop}. Nous la traitons dès maintenant.",
    shippedSubject:    "Votre commande #{order} est en route ! 🚀",
    shippedHeadline:   "Votre colis est en route !",
    shippedIntro:      "Bonjour {name}, bonne nouvelle — votre commande #{order} vient d'être expédiée.",
    failedSubject:     "Paiement échoué — commande #{order}",
    failedHeadline:    "Paiement échoué",
    failedIntro:       "Bonjour {name}, votre paiement pour la commande #{order} n'a pas abouti. Veuillez réessayer.",
    retryBtn:          "Réessayer",
    orderLabel:        "Commande",
    dateLabel:         "Date",
    totalLabel:        "Total",
    itemsTitle:        "Vos articles",
    qty:               "Qté",
    subtotal:          "Sous-total",
    shipping:          "Livraison",
    freeShip:          "Gratuite",
    discount:          "Remise",
    total:             "Total",
    addressTitle:      "Adresse de livraison",
    trackBtn:          "Suivre votre colis",
    trackNote:         "Les informations de suivi peuvent mettre jusqu'à 24h à apparaître.",
    trackLabel:        "Numéro de suivi",
    carrierLabel:      "Transporteur",
    shopBtn:           "Continuer mes achats",
    helpTitle:         "Besoin d'aide ?",
    helpText:          "Des questions sur votre commande ? Notre équipe est là pour vous.",
    contactBtn:        "Nous contacter",
    trust1:            "100% biologique",
    trust2:            "Livraison rapide",
    trust3:            "Retours 30 jours",
    footerRights:      "Tous droits réservés.",
    footerAddress:     "YourMatcha · Uji, Japon",
    unsubscribe:       "Se désabonner",
    defaultName:       "là",
    statusPending:     "En traitement",
    estimatedDelivery: "Livraison estimée",
    days:              "jours ouvrables",
  },
};

const CN: Record<Lang, Record<string, string>> = {
  nl: { NL:"Nederland",BE:"België",DE:"Duitsland",FR:"Frankrijk",NO:"Noorwegen",GB:"Verenigd Koninkrijk",US:"VS",CA:"Canada",AU:"Australië",NZ:"Nieuw-Zeeland",AT:"Oostenrijk",CH:"Zwitserland",IE:"Ierland" },
  en: { NL:"Netherlands",BE:"Belgium",DE:"Germany",FR:"France",NO:"Norway",GB:"United Kingdom",US:"United States",CA:"Canada",AU:"Australia",NZ:"New Zealand",AT:"Austria",CH:"Switzerland",IE:"Ireland" },
  de: { NL:"Niederlande",BE:"Belgien",DE:"Deutschland",FR:"Frankreich",NO:"Norwegen",GB:"Vereinigtes Königreich",US:"USA",CA:"Kanada",AU:"Australien",NZ:"Neuseeland",AT:"Österreich",CH:"Schweiz",IE:"Irland" },
  no: { NL:"Nederland",BE:"Belgia",DE:"Tyskland",FR:"Frankrike",NO:"Norge",GB:"Storbritannia",US:"USA",CA:"Canada",AU:"Australia",NZ:"New Zealand",AT:"Østerrike",CH:"Sveits",IE:"Irland" },
  fr: { NL:"Pays-Bas",BE:"Belgique",DE:"Allemagne",FR:"France",NO:"Norvège",GB:"Royaume-Uni",US:"États-Unis",CA:"Canada",AU:"Australie",NZ:"Nouvelle-Zélande",AT:"Autriche",CH:"Suisse",IE:"Irlande" },
};

// ── HTML building blocks ─────────────────────────────────────

function shell(bodyContent: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>${escHtml(SHOP_NAME)}</title>
<!--[if mso]><noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript><![endif]-->
</head>
<body style="margin:0;padding:0;background-color:#f2f0eb;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f2f0eb;">
<tr><td align="center" style="padding:32px 16px 48px;">
<table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">
${bodyContent}
</table>
</td></tr>
</table>
</body>
</html>`;
}

function emailHeader(): string {
  return `
<tr>
  <td style="background-color:${PRIMARY_DARK};border-radius:12px 12px 0 0;padding:28px 40px;text-align:center;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td align="center">
          <div style="display:inline-block;background:rgba(255,255,255,0.08);border-radius:6px;padding:2px 12px;margin-bottom:14px;">
            <span style="font-family:Georgia,'Times New Roman',serif;font-size:22px;font-weight:normal;color:#ffffff;letter-spacing:4px;text-transform:uppercase;">${escHtml(SHOP_NAME)}</span>
          </div>
          <br>
          <span style="font-family:-apple-system,Helvetica,Arial,sans-serif;font-size:9px;color:rgba(255,255,255,0.4);letter-spacing:3px;text-transform:uppercase;">${escHtml(TAGLINE)}</span>
        </td>
      </tr>
    </table>
  </td>
</tr>`;
}

function card(content: string, noPaddingTop = false): string {
  const pt = noPaddingTop ? "0" : "36px";
  return `
<tr>
  <td style="background-color:#ffffff;padding:${pt} 40px 36px;">
    ${content}
  </td>
</tr>`;
}

function divider(): string {
  return `<tr><td style="background-color:#ffffff;padding:0 40px;"><div style="height:1px;background-color:#f0ece4;"></div></td></tr>`;
}

function heroSection(icon: string, headline: string, intro: string): string {
  return `
<div style="margin-bottom:32px;">
  <div style="width:52px;height:52px;background-color:#eef5f0;border-radius:50%;display:inline-table;margin-bottom:20px;">
    <table width="52" height="52" cellpadding="0" cellspacing="0"><tr><td align="center" valign="middle" style="font-size:22px;">${icon}</td></tr></table>
  </div>
  <h1 style="margin:0 0 10px;font-family:Georgia,'Times New Roman',serif;font-size:26px;font-weight:normal;color:#1a1a1a;line-height:1.3;">${headline}</h1>
  <p style="margin:0;font-family:-apple-system,Helvetica,Arial,sans-serif;font-size:15px;color:#6b7280;line-height:1.7;">${intro}</p>
</div>`;
}

function orderMetaBar(orderNum: string, date: string, total: string, statusLabel: string): string {
  return `
<tr>
  <td style="background-color:#faf9f6;border-top:1px solid #f0ece4;border-bottom:1px solid #f0ece4;padding:20px 40px;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td style="width:33%;padding-right:8px;">
          <p style="margin:0 0 4px;font-family:-apple-system,Helvetica,Arial,sans-serif;font-size:10px;color:#9ca3af;text-transform:uppercase;letter-spacing:1.5px;">Order</p>
          <p style="margin:0;font-family:-apple-system,Helvetica,Arial,sans-serif;font-size:13px;font-weight:600;color:#1a1a1a;">&#35;${escHtml(orderNum)}</p>
        </td>
        <td style="width:33%;text-align:center;padding:0 8px;border-left:1px solid #f0ece4;border-right:1px solid #f0ece4;">
          <p style="margin:0 0 4px;font-family:-apple-system,Helvetica,Arial,sans-serif;font-size:10px;color:#9ca3af;text-transform:uppercase;letter-spacing:1.5px;">Status</p>
          <p style="margin:0;font-family:-apple-system,Helvetica,Arial,sans-serif;font-size:13px;font-weight:600;color:${PRIMARY};">${escHtml(statusLabel)}</p>
        </td>
        <td style="width:33%;text-align:right;padding-left:8px;">
          <p style="margin:0 0 4px;font-family:-apple-system,Helvetica,Arial,sans-serif;font-size:10px;color:#9ca3af;text-transform:uppercase;letter-spacing:1.5px;">Total</p>
          <p style="margin:0;font-family:-apple-system,Helvetica,Arial,sans-serif;font-size:13px;font-weight:600;color:#1a1a1a;">${escHtml(total)}</p>
        </td>
      </tr>
    </table>
  </td>
</tr>`;
}

function itemsTable(items: any[], currency: string, t: Record<string, string>): string {
  if (!items || items.length === 0) return "";
  const rows = items.map((item: any) => {
    const img = resolveImage(item.product_image || "");
    const lineTotal = fmtAmount(Number(item.price) * Number(item.quantity), currency);
    const imgCell = img
      ? `<td style="width:56px;padding:0 16px 0 0;vertical-align:top;">
           <img src="${escHtml(img)}" alt="${escHtml(item.product_name)}" width="56" height="56"
             style="width:56px;height:56px;object-fit:cover;border-radius:6px;display:block;background-color:#f0ece4;">
         </td>`
      : `<td style="width:56px;padding:0 16px 0 0;vertical-align:top;">
           <div style="width:56px;height:56px;background-color:#eef5f0;border-radius:6px;display:inline-block;"></div>
         </td>`;
    return `
<tr>
  ${imgCell}
  <td style="vertical-align:top;padding-right:12px;">
    <p style="margin:0 0 4px;font-family:-apple-system,Helvetica,Arial,sans-serif;font-size:14px;font-weight:600;color:#1a1a1a;line-height:1.4;">${escHtml(item.product_name)}</p>
    <p style="margin:0;font-family:-apple-system,Helvetica,Arial,sans-serif;font-size:12px;color:#9ca3af;">${escHtml(t.qty)}: ${item.quantity}</p>
  </td>
  <td style="vertical-align:top;text-align:right;white-space:nowrap;">
    <p style="margin:0;font-family:-apple-system,Helvetica,Arial,sans-serif;font-size:14px;font-weight:600;color:#1a1a1a;">${lineTotal}</p>
  </td>
</tr>
<tr><td colspan="3" style="padding:10px 0 10px;"><div style="height:1px;background:#f5f2ed;"></div></td></tr>`;
  }).join("");

  return `
<h3 style="margin:0 0 20px;font-family:-apple-system,Helvetica,Arial,sans-serif;font-size:11px;font-weight:600;color:#9ca3af;text-transform:uppercase;letter-spacing:2px;">${escHtml(t.itemsTitle)}</h3>
<table width="100%" cellpadding="0" cellspacing="0" border="0">
  ${rows}
</table>`;
}

function totalsTable(order: any, currency: string, t: Record<string, string>): string {
  const sub  = Number(order.subtotal || 0);
  const ship = Number(order.shipping || 0);
  const disc = Number(order.discount_amount || 0);
  const tot  = Number(order.total || 0);
  const discRow = disc > 0 ? `
<tr>
  <td style="padding:5px 0;font-family:-apple-system,Helvetica,Arial,sans-serif;font-size:13px;color:#16a34a;">${escHtml(t.discount)} (${escHtml(order.discount_code || "")})</td>
  <td style="padding:5px 0;text-align:right;font-family:-apple-system,Helvetica,Arial,sans-serif;font-size:13px;color:#16a34a;font-weight:600;">−${fmtAmount(disc, currency)}</td>
</tr>` : "";
  return `
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:8px;">
  <tr>
    <td style="padding:5px 0;font-family:-apple-system,Helvetica,Arial,sans-serif;font-size:13px;color:#6b7280;">${escHtml(t.subtotal)}</td>
    <td style="padding:5px 0;text-align:right;font-family:-apple-system,Helvetica,Arial,sans-serif;font-size:13px;color:#1a1a1a;">${fmtAmount(sub, currency)}</td>
  </tr>
  <tr>
    <td style="padding:5px 0;font-family:-apple-system,Helvetica,Arial,sans-serif;font-size:13px;color:#6b7280;">${escHtml(t.shipping)}</td>
    <td style="padding:5px 0;text-align:right;font-family:-apple-system,Helvetica,Arial,sans-serif;font-size:13px;color:${ship === 0 ? "#16a34a" : "#1a1a1a"};">${ship === 0 ? escHtml(t.freeShip) : fmtAmount(ship, currency)}</td>
  </tr>
  ${discRow}
  <tr>
    <td colspan="2" style="padding:12px 0 4px;"><div style="height:1px;background:#e8e3d8;"></div></td>
  </tr>
  <tr>
    <td style="padding:4px 0;font-family:-apple-system,Helvetica,Arial,sans-serif;font-size:16px;font-weight:700;color:#1a1a1a;">${escHtml(t.total)}</td>
    <td style="padding:4px 0;text-align:right;font-family:Georgia,'Times New Roman',serif;font-size:18px;font-weight:700;color:${PRIMARY};">${fmtAmount(tot, currency)}</td>
  </tr>
</table>`;
}

function addressBlock(order: any, lang: Lang, t: Record<string, string>): string {
  const country = CN[lang]?.[order.country] || order.country || "";
  const lines = [
    `${escHtml(order.first_name || "")} ${escHtml(order.last_name || "")}`.trim(),
    escHtml(order.address || ""),
    `${escHtml(order.postal_code || "")} ${escHtml(order.city || "")}`.trim(),
    escHtml(country),
    order.phone ? escHtml(order.phone) : "",
  ].filter(Boolean).join("<br>");

  return `
<table width="100%" cellpadding="0" cellspacing="0" border="0">
  <tr>
    <td style="background-color:#faf9f6;border-radius:8px;padding:20px 24px;">
      <p style="margin:0 0 10px;font-family:-apple-system,Helvetica,Arial,sans-serif;font-size:10px;font-weight:600;color:#9ca3af;text-transform:uppercase;letter-spacing:2px;">${escHtml(t.addressTitle)}</p>
      <p style="margin:0;font-family:-apple-system,Helvetica,Arial,sans-serif;font-size:14px;color:#374151;line-height:1.8;">${lines}</p>
    </td>
  </tr>
</table>`;
}

function ctaButton(label: string, url: string, color = PRIMARY): string {
  return `
<table width="100%" cellpadding="0" cellspacing="0" border="0">
  <tr>
    <td align="center" style="padding:8px 0;">
      <a href="${escHtml(url)}" target="_blank"
        style="display:inline-block;background-color:${color};color:#ffffff;font-family:-apple-system,Helvetica,Arial,sans-serif;font-size:14px;font-weight:600;text-decoration:none;padding:14px 36px;border-radius:6px;letter-spacing:0.3px;">
        ${escHtml(label)}
      </a>
    </td>
  </tr>
</table>`;
}

function trackingCard(trackNum: string, carrier: string, url: string, t: Record<string, string>): string {
  return `
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:24px;">
  <tr>
    <td style="background-color:#eef5f0;border:1px solid #c6dfd0;border-radius:10px;padding:24px 28px;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td>
            <p style="margin:0 0 16px;font-family:-apple-system,Helvetica,Arial,sans-serif;font-size:10px;font-weight:600;color:#4a7c59;text-transform:uppercase;letter-spacing:2px;">&#128230; ${escHtml(t.trackLabel)}</p>
            <p style="margin:0 0 4px;font-family:'Courier New',Courier,monospace;font-size:18px;font-weight:700;color:${PRIMARY};letter-spacing:2px;">${escHtml(trackNum)}</p>
            <p style="margin:0 0 20px;font-family:-apple-system,Helvetica,Arial,sans-serif;font-size:12px;color:#6b9b7a;">${escHtml(t.carrierLabel)}: ${escHtml(carrier || "—")}</p>
            <a href="${escHtml(url)}" target="_blank"
              style="display:inline-block;background-color:${PRIMARY};color:#ffffff;font-family:-apple-system,Helvetica,Arial,sans-serif;font-size:13px;font-weight:600;text-decoration:none;padding:11px 28px;border-radius:5px;">
              ${escHtml(t.trackBtn)} →
            </a>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
<p style="margin:0 0 24px;font-family:-apple-system,Helvetica,Arial,sans-serif;font-size:12px;color:#9ca3af;text-align:center;">${escHtml(t.trackNote)}</p>`;
}

function trustBadges(t: Record<string, string>): string {
  const badges = [
    { icon: "🌿", label: t.trust1 },
    { icon: "📦", label: t.trust2 },
    { icon: "💚", label: t.trust3 },
  ];
  const cells = badges.map(b => `
    <td style="text-align:center;padding:0 8px;">
      <div style="font-size:20px;margin-bottom:6px;">${b.icon}</div>
      <p style="margin:0;font-family:-apple-system,Helvetica,Arial,sans-serif;font-size:11px;color:#9ca3af;">${escHtml(b.label)}</p>
    </td>`).join("");
  return `
<tr>
  <td style="background-color:#faf9f6;border-top:1px solid #f0ece4;padding:24px 40px;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>${cells}</tr>
    </table>
  </td>
</tr>`;
}

function helpSection(t: Record<string, string>): string {
  return `
<tr>
  <td style="background-color:#ffffff;padding:0 40px 32px;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td style="background-color:#faf9f6;border-radius:8px;padding:20px 24px;text-align:center;">
          <p style="margin:0 0 4px;font-family:-apple-system,Helvetica,Arial,sans-serif;font-size:14px;font-weight:600;color:#1a1a1a;">${escHtml(t.helpTitle)}</p>
          <p style="margin:0 0 14px;font-family:-apple-system,Helvetica,Arial,sans-serif;font-size:13px;color:#6b7280;">${escHtml(t.helpText)}</p>
          <a href="mailto:${escHtml(SUPPORT_EMAIL)}"
            style="display:inline-block;border:1.5px solid ${PRIMARY};color:${PRIMARY};font-family:-apple-system,Helvetica,Arial,sans-serif;font-size:13px;font-weight:600;text-decoration:none;padding:9px 24px;border-radius:5px;">
            ${escHtml(t.contactBtn)}
          </a>
        </td>
      </tr>
    </table>
  </td>
</tr>`;
}

function emailFooter(t: Record<string, string>, orderNum: string): string {
  return `
<tr>
  <td style="padding:28px 40px;text-align:center;border-radius:0 0 12px 12px;">
    <p style="margin:0 0 8px;font-family:Georgia,'Times New Roman',serif;font-size:13px;color:#9ca3af;letter-spacing:2px;text-transform:uppercase;">${escHtml(SHOP_NAME)}</p>
    <p style="margin:0 0 4px;font-family:-apple-system,Helvetica,Arial,sans-serif;font-size:11px;color:#c0bcb4;">${escHtml(t.footerAddress)}</p>
    <p style="margin:0 0 16px;font-family:-apple-system,Helvetica,Arial,sans-serif;font-size:11px;color:#c0bcb4;">© ${new Date().getFullYear()} ${escHtml(SHOP_NAME)} — ${escHtml(t.footerRights)}</p>
    <p style="margin:0;font-family:-apple-system,Helvetica,Arial,sans-serif;font-size:11px;">
      <a href="mailto:${escHtml(SUPPORT_EMAIL)}" style="color:#9ca3af;text-decoration:none;">${escHtml(SUPPORT_EMAIL)}</a>
      &nbsp;·&nbsp;
      <a href="${escHtml(SHOP_URL)}" style="color:#9ca3af;text-decoration:none;">${escHtml(SHOP_URL.replace("https://",""))}</a>
    </p>
  </td>
</tr>`;
}

// ── Email builders ───────────────────────────────────────────

function buildConfirmation(order: any, items: any[], t: Record<string, string>, lang: Lang): string {
  const currency = order.currency || "EUR";
  const locale   = { nl:"nl-NL", de:"de-DE", no:"nb-NO", fr:"fr-FR", en:"en-GB" }[lang] ?? "en-GB";
  const dateStr  = new Date(order.created_at || Date.now()).toLocaleDateString(locale, { year:"numeric", month:"long", day:"numeric" });
  const name     = escHtml(order.first_name || t.defaultName);
  const intro    = t.confirmIntro
    .replace("{name}", name)
    .replace("{shop}", escHtml(SHOP_NAME))
    .replace("#{order}", `<strong>#${escHtml(order.order_number)}</strong>`);

  return shell(`
${emailHeader()}
${orderMetaBar(order.order_number, dateStr, fmtAmount(Number(order.total), currency), t.statusPending)}
${card(`
  ${heroSection("✅", t.confirmHeadline, intro)}
  ${itemsTable(items, currency, t)}
  ${totalsTable(order, currency, t)}
`)}
${divider()}
${card(`${addressBlock(order, lang, t)}`, true)}
${divider()}
${card(`${ctaButton(t.shopBtn, `${SHOP_URL}/shop`)}`, true)}
${trustBadges(t)}
${helpSection(t)}
${emailFooter(t, order.order_number)}
`);
}

function buildShipped(order: any, items: any[], trackNum: string, carrier: string, t: Record<string, string>, lang: Lang): string {
  const currency = order.currency || "EUR";
  const url      = trackingUrl(carrier, trackNum);
  const name     = escHtml(order.first_name || t.defaultName);
  const intro    = t.shippedIntro
    .replace("{name}", name)
    .replace("#{order}", `<strong>#${escHtml(order.order_number)}</strong>`);

  return shell(`
${emailHeader()}
${card(`
  ${heroSection("🚀", t.shippedHeadline, intro)}
  ${trackingCard(trackNum, carrier, url, t)}
`, false)}
${divider()}
${card(`
  ${itemsTable(items, currency, t)}
  ${totalsTable(order, currency, t)}
`, true)}
${divider()}
${card(`${addressBlock(order, lang, t)}`, true)}
${trustBadges(t)}
${helpSection(t)}
${emailFooter(t, order.order_number)}
`);
}

function buildPaymentFailed(order: any, t: Record<string, string>, lang: Lang): string {
  const name  = escHtml(order.first_name || t.defaultName);
  const intro = t.failedIntro
    .replace("{name}", name)
    .replace("#{order}", `<strong>#${escHtml(order.order_number)}</strong>`);

  return shell(`
${emailHeader()}
${card(`
  ${heroSection("⚠️", t.failedHeadline, intro)}
  ${ctaButton(t.retryBtn, `${SHOP_URL}/checkout`, "#dc2626")}
`, false)}
${helpSection(t)}
${emailFooter(t, order.order_number)}
`);
}

// ── Main handler ─────────────────────────────────────────────

interface EmailPayload {
  type: "confirmation" | "shipped" | "payment_failed";
  orderId?: string;
  email: string;
  orderNumber: string;
  trackingNumber?: string;
  trackingCarrier?: string;
  language?: string;
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY not configured");

    const payload = (await req.json()) as EmailPayload;
    const { type, email, orderNumber } = payload;
    if (!email || !orderNumber) throw new Error("Missing email or orderNumber");

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { data: order, error: orderErr } = await supabase
      .from("orders").select("*").eq("order_number", orderNumber).single();
    if (orderErr || !order) throw new Error(`Order not found: ${orderNumber}`);

    const { data: items } = await supabase
      .from("order_items").select("*").eq("order_id", order.id);

    const lang = getLang(payload.language, order.country);
    const t    = T[lang];

    let subject: string;
    let html: string;

    if (type === "confirmation") {
      subject = t.confirmSubject.replace("{order}", order.order_number);
      html    = buildConfirmation(order, items || [], t, lang);
    } else if (type === "shipped") {
      const tn = payload.trackingNumber || order.tracking_code || "";
      const tc = payload.trackingCarrier || order.tracking_carrier || "";
      subject  = t.shippedSubject.replace("{order}", order.order_number);
      html     = buildShipped(order, items || [], tn, tc, t, lang);
    } else if (type === "payment_failed") {
      subject = t.failedSubject.replace("{order}", order.order_number);
      html    = buildPaymentFailed(order, t, lang);
    } else {
      throw new Error(`Unknown email type: ${type}`);
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${RESEND_API_KEY}` },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [email],
        reply_to: REPLY_TO,
        subject,
        html,
      }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(`Resend error: ${data?.message || JSON.stringify(data)}`);

    console.log(`[send-order-email] ${type} (${lang}) → ${email} [${orderNumber}]`);
    return new Response(
      JSON.stringify({ success: true, resendId: data.id, language: lang }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (err) {
    console.error("[send-order-email]", err);
    return new Response(
      JSON.stringify({ error: (err as Error).message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
