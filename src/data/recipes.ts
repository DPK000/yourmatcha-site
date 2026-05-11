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
  },
];

export const getRecipeBySlug = (slug: string) => recipes.find((r) => r.slug === slug);
