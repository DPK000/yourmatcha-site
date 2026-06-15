import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { type Lang, getCurrentLang } from "@/i18n";
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
import recipeAffogato from "@/assets/recipe-matcha-affogato.jpg";
import recipeChiaPudding from "@/assets/recipe-matcha-chia-pudding.jpg";
import recipeWaffles from "@/assets/recipe-matcha-waffles.jpg";
import recipeGranola from "@/assets/recipe-matcha-granola.jpg";
import recipeFrenchToast from "@/assets/recipe-matcha-french-toast.jpg";
import recipeStrawberryLatte from "@/assets/recipe-matcha-strawberry-latte.jpg";
import recipeEspressoTonic from "@/assets/recipe-matcha-espresso-tonic.jpg";
import recipeLemonade from "@/assets/recipe-matcha-lemonade.jpg";
import recipeHotChocolate from "@/assets/recipe-matcha-hot-chocolate.jpg";
import recipeBubbleTea from "@/assets/recipe-matcha-bubble-tea.jpg";
import recipeYogurtBowl from "@/assets/recipe-matcha-yogurt-bowl.jpg";
import recipeTruffles from "@/assets/recipe-matcha-truffles.jpg";
import recipePopcorn from "@/assets/recipe-matcha-popcorn.jpg";
import recipeMacarons from "@/assets/recipe-matcha-macarons.jpg";
import recipeMadeleines from "@/assets/recipe-matcha-madeleines.jpg";
import recipeBananaBread from "@/assets/recipe-matcha-banana-bread.jpg";
import recipeScones from "@/assets/recipe-matcha-scones.jpg";
import recipeCroissants from "@/assets/recipe-matcha-croissants.jpg";
import recipeCremeBrulee from "@/assets/recipe-matcha-creme-brulee.jpg";
import recipePannaCotta from "@/assets/recipe-matcha-panna-cotta.jpg";

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

interface RecipeTranslation {
  title?: string;
  category?: string;
  level?: string;
  description?: string;
  intro?: string;
  ingredients?: string[];
  steps?: string[];
}

interface RawRecipe extends Recipe {
  i18n?: Partial<Record<Exclude<Lang, "nl">, RecipeTranslation>>;
}

function localize(r: RawRecipe, lang: Lang): Recipe {
  const { i18n: tr, ...base } = r;
  if (lang === "nl" || !tr) return base;
  const t = tr[lang];
  if (!t) return base;
  return {
    ...base,
    title: t.title ?? base.title,
    category: t.category ?? base.category,
    level: t.level ?? base.level,
    description: t.description ?? base.description,
    intro: t.intro ?? base.intro,
    ingredients: t.ingredients ?? base.ingredients,
    steps: t.steps ?? base.steps,
  };
}

