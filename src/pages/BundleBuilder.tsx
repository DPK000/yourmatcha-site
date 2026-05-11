import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Plus, ArrowRight, Sparkles } from "lucide-react";
import { products, Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import SEO from "@/components/SEO";
import PageHero from "@/components/PageHero";
import { Link } from "react-router-dom";

const TARGET = 3;
const DISCOUNT_PCT = 0.15;

const formatPrice = (n: number) =>
  new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" }).format(n);

const BundleBuilder = () => {
  const { addItem } = useCart();
  const eligible = useMemo(
    () => products.filter(p => p.category === "matcha-powder" || p.category === "teas-drinks"),
    []
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
        title="Bouw je eigen Matcha Bundel — 15% korting"
        description="Stel je eigen pakket samen van 3 matcha en thee specialiteiten en bespaar automatisch 15%. Gratis verzending in NL & BE vanaf €50."
        canonical="/bundel"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: "YourMatcha Bundel — 3 voor 15% korting",
          description: "Stel zelf een bundel samen van 3 matcha of thee producten en bespaar 15%.",
          brand: { "@type": "Brand", name: "YourMatcha" },
          offers: { "@type": "AggregateOffer", priceCurrency: "EUR", lowPrice: 35, highPrice: 90 },
        }}
      />
      <PageHero
        eyebrow="Bundle Builder"
        title="Bouw je eigen ritueel"
        subtitle="Kies 3 favorieten uit onze matcha & thee collectie en bespaar automatisch 15%."
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Selection grid */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted-foreground">
                Selecteer <strong>{TARGET}</strong> producten — {selected.length} / {TARGET} gekozen
              </p>
              {selected.length > 0 && (
                <button onClick={() => setSelected([])} className="text-xs text-muted-foreground hover:text-destructive transition-colors">
                  Reset
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
                <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">Jouw bundel</p>
              </div>
              <h2 className="font-heading text-2xl font-light mb-5">3 voor <span className="italic">15% korting</span></h2>

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
                          <span>Slot {i + 1}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="space-y-1.5 text-sm border-t border-border pt-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotaal</span>
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
                      <span>Bundelkorting (15%)</span>
                      <span>−{formatPrice(discount)}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="flex justify-between text-base font-semibold pt-2 border-t border-border">
                  <span>Totaal</span>
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
                {ready ? "Voeg bundel toe" : `Kies nog ${TARGET - selected.length}`}
              </button>
              <Link to="/shop" className="mt-3 block text-center text-xs text-muted-foreground hover:text-foreground transition-colors">
                Of bekijk de hele shop →
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
};

export default BundleBuilder;
