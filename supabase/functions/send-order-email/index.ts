// Supabase Edge Function: send-order-email
// Multilingual (NL/EN/DE) transactional emails via Resend.
// Language auto-detected from order country. To add a language: add key to T object.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") || "";
const SHOP_NAME = Deno.env.get("SHOP_NAME") || "My Shop";
const FROM_EMAIL = Deno.env.get("FROM_EMAIL") || `${SHOP_NAME} <orders@example.com>`;
const SHOP_URL = Deno.env.get("SHOP_URL") || "https://example.com";
const PRIMARY_COLOR = Deno.env.get("SHOP_PRIMARY_COLOR") || "${PRIMARY_COLOR}";
const SHOP_TAGLINE = Deno.env.get("SHOP_TAGLINE") || "OFFICIAL";

type Lang = "nl" | "en" | "de" | "no";

const COUNTRY_TO_LANG: Record<string, Lang> = {
  NL: "nl", BE: "nl", LU: "nl",
  DE: "de", AT: "de", CH: "de",
  NO: "no",
  AU: "en", US: "en", GB: "en", CA: "en", IE: "en", NZ: "en",
};

function getLang(language?: string, country?: string): Lang {
  if (language && (language === "nl" || language === "en" || language === "de" || language === "no")) return language;
  if (country) return COUNTRY_TO_LANG[country.toUpperCase()] || "en";
  return "en";
}

