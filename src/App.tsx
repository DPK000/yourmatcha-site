import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
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
import ScrollToTop from "@/components/ScrollToTop";
import { useGAPageView } from "@/hooks/useGAPageView";
import NewsletterPopup from "@/components/NewsletterPopup";
// Homepage blijft eager: dat is de LCP-kritieke route
import Homepage from "@/pages/Homepage";

// Alle overige routes lazy — houdt de main bundle klein
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

// BUQE Commerce admin — volledig lazy zodat bezoekers dit nooit downloaden
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

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();
  useGAPageView();
  return (
    <>
    <ScrollToTop />
    <AnimatePresence mode="wait">
      <Suspense fallback={null} key={location.pathname}>
      <Routes location={location}>
        <Route path="/" element={<PageTransition><Homepage /></PageTransition>} />
        <Route path="/shop" element={<PageTransition><Shop /></PageTransition>} />
        <Route path="/product/:slug" element={<PageTransition><ProductDetail /></PageTransition>} />
        <Route path="/bundel" element={<PageTransition><BundleBuilder /></PageTransition>} />
        <Route path="/matcha-vergelijken" element={<PageTransition><Compare /></PageTransition>} />
        <Route path="/winkelwagen" element={<PageTransition><Cart /></PageTransition>} />
        <Route path="/over-ons" element={<PageTransition><About /></PageTransition>} />
        <Route path="/herkomst" element={<PageTransition><Origin /></PageTransition>} />
        <Route path="/kennis" element={<PageTransition><Knowledge /></PageTransition>} />
        <Route path="/kennis/:slug" element={<PageTransition><KnowledgeArticle /></PageTransition>} />
        <Route path="/blog" element={<PageTransition><Blog /></PageTransition>} />
        <Route path="/blog/:slug" element={<PageTransition><BlogPost /></PageTransition>} />
        <Route path="/abonnementen" element={<PageTransition><Subscriptions /></PageTransition>} />
        <Route path="/checkout" element={<PageTransition><Checkout /></PageTransition>} />
        <Route path="/checkout/success" element={<PageTransition><ThankYou /></PageTransition>} />
        <Route path="/bedankt" element={<PageTransition><ThankYou /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        <Route path="/faq" element={<PageTransition><FAQ /></PageTransition>} />
        <Route path="/verzending" element={<PageTransition><Shipping /></PageTransition>} />
        <Route path="/privacy" element={<PageTransition><Privacy /></PageTransition>} />
        <Route path="/voorwaarden" element={<PageTransition><Terms /></PageTransition>} />
        <Route path="/recepten" element={<PageTransition><Recipes /></PageTransition>} />
        <Route path="/recepten/:slug" element={<PageTransition><RecipeDetail /></PageTransition>} />
        <Route path="/duurzaamheid" element={<PageTransition><Sustainability /></PageTransition>} />
        {/* NL landing pages */}
        <Route path="/matcha-poeder" element={<PageTransition><LandingPage slug="matcha-poeder" /></PageTransition>} />
        <Route path="/matcha-accessoires" element={<PageTransition><LandingPage slug="matcha-accessoires" /></PageTransition>} />
        <Route path="/matcha-kits" element={<PageTransition><LandingPage slug="matcha-kits" /></PageTransition>} />
        <Route path="/japanse-thee" element={<PageTransition><LandingPage slug="japanse-thee" /></PageTransition>} />
        <Route path="/cadeau-gids" element={<PageTransition><LandingPage slug="cadeau-gids" /></PageTransition>} />
        <Route path="/matcha-voor-beginners" element={<PageTransition><LandingPage slug="matcha-voor-beginners" /></PageTransition>} />
        <Route path="/matcha-voor-sporters" element={<PageTransition><LandingPage slug="matcha-voor-sporters" /></PageTransition>} />
        <Route path="/cafeinearme-thee" element={<PageTransition><LandingPage slug="cafeinearme-thee" /></PageTransition>} />
        <Route path="/matcha-als-koffievervanger" element={<PageTransition><LandingPage slug="matcha-als-koffievervanger" /></PageTransition>} />
        {/* NO landing pages — Norwegian keyword URLs */}
        <Route path="/matcha-pulver" element={<PageTransition><LandingPage slug="matcha-poeder" /></PageTransition>} />
        <Route path="/matcha-tilbehor" element={<PageTransition><LandingPage slug="matcha-accessoires" /></PageTransition>} />
        <Route path="/matcha-sett" element={<PageTransition><LandingPage slug="matcha-kits" /></PageTransition>} />
        <Route path="/japansk-te" element={<PageTransition><LandingPage slug="japanse-thee" /></PageTransition>} />
        <Route path="/gave-guide" element={<PageTransition><LandingPage slug="cadeau-gids" /></PageTransition>} />
        <Route path="/matcha-for-nybegynnere" element={<PageTransition><LandingPage slug="matcha-voor-beginners" /></PageTransition>} />
        <Route path="/matcha-for-utovere" element={<PageTransition><LandingPage slug="matcha-voor-sporters" /></PageTransition>} />
        <Route path="/koffeinfri-te" element={<PageTransition><LandingPage slug="cafeinearme-thee" /></PageTransition>} />
        <Route path="/matcha-istedenfor-kaffe" element={<PageTransition><LandingPage slug="matcha-als-koffievervanger" /></PageTransition>} />
        <Route path="/matcha-woordenboek" element={<PageTransition><Glossary /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
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
              {/* BUQE Commerce Admin — geen header/footer */}
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

              {/* Publieke site — met header/footer */}
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
