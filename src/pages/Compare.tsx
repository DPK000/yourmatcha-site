import { Link } from "react-router-dom";
import { Check, Star } from "lucide-react";
import { getProductBySlug } from "@/data/products";
import SEO from "@/components/SEO";
import { motion } from "framer-motion";

const formatPrice = (n: number) =>
  new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" }).format(n);

interface Row {
  slug: string;
  weight: number; // grams
  ideal: string;
  flavor: string;
  color: string;
  use: string[];
  highlight?: boolean;
}

const rows: Row[] = [
  {
    slug: "ceremonial-matcha-30g",
    weight: 30,
    ideal: "Beginners & dagelijks ritueel",
    flavor: "Zacht zoet, romig, lichte umami",
    color: "bg-[hsl(85,55%,55%)]",
    use: ["Puur (usucha)", "Latte"],
  },
  {
    slug: "ceremonial-matcha-100g",
    weight: 100,
    ideal: "Frequente drinkers",
    flavor: "Zacht zoet, romig, lichte umami",
    color: "bg-[hsl(85,55%,55%)]",
    use: ["Puur (usucha)", "Latte"],
    highlight: true,
  },
  {
    slug: "ceremonial-reserve-tin",
    weight: 100,
    ideal: "Liefhebbers & connaisseurs",
    flavor: "Diepe umami, fluweelzacht, lange afdronk",
    color: "bg-[hsl(95,60%,40%)]",
    use: ["Puur (koicha)", "Ceremonie"],
  },
  {
    slug: "culinary-matcha-100g",
    weight: 100,
    ideal: "Lattes, smoothies, koken",
    flavor: "Robuust, grasachtig, ietsje bitter",
    color: "bg-[hsl(75,45%,50%)]",
    use: ["Latte", "Bakken", "Smoothie"],
  },
];

