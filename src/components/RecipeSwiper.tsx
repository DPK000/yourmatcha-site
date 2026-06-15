import { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Clock, ChefHat, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

import { recipes } from "@/data/recipes";
import { useLang } from "@/i18n";

const COPY = {
  nl: {
    eyebrow: "Receptenbibliotheek",
    title: "Swipe door 14 matcha-creaties",
    subtitle: "Van romige latte tot fudgy brownies — ontdek hoe veelzijdig matcha echt is.",
    prevAria: "Vorige recept",
    nextAria: "Volgende recept",
    viewAria: "Bekijk recept:",
    swipeHint: "← swipe voor meer recepten →",
  },
  no: {
    eyebrow: "Oppskriftsbibliotek",
    title: "Sveip gjennom 14 matcha-kreasjoner",
    subtitle: "Fra kremet latte til fudgy brownies — oppdag hvor allsidig matcha egentlig er.",
    prevAria: "Forrige oppskrift",
    nextAria: "Neste oppskrift",
    viewAria: "Se oppskrift:",
    swipeHint: "← sveip for flere oppskrifter →",
  },
} as const;

const RecipeSwiper = () => {
  const lang = useLang();
  const c = lang === "no" ? COPY.no : COPY.nl;
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    dragFree: true,
  });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="py-20 bg-secondary/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10 gap-4">
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-primary mb-3">{c.eyebrow}</p>
            <h2 className="font-heading text-3xl md:text-5xl font-semibold leading-tight max-w-2xl">
              {c.title}
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl">
              {c.subtitle}
            </p>
          </div>
          <div className="hidden md:flex gap-2">
            <button
              onClick={() => emblaApi?.scrollPrev()}
              disabled={!canPrev}
              aria-label={c.prevAria}
              className="w-12 h-12 rounded-full border border-border bg-background hover:bg-primary hover:text-primary-foreground transition-all disabled:opacity-30 flex items-center justify-center"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => emblaApi?.scrollNext()}
              disabled={!canNext}
              aria-label={c.nextAria}
              className="w-12 h-12 rounded-full border border-border bg-background hover:bg-primary hover:text-primary-foreground transition-all disabled:opacity-30 flex items-center justify-center"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="overflow-hidden -mx-4 px-4" ref={emblaRef}>
          <div className="flex gap-5">
            {recipes.map((r, i) => (
              <motion.article
                key={r.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (i % 5) * 0.05 }}
                className="group flex-[0_0_85%] sm:flex-[0_0_55%] md:flex-[0_0_38%] lg:flex-[0_0_28%] min-w-0"
              >
                <Link
                  to={`/recepten/${r.slug}`}
                  aria-label={`${c.viewAria} ${r.title}`}
                  className="block relative aspect-[4/5] rounded-3xl overflow-hidden bg-muted shadow-sm group-hover:shadow-2xl transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  <img
                    src={r.image}
                    alt={r.title}
                    loading="lazy"
                    width={1024}
                    height={1280}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.2s] ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 text-[10px] tracking-[0.2em] uppercase bg-background/90 backdrop-blur rounded-full text-foreground font-semibold">
                      {r.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/90 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4 text-foreground" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                    <h3 className="font-heading text-2xl font-semibold mb-2 leading-tight">{r.title}</h3>
                    <p className="text-sm text-white/85 line-clamp-2 mb-4">{r.description}</p>
                    <div className="flex items-center gap-4 text-[11px] tracking-wider uppercase text-white/90">
                      <span className="inline-flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {r.time}</span>
                      <span className="inline-flex items-center gap-1.5"><ChefHat className="w-3.5 h-3.5" /> {r.level}</span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6 md:hidden">{c.swipeHint}</p>
      </div>
    </section>
  );
};

export default RecipeSwiper;
