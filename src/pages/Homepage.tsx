import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { Leaf, Globe, Sparkles, ArrowRight, Send, Star } from "lucide-react";
import { getFeaturedProducts } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import TrustBadges from "@/components/TrustBadges";
import ScrollReveal from "@/components/ScrollReveal";
import heroImg from "@/assets/hero-matcha.jpg";
import lifestyle1 from "@/assets/lifestyle-1.jpg";
import lifestyle2 from "@/assets/lifestyle-2.jpg";
import lifestyle3 from "@/assets/lifestyle-3.jpg";
import lifestyle4 from "@/assets/lifestyle-4.jpg";
import productCeremonial from "@/assets/product-ceremonial-30.jpg";
import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } }),
};

const Homepage = () => {
  const { t } = useTranslation();
  const featured = getFeaturedProducts().slice(0, 4);
  const [email, setEmail] = useState("");
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const pillarsList = [
    { emoji: "🍃", titleKey: "p1Title", descKey: "p1Desc" },
    { emoji: "🌏", titleKey: "p2Title", descKey: "p2Desc" },
    { emoji: "✨", titleKey: "p3Title", descKey: "p3Desc" },
  ];

  const benefitsList = [
    { emoji: "⚡", titleKey: "b1Title", descKey: "b1Desc" },
    { emoji: "🧘", titleKey: "b2Title", descKey: "b2Desc" },
    { emoji: "💚", titleKey: "b3Title", descKey: "b3Desc" },
    { emoji: "✨", titleKey: "b4Title", descKey: "b4Desc" },
  ];

  const testimonials = [
    { name: "Sophie V.", textKey: "t1", rating: 5 },
    { name: "Lars M.", textKey: "t2", rating: 5 },
    { name: "Isabel R.", textKey: "t3", rating: 5 },
  ];

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      toast.success(t("home.newsletterToast"));
      setEmail("");
    }
  };

  return (
    <div className="overflow-hidden">
      {/* Hero with Parallax */}
      <section ref={heroRef} className="relative h-[88vh] min-h-[620px] flex items-center overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: heroY }}>
          <img src={heroImg} alt="Premium matcha thee" className="w-full h-full object-cover scale-110" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/65 via-foreground/35 to-transparent" />
        </motion.div>
        <motion.div style={{ opacity: heroOpacity }} className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-xl"
          >
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-accent/90 text-accent-foreground text-sm tracking-wide px-4 py-1.5 rounded-full mb-6 font-medium"
            >
              🍵 {t("home.badge")}
            </motion.span>
            <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-light text-cream leading-[1.05] mb-6">
              {t("home.heroTitle1")}<br />
              <span className="italic font-light">{t("home.heroTitle2")}</span>
            </h1>
            <p className="text-cream/80 text-lg md:text-xl mb-10 max-w-md leading-relaxed">
              {t("home.heroSub")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/shop"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-accent-foreground font-bold text-sm tracking-widest uppercase rounded-full hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {t("home.shopNow")} <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/over-ons"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-cream/40 text-cream font-medium text-sm tracking-widest uppercase rounded-full hover:bg-cream/10 transition-all duration-300"
              >
                {t("home.ourStory")}
              </Link>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-5 h-8 border-2 border-cream/40 rounded-full flex justify-center pt-1.5"
          >
            <div className="w-1 h-2 bg-cream/60 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      <TrustBadges />

      {/* Brand Pillars */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <p className="text-center text-xs tracking-[0.3em] uppercase text-muted-foreground mb-12">
              {t("home.whyTitle")}
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {pillarsList.map((pillar, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                variants={fadeUp}
                className="text-center bg-background rounded-2xl p-8 shadow-soft hover:shadow-card transition-shadow duration-300"
              >
                <div className="text-4xl mb-4">{pillar.emoji}</div>
                <h3 className="font-heading text-xl font-semibold mb-2">
                  {[t("home.heroTitle1")] && (i === 0 ? (t("home.benefitsEyebrow") === "The benefits" ? "Ceremonial Quality" : t("home.benefitsEyebrow") === "Les bienfaits" ? "Qualité Cérémonielle" : t("home.benefitsEyebrow") === "Die Vorteile" ? "Zeremonielle Qualität" : "Ceremoniële Kwaliteit") : i === 1 ? (t("home.benefitsEyebrow") === "The benefits" ? "Sustainably Sourced" : t("home.benefitsEyebrow") === "Les bienfaits" ? "Sourcing Durable" : t("home.benefitsEyebrow") === "Die Vorteile" ? "Nachhaltig Bezogen" : "Duurzaam Ingekocht") : (t("home.benefitsEyebrow") === "The benefits" ? "Japanese Craftsmanship" : t("home.benefitsEyebrow") === "Les bienfaits" ? "Savoir-faire Japonais" : t("home.benefitsEyebrow") === "Die Vorteile" ? "Japanische Handwerkskunst" : "Japans Vakmanschap"))}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {i === 0 ? t("home.differenceText") : i === 1 ? t("home.storyText") : t("home.heroSub")}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-14">
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2">{t("home.benefitsEyebrow")}</p>
            <h2 className="font-heading text-3xl md:text-5xl font-semibold">{t("home.benefitsTitle")} 🍃</h2>
            <p className="text-muted-foreground mt-3 max-w-lg mx-auto">{t("home.benefitsSub")}</p>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {benefitsList.map((b, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                variants={fadeUp}
                className="bg-secondary rounded-2xl p-6 text-center hover:bg-primary/5 transition-colors duration-300 cursor-default"
              >
                <div className="text-3xl mb-3">{b.emoji}</div>
                <h3 className="font-heading text-base font-semibold mb-1">{t(`home.${b.titleKey}`)}</h3>
                <p className="text-muted-foreground text-xs leading-relaxed">{t(`home.${b.descKey}`)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <ScrollReveal>
              <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2">{t("home.bestsellersEyebrow")}</p>
              <h2 className="font-heading text-3xl md:text-5xl font-semibold">{t("home.bestsellersTitle")} ✨</h2>
            </ScrollReveal>
            <Link to="/shop" className="hidden sm:inline-flex items-center gap-1.5 text-sm text-primary hover:underline font-semibold bg-primary/10 px-4 py-2 rounded-full hover:bg-primary/15 transition-colors">
              {t("home.allProducts")} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="sm:hidden text-center mt-8">
            <Link to="/shop" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary bg-primary/10 px-6 py-3 rounded-full">
              {t("home.allProducts")} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Difference Split */}
      <section className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[550px]">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden"
          >
            <img src={productCeremonial} alt="Ceremonial matcha" className="w-full h-full object-cover min-h-[400px]" loading="lazy" />
          </motion.div>
          <div className="flex items-center bg-primary text-primary-foreground">
            <ScrollReveal className="p-10 md:p-16 lg:p-20 max-w-lg">
              <span className="inline-flex items-center gap-2 text-xs tracking-wide bg-primary-foreground/10 px-3 py-1.5 rounded-full text-primary-foreground/70 mb-6">🌿 {t("home.differenceEyebrow")}</span>
              <h2 className="font-heading text-3xl md:text-4xl font-light leading-tight mb-6">
                {t("home.differenceTitle1")}<br />
                <span className="italic">{t("home.differenceTitle2")}</span>
              </h2>
              <p className="text-primary-foreground/70 leading-relaxed mb-8">
                {t("home.differenceText")}
              </p>
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground text-sm font-bold rounded-full tracking-wide uppercase hover:scale-105 transition-transform duration-300"
              >
                {t("home.discoverMatcha")} <ArrowRight className="w-4 h-4" />
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-14">
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2">{t("home.testimonialsEyebrow")}</p>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold">{t("home.testimonialsTitle")} 💬</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((tm, i) => (
              <motion.div
                key={tm.name}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                variants={fadeUp}
                className="bg-secondary rounded-2xl p-8 hover:shadow-card transition-shadow duration-300"
              >
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: tm.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-foreground/80 leading-relaxed mb-6">"{t(`home.${tm.textKey}`)}"</p>
                <p className="text-sm font-bold text-foreground">{tm.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="aspect-[4/3] rounded-2xl overflow-hidden"
            >
              <img src={lifestyle3} alt="Japanese tea garden" className="w-full h-full object-cover" loading="lazy" />
            </motion.div>
            <ScrollReveal>
              <span className="inline-flex items-center gap-2 text-xs tracking-wide bg-primary/10 text-primary px-3 py-1.5 rounded-full mb-6 font-medium">🇯🇵 {t("home.storyEyebrow")}</span>
              <h2 className="font-heading text-3xl md:text-5xl font-light leading-tight mb-6">
                {t("home.storyTitle1")}<br />
                <span className="italic">{t("home.storyTitle2")}</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8 text-lg">
                {t("home.storyText")}
              </p>
              <Link
                to="/over-ons"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground text-sm font-bold rounded-full tracking-wide uppercase hover:scale-105 transition-transform duration-300"
              >
                {t("home.readStory")} <ArrowRight className="w-4 h-4" />
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Lifestyle Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-12">
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2">{t("home.socialEyebrow")}</p>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold">{t("home.socialTitle")} 📸</h2>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[lifestyle1, lifestyle2, lifestyle3, lifestyle4].map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="aspect-square rounded-2xl overflow-hidden cursor-pointer group"
              >
                <img src={img} alt="YourMatcha lifestyle" loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <div className="text-4xl mb-4">🍵</div>
            <h2 className="font-heading text-3xl md:text-4xl font-light mb-4">{t("home.newsletterTitle")}</h2>
            <p className="text-primary-foreground/60 mb-10 max-w-md mx-auto">{t("home.newsletterSub")}</p>
            <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder={t("home.emailPlaceholder")}
                required
                className="flex-1 px-5 py-3.5 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/40 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
              />
              <button type="submit" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-accent text-accent-foreground text-sm font-bold rounded-full tracking-wide uppercase hover:scale-105 transition-transform">
                <Send className="w-4 h-4" /> {t("home.subscribe")}
              </button>
            </form>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