const Compare = () => {
  const products = rows.map(r => ({ row: r, product: getProductBySlug(r.slug)! })).filter(x => x.product);

  return (
    <>
      <SEO
        title="Matcha vergelijken — Welke matcha past bij jou?"
        description="Vergelijk onze ceremonial, reserve en culinary matcha op smaak, kleur, gebruik en prijs per gram. Vind in 30 seconden de juiste matcha voor jouw ritueel."
        canonical="/matcha-vergelijken"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: products.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `https://yourmatcha.nl/product/${p.product.slug}`,
            name: p.product.name,
          })),
        }}
      />

      {/* Hero */}
      <section className="relative py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-2xl">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-[10px] tracking-[0.35em] uppercase text-muted-foreground mb-3">De Matcha Familie</p>
            <h1 className="font-heading text-4xl md:text-6xl font-light leading-tight mb-5">
              Welke matcha<br /><span className="italic">past bij jou?</span>
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              Vergelijk smaak, kleur en gebruik van onze vier matcha's. Zo vind je in een halve minuut de perfecte match voor jouw ritueel.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Comparison cards (mobile) + table (desktop) */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mobile cards */}
          <div className="grid grid-cols-1 md:hidden gap-5">
            {products.map(({ row, product }) => (
              <div key={product.id} className={`rounded-2xl border ${row.highlight ? "border-primary shadow-card" : "border-border"} bg-card overflow-hidden`}>
                {row.highlight && <div className="bg-primary text-primary-foreground text-[10px] tracking-[0.25em] uppercase text-center py-1.5">Meest gekozen</div>}
                <div className="p-6">
                  <div className="aspect-square rounded-xl overflow-hidden bg-secondary mb-4">
                    <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold mb-1">{product.name}</h3>
                  <p className="text-2xl font-semibold mb-4">{formatPrice(product.price)} <span className="text-xs text-muted-foreground font-normal">· €{(product.price/row.weight).toFixed(2)}/g</span></p>
                  <CompareRow label="Ideaal voor" value={row.ideal} />
                  <CompareRow label="Smaak" value={row.flavor} />
                  <CompareRow label="Gebruik" value={row.use.join(" · ")} />
                  <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
                    <span className="text-xs uppercase tracking-wider text-muted-foreground">Kleur</span>
                    <span className={`w-8 h-8 rounded-full ${row.color} ring-2 ring-background shadow-soft`} />
                  </div>
                  <Link to={`/product/${product.slug}`} className="block w-full text-center mt-5 px-5 py-3 bg-primary text-primary-foreground text-xs font-bold tracking-widest uppercase rounded-full hover:opacity-90 transition-opacity">
                    Bekijk product
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop table */}
          <div className="hidden md:block rounded-2xl border border-border overflow-hidden bg-card shadow-soft">
            <div className="grid grid-cols-5">
              {/* Header column */}
              <div className="bg-secondary p-6 flex flex-col justify-end">
                <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">Vergelijking</p>
              </div>
              {products.map(({ row, product }) => (
                <div key={product.id} className={`relative p-6 border-l border-border ${row.highlight ? "bg-primary/5" : "bg-card"}`}>
                  {row.highlight && (
                    <span className="absolute -top-px left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[9px] tracking-[0.25em] uppercase px-3 py-1 rounded-b-md">
                      Meest gekozen
                    </span>
                  )}
                  <div className="aspect-square rounded-xl overflow-hidden bg-secondary mb-4">
                    <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold leading-tight mb-1">{product.name}</h3>
                  <p className="text-xl font-semibold">{formatPrice(product.price)}</p>
                  <p className="text-xs text-muted-foreground">€{(product.price/row.weight).toFixed(2)} per gram</p>
                </div>
              ))}
            </div>

            <TableRow label="Ideaal voor" cells={products.map(p => p.row.ideal)} highlight={products.map(p => !!p.row.highlight)} />
            <TableRow label="Smaakprofiel" cells={products.map(p => p.row.flavor)} highlight={products.map(p => !!p.row.highlight)} />
            <TableRow label="Gebruik" cells={products.map(p => p.row.use.join(" · "))} highlight={products.map(p => !!p.row.highlight)} />

            <div className="grid grid-cols-5 border-t border-border">
              <div className="p-5 bg-secondary text-xs tracking-wider uppercase text-muted-foreground font-medium">Kleur</div>
              {products.map(({ row, product }) => (
                <div key={product.id} className={`p-5 border-l border-border flex items-center justify-center ${row.highlight ? "bg-primary/5" : ""}`}>
                  <span className={`w-10 h-10 rounded-full ${row.color} ring-2 ring-background shadow-soft`} />
                </div>
              ))}
            </div>

            <div className="grid grid-cols-5 border-t border-border">
              <div className="p-5 bg-secondary text-xs tracking-wider uppercase text-muted-foreground font-medium">Biologisch</div>
              {products.map(({ row, product }) => (
                <div key={product.id} className={`p-5 border-l border-border flex items-center justify-center ${row.highlight ? "bg-primary/5" : ""}`}>
                  <Check className="w-5 h-5 text-primary" />
                </div>
              ))}
            </div>

            <div className="grid grid-cols-5 border-t border-border">
              <div className="p-5 bg-secondary" />
              {products.map(({ row, product }) => (
                <div key={product.id} className={`p-5 border-l border-border ${row.highlight ? "bg-primary/5" : ""}`}>
                  <Link to={`/product/${product.slug}`} className="block w-full text-center px-4 py-3 bg-primary text-primary-foreground text-[11px] font-bold tracking-widest uppercase rounded-full hover:opacity-90 transition-opacity">
                    Kies deze
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Help section */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { title: "Twijfel je nog?", text: "Onze Discovery Tea Box bevat 4 mini-pouches om alles te proeven.", cta: "Bekijk Discovery Box", to: "/product/discovery-tea-box" },
              { title: "Eerste keer matcha?", text: "Begin met onze Starter Kit — matcha, klopper en kom inbegrepen.", cta: "Bekijk Starter Kit", to: "/product/starter-kit" },
              { title: "Lees de gids", text: "Ceremonial vs Culinary uitgelegd — lees onze kennisartikelen.", cta: "Naar Kennisbank", to: "/kennis" },
            ].map(c => (
              <div key={c.title} className="bg-secondary rounded-2xl p-7">
                <div className="flex items-center gap-1 mb-2">
                  {[1,2,3,4,5].map(s => <Star key={s} className="w-3 h-3 fill-accent text-accent" />)}
                </div>
                <h3 className="font-heading text-xl font-semibold mb-2">{c.title}</h3>
                <p className="text-sm text-muted-foreground mb-5 leading-relaxed">{c.text}</p>
                <Link to={c.to} className="inline-flex items-center gap-1 text-xs font-bold tracking-widest uppercase text-primary hover:underline">
                  {c.cta} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

const CompareRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-start justify-between gap-4 py-3 border-b border-border last:border-0">
    <span className="text-xs uppercase tracking-wider text-muted-foreground shrink-0">{label}</span>
    <span className="text-sm text-right text-foreground/85">{value}</span>
  </div>
);

const TableRow = ({ label, cells, highlight }: { label: string; cells: string[]; highlight: boolean[] }) => (
  <div className="grid grid-cols-5 border-t border-border">
    <div className="p-5 bg-secondary text-xs tracking-wider uppercase text-muted-foreground font-medium">{label}</div>
    {cells.map((c, i) => (
      <div key={i} className={`p-5 border-l border-border text-sm text-foreground/85 leading-relaxed ${highlight[i] ? "bg-primary/5" : ""}`}>
        {c}
      </div>
    ))}
  </div>
);

export default Compare;
