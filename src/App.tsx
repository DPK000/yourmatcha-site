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
import Homepage from "@/pages/Homepage";
import Shop from "@/pages/Shop";
import ProductDetail from "@/pages/ProductDetail";
import About from "@/pages/About";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import Subscriptions from "@/pages/Subscriptions";
import Checkout from "@/pages/Checkout";
import ThankYou from "@/pages/ThankYou";
import Cart from "@/pages/Cart";
import Contact from "@/pages/Contact";
import FAQ from "@/pages/FAQ";
import Shipping from "@/pages/Shipping";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import Recipes from "@/pages/Recipes";
import RecipeDetail from "@/pages/RecipeDetail";
import Sustainability from "@/pages/Sustainability";
import Origin from "@/pages/Origin";
import BundleBuilder from "@/pages/BundleBuilder";
import Knowledge from "@/pages/Knowledge";
import KnowledgeArticle from "@/pages/KnowledgeArticle";
import Compare from "@/pages/Compare";
import LandingPage from "@/pages/LandingPage";
import Glossary from "@/pages/Glossary";
import NotFound from "@/pages/NotFound";

// BUQE Commerce admin
import AdminLayout from "@/pages/admin/AdminLayout";
import AdminLogin from "@/pages/admin/AdminLogin";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminOrders from "@/pages/admin/AdminOrders";
import AdminOrderDetail from "@/pages/admin/AdminOrderDetail";
import AdminProducts from "@/pages/admin/AdminProducts";
import AdminDiscountCodes from "@/pages/admin/AdminDiscountCodes";
import AdminNewsletter from "@/pages/admin/AdminNewsletter";
import AdminEmailLog from "@/pages/admin/AdminEmailLog";
import AdminPartners from "@/pages/admin/AdminPartners";
import AdminB2B from "@/pages/admin/AdminB2B";
import AdminPixels from "@/pages/admin/AdminPixels";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();
  useGAPageView();
  return (
    <AnimatePresence mode="wait">
      <ScrollToTop />
      <Routes location={location} key={location.pathname}>
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
        <Route path="/matcha-poeder" element={<PageTransition><LandingPage slug="matcha-poeder" /></PageTransition>} />
        <Route path="/matcha-accessoires" element={<PageTransition><LandingPage slug="matcha-accessoires" /></PageTransition>} />
        <Route path="/matcha-kits" element={<PageTransition><LandingPage slug="matcha-kits" /></PageTransition>} />
        <Route path="/japanse-thee" element={<PageTransition><LandingPage slug="japanse-thee" /></PageTransition>} />
        <Route path="/cadeau-gids" element={<PageTransition><LandingPage slug="cadeau-gids" /></PageTransition>} />
        <Route path="/matcha-voor-beginners" element={<PageTransition><LandingPage slug="matcha-voor-beginners" /></PageTransition>} />
        <Route path="/matcha-voor-sporters" element={<PageTransition><LandingPage slug="matcha-voor-sporters" /></PageTransition>} />
        <Route path="/cafeinearme-thee" element={<PageTransition><LandingPage slug="cafeinearme-thee" /></PageTransition>} />
        <Route path="/matcha-als-koffievervanger" element={<PageTransition><LandingPage slug="matcha-als-koffievervanger" /></PageTransition>} />
        <Route path="/matcha-woordenboek" element={<PageTransition><Glossary /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
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
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminLayout />}>
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
