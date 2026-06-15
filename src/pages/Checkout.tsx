import { useCart } from "@/context/CartContext";
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { ChevronLeft, Loader2 } from "lucide-react";
import {
  BuqeStripeElements,
  useBuqePaymentIntent,
  updateBuqeOrder,
} from "@/lib/buqe-commerce";
import {
  PaymentElement,
  ExpressCheckoutElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useCurrency } from "@/context/CurrencyContext";
import { useLang } from "@/i18n";

const COPY = {
  nl: {
    emptyCart: "Je winkelwagen is leeg.",
    toShop: "Naar de shop",
    continueShopping: "Verder winkelen",
    title: "Afrekenen",
    contact: "Contact",
    emailPlaceholder: "E-mailadres",
    emailFirst: "Vul je e-mailadres in om verder te gaan met betaling.",
    loadingPayment: "Betaalopties laden…",
    errorPrefix: "Er ging iets mis: ",
    errorSuffix: ". Vernieuw de pagina en probeer opnieuw.",
    summary: "Overzicht",
    subtotal: "Subtotaal",
    shipping: "Verzending",
    free: "Gratis",
    freeShippingFrom: "Gratis verzending vanaf €50",
    total: "Totaal",
    paymentFailed: "Betaling mislukt",
    unknownError: "Onbekende fout",
    orPayWith: "Of betaal met",
    shippingAddress: "Verzendadres",
    firstName: "Voornaam",
    lastName: "Achternaam",
    phone: "Telefoonnummer",
    address: "Straat + huisnummer",
    postalCode: "Postcode",
    city: "Stad",
    countries: { NL: "Nederland", BE: "België", DE: "Duitsland", FR: "Frankrijk", NO: "Noorwegen" },
    paymentMethod: "Betaalmethode",
    submitting: "Bezig…",
    placeOrder: (total: string) => `Bestelling Plaatsen — ${total}`,
  },
  no: {
    emptyCart: "Handlekurven din er tom.",
    toShop: "Til butikken",
    continueShopping: "Fortsett å handle",
    title: "Kasse",
    contact: "Kontakt",
    emailPlaceholder: "E-postadresse",
    emailFirst: "Fyll inn e-postadressen din for å gå videre til betaling.",
    loadingPayment: "Laster betalingsalternativer…",
    errorPrefix: "Noe gikk galt: ",
    errorSuffix: ". Last inn siden på nytt og prøv igjen.",
    summary: "Oppsummering",
    subtotal: "Delsum",
    shipping: "Frakt",
    free: "Gratis",
    freeShippingFrom: "Gratis frakt fra 575 kr",
    total: "Totalt",
    paymentFailed: "Betalingen mislyktes",
    unknownError: "Ukjent feil",
    orPayWith: "Eller betal med",
    shippingAddress: "Leveringsadresse",
    firstName: "Fornavn",
    lastName: "Etternavn",
    phone: "Telefonnummer",
    address: "Gate + husnummer",
    postalCode: "Postnummer",
    city: "By",
    countries: { NL: "Nederland", BE: "Belgia", DE: "Tyskland", FR: "Frankrike", NO: "Norge" },
    paymentMethod: "Betalingsmåte",
    submitting: "Behandler…",
    placeOrder: (total: string) => `Legg inn bestilling — ${total}`,
  },
} as const;

const Checkout = () => {
  const { items, subtotal } = useCart();
  const { format: formatPrice, currency, convert } = useCurrency();
  const lang = useLang();
  const t = COPY[lang === "no" ? "no" : "nl"];

  const [email, setEmail] = useState("");

  // Verzenddrempel en business-logica blijven in EUR (basisvaluta van de catalogus)
  const shipping = subtotal >= 50 ? 0 : 4.95;
  const total = subtotal + shipping;

  // Betaald wordt in de actieve weergavevaluta: bedragen omgerekend meesturen
  const payCurrency = currency === "NOK" ? "nok" : "eur";
  const buqeItems = useMemo(
    () => items.map((it) => ({
      productId: it.product.id,
      name: it.product.name,
      image: it.product.images?.[0] || "",
      price: convert(it.product.price),
      quantity: it.quantity,
    })),
    [items, convert]
  );

  const { clientSecret, orderId, loading: piLoading, error: piError } = useBuqePaymentIntent({
    items: buqeItems,
    email,
    subtotal: convert(subtotal),
    shipping: convert(shipping),
    total: convert(total),
    currency: payCurrency,
  });

  if (items.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-muted-foreground mb-4">{t.emptyCart}</p>
        <Link to="/shop" className="text-primary hover:underline">{t.toShop}</Link>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/shop" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ChevronLeft className="w-4 h-4" /> {t.continueShopping}
        </Link>

        <h1 className="font-heading text-3xl md:text-4xl font-semibold mb-10">{t.title}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Form column */}
          <div className="lg:col-span-3 space-y-8">
            {/* Email (komt eerst — zonder email kunnen we geen PaymentIntent maken) */}
            <div>
              <h2 className="font-heading text-xl font-semibold mb-4">{t.contact}</h2>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.emailPlaceholder}
                className="w-full px-4 py-3 rounded border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>

            {/* Stripe sectie — pas zichtbaar als email + clientSecret klaar staan */}
            {!email && (
              <div className="text-sm text-muted-foreground italic">
                {t.emailFirst}
              </div>
            )}

            {email && piLoading && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="w-4 h-4 animate-spin" /> {t.loadingPayment}
              </div>
            )}

            {piError && (
              <div className="text-sm text-destructive">
                {t.errorPrefix}{piError}{t.errorSuffix}
              </div>
            )}

            {clientSecret && orderId && (
              // key forceert remount bij nieuwe PaymentIntent (bv. valutawissel) — Elements
              // ondersteunt geen clientSecret-wijziging op een bestaande instantie
              <BuqeStripeElements key={clientSecret} clientSecret={clientSecret}>
                <CheckoutInner orderId={orderId} email={email} total={total} />
              </BuqeStripeElements>
            )}
          </div>

          {/* Summary */}
          <div className="lg:col-span-2">
            <div className="bg-secondary rounded p-6 sticky top-28">
              <h2 className="font-heading text-xl font-semibold mb-6">{t.summary}</h2>
              <ul className="space-y-4 mb-6">
                {items.map(item => (
                  <li key={item.product.id} className="flex justify-between text-sm">
                    <span className="text-foreground">{item.product.name} × {item.quantity}</span>
                    <span className="font-medium">{formatPrice(item.product.price * item.quantity)}</span>
                  </li>
                ))}
              </ul>
              <div className="border-t border-border pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{t.subtotal}</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{t.shipping}</span>
                  <span>{shipping === 0 ? t.free : formatPrice(shipping)}</span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-muted-foreground">{t.freeShippingFrom}</p>
                )}
                <div className="flex justify-between text-base font-semibold pt-2 border-t border-border">
                  <span>{t.total}</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Inner form — moet binnen <Elements> zitten om useStripe/useElements te kunnen gebruiken.
 * Hier zit het adres-form + ExpressCheckout knoppen + PaymentElement + submit.
 */
