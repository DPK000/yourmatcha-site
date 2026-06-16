import { useState } from "react";
import { Mail, MapPin, Instagram, Phone, Send } from "lucide-react";
import { toast } from "sonner";
import PageHero from "@/components/PageHero";
import ScrollReveal from "@/components/ScrollReveal";
import SEO from "@/components/SEO";
import { useLang } from "@/i18n";

const COPY = {
  nl: {
    toast: "Bedankt! We reageren binnen 1 werkdag",
    seoTitle: "Contact — Vragen over matcha of je bestelling? We helpen je",
    seoDescription:
      "Neem contact op met YourMatcha — bereikbaar via e-mail, telefoon en Instagram. We reageren binnen 1 werkdag op vragen over matcha, bestellingen of samenwerkingen.",
    heroEyebrow: "Contact",
    heroTitle: "Laat van je horen",
    heroSubtitle: "Vragen over een product, bestelling of samenwerking? We helpen je graag persoonlijk verder.",
    serviceLabel: "Klantenservice",
    hoursLabel: "Openingstijden",
    hoursLine1: "Ma–Vr · 09:00 – 17:30",
    hoursLine2: "Za · 10:00 – 16:00",
    hoursLine3: "Zo · gesloten",
    namePlaceholder: "Je naam",
    emailPlaceholder: "E-mailadres",
    subjectPlaceholder: "Onderwerp",
    messagePlaceholder: "Je bericht…",
    submit: "Verstuur bericht",
  },
  no: {
    toast: "Tusen takk! Vi svarer deg innen 1 virkedag",
    seoTitle: "Kontakt — Spørsmål om matcha eller bestillingen din? Vi hjelper deg",
    seoDescription:
      "Ta kontakt med YourMatcha — vi er tilgjengelige på e-post, telefon og Instagram. Vi svarer innen 1 virkedag på spørsmål om matcha, bestillinger eller samarbeid.",
    heroEyebrow: "Kontakt",
    heroTitle: "Vi hører gjerne fra deg",
    heroSubtitle: "Lurer du på noe om et produkt, en bestilling eller et samarbeid? Vi hjelper deg gjerne personlig.",
    serviceLabel: "Kundeservice",
    hoursLabel: "Åpningstider",
    hoursLine1: "Man–fre · 09:00 – 17:30",
    hoursLine2: "Lør · 10:00 – 16:00",
    hoursLine3: "Søn · stengt",
    namePlaceholder: "Navnet ditt",
    emailPlaceholder: "E-postadresse",
    subjectPlaceholder: "Emne",
    messagePlaceholder: "Meldingen din …",
    submit: "Send melding",
  },
};

const Contact = () => {
  const lang = useLang();
  const c = COPY[lang === "no" ? "no" : "nl"];
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(c.toast);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <>
      <SEO
        title={c.seoTitle}
        description={c.seoDescription}
        canonical="/contact"
      />
      <PageHero
        eyebrow={c.heroEyebrow}
        title={c.heroTitle}
        subtitle={c.heroSubtitle}
      />
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl">
          <ScrollReveal className="space-y-8">
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-3">{c.serviceLabel}</p>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3"><Mail className="w-4 h-4 mt-0.5 text-primary" /> info@yourmatcha.nl</li>
                <li className="flex items-start gap-3"><Phone className="w-4 h-4 mt-0.5 text-primary" /> +31 (0)20 123 45 67</li>
                <li className="flex items-start gap-3"><MapPin className="w-4 h-4 mt-0.5 text-primary" /> Keizersgracht 123<br />1015 CJ Amsterdam</li>
                <li className="flex items-start gap-3"><Instagram className="w-4 h-4 mt-0.5 text-primary" /> @yourmatcha</li>
              </ul>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-3">{c.hoursLabel}</p>
              <p className="text-sm text-muted-foreground">{c.hoursLine1}<br />{c.hoursLine2}<br />{c.hoursLine3}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal className="md:col-span-2">
            <form onSubmit={submit} className="bg-secondary rounded-2xl p-8 md:p-10 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder={c.namePlaceholder} className="px-4 py-3 rounded-full border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                <input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder={c.emailPlaceholder} className="px-4 py-3 rounded-full border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              <input value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} placeholder={c.subjectPlaceholder} className="w-full px-4 py-3 rounded-full border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              <textarea required rows={6} value={form.message} onChange={e => setForm({...form, message: e.target.value})} placeholder={c.messagePlaceholder} className="w-full px-4 py-3 rounded-2xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
              <button type="submit" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3.5 rounded-full text-sm font-bold tracking-wide uppercase hover:scale-105 transition-transform">
                <Send className="w-4 h-4" /> {c.submit}
              </button>
            </form>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
};

export default Contact;
