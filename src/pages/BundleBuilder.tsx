import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Plus, ArrowRight, Sparkles } from "lucide-react";
import { useProducts, Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import SEO from "@/components/SEO";
import PageHero from "@/components/PageHero";
import { Link } from "react-router-dom";
import { useCurrency } from "@/context/CurrencyContext";
import { useLang } from "@/i18n";

const TARGET = 3;
const DISCOUNT_PCT = 0.15;

const COPY = {
  nl: {
    seoTitle: "Bouw je eigen Matcha Bundel — 15% korting",
    seoDescription: "Stel je eigen pakket samen van 3 matcha en thee specialiteiten en bespaar automatisch 15%. Gratis verzending in NL & BE vanaf €50.",
    jsonLdName: "YourMatcha Bundel — 3 voor 15% korting",
    jsonLdDescription: "Stel zelf een bundel samen van 3 matcha of thee producten en bespaar 15%.",
    heroEyebrow: "Bundle Builder",
    heroTitle: "Bouw je eigen ritueel",
    heroSubtitle: "Kies 3 favorieten uit onze matcha & thee collectie en bespaar automatisch 15%.",
    selectPrefix: "Selecteer ",
    selectMiddle: " producten — ",
    selectChosen: "gekozen",
    reset: "Reset",
    yourBundle: "Jouw bundel",
    bundleTitlePrefix: "3 voor ",
    bundleTitleItalic: "15% korting",
    slot: "Slot",
    subtotal: "Subtotaal",
    bundleDiscount: "Bundelkorting (15%)",
    total: "Totaal",
    addBundle: "Voeg bundel toe",
    chooseMore: (n: number) => `Kies nog ${n}`,
    viewShop: "Of bekijk de hele shop →",
  },
  no: {
    seoTitle: "Sett sammen din egen matcha-pakke — 15 % rabatt",
    seoDescription: "Sett sammen din egen pakke med 3 matcha- og te-spesialiteter og spar automatisk 15 %. Gratis frakt fra 575 kr.",
    jsonLdName: "YourMatcha-pakke — 3 for 15 % rabatt",
    jsonLdDescription: "Sett sammen en pakke med 3 matcha- eller te-produkter og spar 15 %.",
    heroEyebrow: "Bundle Builder",
    heroTitle: "Bygg ditt eget ritual",
    heroSubtitle: "Velg 3 favoritter fra vår matcha- og tekolleksjon og spar automatisk 15 %.",
    selectPrefix: "Velg ",
    selectMiddle: " produkter — ",
    selectChosen: "valgt",
    reset: "Nullstill",
    yourBundle: "Din pakke",
    bundleTitlePrefix: "3 for ",
    bundleTitleItalic: "15 % rabatt",
    slot: "Plass",
    subtotal: "Delsum",
    bundleDiscount: "Pakkerabatt (15 %)",
    total: "Totalt",
    addBundle: "Legg til pakken",
    chooseMore: (n: number) => `Velg ${n} til`,
    viewShop: "Eller se hele butikken →",
  },
} as const;

const BundleBuilder = () => {
  const { format: formatPrice } = useCurrency();
  const lang = useLang();
  const t = COPY[lang === "no" ? "no" : "nl"];
  const { addItem } = useCart();
  const products = useProducts();
  const eligible = useMemo(
    () => products.filter(p => p.category === "matcha-powder" || p.category === "teas-drinks"),
    [products]
  );
  const [selected, setSelected] = useState<Product[]>([]);

  const toggle = (p: Product) => {
    setSelected(prev => {
      const exists = prev.find(x => x.id === p.id);
      if (exists) return prev.filter(x => x.id !== p.id);
      if (prev.length >= TARGET) return prev;
      return [...prev, p];
    });
  };

  const subtotal = selected.reduce((s, p) => s + p.price, 0);
  const discount = selected.length === TARGET ? subtotal * DISCOUNT_PCT : 0;
  const total = subtotal - discount;
  const ready = selected.length === TARGET;

  const addBundle = () => {
    selected.forEach(p => addItem(p, 1));
    setSelected([]);
  };

  return (
    <>
      <SEO
        title={t.seoTitle}
        description={t.seoDescription}
        canonical="/bundel"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: t.jsonLdName,
          description: t.jsonLdDescription,
          brand: { "@type": "Brand", name: "YourMatcha" },
          offers: { "@type": "AggregateOffer", priceCurrency: "EUR", lowPrice: 35, highPrice: 90 },
        }}
      />
      <PageHero
        eyebrow={t.heroEyebrow}
        title={t.heroTitle}
        subtitle={t.heroSubtitle}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Selection grid */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted-foreground">
                {t.selectPrefix}<strong>{TARGET}</strong>{t.selectMiddle}{selected.length} / {TARGET} {t.selectChosen}
              </p>
              {selected.length > 0 && (
                <button onClick={() => setSelected([])} className="text-xs text-muted-foreground hover:text-destructive transition-colors">
                  {t.reset}
                </button>
              )}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {eligible.map(p => {
                const isSel = selected.some(x => x.id === p.id);
                const isDisabled = !isSel && selected.length >= TARGET;
                return (
                  <button
                    key={p.id}
                    onClick={() => toggle(p)}
                    disabled={isDisabled}
                    className={`relative text-left rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
                      isSel ? "border-primary shadow-card" : "border-transparent hover:border-border"
                    } ${isDisabled ? "opacity-40 cursor-not-allowed" : ""}`}
                  >
                    <div className="aspect-square bg-secondary">
                      <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                    {isSel && (
                      <span className="absolute top-2 right-2 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-soft">
                        <Check className="w-4 h-4" />
                      </span>
                    )}
                    <div className="p-3 bg-background">
                      <h3 className="font-heading text-sm font-semibold leading-tight line-clamp-2">{p.name}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">{formatPrice(p.price)}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sticky summary */}
          <aside className="lg:col-span-1">
            <div className="sticky top-28 bg-secondary rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-4 h-4 text-accent" />
                <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">{t.yourBundle}</p>
              </div>
              <h2 className="font-heading text-2xl font-light mb-5">{t.bundleTitlePrefix}<span className="italic">{t.bundleTitleItalic}</span></h2>

              <div className="space-y-2 mb-5 min-h-[150px]">
                {Array.from({ length: TARGET }).map((_, i) => {
                  const item = selected[i];
                  return (
                    <div key={i} className={`flex items-center gap-3 p-2 rounded-xl border-2 border-dashed ${item ? "border-transparent bg-background" : "border-border/60"}`}>
                      {item ? (
                        <>
                          <img src={item.images[0]} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold truncate">{item.name}</p>
                            <p className="text-xs text-muted-foreground">{formatPrice(item.price)}</p>
                          </div>
                          <button onClick={() => toggle(item)} className="text-muted-foreground hover:text-destructive text-xs">×</button>
                        </>
                      ) : (
                        <div className="flex items-center gap-3 text-muted-foreground text-xs px-1">
                          <div className="w-12 h-12 rounded-lg bg-background/60 flex items-center justify-center">
                            <Plus className="w-4 h-4" />
                          </div>
                          <span>{t.slot} {i + 1}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="space-y-1.5 text-sm border-t border-border pt-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t.subtotal}</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <AnimatePresence>
                  {discount > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex justify-between text-primary font-semibold"
                    >
                      <span>{t.bundleDiscount}</span>
                      <span>−{formatPrice(discount)}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="flex justify-between text-base font-semibold pt-2 border-t border-border">
                  <span>{t.total}</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              <button
                onClick={addBundle}
                disabled={!ready}
                className={`mt-5 w-full py-3.5 text-sm font-bold tracking-widest uppercase rounded-full transition-all ${
                  ready
                    ? "bg-primary text-primary-foreground hover:opacity-90"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                }`}
              >
                {ready ? t.addBundle : t.chooseMore(TARGET - selected.length)}
              </button>
              <Link to="/shop" className="mt-3 block text-center text-xs text-muted-foreground hover:text-foreground transition-colors">
                {t.viewShop}
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
};

export default BundleBuilder;
