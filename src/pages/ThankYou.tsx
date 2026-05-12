import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Check, Loader2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { supabase } from "@/lib/buqe-commerce";

type Status = "verifying" | "paid" | "processing" | "pending" | "error";

const ThankYou = () => {
  const [params] = useSearchParams();
  const { clearCart } = useCart();
  const [status, setStatus] = useState<Status>("verifying");
  const [orderNumber, setOrderNumber] = useState<string | null>(params.get("order"));
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    // Embedded flow: ?payment_intent=pi_xxx&payment_intent_client_secret=xxx&redirect_status=succeeded
    const paymentIntentId = params.get("payment_intent");
    // Hosted flow (legacy): ?session_id=cs_xxx
    const sessionId = params.get("session_id");

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
          if (error || !data) {
            setErrorMsg(error?.message || "Verify failed");
            setStatus("error");
            return;
          }
          if (data.orderNumber) setOrderNumber(data.orderNumber);
          if (data.paid) {
            setStatus("paid");
            clearCart();
          } else if (data.processing) {
            setStatus("processing");
            clearCart();
          } else {
            setStatus("pending");
          }
        } else if (sessionId) {
          const { data, error } = await supabase.functions.invoke("stripe-verify-session", {
            body: { sessionId },
          });
          if (cancelled) return;
          if (error || !data) {
            setStatus("error");
            return;
          }
          if (data.orderNumber) setOrderNumber(data.orderNumber);
          if (data.paid) {
            setStatus("paid");
            clearCart();
          } else {
            setStatus("pending");
          }
        }
      } catch (e) {
        if (!cancelled) {
          setErrorMsg(e instanceof Error ? e.message : "Onbekende fout");
          setStatus("error");
        }
      }
    })();
    return () => { cancelled = true; };
  }, [params, clearCart, orderNumber]);

  return (
    <div className="py-20 text-center">
      <div className="container mx-auto px-4 max-w-lg">
        {status === "verifying" && (
          <>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary text-muted-foreground mb-6">
              <Loader2 className="w-8 h-8 animate-spin" />
            </div>
            <h1 className="font-heading text-3xl font-semibold mb-4">Betaling controleren…</h1>
            <p className="text-muted-foreground">Even geduld, we bevestigen je bestelling.</p>
          </>
        )}

        {status === "paid" && (
          <>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
              <Check className="w-8 h-8" />
            </div>
            <h1 className="font-heading text-3xl font-semibold mb-4">Bedankt voor je bestelling!</h1>
            <p className="text-muted-foreground mb-2">
              We hebben je bestelling ontvangen en gaan deze zo snel mogelijk verwerken.
            </p>
            {orderNumber && (
              <p className="text-sm text-muted-foreground mb-8">
                Bestelnummer: <span className="font-mono text-foreground">{orderNumber}</span>
              </p>
            )}
            <p className="text-muted-foreground mb-8">Je ontvangt een bevestiging per e-mail. 🍵</p>
            <Link to="/shop" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground text-sm font-medium rounded tracking-wide uppercase hover:opacity-90 transition-opacity">
              Verder Winkelen
            </Link>
          </>
        )}

        {status === "processing" && (
          <>
            <h1 className="font-heading text-3xl font-semibold mb-4">Betaling wordt verwerkt</h1>
            <p className="text-muted-foreground mb-8">
              Je betaling (iDEAL/Klarna) is in behandeling — meestal binnen enkele minuten bevestigd.
              Je ontvangt een email zodra deze rond is.
            </p>
            <Link to="/shop" className="text-primary hover:underline">Verder winkelen</Link>
          </>
        )}

        {status === "pending" && (
          <>
            <h1 className="font-heading text-3xl font-semibold mb-4">Bestelling ontvangen</h1>
            <p className="text-muted-foreground mb-8">
              Je betaling wordt nog verwerkt. Zodra deze bevestigd is sturen we je een e-mail.
            </p>
            <Link to="/shop" className="text-primary hover:underline">Verder winkelen</Link>
          </>
        )}

        {status === "error" && (
          <>
            <h1 className="font-heading text-3xl font-semibold mb-4">Er ging iets mis</h1>
            <p className="text-muted-foreground mb-2">
              We konden je betaling niet verifiëren. Neem contact op als je net hebt betaald.
            </p>
            {errorMsg && <p className="text-xs text-muted-foreground mb-8 font-mono">{errorMsg}</p>}
            <Link to="/shop" className="text-primary hover:underline">Terug naar de shop</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default ThankYou;
