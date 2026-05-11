import { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Clock, ChefHat, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const slugify = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

import recipeIcedLatte from "@/assets/recipe-iced-latte.jpg";
import recipeEnergyBites from "@/assets/recipe-energy-bites.jpg";
import recipeMatchaCookies from "@/assets/recipe-matcha-cookies.jpg";
import recipeHojichaLatte from "@/assets/recipe-hojicha-latte.jpg";
import recipeTiramisu from "@/assets/recipe-matcha-tiramisu.jpg";
import recipePancakes from "@/assets/recipe-matcha-pancakes.jpg";
import recipeSmoothieBowl from "@/assets/recipe-matcha-smoothie-bowl.jpg";
import recipeCheesecake from "@/assets/recipe-matcha-cheesecake.jpg";
import recipeIcecream from "@/assets/recipe-matcha-icecream.jpg";
import recipeHotLatte from "@/assets/recipe-matcha-hotlatte.jpg";
import recipeMochi from "@/assets/recipe-matcha-mochi.jpg";
import recipeOats from "@/assets/recipe-matcha-oats.jpg";
import recipeTonic from "@/assets/recipe-matcha-tonic.jpg";
import recipeBrownies from "@/assets/recipe-matcha-brownies.jpg";

type Recipe = {
  title: string;
  category: string;
  time: string;
  level: string;
  image: string;
  description: string;
};

const recipes: Recipe[] = [
  { title: "Iced Matcha Latte", category: "Drinks", time: "5 min", level: "Eenvoudig", image: recipeIcedLatte, description: "De klassieke verfrissing — romig, koel, met een diepe matchasmaak." },
  { title: "Hot Matcha Latte", category: "Drinks", time: "5 min", level: "Eenvoudig", image: recipeHotLatte, description: "Warme troost in een kop — fluweelzacht met perfecte latte art." },
  { title: "Hojicha Oat Latte", category: "Drinks", time: "5 min", level: "Eenvoudig", image: recipeHojichaLatte, description: "Geroosterd, nootachtig en zacht — de perfecte avondthee." },
  { title: "Sparkling Matcha Tonic", category: "Drinks", time: "3 min", level: "Eenvoudig", image: recipeTonic, description: "Bruisend, citrusachtig en verfrissend voor warme dagen." },
  { title: "Matcha Smoothie Bowl", category: "Ontbijt", time: "10 min", level: "Eenvoudig", image: recipeSmoothieBowl, description: "Een vibrant ontbijt vol antioxidanten en energie." },
  { title: "Matcha Pancakes", category: "Ontbijt", time: "20 min", level: "Eenvoudig", image: recipePancakes, description: "Fluffy pannenkoeken met een vrolijke groene twist." },
  { title: "Matcha Overnight Oats", category: "Ontbijt", time: "5 min + nacht", level: "Eenvoudig", image: recipeOats, description: "Bereid 's avonds — ontbijt klaar als je wakker wordt." },
  { title: "Energy Bites", category: "Snacks", time: "15 min", level: "Eenvoudig", image: recipeEnergyBites, description: "Natuurlijk zoet, vol focus en pure energie." },
  { title: "Matcha Cookies", category: "Bakken", time: "30 min", level: "Medium", image: recipeMatchaCookies, description: "Knapperig, smelten met witte chocolade." },
  { title: "Matcha Brownies", category: "Bakken", time: "40 min", level: "Medium", image: recipeBrownies, description: "Fudgy met witte chocolade — onweerstaanbaar." },
  { title: "Matcha Cheesecake", category: "Desserts", time: "45 min + koelen", level: "Medium", image: recipeCheesecake, description: "Romig, elegant en perfect voor speciale gelegenheden." },
  { title: "Matcha Tiramisu", category: "Desserts", time: "30 min + koelen", level: "Medium", image: recipeTiramisu, description: "Italiaanse klassieker met een Japanse twist." },
  { title: "Matcha Mochi", category: "Desserts", time: "60 min", level: "Gevorderd", image: recipeMochi, description: "Zachte rijst-bolletjes met witte chocolade vulling." },
  { title: "Matcha Ice Cream", category: "Desserts", time: "20 min + vriezen", level: "Medium", image: recipeIcecream, description: "Romig, intens en eindeloos verslavend." },
];

const RecipeSwiper = () => {
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
            <p className="text-[10px] tracking-[0.3em] uppercase text-primary mb-3">Receptenbibliotheek</p>
            <h2 className="font-heading text-3xl md:text-5xl font-semibold leading-tight max-w-2xl">
              Swipe door 14 matcha-creaties
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl">
              Van romige latte tot fudgy brownies — ontdek hoe veelzijdig matcha echt is.
            </p>
          </div>
          <div className="hidden md:flex gap-2">
            <button
              onClick={() => emblaApi?.scrollPrev()}
              disabled={!canPrev}
              aria-label="Vorige recept"
              className="w-12 h-12 rounded-full border border-border bg-background hover:bg-primary hover:text-primary-foreground transition-all disabled:opacity-30 flex items-center justify-center"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => emblaApi?.scrollNext()}
              disabled={!canNext}
              aria-label="Volgende recept"
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
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-muted shadow-sm group-hover:shadow-2xl transition-all duration-500">
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
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                    <h3 className="font-heading text-2xl font-semibold mb-2 leading-tight">{r.title}</h3>
                    <p className="text-sm text-white/85 line-clamp-2 mb-4">{r.description}</p>
                    <div className="flex items-center gap-4 text-[11px] tracking-wider uppercase text-white/90">
                      <span className="inline-flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {r.time}</span>
                      <span className="inline-flex items-center gap-1.5"><ChefHat className="w-3.5 h-3.5" /> {r.level}</span>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6 md:hidden">← swipe voor meer recepten →</p>
      </div>
    </section>
  );
};

export default RecipeSwiper;