const CheckoutInner = ({ orderId, email, total }: { orderId: string; email: string; total: number }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { format: formatPrice } = useCurrency();
  const lang = useLang();
  const t = COPY[lang === "no" ? "no" : "nl"];
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setSubmitting(true);
    try {
      const fd = new FormData(e.currentTarget);
      const firstName = String(fd.get("firstName") || "");
      const lastName = String(fd.get("lastName") || "");
      const phone = String(fd.get("phone") || "");
      const address = String(fd.get("address") || "");
      const city = String(fd.get("city") || "");
      const postalCode = String(fd.get("postalCode") || "");
      const country = String(fd.get("country") || "NL");

      await updateBuqeOrder(orderId, {
        firstName, lastName, email, phone, address, city, postalCode, country,
      });

      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/bedankt`,
          payment_method_data: {
            billing_details: {
              name: `${firstName} ${lastName}`.trim(),
              email,
              phone: phone || undefined,
              address: {
                line1: address,
                city,
                postal_code: postalCode,
                country,
              },
            },
          },
        },
      });

      if (error) {
        toast.error(error.message || t.paymentFailed);
        setSubmitting(false);
      }
      // Bij success → Stripe redirect zelf naar return_url
    } catch (err) {
      const msg = err instanceof Error ? err.message : t.unknownError;
      toast.error(msg);
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Express checkout — Apple Pay / Google Pay / Link / etc */}
      <div className="-mx-1">
        <ExpressCheckoutElement
          onConfirm={() => {/* express knop confirmed payment direct via Stripe */}}
          options={{ buttonHeight: 48 }}
        />
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-3 text-muted-foreground tracking-widest">{t.orPayWith}</span>
        </div>
      </div>

      {/* Verzendadres */}
      <div>
        <h2 className="font-heading text-xl font-semibold mb-4">{t.shippingAddress}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input required name="firstName" placeholder={t.firstName} className="px-4 py-3 rounded border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
          <input required name="lastName" placeholder={t.lastName} className="px-4 py-3 rounded border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
          <input name="phone" placeholder={t.phone} className="sm:col-span-2 px-4 py-3 rounded border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
          <input required name="address" placeholder={t.address} className="sm:col-span-2 px-4 py-3 rounded border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
          <input required name="postalCode" placeholder={t.postalCode} className="px-4 py-3 rounded border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
          <input required name="city" placeholder={t.city} className="px-4 py-3 rounded border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
          <select required name="country" defaultValue={lang === "no" ? "NO" : "NL"} className="sm:col-span-2 px-4 py-3 rounded border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
            <option value="NL">{t.countries.NL}</option>
            <option value="BE">{t.countries.BE}</option>
            <option value="DE">{t.countries.DE}</option>
            <option value="FR">{t.countries.FR}</option>
            <option value="NO">{t.countries.NO}</option>
          </select>
        </div>
      </div>

      {/* Stripe Payment Element — toont auto iDEAL/Klarna/Card/Bancontact afhankelijk van Stripe Dashboard */}
      <div>
        <h2 className="font-heading text-xl font-semibold mb-4">{t.paymentMethod}</h2>
        <PaymentElement options={{ layout: "tabs" }} />
      </div>

      <button
        type="submit"
        disabled={!stripe || submitting}
        className="w-full py-4 bg-primary text-primary-foreground font-medium text-sm tracking-widest uppercase rounded hover:opacity-90 transition-opacity disabled:opacity-60"
      >
        {submitting ? t.submitting : t.placeOrder(formatPrice(total))}
      </button>
    </form>
  );
};

export default Checkout;
