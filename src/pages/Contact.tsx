import { useState } from "react";
import { Mail, MapPin, Instagram, Phone, Send } from "lucide-react";
import { toast } from "sonner";
import PageHero from "@/components/PageHero";
import ScrollReveal from "@/components/ScrollReveal";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Bedankt! We reageren binnen 1 werkdag 🍵");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Laat van je horen"
        subtitle="Vragen over een product, bestelling of samenwerking? We helpen je graag persoonlijk verder."
      />
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl">
          <ScrollReveal className="space-y-8">
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-3">Klantenservice</p>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3"><Mail className="w-4 h-4 mt-0.5 text-primary" /> info@yourmatcha.nl</li>
                <li className="flex items-start gap-3"><Phone className="w-4 h-4 mt-0.5 text-primary" /> +31 (0)20 123 45 67</li>
                <li className="flex items-start gap-3"><MapPin className="w-4 h-4 mt-0.5 text-primary" /> Keizersgracht 123<br />1015 CJ Amsterdam</li>
                <li className="flex items-start gap-3"><Instagram className="w-4 h-4 mt-0.5 text-primary" /> @yourmatcha</li>
              </ul>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-3">Openingstijden</p>
              <p className="text-sm text-muted-foreground">Ma–Vr · 09:00 – 17:30<br />Za · 10:00 – 16:00<br />Zo · gesloten</p>
            </div>
          </ScrollReveal>

          <ScrollReveal className="md:col-span-2">
            <form onSubmit={submit} className="bg-secondary rounded-2xl p-8 md:p-10 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Je naam" className="px-4 py-3 rounded-full border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                <input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="E-mailadres" className="px-4 py-3 rounded-full border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              <input value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} placeholder="Onderwerp" className="w-full px-4 py-3 rounded-full border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              <textarea required rows={6} value={form.message} onChange={e => setForm({...form, message: e.target.value})} placeholder="Je bericht…" className="w-full px-4 py-3 rounded-2xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
              <button type="submit" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3.5 rounded-full text-sm font-bold tracking-wide uppercase hover:scale-105 transition-transform">
                <Send className="w-4 h-4" /> Verstuur bericht
              </button>
            </form>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
};

export default Contact;
