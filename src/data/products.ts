import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import i18nInstance, { type Lang, getCurrentLang } from "@/i18n";
import productPouchCeremonial30 from "@/assets/product-pouch-ceremonial-30.jpg";
import productPouchCeremonial100 from "@/assets/product-pouch-ceremonial-100.jpg";
import productPouchCulinary100 from "@/assets/product-pouch-culinary-100.jpg";
import productPouchHojicha from "@/assets/product-pouch-hojicha.jpg";
import productPouchYuzu from "@/assets/product-pouch-yuzu.jpg";
import productPouchGenmaicha from "@/assets/product-pouch-genmaicha.jpg";
import productPouchSencha from "@/assets/product-pouch-sencha.jpg";
import productPouchVanilla from "@/assets/product-pouch-vanilla.jpg";
import productPouchMint from "@/assets/product-pouch-mint.jpg";
import productPouchCacao from "@/assets/product-pouch-cacao.jpg";
import productPouchBerry from "@/assets/product-pouch-berry.jpg";
import productPouchIced from "@/assets/product-pouch-iced.jpg";
import productTinReserve from "@/assets/product-tin-reserve.jpg";
import productRecipeBook from "@/assets/product-recipe-book.jpg";
import productTravelKit from "@/assets/product-travel-kit.jpg";
import productCupsSet from "@/assets/product-cups-set.jpg";
import productDiscoveryBox from "@/assets/product-discovery-box.jpg";
import productStarterKit from "@/assets/product-starter-kit.jpg";
import productPremiumSet from "@/assets/product-premium-set.jpg";
import productGiftBox from "@/assets/product-gift-box.jpg";
import productChasen from "@/assets/product-chasen.jpg";
import productMatchaBowl from "@/assets/product-matcha-bowl.jpg";
import productChashaku from "@/assets/product-chashaku.jpg";
import productFrother from "@/assets/product-frother.jpg";

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  description: string;
  shortDescription: string;
  category: "matcha-powder" | "kits-sets" | "accessories" | "teas-drinks";
  categoryLabel: string;
  images: string[];
  badge?: string;
  ingredients?: string;
  origin?: string;
  preparation?: string;
  weight?: string;
  bestseller?: boolean;
  hidden?: boolean;
  relatedIds?: string[];
  reviews: { name: string; rating: number; text: string; date: string }[];
}

interface ProductTranslation {
  name?: string;
  description?: string;
  shortDescription?: string;
  categoryLabel?: string;
  ingredients?: string;
  origin?: string;
  preparation?: string;
  badge?: string;
}

interface RawProduct extends Product {
  i18n?: Partial<Record<Exclude<Lang, "nl">, ProductTranslation>>;
}

const CATEGORY_LABEL_DE: Record<Product["category"], string> = {
  "matcha-powder": "Matcha Pulver",
  "kits-sets": "Kits & Sets",
  accessories: "Zubehör",
  "teas-drinks": "Tees & Getränke",
};

const CATEGORY_LABEL_EN: Record<Product["category"], string> = {
  "matcha-powder": "Matcha Powder",
  "kits-sets": "Kits & Sets",
  accessories: "Accessories",
  "teas-drinks": "Teas & Drinks",
};

const CATEGORY_LABEL_FR: Record<Product["category"], string> = {
  "matcha-powder": "Poudre de Matcha",
  "kits-sets": "Kits & Coffrets",
  accessories: "Accessoires",
  "teas-drinks": "Thés & Boissons",
};

const CATEGORY_LABEL_NO: Record<Product["category"], string> = {
  "matcha-powder": "Matchapulver",
  "kits-sets": "Sett & Pakker",
  accessories: "Tilbehør",
  "teas-drinks": "Te & Drikke",
};

const BADGE_TRANSLATIONS: Record<string, Record<Exclude<Lang, "nl">, string>> = {
  Bestseller: { de: "Bestseller", en: "Bestseller", fr: "Bestseller", no: "Bestselger" },
  Voordeel: { de: "Großpackung", en: "Value", fr: "Format avantageux", no: "Storpakning" },
  Nieuw: { de: "Neu", en: "New", fr: "Nouveau", no: "Ny" },
  Populair: { de: "Beliebt", en: "Popular", fr: "Populaire", no: "Populær" },
  Premium: { de: "Premium", en: "Premium", fr: "Premium", no: "Premium" },
  Limited: { de: "Limitiert", en: "Limited", fr: "Édition limitée", no: "Begrenset opplag" },
  Zomer: { de: "Sommer", en: "Summer", fr: "Été", no: "Sommer" },
};

function localizeBadge(badge: string | undefined, lang: Exclude<Lang, "nl">): string | undefined {
  if (!badge) return undefined;
  return BADGE_TRANSLATIONS[badge]?.[lang] ?? badge;
}

function localize(p: RawProduct, lang: Lang): Product {
  const { i18n: tr, ...base } = p;
  if (lang === "nl" || !tr) {
    return base;
  }
  const t = tr[lang];
  const fallbackCategoryLabel =
    lang === "de" ? CATEGORY_LABEL_DE[p.category]
      : lang === "en" ? CATEGORY_LABEL_EN[p.category]
      : lang === "no" ? CATEGORY_LABEL_NO[p.category]
      : CATEGORY_LABEL_FR[p.category];
  return {
    ...base,
    name: t?.name ?? base.name,
    description: t?.description ?? base.description,
    shortDescription: t?.shortDescription ?? base.shortDescription,
    categoryLabel: t?.categoryLabel ?? fallbackCategoryLabel,
    ingredients: t?.ingredients ?? base.ingredients,
    origin: t?.origin ?? base.origin,
    preparation: t?.preparation ?? base.preparation,
    badge: t?.badge ?? localizeBadge(base.badge, lang),
  };
}

export const categories = [
  { value: "all", label: "Alle Producten" },
  { value: "matcha-powder", label: "Matcha Poeder" },
  { value: "kits-sets", label: "Kits & Sets" },
  { value: "accessories", label: "Accessoires" },
  { value: "teas-drinks", label: "Thee & Dranken" },
];

