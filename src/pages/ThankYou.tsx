import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Check, Loader2, Clock, Package, Truck, Mail, AlertTriangle, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
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
    nextStep2Body:       "We bereiden je matcha zorgvuldig voor en verpakken hem met aandacht.",
    nextStep3Title:      "Verzending",
    nextStep3Body:       "Je bestelling wordt verstuurd en je krijgt een track & trace zodra onderweg.",
    shopBtn:             "Verder winkelen",
    discoverBtn:         "Ontdek recepten",
    processingTitle:     "Betaling in behandeling",
    processingBody:      "Je betaling (iDEAL / Klarna) is ontvangen en wordt verwerkt — dit duurt gewoonlijk enkele minuten. Je krijgt een e-mail zodra de bestelling bevestigd is.",
    pendingTitle:        "Bestelling ontvangen",
    pendingBody:         "Je betaling wordt nog verwerkt. Zodra deze bevestigd is, sturen we je een e-mail met je orderoverzicht.",
    errorTitle:          "Er ging iets mis",
    errorBody:           "We konden je betaling niet verifiëren. Als je net hebt betaald, neem dan even contact met ons op — we helpen je direct.",
    contactBtn:          "Neem contact op",
    backToShop:          "Terug naar de shop",
    continueShopping:    "Verder winkelen",
    unknownError:        "Onbekende fout",
    trustLine:           "Vragen? Wij staan altijd voor je klaar via",
  },
  no: {
    verifyingTitle:      "Kontrollerer betalingen…",
    verifyingBody:       "Et øyeblikk, vi bekrefter bestillingen din.",
    paidTitle:           "Bestillingen er bekreftet!",
    paidSub:             "Takk for bestillingen. Du mottar en bekreftelse på e-post.",
    orderNumber:         "Ordrenummer",
    nextTitle:           "Hva skjer nå?",
    nextStep1Title:      "Bekreftelse",
    nextStep1Body:       "Du mottar umiddelbart en bekreftelses-e-post med din orderoversikt.",
    nextStep2Title:      "Behandling",
    nextStep2Body:       "Vi forbereder matchaen din nøye og pakker den med omhu.",
    nextStep3Title:      "Frakt",
    nextStep3Body:       "Bestillingen din sendes og du får et sporingsnummer så snart den er på vei.",
    shopBtn:             "Fortsett å handle",
    discoverBtn:         "Utforsk oppskrifter",
    processingTitle:     "Betaling behandles",
    processingBody:      "Betalingen din (iDEAL / Klarna) er mottatt og behandles — vanligvis innen noen minutter. Du får en e-post så snart bestillingen er bekreftet.",
    pendingTitle:        "Bestilling mottatt",
    pendingBody:         "Betalingen din behandles fortsatt. Vi sender deg en e-post så snart den er bekreftet.",
    errorTitle:          "Noe gikk galt",
    errorBody:           "Vi kunne ikke verifisere betalingen din. Hvis du nettopp betalte, ta gjerne kontakt med oss — vi hjelper deg.",
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
  const t = COPY[lang === "no" ? "no" : "nl"];
  const { clearCart } = useCart();
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
          if (data.paid)        { setStatus("paid");       clearCart(); }
          else if (data.processing) { setStatus("processing"); clearCart(); }
          else                  setStatus("pending");
        } else if (sessionId) {
          const { data, error } = await supabase.functions.invoke("stripe-verify-session", {
            body: { sessionId },
          });
          if (cancelled) return;
          if (error || !data) { setStatus("error"); return; }
          if (data.orderNumber) setOrderNumber(data.orderNumber);
          if (data.paid) { setStatus("paid"); clearCart(); }
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
