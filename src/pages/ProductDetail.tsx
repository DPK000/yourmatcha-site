import { useParams, Link } from "react-router-dom";
import { getProductBySlug, getRelatedProducts } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { Minus, Plus, ShoppingBag, ChevronLeft, Star } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { motion } from "framer-motion";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" }).format(price);

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = getProductBySlug(slug || "");
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  if (!product) {
    return (
      <div className="py-20 text-center">
        <p className="text-muted-foreground">Product niet gevonden.</p>
        <Link to="/shop" className="text-primary hover:underline mt-4 inline-block">Terug naar shop</Link>
      </div>
    );
  }

  const related = getRelatedProducts(product);
  const accordionItems = [
    product.ingredients && { id: "ingredients", title: "Ingrediënten", content: product.ingredients },
    product.origin && { id: "origin", title: "Herkomst", content: product.origin },
    product.preparation && { id: "preparation", title: "Bereiding", content: product.preparation },
  ].filter(Boolean) as { id: string; title: string; content: string }[];

  const avgRating = product.reviews.length
    ? (product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length).toFixed(1)
    : null;

  return (
    <div className="py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <Link to="/shop" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ChevronLeft className="w-4 h-4" /> Terug naar shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Image */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="aspect-square bg-secondary rounded overflow-hidden flex items-center justify-center">
            <img src={product.images[0]} alt={product.name} className="w-2/3 h-2/3 object-contain opacity-40" />
          </motion.div>

          {/* Info */}
          <div>
            <p className="text-xs text-muted-foreground tracking-widest uppercase mb-2">{product.categoryLabel}</p>
            <h1 className="font-heading text-3xl md:text-4xl font-semibold mb-2">{product.name}</h1>
            {avgRating && (
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map(s => (
                    <Star key={s} className={`w-4 h-4 ${s <= Math.round(Number(avgRating)) ? "text-accent fill-accent" : "text-border"}`} />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">({product.reviews.length} reviews)</span>
              </div>
            )}
            <p className="text-2xl font-semibold text-foreground mb-6">{formatPrice(product.price)}</p>
            <p className="text-muted-foreground leading-relaxed mb-8">{product.description}</p>

            {/* Quantity + Add to cart */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center border border-border rounded">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-3 py-3 hover:bg-secondary transition-colors">
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 py-3 text-sm font-medium min-w-[3rem] text-center">{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)} className="px-3 py-3 hover:bg-secondary transition-colors">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={() => { addItem(product, quantity); setQuantity(1); }}
                className="flex-1 flex items-center justify-center gap-2 px-8 py-3 bg-primary text-primary-foreground font-medium text-sm tracking-wide uppercase rounded hover:opacity-90 transition-opacity"
              >
                <ShoppingBag className="w-4 h-4" /> In Winkelwagen
              </button>
            </div>

            {product.weight && (
              <p className="text-sm text-muted-foreground mb-6">Inhoud: {product.weight}</p>
            )}

            {/* Accordion */}
            {accordionItems.length > 0 && (
              <div className="border-t border-border">
                {accordionItems.map(item => (
                  <div key={item.id} className="border-b border-border">
                    <button
                      onClick={() => setOpenAccordion(openAccordion === item.id ? null : item.id)}
                      className="w-full flex items-center justify-between py-4 text-sm font-medium hover:text-primary transition-colors"
                    >
                      {item.title}
                      <span className="text-muted-foreground">{openAccordion === item.id ? "−" : "+"}</span>
                    </button>
                    {openAccordion === item.id && (
                      <p className="pb-4 text-sm text-muted-foreground leading-relaxed">{item.content}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Reviews */}
        {product.reviews.length > 0 && (
          <section className="mt-20">
            <h2 className="font-heading text-2xl font-semibold mb-8">Klantreviews</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {product.reviews.map((review, i) => (
                <div key={i} className="p-6 bg-secondary rounded">
                  <div className="flex items-center gap-0.5 mb-3">
                    {[1, 2, 3, 4, 5].map(s => (
                      <Star key={s} className={`w-4 h-4 ${s <= review.rating ? "text-accent fill-accent" : "text-border"}`} />
                    ))}
                  </div>
                  <p className="text-sm text-foreground mb-3">"{review.text}"</p>
                  <p className="text-xs text-muted-foreground">— {review.name}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-20">
            <h2 className="font-heading text-2xl font-semibold mb-8">Past Goed Bij</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {related.slice(0, 4).map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
