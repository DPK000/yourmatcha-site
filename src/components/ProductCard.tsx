import { Link } from "react-router-dom";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, Plus } from "lucide-react";
import { motion } from "framer-motion";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" }).format(price);

const ProductCard = ({ product }: { product: Product }) => {
  const { addItem } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
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
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
          />
          {product.badge && (
            <span className="absolute top-3 left-3 px-3 py-1.5 bg-accent text-accent-foreground text-xs font-bold rounded-full tracking-wide uppercase">
              {product.badge}
            </span>
          )}
          {/* Quick add button on hover */}
          <motion.button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); addItem(product); }}
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ scale: 1.05 }}
            className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-label="Toevoegen aan winkelwagen"
          >
            <Plus className="w-5 h-5" />
          </motion.button>
        </div>
        <div className="px-1">
          <p className="text-xs text-muted-foreground tracking-wide uppercase mb-1">{product.categoryLabel}</p>
          <h3 className="font-heading text-lg font-semibold leading-tight group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center justify-between mt-2">
            <span className="font-bold text-foreground text-lg">{formatPrice(product.price)}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
