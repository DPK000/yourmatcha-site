import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { X, ShoppingBag, ArrowRight, Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  product: Product | null;
  onClose: () => void;
}

const QuickViewModal = ({ product, onClose }: Props) => {
  const { t, i18n } = useTranslation();
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);

  useEffect(() => { setQty(1); }, [product?.id]);
  useEffect(() => {
    if (!product) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [product, onClose]);

  const formatPrice = (n: number) =>
    new Intl.NumberFormat(i18n.language || "nl-NL", { style: "currency", currency: "EUR" }).format(n);

  return (
    <AnimatePresence>
      {product && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-foreground/40 backdrop-blur-sm"
          />
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-auto bg-background rounded-2xl shadow-elevated max-w-4xl w-full max-h-[90vh] overflow-hidden grid grid-cols-1 md:grid-cols-2 relative"
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-background/90 backdrop-blur flex items-center justify-center hover:bg-secondary transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="aspect-square md:aspect-auto bg-secondary overflow-hidden">
                <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-8 md:p-10 overflow-y-auto flex flex-col">
                <p className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-2">{product.categoryLabel}</p>
                <h2 className="font-heading text-2xl md:text-3xl font-semibold mb-3 leading-tight">{product.name}</h2>
                <p className="text-xl font-semibold mb-5">{formatPrice(product.price)}</p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">{product.shortDescription}</p>

                <div className="flex items-center gap-3 mb-5">
                  <div className="flex items-center border border-border rounded-full">
                    <button onClick={() => setQty(q => Math.max(1, q - 1))} className="px-3 py-2 hover:text-primary transition-colors"><Minus className="w-3.5 h-3.5" /></button>
                    <span className="px-3 text-sm font-medium min-w-[2.5rem] text-center">{qty}</span>
                    <button onClick={() => setQty(q => q + 1)} className="px-3 py-2 hover:text-primary transition-colors"><Plus className="w-3.5 h-3.5" /></button>
                  </div>
                  <button
                    onClick={() => { addItem(product, qty); onClose(); }}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground text-xs font-bold tracking-widest uppercase rounded-full hover:scale-[1.02] transition-transform"
                  >
                    <ShoppingBag className="w-4 h-4" /> {t("product.addToCart")}
                  </button>
                </div>
                <Link
                  to={`/product/${product.slug}`}
                  onClick={onClose}
                  className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline mt-auto"
                >
                  {t("product.viewDetails")} <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default QuickViewModal;
