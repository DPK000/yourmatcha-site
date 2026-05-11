import { useState, useMemo, useEffect } from "react";
import { products, categories } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SEO from "@/components/SEO";

type SortOption = "newest" | "price-asc" | "price-desc" | "bestseller";

const Shop = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category") || "all";
  const [category, setCategory] = useState(categoryParam);
  const [sort, setSort] = useState<SortOption>("bestseller");

  useEffect(() => { setCategory(categoryParam); }, [categoryParam]);

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: "bestseller", label: t("shop.sort.bestseller") },
    { value: "newest", label: t("shop.sort.newest") },
    { value: "price-asc", label: t("shop.sort.priceAsc") },
    { value: "price-desc", label: t("shop.sort.priceDesc") },
  ];

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
    if (val === "all") setSearchParams({});
    else setSearchParams({ category: val });
  };

  return (
    <div className="py-12">
      <SEO
        title="Shop — Premium matcha, thee & accessoires"
        description="Shop ceremoniële Japanse matcha, latte blends, theeaccessoires en cadeausets. Single-origin uit Uji, gratis verzending in NL & BE vanaf €50."
        canonical="/shop"
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="font-heading text-4xl md:text-5xl font-semibold">{t("shop.title")} 🍵</h1>
          <p className="text-muted-foreground mt-2">{t("shop.subtitle")}</p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-8 border-b border-border">
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat.value}
                onClick={() => handleCategory(cat.value)}
                className={`px-4 py-2 text-xs font-medium tracking-wide uppercase rounded-full transition-all duration-200 ${
                  category === cat.value
                    ? "bg-primary text-primary-foreground shadow-soft"
                    : "bg-secondary text-secondary-foreground hover:bg-primary/10"
                }`}
              >
                {t(`categories.${cat.value}`)}
              </button>
            ))}
          </div>
          <select
            value={sort}
            onChange={e => setSort(e.target.value as SortOption)}
            className="px-4 py-2.5 text-sm border border-border rounded-full bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
          >
            {sortOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-20">{t("shop.empty")}</p>
        )}
      </div>
    </div>
  );
};

export default Shop;
