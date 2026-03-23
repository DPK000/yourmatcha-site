import { useState, useMemo } from "react";
import { products, categories } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { useSearchParams } from "react-router-dom";

type SortOption = "newest" | "price-asc" | "price-desc" | "bestseller";

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "bestseller", label: "Bestsellers" },
  { value: "newest", label: "Nieuwste" },
  { value: "price-asc", label: "Prijs: laag → hoog" },
  { value: "price-desc", label: "Prijs: hoog → laag" },
];

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category") || "all";
  const [category, setCategory] = useState(categoryParam);
  const [sort, setSort] = useState<SortOption>("bestseller");

  const filtered = useMemo(() => {
    let result = category === "all" ? [...products] : products.filter(p => p.category === category);
    switch (sort) {
      case "price-asc": result.sort((a, b) => a.price - b.price); break;
      case "price-desc": result.sort((a, b) => b.price - a.price); break;
      case "bestseller": result.sort((a, b) => (b.bestseller ? 1 : 0) - (a.bestseller ? 1 : 0)); break;
      default: break;
    }
    return result;
  }, [category, sort]);

  const handleCategory = (val: string) => {
    setCategory(val);
    if (val === "all") {
      setSearchParams({});
    } else {
      setSearchParams({ category: val });
    }
  };

  return (
    <div className="py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <h1 className="font-heading text-4xl md:text-5xl font-semibold">Shop</h1>
          <p className="text-muted-foreground mt-2">Ontdek onze complete collectie premium matcha en accessoires</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-8 border-b border-border">
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat.value}
                onClick={() => handleCategory(cat.value)}
                className={`px-4 py-2 text-xs font-medium tracking-wide uppercase rounded transition-colors ${
                  category === cat.value
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-primary/10"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
          <select
            value={sort}
            onChange={e => setSort(e.target.value as SortOption)}
            className="px-3 py-2 text-sm border border-border rounded bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
          >
            {sortOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-20">Geen producten gevonden in deze categorie.</p>
        )}
      </div>
    </div>
  );
};

export default Shop;
