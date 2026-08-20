import { Link } from "@/components/LocalizedLink";
import { Minus, Plus, X, ShoppingBag, Truck, ArrowRight, Tag } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { useCart, computeDiscountAmount, type AppliedDiscount } from "@/context/CartContext";
import { supabase } from "@/lib/supabase";
import { useProducts, baseProductId } from "@/data/products";
import SEO from "@/components/SEO";
import { toast } from "sonner";
import { useCurrency } from "@/context/CurrencyContext";
import { useLang } from "@/i18n";

const COPY = {
  nl: {
    seoTitle: "Winkelwagen",
    seoDescription: "Bekijk je winkelwagen en reken veilig af. Gratis verzending vanaf €35.",
    toastCodeApplied: (pct: number) => `Code toegepast - ${pct}% korting`,
    toastAmountApplied: (amount: string) => `${amount} korting toegepast`,
    toastFreeShipping: "Gratis verzending toegepast",
    toastInvalidCode: "Ongeldige of verlopen kortingscode",
    toastMinOrder: (min: string) => `Deze code geldt vanaf een bestelbedrag van ${min}`,
    removeCode: "Verwijderen",
    emptyTitle: "Je winkelwagen is leeg",
    emptySubtitle: "Ontdek onze matcha, sets en accessoires.",
    toShop: "Naar de shop",
    title: "Je winkelwagen",
    itemSingular: "artikel",
    itemPlural: "artikelen",
    remainingPrefix: "Nog ",
    remainingSuffix: " tot gratis verzending",
    freeShippingReached: "Je krijgt gratis verzending!",
    continueShopping: "← Verder winkelen",
    clearCart: "Winkelwagen legen",
    crossSellTitle: "Mensen kochten er ook bij",
    add: "Toevoegen",
    summary: "Overzicht",
    discountCode: "Kortingscode",
    codePlaceholder: "bv. MATCHA10",
    apply: "Toepassen",
    subtotal: "Subtotaal",
    discount: "Korting",
    shipping: "Verzending",
    free: "Gratis",
    total: "Totaal",
    checkout: "Veilig afrekenen",
    paymentNote: "Veilig betalen · iDEAL · Creditcard · Apple Pay · Google Pay",
  },
  en: {
    seoTitle: "Cart",
    seoDescription: "Review your cart and check out securely. Free shipping over €35.",
    toastCodeApplied: (pct: number) => `Code applied - ${pct}% off`,
    toastAmountApplied: (amount: string) => `${amount} discount applied`,
    toastFreeShipping: "Free shipping applied",
    toastInvalidCode: "Invalid or expired discount code",
    toastMinOrder: (min: string) => `This code applies from an order value of ${min}`,
    removeCode: "Remove",
    emptyTitle: "Your cart is empty",
    emptySubtitle: "Discover our matcha, sets and accessories.",
    toShop: "To the shop",
    title: "Your cart",
    itemSingular: "item",
    itemPlural: "items",
    remainingPrefix: "Only ",
    remainingSuffix: " to free shipping",
    freeShippingReached: "You qualify for free shipping!",
    continueShopping: "← Continue shopping",
    clearCart: "Empty cart",
    crossSellTitle: "People also bought",
    add: "Add",
    summary: "Summary",
    discountCode: "Discount code",
    codePlaceholder: "e.g. MATCHA10",
    apply: "Apply",
    subtotal: "Subtotal",
    discount: "Discount",
    shipping: "Shipping",
    free: "Free",
    total: "Total",
    checkout: "Secure checkout",
    paymentNote: "Secure payment · Card · Apple Pay · Google Pay",
  },
  de: {
    seoTitle: "Warenkorb",
    seoDescription: "Sieh dir deinen Warenkorb an und bezahle sicher. Gratis Versand ab €35.",
    toastCodeApplied: (pct: number) => `Code angewendet - ${pct}% Rabatt`,
    toastAmountApplied: (amount: string) => `${amount} Rabatt angewendet`,
    toastFreeShipping: "Gratis Versand angewendet",
    toastInvalidCode: "Ungültiger oder abgelaufener Rabattcode",
    toastMinOrder: (min: string) => `Dieser Code gilt ab einem Bestellwert von ${min}`,
    removeCode: "Entfernen",
    emptyTitle: "Dein Warenkorb ist leer",
    emptySubtitle: "Entdecke unseren Matcha, unsere Sets und unser Zubehör.",
    toShop: "Zum Shop",
    title: "Dein Warenkorb",
    itemSingular: "Artikel",
    itemPlural: "Artikel",
    remainingPrefix: "Noch ",
    remainingSuffix: " bis zum Gratisversand",
    freeShippingReached: "Du erhältst Gratisversand!",
    continueShopping: "← Weiter einkaufen",
    clearCart: "Warenkorb leeren",
    crossSellTitle: "Andere kauften auch",
    add: "Hinzufügen",
    summary: "Übersicht",
    discountCode: "Rabattcode",
    codePlaceholder: "z. B. MATCHA10",
    apply: "Anwenden",
    subtotal: "Zwischensumme",
    discount: "Rabatt",
    shipping: "Versand",
    free: "Gratis",
    total: "Gesamt",
    checkout: "Sicher bezahlen",
    paymentNote: "Sichere Zahlung · Karte · Apple Pay · Google Pay",
  },
  fr: {
    seoTitle: "Panier",
    seoDescription: "Consultez votre panier et payez en toute sécurité. Livraison offerte dès 35 €.",
    toastCodeApplied: (pct: number) => `Code appliqué - ${pct}% de réduction`,
    toastAmountApplied: (amount: string) => `Réduction de ${amount} appliquée`,
    toastFreeShipping: "Livraison offerte appliquée",
    toastInvalidCode: "Code de réduction invalide ou expiré",
    toastMinOrder: (min: string) => `Ce code s'applique à partir de ${min} d'achat`,
    removeCode: "Retirer",
    emptyTitle: "Votre panier est vide",
    emptySubtitle: "Découvrez nos matcha, coffrets et accessoires.",
    toShop: "Vers la boutique",
    title: "Votre panier",
    itemSingular: "article",
    itemPlural: "articles",
    remainingPrefix: "Plus que ",
    remainingSuffix: " avant la livraison offerte",
    freeShippingReached: "Vous bénéficiez de la livraison offerte !",
    continueShopping: "← Continuer mes achats",
    clearCart: "Vider le panier",
    crossSellTitle: "Souvent achetés ensemble",
    add: "Ajouter",
    summary: "Récapitulatif",
    discountCode: "Code de réduction",
    codePlaceholder: "ex. MATCHA10",
    apply: "Appliquer",
    subtotal: "Sous-total",
    discount: "Réduction",
    shipping: "Livraison",
    free: "Offerte",
    total: "Total",
    checkout: "Paiement sécurisé",
    paymentNote: "Paiement sécurisé · Carte · Apple Pay · Google Pay",
  },
  no: {
    seoTitle: "Handlekurv",
    seoDescription: "Se handlekurven din og betal trygt. Gratis frakt over 400 kr.",
    toastCodeApplied: (pct: number) => `Kode aktivert - ${pct} % rabatt`,
    toastAmountApplied: (amount: string) => `${amount} rabatt aktivert`,
    toastFreeShipping: "Gratis frakt aktivert",
    toastInvalidCode: "Ugyldig eller utløpt rabattkode",
    toastMinOrder: (min: string) => `Denne koden gjelder fra en ordreverdi på ${min}`,
    removeCode: "Fjern",
    emptyTitle: "Handlekurven din er tom",
    emptySubtitle: "Utforsk matchaen, settene og tilbehøret vårt.",
    toShop: "Til butikken",
    title: "Handlekurven din",
    itemSingular: "vare",
    itemPlural: "varer",
    remainingPrefix: "Kun ",
    remainingSuffix: " igjen til gratis frakt",
    freeShippingReached: "Du får gratis frakt!",
    continueShopping: "← Fortsett å handle",
    clearCart: "Tøm handlekurven",
    crossSellTitle: "Andre kjøpte også",
    add: "Legg til",
    summary: "Oppsummering",
    discountCode: "Rabattkode",
    codePlaceholder: "f.eks. MATCHA10",
    apply: "Bruk",
    subtotal: "Delsum",
    discount: "Rabatt",
    shipping: "Frakt",
    free: "Gratis",
    total: "Totalt",
    checkout: "Betal trygt",
    paymentNote: "Trygg betaling · Kort · Apple Pay · Google Pay",
  },
} as const;

