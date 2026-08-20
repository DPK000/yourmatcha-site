import { useState } from "react";
import { Link } from "@/components/LocalizedLink";
import { Check, ArrowRight, Loader2, Truck, RefreshCw, Percent } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import SEO from "@/components/SEO";
import ScrollReveal from "@/components/ScrollReveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { subscribeToNewsletter } from "@/lib/newsletter";
import { useCurrency } from "@/context/CurrencyContext";
import { getProductById } from "@/data/products";
import ritualSift from "@/assets/ritual-1-zeef.webp";
import ritualPour from "@/assets/ritual-2-schenk.webp";
import ritualWhisk from "@/assets/ritual-3-klop.webp";

/** Abonnementskorting - één bron van waarheid, ook gebruikt in de teksten. */
const DISCOUNT = 0.15;

/**
 * Elk plan verwijst naar een echt product uit de catalogus. Prijs en foto komen
 * daaruit, zodat een prijswijziging in products.ts hier automatisch doorwerkt en
 * een plan nooit een gearchiveerd product kan aanbieden.
 */
const PLAN_DEFS = [
  { key: "Starter", productId: "matcha-poeder-100g", quantity: 1, featureCount: 4 },
  { key: "Ritual", productId: "matcha-poeder-pot-100g", quantity: 1, featureCount: 5, popular: true },
  { key: "Duo", productId: "matcha-poeder-100g", quantity: 2, featureCount: 6 },
] as const;

type PlanKey = (typeof PLAN_DEFS)[number]["key"];

interface Plan {
  key: PlanKey;
  name: string;
  quantity: number;
  description: string;
  image: string;
  price: number;
  originalPrice: number;
  features: string[];
  popular: boolean;
}

const buildPlans = (t: (k: string) => string): Plan[] =>
  PLAN_DEFS.map((def): Plan | null => {
    const product = getProductById(def.productId);
    if (!product) return null; // product gearchiveerd → plan verdwijnt i.p.v. dood aanbod
    const original = product.price * def.quantity;
    return {
      key: def.key,
      name: t(`subscriptions.plan${def.key}Name`),
      quantity: def.quantity,
      description: t(`subscriptions.plan${def.key}Desc`),
      image: product.images[0],
      price: original * (1 - DISCOUNT),
      originalPrice: original,
      features: Array.from({ length: def.featureCount }, (_, i) =>
        t(`subscriptions.plan${def.key}F${i + 1}`)
      ),
      popular: "popular" in def && def.popular === true,
    };
  }).filter((p): p is Plan => p !== null);

