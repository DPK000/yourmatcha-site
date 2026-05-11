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

export type Recipe = {
  slug: string;
  title: string;
  category: string;
  time: string;
  level: string;
  image: string;
  description: string;
  intro?: string;
  ingredients: string[];
  steps: string[];
};

export const recipes: Recipe[] = [
  {
    slug: "iced-matcha-latte",
    title: "Iced Matcha Latte",
    category: "Drinks",
    time: "5 min",
    level: "Eenvoudig",
    image: recipeIcedLatte,
    description: "De klassieke verfrissing — romig, koel, met een diepe matchasmaak.",
    intro: "Ons favoriete zomerrecept. De combinatie van vol-romige havermelk en pure ceremonial matcha geeft een prachtige tweelaagse latte.",
    ingredients: ["2 g matcha", "30 ml warm water (80°C)", "200 ml havermelk", "Handvol ijs", "Optioneel: 1 tl ahornsiroop"],
    steps: [
      "Zeef de matcha in een glas.",
      "Voeg het warme water toe en klop met een chasen tot schuimig.",
      "Vul een ander glas met ijs en havermelk.",
      "Giet de matcha langzaam over de melk voor het tweelaagse effect.",
      "Roer en geniet.",
    ],
  },
  {
    slug: "hot-matcha-latte",
    title: "Hot Matcha Latte",
    category: "Drinks",
    time: "5 min",
    level: "Eenvoudig",
    image: recipeHotLatte,
    description: "Warme troost in een kop — fluweelzacht met perfecte latte art.",
    ingredients: ["2 g ceremonial matcha", "60 ml water (80°C)", "200 ml warme havermelk", "Optioneel: honing"],
    steps: [
      "Zeef de matcha in een kom.",
      "Voeg water toe en klop met een chasen tot schuimig.",
      "Verwarm en schuim de havermelk op.",
      "Giet de matcha in een kop en voeg de melk langzaam toe.",
      "Werk af met een latte art patroon.",
    ],
  },
  {
    slug: "hojicha-oat-latte",
    title: "Hojicha Oat Latte",
    category: "Drinks",
    time: "5 min",
    level: "Eenvoudig",
    image: recipeHojichaLatte,
    description: "Geroosterd, nootachtig en zacht — de perfecte avondthee.",
    ingredients: ["2 g hojicha poeder", "30 ml heet water", "200 ml havermelk", "1 tl honing"],
    steps: [
      "Zeef hojicha in een kop.",
      "Voeg heet water toe en klop tot opgelost.",
      "Verwarm en schuim de havermelk.",
      "Combineer en zoet met honing naar smaak.",
    ],
  },
  {
    slug: "sparkling-matcha-tonic",
    title: "Sparkling Matcha Tonic",
    category: "Drinks",
    time: "3 min",
    level: "Eenvoudig",
    image: recipeTonic,
    description: "Bruisend, citrusachtig en verfrissend voor warme dagen.",
    ingredients: ["2 g matcha", "30 ml warm water", "150 ml tonic water", "Schijfje citroen", "IJsblokjes"],
    steps: [
      "Klop matcha en water tot schuimig.",
      "Vul een glas met ijs en tonic.",
      "Giet de matcha er voorzichtig overheen.",
      "Werk af met citroen.",
    ],
  },
  {
    slug: "matcha-smoothie-bowl",
    title: "Matcha Smoothie Bowl",
    category: "Ontbijt",
    time: "10 min",
    level: "Eenvoudig",
    image: recipeSmoothieBowl,
    description: "Een vibrant ontbijt vol antioxidanten en energie.",
    ingredients: ["1 bevroren banaan", "150 g bevroren mango", "1 tl matcha", "100 ml havermelk", "Topping: granola, kiwi, kokos"],
    steps: [
      "Mix banaan, mango, matcha en havermelk in een blender.",
      "Schep in een kom.",
      "Werk af met granola, kiwi en kokosrasp.",
    ],
  },
  {
    slug: "matcha-pancakes",
    title: "Matcha Pancakes",
    category: "Ontbijt",
    time: "20 min",
    level: "Eenvoudig",
    image: recipePancakes,
    description: "Fluffy pannenkoeken met een vrolijke groene twist.",
    ingredients: ["150 g bloem", "1 tl bakpoeder", "2 el matcha", "1 ei", "200 ml melk", "1 el suiker", "Boter om te bakken"],
    steps: [
      "Meng droge ingrediënten.",
      "Klop ei en melk erdoor tot een glad beslag.",
      "Bak kleine pannenkoekjes in boter, ca. 2 min per kant.",
      "Stapel en serveer met ahornsiroop.",
    ],
  },
  {
    slug: "matcha-overnight-oats",
    title: "Matcha Overnight Oats",
    category: "Ontbijt",
    time: "5 min + nacht",
    level: "Eenvoudig",
    image: recipeOats,
    description: "Bereid 's avonds — ontbijt klaar als je wakker wordt.",
    ingredients: ["50 g havermout", "150 ml havermelk", "1 tl matcha", "1 tl chiazaad", "1 tl ahornsiroop", "Topping naar keuze"],
    steps: [
      "Meng alle ingrediënten in een potje.",
      "Sluit en plaats minimaal 6 uur in de koelkast.",
      "Werk 's ochtends af met fruit en noten.",
    ],
  },
  {
    slug: "matcha-energy-bites",
    title: "Matcha Energy Bites",
    category: "Snacks",
    time: "15 min",
    level: "Eenvoudig",
    image: recipeEnergyBites,
    description: "Natuurlijk zoet, vol focus en pure energie.",
    ingredients: ["150 g dadels", "100 g cashewnoten", "2 el matcha (culinary)", "1 el kokosolie", "Snufje zout", "Kokosrasp"],
    steps: [
      "Doe alle ingrediënten in een keukenmachine.",
      "Mix tot een kleverige massa.",
      "Rol kleine balletjes en haal door de kokosrasp.",
      "Bewaar koel.",
    ],
  },
  {
    slug: "matcha-cookies",
    title: "Matcha Cookies",
    category: "Bakken",
    time: "30 min",
    level: "Medium",
    image: recipeMatchaCookies,
    description: "Knapperig, smelten met witte chocolade.",
    ingredients: ["180 g bloem", "100 g boter", "100 g rietsuiker", "1 ei", "2 el matcha (culinary)", "100 g witte chocolade"],
    steps: [
      "Verwarm de oven voor op 180°C.",
      "Mix boter en suiker romig. Voeg ei toe.",
      "Spatel bloem en matcha erdoor.",
      "Voeg witte chocolade toe.",
      "Schep hoopjes op een bakplaat en bak 12 minuten.",
    ],
  },
  {
    slug: "matcha-brownies",
    title: "Matcha Brownies",
    category: "Bakken",
    time: "40 min",
    level: "Medium",
    image: recipeBrownies,
    description: "Fudgy met witte chocolade — onweerstaanbaar.",
    ingredients: ["200 g witte chocolade", "100 g boter", "2 eieren", "120 g suiker", "150 g bloem", "3 el matcha", "Snufje zout"],
    steps: [
      "Smelt witte chocolade en boter au bain-marie.",
      "Klop eieren en suiker tot luchtig.",
      "Spatel chocolademengsel, bloem en matcha erdoor.",
      "Bak 25 min op 170°C in een ingevette vorm.",
      "Laat afkoelen voor het snijden.",
    ],
  },
  {
    slug: "matcha-cheesecake",
    title: "Matcha Cheesecake",
    category: "Desserts",
    time: "45 min + koelen",
    level: "Medium",
    image: recipeCheesecake,
    description: "Romig, elegant en perfect voor speciale gelegenheden.",
    ingredients: ["200 g biscuit", "100 g boter", "500 g roomkaas", "150 g suiker", "200 ml slagroom", "3 el matcha", "10 g gelatine"],
    steps: [
      "Maak een bodem van vermalen biscuit en gesmolten boter.",
      "Mix roomkaas, suiker en matcha.",
      "Klop slagroom en spatel erdoor met opgeloste gelatine.",
      "Verdeel over de bodem en koel minimaal 4 uur.",
    ],
  },
  {
    slug: "matcha-tiramisu",
    title: "Matcha Tiramisu",
    category: "Desserts",
    time: "30 min + koelen",
    level: "Medium",
    image: recipeTiramisu,
    description: "Italiaanse klassieker met een Japanse twist.",
    ingredients: ["250 g mascarpone", "3 eieren", "80 g suiker", "200 ml sterke matcha", "200 g lange vingers", "Matcha om te bestuiven"],
    steps: [
      "Splits eieren. Mix dooiers met suiker tot bleek.",
      "Roer mascarpone erdoor.",
      "Klop eiwitten stijf en spatel erdoor.",
      "Doop lange vingers in matcha en laag ze op met crème.",
      "Koel 4 uur en bestuif met matcha.",
    ],
  },
  {
    slug: "matcha-mochi",
    title: "Matcha Mochi",
    category: "Desserts",
    time: "60 min",
    level: "Gevorderd",
    image: recipeMochi,
    description: "Zachte rijst-bolletjes met witte chocolade vulling.",
    ingredients: ["200 g kleefrijstmeel", "60 g suiker", "2 el matcha", "300 ml water", "Witte chocolade voor vulling", "Maizena om te stuiven"],
    steps: [
      "Meng kleefrijstmeel, suiker, matcha en water.",
      "Stoom 20 min tot een glanzend deeg.",
      "Bestuif met maizena en rol uit.",
      "Vul met witte chocolade en sluit af tot bolletjes.",
    ],
  },
  {
    slug: "matcha-ice-cream",
    title: "Matcha Ice Cream",
    category: "Desserts",
    time: "20 min + vriezen",
    level: "Medium",
    image: recipeIcecream,
    description: "Romig, intens en eindeloos verslavend.",
    ingredients: ["400 ml slagroom", "200 ml gecondenseerde melk", "3 el matcha", "Snufje zout"],
    steps: [
      "Klop slagroom stijf.",
      "Meng matcha door de gecondenseerde melk.",
      "Spatel beide voorzichtig samen.",
      "Vries minimaal 6 uur in.",
    ],
  },
];

export const getRecipeBySlug = (slug: string) => recipes.find((r) => r.slug === slug);
