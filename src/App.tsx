import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence } from "framer-motion";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import PageTransition from "@/components/PageTransition";
import ScrollToTop from "@/components/ScrollToTop";
import NewsletterPopup from "@/components/NewsletterPopup";
import Homepage from "@/pages/Homepage";
import Shop from "@/pages/Shop";
import ProductDetail from "@/pages/ProductDetail";
import About from "@/pages/About";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import Subscriptions from "@/pages/Subscriptions";
import Checkout from "@/pages/Checkout";
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
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();
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
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        <Route path="/faq" element={<PageTransition><FAQ /></PageTransition>} />
        <Route path="/verzending" element={<PageTransition><Shipping /></PageTransition>} />
        <Route path="/privacy" element={<PageTransition><Privacy /></PageTransition>} />
        <Route path="/voorwaarden" element={<PageTransition><Terms /></PageTransition>} />
        <Route path="/recepten" element={<PageTransition><Recipes /></PageTransition>} />
        <Route path="/recepten/:slug" element={<PageTransition><RecipeDetail /></PageTransition>} />
        <Route path="/duurzaamheid" element={<PageTransition><Sustainability /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Sonner />
        <BrowserRouter>
          <CartProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <CartDrawer />
              <NewsletterPopup />
              <main className="flex-1">
                <AnimatedRoutes />
              </main>
              <Footer />
            </div>
          </CartProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