/** Inline e-mailaanmelding per plan - lead komt met bron `subscription-<plan>` in de admin. */
const PlanSignup = ({ plan }: { plan: Plan }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(trimmed)) {
      toast.error(t("subscriptions.invalidEmail"));
      return;
    }
    setBusy(true);
    const ok = await subscribeToNewsletter(trimmed, `subscription-${plan.key.toLowerCase()}`);
    setBusy(false);
    if (ok) {
      setDone(true);
      toast.success(t("subscriptions.thanks"));
    } else {
      toast.error(t("subscriptions.error"));
    }
  };

  if (done) {
    return (
      <p className={`text-sm font-medium flex items-start gap-2 ${plan.popular ? "text-primary-foreground/90" : "text-primary"}`}>
        <Check className="w-4 h-4 mt-0.5 flex-shrink-0" /> {t("subscriptions.thanks")}
      </p>
    );
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-full font-bold text-xs tracking-widest uppercase transition-all hover:scale-[1.02] ${
          plan.popular ? "bg-accent text-accent-foreground" : "bg-primary text-primary-foreground"
        }`}
      >
        {t("subscriptions.startRitual")} <ArrowRight className="w-4 h-4" />
      </button>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-2">
      <p className={`text-xs leading-relaxed ${plan.popular ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
        {t("subscriptions.signupNote")}
      </p>
      <input
        autoFocus
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={t("subscriptions.emailPlaceholder")}
        className="w-full px-4 py-2.5 rounded-full border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
      />
      <button
        type="submit"
        disabled={busy}
        className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-full font-bold text-xs tracking-widest uppercase transition-opacity hover:opacity-90 disabled:opacity-60 ${
          plan.popular ? "bg-accent text-accent-foreground" : "bg-primary text-primary-foreground"
        }`}
      >
        {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : t("subscriptions.confirm")}
      </button>
    </form>
  );
};

const Subscriptions = () => {
  const { t } = useTranslation();
  const { format: formatPrice } = useCurrency();
  const plans = buildPlans(t);

  const steps = [
    { img: ritualSift, titleKey: "howStep1Title", descKey: "howStep1Desc" },
    { img: ritualPour, titleKey: "howStep2Title", descKey: "howStep2Desc" },
    { img: ritualWhisk, titleKey: "howStep3Title", descKey: "howStep3Desc" },
  ];

  const benefits = [
    { Icon: Percent, titleKey: "benefit1Title", descKey: "benefit1Desc" },
    { Icon: Truck, titleKey: "benefit2Title", descKey: "benefit2Desc" },
    { Icon: RefreshCw, titleKey: "benefit3Title", descKey: "benefit3Desc" },
  ];

  const faqs = [1, 2, 3, 4];

  return (
    <>
      <SEO
        title={t("subscriptions.seoTitle")}
        description={t("subscriptions.seoDescription")}
        canonical="/abonnementen"
        keywords={t("subscriptions.seoKeywords")}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3">
                {t("subscriptions.eyebrow")}
              </p>
              <h1 className="font-heading text-4xl md:text-6xl font-semibold leading-[1.05] mb-5">
                {t("subscriptions.title1")}<br />
                <span className="italic font-light">{t("subscriptions.title2")}</span>
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-md mb-8">
                {t("subscriptions.intro")}
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-3">
                {benefits.map(({ Icon, titleKey }) => (
                  <span key={titleKey} className="inline-flex items-center gap-2 text-sm text-foreground/80">
                    <Icon className="w-4 h-4 text-primary" strokeWidth={1.5} />
                    {t(`subscriptions.${titleKey}`)}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-card"
            >
              <img
                src={ritualWhisk}
                alt={t("subscriptions.howStep3Title")}
                className="w-full h-full object-cover"
                width={1200}
                height={1200}
                fetchPriority="high"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Plannen */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto items-start">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className={`relative rounded-2xl overflow-hidden ${
                  plan.popular
                    ? "bg-primary text-primary-foreground ring-2 ring-accent md:-mt-4 shadow-card"
                    : "bg-secondary"
                }`}
              >
                {plan.popular && (
                  <span className="absolute top-4 left-1/2 -translate-x-1/2 z-10 px-4 py-1 bg-accent text-accent-foreground text-[10px] font-bold tracking-widest uppercase rounded-full">
                    {t("subscriptions.mostPopular")}
                  </span>
                )}

                {/* Wat je krijgt - de productfoto zelf */}
                <div className={`relative aspect-[4/3] ${plan.popular ? "bg-primary-foreground/10" : "bg-background/60"}`}>
                  <img
                    src={plan.image}
                    alt={plan.description}
                    loading="lazy"
                    width={2000}
                    height={2000}
                    className="w-full h-full object-contain p-6"
                  />
                  {plan.quantity > 1 && (
                    <span className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-background/90 backdrop-blur text-foreground text-xs font-bold tracking-wide">
                      {plan.quantity}×
                    </span>
                  )}
                </div>

                <div className="p-7 pt-5">
                  <h3 className="font-heading text-2xl font-semibold mb-1">{plan.name}</h3>
                  <p className={`text-sm mb-5 leading-relaxed ${plan.popular ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                    {plan.description}
                  </p>

                  <div className="mb-6">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <span className="font-heading text-4xl font-semibold">{formatPrice(plan.price)}</span>
                      <span className={`text-sm ${plan.popular ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                        {t("subscriptions.perMonth")}
                      </span>
                    </div>
                    <p className={`text-xs mt-1.5 ${plan.popular ? "text-primary-foreground/50" : "text-muted-foreground/70"}`}>
                      <span className="line-through">{formatPrice(plan.originalPrice)}</span>
                      <span className={`ml-2 font-semibold ${plan.popular ? "text-accent" : "text-primary"}`}>
                        {t("subscriptions.saveBadge")}
                      </span>
                    </p>
                  </div>

                  <ul className="space-y-2.5 mb-7">
                    {plan.features.map(f => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.popular ? "text-accent" : "text-primary"}`} />
                        <span className={plan.popular ? "text-primary-foreground/85" : "text-foreground/80"}>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <PlanSignup plan={plan} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Zo werkt het */}
      <section className="py-20 md:py-24 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="mb-14">
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2">
              {t("subscriptions.howEyebrow")}
            </p>
            <div className="flex items-end gap-8">
              <h2 className="font-heading text-3xl md:text-5xl font-semibold shrink-0">
                {t("subscriptions.howTitle")}
              </h2>
              <span className="hidden md:block flex-1 h-px bg-border mb-3" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.titleKey}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.12, duration: 0.6 }}
              >
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-5 bg-background">
                  <img
                    src={step.img}
                    alt={t(`subscriptions.${step.titleKey}`)}
                    loading="lazy"
                    width={1200}
                    height={1200}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-3 left-3 w-9 h-9 rounded-full bg-background/90 backdrop-blur flex items-center justify-center font-heading text-base font-semibold text-primary">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-heading text-lg font-semibold mb-2">
                  {t(`subscriptions.${step.titleKey}`)}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t(`subscriptions.${step.descKey}`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Waarom */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold">
              {t("subscriptions.whyTitle")}
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {benefits.map(({ Icon, titleKey, descKey }, i) => (
              <motion.div
                key={titleKey}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="text-center"
              >
                <Icon className="w-7 h-7 mx-auto mb-4 text-primary" strokeWidth={1.25} />
                <h3 className="font-heading text-lg font-semibold mb-2">
                  {t(`subscriptions.${titleKey}`)}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t(`subscriptions.${descKey}`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <ScrollReveal className="mb-10">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold">
              {t("subscriptions.faqTitle")}
            </h2>
          </ScrollReveal>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map(n => (
              <AccordionItem key={n} value={`faq-${n}`}>
                <AccordionTrigger className="text-left font-heading text-lg">
                  {t(`subscriptions.faq${n}Q`)}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {t(`subscriptions.faq${n}A`)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-12 text-center">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all"
            >
              {t("subscriptions.browseShop")} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Subscriptions;
