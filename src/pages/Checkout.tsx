import { useCart, computeDiscountAmount } from "@/context/CartContext";
import { trackInitiateCheckout } from "@/hooks/useMetaPixel";
import { Link } from "@/components/LocalizedLink";
import { useMemo, useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { ChevronLeft, Loader2, Lock } from "lucide-react";
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
import SEO from "@/components/SEO";
import { useLang } from "@/i18n";

/** Voorselectie van het land in de checkout, op basis van de taal. */
const DEFAULT_COUNTRY: Record<string, string> = {
  nl: "NL", en: "NL", de: "DE", fr: "FR", no: "NO",
};

const COPY = {
  nl: {
    emptyCart:        "Je winkelwagen is leeg.",
    toShop:           "Naar de shop",
    continueShopping: "Verder winkelen",
    title:            "Afrekenen",
    contact:          "Contact",
    emailPlaceholder: "E-mailadres",
    loadingPayment:   "Betaalopties laden…",
    errorPrefix:      "Er ging iets mis: ",
    errorSuffix:      ". Vernieuw de pagina en probeer opnieuw.",
    summary:          "Overzicht",
    subtotal:         "Subtotaal",
    discount:         "Korting",
    shipping:         "Verzending",
    free:             "Gratis",
    freeShippingFrom: "Gratis verzending vanaf €35",
    total:            "Totaal",
    paymentFailed:    "Betaling mislukt",
    unknownError:     "Onbekende fout",
    orPayWith:        "Of betaal met",
    shippingAddress:  "Verzendadres",
    firstName:        "Voornaam",
    lastName:         "Achternaam",
    phone:            "Telefoonnummer",
    address:          "Straat + huisnummer",
    postalCode:       "Postcode",
    city:             "Stad",
    countries:        { NL: "Nederland", BE: "België", DE: "Duitsland", FR: "Frankrijk", NO: "Noorwegen" },
    paymentMethod:    "Betaalmethode",
    submitting:       "Bezig…",
    placeOrder:       (total: string) => `Bestelling Plaatsen - ${total}`,
    paymentWaiting:   "Vul je e-mailadres in om de betaalopties te laden.",
  },
  en: {
    emptyCart:        "Your cart is empty.",
    toShop:           "To the shop",
    continueShopping: "Continue shopping",
    title:            "Checkout",
    contact:          "Contact",
    emailPlaceholder: "Email address",
    loadingPayment:   "Loading payment options…",
    errorPrefix:      "Something went wrong: ",
    errorSuffix:      ". Refresh the page and try again.",
    summary:          "Summary",
    subtotal:         "Subtotal",
    discount:         "Discount",
    shipping:         "Shipping",
    free:             "Free",
    freeShippingFrom: "Free shipping over €35",
    total:            "Total",
    paymentFailed:    "Payment failed",
    unknownError:     "Unknown error",
    orPayWith:        "Or pay with",
    shippingAddress:  "Shipping address",
    firstName:        "First name",
    lastName:         "Last name",
    phone:            "Phone number",
    address:          "Street + house number",
    postalCode:       "Postcode",
    city:             "City",
    countries:        { NL: "Netherlands", BE: "Belgium", DE: "Germany", FR: "France", NO: "Norway" },
    paymentMethod:    "Payment method",
    submitting:       "Processing…",
    placeOrder:       (total: string) => `Place order - ${total}`,
    paymentWaiting:   "Enter your email address to load the payment options.",
  },
  de: {
    emptyCart:        "Dein Warenkorb ist leer.",
    toShop:           "Zum Shop",
    continueShopping: "Weiter einkaufen",
    title:            "Kasse",
    contact:          "Kontakt",
    emailPlaceholder: "E-Mail-Adresse",
    loadingPayment:   "Zahlungsoptionen werden geladen…",
    errorPrefix:      "Etwas ist schiefgelaufen: ",
    errorSuffix:      ". Lade die Seite neu und versuche es erneut.",
    summary:          "Übersicht",
    subtotal:         "Zwischensumme",
    discount:         "Rabatt",
    shipping:         "Versand",
    free:             "Gratis",
    freeShippingFrom: "Gratis Versand ab €35",
    total:            "Gesamt",
    paymentFailed:    "Zahlung fehlgeschlagen",
    unknownError:     "Unbekannter Fehler",
    orPayWith:        "Oder bezahle mit",
    shippingAddress:  "Lieferadresse",
    firstName:        "Vorname",
    lastName:         "Nachname",
    phone:            "Telefonnummer",
    address:          "Straße + Hausnummer",
    postalCode:       "PLZ",
    city:             "Stadt",
    countries:        { NL: "Niederlande", BE: "Belgien", DE: "Deutschland", FR: "Frankreich", NO: "Norwegen" },
    paymentMethod:    "Zahlungsart",
    submitting:       "Wird verarbeitet…",
    placeOrder:       (total: string) => `Bestellung aufgeben - ${total}`,
    paymentWaiting:   "Gib deine E-Mail-Adresse ein, um die Zahlungsoptionen zu laden.",
  },
  fr: {
    emptyCart:        "Votre panier est vide.",
    toShop:           "Vers la boutique",
    continueShopping: "Continuer mes achats",
    title:            "Paiement",
    contact:          "Contact",
    emailPlaceholder: "Adresse e-mail",
    loadingPayment:   "Chargement des moyens de paiement…",
    errorPrefix:      "Une erreur est survenue : ",
    errorSuffix:      ". Rechargez la page et réessayez.",
    summary:          "Récapitulatif",
    subtotal:         "Sous-total",
    discount:         "Réduction",
    shipping:         "Livraison",
    free:             "Offerte",
    freeShippingFrom: "Livraison offerte dès 35 €",
    total:            "Total",
    paymentFailed:    "Paiement refusé",
    unknownError:     "Erreur inconnue",
    orPayWith:        "Ou payez avec",
    shippingAddress:  "Adresse de livraison",
    firstName:        "Prénom",
    lastName:         "Nom",
    phone:            "Numéro de téléphone",
    address:          "Rue + numéro",
    postalCode:       "Code postal",
    city:             "Ville",
    countries:        { NL: "Pays-Bas", BE: "Belgique", DE: "Allemagne", FR: "France", NO: "Norvège" },
    paymentMethod:    "Moyen de paiement",
    submitting:       "Traitement…",
    placeOrder:       (total: string) => `Valider la commande - ${total}`,
    paymentWaiting:   "Saisissez votre adresse e-mail pour charger les moyens de paiement.",
  },
  no: {
    emptyCart:        "Handlekurven din er tom.",
    toShop:           "Til butikken",
    continueShopping: "Fortsett å handle",
    title:            "Kasse",
    contact:          "Kontakt",
    emailPlaceholder: "E-postadresse",
    loadingPayment:   "Laster betalingsalternativer…",
    errorPrefix:      "Noe gikk galt: ",
    errorSuffix:      ". Last inn siden på nytt og prøv igjen.",
    summary:          "Oppsummering",
    subtotal:         "Delsum",
    discount:         "Rabatt",
    shipping:         "Frakt",
    free:             "Gratis",
    freeShippingFrom: "Gratis frakt over 400 kr",
    total:            "Totalt",
    paymentFailed:    "Betalingen mislyktes",
    unknownError:     "Ukjent feil",
    orPayWith:        "Eller betal med",
    shippingAddress:  "Leveringsadresse",
    firstName:        "Fornavn",
    lastName:         "Etternavn",
    phone:            "Telefonnummer",
    address:          "Gate + husnummer",
    postalCode:       "Postnummer",
    city:             "By",
    countries:        { NL: "Nederland", BE: "Belgia", DE: "Tyskland", FR: "Frankrike", NO: "Norge" },
    paymentMethod:    "Betalingsmåte",
    submitting:       "Behandler…",
    placeOrder:       (total: string) => `Legg inn bestilling - ${total}`,
    paymentWaiting:   "Fyll inn e-postadressen din for å laste betalingsalternativer.",
  },
} as const;

// Address fields managed in the outer component so they're always visible
interface AddressData {
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  postalCode: string;
  city: string;
  country: string;
}

const inputCls = "w-full px-4 py-3 rounded border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-colors";

const Checkout = () => {
  const { items, discount: appliedDiscount } = useCart();
  const { formatAmount, currency, convert, rate, freeShippingThreshold, shippingCost } = useCurrency();
  const lang = useLang();
  const t = COPY[lang] ?? COPY.nl;

  const [email, setEmail] = useState("");
  const [debouncedEmail, setDebouncedEmail] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    debounceRef.current && clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) setDebouncedEmail(email);
      else setDebouncedEmail("");
    }, 600);
    return () => { debounceRef.current && clearTimeout(debounceRef.current); };
  }, [email]);

  const [addr, setAddr] = useState<AddressData>({
    firstName: "", lastName: "", phone: "", address: "",
    postalCode: "", city: "", country: DEFAULT_COUNTRY[lang] ?? "NL",
  });
  const set = (k: keyof AddressData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setAddr(prev => ({ ...prev, [k]: e.target.value }));

  // Alle bedragen in de actieve valuta, opgebouwd uit afgeronde stuksprijzen -
  // wat de klant ziet is exact wat via Stripe wordt afgerekend.
  // Eén keer per bezoek aan de checkout, niet bij elke herberekening.
  useEffect(() => {
    if (!items.length) return;
    trackInitiateCheckout(
      items.map(i => ({ id: i.product.id, name: i.product.name, price: i.product.price, quantity: i.quantity })),
      "EUR"
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const subtotal = items.reduce((sum, i) => sum + convert(i.product.price) * i.quantity, 0);
  const shipping = subtotal >= freeShippingThreshold ? 0 : shippingCost;
  // Zelfde formule als server-side; het echte bedrag wordt in de edge function bepaald
  const discountInCurrency = appliedDiscount
    ? { ...appliedDiscount, value: appliedDiscount.type === "fixed" ? appliedDiscount.value * rate : appliedDiscount.value, minOrder: appliedDiscount.minOrder * rate }
    : null;
  const discount = computeDiscountAmount(discountInCurrency, subtotal, shipping);
  const total = Math.max(0, subtotal + shipping - discount);

  const payCurrency = currency === "NOK" ? "nok" : "eur";
  const buqeItems = useMemo(
    () => items.map((it) => ({
      productId: it.product.id,
      name:      it.product.name,
      image:     it.product.images?.[0] || "",
      price:     convert(it.product.price),
      quantity:  it.quantity,
    })),
    [items, convert]
  );

  const { clientSecret, orderId, loading: piLoading, error: piError } = useBuqePaymentIntent({
    items:        buqeItems,
    email:        debouncedEmail,
    subtotal,
    shipping,
    total,
    currency:     payCurrency,
    discountCode: appliedDiscount?.code,
  });

  if (items.length === 0) {
    return (
      <div className="py-20 text-center">
        <SEO title={t.title} description={t.title} canonical="/checkout" noindex />
        <p className="text-muted-foreground mb-4">{t.emptyCart}</p>
        <Link to="/shop" className="text-primary hover:underline">{t.toShop}</Link>
      </div>
    );
  }

  return (
    <div className="py-12">
      <SEO title={t.title} description={t.title} canonical="/checkout" noindex />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/shop"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ChevronLeft className="w-4 h-4" /> {t.continueShopping}
        </Link>

        <h1 className="font-heading text-3xl md:text-4xl font-semibold mb-10">{t.title}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* ── Left column ── */}
          <div className="lg:col-span-3 space-y-8">

            {/* 1 - Email */}
            <section>
              <h2 className="font-heading text-xl font-semibold mb-4">{t.contact}</h2>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.emailPlaceholder}
                className={inputCls}
                autoComplete="email"
              />
            </section>

            {/* 2 - Shipping address (always visible) */}
            <section>
              <h2 className="font-heading text-xl font-semibold mb-4">{t.shippingAddress}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input value={addr.firstName} onChange={set("firstName")} placeholder={t.firstName}  className={inputCls} autoComplete="given-name" />
                <input value={addr.lastName}  onChange={set("lastName")}  placeholder={t.lastName}   className={inputCls} autoComplete="family-name" />
                <input value={addr.phone}     onChange={set("phone")}     placeholder={t.phone}      className={`${inputCls} sm:col-span-2`} autoComplete="tel" />
                <input value={addr.address}   onChange={set("address")}   placeholder={t.address}    className={`${inputCls} sm:col-span-2`} autoComplete="street-address" />
                <input value={addr.postalCode} onChange={set("postalCode")} placeholder={t.postalCode} className={inputCls} autoComplete="postal-code" />
                <input value={addr.city}      onChange={set("city")}      placeholder={t.city}       className={inputCls} autoComplete="address-level2" />
                <select
                  value={addr.country}
                  onChange={set("country")}
                  className={`${inputCls} sm:col-span-2`}
                  autoComplete="country"
                >
                  <option value="NL">{t.countries.NL}</option>
                  <option value="BE">{t.countries.BE}</option>
                  <option value="DE">{t.countries.DE}</option>
                  <option value="FR">{t.countries.FR}</option>
                  <option value="NO">{t.countries.NO}</option>
                </select>
              </div>
            </section>

            {/* 3 - Payment */}
            <section>
              <h2 className="font-heading text-xl font-semibold mb-4">{t.paymentMethod}</h2>

              {/* Error state */}
              {piError && (
                <div className="text-sm text-destructive mb-4">
                  {t.errorPrefix}{piError}{t.errorSuffix}
                </div>
              )}

              {/* Not yet a valid email - lock placeholder */}
              {!debouncedEmail && !piLoading && (
                <div className="rounded border border-border bg-secondary/40 px-5 py-6 flex items-center gap-3 text-sm text-muted-foreground select-none">
                  <Lock className="w-4 h-4 shrink-0 opacity-50" />
                  {t.paymentWaiting}
                </div>
              )}

              {/* Loading PaymentIntent */}
              {debouncedEmail && piLoading && (
                <div className="rounded border border-border bg-secondary/40 px-5 py-6 flex items-center gap-3 text-sm text-muted-foreground">
                  <Loader2 className="w-4 h-4 animate-spin shrink-0" />
                  {t.loadingPayment}
                </div>
              )}

              {/* Stripe Elements - only when clientSecret ready */}
              {clientSecret && orderId && (
                <BuqeStripeElements key={clientSecret} clientSecret={clientSecret}>
                  <CheckoutInner
                    orderId={orderId}
                    email={email}
                    addr={addr}
                    total={total}
                  />
                </BuqeStripeElements>
              )}
            </section>
          </div>

          {/* ── Right column: order summary ── */}
          <div className="lg:col-span-2">
            <div className="bg-secondary rounded p-6 sticky top-28">
              <h2 className="font-heading text-xl font-semibold mb-6">{t.summary}</h2>
              <ul className="space-y-4 mb-6">
                {items.map(item => (
                  <li key={item.product.id} className="flex justify-between text-sm">
                    <span className="text-foreground">{item.product.name} × {item.quantity}</span>
                    <span className="font-medium">{formatAmount(convert(item.product.price) * item.quantity)}</span>
                  </li>
                ))}
              </ul>
              <div className="border-t border-border pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{t.subtotal}</span>
                  <span>{formatAmount(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm text-primary">
                    <span>{t.discount} ({appliedDiscount?.code})</span>
                    <span>−{formatAmount(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{t.shipping}</span>
                  <span>{shipping === 0 ? t.free : formatAmount(shipping)}</span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-muted-foreground">{t.freeShippingFrom}</p>
                )}
                <div className="flex justify-between text-base font-semibold pt-2 border-t border-border">
                  <span>{t.total}</span>
                  <span>{formatAmount(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface CheckoutInnerProps {
  orderId: string;
  email:   string;
  addr:    AddressData;
  total:   number;
}

const CheckoutInner = ({ orderId, email, addr, total }: CheckoutInnerProps) => {
  const stripe   = useStripe();
  const elements = useElements();
  const { formatAmount } = useCurrency();
  const lang = useLang();
  const t = COPY[lang] ?? COPY.nl;
  const [submitting, setSubmitting] = useState(false);

  const handleExpressConfirm = async () => {
    if (!stripe || !elements) return;
    setSubmitting(true);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: `${window.location.origin}/bedankt` },
    });
    if (error) {
      toast.error(error.message || t.paymentFailed);
      setSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setSubmitting(true);
    try {
      await updateBuqeOrder(orderId, {
        firstName:  addr.firstName,
        lastName:   addr.lastName,
        email,
        phone:      addr.phone,
        address:    addr.address,
        city:       addr.city,
        postalCode: addr.postalCode,
        country:    addr.country,
      });

      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/bedankt`,
          payment_method_data: {
            billing_details: {
              name:    `${addr.firstName} ${addr.lastName}`.trim(),
              email,
              phone:   addr.phone || undefined,
              address: {
                line1:       addr.address,
                city:        addr.city,
                postal_code: addr.postalCode,
                country:     addr.country,
              },
            },
          },
        },
      });

      if (error) {
        toast.error(error.message || t.paymentFailed);
        setSubmitting(false);
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : t.unknownError);
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Express checkout (Apple Pay / Google Pay) */}
      <div className="-mx-1">
        <ExpressCheckoutElement
          onConfirm={handleExpressConfirm}
          options={{ buttonHeight: 48 }}
        />
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-3 text-muted-foreground tracking-widest">{t.orPayWith}</span>
        </div>
      </div>

      <PaymentElement options={{ layout: "tabs" }} />

      <button
        type="submit"
        disabled={!stripe || submitting}
        className="w-full py-4 bg-primary text-primary-foreground font-medium text-sm tracking-widest uppercase rounded hover:opacity-90 transition-opacity disabled:opacity-60"
      >
        {submitting ? t.submitting : t.placeOrder(formatAmount(total))}
      </button>
    </form>
  );
};

export default Checkout;