const productsRaw: RawProduct[] = [
  {
    id: "ceremonial-30",
    name: "Ceremonial Matcha 30g",
    slug: "ceremonial-matcha-30g",
    price: 18.95,
    description: "Onze premium ceremonial grade matcha, handgeplukt in de Uji-regio van Kyoto, Japan. Een levendig groene kleur, zoete umami smaak en fluweelzachte textuur — perfect voor de traditionele theeceremonie of een puur matcha ritueel.",
    shortDescription: "Handgeplukt in Uji, Japan. Zuivere umami smaak.",
    category: "matcha-powder",
    categoryLabel: "Matcha Poeder",
    images: [productPouchCeremonial30],
    badge: "Bestseller",
    bestseller: true,
    ingredients: "100% biologische Japanse matcha (Camellia sinensis)",
    origin: "Uji, Kyoto, Japan",
    preparation: "Zeef 1-2 gram matcha. Voeg 70ml water toe (80°C). Klop met een chasen tot schuimig.",
    weight: "30g",
    relatedIds: ["ceremonial-100", "starter-kit", "chasen"],
    i18n: {
      de: {
        name: "Zeremonieller Matcha 30g",
        description: "Unser zeremonieller Premium-Matcha, von Hand gepflückt in der Uji-Region in Kyoto, Japan. Eine leuchtend grüne Farbe, süßer Umami-Geschmack und samtige Textur — perfekt für die traditionelle Teezeremonie oder ein reines Matcha-Ritual.",
        shortDescription: "Handgepflückt in Uji, Japan. Reiner Umami-Geschmack.",
        ingredients: "100% biologischer japanischer Matcha (Camellia sinensis)",
        preparation: "1–2 g Matcha sieben. 70 ml Wasser (80°C) hinzufügen. Mit einem Chasen schaumig schlagen.",
      },
      no: {
        name: "Seremoniell Matcha 30g",
        description: "Vår seremonielle premium-matcha, håndplukket i Uji-regionen i Kyoto, Japan. Levende grønn farge, søt umamismak og fløyelsmyk tekstur — perfekt til den tradisjonelle teseremonien eller ditt eget matcharitual.",
        shortDescription: "Håndplukket i Uji, Japan. Ren umamismak.",
        ingredients: "100 % økologisk japansk matcha (Camellia sinensis)",
        preparation: "Sikt 1–2 gram matcha. Tilsett 70 ml vann (80 °C). Visp med en chasen til den skummer.",
      },
    },
    reviews: [
      { name: "Sophie V.", rating: 5, text: "De beste matcha die ik ooit heb geproefd. Prachtige kleur en smaak.", date: "2024-02-15" },
      { name: "Lars M.", rating: 5, text: "Geweldige kwaliteit, mijn dagelijkse ritueel.", date: "2024-01-20" },
      { name: "Emma D.", rating: 4, text: "Heerlijke matcha, snelle levering.", date: "2024-03-01" },
      { name: "Julia K.", rating: 5, text: "Levendig groen en zo'n zachte umami. Echt verschil met supermarkt matcha.", date: "2024-03-18" },
      { name: "Tom S.", rating: 5, text: "Mooie verpakking, perfect kopje matcha. Wordt vaste bestelling.", date: "2024-04-05" },
      { name: "Sanne B.", rating: 5, text: "Smaak is fluweelzacht, bijna romig. Aanrader voor de echte liefhebber.", date: "2024-04-22" },
      { name: "Marit H.", rating: 4, text: "Fijne matcha, klopt zonder klontjes. Iets pittiger dan verwacht.", date: "2024-05-09" },
    ],
  },
  {
    id: "ceremonial-100",
    name: "Ceremonial Matcha 100g",
    slug: "ceremonial-matcha-100g",
    price: 49.95,
    description: "Onze premium ceremonial grade matcha in voordeelverpakking van 100 gram. Dezelfde ongeëvenaarde kwaliteit uit Uji, voor de echte matcha liefhebber die dagelijks geniet van het perfecte kopje.",
    shortDescription: "Premium kwaliteit, voordeelverpakking.",
    category: "matcha-powder",
    categoryLabel: "Matcha Poeder",
    images: [productPouchCeremonial100],
    badge: "Voordeel",
    bestseller: true,
    ingredients: "100% biologische Japanse matcha (Camellia sinensis)",
    origin: "Uji, Kyoto, Japan",
    preparation: "Zeef 1-2 gram matcha. Voeg 70ml water toe (80°C). Klop met een chasen tot schuimig.",
    weight: "100g",
    relatedIds: ["ceremonial-30", "premium-set", "matcha-bowl"],
    i18n: {
      de: {
        name: "Zeremonieller Matcha 100g",
        description: "Unser zeremonieller Premium-Matcha in der 100-Gramm-Großpackung. Dieselbe unübertroffene Qualität aus Uji — für den echten Matcha-Liebhaber, der täglich die perfekte Tasse genießt.",
        shortDescription: "Premium-Qualität in der Großpackung.",
        ingredients: "100% biologischer japanischer Matcha (Camellia sinensis)",
        preparation: "1–2 g Matcha sieben. 70 ml Wasser (80°C) hinzufügen. Mit einem Chasen schaumig schlagen.",
      },
      no: {
        name: "Seremoniell Matcha 100g",
        description: "Vår seremonielle premium-matcha i storpakning på 100 gram. Samme uovertrufne kvalitet fra Uji — for den ekte matchaelskeren som nyter den perfekte koppen hver dag.",
        shortDescription: "Premiumkvalitet i storpakning.",
        ingredients: "100 % økologisk japansk matcha (Camellia sinensis)",
        preparation: "Sikt 1–2 gram matcha. Tilsett 70 ml vann (80 °C). Visp med en chasen til den skummer.",
      },
    },
    reviews: [
      { name: "Thomas K.", rating: 5, text: "Perfecte waarde voor deze kwaliteit.", date: "2024-02-28" },
      { name: "Linde V.", rating: 5, text: "100g gaat lang mee en blijft vers in de pouch. Top!", date: "2024-03-15" },
      { name: "Bram J.", rating: 5, text: "Heldere umami en lange afdronk. Beste prijs-kwaliteit.", date: "2024-04-01" },
      { name: "Esmee P.", rating: 5, text: "Voor mijn ochtend ritueel — dagelijks genot.", date: "2024-04-19" },
      { name: "Joris D.", rating: 4, text: "Hoge kwaliteit, levering keurig binnen 2 dagen.", date: "2024-05-03" },
    ],
  },
  {
    id: "culinary-100",
    name: "Culinary Matcha 100g",
    slug: "culinary-matcha-100g",
    price: 24.95,
    description: "Onze culinary grade matcha is perfect voor matcha lattes, smoothies en gebak. Een iets robuustere smaak die zich uitstekend mengt met melk en andere ingrediënten.",
    shortDescription: "Ideaal voor lattes, smoothies & recepten.",
    category: "matcha-powder",
    categoryLabel: "Matcha Poeder",
    images: [productPouchCulinary100],
    relatedIds: ["frother", "ceremonial-30", "vanilla-matcha"],
    ingredients: "100% Japanse matcha (Camellia sinensis)",
    origin: "Kagoshima, Japan",
    weight: "100g",
    i18n: {
      de: {
        name: "Culinary Matcha 100g",
        description: "Unser Culinary Grade Matcha eignet sich perfekt für Matcha Lattes, Smoothies und Backwaren. Ein etwas kräftigerer Geschmack, der sich hervorragend mit Milch und anderen Zutaten verbindet.",
        shortDescription: "Ideal für Lattes, Smoothies & Rezepte.",
        ingredients: "100% japanischer Matcha (Camellia sinensis)",
      },
      no: {
        name: "Culinary Matcha 100g",
        description: "Vår culinary grade-matcha er perfekt til matcha latte, smoothier og bakverk. En litt fyldigere smak som blander seg utmerket med melk og andre ingredienser.",
        shortDescription: "Ideell til latte, smoothier og oppskrifter.",
        ingredients: "100 % japansk matcha (Camellia sinensis)",
      },
    },
    reviews: [
      { name: "Anna B.", rating: 5, text: "Perfect voor mijn ochtend latte!", date: "2024-01-15" },
      { name: "Mees T.", rating: 5, text: "Mengt prachtig met haver- en amandelmelk. Mooi groen schuim.", date: "2024-02-12" },
      { name: "Iris W.", rating: 4, text: "Stevige smaak, ideaal voor bakken. Mijn matcha brownies zijn een hit.", date: "2024-03-08" },
      { name: "Sander R.", rating: 5, text: "Beste culinary die ik geprobeerd heb. Geen bittere ondertoon.", date: "2024-04-14" },
      { name: "Kim L.", rating: 5, text: "Gebruik het dagelijks voor smoothies. Top kwaliteit voor de prijs.", date: "2024-05-01" },
    ],
  },
  {
    id: "vanilla-matcha",
    name: "Vanilla Matcha 50g",
    slug: "vanilla-matcha-50g",
    price: 22.95,
    description: "Onze culinary matcha verfijnd met echte Bourbon vanille. Romig, zacht en perfect voor lattes met een natuurlijk zoete twist.",
    shortDescription: "Romige matcha met Bourbon vanille.",
    category: "matcha-powder",
    categoryLabel: "Matcha Poeder",
    images: [productPouchVanilla],
    badge: "Nieuw",
    ingredients: "Japanse matcha, Bourbon vanille poeder",
    origin: "Kagoshima, Japan",
    weight: "50g",
    relatedIds: ["culinary-100", "frother", "matcha-yuzu"],
    i18n: {
      de: {
        name: "Vanille Matcha 50g",
        description: "Unser Culinary Matcha verfeinert mit echter Bourbon-Vanille. Cremig, mild und perfekt für Lattes mit einem natürlich süßen Twist.",
        shortDescription: "Cremiger Matcha mit Bourbon-Vanille.",
        ingredients: "Japanischer Matcha, Bourbon-Vanille-Pulver",
      },
      no: {
        name: "Vanilje-Matcha 50g",
        description: "Vår culinary matcha foredlet med ekte bourbonvanilje. Kremet, mild og perfekt til latte med en naturlig søt vri.",
        shortDescription: "Kremet matcha med bourbonvanilje.",
        ingredients: "Japansk matcha, bourbonvaniljepulver",
      },
    },
    reviews: [
      { name: "Noor P.", rating: 5, text: "Verslavend lekker in een latte!", date: "2024-03-10" },
      { name: "Femke A.", rating: 5, text: "De vanille is écht echt — geen kunstmatige smaak.", date: "2024-03-28" },
      { name: "Roos D.", rating: 5, text: "Mijn favoriete avond drankje, zo romig.", date: "2024-04-15" },
      { name: "Jasper V.", rating: 4, text: "Lekker zoet zonder suiker toe te voegen. Aanrader.", date: "2024-05-02" },
    ],
  },
  {
    id: "starter-kit",
    name: "Starter Kit",
    slug: "starter-kit",
    price: 39.95,
    description: "Alles wat je nodig hebt om te starten met matcha. Bevat 30g ceremonial grade matcha, een handgemaakte bamboe chasen en een keramische matcha kom.",
    shortDescription: "30g matcha + bamboe klopper + keramische kom.",
    category: "kits-sets",
    categoryLabel: "Kits & Sets",
    images: [productStarterKit],
    badge: "Populair",
    bestseller: true,
    relatedIds: ["ceremonial-30", "chashaku", "chasen"],
    i18n: {
      de: {
        name: "Starter Set",
        description: "Alles, was du brauchst, um mit Matcha zu starten. Enthält 30 g zeremoniellen Matcha, einen handgefertigten Bambus-Chasen und eine keramische Matcha-Schale.",
        shortDescription: "30 g Matcha + Bambusbesen + Keramikschale.",
      },
      no: {
        name: "Startsett",
        description: "Alt du trenger for å komme i gang med matcha. Inneholder 30 g seremoniell matcha, en håndlaget chasen i bambus og en matchaskål i keramikk.",
        shortDescription: "30 g matcha + bambusvisp + keramikkskål.",
      },
    },
    reviews: [
      { name: "Mila J.", rating: 5, text: "Prachtige set, geweldig cadeau!", date: "2024-02-10" },
      { name: "Daan V.", rating: 5, text: "Alles van hoge kwaliteit. Aanrader.", date: "2024-01-25" },
      { name: "Lieke S.", rating: 5, text: "Perfect om te beginnen met matcha. Duidelijke uitleg erbij.", date: "2024-03-12" },
      { name: "Wouter F.", rating: 5, text: "Mooi verpakt, ideaal als verjaardagscadeau gegeven.", date: "2024-04-08" },
      { name: "Eline B.", rating: 4, text: "Fijne starter, kom is prachtig handgemaakt.", date: "2024-04-25" },
      { name: "Nina H.", rating: 5, text: "Binnen 5 minuten mijn eerste perfecte kopje. Topservice.", date: "2024-05-10" },
    ],
  },
  {
    id: "premium-set",
    name: "Premium Ritual Set",
    slug: "premium-ritual-set",
    price: 79.95,
    description: "Het ultieme matcha ritueel. Bevat 100g ceremonial matcha, handgemaakte chasen, ambachtelijke keramische kom en chakin doek. Verpakt in een prachtige geschenkdoos.",
    shortDescription: "100g matcha + klopper + kom + chakin doek.",
    category: "kits-sets",
    categoryLabel: "Kits & Sets",
    images: [productPremiumSet],
    badge: "Premium",
    relatedIds: ["ceremonial-100", "chashaku"],
    i18n: {
      de: {
        name: "Premium Ritual Set",
        description: "Das ultimative Matcha-Ritual. Enthält 100 g zeremoniellen Matcha, handgefertigten Chasen, kunstvoll gefertigte Keramikschale und Chakin-Tuch. Verpackt in einer wunderschönen Geschenkbox.",
        shortDescription: "100 g Matcha + Besen + Schale + Chakin-Tuch.",
      },
      no: {
        name: "Premium Ritualsett",
        description: "Det ultimate matcharitualet. Inneholder 100 g seremoniell matcha, håndlaget chasen, keramikkskål formet av håndverkere og chakin-klut. Levert i en nydelig gaveeske.",
        shortDescription: "100 g matcha + visp + skål + chakin-klut.",
      },
    },
    reviews: [
      { name: "Isabel R.", rating: 5, text: "Schitterend! Voelt als een luxe ritueel.", date: "2024-03-05" },
      { name: "Olivier M.", rating: 5, text: "Verpakking is een belevenis op zich. Cadeau gegeven aan moeder — ze was sprakeloos.", date: "2024-03-22" },
      { name: "Camille D.", rating: 5, text: "De kom is een kunstwerk en de matcha is sublime.", date: "2024-04-09" },
      { name: "Hugo P.", rating: 5, text: "Premium in elk detail, geld dubbel en dwars waard.", date: "2024-04-28" },
      { name: "Saskia V.", rating: 5, text: "Mijn dagelijks ritueel sinds ik deze set heb. Geweldig.", date: "2024-05-14" },
    ],
  },
  {
    id: "gift-box",
    name: "Gift Box",
    slug: "gift-box",
    price: 59.95,
    description: "Een zorgvuldig samengestelde geschenkdoos met onze beste producten. Perfect cadeau voor matcha liefhebbers, met een persoonlijk kaartje.",
    shortDescription: "Gecureerde selectie in premium verpakking.",
    category: "kits-sets",
    categoryLabel: "Kits & Sets",
    images: [productGiftBox],
    relatedIds: ["starter-kit", "premium-set"],
    i18n: {
      de: {
        name: "Geschenkbox",
        description: "Eine sorgfältig zusammengestellte Geschenkbox mit unseren besten Produkten. Das perfekte Geschenk für Matcha-Liebhaber, inklusive persönlicher Karte.",
        shortDescription: "Kuratierte Auswahl in Premium-Verpackung.",
      },
      no: {
        name: "Gaveeske",
        description: "En omsorgsfullt sammensatt gaveeske med våre beste produkter. Den perfekte gaven til matchaelskere, med et personlig kort.",
        shortDescription: "Kuratert utvalg i premium innpakning.",
      },
    },
    reviews: [
      { name: "Hannah L.", rating: 5, text: "Cadeau gegeven aan mijn zus — ze was helemaal verrast door de mooie verpakking.", date: "2024-02-20" },
      { name: "Vincent K.", rating: 5, text: "Perfect Sinterklaas cadeau. Voelt echt premium aan.", date: "2024-03-15" },
      { name: "Britt M.", rating: 5, text: "Inhoud is goed gekozen, niets overbodigs. Mooi kaartje erbij.", date: "2024-04-02" },
      { name: "Tessa W.", rating: 4, text: "Mooi cadeau, snelle levering met handgeschreven kaart.", date: "2024-04-20" },
    ],
  },
  {
    id: "discovery-box",
    name: "Discovery Tea Box",
    slug: "discovery-tea-box",
    price: 34.95,
    description: "Ontdek ons volledige theeassortiment. Een proefbox met ceremonial matcha, hojicha, sencha en genmaicha — perfect om jouw favoriet te vinden.",
    shortDescription: "Proefbox met 4 Japanse thee specialiteiten.",
    category: "kits-sets",
    categoryLabel: "Kits & Sets",
    images: [productDiscoveryBox],
    badge: "Nieuw",
    relatedIds: ["hojicha", "sencha", "genmaicha"],
    i18n: {
      de: {
        name: "Tee Entdecker-Box",
        description: "Entdecke unser komplettes Tee-Sortiment. Eine Probierbox mit zeremoniellem Matcha, Hojicha, Sencha und Genmaicha — perfekt, um deinen Favoriten zu finden.",
        shortDescription: "Probierbox mit 4 japanischen Tee-Spezialitäten.",
      },
      no: {
        name: "Te-oppdagelsesboks",
        description: "Utforsk hele tesortimentet vårt. En smaksboks med seremoniell matcha, hojicha, sencha og genmaicha — perfekt for å finne favoritten din.",
        shortDescription: "Smaksboks med 4 japanske tespesialiteter.",
      },
    },
    reviews: [
      { name: "Robin J.", rating: 5, text: "Geweldige manier om de hele lijn te proeven. Hojicha was mijn favoriet!", date: "2024-03-01" },
      { name: "Demi V.", rating: 5, text: "Perfect om te ontdekken wat bij je past. Goede portiegrootte.", date: "2024-03-25" },
      { name: "Sven P.", rating: 4, text: "Leuke box, alleen wel snel doorheen.", date: "2024-04-12" },
      { name: "Anouk B.", rating: 5, text: "Ideaal als kennismaking. Heb daarna meteen sencha bijbesteld.", date: "2024-05-05" },
    ],
  },
  {
    id: "chasen",
    name: "Bamboe Chasen (Klopper)",
    slug: "bamboe-chasen",
    price: 14.95,
    description: "Een traditionele bamboe matcha klopper, handgemaakt van een enkel stuk bamboe met 80 fijne tanden. Essentieel voor de perfecte schuimige matcha.",
    shortDescription: "Handgemaakt, 80 tanden, traditioneel bamboe.",
    category: "accessories",
    categoryLabel: "Accessoires",
    images: [productChasen],
    relatedIds: ["matcha-bowl", "chashaku", "ceremonial-30"],
    i18n: {
      de: {
        name: "Bambus-Chasen (Matchabesen)",
        description: "Ein traditioneller Bambus-Matchabesen, handgefertigt aus einem einzigen Stück Bambus mit 80 feinen Borsten. Unverzichtbar für den perfekt schaumigen Matcha.",
        shortDescription: "Handgefertigt, 80 Borsten, traditioneller Bambus.",
      },
      no: {
        name: "Bambus-chasen (matchavisp)",
        description: "En tradisjonell matchavisp i bambus, håndlaget av ett enkelt stykke bambus med 80 fine tagger. Uunnværlig for en perfekt skummende matcha.",
        shortDescription: "Håndlaget, 80 tagger, tradisjonell bambus.",
      },
    },
    reviews: [
      { name: "Ruben H.", rating: 4, text: "Mooie kwaliteit klopper.", date: "2024-02-20" },
      { name: "Maud E.", rating: 5, text: "Veel beter dan goedkope varianten — schuim is veel fijner.", date: "2024-03-10" },
      { name: "Quinn L.", rating: 5, text: "Echte vakmanschap, voelt licht en stevig tegelijk.", date: "2024-04-01" },
      { name: "Stijn M.", rating: 5, text: "Gaat mij lang mee, behandel ik met zorg. Top product.", date: "2024-04-22" },
    ],
  },
  {
    id: "matcha-bowl",
    name: "Keramische Matcha Kom",
    slug: "keramische-matcha-kom",
    price: 29.95,
    description: "Een prachtige handgemaakte keramische matcha kom (chawan) met uniek glazuur. Elke kom is uniek en gemaakt door ambachtslieden.",
    shortDescription: "Uniek handgemaakt, ambachtelijk glazuur.",
    category: "accessories",
    categoryLabel: "Accessoires",
    images: [productMatchaBowl],
    relatedIds: ["chasen", "chashaku", "ceremonial-30"],
    i18n: {
      de: {
        name: "Keramische Matcha-Schale",
        description: "Eine wunderschöne handgefertigte keramische Matcha-Schale (Chawan) mit einzigartiger Glasur. Jede Schale ist ein Unikat, gefertigt von Kunsthandwerkern.",
        shortDescription: "Einzigartig handgefertigt, kunstvolle Glasur.",
      },
      no: {
        name: "Matchaskål i keramikk",
        description: "En nydelig håndlaget matchaskål i keramikk (chawan) med unik glasur. Hver skål er unik, formet av dyktige håndverkere.",
        shortDescription: "Unik og håndlaget, med håndverksglasur.",
      },
    },
    reviews: [
      { name: "Lotte S.", rating: 5, text: "Prachtig! Elk stuk is echt uniek.", date: "2024-01-30" },
      { name: "Floortje N.", rating: 5, text: "Ligt perfect in de hand, mooi glazuur. Voelt warm aan.", date: "2024-02-25" },
      { name: "Bas K.", rating: 5, text: "Voelt ambachtelijk. Goede afmeting voor klassieke bereiding.", date: "2024-03-19" },
      { name: "Yara D.", rating: 4, text: "Heel mooi stuk, levering goed verpakt.", date: "2024-04-15" },
    ],
  },
  {
    id: "chashaku",
    name: "Bamboe Chashaku (Lepel)",
    slug: "bamboe-chashaku",
    price: 7.95,
    description: "Een traditionele bamboe matcha lepel voor de perfecte hoeveelheid matcha. Handgemaakt en duurzaam.",
    shortDescription: "Traditionele bamboe maatlepel.",
    category: "accessories",
    categoryLabel: "Accessoires",
    images: [productChashaku],
    relatedIds: ["chasen", "matcha-bowl"],
    i18n: {
      de: {
        name: "Bambus-Chashaku (Matchalöffel)",
        description: "Ein traditioneller Bambus-Matchalöffel für die perfekte Matcha-Menge. Handgefertigt und nachhaltig.",
        shortDescription: "Traditioneller Bambus-Messlöffel.",
      },
      no: {
        name: "Bambus-chashaku (matchaskje)",
        description: "En tradisjonell matchaskje i bambus som gir nøyaktig riktig mengde matcha. Håndlaget og bærekraftig.",
        shortDescription: "Tradisjonell måleskje i bambus.",
      },
    },
    reviews: [
      { name: "Thijs B.", rating: 5, text: "Perfecte hoeveelheid in één scoop. Mooi bamboe.", date: "2024-02-08" },
      { name: "Iris H.", rating: 5, text: "Klein detail dat veel verschil maakt in het ritueel.", date: "2024-03-04" },
      { name: "Niek V.", rating: 4, text: "Goede prijs, doet wat het moet doen.", date: "2024-04-10" },
    ],
  },
  {
    id: "frother",
    name: "Elektrische Melkopschuimer",
    slug: "elektrische-melkopschuimer",
    price: 12.95,
    description: "Handige elektrische melkopschuimer, perfect voor het snel bereiden van matcha lattes. Compact en eenvoudig in gebruik.",
    shortDescription: "Snel & eenvoudig matcha lattes maken.",
    category: "accessories",
    categoryLabel: "Accessoires",
    images: [productFrother],
    relatedIds: ["culinary-100", "vanilla-matcha"],
    i18n: {
      de: {
        name: "Elektrischer Milchaufschäumer",
        description: "Praktischer elektrischer Milchaufschäumer, perfekt für die schnelle Zubereitung von Matcha Lattes. Kompakt und einfach in der Anwendung.",
        shortDescription: "Schnell & einfach Matcha Lattes zubereiten.",
      },
      no: {
        name: "Elektrisk melkeskummer",
        description: "Praktisk elektrisk melkeskummer, perfekt for å lage matcha latte på et blunk. Kompakt og enkel i bruk.",
        shortDescription: "Lag matcha latte raskt og enkelt.",
      },
    },
    reviews: [
      { name: "Sophia M.", rating: 5, text: "Snel, krachtig en stil. Mijn lattes zijn nu perfect schuimig.", date: "2024-02-14" },
      { name: "Dennis R.", rating: 5, text: "Klein maar krachtig, perfect voor culinary matcha.", date: "2024-03-03" },
      { name: "Lara K.", rating: 4, text: "Werkt goed, batterijen gaan lang mee.", date: "2024-03-28" },
      { name: "Mark V.", rating: 5, text: "Voor wie geen chasen wil — dit is de oplossing.", date: "2024-04-19" },
    ],
  },
  {
    id: "hojicha",
    name: "Hojicha Poeder 50g",
    slug: "hojicha-poeder-50g",
    price: 16.95,
    description: "Geroosterde Japanse groene thee in poedervorm. Hojicha heeft een warm, karamelachtig en nootachtig profiel met weinig cafeïne. Heerlijk als warme thee of latte.",
    shortDescription: "Geroosterde thee, warm & karamelachtig.",
    category: "teas-drinks",
    categoryLabel: "Thee & Dranken",
    images: [productPouchHojicha],
    relatedIds: ["genmaicha", "matcha-yuzu", "sencha"],
    ingredients: "100% Japanse hojicha (Camellia sinensis)",
    origin: "Kyoto, Japan",
    weight: "50g",
    i18n: {
      de: {
        name: "Hojicha Pulver 50g",
        description: "Gerösteter japanischer Grüntee in Pulverform. Hojicha hat ein warmes, karamellartiges und nussiges Profil mit wenig Koffein. Köstlich als heißer Tee oder Latte.",
        shortDescription: "Gerösteter Tee, warm & karamellig.",
        ingredients: "100% japanischer Hojicha (Camellia sinensis)",
      },
      no: {
        name: "Hojicha-pulver 50g",
        description: "Ristet japansk grønn te i pulverform. Hojicha har en varm, karamellaktig og nøtteaktig profil med lite koffein. Nydelig som varm te eller latte.",
        shortDescription: "Ristet te, varm og karamellaktig.",
        ingredients: "100 % japansk hojicha (Camellia sinensis)",
      },
    },
    reviews: [
      { name: "Eva T.", rating: 5, text: "Heerlijk voor 's avonds, laag in cafeïne.", date: "2024-02-18" },
      { name: "Pim D.", rating: 5, text: "Karamel- en notenaroma, echt verrassend lekker.", date: "2024-03-09" },
      { name: "Inge V.", rating: 5, text: "Geweldig in een latte met havermelk. Comfort in een kop.", date: "2024-04-02" },
      { name: "Suze L.", rating: 4, text: "Warme smaak, perfect voor herfstavonden.", date: "2024-04-23" },
    ],
  },
  {
    id: "sencha",
    name: "Sencha Loose Leaf 75g",
    slug: "sencha-loose-leaf-75g",
    price: 14.95,
    description: "De meest gedronken groene thee van Japan. Verfrissend, grasachtig en licht zoet. Een perfecte dagelijkse thee uit Shizuoka.",
    shortDescription: "Verfrissende klassieke Japanse groene thee.",
    category: "teas-drinks",
    categoryLabel: "Thee & Dranken",
    images: [productPouchSencha],
    badge: "Nieuw",
    ingredients: "100% Japanse sencha (Camellia sinensis)",
    origin: "Shizuoka, Japan",
    weight: "75g",
    relatedIds: ["genmaicha", "hojicha"],
    i18n: {
      de: {
        name: "Sencha lose Blätter 75g",
        description: "Der meistgetrunkene Grüntee Japans. Erfrischend, grasig und leicht süßlich. Ein perfekter Alltagstee aus Shizuoka.",
        shortDescription: "Erfrischender klassischer japanischer Grüntee.",
        ingredients: "100% japanischer Sencha (Camellia sinensis)",
      },
      no: {
        name: "Sencha løse teblader 75g",
        description: "Japans mest populære grønne te. Forfriskende, gressaktig og lett søtlig. En perfekt hverdagste fra Shizuoka.",
        shortDescription: "Forfriskende klassisk japansk grønn te.",
        ingredients: "100 % japansk sencha (Camellia sinensis)",
      },
    },
    reviews: [
      { name: "Bart W.", rating: 5, text: "Zacht grasachtig en zoet — niet bitter zoals andere sencha's.", date: "2024-03-06" },
      { name: "Karlijn R.", rating: 5, text: "Mijn dagelijkse middagthee. Hoge kwaliteit losse blad.", date: "2024-03-29" },
      { name: "Hidde M.", rating: 4, text: "Verfrissend, mooie heldergele kleur na zetten.", date: "2024-04-18" },
      { name: "Saar B.", rating: 5, text: "Heerlijk verfrissend, goed te zetten meerdere keren.", date: "2024-05-08" },
    ],
  },
  {
    id: "genmaicha",
    name: "Genmaicha Loose Leaf 50g",
    slug: "genmaicha-loose-leaf-50g",
    price: 12.95,
    description: "Traditionele Japanse groene thee gemengd met geroosterde rijst. Een unieke, nootachtige en hartige smaak — geweldig bij het ontbijt.",
    shortDescription: "Groene thee met geroosterde rijst.",
    category: "teas-drinks",
    categoryLabel: "Thee & Dranken",
    images: [productPouchGenmaicha],
    relatedIds: ["hojicha", "sencha"],
    ingredients: "Japanse groene thee, geroosterde rijst",
    origin: "Shizuoka, Japan",
    weight: "50g",
    i18n: {
      de: {
        name: "Genmaicha lose Blätter 50g",
        description: "Traditioneller japanischer Grüntee gemischt mit geröstetem Reis. Ein einzigartiger, nussiger und herzhafter Geschmack — wunderbar zum Frühstück.",
        shortDescription: "Grüntee mit geröstetem Reis.",
        ingredients: "Japanischer Grüntee, gerösteter Reis",
      },
      no: {
        name: "Genmaicha løse teblader 50g",
        description: "Tradisjonell japansk grønn te blandet med ristet ris. En unik, nøtteaktig og fyldig smak — herlig til frokosten.",
        shortDescription: "Grønn te med ristet ris.",
        ingredients: "Japansk grønn te, ristet ris",
      },
    },
    reviews: [
      { name: "Jeroen H.", rating: 5, text: "Nootachtig en hartig, perfect bij het ontbijt.", date: "2024-02-22" },
      { name: "Lisanne K.", rating: 5, text: "De geroosterde rijst geeft echt een extra dimensie. Top!", date: "2024-03-17" },
      { name: "Casper N.", rating: 4, text: "Verrassend lekker, ook voor wie niet van groene thee houdt.", date: "2024-04-09" },
    ],
  },
  {
    id: "matcha-yuzu",
    name: "Matcha Yuzu Blend 40g",
    slug: "matcha-yuzu-blend-40g",
    price: 19.95,
    description: "Unieke blend van premium matcha met Japanse yuzu citrus. Verfrissend en aromatisch, perfect voor een zomerse matcha ervaring of als basis voor cocktails.",
    shortDescription: "Verfrissende matcha met Japanse yuzu citrus.",
    category: "teas-drinks",
    categoryLabel: "Thee & Dranken",
    images: [productPouchYuzu],
    badge: "Nieuw",
    ingredients: "Japanse matcha, yuzu schilpoeder",
    origin: "Uji, Japan",
    weight: "40g",
    relatedIds: ["ceremonial-30", "hojicha", "vanilla-matcha"],
    i18n: {
      de: {
        name: "Matcha Yuzu Blend 40g",
        description: "Einzigartige Mischung aus Premium-Matcha und japanischer Yuzu-Zitrusfrucht. Erfrischend und aromatisch — perfekt für ein sommerliches Matcha-Erlebnis oder als Basis für Cocktails.",
        shortDescription: "Erfrischender Matcha mit japanischer Yuzu-Zitrusfrucht.",
        ingredients: "Japanischer Matcha, Yuzu-Schalenpulver",
      },
      no: {
        name: "Matcha Yuzu Blend 40g",
        description: "Unik blanding av premium matcha og japansk yuzu-sitrus. Forfriskende og aromatisk — perfekt for en sommerlig matchaopplevelse eller som base i cocktailer.",
        shortDescription: "Forfriskende matcha med japansk yuzu-sitrus.",
        ingredients: "Japansk matcha, pulver av yuzuskall",
      },
    },
    reviews: [
      { name: "Romee S.", rating: 5, text: "Frisse citrustwist, ideaal in een iced latte.", date: "2024-03-12" },
      { name: "Tijn B.", rating: 5, text: "Heel zomers, gebruikt in een matcha gin tonic. Geweldig!", date: "2024-04-05" },
      { name: "Maartje V.", rating: 4, text: "Aromatisch en uniek. Hou wel van een uitgesproken smaak.", date: "2024-04-25" },
    ],
  },
  {
    id: "matcha-mint",
    name: "Mint Matcha 40g",
    slug: "mint-matcha-40g",
    price: 19.95,
    description: "Verfrissende blend van premium matcha met biologische pepermunt. Een kristalheldere, koelende smaak — perfect voor een ijskoude latte op een warme dag of als wakkermakertje.",
    shortDescription: "Verfrissende matcha met biologische pepermunt.",
    category: "teas-drinks",
    categoryLabel: "Thee & Dranken",
    images: [productPouchMint],
    badge: "Nieuw",
    ingredients: "Japanse matcha, biologische pepermunt",
    origin: "Kagoshima, Japan",
    weight: "40g",
    relatedIds: ["ceremonial-30", "matcha-yuzu", "iced-matcha"],
    i18n: {
      de: {
        name: "Minz-Matcha 40g",
        description: "Erfrischende Mischung aus Premium-Matcha und biologischer Pfefferminze. Ein kristallklarer, kühlender Geschmack — perfekt für eine eiskalte Latte an warmen Tagen oder als Wachmacher.",
        shortDescription: "Erfrischender Matcha mit biologischer Pfefferminze.",
        ingredients: "Japanischer Matcha, biologische Pfefferminze",
      },
      no: {
        name: "Mynte-Matcha 40g",
        description: "Forfriskende blanding av premium matcha og økologisk peppermynte. En krystallklar, kjølende smak — perfekt til en iskald latte på varme dager, eller når du trenger en oppkvikker.",
        shortDescription: "Forfriskende matcha med økologisk peppermynte.",
        ingredients: "Japansk matcha, økologisk peppermynte",
      },
    },
    reviews: [
      { name: "Nora J.", rating: 5, text: "Koel en verfrissend, perfect na een workout.", date: "2024-04-01" },
      { name: "Olivia P.", rating: 5, text: "Alsof je een matcha mojito drinkt. Heerlijk!", date: "2024-04-22" },
      { name: "Lucas T.", rating: 4, text: "Munt is subtiel, niet overheersend. Top.", date: "2024-05-10" },
    ],
  },
  {
    id: "matcha-cacao",
    name: "Cacao Matcha 50g",
    slug: "cacao-matcha-50g",
    price: 22.95,
    description: "Romige blend van matcha met rauwe Peruaanse cacao. Diep, vol en chocoladeachtig — een natuurlijk zoete energieboost zonder toegevoegde suikers.",
    shortDescription: "Matcha met rauwe Peruaanse cacao.",
    category: "teas-drinks",
    categoryLabel: "Thee & Dranken",
    images: [productPouchCacao],
    ingredients: "Japanse matcha, rauwe cacao",
    origin: "Kagoshima, Japan",
    weight: "50g",
    relatedIds: ["vanilla-matcha", "frother", "ceremonial-30"],
    i18n: {
      de: {
        name: "Kakao-Matcha 50g",
        description: "Cremige Mischung aus Matcha und rohem peruanischem Kakao. Tief, voll und schokoladig — ein natürlich süßer Energieboost ohne zugesetzten Zucker.",
        shortDescription: "Matcha mit rohem peruanischem Kakao.",
        ingredients: "Japanischer Matcha, roher Kakao",
      },
      no: {
        name: "Kakao-Matcha 50g",
        description: "Kremet blanding av matcha og rå peruansk kakao. Dyp, fyldig og sjokoladeaktig — et naturlig søtt energiløft uten tilsatt sukker.",
        shortDescription: "Matcha med rå peruansk kakao.",
        ingredients: "Japansk matcha, rå kakao",
      },
    },
    reviews: [
      { name: "Sara D.", rating: 5, text: "Smaakt als gezonde chocolademelk, maar dan met focus boost!", date: "2024-03-18" },
      { name: "Roel V.", rating: 5, text: "Mijn middag pick-me-up. Diep en romig.", date: "2024-04-14" },
      { name: "Veerle K.", rating: 5, text: "Geweldig in een warme latte met kaneel. Verslavend.", date: "2024-05-02" },
    ],
  },
  {
    id: "matcha-berry",
    name: "Berry Matcha 40g",
    slug: "berry-matcha-40g",
    price: 21.95,
    description: "Vrolijke blend van matcha met aardbei en framboos. Vol antioxidanten, fruitig en lichtzoet — heerlijk in smoothies of als zomerse iced latte.",
    shortDescription: "Matcha met aardbei en framboos.",
    category: "teas-drinks",
    categoryLabel: "Thee & Dranken",
    images: [productPouchBerry],
    badge: "Nieuw",
    ingredients: "Japanse matcha, aardbeipoeder, frambozenpoeder",
    origin: "Kagoshima, Japan",
    weight: "40g",
    relatedIds: ["matcha-mint", "vanilla-matcha", "iced-matcha"],
    i18n: {
      de: {
        name: "Beeren-Matcha 40g",
        description: "Fröhliche Mischung aus Matcha mit Erdbeere und Himbeere. Voller Antioxidantien, fruchtig und leicht süß — köstlich in Smoothies oder als sommerliche Iced Latte.",
        shortDescription: "Matcha mit Erdbeere und Himbeere.",
        ingredients: "Japanischer Matcha, Erdbeerpulver, Himbeerpulver",
      },
      no: {
        name: "Bær-Matcha 40g",
        description: "Livlig blanding av matcha med jordbær og bringebær. Full av antioksidanter, fruktig og lett søt — nydelig i smoothier eller som sommerlig iced latte.",
        shortDescription: "Matcha med jordbær og bringebær.",
        ingredients: "Japansk matcha, jordbærpulver, bringebærpulver",
      },
    },
    reviews: [
      { name: "Lynn B.", rating: 5, text: "Vrolijke smaak, heerlijk in smoothies met banaan.", date: "2024-04-08" },
      { name: "Fenna H.", rating: 5, text: "Mooie roze matcha latte gemaakt — Instagram-waardig.", date: "2024-04-29" },
      { name: "Jelle M.", rating: 4, text: "Fruitig en niet te zoet, leuke afwisseling.", date: "2024-05-15" },
    ],
  },
  {
    id: "iced-matcha",
    name: "Iced Matcha Blend 60g",
    slug: "iced-matcha-blend-60g",
    price: 23.95,
    description: "Speciaal ontwikkelde blend die ook in koud water perfect oplost. Voor de ultieme iced matcha latte zonder klontjes — gewoon shaken en genieten.",
    shortDescription: "Lost direct op in koud water.",
    category: "teas-drinks",
    categoryLabel: "Thee & Dranken",
    images: [productPouchIced],
    badge: "Zomer",
    ingredients: "100% Japanse matcha (cold-soluble)",
    origin: "Kagoshima, Japan",
    weight: "60g",
    relatedIds: ["matcha-mint", "matcha-berry", "frother"],
    i18n: {
      de: {
        name: "Iced Matcha Blend 60g",
        description: "Speziell entwickelte Mischung, die sich auch in kaltem Wasser perfekt auflöst. Für die ultimative Iced Matcha Latte ohne Klümpchen — einfach schütteln und genießen.",
        shortDescription: "Löst sich sofort in kaltem Wasser auf.",
        ingredients: "100% japanischer Matcha (kalt löslich)",
      },
      no: {
        name: "Iced Matcha Blend 60g",
        description: "Spesialutviklet blanding som løser seg perfekt opp selv i kaldt vann. For den ultimate iced matcha latte uten klumper — bare rist og nyt.",
        shortDescription: "Løser seg umiddelbart opp i kaldt vann.",
        ingredients: "100 % japansk matcha (kaldtoppløselig)",
      },
    },
    reviews: [
      { name: "Amber R.", rating: 5, text: "Echt geen klontjes in koud water, geweldig!", date: "2024-04-20" },
      { name: "Bram L.", rating: 5, text: "Perfect voor zomerse iced lattes. Shaken en klaar.", date: "2024-05-05" },
      { name: "Cato V.", rating: 5, text: "Game changer voor cold brew matcha lovers.", date: "2024-05-18" },
    ],
  },
  {
    id: "tin-reserve",
    name: "Ceremonial Reserve Tin 100g",
    slug: "ceremonial-reserve-tin",
    price: 89.95,
    description: "Onze meest exclusieve matcha, verpakt in een matzwart luchtdicht blik met goudfolie detail. Een single-origin reserve uit een kleine familieboerderij in Uji — beperkte oplage.",
    shortDescription: "Single-origin reserve in luxe tin.",
    category: "matcha-powder",
    categoryLabel: "Matcha Poeder",
    images: [productTinReserve],
    badge: "Limited",
    ingredients: "100% biologische single-origin matcha",
    origin: "Uji, Kyoto, Japan",
    weight: "100g",
    preparation: "Zeef 2g matcha, voeg 70ml water (75°C) toe en klop tot fijn schuim ontstaat.",
    relatedIds: ["ceremonial-100", "premium-set", "cups-set"],
    i18n: {
      de: {
        name: "Zeremonielle Reserve Dose 100g",
        description: "Unser exklusivster Matcha, verpackt in einer mattschwarzen, luftdichten Dose mit Goldfolien-Detail. Eine Single-Origin-Reserve von einer kleinen Familienfarm in Uji — limitierte Auflage.",
        shortDescription: "Single-Origin Reserve in Luxus-Dose.",
        ingredients: "100% biologischer Single-Origin-Matcha",
        preparation: "2 g Matcha sieben, 70 ml Wasser (75°C) hinzufügen und zu feinem Schaum schlagen.",
      },
      no: {
        name: "Seremoniell Reserve-boks 100g",
        description: "Vår mest eksklusive matcha, pakket i en matt sort, lufttett boks med detaljer i gullfolie. En single origin-reserve fra en liten familiegård i Uji — begrenset opplag.",
        shortDescription: "Single origin-reserve i eksklusiv boks.",
        ingredients: "100 % økologisk single origin-matcha",
        preparation: "Sikt 2 g matcha, tilsett 70 ml vann (75 °C) og visp til et fint skum.",
      },
    },
    reviews: [
      { name: "Charlotte W.", rating: 5, text: "Ongekend verfijnd. Een echte traktatie.", date: "2024-04-02" },
      { name: "Maximilian D.", rating: 5, text: "De diepste umami die ik ooit heb geproefd. De moeite waard.", date: "2024-04-20" },
      { name: "Beatrice M.", rating: 5, text: "Het blik alleen al is een sieraad. Inhoud sublim.", date: "2024-05-07" },
      { name: "Henry K.", rating: 5, text: "Echt premium niveau, vergelijkbaar met Tokyo theehuizen.", date: "2024-05-19" },
    ],
  },
  {
    id: "travel-kit",
    name: "Travel Ritual Kit",
    slug: "travel-ritual-kit",
    price: 64.95,
    hidden: true,
    description: "Jouw matcha ritueel onderweg. Compacte canvas etui met roestvrijstalen reisklopper, kleine keramische cup en een travel-size matcha pouch (15g). Perfect voor reizen, kantoor of weekendjes weg.",
    shortDescription: "Matcha ritueel onderweg — compleet kit.",
    category: "kits-sets",
    categoryLabel: "Kits & Sets",
    images: [productTravelKit],
    badge: "Nieuw",
    relatedIds: ["starter-kit", "ceremonial-30", "cups-set"],
    i18n: {
      de: {
        name: "Reise-Ritual Set",
        description: "Dein Matcha-Ritual für unterwegs. Kompaktes Canvas-Etui mit Edelstahl-Reisebesen, kleinem Keramikbecher und einer Travel-Size Matcha-Pouch (15 g). Perfekt für Reisen, Büro oder Wochenendtrips.",
        shortDescription: "Matcha-Ritual unterwegs — komplettes Set.",
      },
      no: {
        name: "Reise-ritualsett",
        description: "Matcharitualet ditt på farten. Kompakt etui i canvas med reisevisp i rustfritt stål, liten keramikkopp og en matchapose i reisestørrelse (15 g). Perfekt til reiser, kontoret eller helgeturer.",
        shortDescription: "Matcharitualet på farten — komplett sett.",
      },
    },
    reviews: [
      { name: "Pieter L.", rating: 5, text: "Eindelijk goede matcha tijdens reizen!", date: "2024-03-22" },
      { name: "Janneke V.", rating: 5, text: "Compact, alles past perfect. Meegenomen op city trip.", date: "2024-04-12" },
      { name: "Rik B.", rating: 4, text: "Reisklopper werkt goed, etui is mooi gemaakt.", date: "2024-05-04" },
    ],
  },
  {
    id: "cups-set",
    name: "Handmade Cup Set (2 stuks)",
    slug: "handmade-cup-set",
    price: 49.95,
    description: "Set van twee handgemaakte Japanse keramische bekers met uniek groen-crème glazuur. Ambachtelijk gedraaid in Mino, Japan — geen twee zijn hetzelfde.",
    shortDescription: "2 handgemaakte Japanse keramische bekers.",
    category: "accessories",
    categoryLabel: "Accessoires",
    images: [productCupsSet],
    relatedIds: ["matcha-bowl", "tin-reserve", "premium-set"],
    i18n: {
      de: {
        name: "Handgemachtes Tassen-Set (2 Stück)",
        description: "Set aus zwei handgefertigten japanischen Keramikbechern mit einzigartiger grün-cremefarbener Glasur. Handwerklich gedreht in Mino, Japan — keine zwei sind gleich.",
        shortDescription: "2 handgefertigte japanische Keramikbecher.",
      },
      no: {
        name: "Håndlaget koppesett (2 stk.)",
        description: "Sett med to håndlagde japanske keramikkopper med unik glasur i grønt og krem. Dreid for hånd i Mino, Japan — ingen to er like.",
        shortDescription: "2 håndlagde japanske keramikkopper.",
      },
    },
    reviews: [
      { name: "Indy K.", rating: 5, text: "Twee unieke kunstwerkjes. Mooi cadeau gegeven.", date: "2024-02-28" },
      { name: "Loes M.", rating: 5, text: "Voelt warm in de hand, perfecte grootte voor een matcha shot.", date: "2024-03-20" },
      { name: "Stef D.", rating: 5, text: "Glazuur is werkelijk prachtig, geen twee dezelfde.", date: "2024-04-15" },
    ],
  },
  {
    id: "recipe-book",
    name: "The Matcha Ritual — Receptenboek",
    slug: "the-matcha-ritual-book",
    price: 29.95,
    hidden: true,
    description: "Een prachtig vormgegeven hardcover boek met 60+ recepten, rituelen en verhalen rond matcha. Van klassieke bereidingen tot moderne lattes, smoothies en gebak.",
    shortDescription: "60+ recepten, rituelen en verhalen.",
    category: "kits-sets",
    categoryLabel: "Kits & Sets",
    images: [productRecipeBook],
    relatedIds: ["starter-kit", "premium-set", "gift-box"],
    i18n: {
      de: {
        name: "The Matcha Ritual — Kochbuch",
        description: "Ein wunderschön gestaltetes Hardcover-Buch mit 60+ Rezepten, Ritualen und Geschichten rund um Matcha. Von klassischen Zubereitungen bis hin zu modernen Lattes, Smoothies und Backwaren.",
        shortDescription: "60+ Rezepte, Rituale und Geschichten.",
      },
      no: {
        name: "The Matcha Ritual — oppskriftsbok",
        description: "En vakkert utformet innbundet bok med over 60 oppskrifter, ritualer og historier om matcha. Fra klassiske tilberedninger til moderne latte, smoothier og bakverk.",
        shortDescription: "60+ oppskrifter, ritualer og historier.",
      },
    },
    reviews: [
      { name: "Floor B.", rating: 5, text: "Inspirerend en mooi vormgegeven.", date: "2024-04-10" },
      { name: "Nadia V.", rating: 5, text: "Veel meer dan alleen recepten — ook prachtige verhalen.", date: "2024-04-26" },
      { name: "Pepijn J.", rating: 4, text: "Goed boek, recepten zijn duidelijk en goed te volgen.", date: "2024-05-12" },
    ],
  },
];