const recipesRaw: RawRecipe[] = [
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
    i18n: {
      de: {
        title: "Iced Matcha Latte",
        category: "Getränke",
        level: "Einfach",
        description: "Die klassische Erfrischung — cremig, kühl, mit tiefem Matcha-Geschmack.",
        intro: "Unser Lieblingsrezept für den Sommer. Die Kombination aus vollmundiger Hafermilch und purem Ceremonial Matcha ergibt eine wunderschöne zweischichtige Latte.",
        ingredients: ["2 g Matcha", "30 ml warmes Wasser (80°C)", "200 ml Hafermilch", "Eine Handvoll Eis", "Optional: 1 TL Ahornsirup"],
        steps: [
          "Siebe den Matcha in ein Glas.",
          "Gib das warme Wasser hinzu und schlage mit einem Chasen schaumig.",
          "Fülle ein anderes Glas mit Eis und Hafermilch.",
          "Gieße den Matcha langsam über die Milch für den zweischichtigen Effekt.",
          "Umrühren und genießen.",
        ],
      },
      no: {
        title: "Iced Matcha Latte",
        category: "Drikker",
        level: "Enkel",
        description: "Den klassiske forfriskningen — kremet, kjølig og med dyp matchasmak.",
        intro: "Vår sommerfavoritt. Kombinasjonen av fyldig havremelk og ren ceremonial matcha gir en nydelig tolags latte.",
        ingredients: ["2 g matcha", "30 ml varmt vann (80°C)", "200 ml havremelk", "En håndfull isbiter", "Valgfritt: 1 ts lønnesirup"],
        steps: [
          "Sikt matchaen i et glass.",
          "Tilsett det varme vannet og visp med en chasen til det skummer.",
          "Fyll et annet glass med is og havremelk.",
          "Hell matchaen sakte over melken for å få det lagdelte uttrykket.",
          "Rør om og nyt.",
        ],
      },
    },
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
    i18n: {
      de: {
        title: "Hot Matcha Latte",
        category: "Getränke",
        level: "Einfach",
        description: "Warmer Trost in einer Tasse — samtweich mit perfekter Latte Art.",
        ingredients: ["2 g Ceremonial Matcha", "60 ml Wasser (80°C)", "200 ml warme Hafermilch", "Optional: Honig"],
        steps: [
          "Siebe den Matcha in eine Schale.",
          "Gib Wasser hinzu und schlage mit einem Chasen schaumig.",
          "Erhitze und schäume die Hafermilch auf.",
          "Gieße den Matcha in eine Tasse und füge langsam die Milch hinzu.",
          "Verziere mit einem Latte-Art-Muster.",
        ],
      },
      no: {
        title: "Hot Matcha Latte",
        category: "Drikker",
        level: "Enkel",
        description: "Varm trøst i en kopp — fløyelsmyk med perfekt latte art.",
        ingredients: ["2 g ceremonial matcha", "60 ml vann (80°C)", "200 ml varm havremelk", "Valgfritt: honning"],
        steps: [
          "Sikt matchaen i en bolle.",
          "Tilsett vann og visp med en chasen til det skummer.",
          "Varm opp og skum havremelken.",
          "Hell matchaen i en kopp og tilsett melken sakte.",
          "Avslutt med et latte art-mønster.",
        ],
      },
    },
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
    i18n: {
      de: {
        title: "Hojicha Oat Latte",
        category: "Getränke",
        level: "Einfach",
        description: "Geröstet, nussig und mild — der perfekte Abendtee.",
        ingredients: ["2 g Hojicha-Pulver", "30 ml heißes Wasser", "200 ml Hafermilch", "1 TL Honig"],
        steps: [
          "Siebe Hojicha in eine Tasse.",
          "Gib heißes Wasser hinzu und schlage, bis es sich aufgelöst hat.",
          "Erhitze und schäume die Hafermilch auf.",
          "Kombiniere und süße nach Geschmack mit Honig.",
        ],
      },
      no: {
        title: "Hojicha Oat Latte",
        category: "Drikker",
        level: "Enkel",
        description: "Ristet, nøtteaktig og mild — den perfekte kveldsteen.",
        ingredients: ["2 g hojicha-pulver", "30 ml varmt vann", "200 ml havremelk", "1 ts honning"],
        steps: [
          "Sikt hojicha i en kopp.",
          "Tilsett varmt vann og visp til pulveret er oppløst.",
          "Varm opp og skum havremelken.",
          "Bland sammen og søt med honning etter smak.",
        ],
      },
    },
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
    i18n: {
      de: {
        title: "Sparkling Matcha Tonic",
        category: "Getränke",
        level: "Einfach",
        description: "Prickelnd, zitronig und erfrischend für warme Tage.",
        ingredients: ["2 g Matcha", "30 ml warmes Wasser", "150 ml Tonic Water", "Eine Zitronenscheibe", "Eiswürfel"],
        steps: [
          "Schlage Matcha und Wasser schaumig.",
          "Fülle ein Glas mit Eis und Tonic.",
          "Gieße den Matcha vorsichtig darüber.",
          "Mit Zitrone garnieren.",
        ],
      },
      no: {
        title: "Sparkling Matcha Tonic",
        category: "Drikker",
        level: "Enkel",
        description: "Boblende, sitrusfrisk og forfriskende på varme dager.",
        ingredients: ["2 g matcha", "30 ml varmt vann", "150 ml tonic", "En sitronskive", "Isbiter"],
        steps: [
          "Visp matcha og vann til det skummer.",
          "Fyll et glass med is og tonic.",
          "Hell matchaen forsiktig over.",
          "Pynt med sitron.",
        ],
      },
    },
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
    i18n: {
      de: {
        title: "Matcha Smoothie Bowl",
        category: "Frühstück",
        level: "Einfach",
        description: "Ein lebendiges Frühstück voller Antioxidantien und Energie.",
        ingredients: ["1 gefrorene Banane", "150 g gefrorene Mango", "1 TL Matcha", "100 ml Hafermilch", "Topping: Granola, Kiwi, Kokos"],
        steps: [
          "Banane, Mango, Matcha und Hafermilch im Mixer pürieren.",
          "In eine Schale füllen.",
          "Mit Granola, Kiwi und Kokosraspeln garnieren.",
        ],
      },
      no: {
        title: "Matcha Smoothie Bowl",
        category: "Frokost",
        level: "Enkel",
        description: "En fargerik frokost full av antioksidanter og energi.",
        ingredients: ["1 frossen banan", "150 g frossen mango", "1 ts matcha", "100 ml havremelk", "Topping: granola, kiwi, kokos"],
        steps: [
          "Kjør banan, mango, matcha og havremelk i en blender.",
          "Hell over i en bolle.",
          "Topp med granola, kiwi og kokosmasse.",
        ],
      },
    },
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
    i18n: {
      de: {
        title: "Matcha Pancakes",
        category: "Frühstück",
        level: "Einfach",
        description: "Fluffige Pancakes mit einem fröhlichen grünen Twist.",
        ingredients: ["150 g Mehl", "1 TL Backpulver", "2 EL Matcha", "1 Ei", "200 ml Milch", "1 EL Zucker", "Butter zum Braten"],
        steps: [
          "Trockene Zutaten vermischen.",
          "Ei und Milch unterrühren, bis ein glatter Teig entsteht.",
          "Kleine Pancakes in Butter ca. 2 Min. pro Seite backen.",
          "Stapeln und mit Ahornsirup servieren.",
        ],
      },
      no: {
        title: "Matcha Pancakes",
        category: "Frokost",
        level: "Enkel",
        description: "Luftige pannekaker med en munter grønn vri.",
        ingredients: ["150 g hvetemel", "1 ts bakepulver", "2 ss matcha", "1 egg", "200 ml melk", "1 ss sukker", "Smør til steking"],
        steps: [
          "Bland de tørre ingrediensene.",
          "Visp inn egg og melk til en glatt røre.",
          "Stek små pannekaker i smør, ca. 2 min per side.",
          "Stable og server med lønnesirup.",
        ],
      },
    },
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
    i18n: {
      de: {
        title: "Matcha Overnight Oats",
        category: "Frühstück",
        level: "Einfach",
        description: "Am Abend zubereiten — Frühstück fertig, wenn du aufwachst.",
        ingredients: ["50 g Haferflocken", "150 ml Hafermilch", "1 TL Matcha", "1 TL Chiasamen", "1 TL Ahornsirup", "Topping nach Wahl"],
        steps: [
          "Alle Zutaten in einem Glas vermischen.",
          "Verschließen und mindestens 6 Stunden in den Kühlschrank stellen.",
          "Am Morgen mit Obst und Nüssen garnieren.",
        ],
      },
      no: {
        title: "Matcha Overnight Oats",
        category: "Frokost",
        level: "Enkel",
        description: "Lag den kvelden før — frokosten er klar når du våkner.",
        ingredients: ["50 g havregryn", "150 ml havremelk", "1 ts matcha", "1 ts chiafrø", "1 ts lønnesirup", "Valgfri topping"],
        steps: [
          "Bland alle ingrediensene i et glass med lokk.",
          "Lukk og sett i kjøleskapet i minst 6 timer.",
          "Topp med frukt og nøtter om morgenen.",
        ],
      },
    },
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
    i18n: {
      de: {
        title: "Matcha Energy Bites",
        category: "Snacks",
        level: "Einfach",
        description: "Natürlich süß, voller Fokus und purer Energie.",
        ingredients: ["150 g Datteln", "100 g Cashewnüsse", "2 EL Matcha (Culinary)", "1 EL Kokosöl", "Eine Prise Salz", "Kokosraspeln"],
        steps: [
          "Alle Zutaten in eine Küchenmaschine geben.",
          "Zu einer klebrigen Masse mixen.",
          "Kleine Kugeln formen und in Kokosraspeln wälzen.",
          "Kühl aufbewahren.",
        ],
      },
      no: {
        title: "Matcha Energy Bites",
        category: "Snacks",
        level: "Enkel",
        description: "Naturlig søtt, fullt av fokus og ren energi.",
        ingredients: ["150 g dadler", "100 g cashewnøtter", "2 ss matcha (culinary)", "1 ss kokosolje", "En klype salt", "Kokosmasse"],
        steps: [
          "Ha alle ingrediensene i en foodprosessor.",
          "Kjør til en klebrig masse.",
          "Trill små kuler og rull dem i kokosmasse.",
          "Oppbevares kjølig.",
        ],
      },
    },
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
    i18n: {
      de: {
        title: "Matcha Cookies",
        category: "Backen",
        level: "Mittel",
        description: "Knusprig, schmelzend mit weißer Schokolade.",
        ingredients: ["180 g Mehl", "100 g Butter", "100 g Rohrzucker", "1 Ei", "2 EL Matcha (Culinary)", "100 g weiße Schokolade"],
        steps: [
          "Den Backofen auf 180°C vorheizen.",
          "Butter und Zucker cremig rühren. Ei hinzufügen.",
          "Mehl und Matcha unterheben.",
          "Weiße Schokolade hinzufügen.",
          "Häufchen auf ein Backblech setzen und 12 Minuten backen.",
        ],
      },
      no: {
        title: "Matcha Cookies",
        category: "Bakverk",
        level: "Middels",
        description: "Sprø, med smeltende hvit sjokolade.",
        ingredients: ["180 g hvetemel", "100 g smør", "100 g rørsukker", "1 egg", "2 ss matcha (culinary)", "100 g hvit sjokolade"],
        steps: [
          "Forvarm ovnen til 180°C.",
          "Rør smør og sukker kremete. Tilsett egget.",
          "Vend inn mel og matcha.",
          "Tilsett den hvite sjokoladen.",
          "Sett små topper på et stekebrett og stek i 12 minutter.",
        ],
      },
    },
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
    i18n: {
      de: {
        title: "Matcha Brownies",
        category: "Backen",
        level: "Mittel",
        description: "Fudgy mit weißer Schokolade — unwiderstehlich.",
        ingredients: ["200 g weiße Schokolade", "100 g Butter", "2 Eier", "120 g Zucker", "150 g Mehl", "3 EL Matcha", "Eine Prise Salz"],
        steps: [
          "Weiße Schokolade und Butter im Wasserbad schmelzen.",
          "Eier und Zucker schaumig schlagen.",
          "Schokoladenmischung, Mehl und Matcha unterheben.",
          "25 Min. bei 170°C in einer gefetteten Form backen.",
          "Vor dem Schneiden abkühlen lassen.",
        ],
      },
      no: {
        title: "Matcha Brownies",
        category: "Bakverk",
        level: "Middels",
        description: "Fudgy med hvit sjokolade — uimotståelig.",
        ingredients: ["200 g hvit sjokolade", "100 g smør", "2 egg", "120 g sukker", "150 g hvetemel", "3 ss matcha", "En klype salt"],
        steps: [
          "Smelt hvit sjokolade og smør over vannbad.",
          "Visp egg og sukker luftig.",
          "Vend inn sjokoladeblandingen, melet og matchaen.",
          "Stek i 25 min på 170°C i en smurt form.",
          "La avkjøles før du skjærer i ruter.",
        ],
      },
    },
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
    i18n: {
      de: {
        title: "Matcha Cheesecake",
        category: "Desserts",
        level: "Mittel",
        description: "Cremig, elegant und perfekt für besondere Anlässe.",
        ingredients: ["200 g Kekse", "100 g Butter", "500 g Frischkäse", "150 g Zucker", "200 ml Sahne", "3 EL Matcha", "10 g Gelatine"],
        steps: [
          "Einen Boden aus zerkleinerten Keksen und geschmolzener Butter herstellen.",
          "Frischkäse, Zucker und Matcha verrühren.",
          "Sahne schlagen und mit aufgelöster Gelatine unterheben.",
          "Über dem Boden verteilen und mindestens 4 Stunden kühlen.",
        ],
      },
      no: {
        title: "Matcha Cheesecake",
        category: "Desserter",
        level: "Middels",
        description: "Kremet, elegant og perfekt til spesielle anledninger.",
        ingredients: ["200 g kjeks", "100 g smør", "500 g kremost", "150 g sukker", "200 ml kremfløte", "3 ss matcha", "10 g gelatin"],
        steps: [
          "Lag en bunn av knuste kjeks og smeltet smør.",
          "Rør sammen kremost, sukker og matcha.",
          "Pisk kremfløten og vend den inn sammen med oppløst gelatin.",
          "Fordel over bunnen og avkjøl i minst 4 timer.",
        ],
      },
    },
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
    i18n: {
      de: {
        title: "Matcha Tiramisu",
        category: "Desserts",
        level: "Mittel",
        description: "Italienischer Klassiker mit japanischem Twist.",
        ingredients: ["250 g Mascarpone", "3 Eier", "80 g Zucker", "200 ml starker Matcha", "200 g Löffelbiskuits", "Matcha zum Bestäuben"],
        steps: [
          "Eier trennen. Eigelb mit Zucker hell-schaumig schlagen.",
          "Mascarpone unterrühren.",
          "Eiweiß steif schlagen und unterheben.",
          "Löffelbiskuits in Matcha tauchen und mit der Creme schichten.",
          "4 Stunden kühlen und mit Matcha bestäuben.",
        ],
      },
      no: {
        title: "Matcha Tiramisu",
        category: "Desserter",
        level: "Middels",
        description: "Italiensk klassiker med en japansk vri.",
        ingredients: ["250 g mascarpone", "3 egg", "80 g sukker", "200 ml sterk matcha", "200 g fingerkjeks", "Matcha til å drysse over"],
        steps: [
          "Skill eggene. Visp eggeplommer og sukker lyst og luftig.",
          "Rør inn mascarponen.",
          "Stivpisk eggehvitene og vend dem inn.",
          "Dypp fingerkjeksene i matcha og legg dem lagvis med kremen.",
          "Avkjøl i 4 timer og dryss over matcha.",
        ],
      },
    },
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
    i18n: {
      de: {
        title: "Matcha Mochi",
        category: "Desserts",
        level: "Fortgeschritten",
        description: "Weiche Reis-Bällchen mit weißer Schokoladenfüllung.",
        ingredients: ["200 g Klebreismehl", "60 g Zucker", "2 EL Matcha", "300 ml Wasser", "Weiße Schokolade als Füllung", "Speisestärke zum Bestäuben"],
        steps: [
          "Klebreismehl, Zucker, Matcha und Wasser vermischen.",
          "20 Min. dämpfen, bis ein glänzender Teig entsteht.",
          "Mit Speisestärke bestäuben und ausrollen.",
          "Mit weißer Schokolade füllen und zu Bällchen formen.",
        ],
      },
      no: {
        title: "Matcha Mochi",
        category: "Desserter",
        level: "Avansert",
        description: "Myke risboller med fyll av hvit sjokolade.",
        ingredients: ["200 g klebrismel", "60 g sukker", "2 ss matcha", "300 ml vann", "Hvit sjokolade til fyll", "Maisenna til å drysse med"],
        steps: [
          "Bland klebrismel, sukker, matcha og vann.",
          "Damp i 20 min til en blank deig.",
          "Dryss med maisenna og kjevle ut.",
          "Fyll med hvit sjokolade og form til små boller.",
        ],
      },
    },
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
    i18n: {
      de: {
        title: "Matcha Ice Cream",
        category: "Desserts",
        level: "Mittel",
        description: "Cremig, intensiv und unendlich süchtig machend.",
        ingredients: ["400 ml Sahne", "200 ml Kondensmilch", "3 EL Matcha", "Eine Prise Salz"],
        steps: [
          "Sahne steif schlagen.",
          "Matcha unter die Kondensmilch rühren.",
          "Beides vorsichtig miteinander vermengen.",
          "Mindestens 6 Stunden einfrieren.",
        ],
      },
      no: {
        title: "Matcha Ice Cream",
        category: "Desserter",
        level: "Middels",
        description: "Kremet, intens og umulig å slutte med.",
        ingredients: ["400 ml kremfløte", "200 ml kondensert melk", "3 ss matcha", "En klype salt"],
        steps: [
          "Stivpisk kremfløten.",
          "Rør matchaen inn i den kondenserte melken.",
          "Vend de to forsiktig sammen.",
          "Frys i minst 6 timer.",
        ],
      },
    },
  },
  {
    slug: "matcha-strawberry-latte",
    title: "Strawberry Matcha Latte",
    category: "Drinks",
    time: "7 min",
    level: "Eenvoudig",
    image: recipeStrawberryLatte,
    description: "Roze-groene droom — zoete aardbeienpuree onder romige matcha.",
    ingredients: ["100 g aardbeien", "1 el suiker", "2 g matcha", "30 ml warm water", "200 ml havermelk", "IJs"],
    steps: [
      "Pureer aardbeien met suiker tot een coulis.",
      "Klop matcha met warm water tot schuimig.",
      "Doe coulis onderin een glas, voeg ijs en melk toe.",
      "Schenk matcha er overheen voor een laagjes-effect.",
    ],
    i18n: {
      de: {
        title: "Strawberry Matcha Latte",
        category: "Getränke",
        level: "Einfach",
        description: "Rosa-grüner Traum — süßes Erdbeerpüree unter cremigem Matcha.",
        ingredients: ["100 g Erdbeeren", "1 EL Zucker", "2 g Matcha", "30 ml warmes Wasser", "200 ml Hafermilch", "Eis"],
        steps: [
          "Erdbeeren mit Zucker zu einem Coulis pürieren.",
          "Matcha mit warmem Wasser schaumig schlagen.",
          "Coulis unten ins Glas geben, Eis und Milch hinzufügen.",
          "Matcha darüber gießen für einen Schichteffekt.",
        ],
      },
      no: {
        title: "Strawberry Matcha Latte",
        category: "Drikker",
        level: "Enkel",
        description: "En rosa-grønn drøm — søt jordbærpuré under kremet matcha.",
        ingredients: ["100 g jordbær", "1 ss sukker", "2 g matcha", "30 ml varmt vann", "200 ml havremelk", "Is"],
        steps: [
          "Kjør jordbær og sukker til en coulis.",
          "Visp matcha med varmt vann til det skummer.",
          "Ha coulisen i bunnen av et glass, og tilsett is og melk.",
          "Hell matchaen over for en lagdelt effekt.",
        ],
      },
    },
  },
  {
    slug: "matcha-espresso-tonic",
    title: "Matcha Espresso Tonic",
    category: "Drinks",
    time: "5 min",
    level: "Medium",
    image: recipeEspressoTonic,
    description: "Drie lagen energie — matcha, espresso en tonic in één glas.",
    ingredients: ["2 g matcha", "30 ml warm water", "1 shot espresso", "150 ml tonic", "IJs", "Citrusschil"],
    steps: [
      "Klop matcha met water tot schuimig.",
      "Vul glas met ijs en tonic.",
      "Schenk espresso erover, dan voorzichtig matcha.",
      "Werk af met citrusschil.",
    ],
    i18n: {
      de: {
        title: "Matcha Espresso Tonic",
        category: "Getränke",
        level: "Mittel",
        description: "Drei Schichten Energie — Matcha, Espresso und Tonic in einem Glas.",
        ingredients: ["2 g Matcha", "30 ml warmes Wasser", "1 Shot Espresso", "150 ml Tonic", "Eis", "Zitrusschale"],
        steps: [
          "Matcha mit Wasser schaumig schlagen.",
          "Glas mit Eis und Tonic füllen.",
          "Espresso darüber gießen, dann vorsichtig Matcha.",
          "Mit Zitrusschale garnieren.",
        ],
      },
      no: {
        title: "Matcha Espresso Tonic",
        category: "Drikker",
        level: "Middels",
        description: "Tre lag energi — matcha, espresso og tonic i ett glass.",
        ingredients: ["2 g matcha", "30 ml varmt vann", "1 shot espresso", "150 ml tonic", "Is", "Sitrusskall"],
        steps: [
          "Visp matcha med vann til det skummer.",
          "Fyll glasset med is og tonic.",
          "Hell espressoen over, og deretter forsiktig matchaen.",
          "Pynt med sitrusskall.",
        ],
      },
    },
  },
  {
    slug: "matcha-lemonade",
    title: "Matcha Lemonade",
    category: "Drinks",
    time: "5 min",
    level: "Eenvoudig",
    image: recipeLemonade,
    description: "Bruisend, citrusachtig en levendig — zomer in een glas.",
    ingredients: ["2 g matcha", "30 ml warm water", "Sap van 1 citroen", "1 el honing", "200 ml bruiswater", "Munt"],
    steps: [
      "Klop matcha en water tot schuimig.",
      "Meng citroensap, honing en matcha.",
      "Vul aan met bruiswater en ijs.",
      "Garneer met munt en citroenschijfjes.",
    ],
    i18n: {
      de: {
        title: "Matcha Lemonade",
        category: "Getränke",
        level: "Einfach",
        description: "Prickelnd, zitronig und lebendig — Sommer im Glas.",
        ingredients: ["2 g Matcha", "30 ml warmes Wasser", "Saft von 1 Zitrone", "1 EL Honig", "200 ml Sprudelwasser", "Minze"],
        steps: [
          "Matcha und Wasser schaumig schlagen.",
          "Zitronensaft, Honig und Matcha vermischen.",
          "Mit Sprudelwasser und Eis auffüllen.",
          "Mit Minze und Zitronenscheiben garnieren.",
        ],
      },
      no: {
        title: "Matcha Lemonade",
        category: "Drikker",
        level: "Enkel",
        description: "Boblende, sitrusfrisk og livlig — sommer i et glass.",
        ingredients: ["2 g matcha", "30 ml varmt vann", "Saften av 1 sitron", "1 ss honning", "200 ml kullsyrevann", "Mynte"],
        steps: [
          "Visp matcha og vann til det skummer.",
          "Bland sitronsaft, honning og matcha.",
          "Fyll opp med kullsyrevann og is.",
          "Pynt med mynte og sitronskiver.",
        ],
      },
    },
  },
  {
    slug: "matcha-hot-chocolate",
    title: "Matcha Hot Chocolate",
    category: "Drinks",
    time: "10 min",
    level: "Eenvoudig",
    image: recipeHotChocolate,
    description: "Witte chocolade en matcha smelten samen in een romige cup.",
    ingredients: ["100 g witte chocolade", "300 ml volle melk", "2 tl matcha", "Snufje vanille"],
    steps: [
      "Verwarm melk met witte chocolade tot opgelost.",
      "Klop matcha apart met een paar lepels van het mengsel glad.",
      "Voeg matcha-mengsel toe en klop schuimig.",
      "Schenk in mok en bestuif met matcha.",
    ],
    i18n: {
      de: {
        title: "Matcha Hot Chocolate",
        category: "Getränke",
        level: "Einfach",
        description: "Weiße Schokolade und Matcha verschmelzen in einer cremigen Tasse.",
        ingredients: ["100 g weiße Schokolade", "300 ml Vollmilch", "2 TL Matcha", "Eine Prise Vanille"],
        steps: [
          "Milch mit weißer Schokolade erhitzen, bis sie aufgelöst ist.",
          "Matcha separat mit ein paar Löffeln der Mischung glattrühren.",
          "Matcha-Mischung hinzufügen und schaumig schlagen.",
          "In eine Tasse gießen und mit Matcha bestäuben.",
        ],
      },
      no: {
        title: "Matcha Hot Chocolate",
        category: "Drikker",
        level: "Enkel",
        description: "Hvit sjokolade og matcha smelter sammen i en kremet kopp.",
        ingredients: ["100 g hvit sjokolade", "300 ml helmelk", "2 ts matcha", "En klype vanilje"],
        steps: [
          "Varm melken med den hvite sjokoladen til den er smeltet.",
          "Rør matchaen glatt for seg med et par skjeer av blandingen.",
          "Tilsett matchablandingen og visp til det skummer.",
          "Hell i en kopp og dryss over litt matcha.",
        ],
      },
    },
  },
  {
    slug: "matcha-bubble-tea",
    title: "Matcha Bubble Tea",
    category: "Drinks",
    time: "20 min",
    level: "Medium",
    image: recipeBubbleTea,
    description: "Speels, kauwbaar en verfrissend — met zachte tapioca pareltjes.",
    ingredients: ["50 g tapioca parels", "2 g matcha", "30 ml warm water", "200 ml havermelk", "1 el rietsuikersiroop", "IJs"],
    steps: [
      "Kook tapioca parels volgens verpakking.",
      "Klop matcha met warm water tot schuimig.",
      "Doe parels onderin glas met siroop.",
      "Voeg ijs, melk en matcha toe.",
    ],
    i18n: {
      de: {
        title: "Matcha Bubble Tea",
        category: "Getränke",
        level: "Mittel",
        description: "Verspielt, kaubar und erfrischend — mit weichen Tapioka-Perlen.",
        ingredients: ["50 g Tapioka-Perlen", "2 g Matcha", "30 ml warmes Wasser", "200 ml Hafermilch", "1 EL Rohrzuckersirup", "Eis"],
        steps: [
          "Tapioka-Perlen nach Packungsanleitung kochen.",
          "Matcha mit warmem Wasser schaumig schlagen.",
          "Perlen mit Sirup unten ins Glas geben.",
          "Eis, Milch und Matcha hinzufügen.",
        ],
      },
      no: {
        title: "Matcha Bubble Tea",
        category: "Drikker",
        level: "Middels",
        description: "Leken, tyggbar og forfriskende — med myke tapiokaperler.",
        ingredients: ["50 g tapiokaperler", "2 g matcha", "30 ml varmt vann", "200 ml havremelk", "1 ss rørsukkersirup", "Is"],
        steps: [
          "Kok tapiokaperlene etter anvisningen på pakken.",
          "Visp matcha med varmt vann til det skummer.",
          "Ha perlene og sirupen i bunnen av glasset.",
          "Tilsett is, melk og matcha.",
        ],
      },
    },
  },
  {
    slug: "matcha-chia-pudding",
    title: "Matcha Chia Pudding",
    category: "Ontbijt",
    time: "5 min + nacht",
    level: "Eenvoudig",
    image: recipeChiaPudding,
    description: "Vol vezels, plant-based en makkelijk te bereiden de avond ervoor.",
    ingredients: ["3 el chiazaad", "200 ml havermelk", "1 tl matcha", "1 tl ahornsiroop", "Topping: bessen, kokos"],
    steps: [
      "Meng chiazaad, melk, matcha en siroop.",
      "Roer goed door en laat 10 min staan.",
      "Roer nogmaals en zet 6 uur in de koelkast.",
      "Werk af met bessen en kokosrasp.",
    ],
    i18n: {
      de: {
        title: "Matcha Chia Pudding",
        category: "Frühstück",
        level: "Einfach",
        description: "Voller Ballaststoffe, pflanzlich und einfach am Vorabend zubereitet.",
        ingredients: ["3 EL Chiasamen", "200 ml Hafermilch", "1 TL Matcha", "1 TL Ahornsirup", "Topping: Beeren, Kokos"],
        steps: [
          "Chiasamen, Milch, Matcha und Sirup vermischen.",
          "Gut umrühren und 10 Min. stehen lassen.",
          "Nochmals umrühren und 6 Stunden in den Kühlschrank stellen.",
          "Mit Beeren und Kokosraspeln garnieren.",
        ],
      },
      no: {
        title: "Matcha Chia Pudding",
        category: "Frokost",
        level: "Enkel",
        description: "Full av fiber, plantebasert og enkel å lage kvelden før.",
        ingredients: ["3 ss chiafrø", "200 ml havremelk", "1 ts matcha", "1 ts lønnesirup", "Topping: bær, kokos"],
        steps: [
          "Bland chiafrø, melk, matcha og sirup.",
          "Rør godt og la stå i 10 min.",
          "Rør igjen og sett i kjøleskapet i 6 timer.",
          "Topp med bær og kokosmasse.",
        ],
      },
    },
  },
  {
    slug: "matcha-waffles",
    title: "Matcha Waffles",
    category: "Ontbijt",
    time: "25 min",
    level: "Eenvoudig",
    image: recipeWaffles,
    description: "Knapperig buiten, fluffy binnen — perfect voor luie weekenden.",
    ingredients: ["200 g bloem", "2 el matcha", "1 tl bakpoeder", "300 ml melk", "2 eieren", "50 g boter", "2 el suiker"],
    steps: [
      "Meng droge en natte ingrediënten apart.",
      "Combineer tot glad beslag.",
      "Bak in wafelijzer tot goudbruin.",
      "Serveer met fruit en ahornsiroop.",
    ],
    i18n: {
      de: {
        title: "Matcha Waffles",
        category: "Frühstück",
        level: "Einfach",
        description: "Außen knusprig, innen fluffig — perfekt für faule Wochenenden.",
        ingredients: ["200 g Mehl", "2 EL Matcha", "1 TL Backpulver", "300 ml Milch", "2 Eier", "50 g Butter", "2 EL Zucker"],
        steps: [
          "Trockene und feuchte Zutaten getrennt vermischen.",
          "Zu einem glatten Teig vermengen.",
          "Im Waffeleisen goldbraun backen.",
          "Mit Obst und Ahornsirup servieren.",
        ],
      },
      no: {
        title: "Matcha Waffles",
        category: "Frokost",
        level: "Enkel",
        description: "Sprø utenpå, luftige inni — perfekte til late helger.",
        ingredients: ["200 g hvetemel", "2 ss matcha", "1 ts bakepulver", "300 ml melk", "2 egg", "50 g smør", "2 ss sukker"],
        steps: [
          "Bland tørre og våte ingredienser hver for seg.",
          "Rør sammen til en glatt røre.",
          "Stek i vaffeljern til de er gylne.",
          "Server med frukt og lønnesirup.",
        ],
      },
    },
  },
  {
    slug: "matcha-granola",
    title: "Matcha Granola",
    category: "Ontbijt",
    time: "35 min",
    level: "Eenvoudig",
    image: recipeGranola,
    description: "Zelfgemaakte granola met matcha, amandelen en kokos.",
    ingredients: ["300 g havermout", "100 g amandelen", "50 g kokosrasp", "3 el matcha", "100 ml ahornsiroop", "50 ml kokosolie"],
    steps: [
      "Verwarm oven op 160°C.",
      "Meng alle ingrediënten goed door elkaar.",
      "Verdeel op bakplaat en bak 25 min, halverwege roeren.",
      "Laat afkoelen en bewaar in luchtdichte pot.",
    ],
    i18n: {
      de: {
        title: "Matcha Granola",
        category: "Frühstück",
        level: "Einfach",
        description: "Selbstgemachtes Granola mit Matcha, Mandeln und Kokos.",
        ingredients: ["300 g Haferflocken", "100 g Mandeln", "50 g Kokosraspeln", "3 EL Matcha", "100 ml Ahornsirup", "50 ml Kokosöl"],
        steps: [
          "Backofen auf 160°C vorheizen.",
          "Alle Zutaten gut miteinander vermischen.",
          "Auf einem Backblech verteilen und 25 Min. backen, dabei zwischendurch umrühren.",
          "Abkühlen lassen und in einem luftdichten Glas aufbewahren.",
        ],
      },
      no: {
        title: "Matcha Granola",
        category: "Frokost",
        level: "Enkel",
        description: "Hjemmelaget granola med matcha, mandler og kokos.",
        ingredients: ["300 g havregryn", "100 g mandler", "50 g kokosmasse", "3 ss matcha", "100 ml lønnesirup", "50 ml kokosolje"],
        steps: [
          "Forvarm ovnen til 160°C.",
          "Bland alle ingrediensene godt.",
          "Fordel på et stekebrett og stek i 25 min, rør halvveis.",
          "La avkjøles og oppbevar i et lufttett glass.",
        ],
      },
    },
  },
  {
    slug: "matcha-french-toast",
    title: "Matcha French Toast",
    category: "Ontbijt",
    time: "15 min",
    level: "Eenvoudig",
    image: recipeFrenchToast,
    description: "Brioche gedoopt in matcha-eimengsel — pure morgenluxe.",
    ingredients: ["4 sneetjes brioche", "2 eieren", "150 ml melk", "1 tl matcha", "1 tl vanille", "Boter", "Ahornsiroop"],
    steps: [
      "Klop eieren, melk, matcha en vanille.",
      "Doop brioche kort in mengsel.",
      "Bak in boter goudbruin aan beide kanten.",
      "Serveer met siroop en bessen.",
    ],
    i18n: {
      de: {
        title: "Matcha French Toast",
        category: "Frühstück",
        level: "Einfach",
        description: "Brioche in Matcha-Eier-Mischung getunkt — purer Morgenluxus.",
        ingredients: ["4 Scheiben Brioche", "2 Eier", "150 ml Milch", "1 TL Matcha", "1 TL Vanille", "Butter", "Ahornsirup"],
        steps: [
          "Eier, Milch, Matcha und Vanille verquirlen.",
          "Brioche kurz in die Mischung tauchen.",
          "In Butter beidseitig goldbraun braten.",
          "Mit Sirup und Beeren servieren.",
        ],
      },
      no: {
        title: "Matcha French Toast",
        category: "Frokost",
        level: "Enkel",
        description: "Brioche dyppet i matcha-eggeblanding — ren morgenluksus.",
        ingredients: ["4 skiver brioche", "2 egg", "150 ml melk", "1 ts matcha", "1 ts vanilje", "Smør", "Lønnesirup"],
        steps: [
          "Visp sammen egg, melk, matcha og vanilje.",
          "Dypp briochen raskt i blandingen.",
          "Stek i smør til gyllen på begge sider.",
          "Server med sirup og bær.",
        ],
      },
    },
  },
  {
    slug: "matcha-yogurt-bowl",
    title: "Matcha Yogurt Bowl",
    category: "Snacks",
    time: "5 min",
    level: "Eenvoudig",
    image: recipeYogurtBowl,
    description: "Romige Griekse yoghurt met matcha-swirl en granola.",
    ingredients: ["200 g Griekse yoghurt", "1 tl matcha", "1 tl honing", "Granola", "Vers fruit"],
    steps: [
      "Roer matcha en honing door yoghurt voor swirl-effect.",
      "Schep in een kom.",
      "Werk af met granola en fruit.",
    ],
    i18n: {
      de: {
        title: "Matcha Yogurt Bowl",
        category: "Snacks",
        level: "Einfach",
        description: "Cremiger griechischer Joghurt mit Matcha-Swirl und Granola.",
        ingredients: ["200 g griechischer Joghurt", "1 TL Matcha", "1 TL Honig", "Granola", "Frisches Obst"],
        steps: [
          "Matcha und Honig für einen Swirl-Effekt unter den Joghurt rühren.",
          "In eine Schale füllen.",
          "Mit Granola und Obst garnieren.",
        ],
      },
      no: {
        title: "Matcha Yogurt Bowl",
        category: "Snacks",
        level: "Enkel",
        description: "Kremet gresk yoghurt med matcha-swirl og granola.",
        ingredients: ["200 g gresk yoghurt", "1 ts matcha", "1 ts honning", "Granola", "Fersk frukt"],
        steps: [
          "Rør matcha og honning inn i yoghurten for en swirl-effekt.",
          "Hell over i en bolle.",
          "Topp med granola og frukt.",
        ],
      },
    },
  },
  {
    slug: "matcha-truffles",
    title: "Matcha Truffles",
    category: "Snacks",
    time: "30 min + koelen",
    level: "Medium",
    image: recipeTruffles,
    description: "Witte chocolade truffels gerold in matcha — pure indulgence.",
    ingredients: ["200 g witte chocolade", "100 ml slagroom", "2 el matcha", "Extra matcha om te rollen"],
    steps: [
      "Verwarm slagroom met matcha.",
      "Giet over witte chocolade en roer glad.",
      "Koel 2 uur in de koelkast.",
      "Rol balletjes en haal door matcha.",
    ],
    i18n: {
      de: {
        title: "Matcha Truffles",
        category: "Snacks",
        level: "Mittel",
        description: "Weiße-Schokolade-Trüffel, gewälzt in Matcha — purer Genuss.",
        ingredients: ["200 g weiße Schokolade", "100 ml Sahne", "2 EL Matcha", "Extra Matcha zum Wälzen"],
        steps: [
          "Sahne mit Matcha erhitzen.",
          "Über die weiße Schokolade gießen und glatt rühren.",
          "2 Stunden im Kühlschrank kühlen.",
          "Kugeln formen und in Matcha wälzen.",
        ],
      },
      no: {
        title: "Matcha Truffles",
        category: "Snacks",
        level: "Middels",
        description: "Trøfler av hvit sjokolade rullet i matcha — ren nytelse.",
        ingredients: ["200 g hvit sjokolade", "100 ml kremfløte", "2 ss matcha", "Ekstra matcha til rulling"],
        steps: [
          "Varm opp kremfløten med matchaen.",
          "Hell over den hvite sjokoladen og rør glatt.",
          "Avkjøl i kjøleskapet i 2 timer.",
          "Trill kuler og rull dem i matcha.",
        ],
      },
    },
  },
  {
    slug: "matcha-popcorn",
    title: "Matcha Popcorn",
    category: "Snacks",
    time: "10 min",
    level: "Eenvoudig",
    image: recipePopcorn,
    description: "Filmavond-snack met witte chocolade drizzle en matcha-stof.",
    ingredients: ["80 g popcornmais", "2 el olie", "100 g witte chocolade", "1 el matcha", "Snufje zout"],
    steps: [
      "Pop de mais in olie tot klaar.",
      "Smelt witte chocolade au bain-marie.",
      "Drizzle over popcorn en bestuif met matcha.",
      "Laat hard worden voor je serveert.",
    ],
    i18n: {
      de: {
        title: "Matcha Popcorn",
        category: "Snacks",
        level: "Einfach",
        description: "Filmabend-Snack mit weißem Schokoladen-Drizzle und Matcha-Staub.",
        ingredients: ["80 g Popcornmais", "2 EL Öl", "100 g weiße Schokolade", "1 EL Matcha", "Eine Prise Salz"],
        steps: [
          "Den Mais in Öl poppen lassen.",
          "Weiße Schokolade im Wasserbad schmelzen.",
          "Über das Popcorn träufeln und mit Matcha bestäuben.",
          "Vor dem Servieren fest werden lassen.",
        ],
      },
      no: {
        title: "Matcha Popcorn",
        category: "Snacks",
        level: "Enkel",
        description: "Filmkveld-snacks med hvit sjokoladedrizzle og matchastøv.",
        ingredients: ["80 g popkornmais", "2 ss olje", "100 g hvit sjokolade", "1 ss matcha", "En klype salt"],
        steps: [
          "Popp maisen i olje.",
          "Smelt hvit sjokolade over vannbad.",
          "Drypp over popkornet og dryss med matcha.",
          "La stivne før servering.",
        ],
      },
    },
  },
  {
    slug: "matcha-macarons",
    title: "Matcha Macarons",
    category: "Bakken",
    time: "90 min",
    level: "Gevorderd",
    image: recipeMacarons,
    description: "Elegante Franse koekjes met witte chocolade ganache.",
    ingredients: ["100 g amandelmeel", "100 g poedersuiker", "2 el matcha", "70 g eiwit", "100 g suiker", "Witte chocolade ganache"],
    steps: [
      "Zeef amandelmeel, poedersuiker en matcha.",
      "Klop eiwitten met suiker tot Italiaanse meringue.",
      "Spatel droge ingrediënten erdoor.",
      "Spuit rondjes en laat 30 min rusten.",
      "Bak 14 min op 150°C en vul met ganache.",
    ],
    i18n: {
      de: {
        title: "Matcha Macarons",
        category: "Backen",
        level: "Fortgeschritten",
        description: "Elegante französische Kekse mit weißer Schokoladen-Ganache.",
        ingredients: ["100 g Mandelmehl", "100 g Puderzucker", "2 EL Matcha", "70 g Eiweiß", "100 g Zucker", "Weiße Schokoladen-Ganache"],
        steps: [
          "Mandelmehl, Puderzucker und Matcha sieben.",
          "Eiweiß mit Zucker zu italienischer Meringue schlagen.",
          "Trockene Zutaten unterheben.",
          "Kreise aufspritzen und 30 Min. ruhen lassen.",
          "14 Min. bei 150°C backen und mit Ganache füllen.",
        ],
      },
      no: {
        title: "Matcha Macarons",
        category: "Bakverk",
        level: "Avansert",
        description: "Elegante franske småkaker med ganache av hvit sjokolade.",
        ingredients: ["100 g mandelmel", "100 g melis", "2 ss matcha", "70 g eggehvite", "100 g sukker", "Ganache av hvit sjokolade"],
        steps: [
          "Sikt mandelmel, melis og matcha.",
          "Pisk eggehvitene med sukker til en italiensk marengs.",
          "Vend inn de tørre ingrediensene.",
          "Sprøyt ut små runder og la dem hvile i 30 min.",
          "Stek i 14 min på 150°C og fyll med ganache.",
        ],
      },
    },
  },
  {
    slug: "matcha-madeleines",
    title: "Matcha Madeleines",
    category: "Bakken",
    time: "30 min",
    level: "Medium",
    image: recipeMadeleines,
    description: "Schelpvormige Franse koekjes — perfect bij een kop matcha.",
    ingredients: ["100 g bloem", "1 el matcha", "100 g suiker", "100 g boter", "2 eieren", "1 tl bakpoeder"],
    steps: [
      "Klop eieren en suiker bleek.",
      "Spatel bloem, matcha en bakpoeder erdoor.",
      "Voeg gesmolten boter toe.",
      "Vul madeleine-vorm en bak 12 min op 180°C.",
    ],
    i18n: {
      de: {
        title: "Matcha Madeleines",
        category: "Backen",
        level: "Mittel",
        description: "Muschelförmige französische Gebäckstücke — perfekt zu einer Tasse Matcha.",
        ingredients: ["100 g Mehl", "1 EL Matcha", "100 g Zucker", "100 g Butter", "2 Eier", "1 TL Backpulver"],
        steps: [
          "Eier und Zucker hell schlagen.",
          "Mehl, Matcha und Backpulver unterheben.",
          "Geschmolzene Butter hinzufügen.",
          "Madeleine-Form füllen und 12 Min. bei 180°C backen.",
        ],
      },
      no: {
        title: "Matcha Madeleines",
        category: "Bakverk",
        level: "Middels",
        description: "Skjellformede franske småkaker — perfekte til en kopp matcha.",
        ingredients: ["100 g hvetemel", "1 ss matcha", "100 g sukker", "100 g smør", "2 egg", "1 ts bakepulver"],
        steps: [
          "Visp egg og sukker lyst og luftig.",
          "Vend inn mel, matcha og bakepulver.",
          "Tilsett det smeltede smøret.",
          "Fyll madeleineformen og stek i 12 min på 180°C.",
        ],
      },
    },
  },
  {
    slug: "matcha-banana-bread",
    title: "Matcha Banana Bread",
    category: "Bakken",
    time: "60 min",
    level: "Eenvoudig",
    image: recipeBananaBread,
    description: "Vochtig bananenbrood met levendige matcha kleur en walnoten.",
    ingredients: ["3 rijpe bananen", "200 g bloem", "2 el matcha", "100 g suiker", "100 ml olie", "2 eieren", "1 tl bakpoeder", "100 g walnoten"],
    steps: [
      "Prak bananen en mix met eieren, suiker en olie.",
      "Voeg bloem, matcha en bakpoeder toe.",
      "Spatel walnoten erdoor.",
      "Giet in cakevorm en bak 50 min op 175°C.",
    ],
    i18n: {
      de: {
        title: "Matcha Banana Bread",
        category: "Backen",
        level: "Einfach",
        description: "Saftiges Bananenbrot mit lebhafter Matcha-Farbe und Walnüssen.",
        ingredients: ["3 reife Bananen", "200 g Mehl", "2 EL Matcha", "100 g Zucker", "100 ml Öl", "2 Eier", "1 TL Backpulver", "100 g Walnüsse"],
        steps: [
          "Bananen zerdrücken und mit Eiern, Zucker und Öl vermengen.",
          "Mehl, Matcha und Backpulver hinzufügen.",
          "Walnüsse unterheben.",
          "In eine Kastenform geben und 50 Min. bei 175°C backen.",
        ],
      },
      no: {
        title: "Matcha Banana Bread",
        category: "Bakverk",
        level: "Enkel",
        description: "Saftig bananbrød med livlig matchafarge og valnøtter.",
        ingredients: ["3 modne bananer", "200 g hvetemel", "2 ss matcha", "100 g sukker", "100 ml olje", "2 egg", "1 ts bakepulver", "100 g valnøtter"],
        steps: [
          "Mos bananene og bland med egg, sukker og olje.",
          "Tilsett mel, matcha og bakepulver.",
          "Vend inn valnøttene.",
          "Hell i en brødform og stek i 50 min på 175°C.",
        ],
      },
    },
  },
  {
    slug: "matcha-scones",
    title: "Matcha Scones",
    category: "Bakken",
    time: "30 min",
    level: "Medium",
    image: recipeScones,
    description: "Engelse scones met matcha — heerlijk bij high tea.",
    ingredients: ["300 g bloem", "2 el matcha", "60 g suiker", "100 g boter (koud)", "200 ml karnemelk", "1 tl bakpoeder"],
    steps: [
      "Wrijf boter door bloem, matcha, suiker en bakpoeder.",
      "Voeg karnemelk toe en kneed kort.",
      "Steek rondjes uit en bak 15 min op 200°C.",
      "Serveer met clotted cream en jam.",
    ],
    i18n: {
      de: {
        title: "Matcha Scones",
        category: "Backen",
        level: "Mittel",
        description: "Englische Scones mit Matcha — herrlich zum High Tea.",
        ingredients: ["300 g Mehl", "2 EL Matcha", "60 g Zucker", "100 g Butter (kalt)", "200 ml Buttermilch", "1 TL Backpulver"],
        steps: [
          "Butter mit Mehl, Matcha, Zucker und Backpulver verreiben.",
          "Buttermilch hinzufügen und kurz kneten.",
          "Kreise ausstechen und 15 Min. bei 200°C backen.",
          "Mit Clotted Cream und Marmelade servieren.",
        ],
      },
      no: {
        title: "Matcha Scones",
        category: "Bakverk",
        level: "Middels",
        description: "Engelske scones med matcha — herlige til high tea.",
        ingredients: ["300 g hvetemel", "2 ss matcha", "60 g sukker", "100 g smør (kaldt)", "200 ml kjernemelk", "1 ts bakepulver"],
        steps: [
          "Smuldre smøret inn i mel, matcha, sukker og bakepulver.",
          "Tilsett kjernemelken og elt deigen raskt sammen.",
          "Stikk ut runde emner og stek i 15 min på 200°C.",
          "Server med clotted cream og syltetøy.",
        ],
      },
    },
  },
  {
    slug: "matcha-croissants",
    title: "Matcha Croissants",
    category: "Bakken",
    time: "3 uur",
    level: "Gevorderd",
    image: recipeCroissants,
    description: "Bladerdeeg-croissants met matcha-witte chocolade vulling.",
    ingredients: ["1 pak croissantdeeg", "100 g witte chocolade", "2 el matcha", "1 ei (voor glazuur)"],
    steps: [
      "Smelt witte chocolade en meng met matcha.",
      "Smeer over croissantdeeg en rol op.",
      "Bestrijk met eigeel.",
      "Bak 15 min op 200°C tot goudbruin.",
    ],
    i18n: {
      de: {
        title: "Matcha Croissants",
        category: "Backen",
        level: "Fortgeschritten",
        description: "Blätterteig-Croissants mit Matcha-weiße-Schokoladen-Füllung.",
        ingredients: ["1 Packung Croissantteig", "100 g weiße Schokolade", "2 EL Matcha", "1 Ei (für die Glasur)"],
        steps: [
          "Weiße Schokolade schmelzen und mit Matcha vermengen.",
          "Auf den Croissantteig streichen und aufrollen.",
          "Mit Eigelb bestreichen.",
          "15 Min. bei 200°C goldbraun backen.",
        ],
      },
      no: {
        title: "Matcha Croissants",
        category: "Bakverk",
        level: "Avansert",
        description: "Croissanter av butterdeig med fyll av matcha og hvit sjokolade.",
        ingredients: ["1 pakke croissantdeig", "100 g hvit sjokolade", "2 ss matcha", "1 egg (til pensling)"],
        steps: [
          "Smelt hvit sjokolade og bland med matcha.",
          "Smør utover croissantdeigen og rull sammen.",
          "Pensle med eggeplomme.",
          "Stek i 15 min på 200°C til de er gylne.",
        ],
      },
    },
  },
  {
    slug: "matcha-affogato",
    title: "Matcha Affogato",
    category: "Desserts",
    time: "5 min",
    level: "Eenvoudig",
    image: recipeAffogato,
    description: "Vanille-ijs verdronken in hete matcha — Italiaans-Japanse fusion.",
    ingredients: ["2 bollen vanille-ijs", "2 g matcha", "60 ml warm water"],
    steps: [
      "Schep ijs in een glas of kom.",
      "Klop matcha met water tot schuimig.",
      "Schenk hete matcha over het ijs.",
      "Direct serveren.",
    ],
    i18n: {
      de: {
        title: "Matcha Affogato",
        category: "Desserts",
        level: "Einfach",
        description: "Vanilleeis ertränkt in heißem Matcha — italienisch-japanische Fusion.",
        ingredients: ["2 Kugeln Vanilleeis", "2 g Matcha", "60 ml warmes Wasser"],
        steps: [
          "Eis in ein Glas oder eine Schale geben.",
          "Matcha mit Wasser schaumig schlagen.",
          "Heißen Matcha über das Eis gießen.",
          "Sofort servieren.",
        ],
      },
      no: {
        title: "Matcha Affogato",
        category: "Desserter",
        level: "Enkel",
        description: "Vaniljeis druknet i varm matcha — italiensk-japansk fusion.",
        ingredients: ["2 kuler vaniljeis", "2 g matcha", "60 ml varmt vann"],
        steps: [
          "Legg isen i et glass eller en bolle.",
          "Visp matcha med vann til det skummer.",
          "Hell den varme matchaen over isen.",
          "Server umiddelbart.",
        ],
      },
    },
  },
  {
    slug: "matcha-creme-brulee",
    title: "Matcha Crème Brûlée",
    category: "Desserts",
    time: "60 min + koelen",
    level: "Gevorderd",
    image: recipeCremeBrulee,
    description: "Klassieke Franse custard met een Japanse twist en gekarameliseerde top.",
    ingredients: ["500 ml slagroom", "5 eierdooiers", "100 g suiker", "2 el matcha", "Vanille", "Suiker voor karamel"],
    steps: [
      "Verwarm slagroom met matcha en vanille.",
      "Klop dooiers met suiker en voeg slagroom toe.",
      "Verdeel over ramekins en bak au bain-marie 40 min op 150°C.",
      "Koel en karameliseer suikertop met brander.",
    ],
    i18n: {
      de: {
        title: "Matcha Crème Brûlée",
        category: "Desserts",
        level: "Fortgeschritten",
        description: "Klassische französische Custard mit japanischem Twist und karamellisierter Kruste.",
        ingredients: ["500 ml Sahne", "5 Eigelb", "100 g Zucker", "2 EL Matcha", "Vanille", "Zucker für das Karamell"],
        steps: [
          "Sahne mit Matcha und Vanille erhitzen.",
          "Eigelb mit Zucker schlagen und Sahne hinzufügen.",
          "In Förmchen füllen und im Wasserbad 40 Min. bei 150°C backen.",
          "Abkühlen lassen und Zuckerkruste mit dem Brenner karamellisieren.",
        ],
      },
      no: {
        title: "Matcha Crème Brûlée",
        category: "Desserter",
        level: "Avansert",
        description: "Klassisk fransk dessertkrem med en japansk vri og karamellisert topp.",
        ingredients: ["500 ml kremfløte", "5 eggeplommer", "100 g sukker", "2 ss matcha", "Vanilje", "Sukker til karamell"],
        steps: [
          "Varm opp kremfløten med matcha og vanilje.",
          "Visp eggeplommer med sukker og tilsett fløten.",
          "Fordel i porsjonsformer og stek i vannbad i 40 min på 150°C.",
          "Avkjøl og karamelliser sukkertoppen med en brenner.",
        ],
      },
    },
  },
  {
    slug: "matcha-panna-cotta",
    title: "Matcha Panna Cotta",
    category: "Desserts",
    time: "20 min + koelen",
    level: "Medium",
    image: recipePannaCotta,
    description: "Zijdezachte Italiaanse pudding met goudblad en bessencoulis.",
    ingredients: ["400 ml slagroom", "100 ml melk", "60 g suiker", "2 el matcha", "3 g gelatine", "Bessencoulis"],
    steps: [
      "Week gelatine in koud water.",
      "Verwarm slagroom, melk, suiker en matcha.",
      "Los gelatine op in warme massa.",
      "Verdeel over vormpjes en koel 4 uur.",
      "Stort om en serveer met bessencoulis.",
    ],
    i18n: {
      de: {
        title: "Matcha Panna Cotta",
        category: "Desserts",
        level: "Mittel",
        description: "Seidig-weicher italienischer Pudding mit Blattgold und Beerencoulis.",
        ingredients: ["400 ml Sahne", "100 ml Milch", "60 g Zucker", "2 EL Matcha", "3 g Gelatine", "Beerencoulis"],
        steps: [
          "Gelatine in kaltem Wasser einweichen.",
          "Sahne, Milch, Zucker und Matcha erhitzen.",
          "Gelatine in der warmen Masse auflösen.",
          "In Förmchen verteilen und 4 Stunden kühlen.",
          "Stürzen und mit Beerencoulis servieren.",
        ],
      },
      no: {
        title: "Matcha Panna Cotta",
        category: "Desserter",
        level: "Middels",
        description: "Silkemyk italiensk pudding med gullblad og bærcoulis.",
        ingredients: ["400 ml kremfløte", "100 ml melk", "60 g sukker", "2 ss matcha", "3 g gelatin", "Bærcoulis"],
        steps: [
          "Bløtlegg gelatinen i kaldt vann.",
          "Varm opp kremfløte, melk, sukker og matcha.",
          "Løs opp gelatinen i den varme blandingen.",
          "Fordel i små former og avkjøl i 4 timer.",
          "Hvelv ut og server med bærcoulis.",
        ],
      },
    },
  },
];

// ─── Public API ──────────────────────────────────────────────

export const recipes: Recipe[] = recipesRaw.map((r) => localize(r, getCurrentLang()));

export const getRecipeBySlug = (slug: string): Recipe | undefined => {
  const r = recipesRaw.find((x) => x.slug === slug);
  return r ? localize(r, getCurrentLang()) : undefined;
};

export function useRecipes(): Recipe[] {
  const { i18n } = useTranslation();
  return useMemo(() => recipesRaw.map((r) => localize(r, getCurrentLang())), [i18n.language]);
}

export function useRecipe(slug: string | undefined): Recipe | undefined {
  const { i18n } = useTranslation();
  return useMemo(() => {
    if (!slug) return undefined;
    const r = recipesRaw.find((x) => x.slug === slug);
    return r ? localize(r, getCurrentLang()) : undefined;
  }, [slug, i18n.language]);
}
