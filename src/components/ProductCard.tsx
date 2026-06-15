import { Link } from "react-router-dom";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/context/CurrencyContext";
import { Plus, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import QuickViewModal from "./QuickViewModal";
import { toast } from "sonner";

const ProductCard = ({ product }: { product: Product }) => {
  const { t } = useTranslation();
  const { addItem } = useCart();
  const { format: formatPrice } = useCurrency();
  const [quickView, setQuickView] = useState<Product | null>(null);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    toast.success(t("product.addedToast"));
  };

  const openQuick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickView(product);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="group"
      >
        <Link to={`/product/${product.slug}`} className="block">
          <div className="relative aspect-square bg-secondary rounded-2xl overflow-hidden mb-4">
            <img
              src={product.images[0]}
              alt={product.name}
              loading="lazy"
              width={800}
              height={800}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            />
            {product.badge && (
              <span className="absolute top-3 left-3 px-3 py-1.5 bg-accent text-accent-foreground text-[10px] font-bold rounded-full tracking-widest uppercase">
                {product.badge}
              </span>
            )}

            {/* Quick view overlay */}
            <div className="absolute inset-x-3 bottom-3 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
              <button
                onClick={openQuick}
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-background/95 backdrop-blur text-foreground text-[11px] font-semibold tracking-wide uppercase hover:bg-background shadow-soft"
                aria-label={t("product.quickView")}
              >
                <Eye className="w-3.5 h-3.5" /> {t("product.quickView")}
              </button>
              <button
                onClick={handleAdd}
                className="w-11 h-11 shrink-0 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-soft hover:scale-105 transition-transform"
                aria-label={t("product.quickAdd")}
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="px-1">
            <p className="text-[10px] text-muted-foreground tracking-[0.2em] uppercase mb-1">{product.categoryLabel}</p>
            <h3 className="font-heading text-lg font-semibold leading-tight group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            <div className="flex items-center justify-between mt-2">
              <span className="font-bold text-foreground text-lg">{formatPrice(product.price)}</span>
            </div>
          </div>
        </Link>
      </motion.div>
      <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />
    </>
  );
};

export default ProductCard;