const Cart = () => {
  const { format: formatPrice, formatAmount, convert, rate, freeShippingThreshold, shippingCost: shippingRate } = useCurrency();
  const lang = useLang();
  const t = COPY[lang] ?? COPY.nl;
  const { items, removeItem, updateQuantity, addItem, clearCart, discount: appliedDiscount, applyDiscount, removeDiscount } = useCart();
  const [code, setCode] = useState("");
  const [validating, setValidating] = useState(false);
  const products = useProducts();

  const recommendations = useMemo(() => {
    const inCart = new Set(items.map(i => baseProductId(i.product.id)));
    return products.filter(p => !inCart.has(p.id) && (p.bestseller || p.badge)).slice(0, 4);
  }, [items, products]);

  // Alle bedragen in de actieve valuta, opgebouwd uit afgeronde stuksprijzen -
  // zo klopt wat de klant ziet exact met wat wordt afgerekend.
  const subtotal = items.reduce((sum, i) => sum + convert(i.product.price) * i.quantity, 0);
  const remaining = Math.max(0, freeShippingThreshold - subtotal);
  const progress = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const shippingCost = remaining > 0 ? shippingRate : 0;
  const discountInCurrency = appliedDiscount
    ? { ...appliedDiscount, value: appliedDiscount.type === "fixed" ? appliedDiscount.value * rate : appliedDiscount.value, minOrder: appliedDiscount.minOrder * rate }
    : null;
  const discount = computeDiscountAmount(discountInCurrency, subtotal, shippingCost);
  const total = Math.max(0, subtotal + shippingCost - discount);

  const applyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    const c = code.trim();
    if (!c || validating) return;
    setValidating(true);
    try {
      const { data, error } = await supabase.rpc("validate_discount_code", { p_code: c });
      const row = Array.isArray(data) ? data[0] : data;
      if (error || !row) {
        toast.error(t.toastInvalidCode);
        return;
      }
      const d: AppliedDiscount = {
        code: row.code,
        type: row.discount_type,
        value: Number(row.discount_value),
        minOrder: Number(row.min_order ?? 0),
      };
      if (subtotal < d.minOrder * rate) {
        toast.error(t.toastMinOrder(formatAmount(d.minOrder * rate)));
        return;
      }
      applyDiscount(d);
      setCode("");
      if (d.type === "percentage") toast.success(t.toastCodeApplied(d.value));
      else if (d.type === "free_shipping") toast.success(t.toastFreeShipping);
      else toast.success(t.toastAmountApplied(formatAmount(d.value * rate)));
    } finally {
      setValidating(false);
    }
  };

  if (items.length === 0) {
    return (
      <>
        <SEO
          title={t.seoTitle}
          description={t.seoDescription}
          canonical="/winkelwagen"
          noindex
        />
        <div className="container mx-auto px-4 py-20 text-center max-w-lg">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-secondary mb-6">
            <ShoppingBag className="w-9 h-9 text-muted-foreground/60" />
          </div>
          <h1 className="font-heading text-3xl md:text-4xl font-light mb-3">{t.emptyTitle}</h1>
          <p className="text-muted-foreground mb-8">{t.emptySubtitle}</p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground text-sm font-bold tracking-widest uppercase rounded-full hover:opacity-90 transition-opacity"
          >
            {t.toShop} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO
        title={t.seoTitle}
        description={t.seoDescription}
        canonical="/winkelwagen"
        noindex
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-heading text-3xl md:text-5xl font-light mb-3">{t.title}</h1>
        <p className="text-muted-foreground mb-10">{items.length} {items.length === 1 ? t.itemSingular : t.itemPlural}</p>

        {/* Free shipping bar */}
        <div className="bg-secondary rounded-2xl p-5 mb-10">
          <div className="flex items-center gap-3 mb-3 text-sm">
            <Truck className="w-4 h-4 text-primary" />
            {remaining > 0 ? (
              <span>{t.remainingPrefix}<strong>{formatAmount(remaining)}</strong>{t.remainingSuffix}</span>
            ) : (
              <span className="font-semibold text-primary">{t.freeShippingReached}</span>
            )}
          </div>
          <div className="h-1.5 bg-background rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="h-full bg-primary rounded-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map(item => (
              <motion.div
                key={item.product.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-4 sm:gap-6 p-4 sm:p-5 bg-card rounded-2xl border border-border/60"
              >
                <Link to={`/product/${item.product.slug}`} className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-secondary flex-shrink-0">
                  <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                </Link>
                <div className="flex-1 min-w-0 flex flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-[10px] tracking-widest uppercase text-muted-foreground">{item.product.categoryLabel}</p>
                      <Link to={`/product/${item.product.slug}`} className="font-heading text-lg font-semibold hover:text-primary transition-colors block truncate">
                        {item.product.name}
                      </Link>
                      <p className="text-sm text-muted-foreground mt-0.5">{formatPrice(item.product.price)}</p>
                    </div>
                    <button onClick={() => removeItem(item.product.id)} className="p-1 text-muted-foreground hover:text-destructive transition-colors">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="mt-auto pt-3 flex items-center justify-between">
                    <div className="flex items-center border border-border rounded-full">
                      <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center hover:bg-secondary rounded-l-full transition-colors">
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center hover:bg-secondary rounded-r-full transition-colors">
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <span className="font-semibold">{formatAmount(convert(item.product.price) * item.quantity)}</span>
                  </div>
                </div>
              </motion.div>
            ))}

            <div className="flex items-center justify-between pt-2">
              <Link to="/shop" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {t.continueShopping}
              </Link>
              <button onClick={clearCart} className="text-sm text-muted-foreground hover:text-destructive transition-colors">
                {t.clearCart}
              </button>
            </div>

            {/* Cross-sell */}
            {recommendations.length > 0 && (
              <section className="mt-12">
                <h2 className="font-heading text-xl font-semibold mb-5">{t.crossSellTitle}</h2>
                <div className="grid grid-cols-2 gap-4">
                  {recommendations.map(p => (
                    <div key={p.id} className="flex gap-3 p-3 rounded-xl bg-secondary/60 hover:bg-secondary transition-colors">
                      <Link to={`/product/${p.slug}`} className="w-16 h-16 rounded-lg overflow-hidden bg-background flex-shrink-0">
                        <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                      </Link>
                      <div className="flex-1 min-w-0">
                        <Link to={`/product/${p.slug}`} className="text-sm font-semibold leading-tight hover:text-primary transition-colors line-clamp-2">
                          {p.name}
                        </Link>
                        <p className="text-xs text-muted-foreground mt-0.5">{formatPrice(p.price)}</p>
                        <button
                          onClick={() => { addItem(p); }}
                          className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-bold tracking-wide uppercase text-primary hover:underline"
                        >
                          <Plus className="w-3 h-3" /> {t.add}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Summary */}
          <aside className="lg:col-span-1">
            <div className="sticky top-28 bg-secondary rounded-2xl p-6 space-y-5">
              <h2 className="font-heading text-xl font-semibold">{t.summary}</h2>

              {appliedDiscount ? (
                <div className="space-y-2">
                  <label className="text-xs tracking-widest uppercase text-muted-foreground flex items-center gap-1.5">
                    <Tag className="w-3 h-3" /> {t.discountCode}
                  </label>
                  <div className="flex items-center justify-between px-3 py-2 rounded-full border border-primary/40 bg-primary/5 text-sm">
                    <span className="font-semibold tracking-wide">{appliedDiscount.code}</span>
                    <button type="button" onClick={removeDiscount} className="text-xs text-muted-foreground hover:text-destructive transition-colors">
                      {t.removeCode}
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={applyCode} className="space-y-2">
                  <label className="text-xs tracking-widest uppercase text-muted-foreground flex items-center gap-1.5">
                    <Tag className="w-3 h-3" /> {t.discountCode}
                  </label>
                  <div className="flex gap-2">
                    <input
                      value={code}
                      onChange={e => setCode(e.target.value)}
                      placeholder={t.codePlaceholder}
                      className="flex-1 px-3 py-2 rounded-full border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                    <button type="submit" disabled={validating} className="px-4 py-2 rounded-full bg-foreground text-background text-xs font-bold tracking-wide uppercase hover:opacity-90 transition-opacity disabled:opacity-60">
                      {t.apply}
                    </button>
                  </div>
                </form>
              )}

              <div className="border-t border-border pt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t.subtotal}</span>
                  <span>{formatAmount(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-primary">
                    <span>{t.discount} ({appliedDiscount?.code})</span>
                    <span>−{formatAmount(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t.shipping}</span>
                  <span>{shippingCost > 0 ? formatAmount(shippingCost) : t.free}</span>
                </div>
                <div className="flex justify-between text-base font-semibold pt-3 border-t border-border">
                  <span>{t.total}</span>
                  <span>{formatAmount(total)}</span>
                </div>
              </div>

              <Link
                to="/checkout"
                className="block w-full py-3.5 bg-primary text-primary-foreground text-center text-sm font-bold tracking-widest uppercase rounded-full hover:opacity-90 transition-opacity"
              >
                {t.checkout}
              </Link>
              <p className="text-[11px] text-center text-muted-foreground">
                {t.paymentNote}
              </p>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
};

export default Cart;
