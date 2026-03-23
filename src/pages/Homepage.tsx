import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Leaf, Globe, Sparkles, ArrowRight, Send } from "lucide-react";
import { getFeaturedProducts } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import heroImg from "@/assets/hero-matcha.jpg";
import lifestyle1 from "@/assets/lifestyle-1.jpg";
import lifestyle2 from "@/assets/lifestyle-2.jpg";
import lifestyle3 from "@/assets/lifestyle-3.jpg";
import lifestyle4 from "@/assets/lifestyle-4.jpg";
import { useState } from "react";
import { toast } from "sonner";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6 } }),
};

const pillars = [
  { icon: Leaf, title: "Ceremonial Grade", desc: "Alleen de jongste theeblaadjes, handgeplukt voor de hoogste kwaliteit." },
  { icon: Globe, title: "Duurzaam Ingekocht", desc: "Direct van familietheeboerderijen in de Uji-regio, Japan." },
  { icon: Sparkles, title: "Japans Vakmanschap", desc: "Eeuwenoude tradities, gecombineerd met moderne precisie." },
];

const Homepage = () => {
  const featured = getFeaturedProducts().slice(0, 4);
  const [email, setEmail] = useState("");

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      toast.success("Bedankt voor je aanmelding! 🍵");
      setEmail("");
    }
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Premium matcha thee" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/60 via-foreground/30 to-transparent" />
        </div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl"
          >
            <h1 className="font-heading text-5xl md:text-7xl font-light text-cream leading-[1.1] mb-6">
              Pure Matcha.<br />
              <span className="italic">Pure Ritual.</span>
            </h1>
            <p className="text-cream/80 text-lg mb-8 max-w-md leading-relaxed">
              Ontdek de finest ceremonial grade matcha, rechtstreeks uit de Uji-regio van Japan.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-accent-foreground font-medium text-sm tracking-widest uppercase rounded hover:opacity-90 transition-opacity"
            >
              Shop Nu <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Brand Pillars */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-5">
                  <pillar.icon className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-xl font-semibold mb-3">{pillar.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-semibold">Uitgelichte Producten</h2>
              <p className="text-muted-foreground mt-2">Onze meest geliefde selectie</p>
            </div>
            <Link to="/shop" className="hidden sm:inline-flex items-center gap-1 text-sm text-primary hover:underline font-medium">
              Alle producten <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featured.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Brand Teaser */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="font-heading text-3xl md:text-4xl font-light leading-tight mb-6">
                Ons Verhaal Begint<br />
                <span className="italic">in de Uji-regio</span>
              </h2>
              <p className="text-primary-foreground/70 leading-relaxed mb-8">
                Al generaties lang werken onze Japanse partners met de beste theeboerderijen in Kyoto.
                Elke batch matcha wordt met zorg geselecteerd, steen gemalen en direct naar jou verscheept.
              </p>
              <Link
                to="/over-ons"
                className="inline-flex items-center gap-2 text-sm font-medium tracking-wide uppercase border-b border-primary-foreground/40 pb-1 hover:border-primary-foreground transition-colors"
              >
                Lees Ons Verhaal <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
            <div className="aspect-[4/3] rounded overflow-hidden">
              <img src={lifestyle3} alt="Japanse theeplantage" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Lifestyle Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-center mb-12">Het YourMatcha Leven</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[lifestyle1, lifestyle2, lifestyle3, lifestyle4].map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="aspect-square rounded overflow-hidden"
              >
                <img src={img} alt="YourMatcha lifestyle" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-semibold mb-3">Word Lid van de YourMatcha Community</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">Ontvang als eerste nieuwe producten, exclusieve aanbiedingen en matcha recepten.</p>
          <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Je e-mailadres"
              required
              className="flex-1 px-4 py-3 rounded border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            <button type="submit" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground text-sm font-medium rounded tracking-wide uppercase hover:opacity-90 transition-opacity">
              <Send className="w-4 h-4" /> Aanmelden
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
