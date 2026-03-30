import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { Leaf, Globe, Sparkles, ArrowRight, Send, Star, Quote, Heart, Zap, Coffee } from "lucide-react";
import { getFeaturedProducts } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import TrustBadges from "@/components/TrustBadges";
import heroImg from "@/assets/hero-matcha.jpg";
import lifestyle1 from "@/assets/lifestyle-1.jpg";
import lifestyle2 from "@/assets/lifestyle-2.jpg";
import lifestyle3 from "@/assets/lifestyle-3.jpg";
import lifestyle4 from "@/assets/lifestyle-4.jpg";
import productCeremonial from "@/assets/product-ceremonial-30.jpg";
import { useState, useRef } from "react";
import { toast } from "sonner";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.7, ease: "easeOut" } }),
};

const pillars = [
  { icon: Leaf, emoji: "🍃", title: "Ceremoniële Kwaliteit", desc: "Alleen de jongste theeblaadjes, handgeplukt voor de hoogste kwaliteit." },
  { icon: Globe, emoji: "🌏", title: "Duurzaam Ingekocht", desc: "Direct van familietheeboerderijen in de Uji-regio, Japan." },
  { icon: Sparkles, emoji: "✨", title: "Japans Vakmanschap", desc: "Eeuwenoude tradities, gecombineerd met moderne precisie." },
];

const benefits = [
  { emoji: "⚡", title: "Meer Energie", desc: "Langdurige, stabiele energie zonder crash" },
  { emoji: "🧘", title: "Focus & Rust", desc: "L-theanine voor ontspannen concentratie" },
  { emoji: "💚", title: "Vol Antioxidanten", desc: "137x meer dan gewone groene thee" },
  { emoji: "✨", title: "Stralende Huid", desc: "Natuurlijke detox van binnenuit" },
];

const testimonials = [
  { name: "Sophie V.", text: "De beste matcha die ik ooit heb geproefd! Prachtige kleur en ongelooflijke smaak 🍵", rating: 5 },
  { name: "Lars M.", text: "YourMatcha is mijn dagelijkse ritueel geworden. De kwaliteit is echt ongeëvenaard!", rating: 5 },
  { name: "Isabel R.", text: "De Premium Ritual Set is schitterend. Voelt echt als een luxe ervaring ✨", rating: 5 },
];

