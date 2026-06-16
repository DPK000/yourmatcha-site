import { Check, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import SEO from "@/components/SEO";
import { useCurrency } from "@/context/CurrencyContext";
import { useLang } from "@/i18n";

type Plan = {
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  interval: string;
  popular?: boolean;
  features: string[];
};

const PLANS: Record<"nl" | "no", Plan[]> = {
  nl: [
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
  ],
  no: [
    {
      name: "Starter",
      description: "1× Ceremonial Grade matcha 30 g",
      price: 16.11,
      originalPrice: 18.95,
      interval: "/ måned",
      features: ["30 g seremoniell matcha", "Månedlig levering", "Gratis frakt", "15 % rabatt", "Avslutt når som helst"],
    },
    {
      name: "Regular",
      description: "2× Ceremonial Grade matcha 30 g",
      price: 32.22,
      originalPrice: 37.90,
      interval: "/ måned",
      popular: true,
      features: ["2× 30 g seremoniell matcha", "Månedlig levering", "Gratis frakt", "15 % rabatt", "Avslutt når som helst", "Eksklusive oppskrifter"],
    },
    {
      name: "Ritual",
      description: "1× Ceremonial Grade matcha 100 g",
      price: 42.46,
      originalPrice: 49.95,
      interval: "/ måned",
      features: ["100 g seremoniell matcha", "Månedlig levering", "Gratis frakt", "15 % rabatt", "Avslutt når som helst", "Eksklusive oppskrifter", "Tidlig tilgang til nye produkter"],
    },
  ],
};

const COPY = {
  nl: {
    seoTitle: "Matcha abonnement — maandelijks ceremoniële matcha aan huis, bespaar 15%",
    seoDescription: "Start je matcha ritueel: maandelijks verse ceremoniële matcha uit Uji, 15% korting, gratis verzending en op elk moment opzegbaar. Vanaf €16,11 per maand.",
    seoKeywords: "matcha abonnement, maandelijks matcha, matcha thuisbezorgd, ceremoniële matcha abonnement, matcha box",
    title: "Start Je Matcha Ritueel",
    intro: "Ontvang elke maand de verste matcha aan huis. Bespaar 15%, geniet van gratis verzending en zeg op wanneer je wilt.",
    mostPopular: "Meest Gekozen",
    toastSelected: (name: string) => `${name} abonnement geselecteerd!`,
    startRitual: "Start Je Ritueel",
    whyTitle: "Waarom een Abonnement?",
    benefits: [
      { title: "Bespaar 15%", desc: "Op elke levering, vergeleken met een eenmalige aankoop." },
      { title: "Gratis Verzending", desc: "Elke maand, zonder minimum bestelbedrag." },
      { title: "Flexibel", desc: "Pauzeer, wijzig of zeg op wanneer je maar wilt." },
    ],
  },
  no: {
    seoTitle: "Matcha-abonnement — seremoniell matcha levert hver måned, spar 15 %",
    seoDescription: "Start matcharitualet ditt: fersk seremoniell matcha fra Uji hver måned, 15 % rabatt, gratis frakt og avslutt når du vil. Fra 185 kr per måned.",
    seoKeywords: "matcha abonnement, matcha hver måned, matcha levert hjem, seremoniell matcha abonnement, matcha boks",
    title: "Start matcharitualet ditt",
    intro: "Få den ferskeste matchaen levert hjem hver måned. Spar 15 %, nyt gratis frakt og si opp når du vil.",
    mostPopular: "Mest populær",
    toastSelected: (name: string) => `${name}-abonnement valgt!`,
    startRitual: "Start ritualet ditt",
    whyTitle: "Hvorfor abonnement?",
    benefits: [
      { title: "Spar 15 %", desc: "På hver levering, sammenlignet med et enkeltkjøp." },
      { title: "Gratis frakt", desc: "Hver måned, uten minstebeløp." },
      { title: "Fleksibelt", desc: "Sett på pause, endre eller si opp når du vil." },
    ],
  },
} as const;

const Subscriptions = () => {
  const { format: formatPrice } = useCurrency();
  const lang = useLang();
  const key = lang === "no" ? "no" : "nl";
  const t = COPY[key];
  const plans = PLANS[key];
  return (
  <div className="py-12">
    <SEO
      title={t.seoTitle}
      description={t.seoDescription}
      canonical="/abonnementen"
      keywords={t.seoKeywords}
    />
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="font-heading text-4xl md:text-5xl font-semibold mb-4">{t.title}</h1>
        <p className="text-muted-foreground text-lg leading-relaxed">
          {t.intro}
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
                {t.mostPopular}
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
              onClick={() => toast.success(t.toastSelected(plan.name))}
              className={`w-full flex items-center justify-center gap-2 py-3 rounded font-medium text-sm tracking-wide uppercase transition-opacity hover:opacity-90 ${
                plan.popular
                  ? "bg-accent text-accent-foreground"
                  : "bg-primary text-primary-foreground"
              }`}
            >
              {t.startRitual} <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </div>

      {/* Benefits */}
      <div className="mt-20 text-center">
        <h2 className="font-heading text-2xl font-semibold mb-8">{t.whyTitle}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
          {t.benefits.map(b => (
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
};

export default Subscriptions;
