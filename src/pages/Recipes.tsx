import PageHero from "@/components/PageHero";
import ScrollReveal from "@/components/ScrollReveal";
import RecipeSwiper from "@/components/RecipeSwiper";
import { Link } from "react-router-dom";
import { Clock, ArrowRight } from "lucide-react";
import recipeIcedLatte from "@/assets/recipe-iced-latte.jpg";
import recipeEnergyBites from "@/assets/recipe-energy-bites.jpg";
import recipeMatchaCookies from "@/assets/recipe-matcha-cookies.jpg";
import recipeHojichaLatte from "@/assets/recipe-hojicha-latte.jpg";

const recipes = [
  {
    title: "Klassieke Iced Matcha Latte",
    time: "5 min",
    level: "Eenvoudig",
    image: recipeIcedLatte,
    ingredients: ["2 g matcha", "30 ml warm water (80°C)", "200 ml havermelk", "Handvol ijs", "Optioneel: 1 tl ahornsiroop"],
    steps: ["Zeef de matcha in een glas.", "Voeg het warme water toe en klop met een chasen tot schuimig.", "Vul een ander glas met ijs en havermelk.", "Giet de matcha langzaam over de melk voor het tweelaagse effect.", "Roer en geniet."],
  },
  {
    title: "Matcha Energy Bites",
    time: "15 min",
    level: "Eenvoudig",
    image: recipeEnergyBites,
    ingredients: ["150 g dadels", "100 g cashewnoten", "2 el matcha (culinary)", "1 el kokosolie", "Snufje zout", "Kokosrasp (om te rollen)"],
    steps: ["Doe alle ingrediënten in een keukenmachine.", "Mix tot een kleverige massa.", "Rol kleine balletjes en haal door de kokosrasp.", "Bewaar koel — perfecte snack voor onderweg."],
  },
  {
    title: "Matcha & Witte Chocolade Cookies",
    time: "30 min",
    level: "Medium",
    image: recipeMatchaCookies,
    ingredients: ["180 g bloem", "100 g boter", "100 g rietsuiker", "1 ei", "2 el matcha (culinary)", "100 g witte chocolade in stukjes"],
    steps: ["Verwarm de oven voor op 180°C.", "Mix boter en suiker romig. Voeg ei toe.", "Spatel bloem en matcha er door.", "Voeg de witte chocolade toe.", "Schep hoopjes op een bakplaat en bak 12 minuten."],
  },
  {
    title: "Hojicha Oat Latte",
    time: "5 min",
    level: "Eenvoudig",
    image: recipeHojichaLatte,
    ingredients: ["2 g hojicha poeder", "30 ml heet water", "200 ml havermelk", "1 tl honing"],
    steps: ["Zeef hojicha in een kop.", "Voeg heet water toe en klop tot opgelost.", "Verwarm en schuim de havermelk.", "Combineer en zoet met honing naar smaak."],
  },
];

const Recipes = () => (
  <>
    <PageHero
      eyebrow="Recepten"
      title="Maak het zelf"
      subtitle="Onze favoriete recepten — van klassieke bereidingen tot moderne creaties met matcha en hojicha."
    />
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl space-y-20">
        {recipes.map((r, idx) => (
          <ScrollReveal key={r.title}>
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-10 items-center ${idx % 2 === 1 ? "md:[&>div:first-child]:order-2" : ""}`}>
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-secondary">
                <img src={r.image} alt={r.title} loading="lazy" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
              <div>
                <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-3 flex items-center gap-3">
                  <Clock className="w-3 h-3" /> {r.time} · {r.level}
                </p>
                <h2 className="font-heading text-3xl md:text-4xl font-semibold mb-5">{r.title}</h2>
                <h3 className="text-sm font-semibold uppercase tracking-wider mb-2">Ingrediënten</h3>
                <ul className="text-sm text-muted-foreground space-y-1 mb-5 list-disc pl-5">
                  {r.ingredients.map(i => <li key={i}>{i}</li>)}
                </ul>
                <h3 className="text-sm font-semibold uppercase tracking-wider mb-2">Bereiding</h3>
                <ol className="text-sm text-muted-foreground space-y-2 list-decimal pl-5">
                  {r.steps.map(s => <li key={s} className="leading-relaxed">{s}</li>)}
                </ol>
              </div>
            </div>
          </ScrollReveal>
        ))}

        <div className="text-center pt-10 border-t border-border">
          <p className="text-muted-foreground mb-5">Wil je nog meer recepten? Ontdek ons receptenboek.</p>
          <Link to="/product/the-matcha-ritual-book" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3.5 rounded-full text-sm font-bold tracking-wide uppercase hover:scale-105 transition-transform">
            The Matcha Ritual <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  </>
);

export default Recipes;
