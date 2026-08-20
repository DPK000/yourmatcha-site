import { useParams, Navigate } from "react-router-dom";
import { Link } from "@/components/LocalizedLink";
import { useProduct, useRelatedProducts } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useEffect, useMemo, useState } from "react";
import { ShoppingBag, ChevronLeft, Star, Truck, Leaf, ShieldCheck, Heart, Zap, Brain, Droplets, Sparkles } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import ProductImageZoom from "@/components/ProductImageZoom";
import SEO, { getSiteUrl } from "@/components/SEO";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { getCurrentLang } from "@/i18n";
import { useCurrency } from "@/context/CurrencyContext";
import { reviewTranslations } from "@/data/reviewTranslations";
import { trackViewContent } from "@/hooks/useMetaPixel";

/**
 * Staffelkorting op de productpagina. Dezelfde 15% bij drie stuks als in de
 * bundelbouwer, zodat een klant nooit twee verschillende kortingen ziet voor
 * hetzelfde aantal.
 */
const BUNDLE_TIERS = [
  { qty: 1, discount: 0 },
  { qty: 2, discount: 0.10, popular: true },
  { qty: 3, discount: 0.15 },
] as const;

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
  const { t, i18n } = useTranslation();
  const { format: formatPrice, formatAmount, convert, currency, freeShippingThreshold } = useCurrency();
  const lang = getCurrentLang();
  const siteUrl = getSiteUrl(lang);
  const tReview = (text: string) => {
    if (lang === "nl") return text;
    return reviewTranslations[text]?.[lang] || text;
  };
  const { slug } = useParams<{ slug: string }>();
  const product = useProduct(slug);
  const { addItem } = useCart();
  const [tierIdx, setTierIdx] = useState(0);
  const [activeImg, setActiveImg] = useState(0);
  const [openAccordion, setOpenAccordion] = useState<string | null>("ingredients");
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [draft, setDraft] = useState({ name: "", rating: 5, text: "" });
  const { list: userReviews, add: addReview } = useUserReviews(product?.id || "");
  const related = useRelatedProducts(product);

  // Hook staat vóór de early return zodat de volgorde per render gelijk blijft.
  useEffect(() => {
    if (!product) return;
    trackViewContent({ id: product.id, name: product.name, price: product.price }, "EUR");
  }, [product]);

  // Vangnet: redirects worden in de router afgehandeld (resolveProductPath).
  if (!product) return <Navigate to="/shop" replace />;

  const tier = BUNDLE_TIERS[tierIdx];
  const unitPrice = Math.round(product.price * (1 - tier.discount) * 100) / 100;
  const bundleTotal = Math.round(unitPrice * tier.qty * 100) / 100;
  const bundleSaving = Math.round((product.price * tier.qty - bundleTotal) * 100) / 100;

  /** Voegt de gekozen staffel toe. Bij korting krijgt het item een eigen id en
   *  de verlaagde stuksprijs, zodat de winkelwagen het los van het normale
   *  product optelt - zelfde patroon als de bundelbouwer. */
  const addBundle = () => {
    if (tier.discount === 0) {
      addItem(product, tier.qty);
    } else {
      addItem({ ...product, id: `${product.id}-x${tier.qty}`, price: unitPrice }, tier.qty);
    }
  };

  const addOn = related[0];

  const allReviews = [...userReviews, ...product.reviews];
  const accordionItems = [
    product.ingredients && { id: "ingredients", title: t("product.ingredients"), content: product.ingredients },
    product.origin && { id: "origin", title: t("product.origin"), content: product.origin },
    product.preparation && { id: "preparation", title: t("product.preparation"), content: product.preparation },
    { id: "shipping", title: t("product.shippingTitle"), content: t("product.shippingContent") },
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
      priceCurrency: currency,
      price: currency === "NOK" ? String(convert(product.price)) : product.price.toFixed(2),
      availability: "https://schema.org/InStock",
      url: `${siteUrl}/product/${product.slug}`,
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
            reviewBody: tReview(r.text),
            datePublished: r.date,
          })),
        }
      : {}),
  }), [product, avgRating, allReviews, currency, convert, siteUrl]);

  const breadcrumbJsonLd = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Shop", item: `${siteUrl}/shop` },
      { "@type": "ListItem", position: 3, name: product.categoryLabel, item: `${siteUrl}/shop?category=${product.category}` },
      { "@type": "ListItem", position: 4, name: product.name, item: `${siteUrl}/product/${product.slug}` },
    ],
  }), [product, siteUrl]);

  // Multiple images: use main + reuse for gallery thumbs (lifestyle effect)
  const gallery = product.images.length > 1 ? product.images : [product.images[0]];

  const submitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.name.trim() || !draft.text.trim()) return;
    addReview({ ...draft, date: new Date().toISOString().slice(0, 10) });
    setDraft({ name: "", rating: 5, text: "" });
    setShowReviewForm(false);
    toast.success(t("product.reviewToast"));
  };

  return (
    <>
      <SEO
        title={`${product.name} - ${formatPrice(product.price)}`}
        description={product.shortDescription + " " + t("product.seoSuffix")}
        canonical={`/product/${product.slug}`}
        type="product"
        image={product.images[0]}
        jsonLd={[productJsonLd, breadcrumbJsonLd]}
        keywords={`${product.name}, ${product.categoryLabel}, ${t("product.seoKeywords")}, ${product.weight || ""}`}
      />

      <div className="py-10 pb-28 md:pb-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/shop" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ChevronLeft className="w-4 h-4" /> {t("product.backToShop")}
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
                    ({allReviews.length} {allReviews.length === 1 ? t("product.reviewSingular") : t("product.reviewPlural")})
                  </a>
                </div>
              )}

              <p className="text-foreground/85 leading-relaxed mb-6">{product.shortDescription}</p>

              {/* Benefit icons strip - only for matcha & tea */}
              {(product.category === "matcha-powder" || product.category === "teas-drinks") && (
                <div className="grid grid-cols-4 gap-2 mb-6 bg-secondary/60 rounded-2xl p-4">
                  {[
                    { icon: Zap, label: t("product.benefitEnergy") },
                    { icon: Brain, label: t("product.benefitFocus") },
                    { icon: Sparkles, label: t("product.benefitAntiox") },
                    { icon: Droplets, label: t("product.benefitTheanine") },
                  ].map(b => (
                    <div key={b.label} className="text-center">
                      <b.icon className="w-5 h-5 mx-auto text-primary mb-1.5" strokeWidth={1.5} />
                      <p className="text-[10px] text-foreground/70 leading-tight font-medium">{b.label}</p>
                    </div>
                  ))}
                </div>
              )}

              {product.weight && (
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">{t("product.contentLabel")}: <strong className="text-foreground">{product.weight}</strong></p>
              )}

              <div className="flex items-baseline gap-3 mb-1">
                <p className="text-3xl font-semibold text-foreground">{formatPrice(product.price)}</p>
                {product.badgeKey === "Voordeel" && (
                  <p className="text-base text-muted-foreground line-through">{formatPrice(product.price * 1.2)}</p>
                )}
              </div>
              <p className="text-xs text-muted-foreground mb-6">
                {t("product.priceInfo", { threshold: formatAmount(freeShippingThreshold) })}
              </p>

              {/* Subscription inline upsell */}
              <Link
                to="/abonnementen"
                className="flex items-center justify-between gap-3 px-5 py-4 mb-6 border-2 border-primary/20 rounded-2xl hover:border-primary hover:bg-primary/5 transition-colors group"
              >
                <div>
                  <p className="text-sm font-semibold text-foreground">{t("product.subscribeTitle")}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{t("product.subscribeSub")}</p>
                </div>
                <span className="text-xs font-bold text-primary tracking-widest uppercase shrink-0 group-hover:translate-x-1 transition-transform">−15% →</span>
              </Link>

              {/* Staffelkorting - meer stuks, lagere stuksprijs */}
              <fieldset className="mb-5">
                <legend className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
                  {t("product.bundleTitle")}
                </legend>
                <div className="space-y-2.5">
                  {BUNDLE_TIERS.map((b, i) => {
                    const unit = Math.round(product.price * (1 - b.discount) * 100) / 100;
                    const total = Math.round(unit * b.qty * 100) / 100;
                    const saving = Math.round((product.price * b.qty - total) * 100) / 100;
                    const selected = i === tierIdx;
                    const isPopular = "popular" in b && b.popular === true;
                    return (
                      <label
                        key={b.qty}
                        className={`relative flex items-center gap-3 px-4 py-3.5 rounded-2xl border-2 cursor-pointer transition-colors ${
                          selected ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
                        }`}
                      >
                        <input
                          type="radio"
                          name="bundle"
                          checked={selected}
                          onChange={() => setTierIdx(i)}
                          className="sr-only"
                        />
                        <span
                          aria-hidden="true"
                          className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors ${
                            selected ? "border-primary" : "border-border"
                          }`}
                        >
                          {selected && <span className="w-2.5 h-2.5 rounded-full bg-primary" />}
                        </span>

                        <span className="flex-1 min-w-0">
                          <span className="block text-sm font-semibold text-foreground">
                            {t(`product.bundleQty${b.qty}`)}
                          </span>
                          <span className="block text-xs text-muted-foreground mt-0.5">
                            {b.discount > 0
                              ? t("product.bundlePerUnit", { price: formatPrice(unit) })
                              : t(`product.bundleQty${b.qty}Sub`)}
                          </span>
                        </span>

                        <span className="text-right shrink-0">
                          <span className="block text-sm font-bold text-foreground">{formatPrice(total)}</span>
                          {saving > 0 && (
                            <span className="block text-[11px] font-semibold text-primary mt-0.5">
                              {t("product.bundleSave", { amount: formatPrice(saving) })}
                            </span>
                          )}
                        </span>

                        {isPopular && (
                          <span className="absolute -top-2.5 right-4 px-2.5 py-0.5 bg-accent text-accent-foreground text-[9px] font-bold tracking-widest uppercase rounded-full">
                            {t("product.bundleMostChosen")}
                          </span>
                        )}
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              <div className="flex items-center gap-3 mb-4">
                <button
                  onClick={addBundle}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 h-14 bg-primary text-primary-foreground font-bold text-xs tracking-widest uppercase rounded-full hover:opacity-90 transition-opacity"
                >
                  <ShoppingBag className="w-4 h-4" />
                  {t("product.addToCartPrice", { price: formatPrice(bundleTotal) })}
                </button>
                <button
                  aria-label={t("product.wishlist")}
                  className="w-14 h-14 flex items-center justify-center border border-border rounded-full hover:bg-secondary transition-colors shrink-0"
                >
                  <Heart className="w-4 h-4" />
                </button>
              </div>

              {/* Verzendbelofte - feitelijke levertijd, geen kunstmatige urgentie.
                  De vlag volgt de taal, zodat een Noorse bezoeker zijn eigen land ziet. */}
              <div className="flex items-start gap-3 px-4 py-3.5 mb-6 rounded-2xl bg-secondary/60">
                <span className="text-lg leading-none mt-0.5 shrink-0" aria-hidden="true">
                  {t("product.shipCountryFlag")}
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t("product.shipCountryTitle")}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{t("product.shipPromiseText")}</p>
                </div>
              </div>

              {/* Cross-sell: één gerelateerd product, direct toe te voegen */}
              {addOn && (
                <div className="mb-6">
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2.5">
                    {t("product.addOnTitle")}
                  </p>
                  <div className="flex items-center gap-3 px-3 py-3 rounded-2xl border border-border">
                    <Link to={`/product/${addOn.slug}`} className="shrink-0">
                      <img
                        src={addOn.images[0]}
                        alt={addOn.name}
                        loading="lazy"
                        className="w-14 h-14 rounded-xl object-contain bg-secondary p-1"
                      />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link to={`/product/${addOn.slug}`} className="block text-sm font-semibold text-foreground truncate hover:underline">
                        {addOn.name}
                      </Link>
                      <p className="text-sm font-bold text-primary mt-0.5">{formatPrice(addOn.price)}</p>
                    </div>
                    <button
                      onClick={() => addItem(addOn, 1)}
                      className="shrink-0 px-4 h-10 rounded-full bg-foreground text-background text-[11px] font-bold tracking-widest uppercase hover:opacity-90 transition-opacity"
                    >
                      + {t("product.addOnAdd")}
                    </button>
                  </div>
                </div>
              )}

              {/* Money-back callout */}
              <div className="relative bg-primary/5 border border-primary/15 rounded-2xl px-5 py-4 mb-6 text-center">
                <Heart className="w-5 h-5 text-primary fill-primary/30 mx-auto -mt-7 mb-1 bg-background rounded-full p-0.5" />
                <p className="text-sm font-bold text-foreground">{t("product.guaranteeTitle")}</p>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  {t("product.guaranteeText")}
                </p>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-3 mb-8 text-center">
                {[
                  { icon: Truck, label: t("product.trustShipping") },
                  { icon: Leaf, label: t("product.trustOrganic") },
                  { icon: ShieldCheck, label: t("product.trustReturn") },
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
                <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2">{t("product.reviewsEyebrow")}</p>
                <h2 className="font-heading text-3xl md:text-4xl font-light">{t("product.reviewsTitle")}</h2>
              </div>
              <button
                onClick={() => setShowReviewForm(s => !s)}
                className="px-5 py-2.5 bg-primary text-primary-foreground text-xs font-bold tracking-widest uppercase rounded-full hover:opacity-90 transition-opacity"
              >
                {showReviewForm ? t("product.cancel") : t("product.writeReview")}
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
                  <p className="text-xs text-muted-foreground">{t("product.basedOn")} {allReviews.length} {allReviews.length === 1 ? t("product.reviewSingular") : t("product.reviewPlural")}</p>
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
                  placeholder={t("product.yourName")}
                  className="px-4 py-3 rounded-full border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                <div className="flex items-center gap-2 px-4 py-3 rounded-full border border-border bg-background">
                  <span className="text-xs text-muted-foreground">{t("product.rating")}:</span>
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
                  placeholder={t("product.experience")}
                  rows={4}
                  className="md:col-span-2 px-4 py-3 rounded-2xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                />
                <button
                  type="submit"
                  className="md:col-span-2 px-6 py-3 bg-primary text-primary-foreground text-xs font-bold tracking-widest uppercase rounded-full hover:opacity-90 transition-opacity"
                >
                  {t("product.submitReview")}
                </button>
              </motion.form>
            )}

            {allReviews.length === 0 ? (
              <p className="text-muted-foreground text-sm">{t("product.noReviews")}</p>
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
                        <ShieldCheck className="w-3 h-3" /> {t("product.verified")}
                      </span>
                    </div>
                    <p className="text-sm text-foreground/85 leading-relaxed mb-4">"{tReview(review.text)}"</p>
                    <p className="text-xs font-semibold">- {review.name}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{new Date(review.date).toLocaleDateString(i18n.language || "nl-NL")}</p>
                  </div>
                ))}
              </div>
            )}
          </section>

          {related.length > 0 && (
            <section className="mt-20">
              <h2 className="font-heading text-2xl md:text-3xl font-light mb-8">{t("product.pairsWith")}</h2>
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
            <p className="text-sm font-bold text-primary">{formatPrice(bundleTotal)}</p>
          </div>
          <button
            onClick={addBundle}
            className="shrink-0 inline-flex items-center justify-center gap-1.5 px-5 h-11 bg-primary text-primary-foreground font-bold text-[11px] tracking-widest uppercase rounded-full"
          >
            <ShoppingBag className="w-4 h-4" /> {t("product.addShort")}
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
