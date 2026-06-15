import { Link } from "react-router-dom";
import { Minus, Plus, X, ShoppingBag, Truck, ArrowRight, Tag } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { useCart } from "@/context/CartContext";
import { useProducts } from "@/data/products";
import SEO from "@/components/SEO";
import { toast } from "sonner";
import { useCurrency } from "@/context/CurrencyContext";
import { useLang } from "@/i18n";

const FREE_SHIPPING = 50;

const COPY = {
  nl: {
    seoTitle: "Winkelwagen",
    seoDescription: "Bekijk je winkelwagen en reken veilig af. Gratis verzending in Nederland en België vanaf €50.",
    toastCodeApplied: "Code toegepast — 10% korting 🍵",
    toastAmountApplied: (amount: string) => `${amount} korting toegepast`,
    toastInvalidCode: "Ongeldige kortingscode",
    emptyTitle: "Je winkelwagen is leeg",
    emptySubtitle: "Ontdek onze ceremoniële matcha, thee en rituelen.",
    toShop: "Naar de shop",
    title: "Je winkelwagen",
    itemSingular: "artikel",
    itemPlural: "artikelen",
    remainingPrefix: "Nog ",
    remainingSuffix: " tot gratis verzending",
    freeShippingReached: "🎉 Je krijgt gratis verzending!",
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
    paymentNote: "🔒 Veilig betalen · iDEAL · Bancontact · Creditcard · PayPal",
  },
  no: {
    seoTitle: "Handlekurv",
    seoDescription: "Se handlekurven din og betal trygt. Gratis frakt til Nederland og Belgia fra 575 kr.",
    toastCodeApplied: "Kode aktivert — 10 % rabatt 🍵",
    toastAmountApplied: (amount: string) => `${amount} rabatt aktivert`,
    toastInvalidCode: "Ugyldig rabattkode",
    emptyTitle: "Handlekurven din er tom",
    emptySubtitle: "Utforsk vår seremonielle matcha, te og ritualer.",
    toShop: "Til butikken",
    title: "Handlekurven din",
    itemSingular: "vare",
    itemPlural: "varer",
    remainingPrefix: "Kun ",
    remainingSuffix: " igjen til gratis frakt",
    freeShippingReached: "🎉 Du får gratis frakt!",
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
    paymentNote: "🔒 Trygg betaling · iDEAL · Bancontact · Kort · PayPal",
  },
} as const;

const Cart = () => {
  const { format: formatPrice } = useCurrency();
  const lang = useLang();
  const t = COPY[lang === "no" ? "no" : "nl"];
  const { items, removeItem, updateQuantity, subtotal, addItem, clearCart } = useCart();
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const products = useProducts();

  const recommendations = useMemo(() => {
    const inCart = new Set(items.map(i => i.product.id));
    return products.filter(p => !inCart.has(p.id) && (p.bestseller || p.badge)).slice(0, 4);
  }, [items, products]);

  const remaining = Math.max(0, FREE_SHIPPING - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING) * 100);
  const total = Math.max(0, subtotal - discount);

  const applyCode = (e: React.FormEvent) => {
    e.preventDefault();
    const c = code.trim().toUpperCase();
    if (c === "MATCHA10") {
      setDiscount(subtotal * 0.1);
      toast.success(t.toastCodeApplied);
    } else if (c === "WELKOM5") {
      setDiscount(5);
      toast.success(t.toastAmountApplied(formatPrice(5)));
    } else {
      toast.error(t.toastInvalidCode);
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
              <span>{t.remainingPrefix}<strong>{formatPrice(remaining)}</strong>{t.remainingSuffix}</span>
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
                    <span className="font-semibold">{formatPrice(item.product.price * item.quantity)}</span>
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
                  <button type="submit" className="px-4 py-2 rounded-full bg-foreground text-background text-xs font-bold tracking-wide uppercase hover:opacity-90 transition-opacity">
                    {t.apply}
                  </button>
                </div>
              </form>

              <div className="border-t border-border pt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t.subtotal}</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-primary">
                    <span>{t.discount}</span>
                    <span>−{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t.shipping}</span>
                  <span>{remaining > 0 ? formatPrice(4.95) : t.free}</span>
                </div>
                <div className="flex justify-between text-base font-semibold pt-3 border-t border-border">
                  <span>{t.total}</span>
                  <span>{formatPrice(total + (remaining > 0 ? 4.95 : 0))}</span>
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
