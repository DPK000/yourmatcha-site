import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

const CartDrawer = () => {
  const { t, i18n } = useTranslation();
  const formatPrice = (price: number) =>
    new Intl.NumberFormat(i18n.language || "nl-NL", { style: "currency", currency: "EUR" }).format(price);
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, subtotal, totalItems } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/30 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-background shadow-elevated flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-primary" />
                <h2 className="font-heading text-xl font-semibold">{t("cart.title")} ({totalItems})</h2>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-1 text-muted-foreground hover:text-foreground transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag className="w-12 h-12 text-muted-foreground/40 mb-4" />
                  <p className="text-muted-foreground">{t("cart.empty")}</p>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="mt-4 text-sm text-primary hover:underline"
                  >
                    {t("cart.continueShopping")}
                  </button>
                </div>
              ) : (
                <ul className="space-y-6">
                  {items.map(item => (
                    <li key={item.product.id} className="flex gap-4">
                      <div className="w-20 h-20 bg-secondary rounded flex-shrink-0 flex items-center justify-center">
                        <img src={item.product.images[0]} alt={item.product.name} className="w-12 h-12 object-contain opacity-50" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium truncate">{item.product.name}</h3>
                        <p className="text-sm text-muted-foreground mt-0.5">{formatPrice(item.product.price)}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="w-7 h-7 rounded border border-border flex items-center justify-center hover:bg-secondary transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="w-7 h-7 rounded border border-border flex items-center justify-center hover:bg-secondary transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-col items-end justify-between">
                        <button onClick={() => removeItem(item.product.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                          <X className="w-4 h-4" />
                        </button>
                        <span className="text-sm font-semibold">{formatPrice(item.product.price * item.quantity)}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-border p-6 space-y-4">
                <div className="flex justify-between text-base">
                  <span className="text-muted-foreground">{t("cart.subtotal")}</span>
                  <span className="font-semibold">{formatPrice(subtotal)}</span>
                </div>
                <p className="text-xs text-muted-foreground">{t("cart.shippingNote")}</p>
                <Link
                  to="/winkelwagen"
                  onClick={() => setIsOpen(false)}
                  className="block w-full py-3 px-6 bg-primary text-primary-foreground text-center font-bold text-xs tracking-widest rounded-full hover:opacity-90 transition-opacity uppercase"
                >
                  Bekijk winkelwagen
                </Link>
                <Link
                  to="/checkout"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center text-sm text-primary font-semibold hover:underline"
                >
                  Direct afrekenen →
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