// Valutasymbool: order.currency is leidend (bedragen staan in die valuta); land is fallback
function cur(order: { currency?: string; country?: string }): string {
  const code = (order.currency || "").toUpperCase();
  if (code === "NOK") return "kr ";
  if (code && code !== "EUR") return `${code} `;
  const c = (order.country || "").toUpperCase();
  if (c === "AU" || c === "NZ") return "AUD ";
  if (c === "US" || c === "CA") return "$";
  if (c === "GB") return "£";
  return "€";
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// ── TRANSLATIONS — add new language = add new key ────────────

const T: Record<Lang, Record<string, string>> = {
  nl: {
    confirmSubject: "Bestelling #{order} in behandeling — ${SHOP_NAME}",
    confirmTitle: "Je bestelling is in behandeling! 📦",
    confirmBody: "Hoi {name}, bedankt voor je bestelling! We hebben bestelling <strong>#{order}</strong> ontvangen en zijn deze nu aan het verwerken. Je ontvangt een email met tracking informatie zodra je pakket is verzonden.",
    shippedSubject: "Je bestelling #{order} is onderweg! 📦",
    shippedTitle: "Je bestelling is onderweg! 🚀",
    shippedBody: "Hoi {name}, goed nieuws! Je bestelling <strong>#{order}</strong> is verzonden en is onderweg naar je.",
    trackingNumber: "Tracking nummer", carrier: "Vervoerder",
    trackBtn: "📦 Volg je bestelling",
    trackNote: "Het kan tot 24 uur duren voordat tracking informatie beschikbaar is.",
    orderHeader: "Bestelling", product: "Product", quantity: "Aantal", price: "Prijs",
    subtotal: "Subtotaal", discount: "Korting", shipping: "Verzending",
    freeShipping: "Gratis verzending", total: "Totaal",
    shippingAddress: "Verzendadres", shopBtn: "Verder winkelen",
    footer: "Vragen? Mail ons op", seeLink: "Zie tracking link",
    defaultName: "daar",
  },
  en: {
    confirmSubject: "Order #{order} being processed — ${SHOP_NAME}",
    confirmTitle: "Your order is being processed! 📦",
    confirmBody: "Hi {name}, thank you for your order! We've received order <strong>#{order}</strong> and are processing it now. You'll receive an email with tracking information once your package has been shipped.",
    shippedSubject: "Your order #{order} has been shipped! 📦",
    shippedTitle: "Your order is on its way! 🚀",
    shippedBody: "Hi {name}, great news! Your order <strong>#{order}</strong> has been shipped and is on its way to you.",
    trackingNumber: "Tracking number", carrier: "Carrier",
    trackBtn: "📦 Track your order",
    trackNote: "It can take up to 24 hours for tracking information to become available.",
    orderHeader: "Order", product: "Product", quantity: "Qty", price: "Price",
    subtotal: "Subtotal", discount: "Discount", shipping: "Shipping",
    freeShipping: "Free shipping", total: "Total",
    shippingAddress: "Shipping address", shopBtn: "Continue shopping",
    footer: "Questions? Email us at", seeLink: "See tracking link",
    defaultName: "there",
  },
  de: {
    confirmSubject: "Bestellung #{order} in Bearbeitung — ${SHOP_NAME}",
    confirmTitle: "Deine Bestellung wird bearbeitet! 📦",
    confirmBody: "Hallo {name}, vielen Dank für deine Bestellung! Wir haben Bestellung <strong>#{order}</strong> erhalten und bearbeiten sie jetzt. Du erhältst eine E-Mail mit Tracking-Informationen, sobald dein Paket versendet wurde.",
    shippedSubject: "Deine Bestellung #{order} ist unterwegs! 📦",
    shippedTitle: "Deine Bestellung ist unterwegs! 🚀",
    shippedBody: "Hallo {name}, gute Nachrichten! Deine Bestellung <strong>#{order}</strong> wurde versendet und ist auf dem Weg zu dir.",
    trackingNumber: "Sendungsnummer", carrier: "Versanddienstleister",
    trackBtn: "📦 Bestellung verfolgen",
    trackNote: "Es kann bis zu 24 Stunden dauern, bis die Tracking-Informationen verfügbar sind.",
    orderHeader: "Bestellung", product: "Produkt", quantity: "Menge", price: "Preis",
    subtotal: "Zwischensumme", discount: "Rabatt", shipping: "Versand",
    freeShipping: "Kostenloser Versand", total: "Gesamt",
    shippingAddress: "Lieferadresse", shopBtn: "Weiter einkaufen",
    footer: "Fragen? Schreib uns an", seeLink: "Siehe Tracking-Link",
    defaultName: "dort",
  },
  no: {
    confirmSubject: "Bestilling #{order} behandles — ${SHOP_NAME}",
    confirmTitle: "Bestillingen din behandles! 📦",
    confirmBody: "Hei {name}, takk for bestillingen din! Vi har mottatt bestilling <strong>#{order}</strong> og behandler den nå. Du får en e-post med sporingsinformasjon så snart pakken din er sendt.",
    shippedSubject: "Bestillingen din #{order} er på vei! 📦",
    shippedTitle: "Bestillingen din er på vei! 🚀",
    shippedBody: "Hei {name}, gode nyheter! Bestillingen din <strong>#{order}</strong> er sendt og på vei til deg.",
    trackingNumber: "Sporingsnummer", carrier: "Transportør",
    trackBtn: "📦 Spor bestillingen din",
    trackNote: "Det kan ta opptil 24 timer før sporingsinformasjonen er tilgjengelig.",
    orderHeader: "Bestilling", product: "Produkt", quantity: "Antall", price: "Pris",
    subtotal: "Delsum", discount: "Rabatt", shipping: "Frakt",
    freeShipping: "Gratis frakt", total: "Totalt",
    shippingAddress: "Leveringsadresse", shopBtn: "Fortsett å handle",
    footer: "Spørsmål? Send oss en e-post på", seeLink: "Se sporingslenke",
    defaultName: "der",
  },
};

const CN: Record<Lang, Record<string, string>> = {
  nl: { NL: "Nederland", BE: "België", DE: "Duitsland", GB: "Verenigd Koninkrijk", US: "Verenigde Staten", CA: "Canada", AU: "Australië", NZ: "Nieuw-Zeeland", AT: "Oostenrijk", CH: "Zwitserland", FR: "Frankrijk", IE: "Ierland", NO: "Noorwegen" },
  en: { NL: "Netherlands", BE: "Belgium", DE: "Germany", GB: "United Kingdom", US: "United States", CA: "Canada", AU: "Australia", NZ: "New Zealand", AT: "Austria", CH: "Switzerland", FR: "France", IE: "Ireland", NO: "Norway" },
  de: { NL: "Niederlande", BE: "Belgien", DE: "Deutschland", GB: "Vereinigtes Königreich", US: "Vereinigte Staaten", CA: "Kanada", AU: "Australien", NZ: "Neuseeland", AT: "Österreich", CH: "Schweiz", FR: "Frankreich", IE: "Irland", NO: "Norwegen" },
  no: { NL: "Nederland", BE: "Belgia", DE: "Tyskland", GB: "Storbritannia", US: "USA", CA: "Canada", AU: "Australia", NZ: "New Zealand", AT: "Østerrike", CH: "Sveits", FR: "Frankrike", IE: "Irland", NO: "Norge" },
};

// ── Shared HTML blocks ───────────────────────────────────────

const header = `<div style="background:${PRIMARY_COLOR};border-radius:12px 12px 0 0;padding:30px;text-align:center;"><h1 style="margin:0;font-family:sans-serif;font-size:24px;color:#fff;letter-spacing:1px;">${SHOP_NAME.toUpperCase()}</h1><p style="margin:4px 0 0;font-family:sans-serif;font-size:11px;color:rgba(255,255,255,0.6);letter-spacing:2px;">${SHOP_TAGLINE}</p></div>`;

function footer(t: Record<string, string>) {
  return `<div style="text-align:center;padding:24px 0;"><p style="font-family:sans-serif;font-size:12px;color:#999;margin:0;">© ${new Date().getFullYear()} ${SHOP_NAME} — All rights reserved.</p><p style="font-family:sans-serif;font-size:11px;color:#bbb;margin:8px 0 0;">${t.footer} <a href="mailto:${FROM_EMAIL}" style="color:${PRIMARY_COLOR};">${FROM_EMAIL}</a></p></div>`;
}

function details(order: any, items: any[], t: Record<string, string>, lang: Lang) {
  const c = cur(order);
  const locale = lang === "nl" ? "nl-NL" : lang === "de" ? "de-DE" : lang === "no" ? "nb-NO" : "en-AU";
  const dateStr = new Date(order.created_at || Date.now()).toLocaleDateString(locale, { year: "numeric", month: "long", day: "numeric" });
  const country = CN[lang]?.[order.country] || order.country || "";
  const rows = (items || []).map((i: any) => `<tr><td style="padding:12px 8px;border-bottom:1px solid #eee;font-family:sans-serif;font-size:13px;color:#333;"><strong>${escapeHtml(i.product_name)}</strong></td><td style="padding:12px 8px;border-bottom:1px solid #eee;font-family:sans-serif;font-size:13px;color:#666;text-align:center;">${i.quantity}</td><td style="padding:12px 8px;border-bottom:1px solid #eee;font-family:sans-serif;font-size:13px;color:#333;text-align:right;">${c}${(Number(i.price)*i.quantity).toFixed(2)}</td></tr>`).join("");
  const sub = Number(order.subtotal||0), ship = Number(order.shipping||0), disc = Number(order.discount||0), tot = Number(order.total||0);
  return `<div style="background:#f9f9f6;border-radius:8px;padding:16px 20px;margin-bottom:20px;"><h3 style="margin:0;font-family:sans-serif;font-size:16px;color:${PRIMARY_COLOR};">${t.orderHeader} #${escapeHtml(order.order_number)} <span style="font-weight:normal;color:#888;font-size:13px;">(${dateStr})</span></h3></div><table style="width:100%;border-collapse:collapse;margin-bottom:16px;"><thead><tr style="border-bottom:2px solid ${PRIMARY_COLOR};"><th style="padding:8px;font-family:sans-serif;font-size:11px;color:#888;text-transform:uppercase;letter-spacing:1px;text-align:left;">${t.product}</th><th style="padding:8px;font-family:sans-serif;font-size:11px;color:#888;text-transform:uppercase;letter-spacing:1px;text-align:center;">${t.quantity}</th><th style="padding:8px;font-family:sans-serif;font-size:11px;color:#888;text-transform:uppercase;letter-spacing:1px;text-align:right;">${t.price}</th></tr></thead><tbody>${rows}</tbody></table><table style="width:100%;border-collapse:collapse;margin-bottom:24px;"><tr><td style="padding:6px 8px;font-family:sans-serif;font-size:13px;color:#888;">${t.subtotal}</td><td style="padding:6px 8px;font-family:sans-serif;font-size:13px;color:#888;text-align:right;">${c}${sub.toFixed(2)}</td></tr>${disc>0?`<tr><td style="padding:6px 8px;font-family:sans-serif;font-size:13px;color:#22c55e;">${t.discount}</td><td style="padding:6px 8px;font-family:sans-serif;font-size:13px;color:#22c55e;text-align:right;">-${c}${disc.toFixed(2)}</td></tr>`:""}<tr><td style="padding:6px 8px;font-family:sans-serif;font-size:13px;color:#888;">${t.shipping}</td><td style="padding:6px 8px;font-family:sans-serif;font-size:13px;color:#888;text-align:right;">${ship===0?`<span style="color:#22c55e;">${t.freeShipping}</span>`:`${c}${ship.toFixed(2)}`}</td></tr><tr><td style="padding:10px 8px 6px;font-family:sans-serif;font-size:16px;font-weight:bold;color:${PRIMARY_COLOR};border-top:2px solid ${PRIMARY_COLOR};">${t.total}</td><td style="padding:10px 8px 6px;font-family:sans-serif;font-size:16px;font-weight:bold;color:${PRIMARY_COLOR};text-align:right;border-top:2px solid ${PRIMARY_COLOR};">${c}${tot.toFixed(2)}</td></tr></table><div style="background:#f9f9f6;border-radius:8px;padding:20px;margin-bottom:24px;"><h4 style="margin:0 0 8px;font-family:sans-serif;font-size:12px;color:#888;text-transform:uppercase;letter-spacing:1px;">${t.shippingAddress}</h4><p style="margin:0;font-family:sans-serif;font-size:14px;color:#333;line-height:1.6;">${escapeHtml(order.first_name||"")} ${escapeHtml(order.last_name||"")}<br>${escapeHtml(order.address||"")}<br>${escapeHtml(order.postal_code||"")} ${escapeHtml(order.city||"")}<br>${country}${order.phone?`<br>${escapeHtml(order.phone)}`:""}</p></div>`;
}

// ── Main Handler ─────────────────────────────────────────────

interface EmailPayload { type: "confirmation"|"shipped"; orderId?: string; email: string; firstName?: string; orderNumber: string; trackingNumber?: string; trackingCarrier?: string; language?: string; }

serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY not configured");
    const payload = (await req.json()) as EmailPayload;
    const { type, email, orderNumber } = payload;
    if (!email || !orderNumber) throw new Error("Missing email or orderNumber");

    const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    const { data: order, error: orderErr } = await supabase.from("orders").select("*").eq("order_number", orderNumber).single();
    if (orderErr || !order) throw new Error(`Order not found: ${orderNumber}`);
    const { data: items } = await supabase.from("order_items").select("*").eq("order_id", order.id);

    const lang = getLang(payload.language, order.country);
    const t = T[lang];
    const name = escapeHtml(order.first_name || t.defaultName);
    let subject: string, html: string;

    if (type === "confirmation") {
      subject = t.confirmSubject.replace("{order}", order.order_number);
      html = `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body style="margin:0;padding:0;background:#f5f5f0;"><div style="max-width:600px;margin:0 auto;padding:40px 20px;">${header}<div style="background:#fff;padding:40px 30px;border-radius:0 0 12px 12px;"><h2 style="margin:0 0 8px;font-family:sans-serif;font-size:22px;color:${PRIMARY_COLOR};">${t.confirmTitle}</h2><p style="font-family:sans-serif;font-size:15px;color:#666;line-height:1.6;margin:0 0 24px;">${t.confirmBody.replace("{name}", name).replace("{order}", order.order_number)}</p>${details(order, items||[], t, lang)}<div style="text-align:center;margin:20px 0 10px;"><a href="${SHOP_URL}/shop" style="display:inline-block;background:${PRIMARY_COLOR};color:#fff;font-family:sans-serif;font-size:14px;font-weight:600;text-decoration:none;padding:14px 32px;border-radius:8px;">${t.shopBtn}</a></div></div>${footer(t)}</div></body></html>`;
    } else if (type === "shipped") {
      const tn = payload.trackingNumber || order.tracking_number || "";
      const tc = payload.trackingCarrier || order.tracking_carrier || "";
      let url = `https://track.aftership.com/${tn}`;
      const cl = tc.toLowerCase();
      if (cl.includes("ups")) url = `https://www.ups.com/track?tracknum=${tn}`;
      else if (cl.includes("usps")) url = `https://tools.usps.com/go/TrackConfirmAction?tLabels=${tn}`;
      else if (cl.includes("postnl")) url = `https://postnl.nl/tracktrace/?B=${tn}`;
      else if (cl.includes("dhl")) url = `https://www.dhl.com/nl-nl/home/tracking.html?tracking-id=${tn}`;
      else if (cl.includes("intime")) url = `https://portal.intime.delivery/trace/${tn}`;
      else if (cl.includes("auspost") || cl.includes("australia")) url = `https://auspost.com.au/mypost/track/#/details/${tn}`;
      subject = t.shippedSubject.replace("{order}", order.order_number);
      html = `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body style="margin:0;padding:0;background:#f5f5f0;"><div style="max-width:600px;margin:0 auto;padding:40px 20px;">${header}<div style="background:#fff;padding:40px 30px;border-radius:0 0 12px 12px;"><h2 style="margin:0 0 8px;font-family:sans-serif;font-size:22px;color:${PRIMARY_COLOR};">${t.shippedTitle}</h2><p style="font-family:sans-serif;font-size:15px;color:#666;line-height:1.6;margin:0 0 24px;">${t.shippedBody.replace("{name}", name).replace("{order}", order.order_number)}</p><div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:20px;margin-bottom:24px;"><p style="margin:0 0 4px;font-family:sans-serif;font-size:12px;color:#888;text-transform:uppercase;letter-spacing:1px;">${t.trackingNumber}</p><p style="margin:0 0 12px;font-family:monospace;font-size:16px;color:${PRIMARY_COLOR};font-weight:bold;">${escapeHtml(tn)}</p><p style="margin:0 0 4px;font-family:sans-serif;font-size:12px;color:#888;text-transform:uppercase;letter-spacing:1px;">${t.carrier}</p><p style="margin:0;font-family:sans-serif;font-size:14px;color:#333;">${escapeHtml(tc) || t.seeLink}</p></div><div style="text-align:center;margin:0 0 24px;"><a href="${url}" style="display:inline-block;background:${PRIMARY_COLOR};color:#fff;font-family:sans-serif;font-size:14px;font-weight:600;text-decoration:none;padding:14px 32px;border-radius:8px;">${t.trackBtn}</a><p style="font-family:sans-serif;font-size:12px;color:#999;margin:8px 0 0;">${t.trackNote}</p></div><hr style="border:none;border-top:1px solid #eee;margin:0 0 24px;">${details(order, items||[], t, lang)}</div>${footer(t)}</div></body></html>`;
    } else { throw new Error(`Unknown type: ${type}`); }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${RESEND_API_KEY}` },
      body: JSON.stringify({ from: FROM_EMAIL, to: [email], subject, html }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(`Resend: ${data?.message || JSON.stringify(data)}`);
    console.log(`[send-order-email] Sent "${type}" (${lang}) to ${email} for ${orderNumber}`);
    return new Response(JSON.stringify({ success: true, resendId: data.id, language: lang }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (err) {
    console.error("[send-order-email]", err);
    return new Response(JSON.stringify({ error: (err as Error).message }), { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 });
  }
});
