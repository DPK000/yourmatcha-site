import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { Product } from "@/data/products";
import { toast } from "sonner";
import { trackAddToCart } from "@/hooks/useMetaPixel";
import i18n from "@/i18n";

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface AppliedDiscount {
  code: string;
  type: "percentage" | "fixed" | "free_shipping";
  /** Percentage (bv. 10) of vast bedrag in EUR */
  value: number;
  /** Minimale orderwaarde in EUR */
  minOrder: number;
}

/** Kortingsbedrag in EUR - zelfde formule als server-side in stripe-create-payment-intent */
export function computeDiscountAmount(
  discount: AppliedDiscount | null,
  subtotal: number,
  shipping: number
): number {
  if (!discount || subtotal < discount.minOrder) return 0;
  let amount = 0;
  if (discount.type === "percentage") amount = (subtotal * discount.value) / 100;
  else if (discount.type === "fixed") amount = discount.value;
  else if (discount.type === "free_shipping") amount = shipping;
  return Math.round(Math.min(amount, subtotal + shipping) * 100) / 100;
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  discount: AppliedDiscount | null;
  applyDiscount: (discount: AppliedDiscount) => void;
  removeDiscount: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem("yourmatcha-cart");
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });
  const [isOpen, setIsOpen] = useState(false);
  const [discount, setDiscount] = useState<AppliedDiscount | null>(() => {
    try {
      const saved = localStorage.getItem("yourmatcha-cart-discount");
      return saved ? JSON.parse(saved) : null;
    } catch { return null; }
  });

  useEffect(() => {
    localStorage.setItem("yourmatcha-cart", JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    if (discount) localStorage.setItem("yourmatcha-cart-discount", JSON.stringify(discount));
    else localStorage.removeItem("yourmatcha-cart-discount");
  }, [discount]);

  const addItem = useCallback((product: Product, quantity = 1) => {
    setItems(prev => {
      const existing = prev.find(i => i.product.id === product.id);
      if (existing) {
        return prev.map(i => i.product.id === product.id ? { ...i, quantity: i.quantity + quantity } : i);
      }
      return [...prev, { product, quantity }];
    });
    setIsOpen(true);
    toast.success(`${product.name} ${i18n.t("cart.addedSuffix")}`);
    // Eén plek voor AddToCart - vangt productpagina, kaarten, quick view,
    // bundelbouwer en cross-sells zonder dat elke knop het zelf moet melden.
    trackAddToCart(
      { id: product.id, name: product.name, price: product.price, quantity },
      "EUR"
    );
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems(prev => prev.filter(i => i.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems(prev => prev.filter(i => i.product.id !== productId));
      return;
    }
    setItems(prev => prev.map(i => i.product.id === productId ? { ...i, quantity } : i));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setDiscount(null);
  }, []);

  const applyDiscount = useCallback((d: AppliedDiscount) => setDiscount(d), []);
  const removeDiscount = useCallback(() => setDiscount(null), []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, isOpen, setIsOpen, addItem, removeItem, updateQuantity, clearCart, totalItems, subtotal, discount, applyDiscount, removeDiscount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
