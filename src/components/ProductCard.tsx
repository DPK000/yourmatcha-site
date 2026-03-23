import { Link } from "react-router-dom";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { ShoppingBag } from "lucide-react";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" }).format(price);

const ProductCard = ({ product }: { product: Product }) => {
  const { addItem } = useCart();

  return (
    <div className="group">
      <Link to={`/product/${product.slug}`} className="block">
        <div className="relative aspect-square bg-secondary rounded overflow-hidden mb-4">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-contain p-8 opacity-40 group-hover:scale-105 transition-transform duration-500"
          />
          {product.badge && (
            <span className="absolute top-3 left-3 px-3 py-1 bg-accent text-accent-foreground text-xs font-medium rounded tracking-wide uppercase">
              {product.badge}
            </span>
          )}
        </div>
        <p className="text-xs text-muted-foreground tracking-wide uppercase mb-1">{product.categoryLabel}</p>
        <h3 className="font-heading text-lg font-semibold leading-tight group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{product.shortDescription}</p>
      </Link>
      <div className="flex items-center justify-between mt-3">
        <span className="font-semibold text-foreground">{formatPrice(product.price)}</span>
        <button
          onClick={(e) => { e.preventDefault(); addItem(product); }}
          className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium tracking-wide uppercase bg-primary text-primary-foreground rounded hover:opacity-90 transition-opacity"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          Toevoegen
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
