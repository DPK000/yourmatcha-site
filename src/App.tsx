import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence } from "framer-motion";
import { CartProvider } from "@/context/CartContext";
import { CurrencyProvider } from "@/context/CurrencyContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import PageTransition from "@/components/PageTransition";
import { resolveProductPath } from "@/data/products";
import { LANGS, ROUTES, DEFAULT_LANG, localizedPath, matchDutchPath, langFromPath, type RouteKey } from "@/i18n/routes";
import { getCurrentLang } from "@/i18n";
import ScrollToTop from "@/components/ScrollToTop";
import { useGAPageView } from "@/hooks/useGAPageView";
import { useMetaPixelPageView } from "@/hooks/useMetaPixel";
import NewsletterPopup from "@/components/NewsletterPopup";
// Homepage blijft eager: dat is de LCP-kritieke route
import Homepage from "@/pages/Homepage";

// Alle overige routes lazy - houdt de main bundle klein
const Shop = lazy(() => import("@/pages/Shop"));
const ProductDetail = lazy(() => import("@/pages/ProductDetail"));
const About = lazy(() => import("@/pages/About"));
const Blog = lazy(() => import("@/pages/Blog"));
const BlogPost = lazy(() => import("@/pages/BlogPost"));
const Subscriptions = lazy(() => import("@/pages/Subscriptions"));
const Checkout = lazy(() => import("@/pages/Checkout"));
const ThankYou = lazy(() => import("@/pages/ThankYou"));
const Cart = lazy(() => import("@/pages/Cart"));
const Contact = lazy(() => import("@/pages/Contact"));
const FAQ = lazy(() => import("@/pages/FAQ"));
const Shipping = lazy(() => import("@/pages/Shipping"));
const Privacy = lazy(() => import("@/pages/Privacy"));
const Terms = lazy(() => import("@/pages/Terms"));
const Recipes = lazy(() => import("@/pages/Recipes"));
const RecipeDetail = lazy(() => import("@/pages/RecipeDetail"));
const Sustainability = lazy(() => import("@/pages/Sustainability"));
const Origin = lazy(() => import("@/pages/Origin"));
const BundleBuilder = lazy(() => import("@/pages/BundleBuilder"));
const Knowledge = lazy(() => import("@/pages/Knowledge"));
const KnowledgeArticle = lazy(() => import("@/pages/KnowledgeArticle"));
const Compare = lazy(() => import("@/pages/Compare"));
const LandingPage = lazy(() => import("@/pages/LandingPage"));
const Glossary = lazy(() => import("@/pages/Glossary"));
const NotFound = lazy(() => import("@/pages/NotFound"));

// BUQE Commerce admin - volledig lazy zodat bezoekers dit nooit downloaden
const AdminLayout = lazy(() => import("@/pages/admin/AdminLayout"));
const AdminLogin = lazy(() => import("@/pages/admin/AdminLogin"));
const AdminDashboard = lazy(() => import("@/pages/admin/AdminDashboard"));
const AdminOrders = lazy(() => import("@/pages/admin/AdminOrders"));
const AdminOrderDetail = lazy(() => import("@/pages/admin/AdminOrderDetail"));
const AdminProducts = lazy(() => import("@/pages/admin/AdminProducts"));
const AdminDiscountCodes = lazy(() => import("@/pages/admin/AdminDiscountCodes"));
const AdminNewsletter = lazy(() => import("@/pages/admin/AdminNewsletter"));
const AdminEmailLog = lazy(() => import("@/pages/admin/AdminEmailLog"));
const AdminPartners = lazy(() => import("@/pages/admin/AdminPartners"));
const AdminB2B = lazy(() => import("@/pages/admin/AdminB2B"));
const AdminPixels = lazy(() => import("@/pages/admin/AdminPixels"));


/** Pagina's zonder URL-parameter. */
const PAGE_ROUTES: { key: RouteKey; element: JSX.Element }[] = [
  { key: "shop", element: <Shop /> },
  { key: "bundle", element: <BundleBuilder /> },
  { key: "compare", element: <Compare /> },
  { key: "cart", element: <Cart /> },
  { key: "about", element: <About /> },
  { key: "origin", element: <Origin /> },
  { key: "knowledge", element: <Knowledge /> },
  { key: "blog", element: <Blog /> },
  { key: "subscriptions", element: <Subscriptions /> },
  { key: "checkout", element: <Checkout /> },
  { key: "checkoutSuccess", element: <ThankYou /> },
  { key: "thankYou", element: <ThankYou /> },
  { key: "contact", element: <Contact /> },
  { key: "faq", element: <FAQ /> },
  { key: "shipping", element: <Shipping /> },
  { key: "privacy", element: <Privacy /> },
  { key: "terms", element: <Terms /> },
  { key: "recipes", element: <Recipes /> },
  { key: "sustainability", element: <Sustainability /> },
  { key: "glossary", element: <Glossary /> },
];