// ─── Public API ──────────────────────────────────────────────

// Producten met `hidden: true` zijn tijdelijk offline: niet zichtbaar in
// listings, featured, gerelateerd, en niet bereikbaar via directe URL.
const isVisible = (p: RawProduct) => !p.hidden;

export const products: Product[] = productsRaw.filter(isVisible).map(p => localize(p, getCurrentLang()));

export const getProductBySlug = (slug: string): Product | undefined => {
  const p = productsRaw.find(x => x.slug === slug);
  return p && isVisible(p) ? localize(p, getCurrentLang()) : undefined;
};

export const getProductById = (id: string): Product | undefined => {
  const p = productsRaw.find(x => x.id === id);
  return p && isVisible(p) ? localize(p, getCurrentLang()) : undefined;
};

export const getRelatedProducts = (product: Product): Product[] =>
  (product.relatedIds || []).map(id => getProductById(id)).filter(Boolean) as Product[];

export const getFeaturedProducts = (): Product[] => {
  const lang = getCurrentLang();
  return productsRaw.filter(p => isVisible(p) && (p.bestseller || p.badge)).map(p => localize(p, lang));
};

// ─── React hooks (reactive to language change) ──────────────

export function useProducts(): Product[] {
  const { i18n } = useTranslation();
  return useMemo(() => productsRaw.filter(isVisible).map(p => localize(p, getCurrentLang())), [i18n.language]);
}

export function useProduct(slug: string | undefined): Product | undefined {
  const { i18n } = useTranslation();
  return useMemo(() => {
    if (!slug) return undefined;
    const p = productsRaw.find(x => x.slug === slug);
    return p && isVisible(p) ? localize(p, getCurrentLang()) : undefined;
  }, [slug, i18n.language]);
}

export function useFeaturedProducts(): Product[] {
  const { i18n } = useTranslation();
  return useMemo(() => {
    const lang = getCurrentLang();
    return productsRaw.filter(p => isVisible(p) && (p.bestseller || p.badge)).map(p => localize(p, lang));
  }, [i18n.language]);
}

export function useRelatedProducts(product: Product | undefined): Product[] {
  const { i18n } = useTranslation();
  return useMemo(() => {
    if (!product?.relatedIds) return [];
    const lang = getCurrentLang();
    return product.relatedIds
      .map(id => productsRaw.find(x => x.id === id))
      .filter((p): p is RawProduct => Boolean(p) && isVisible(p!))
      .map(p => localize(p, lang));
  }, [product, i18n.language]);
}

// Force unused import to count as used (re-export)
void i18nInstance;
