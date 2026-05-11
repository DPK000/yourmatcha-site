import { useParams, Link, Navigate } from "react-router-dom";
import { getProductBySlug, getRelatedProducts } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useEffect, useMemo, useState } from "react";
import { Minus, Plus, ShoppingBag, ChevronLeft, Star, Truck, Leaf, ShieldCheck, Heart, Zap, Brain, Droplets, Sparkles } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import ProductImageZoom from "@/components/ProductImageZoom";
import SEO from "@/components/SEO";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { reviewTranslations } from "@/data/reviewTranslations";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" }).format(price);

interface UserReview { name: string; rating: number; text: string; date: string }

const useUserReviews = (productId: string) => {
  const key = `ym-reviews-${productId}`;
  const [list, setList] = useState<UserReview[]>([]);
  useEffect(() => {
    try { setList(JSON.parse(localStorage.getItem(key) || "[]")); } catch { /* noop */ }
  }, [key]);
  const add = (r: UserReview) => {
    const next = [r, ...list];
    setList(next);
    localStorage.setItem(key, JSON.stringify(next));
  };
  return { list, add };
};

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = getProductBySlug(slug || "");
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [openAccordion, setOpenAccordion] = useState<string | null>("ingredients");
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [draft, setDraft] = useState({ name: "", rating: 5, text: "" });
  const { list: userReviews, add: addReview } = useUserReviews(product?.id || "");

  if (!product) return <Navigate to="/shop" replace />;

  const allReviews = [...userReviews, ...product.reviews];
  const related = getRelatedProducts(product);
  const accordionItems = [
    product.ingredients && { id: "ingredients", title: "Ingrediënten", content: product.ingredients },
    product.origin && { id: "origin", title: "Herkomst", content: product.origin },
    product.preparation && { id: "preparation", title: "Bereiding", content: product.preparation },
    { id: "shipping", title: "Verzending & retour", content: "Gratis verzending in NL & BE vanaf €50. Geleverd binnen 1–2 werkdagen. 30 dagen retour, geen vragen." },
  ].filter(Boolean) as { id: string; title: string; content: string }[];

  const avgRating = allReviews.length
    ? allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length
    : null;

  const productJsonLd = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    sku: product.id,
    image: product.images,
    brand: { "@type": "Brand", name: "YourMatcha" },
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      price: product.price.toFixed(2),
      availability: "https://schema.org/InStock",
      url: `https://yourmatcha.nl/product/${product.slug}`,
    },
    ...(avgRating && allReviews.length
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: avgRating.toFixed(1),
            reviewCount: allReviews.length,
          },
          review: allReviews.slice(0, 5).map(r => ({
            "@type": "Review",
            author: { "@type": "Person", name: r.name },
            reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5 },
            reviewBody: r.text,
            datePublished: r.date,
          })),
        }
      : {}),
  }), [product, avgRating, allReviews]);

  const breadcrumbJsonLd = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://yourmatcha.nl/" },
      { "@type": "ListItem", position: 2, name: "Shop", item: "https://yourmatcha.nl/shop" },
      { "@type": "ListItem", position: 3, name: product.categoryLabel, item: `https://yourmatcha.nl/shop?category=${product.category}` },
      { "@type": "ListItem", position: 4, name: product.name, item: `https://yourmatcha.nl/product/${product.slug}` },
    ],
  }), [product]);

  // Multiple images: use main + reuse for gallery thumbs (lifestyle effect)
  const gallery = product.images.length > 1 ? product.images : [product.images[0]];

  const submitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.name.trim() || !draft.text.trim()) return;
    addReview({ ...draft, date: new Date().toISOString().slice(0, 10) });
    setDraft({ name: "", rating: 5, text: "" });
    setShowReviewForm(false);
    toast.success("Bedankt voor je review! 🍵");
  };

  return (
    <>
      <SEO
        title={`${product.name} — ${formatPrice(product.price)}`}
        description={product.shortDescription + " Premium Japanse matcha, gratis verzending vanaf €50."}
        canonical={`/product/${product.slug}`}
        type="product"
        image={product.images[0]}
        jsonLd={[productJsonLd, breadcrumbJsonLd]}
        keywords={`${product.name}, ${product.categoryLabel}, Japanse matcha, ceremoniële matcha, matcha kopen, ${product.weight || ""}`}
      />

      <div className="py-10 pb-28 md:pb-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/shop" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ChevronLeft className="w-4 h-4" /> Terug naar shop
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Gallery */}
            <div className="lg:sticky lg:top-28 self-start">
              <motion.div
                key={activeImg}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-3"
              >
                <ProductImageZoom src={gallery[activeImg]} alt={product.name} />
              </motion.div>
              {gallery.length > 1 && (
                <div className="grid grid-cols-5 gap-2">
                  {gallery.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${activeImg === i ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"}`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div>
              {product.badge && (
                <span className="inline-block px-3 py-1 bg-accent text-accent-foreground text-[10px] font-bold tracking-widest uppercase rounded-full mb-3">
                  {product.badge}
                </span>
              )}
              <p className="text-xs text-muted-foreground tracking-widest uppercase mb-2">{product.categoryLabel}</p>
              <h1 className="font-heading text-3xl md:text-5xl font-light leading-tight mb-3">{product.name}</h1>

              {avgRating && (
                <div className="flex items-center gap-2 mb-5">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map(s => (
                      <Star key={s} className={`w-4 h-4 ${s <= Math.round(avgRating) ? "text-accent fill-accent" : "text-border"}`} />
                    ))}
                  </div>
                  <a href="#reviews" className="text-sm text-muted-foreground hover:text-foreground underline-offset-2 hover:underline">
                    ({allReviews.length} {allReviews.length === 1 ? "beoordeling" : "beoordelingen"})
                  </a>
                </div>
              )}

              <p className="text-foreground/85 leading-relaxed mb-6">{product.shortDescription}</p>

              {/* Benefit icons strip — only for matcha & tea */}
              {(product.category === "matcha-powder" || product.category === "teas-drinks") && (
                <div className="grid grid-cols-4 gap-2 mb-6 bg-secondary/60 rounded-2xl p-4">
                  {[
                    { icon: Zap, label: "Energie zonder dip" },
                    { icon: Brain, label: "Focus & helderheid" },
                    { icon: Sparkles, label: "Antioxidanten" },
                    { icon: Droplets, label: "L-Theanine" },
                  ].map(b => (
                    <div key={b.label} className="text-center">
                      <b.icon className="w-5 h-5 mx-auto text-primary mb-1.5" strokeWidth={1.5} />
                      <p className="text-[10px] text-foreground/70 leading-tight font-medium">{b.label}</p>
                    </div>
                  ))}
                </div>
              )}

              {product.weight && (
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Inhoud: <strong className="text-foreground">{product.weight}</strong></p>
              )}

              <div className="flex items-baseline gap-3 mb-1">
                <p className="text-3xl font-semibold text-foreground">{formatPrice(product.price)}</p>
                {product.badge === "Voordeel" && (
                  <p className="text-base text-muted-foreground line-through">{formatPrice(product.price * 1.2)}</p>
                )}
              </div>
              <p className="text-xs text-muted-foreground mb-6">Incl. btw · Gratis verzending vanaf €35</p>

              {/* Subscription inline upsell */}
              <Link
                to="/abonnementen"
                className="flex items-center justify-between gap-3 px-5 py-4 mb-6 border-2 border-primary/20 rounded-2xl hover:border-primary hover:bg-primary/5 transition-colors group"
              >
                <div>
                  <p className="text-sm font-semibold text-foreground">Maandelijks ontvangen</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Bespaar 15% · pauzeer of stop wanneer je wilt</p>
                </div>
                <span className="text-xs font-bold text-primary tracking-widest uppercase shrink-0 group-hover:translate-x-1 transition-transform">−15% →</span>
              </Link>

              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center border border-border rounded-full">
                  <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-10 h-12 flex items-center justify-center hover:bg-secondary rounded-l-full transition-colors">
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 text-sm font-medium min-w-[3rem] text-center">{quantity}</span>
                  <button onClick={() => setQuantity(q => q + 1)} className="w-10 h-12 flex items-center justify-center hover:bg-secondary rounded-r-full transition-colors">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <button
                  onClick={() => { addItem(product, quantity); setQuantity(1); }}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 h-12 bg-primary text-primary-foreground font-bold text-xs tracking-widest uppercase rounded-full hover:opacity-90 transition-opacity"
                >
                  <ShoppingBag className="w-4 h-4" /> In winkelwagen
                </button>
                <button
                  aria-label="Wensenlijst"
                  className="w-12 h-12 flex items-center justify-center border border-border rounded-full hover:bg-secondary transition-colors"
                >
                  <Heart className="w-4 h-4" />
                </button>
              </div>

              {/* Money-back callout */}
              <div className="relative bg-primary/5 border border-primary/15 rounded-2xl px-5 py-4 mb-6 text-center">
                <Heart className="w-5 h-5 text-primary fill-primary/30 mx-auto -mt-7 mb-1 bg-background rounded-full p-0.5" />
                <p className="text-sm font-bold text-foreground">Probeer het. Niet goed? Geld terug.</p>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  98% van onze klanten beoordeelt deze matcha met 5 sterren. Mocht je niet tevreden zijn, krijg je je geld terug binnen 30 dagen.
                </p>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-3 mb-8 text-center">
                {[
                  { icon: Truck, label: "Gratis vanaf €35" },
                  { icon: Leaf, label: "100% biologisch" },
                  { icon: ShieldCheck, label: "30 dagen retour" },
                ].map(b => (
                  <div key={b.label} className="bg-secondary rounded-xl p-3">
                    <b.icon className="w-4 h-4 mx-auto text-primary mb-1" />
                    <p className="text-[10px] text-muted-foreground tracking-wide">{b.label}</p>
                  </div>
                ))}
              </div>

              {/* Accordion */}
              <div className="border-t border-border">
                {accordionItems.map(item => (
                  <div key={item.id} className="border-b border-border">
                    <button
                      onClick={() => setOpenAccordion(openAccordion === item.id ? null : item.id)}
                      className="w-full flex items-center justify-between py-4 text-sm font-semibold tracking-wide hover:text-primary transition-colors"
                    >
                      {item.title}
                      <span className="text-primary text-xl">{openAccordion === item.id ? "−" : "+"}</span>
                    </button>
                    {openAccordion === item.id && (
                      <p className="pb-5 text-sm text-muted-foreground leading-relaxed">{item.content}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Reviews */}
          <section id="reviews" className="mt-20">
            <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
              <div>
                <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2">Reviews</p>
                <h2 className="font-heading text-3xl md:text-4xl font-light">Wat klanten zeggen</h2>
              </div>
              <button
                onClick={() => setShowReviewForm(s => !s)}
                className="px-5 py-2.5 bg-primary text-primary-foreground text-xs font-bold tracking-widest uppercase rounded-full hover:opacity-90 transition-opacity"
              >
                {showReviewForm ? "Annuleren" : "Schrijf een review"}
              </button>
            </div>

            {/* Rating distribution */}
            {allReviews.length > 0 && avgRating && (
              <div className="grid grid-cols-1 md:grid-cols-[auto,1fr] gap-8 md:gap-12 bg-secondary/60 rounded-2xl p-6 md:p-8 mb-8">
                <div className="text-center md:text-left md:border-r md:border-border md:pr-12">
                  <p className="font-heading text-5xl font-light leading-none mb-2">{avgRating.toFixed(1)}</p>
                  <div className="flex items-center justify-center md:justify-start gap-0.5 mb-2">
                    {[1,2,3,4,5].map(s => (
                      <Star key={s} className={`w-4 h-4 ${s <= Math.round(avgRating) ? "text-accent fill-accent" : "text-border"}`} />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">Op basis van {allReviews.length} {allReviews.length === 1 ? "beoordeling" : "beoordelingen"}</p>
                </div>
                <div className="space-y-1.5">
                  {[5,4,3,2,1].map(stars => {
                    const count = allReviews.filter(r => r.rating === stars).length;
                    const pct = (count / allReviews.length) * 100;
                    return (
                      <div key={stars} className="flex items-center gap-3 text-xs">
                        <span className="w-6 text-muted-foreground tabular-nums">{stars}★</span>
                        <div className="flex-1 h-2 bg-background rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${pct}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="h-full bg-accent rounded-full"
                          />
                        </div>
                        <span className="w-10 text-right text-muted-foreground tabular-nums">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {showReviewForm && (
              <motion.form
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={submitReview}
                className="bg-secondary rounded-2xl p-6 mb-8 grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <input
                  required
                  value={draft.name}
                  onChange={e => setDraft({ ...draft, name: e.target.value })}
                  placeholder="Je naam"
                  className="px-4 py-3 rounded-full border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                <div className="flex items-center gap-2 px-4 py-3 rounded-full border border-border bg-background">
                  <span className="text-xs text-muted-foreground">Beoordeling:</span>
                  {[1, 2, 3, 4, 5].map(n => (
                    <button type="button" key={n} onClick={() => setDraft({ ...draft, rating: n })}>
                      <Star className={`w-4 h-4 ${n <= draft.rating ? "text-accent fill-accent" : "text-border"}`} />
                    </button>
                  ))}
                </div>
                <textarea
                  required
                  value={draft.text}
                  onChange={e => setDraft({ ...draft, text: e.target.value })}
                  placeholder="Hoe was je ervaring?"
                  rows={4}
                  className="md:col-span-2 px-4 py-3 rounded-2xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                />
                <button
                  type="submit"
                  className="md:col-span-2 px-6 py-3 bg-primary text-primary-foreground text-xs font-bold tracking-widest uppercase rounded-full hover:opacity-90 transition-opacity"
                >
                  Plaats review
                </button>
              </motion.form>
            )}

            {allReviews.length === 0 ? (
              <p className="text-muted-foreground text-sm">Nog geen reviews. Wees de eerste!</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {allReviews.map((review, i) => (
                  <div key={i} className="p-6 bg-card rounded-2xl border border-border/60">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map(s => (
                          <Star key={s} className={`w-4 h-4 ${s <= review.rating ? "text-accent fill-accent" : "text-border"}`} />
                        ))}
                      </div>
                      <span className="inline-flex items-center gap-1 text-[10px] text-primary font-medium tracking-wider uppercase">
                        <ShieldCheck className="w-3 h-3" /> Geverifieerd
                      </span>
                    </div>
                    <p className="text-sm text-foreground/85 leading-relaxed mb-4">"{review.text}"</p>
                    <p className="text-xs font-semibold">— {review.name}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{new Date(review.date).toLocaleDateString("nl-NL")}</p>
                  </div>
                ))}
              </div>
            )}
          </section>

          {related.length > 0 && (
            <section className="mt-20">
              <h2 className="font-heading text-2xl md:text-3xl font-light mb-8">Past goed bij</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {related.slice(0, 4).map(p => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      {/* Sticky mobile add-to-cart */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-background/95 backdrop-blur-md border-t border-border shadow-elevated">
        <div className="px-4 py-3 flex items-center gap-3">
          <img src={product.images[0]} alt="" className="w-12 h-12 rounded-lg object-cover bg-secondary shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold truncate">{product.name}</p>
            <p className="text-sm font-bold text-primary">{formatPrice(product.price)}</p>
          </div>
          <button
            onClick={() => addItem(product, quantity)}
            className="shrink-0 inline-flex items-center justify-center gap-1.5 px-5 h-11 bg-primary text-primary-foreground font-bold text-[11px] tracking-widest uppercase rounded-full"
          >
            <ShoppingBag className="w-4 h-4" /> In mand
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
