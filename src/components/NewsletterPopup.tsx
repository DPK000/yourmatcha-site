import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles } from "lucide-react";
import { toast } from "sonner";

const STORAGE_KEY = "yourmatcha-newsletter-popup";

const NewsletterPopup = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");

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

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    toast.success("Welkom bij YourMatcha — check je inbox voor je code 🍵");
    localStorage.setItem(STORAGE_KEY, "1");
    localStorage.setItem("yourmatcha-discount", "MATCHA10");
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
            className="fixed left-1/2 top-1/2 z-[61] w-[92%] max-w-md -translate-x-1/2 -translate-y-1/2 bg-background rounded-2xl shadow-elevated overflow-hidden"
          >
            <button
              onClick={close}
              aria-label="Sluiten"
              className="absolute top-3 right-3 p-1.5 text-muted-foreground hover:text-foreground transition-colors z-10"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="bg-primary text-primary-foreground py-8 px-8 text-center">
              <Sparkles className="w-8 h-8 mx-auto mb-3 text-accent" />
              <p className="text-[10px] tracking-[0.3em] uppercase text-primary-foreground/70 mb-2">
                Welkomstcadeau
              </p>
              <h3 className="font-heading text-3xl font-light leading-tight">
                10% korting<br />
                <span className="italic">op je eerste bestelling</span>
              </h3>
            </div>
            <form onSubmit={submit} className="p-8 space-y-4">
              <p className="text-sm text-muted-foreground text-center leading-relaxed">
                Word lid van de YourMatcha community en ontvang exclusieve recepten, nieuwe producten en een welkomstcode.
              </p>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Je e-mailadres"
                className="w-full px-4 py-3 rounded-full border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <button
                type="submit"
                className="w-full py-3 bg-primary text-primary-foreground text-sm font-bold tracking-widest uppercase rounded-full hover:opacity-90 transition-opacity"
              >
                Claim je 10% korting
              </button>
              <button
                type="button"
                onClick={close}
                className="w-full text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Nee bedankt
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NewsletterPopup;
