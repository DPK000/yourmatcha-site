import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, Menu, X, Search, ChevronRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "@/components/Logo";
import { useTranslation } from "react-i18next";
import AnnouncementBar from "./AnnouncementBar";
import LanguageSwitcher from "./LanguageSwitcher";
import { products, getFeaturedProducts } from "@/data/products";

const Header = () => {
  const { t, i18n } = useTranslation();
  const { totalItems, setIsOpen } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => { setMobileOpen(false); setMegaOpen(null); }, [location.pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const formatPrice = (n: number) =>
    new Intl.NumberFormat(i18n.language || "nl-NL", { style: "currency", currency: "EUR" }).format(n);

  const featured = getFeaturedProducts().slice(0, 3);

  const shopCategories = [
    { value: "matcha-powder", to: "/matcha-poeder", count: products.filter(p => p.category === "matcha-powder").length },
    { value: "kits-sets", to: "/matcha-kits", count: products.filter(p => p.category === "kits-sets").length },
    { value: "accessories", to: "/matcha-accessoires", count: products.filter(p => p.category === "accessories").length },
    { value: "teas-drinks", to: "/japanse-thee", count: products.filter(p => p.category === "teas-drinks").length },
  ];

  const navItems = [
    { key: "shop", to: "/shop", label: "Matcha", hasMega: true },
    { key: "bundles", to: "/bundel", label: "Bundels & Deals" },
    { key: "accessories", to: "/shop?category=accessories", label: "Accessoires" },
    { key: "compare", to: "/matcha-vergelijken", label: "Vergelijk" },
    { key: "subscriptions", to: "/abonnementen", label: t("nav.subscriptions") },
    { key: "about", to: "/over-ons", label: t("nav.about") },
  ];

  return (
    <>
      <AnnouncementBar />
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/95 backdrop-blur-md border-b border-border/60 shadow-soft"
            : "bg-background/80 backdrop-blur-sm border-b border-transparent"
        }`}
        onMouseLeave={() => setMegaOpen(null)}
      >
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 md:h-20 gap-4">
            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-foreground/70 hover:text-foreground transition-colors"
              aria-label={t("nav.menu")}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Left: Brand Logo */}
            <div className="mr-2 md:mr-10" onMouseEnter={() => setMegaOpen(null)}>
              <Logo />
            </div>

            {/* Center-left: Nav */}
            <nav className="hidden md:flex items-center gap-8 flex-1">
              {navItems.map(link => (
                <div
                  key={link.key}
                  onMouseEnter={() => link.hasMega ? setMegaOpen(link.key) : setMegaOpen(null)}
                  className="relative group py-2"
                >
                  <Link
                    to={link.to}
                    className="text-[13px] font-medium text-foreground/80 hover:text-primary transition-colors duration-200 tracking-[0.08em] uppercase"
                  >
                    {link.label}
                  </Link>
                  <span className="absolute left-0 right-0 -bottom-0.5 h-px bg-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                </div>
              ))}
            </nav>

            {/* Right: Utility */}
            <div className="flex items-center justify-end gap-2 md:gap-3 ml-auto" onMouseEnter={() => setMegaOpen(null)}>
              <button
                className="hidden sm:inline-flex p-2 text-foreground/70 hover:text-primary transition-colors"
                aria-label={t("nav.search")}
              >
                <Search className="w-[18px] h-[18px]" />
              </button>
              <LanguageSwitcher />
              <button
                onClick={() => setIsOpen(true)}
                className="relative p-2 text-foreground/70 hover:text-primary transition-colors"
                aria-label={t("nav.cart")}
              >
                <ShoppingBag className="w-[18px] h-[18px]" />
                {totalItems > 0 && (
                  <motion.span
                    key={totalItems}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-0 right-0 w-[18px] h-[18px] rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center font-bold"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mega Menu */}
        <AnimatePresence>
          {megaOpen === "shop" && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="hidden md:block absolute left-0 right-0 top-full bg-background border-t border-border/60 shadow-elevated"
              onMouseEnter={() => setMegaOpen("shop")}
            >
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="grid grid-cols-12 gap-10">
                  {/* Categories */}
                  <div className="col-span-3">
                    <p className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-5">
                      {t("nav.categories")}
                    </p>
                    <ul className="space-y-3.5">
                      <li>
                        <Link to="/shop" className="group flex items-center justify-between text-sm font-medium hover:text-primary transition-colors">
                          <span>{t("categories.all")}</span>
                          <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
                        </Link>
                      </li>
                      {shopCategories.map(c => (
                        <li key={c.value}>
                          <Link
                            to={c.to}
                            className="group flex items-center justify-between text-sm font-medium hover:text-primary transition-colors"
                          >
                            <span>{t(`categories.${c.value}`)}</span>
                            <span className="text-xs text-muted-foreground group-hover:text-primary">{c.count}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Featured products */}
                  <div className="col-span-9">
                    <div className="flex items-end justify-between mb-5">
                      <p className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
                        {t("nav.featured")}
                      </p>
                      <Link to="/shop" className="text-xs font-medium text-primary hover:underline">
                        {t("nav.shopAll")} →
                      </Link>
                    </div>
                    <div className="grid grid-cols-3 gap-5">
                      {featured.map(p => (
                        <Link
                          key={p.id}
                          to={`/product/${p.slug}`}
                          className="group block"
                        >
                          <div className="aspect-[4/3] rounded-xl overflow-hidden bg-secondary mb-3">
                            <img
                              src={p.images[0]}
                              alt={p.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                          <p className="text-[10px] tracking-wide uppercase text-muted-foreground">{p.categoryLabel}</p>
                          <h4 className="font-heading text-base font-semibold leading-tight group-hover:text-primary transition-colors">
                            {p.name}
                          </h4>
                          <p className="text-sm font-medium mt-0.5">{formatPrice(p.price)}</p>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Nav */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden border-t border-border bg-background"
            >
              <nav className="flex flex-col py-6 px-6 gap-1">
                {navItems.map(link => (
                  <Link
                    key={link.key}
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className="py-3 text-base font-medium text-foreground/85 hover:text-primary transition-colors border-b border-border/50"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-4 flex items-center justify-between">
                  <span className="text-xs tracking-widest uppercase text-muted-foreground">Language</span>
                  <LanguageSwitcher />
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Header;
