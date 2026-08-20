import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Link } from "@/components/LocalizedLink";
import { Check, Loader2, Clock, Package, Truck, Mail, AlertTriangle, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { trackPurchase } from "@/hooks/useMetaPixel";
import { supabase } from "@/lib/buqe-commerce";
import { useLang } from "@/i18n";
import SEO from "@/components/SEO";

type Status = "verifying" | "paid" | "processing" | "pending" | "error";

const COPY = {
  nl: {
    verifyingTitle:      "Betaling controleren…",
    verifyingBody:       "Even geduld, we bevestigen je bestelling.",
    paidTitle:           "Bestelling bevestigd!",
    paidSub:             "Bedankt voor je bestelling. Je ontvangt zo een bevestigingsmail.",
    orderNumber:         "Bestelnummer",
    nextTitle:           "Wat gebeurt er nu?",
    nextStep1Title:      "Bevestiging",
    nextStep1Body:       "Je ontvangt direct een bevestigingsmail met je orderoverzicht.",
    nextStep2Title:      "Verwerking",
    nextStep2Body:       "We bereiden je bestelling zorgvuldig voor en verpakken hem met aandacht.",
    nextStep3Title:      "Verzending",
    nextStep3Body:       "Je bestelling gaat op de post en je krijgt een track & trace zodra hij onderweg is. Levering duurt 5-7 werkdagen.",
    shopBtn:             "Verder winkelen",
    discoverBtn:         "Ontdek recepten",
    processingTitle:     "Betaling in behandeling",
    processingBody:      "Je betaling is ontvangen en wordt verwerkt - dit duurt gewoonlijk enkele minuten. Je krijgt een e-mail zodra de bestelling bevestigd is.",
    pendingTitle:        "Bestelling ontvangen",
    pendingBody:         "Je betaling wordt nog verwerkt. Zodra deze bevestigd is, sturen we je een e-mail met je orderoverzicht.",
    errorTitle:          "Er ging iets mis",
    errorBody:           "We konden je betaling niet verifiëren. Als je net hebt betaald, neem dan even contact met ons op - we helpen je direct.",
    contactBtn:          "Neem contact op",
    backToShop:          "Terug naar de shop",
    continueShopping:    "Verder winkelen",
    unknownError:        "Onbekende fout",
    trustLine:           "Vragen? Wij staan altijd voor je klaar via",
  },
  en: {
    verifyingTitle:      "Checking payment…",
    verifyingBody:       "One moment, we are confirming your order.",
    paidTitle:           "Order confirmed!",
    paidSub:             "Thank you for your order. A confirmation email is on its way.",
    orderNumber:         "Order number",
    nextTitle:           "What happens next?",
    nextStep1Title:      "Confirmation",
    nextStep1Body:       "You receive a confirmation email with your order overview right away.",
    nextStep2Title:      "Processing",
    nextStep2Body:       "We prepare your order carefully and pack it with attention.",
    nextStep3Title:      "Shipping",
    nextStep3Body:       "Your order goes out and you get a tracking link as soon as it is on its way. Delivery takes 5-7 working days.",
    shopBtn:             "Continue shopping",
    discoverBtn:         "Discover recipes",
    processingTitle:     "Payment being processed",
    processingBody:      "Your payment has been received and is being processed - this usually takes a few minutes. You will get an email as soon as the order is confirmed.",
    pendingTitle:        "Order received",
    pendingBody:         "Your payment is still being processed. As soon as it is confirmed we will email you your order overview.",
    errorTitle:          "Something went wrong",
    errorBody:           "We could not verify your payment. If you have just paid, please get in touch - we will help you straight away.",
    contactBtn:          "Contact us",
    backToShop:          "Back to the shop",
    continueShopping:    "Continue shopping",
    unknownError:        "Unknown error",
    trustLine:           "Questions? We are always here for you via",
  },
  de: {
    verifyingTitle:      "Zahlung wird geprüft…",
    verifyingBody:       "Einen Moment, wir bestätigen deine Bestellung.",
    paidTitle:           "Bestellung bestätigt!",
    paidSub:             "Danke für deine Bestellung. Eine Bestätigungsmail ist unterwegs.",
    orderNumber:         "Bestellnummer",
    nextTitle:           "Wie geht es weiter?",
    nextStep1Title:      "Bestätigung",
    nextStep1Body:       "Du erhältst sofort eine Bestätigungsmail mit deiner Bestellübersicht.",
    nextStep2Title:      "Bearbeitung",
    nextStep2Body:       "Wir bereiten deine Bestellung sorgfältig vor und verpacken sie mit Bedacht.",
    nextStep3Title:      "Versand",
    nextStep3Body:       "Deine Bestellung geht raus und du bekommst einen Tracking-Link, sobald sie unterwegs ist. Die Lieferung dauert 5-7 Werktage.",
    shopBtn:             "Weiter einkaufen",
    discoverBtn:         "Rezepte entdecken",
    processingTitle:     "Zahlung in Bearbeitung",
    processingBody:      "Deine Zahlung ist eingegangen und wird verarbeitet - das dauert meist einige Minuten. Du erhältst eine E-Mail, sobald die Bestellung bestätigt ist.",
    pendingTitle:        "Bestellung eingegangen",
    pendingBody:         "Deine Zahlung wird noch verarbeitet. Sobald sie bestätigt ist, senden wir dir deine Bestellübersicht per E-Mail.",
    errorTitle:          "Etwas ist schiefgelaufen",
    errorBody:           "Wir konnten deine Zahlung nicht verifizieren. Wenn du gerade bezahlt hast, melde dich kurz bei uns - wir helfen dir sofort.",
    contactBtn:          "Kontakt aufnehmen",
    backToShop:          "Zurück zum Shop",
    continueShopping:    "Weiter einkaufen",
    unknownError:        "Unbekannter Fehler",
    trustLine:           "Fragen? Wir sind immer für dich da über",
  },
  fr: {
    verifyingTitle:      "Vérification du paiement…",
    verifyingBody:       "Un instant, nous confirmons votre commande.",
    paidTitle:           "Commande confirmée !",
    paidSub:             "Merci pour votre commande. Un e-mail de confirmation arrive.",
    orderNumber:         "Numéro de commande",
    nextTitle:           "Et maintenant ?",
    nextStep1Title:      "Confirmation",
    nextStep1Body:       "Vous recevez immédiatement un e-mail de confirmation avec le récapitulatif.",
    nextStep2Title:      "Préparation",
    nextStep2Body:       "Nous préparons votre commande avec soin et l'emballons avec attention.",
    nextStep3Title:      "Expédition",
    nextStep3Body:       "Votre commande part et vous recevez un lien de suivi dès qu'elle est en route. La livraison prend 5 à 7 jours ouvrés.",
    shopBtn:             "Continuer mes achats",
    discoverBtn:         "Découvrir les recettes",
    processingTitle:     "Paiement en cours de traitement",
    processingBody:      "Votre paiement a été reçu et est en cours de traitement - cela prend généralement quelques minutes. Vous recevrez un e-mail dès la confirmation.",
    pendingTitle:        "Commande reçue",
    pendingBody:         "Votre paiement est encore en cours de traitement. Dès sa confirmation, nous vous enverrons le récapitulatif par e-mail.",
    errorTitle:          "Une erreur est survenue",
    errorBody:           "Nous n'avons pas pu vérifier votre paiement. Si vous venez de payer, contactez-nous - nous vous aidons immédiatement.",
    contactBtn:          "Nous contacter",
    backToShop:          "Retour à la boutique",
    continueShopping:    "Continuer mes achats",
    unknownError:        "Erreur inconnue",
    trustLine:           "Des questions ? Nous sommes toujours joignables via",
  },
  no: {
    verifyingTitle:      "Kontrollerer betalingen…",
    verifyingBody:       "Et øyeblikk, vi bekrefter bestillingen din.",
    paidTitle:           "Bestillingen er bekreftet!",
    paidSub:             "Takk for bestillingen. Du mottar en bekreftelse på e-post.",
    orderNumber:         "Ordrenummer",
    nextTitle:           "Hva skjer nå?",
    nextStep1Title:      "Bekreftelse",
    nextStep1Body:       "Du mottar umiddelbart en bekreftelses-e-post med din ordreoversikt.",
    nextStep2Title:      "Behandling",
    nextStep2Body:       "Vi forbereder bestillingen din nøye og pakker den med omhu.",
    nextStep3Title:      "Frakt",
    nextStep3Body:       "Bestillingen sendes og du får et sporingsnummer så snart den er på vei. Levering tar 5-7 virkedager.",
    shopBtn:             "Fortsett å handle",
    discoverBtn:         "Utforsk oppskrifter",
    processingTitle:     "Betaling behandles",
    processingBody:      "Betalingen din er mottatt og behandles - vanligvis innen noen minutter. Du får en e-post så snart bestillingen er bekreftet.",
    pendingTitle:        "Bestilling mottatt",
    pendingBody:         "Betalingen din behandles fortsatt. Vi sender deg en e-post så snart den er bekreftet.",
    errorTitle:          "Noe gikk galt",
    errorBody:           "Vi kunne ikke verifisere betalingen din. Hvis du nettopp betalte, ta gjerne kontakt med oss - vi hjelper deg.",
    contactBtn:          "Kontakt oss",
    backToShop:          "Tilbake til butikken",
    continueShopping:    "Fortsett å handle",
    unknownError:        "Ukjent feil",
    trustLine:           "Spørsmål? Vi er alltid tilgjengelige via",
  },
} as const;

const SUPPORT_EMAIL = "hello@yourmatcha.com";

const ThankYou = () => {
  const [params] = useSearchParams();
  const lang = useLang();
  const t = COPY[lang] ?? COPY.nl;
  const { items, clearCart } = useCart();
  // De winkelwagen wordt na verificatie geleegd; bewaar de regels zodat het
  // Purchase-event nog weet wat er verkocht is. Eén ref, geen extra render.
  const purchasedRef = useRef(items);
  if (items.length) purchasedRef.current = items;
  const reportedRef = useRef(false);

  /** Vuurt Purchase precies één keer per bevestigde bestelling. */
  const reportPurchase = (order: string | null) => {
    if (reportedRef.current) return;
    reportedRef.current = true;
    const lines = purchasedRef.current;
    if (!lines.length) return;
    trackPurchase(
      lines.map(i => ({ id: i.product.id, name: i.product.name, price: i.product.price, quantity: i.quantity })),
      "EUR",
      order ?? undefined
    );
  };
  const [status, setStatus] = useState<Status>("verifying");
  const [orderNumber, setOrderNumber] = useState<string | null>(params.get("order"));
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const paymentIntentId = params.get("payment_intent");
    const sessionId       = params.get("session_id");

    if (!paymentIntentId && !sessionId) {
      setStatus(orderNumber ? "pending" : "error");
      return;
    }

    let cancelled = false;
    (async () => {
      try {
        if (paymentIntentId) {
          const { data, error } = await supabase.functions.invoke("stripe-verify-payment-intent", {
            body: { paymentIntentId },
          });
          if (cancelled) return;
          if (error || !data) { setErrorMsg(error?.message || "Verify failed"); setStatus("error"); return; }
          if (data.orderNumber) setOrderNumber(data.orderNumber);
          if (data.paid)        { setStatus("paid");       reportPurchase(data.orderNumber ?? orderNumber); clearCart(); }
          else if (data.processing) { setStatus("processing"); clearCart(); }
          else                  setStatus("pending");
        } else if (sessionId) {
          const { data, error } = await supabase.functions.invoke("stripe-verify-session", {
            body: { sessionId },
          });
          if (cancelled) return;
          if (error || !data) { setStatus("error"); return; }
          if (data.orderNumber) setOrderNumber(data.orderNumber);
          if (data.paid) { setStatus("paid"); reportPurchase(data.orderNumber ?? orderNumber); clearCart(); }
          else           setStatus("pending");
        }
      } catch (e) {
        if (!cancelled) {
          setErrorMsg(e instanceof Error ? e.message : t.unknownError);
          setStatus("error");
        }
      }
    })();
    return () => { cancelled = true; };
  }, [params]);

  return (
    <div className="min-h-[80vh] flex items-start justify-center py-16 px-4">
      <SEO title={t.verifyingTitle} description={t.verifyingTitle} canonical="/bedankt" noindex />
      <div className="w-full max-w-xl">

        {/* ── Verifying ── */}
        {status === "verifying" && (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-secondary mb-8">
              <Loader2 className="w-9 h-9 animate-spin text-muted-foreground" />
            </div>
            <h1 className="font-heading text-3xl font-semibold mb-3">{t.verifyingTitle}</h1>
            <p className="text-muted-foreground">{t.verifyingBody}</p>
          </div>
        )}

        {/* ── Paid ── */}
        {status === "paid" && (
          <>
            {/* Hero */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 text-primary mb-8">
                <Check className="w-10 h-10 stroke-[2.5]" />
              </div>
              <h1 className="font-heading text-3xl md:text-4xl font-semibold mb-3">{t.paidTitle}</h1>
              <p className="text-muted-foreground text-base leading-relaxed">{t.paidSub}</p>
            </div>

            {/* Order number badge */}
            {orderNumber && (
              <div className="bg-secondary rounded-lg px-6 py-4 flex items-center justify-between mb-8">
                <span className="text-sm text-muted-foreground">{t.orderNumber}</span>
                <span className="font-mono text-sm font-semibold text-foreground tracking-wide">#{orderNumber}</span>
              </div>
            )}

            {/* What happens next */}
            <div className="mb-10">
              <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-6 text-center">{t.nextTitle}</h2>
              <div className="space-y-0">
                {[
                  { icon: Mail,    title: t.nextStep1Title, body: t.nextStep1Body },
                  { icon: Package, title: t.nextStep2Title, body: t.nextStep2Body },
                  { icon: Truck,   title: t.nextStep3Title, body: t.nextStep3Body },
                ].map((step, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="flex items-center justify-center w-9 h-9 rounded-full bg-primary/10 text-primary shrink-0">
                        <step.icon className="w-4 h-4" />
                      </div>
                      {i < 2 && <div className="w-px flex-1 bg-border mt-1 mb-1 min-h-[24px]" />}
                    </div>
                    <div className="pb-6 pt-1">
                      <p className="text-sm font-semibold text-foreground mb-0.5">{step.title}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{step.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/shop"
                className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-primary text-primary-foreground text-sm font-medium rounded tracking-wide uppercase hover:opacity-90 transition-opacity"
              >
                {t.shopBtn} <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/recepten"
                className="flex-1 flex items-center justify-center gap-2 py-3.5 border border-border text-sm font-medium rounded tracking-wide uppercase hover:bg-secondary transition-colors"
              >
                {t.discoverBtn}
              </Link>
            </div>

            {/* Trust line */}
            <p className="text-center text-xs text-muted-foreground mt-8">
              {t.trustLine}{" "}
              <a href={`mailto:${SUPPORT_EMAIL}`} className="text-primary hover:underline">
                {SUPPORT_EMAIL}
              </a>
            </p>
          </>
        )}

        {/* ── Processing (iDEAL/Klarna pending) ── */}
        {status === "processing" && (
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-amber-50 text-amber-500 mb-8">
              <Clock className="w-9 h-9" />
            </div>
            <h1 className="font-heading text-3xl font-semibold mb-3">{t.processingTitle}</h1>
            {orderNumber && (
              <div className="inline-block bg-secondary rounded px-4 py-2 mb-5">
                <span className="text-sm text-muted-foreground mr-2">{t.orderNumber}:</span>
                <span className="font-mono text-sm font-semibold">#{orderNumber}</span>
              </div>
            )}
            <p className="text-muted-foreground mb-8 leading-relaxed">{t.processingBody}</p>
            <Link to="/shop" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground text-sm font-medium rounded tracking-wide uppercase hover:opacity-90 transition-opacity">
              {t.continueShopping}
            </Link>
          </div>
        )}

        {/* ── Pending ── */}
        {status === "pending" && (
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-secondary text-muted-foreground mb-8">
              <Clock className="w-9 h-9" />
            </div>
            <h1 className="font-heading text-3xl font-semibold mb-3">{t.pendingTitle}</h1>
            {orderNumber && (
              <div className="inline-block bg-secondary rounded px-4 py-2 mb-5">
                <span className="text-sm text-muted-foreground mr-2">{t.orderNumber}:</span>
                <span className="font-mono text-sm font-semibold">#{orderNumber}</span>
              </div>
            )}
            <p className="text-muted-foreground mb-8 leading-relaxed">{t.pendingBody}</p>
            <Link to="/shop" className="text-primary hover:underline text-sm">{t.continueShopping}</Link>
          </div>
        )}

        {/* ── Error ── */}
        {status === "error" && (
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-destructive/10 text-destructive mb-8">
              <AlertTriangle className="w-9 h-9" />
            </div>
            <h1 className="font-heading text-3xl font-semibold mb-3">{t.errorTitle}</h1>
            <p className="text-muted-foreground mb-2 leading-relaxed">{t.errorBody}</p>
            {errorMsg && (
              <p className="text-xs text-muted-foreground font-mono bg-secondary rounded px-3 py-2 mb-8 text-left break-all">
                {errorMsg}
              </p>
            )}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground text-sm font-medium rounded tracking-wide uppercase hover:opacity-90 transition-opacity"
              >
                {t.contactBtn}
              </a>
              <Link
                to="/shop"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border text-sm font-medium rounded tracking-wide uppercase hover:bg-secondary transition-colors"
              >
                {t.backToShop}
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ThankYou;