const Homepage = () => {
  const featured = getFeaturedProducts().slice(0, 4);
  const [email, setEmail] = useState("");
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      toast.success("Bedankt voor je aanmelding! 🍵");
      setEmail("");
    }
  };

  return (
    <div className="overflow-hidden">
      {/* Hero with Parallax */}
      <section ref={heroRef} className="relative h-[85vh] min-h-[600px] flex items-center overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: heroY }}>
          <img src={heroImg} alt="Premium matcha thee" className="w-full h-full object-cover scale-110" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/60 via-foreground/30 to-transparent" />
        </motion.div>
        <motion.div style={{ opacity: heroOpacity }} className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-xl"
          >
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-accent/90 text-accent-foreground text-sm tracking-wide px-4 py-1.5 rounded-full mb-6 font-medium"
            >
              🍵 Premium Japanese Matcha
            </motion.span>
            <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-light text-cream leading-[1.05] mb-6">
              Voel Je<br />
              <span className="italic font-light">Beter.</span>
            </h1>
            <p className="text-cream/80 text-lg md:text-xl mb-10 max-w-md leading-relaxed">
              Ontdek de finest ceremonial grade matcha, rechtstreeks uit de Uji-regio van Japan. Jouw dagelijkse boost aan energie en focus.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/shop"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-accent-foreground font-bold text-sm tracking-widest uppercase rounded-full hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Shop Nu <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/over-ons"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-cream/40 text-cream font-medium text-sm tracking-widest uppercase rounded-full hover:bg-cream/10 transition-all duration-300"
              >
                Ons Verhaal
              </Link>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
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

      {/* Trust Badges */}
      <TrustBadges />

      {/* Brand Pillars */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-xs tracking-[0.3em] uppercase text-muted-foreground mb-12"
          >
            Waarom YourMatcha?
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="text-center bg-background rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="text-4xl mb-4">{pillar.emoji}</div>
                <h3 className="font-heading text-xl font-semibold mb-2">{pillar.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section - Playful */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2">De voordelen</p>
            <h2 className="font-heading text-3xl md:text-5xl font-semibold">Waarom Matcha? 🍃</h2>
            <p className="text-muted-foreground mt-3 max-w-lg mx-auto">Matcha is meer dan een drankje — het is een levensstijl die je lichaam en geest voedt.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-secondary rounded-2xl p-6 text-center hover:bg-primary/5 transition-colors duration-300 cursor-default"
              >
                <div className="text-3xl mb-3">{b.emoji}</div>
                <h3 className="font-heading text-base font-semibold mb-1">{b.title}</h3>
                <p className="text-muted-foreground text-xs leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2">Collectie</p>
              <h2 className="font-heading text-3xl md:text-5xl font-semibold">Onze Bestsellers ✨</h2>
            </div>
            <Link to="/shop" className="hidden sm:inline-flex items-center gap-1.5 text-sm text-primary hover:underline font-semibold bg-primary/10 px-4 py-2 rounded-full hover:bg-primary/15 transition-colors">
              Alle producten <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="sm:hidden text-center mt-8">
            <Link to="/shop" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary bg-primary/10 px-6 py-3 rounded-full">
              Bekijk alle producten <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Immersive Split Section */}
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
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="p-10 md:p-16 lg:p-20 max-w-lg"
            >
              <span className="inline-flex items-center gap-2 text-xs tracking-wide bg-primary-foreground/10 px-3 py-1.5 rounded-full text-primary-foreground/70 mb-6">🌿 Het Verschil</span>
              <h2 className="font-heading text-3xl md:text-4xl font-light leading-tight mb-6">
                Niet Alle Matcha<br />
                <span className="italic">Is Gelijk</span>
              </h2>
              <p className="text-primary-foreground/70 leading-relaxed mb-6">
                Onze ceremonial grade matcha wordt uitsluitend gemaakt van de jongste theeblaadjes, beschaduwd geteeld voor een rijkere smaak en heldergroene kleur.
              </p>
              <ul className="space-y-3 mb-8 text-sm text-primary-foreground/60">
                <li className="flex items-center gap-3"><span className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-xs">🌱</span> Eerste oogst, schaduwgeteeld</li>
                <li className="flex items-center gap-3"><span className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-xs">⚙️</span> Stenen gemalen voor ultrafijn poeder</li>
                <li className="flex items-center gap-3"><span className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-xs">💎</span> Rijk aan L-theanine & antioxidanten</li>
              </ul>
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground text-sm font-bold rounded-full tracking-wide uppercase hover:scale-105 transition-transform duration-300"
              >
                Ontdek Onze Matcha <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2">Ervaringen</p>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold">Wat Klanten Zeggen 💬</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-secondary rounded-2xl p-8 relative hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-foreground/80 leading-relaxed mb-6">"{t.text}"</p>
                <p className="text-sm font-bold text-foreground">{t.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Teaser */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="aspect-[4/3] rounded-2xl overflow-hidden"
            >
              <img src={lifestyle3} alt="Japanse theeplantage" className="w-full h-full object-cover" loading="lazy" />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <span className="inline-flex items-center gap-2 text-xs tracking-wide bg-primary/10 text-primary px-3 py-1.5 rounded-full mb-6 font-medium">🇯🇵 Ons Verhaal</span>
              <h2 className="font-heading text-3xl md:text-5xl font-light leading-tight mb-6">
                Het Begint<br />
                <span className="italic">in de Uji-regio</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8 text-lg">
                Al generaties lang werken onze Japanse partners met de beste theeboerderijen in Kyoto.
                Elke batch matcha wordt met zorg geselecteerd, stenen gemalen en direct naar jou verscheept.
              </p>
              <Link
                to="/over-ons"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground text-sm font-bold rounded-full tracking-wide uppercase hover:scale-105 transition-transform duration-300"
              >
                Lees Ons Verhaal <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Lifestyle Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2">@yourmatcha</p>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold">Het YourMatcha Leven 📸</h2>
          </div>
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-4xl mb-4">🍵</div>
            <h2 className="font-heading text-3xl md:text-4xl font-light mb-4">Word Lid van de<br className="sm:hidden" /> YourMatcha Community</h2>
            <p className="text-primary-foreground/60 mb-10 max-w-md mx-auto">Ontvang als eerste nieuwe producten, exclusieve aanbiedingen en matcha recepten.</p>
            <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Je e-mailadres"
                required
                className="flex-1 px-5 py-3.5 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/40 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
              />
              <button type="submit" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-accent text-accent-foreground text-sm font-bold rounded-full tracking-wide uppercase hover:scale-105 transition-transform">
                <Send className="w-4 h-4" /> Aanmelden
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
