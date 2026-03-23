import { Check, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

const plans = [
  {
    name: "Starter",
    description: "1× Ceremonial Grade Matcha 30g",
    price: 16.11,
    originalPrice: 18.95,
    interval: "/ maand",
    features: ["30g ceremonial grade matcha", "Maandelijkse levering", "Gratis verzending", "15% korting", "Op elk moment opzegbaar"],
  },
  {
    name: "Regular",
    description: "2× Ceremonial Grade Matcha 30g",
    price: 32.22,
    originalPrice: 37.90,
    interval: "/ maand",
    popular: true,
    features: ["2× 30g ceremonial grade matcha", "Maandelijkse levering", "Gratis verzending", "15% korting", "Op elk moment opzegbaar", "Exclusieve recepten"],
  },
  {
    name: "Ritual",
    description: "1× Ceremonial Grade Matcha 100g",
    price: 42.46,
    originalPrice: 49.95,
    interval: "/ maand",
    features: ["100g ceremonial grade matcha", "Maandelijkse levering", "Gratis verzending", "15% korting", "Op elk moment opzegbaar", "Exclusieve recepten", "Vroege toegang tot nieuwe producten"],
  },
];

const formatPrice = (price: number) =>
  new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" }).format(price);

const Subscriptions = () => (
  <div className="py-12">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="font-heading text-4xl md:text-5xl font-semibold mb-4">Start Je Matcha Ritueel</h1>
        <p className="text-muted-foreground text-lg leading-relaxed">
          Ontvang elke maand de verste matcha aan huis. Bespaar 15%, geniet van gratis verzending en zeg op wanneer je wilt.
        </p>
      </div>

      {/* Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`relative rounded p-8 ${
              plan.popular
                ? "bg-primary text-primary-foreground ring-2 ring-accent"
                : "bg-secondary"
            }`}
          >
            {plan.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent text-accent-foreground text-xs font-medium tracking-wide uppercase rounded-full">
                Meest Gekozen
              </span>
            )}
            <h3 className="font-heading text-2xl font-semibold mb-1">{plan.name}</h3>
            <p className={`text-sm mb-6 ${plan.popular ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
              {plan.description}
            </p>
            <div className="mb-6">
              <span className="text-3xl font-semibold">{formatPrice(plan.price)}</span>
              <span className={`text-sm ml-1 ${plan.popular ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                {plan.interval}
              </span>
              <p className={`text-xs mt-1 line-through ${plan.popular ? "text-primary-foreground/40" : "text-muted-foreground/60"}`}>
                {formatPrice(plan.originalPrice)} {plan.interval}
              </p>
            </div>
            <ul className="space-y-3 mb-8">
              {plan.features.map(f => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.popular ? "text-accent" : "text-primary"}`} />
                  <span className={plan.popular ? "text-primary-foreground/80" : "text-foreground/80"}>{f}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => toast.success(`${plan.name} abonnement geselecteerd! 🍵`)}
              className={`w-full flex items-center justify-center gap-2 py-3 rounded font-medium text-sm tracking-wide uppercase transition-opacity hover:opacity-90 ${
                plan.popular
                  ? "bg-accent text-accent-foreground"
                  : "bg-primary text-primary-foreground"
              }`}
            >
              Start Je Ritueel <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </div>

      {/* Benefits */}
      <div className="mt-20 text-center">
        <h2 className="font-heading text-2xl font-semibold mb-8">Waarom een Abonnement?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
          {[
            { title: "Bespaar 15%", desc: "Op elke levering, vergeleken met een eenmalige aankoop." },
            { title: "Gratis Verzending", desc: "Elke maand, zonder minimum bestelbedrag." },
            { title: "Flexibel", desc: "Pauzeer, wijzig of zeg op wanneer je maar wilt." },
          ].map(b => (
            <div key={b.title}>
              <h3 className="font-heading text-lg font-semibold mb-2">{b.title}</h3>
              <p className="text-sm text-muted-foreground">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default Subscriptions;
