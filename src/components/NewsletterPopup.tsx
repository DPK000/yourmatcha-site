import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { useLang } from "@/i18n";
import { subscribeToNewsletter } from "@/lib/newsletter";
import { useCart } from "@/context/CartContext";

const STORAGE_KEY = "yourmatcha-newsletter-popup";

const COPY = {
  nl: {
    toastSuccess: "Welkom bij YourMatcha — je korting staat klaar in je winkelwagen",
    toastError: "Inschrijven lukte niet — probeer het later opnieuw",
    closeAria: "Sluiten",
    eyebrow: "Welkomstcadeau",
    headingTop: "10% korting",
    headingBottom: "op je eerste bestelling",
    body: "Word lid van de YourMatcha community en ontvang exclusieve recepten, nieuwe producten en een welkomstcode.",
    emailPlaceholder: "Je e-mailadres",
    submit: "Claim je 10% korting",
    decline: "Nee bedankt",
  },
  no: {
    toastSuccess: "Velkommen til YourMatcha — rabatten ligger klar i handlekurven",
    toastError: "Påmeldingen mislyktes — prøv igjen senere",
    closeAria: "Lukk",
    eyebrow: "Velkomstgave",
    headingTop: "10 % rabatt",
    headingBottom: "på din første bestilling",
    body: "Bli med i YourMatcha-fellesskapet og få eksklusive oppskrifter, produktnyheter og en velkomstkode.",
    emailPlaceholder: "Din e-postadresse",
    submit: "Få 10 % rabatt",
    decline: "Nei takk",
  },
} as const;

const NewsletterPopup = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const lang = useLang();
  const c = lang === "no" ? COPY.no : COPY.nl;
  const { applyDiscount } = useCart();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem(STORAGE_KEY)) return;
    const t = setTimeout(() => setOpen(true), 12000);
    const onLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !localStorage.getItem(STORAGE_KEY)) setOpen(true);
    };
    document.addEventListener("mouseleave", onLeave);
    return () => {
      clearTimeout(t);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const close = () => {
    setOpen(false);
    localStorage.setItem(STORAGE_KEY, "1");
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || submitting) return;
    setSubmitting(true);
    const ok = await subscribeToNewsletter(email, "popup");
    setSubmitting(false);
    if (!ok) {
      toast.error(c.toastError);
      return;
    }
    toast.success(c.toastSuccess);
    localStorage.setItem(STORAGE_KEY, "1");
    // Welkomstkorting meteen op de winkelwagen zetten (code staat ook in discount_codes)
    applyDiscount({ code: "MATCHA10", type: "percentage", value: 10, minOrder: 0 });
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-foreground/40 backdrop-blur-sm"
            onClick={close}
          />
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed left-1/2 top-1/2 z-[61] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 bg-background rounded-2xl shadow-elevated overflow-hidden"
          >
            <button
              onClick={close}
              aria-label={c.closeAria}
              className="absolute top-3 right-3 p-1.5 text-muted-foreground hover:text-foreground transition-colors z-10"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="bg-primary text-primary-foreground py-6 px-5 sm:py-8 sm:px-8 text-center">
              <Sparkles className="w-7 h-7 sm:w-8 sm:h-8 mx-auto mb-3 text-accent" />
              <p className="text-[10px] tracking-[0.3em] uppercase text-primary-foreground/70 mb-2">
                {c.eyebrow}
              </p>
              <h3 className="font-heading text-2xl sm:text-3xl font-light leading-tight">
                {c.headingTop}<br />
                <span className="italic">{c.headingBottom}</span>
              </h3>
            </div>
            <form onSubmit={submit} className="p-5 sm:p-8 space-y-4">
              <p className="text-sm text-muted-foreground text-center leading-relaxed">
                {c.body}
              </p>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder={c.emailPlaceholder}
                className="w-full px-4 py-3 rounded-full border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 bg-primary text-primary-foreground text-sm font-bold tracking-widest uppercase rounded-full hover:opacity-90 transition-opacity disabled:opacity-60"
              >
                {c.submit}
              </button>
              <button
                type="button"
                onClick={close}
                className="w-full text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                {c.decline}
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NewsletterPopup;