/** Pagina's met een `:slug` erachter. */
const DETAIL_PAGE_ROUTES: { key: RouteKey; element: JSX.Element }[] = [
  { key: "product", element: <ProductDetail /> },
  { key: "knowledgeArticle", element: <KnowledgeArticle /> },
  { key: "blogPost", element: <BlogPost /> },
  { key: "recipeDetail", element: <RecipeDetail /> },
];

/** Landingspagina's: eigen URL per taal, dezelfde inhoud via de NL-slug. */
const LANDING_ROUTES: { key: RouteKey; slug: string }[] = [
  { key: "landingPowder", slug: "matcha-poeder" },
  { key: "landingAccessories", slug: "matcha-accessoires" },
  { key: "landingKits", slug: "matcha-kits" },
  { key: "landingTea", slug: "japanse-thee" },
  { key: "landingGifts", slug: "cadeau-gids" },
  { key: "landingBeginners", slug: "matcha-voor-beginners" },
  { key: "landingAthletes", slug: "matcha-voor-sporters" },
  { key: "landingLowCaffeine", slug: "cafeinearme-thee" },
  { key: "landingCoffeeSwap", slug: "matcha-als-koffievervanger" },
];

/**
 * Vangt elke URL zonder taalprefix op. Oude links als /shop of /over-ons
 * blijven zo werken: ze landen op dezelfde pagina in de voorkeurstaal van de
 * bezoeker, met een permanente vervanging in de history.
 */
const LangRedirect = () => {
  const { pathname, search, hash } = useLocation();
  const lang = getCurrentLang() ?? DEFAULT_LANG;
  const match = matchDutchPath(pathname);
  const target = match
    ? localizedPath(match.key, lang, match.slug)
    : localizedPath("home", lang);
  return <Navigate to={target + search + hash} replace />;
};

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();
  useGAPageView();
  useMetaPixelPageView();

  // Gearchiveerde of onbekende productslugs omleiden vóórdat er iets mount,
  // zodat de paginaovergang niet halverwege onderbroken wordt.
  const productRedirect = resolveProductPath(location.pathname);
  if (productRedirect) return <Navigate to={productRedirect} replace />;

  return (
    <>
    <ScrollToTop />
    <AnimatePresence mode="wait">
      <Suspense fallback={null} key={location.pathname}>
      <Routes location={location}>
        {LANGS.map(lang => (
          <Route key={lang} path={`/${lang}`}>
            <Route index element={<PageTransition><Homepage /></PageTransition>} />
            {PAGE_ROUTES.map(({ key, element }) => (
              <Route key={key} path={ROUTES[key][lang]} element={<PageTransition>{element}</PageTransition>} />
            ))}
            {DETAIL_PAGE_ROUTES.map(({ key, element }) => (
              <Route key={key} path={`${ROUTES[key][lang]}/:slug`} element={<PageTransition>{element}</PageTransition>} />
            ))}
            {LANDING_ROUTES.map(({ key, slug }) => (
              <Route
                key={key}
                path={ROUTES[key][lang]}
                element={<PageTransition><LandingPage slug={slug} /></PageTransition>}
              />
            ))}
            <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
          </Route>
        ))}
        {/* Zonder taalprefix: stuur door naar de juiste taalversie van dezelfde pagina. */}
        <Route path="*" element={<LangRedirect />} />
      </Routes>
      </Suspense>
    </AnimatePresence>
    </>
  );
};

const PublicShell = () => (
  <div className="flex flex-col min-h-screen">
    <Header />
    <CartDrawer />
    {/* <NewsletterPopup /> */}
    <main className="flex-1">
      <AnimatedRoutes />
    </main>
    <Footer />
  </div>
);

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Sonner />
        <BrowserRouter>
          <CurrencyProvider>
          <CartProvider>
            <Routes>
              {/* BUQE Commerce Admin - geen header/footer */}
              <Route path="/admin/login" element={<Suspense fallback={null}><AdminLogin /></Suspense>} />
              <Route path="/admin" element={<Suspense fallback={null}><AdminLayout /></Suspense>}>
                <Route index element={<AdminDashboard />} />
                <Route path="orders" element={<AdminOrders />} />
                <Route path="orders/:id" element={<AdminOrderDetail />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="discounts" element={<AdminDiscountCodes />} />
                <Route path="newsletter" element={<AdminNewsletter />} />
                <Route path="email-log" element={<AdminEmailLog />} />
                <Route path="partners" element={<AdminPartners />} />
                <Route path="b2b" element={<AdminB2B />} />
                <Route path="pixels" element={<AdminPixels />} />
              </Route>

              {/* Publieke site - met header/footer */}
              <Route path="/*" element={<PublicShell />} />
            </Routes>
          </CartProvider>
          </CurrencyProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
