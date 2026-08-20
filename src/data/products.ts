import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import i18nInstance, { type Lang, getCurrentLang } from "@/i18n";
import productPouchCeremonial30 from "@/assets/product-pouch-ceremonial-30.webp";
import productPouchCeremonial100 from "@/assets/product-pouch-ceremonial-100.webp";
import productPouchCulinary100 from "@/assets/product-pouch-culinary-100.webp";
import productPouchHojicha from "@/assets/product-pouch-hojicha.webp";
import productPouchYuzu from "@/assets/product-pouch-yuzu.webp";
import productPouchGenmaicha from "@/assets/product-pouch-genmaicha.webp";
import productPouchSencha from "@/assets/product-pouch-sencha.webp";
import productPouchVanilla from "@/assets/product-pouch-vanilla.webp";
import productPouchMint from "@/assets/product-pouch-mint.webp";
import productPouchCacao from "@/assets/product-pouch-cacao.webp";
import productPouchBerry from "@/assets/product-pouch-berry.webp";
import productPouchIced from "@/assets/product-pouch-iced.webp";
import productTinReserve from "@/assets/product-tin-reserve.webp";
import productRecipeBook from "@/assets/product-recipe-book.webp";
import productTravelKit from "@/assets/product-travel-kit.webp";
import productCupsSet from "@/assets/product-cups-set.webp";
import productDiscoveryBox from "@/assets/product-discovery-box.webp";
import productStarterKit from "@/assets/product-starter-kit.webp";
import productPremiumSet from "@/assets/product-premium-set.webp";
import productGiftBox from "@/assets/product-gift-box.webp";
import productChasen from "@/assets/product-chasen.webp";
import productMatchaBowl from "@/assets/product-matcha-bowl.webp";
import productChashaku from "@/assets/product-chashaku.webp";
import productFrother from "@/assets/product-frother.webp";
// ─── Nieuw assortiment (Teemdrop) ───
import productMatchaSetCompleet from "@/assets/product-matcha-set-compleet.webp";
import productMatchaSetGreen from "@/assets/product-matcha-set-green.webp";
import productMatchaPoederZak from "@/assets/product-matcha-poeder-zak-100g.webp";
import productMatchaPoederPot from "@/assets/product-matcha-poeder-pot-100g.webp";
import productChasenBamboe100 from "@/assets/product-chasen-bamboe-100.webp";

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
  /** Onvertaalde badge-waarde (bv. "Voordeel") - voor logica, nooit voor weergave. */
  badgeKey?: string;
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
  weight?: string;
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
  base.badgeKey = base.badge;
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
    weight: t?.weight ?? base.weight,
    badge: t?.badge ?? localizeBadge(base.badge, lang),
  };
}

// Filters in de shop. "teas-drinks" staat uit zolang dat assortiment
// gearchiveerd is - een lege filtertab is een doodlopende klik.
export const categories = [
  { value: "all", label: "Alle Producten" },
  { value: "matcha-powder", label: "Matcha Poeder" },
  { value: "kits-sets", label: "Kits & Sets" },
  { value: "accessories", label: "Accessoires" },
];

const productsRaw: RawProduct[] = [
  {
    id: "ceremonial-30",
    name: "Ceremonial Matcha 30g",
    slug: "ceremonial-matcha-30g",
    hidden: true, // gearchiveerd: oud assortiment, tijdelijk offline
    price: 18.95,
    description: "Onze premium ceremonial grade matcha, handgeplukt in de Uji-regio van Kyoto, Japan. Een levendig groene kleur, zoete umami smaak en fluweelzachte textuur - perfect voor de traditionele theeceremonie of een puur matcha ritueel.",
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
        description: "Unser zeremonieller Premium-Matcha, von Hand gepflückt in der Uji-Region in Kyoto, Japan. Eine leuchtend grüne Farbe, süßer Umami-Geschmack und samtige Textur - perfekt für die traditionelle Teezeremonie oder ein reines Matcha-Ritual.",
        shortDescription: "Handgepflückt in Uji, Japan. Reiner Umami-Geschmack.",
        ingredients: "100% biologischer japanischer Matcha (Camellia sinensis)",
        preparation: "1–2 g Matcha sieben. 70 ml Wasser (80°C) hinzufügen. Mit einem Chasen schaumig schlagen.",
      },
      no: {
        name: "Seremoniell Matcha 30g",
        description: "Vår seremonielle premium-matcha, håndplukket i Uji-regionen i Kyoto, Japan. Levende grønn farge, søt umamismak og fløyelsmyk tekstur - perfekt til den tradisjonelle teseremonien eller ditt eget matcharitual.",
        shortDescription: "Håndplukket i Uji, Japan. Ren umamismak.",
        ingredients: "100 % økologisk japansk matcha (Camellia sinensis)",
        preparation: "Sikt 1–2 gram matcha. Tilsett 70 ml vann (80 °C). Visp med en chasen til den skummer.",
      },
    },
    reviews: [
      { name: "Sophie V.", rating: 5, text: "De beste matcha die ik ooit heb geproefd. Prachtige kleur en smaak.", date: "2025-03-08" },
      { name: "Lars M.", rating: 5, text: "Geweldige kwaliteit, mijn dagelijkse ritueel.", date: "2024-11-01" },
      { name: "Emma D.", rating: 4, text: "Heerlijke matcha, snelle levering.", date: "2025-05-25" },
      { name: "Julia K.", rating: 5, text: "Levendig groen en zo'n zachte umami. Echt verschil met supermarkt matcha.", date: "2025-08-28" },
      { name: "Tom S.", rating: 5, text: "Mooie verpakking, perfect kopje matcha. Wordt vaste bestelling.", date: "2025-11-23" },
      { name: "Sanne B.", rating: 5, text: "Smaak is fluweelzacht, bijna romig. Aanrader voor de echte liefhebber.", date: "2026-02-26" },
      { name: "Marit H.", rating: 4, text: "Fijne matcha, klopt zonder klontjes. Iets pittiger dan verwacht.", date: "2026-05-18" },
    ],
  },
  {
    id: "ceremonial-100",
    name: "Ceremonial Matcha 100g",
    slug: "ceremonial-matcha-100g",
    hidden: true, // gearchiveerd: oud assortiment, tijdelijk offline
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
        description: "Unser zeremonieller Premium-Matcha in der 100-Gramm-Großpackung. Dieselbe unübertroffene Qualität aus Uji - für den echten Matcha-Liebhaber, der täglich die perfekte Tasse genießt.",
        shortDescription: "Premium-Qualität in der Großpackung.",
        ingredients: "100% biologischer japanischer Matcha (Camellia sinensis)",
        preparation: "1–2 g Matcha sieben. 70 ml Wasser (80°C) hinzufügen. Mit einem Chasen schaumig schlagen.",
      },
      no: {
        name: "Seremoniell Matcha 100g",
        description: "Vår seremonielle premium-matcha i storpakning på 100 gram. Samme uovertrufne kvalitet fra Uji - for den ekte matchaelskeren som nyter den perfekte koppen hver dag.",
        shortDescription: "Premiumkvalitet i storpakning.",
        ingredients: "100 % økologisk japansk matcha (Camellia sinensis)",
        preparation: "Sikt 1–2 gram matcha. Tilsett 70 ml vann (80 °C). Visp med en chasen til den skummer.",
      },
    },
    reviews: [
      { name: "Thomas K.", rating: 5, text: "Perfecte waarde voor deze kwaliteit.", date: "2025-05-24" },
      { name: "Linde V.", rating: 5, text: "100g gaat lang mee en blijft vers in de pouch. Top!", date: "2025-08-09" },
      { name: "Bram J.", rating: 5, text: "Heldere umami en lange afdronk. Beste prijs-kwaliteit.", date: "2025-11-11" },
      { name: "Esmee P.", rating: 5, text: "Voor mijn ochtend ritueel - dagelijks genot.", date: "2026-02-06" },
      { name: "Joris D.", rating: 4, text: "Hoge kwaliteit, levering keurig binnen 2 dagen.", date: "2026-04-26" },
    ],
  },
  {
    id: "culinary-100",
    name: "Culinary Matcha 100g",
    slug: "culinary-matcha-100g",
    hidden: true, // gearchiveerd: oud assortiment, tijdelijk offline
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
      { name: "Anna B.", rating: 5, text: "Perfect voor mijn ochtend latte!", date: "2024-10-05" },
      { name: "Mees T.", rating: 5, text: "Mengt prachtig met haver- en amandelmelk. Mooi groen schuim.", date: "2025-02-20" },
      { name: "Iris W.", rating: 4, text: "Stevige smaak, ideaal voor bakken. Mijn matcha brownies zijn een hit.", date: "2025-07-06" },
      { name: "Sander R.", rating: 5, text: "Beste culinary die ik geprobeerd heb. Geen bittere ondertoon.", date: "2026-01-07" },
      { name: "Kim L.", rating: 5, text: "Gebruik het dagelijks voor smoothies. Top kwaliteit voor de prijs.", date: "2026-04-12" },
    ],
  },
  {
    id: "vanilla-matcha",
    name: "Vanilla Matcha 50g",
    slug: "vanilla-matcha-50g",
    hidden: true, // gearchiveerd: oud assortiment, tijdelijk offline
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
      { name: "Noor P.", rating: 5, text: "Verslavend lekker in een latte!", date: "2025-07-12" },
      { name: "Femke A.", rating: 5, text: "De vanille is écht echt - geen kunstmatige smaak.", date: "2025-10-20" },
      { name: "Roos D.", rating: 5, text: "Mijn favoriete avond drankje, zo romig.", date: "2026-01-15" },
      { name: "Jasper V.", rating: 4, text: "Lekker zoet zonder suiker toe te voegen. Aanrader.", date: "2026-04-19" },
    ],
  },
  {
    id: "starter-kit",
    name: "Starter Kit",
    slug: "starter-kit",
    hidden: true, // gearchiveerd: oud assortiment, tijdelijk offline
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
      { name: "Mila J.", rating: 5, text: "Prachtige set, geweldig cadeau!", date: "2025-02-14" },
      { name: "Daan V.", rating: 5, text: "Alles van hoge kwaliteit. Aanrader.", date: "2024-12-01" },
      { name: "Lieke S.", rating: 5, text: "Perfect om te beginnen met matcha. Duidelijke uitleg erbij.", date: "2025-07-25" },
      { name: "Wouter F.", rating: 5, text: "Mooi verpakt, ideaal als verjaardagscadeau gegeven.", date: "2025-12-18" },
      { name: "Eline B.", rating: 4, text: "Fijne starter, kom is prachtig handgemaakt.", date: "2026-03-10" },
      { name: "Nina H.", rating: 5, text: "Binnen 5 minuten mijn eerste perfecte kopje. Topservice.", date: "2026-05-21" },
    ],
  },
  {
    id: "premium-set",
    name: "Premium Ritual Set",
    slug: "premium-ritual-set",
    hidden: true, // gearchiveerd: oud assortiment, tijdelijk offline
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
      { name: "Isabel R.", rating: 5, text: "Schitterend! Voelt als een luxe ritueel.", date: "2025-06-21" },
      { name: "Olivier M.", rating: 5, text: "Verpakking is een belevenis op zich. Cadeau gegeven aan moeder - ze was sprakeloos.", date: "2025-09-11" },
      { name: "Camille D.", rating: 5, text: "De kom is een kunstwerk en de matcha is sublime.", date: "2025-12-20" },
      { name: "Hugo P.", rating: 5, text: "Premium in elk detail, geld dubbel en dwars waard.", date: "2026-03-22" },
      { name: "Saskia V.", rating: 5, text: "Mijn dagelijks ritueel sinds ik deze set heb. Geweldig.", date: "2026-06-19" },
    ],
  },
  {
    id: "gift-box",
    name: "Gift Box",
    slug: "gift-box",
    hidden: true, // gearchiveerd: oud assortiment, tijdelijk offline
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
      { name: "Hannah L.", rating: 5, text: "Cadeau gegeven aan mijn zus - ze was helemaal verrast door de mooie verpakking.", date: "2025-04-06" },
      { name: "Vincent K.", rating: 5, text: "Perfect Sinterklaas cadeau. Voelt echt premium aan.", date: "2025-08-15" },
      { name: "Britt M.", rating: 5, text: "Inhoud is goed gekozen, niets overbodigs. Mooi kaartje erbij.", date: "2025-11-09" },
      { name: "Tessa W.", rating: 4, text: "Mooi cadeau, snelle levering met handgeschreven kaart.", date: "2026-02-17" },
    ],
  },
  {
    id: "discovery-box",
    name: "Discovery Tea Box",
    slug: "discovery-tea-box",
    hidden: true, // gearchiveerd: oud assortiment, tijdelijk offline
    price: 34.95,
    description: "Ontdek ons volledige theeassortiment. Een proefbox met ceremonial matcha, hojicha, sencha en genmaicha - perfect om jouw favoriet te vinden.",
    shortDescription: "Proefbox met 4 Japanse thee specialiteiten.",
    category: "kits-sets",
    categoryLabel: "Kits & Sets",
    images: [productDiscoveryBox],
    badge: "Nieuw",
    relatedIds: ["hojicha", "sencha", "genmaicha"],
    i18n: {
      de: {
        name: "Tee Entdecker-Box",
        description: "Entdecke unser komplettes Tee-Sortiment. Eine Probierbox mit zeremoniellem Matcha, Hojicha, Sencha und Genmaicha - perfekt, um deinen Favoriten zu finden.",
        shortDescription: "Probierbox mit 4 japanischen Tee-Spezialitäten.",
      },
      no: {
        name: "Te-oppdagelsesboks",
        description: "Utforsk hele tesortimentet vårt. En smaksboks med seremoniell matcha, hojicha, sencha og genmaicha - perfekt for å finne favoritten din.",
        shortDescription: "Smaksboks med 4 japanske tespesialiteter.",
      },
    },
    reviews: [
      { name: "Robin J.", rating: 5, text: "Geweldige manier om de hele lijn te proeven. Hojicha was mijn favoriet!", date: "2025-05-29" },
      { name: "Demi V.", rating: 5, text: "Perfect om te ontdekken wat bij je past. Goede portiegrootte.", date: "2025-10-07" },
      { name: "Sven P.", rating: 4, text: "Leuke box, alleen wel snel doorheen.", date: "2026-01-02" },
      { name: "Anouk B.", rating: 5, text: "Ideaal als kennismaking. Heb daarna meteen sencha bijbesteld.", date: "2026-04-25" },
    ],
  },
  {
    id: "chasen",
    name: "Bamboe Chasen (Klopper)",
    slug: "bamboe-chasen",
    hidden: true, // gearchiveerd: oud assortiment, tijdelijk offline
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
      { name: "Ruben H.", rating: 4, text: "Mooie kwaliteit klopper.", date: "2025-04-10" },
      { name: "Maud E.", rating: 5, text: "Veel beter dan goedkope varianten - schuim is veel fijner.", date: "2025-07-11" },
      { name: "Quinn L.", rating: 5, text: "Echte vakmanschap, voelt licht en stevig tegelijk.", date: "2025-11-08" },
      { name: "Stijn M.", rating: 5, text: "Gaat mij lang mee, behandel ik met zorg. Top product.", date: "2026-02-19" },
    ],
  },
  {
    id: "matcha-bowl",
    name: "Keramische Matcha Kom",
    slug: "keramische-matcha-kom",
    hidden: true, // gearchiveerd: oud assortiment, tijdelijk offline
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
      { name: "Lotte S.", rating: 5, text: "Prachtig! Elk stuk is echt uniek.", date: "2024-12-24" },
      { name: "Floortje N.", rating: 5, text: "Ligt perfect in de hand, mooi glazuur. Voelt warm aan.", date: "2025-05-02" },
      { name: "Bas K.", rating: 5, text: "Voelt ambachtelijk. Goede afmeting voor klassieke bereiding.", date: "2025-09-04" },
      { name: "Yara D.", rating: 4, text: "Heel mooi stuk, levering goed verpakt.", date: "2026-01-16" },
    ],
  },
  {
    id: "chashaku",
    name: "Bamboe Chashaku (Lepel)",
    slug: "bamboe-chashaku",
    hidden: true, // gearchiveerd: oud assortiment, tijdelijk offline
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
      { name: "Thijs B.", rating: 5, text: "Perfecte hoeveelheid in één scoop. Mooi bamboe.", date: "2025-02-11" },
      { name: "Iris H.", rating: 5, text: "Klein detail dat veel verschil maakt in het ritueel.", date: "2025-06-14" },
      { name: "Niek V.", rating: 4, text: "Goede prijs, doet wat het moet doen.", date: "2025-12-29" },
    ],
  },
  {
    id: "frother",
    name: "Elektrische Melkopschuimer",
    slug: "elektrische-melkopschuimer",
    hidden: true, // gearchiveerd: oud assortiment, tijdelijk offline
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
      { name: "Sophia M.", rating: 5, text: "Snel, krachtig en stil. Mijn lattes zijn nu perfect schuimig.", date: "2025-03-09" },
      { name: "Dennis R.", rating: 5, text: "Klein maar krachtig, perfect voor culinary matcha.", date: "2025-06-04" },
      { name: "Lara K.", rating: 4, text: "Werkt goed, batterijen gaan lang mee.", date: "2025-10-18" },
      { name: "Mark V.", rating: 5, text: "Voor wie geen chasen wil - dit is de oplossing.", date: "2026-02-02" },
    ],
  },
  {
    id: "hojicha",
    name: "Hojicha Poeder 50g",
    slug: "hojicha-poeder-50g",
    hidden: true, // gearchiveerd: oud assortiment, tijdelijk offline
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
      { name: "Eva T.", rating: 5, text: "Heerlijk voor 's avonds, laag in cafeïne.", date: "2025-03-31" },
      { name: "Pim D.", rating: 5, text: "Karamel- en notenaroma, echt verrassend lekker.", date: "2025-07-07" },
      { name: "Inge V.", rating: 5, text: "Geweldig in een latte met havermelk. Comfort in een kop.", date: "2025-11-14" },
      { name: "Suze L.", rating: 4, text: "Warme smaak, perfect voor herfstavonden.", date: "2026-02-25" },
    ],
  },
  {
    id: "sencha",
    name: "Sencha Loose Leaf 75g",
    slug: "sencha-loose-leaf-75g",
    hidden: true, // gearchiveerd: oud assortiment, tijdelijk offline
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
      { name: "Bart W.", rating: 5, text: "Zacht grasachtig en zoet - niet bitter zoals andere sencha's.", date: "2025-06-29" },
      { name: "Karlijn R.", rating: 5, text: "Mijn dagelijkse middagthee. Hoge kwaliteit losse blad.", date: "2025-10-20" },
      { name: "Hidde M.", rating: 4, text: "Verfrissend, mooie heldergele kleur na zetten.", date: "2026-02-07" },
      { name: "Saar B.", rating: 5, text: "Heerlijk verfrissend, goed te zetten meerdere keren.", date: "2026-05-15" },
    ],
  },
  {
    id: "genmaicha",
    name: "Genmaicha Loose Leaf 50g",
    slug: "genmaicha-loose-leaf-50g",
    hidden: true, // gearchiveerd: oud assortiment, tijdelijk offline
    price: 12.95,
    description: "Traditionele Japanse groene thee gemengd met geroosterde rijst. Een unieke, nootachtige en hartige smaak - geweldig bij het ontbijt.",
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
        description: "Traditioneller japanischer Grüntee gemischt mit geröstetem Reis. Ein einzigartiger, nussiger und herzhafter Geschmack - wunderbar zum Frühstück.",
        shortDescription: "Grüntee mit geröstetem Reis.",
        ingredients: "Japanischer Grüntee, gerösteter Reis",
      },
      no: {
        name: "Genmaicha løse teblader 50g",
        description: "Tradisjonell japansk grønn te blandet med ristet ris. En unik, nøtteaktig og fyldig smak - herlig til frokosten.",
        shortDescription: "Grønn te med ristet ris.",
        ingredients: "Japansk grønn te, ristet ris",
      },
    },
    reviews: [
      { name: "Jeroen H.", rating: 5, text: "Nootachtig en hartig, perfect bij het ontbijt.", date: "2025-04-25" },
      { name: "Lisanne K.", rating: 5, text: "De geroosterde rijst geeft echt een extra dimensie. Top!", date: "2025-08-21" },
      { name: "Casper N.", rating: 4, text: "Verrassend lekker, ook voor wie niet van groene thee houdt.", date: "2025-12-12" },
    ],
  },
  {
    id: "matcha-yuzu",
    name: "Matcha Yuzu Blend 40g",
    slug: "matcha-yuzu-blend-40g",
    hidden: true, // gearchiveerd: oud assortiment, tijdelijk offline
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
        description: "Einzigartige Mischung aus Premium-Matcha und japanischer Yuzu-Zitrusfrucht. Erfrischend und aromatisch - perfekt für ein sommerliches Matcha-Erlebnis oder als Basis für Cocktails.",
        shortDescription: "Erfrischender Matcha mit japanischer Yuzu-Zitrusfrucht.",
        ingredients: "Japanischer Matcha, Yuzu-Schalenpulver",
      },
      no: {
        name: "Matcha Yuzu Blend 40g",
        description: "Unik blanding av premium matcha og japansk yuzu-sitrus. Forfriskende og aromatisk - perfekt for en sommerlig matchaopplevelse eller som base i cocktailer.",
        shortDescription: "Forfriskende matcha med japansk yuzu-sitrus.",
        ingredients: "Japansk matcha, pulver av yuzuskall",
      },
    },
    reviews: [
      { name: "Romee S.", rating: 5, text: "Frisse citrustwist, ideaal in een iced latte.", date: "2025-07-27" },
      { name: "Tijn B.", rating: 5, text: "Heel zomers, gebruikt in een matcha gin tonic. Geweldig!", date: "2025-11-22" },
      { name: "Maartje V.", rating: 4, text: "Aromatisch en uniek. Hou wel van een uitgesproken smaak.", date: "2026-03-12" },
    ],
  },
  {
    id: "matcha-mint",
    name: "Mint Matcha 40g",
    slug: "mint-matcha-40g",
    hidden: true, // gearchiveerd: oud assortiment, tijdelijk offline
    price: 19.95,
    description: "Verfrissende blend van premium matcha met biologische pepermunt. Een kristalheldere, koelende smaak - perfect voor een ijskoude latte op een warme dag of als wakkermakertje.",
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
        description: "Erfrischende Mischung aus Premium-Matcha und biologischer Pfefferminze. Ein kristallklarer, kühlender Geschmack - perfekt für eine eiskalte Latte an warmen Tagen oder als Wachmacher.",
        shortDescription: "Erfrischender Matcha mit biologischer Pfefferminze.",
        ingredients: "Japanischer Matcha, biologische Pfefferminze",
      },
      no: {
        name: "Mynte-Matcha 40g",
        description: "Forfriskende blanding av premium matcha og økologisk peppermynte. En krystallklar, kjølende smak - perfekt til en iskald latte på varme dager, eller når du trenger en oppkvikker.",
        shortDescription: "Forfriskende matcha med økologisk peppermynte.",
        ingredients: "Japansk matcha, økologisk peppermynte",
      },
    },
    reviews: [
      { name: "Nora J.", rating: 5, text: "Koel en verfrissend, perfect na een workout.", date: "2025-11-02" },
      { name: "Olivia P.", rating: 5, text: "Alsof je een matcha mojito drinkt. Heerlijk!", date: "2026-02-26" },
      { name: "Lucas T.", rating: 4, text: "Munt is subtiel, niet overheersend. Top.", date: "2026-05-24" },
    ],
  },
  {
    id: "matcha-cacao",
    name: "Cacao Matcha 50g",
    slug: "cacao-matcha-50g",
    hidden: true, // gearchiveerd: oud assortiment, tijdelijk offline
    price: 22.95,
    description: "Romige blend van matcha met rauwe Peruaanse cacao. Diep, vol en chocoladeachtig - een natuurlijk zoete energieboost zonder toegevoegde suikers.",
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
        description: "Cremige Mischung aus Matcha und rohem peruanischem Kakao. Tief, voll und schokoladig - ein natürlich süßer Energieboost ohne zugesetzten Zucker.",
        shortDescription: "Matcha mit rohem peruanischem Kakao.",
        ingredients: "Japanischer Matcha, roher Kakao",
      },
      no: {
        name: "Kakao-Matcha 50g",
        description: "Kremet blanding av matcha og rå peruansk kakao. Dyp, fyldig og sjokoladeaktig - et naturlig søtt energiløft uten tilsatt sukker.",
        shortDescription: "Matcha med rå peruansk kakao.",
        ingredients: "Japansk matcha, rå kakao",
      },
    },
    reviews: [
      { name: "Sara D.", rating: 5, text: "Smaakt als gezonde chocolademelk, maar dan met focus boost!", date: "2025-08-30" },
      { name: "Roel V.", rating: 5, text: "Mijn middag pick-me-up. Diep en romig.", date: "2026-01-10" },
      { name: "Veerle K.", rating: 5, text: "Geweldig in een warme latte met kaneel. Verslavend.", date: "2026-04-20" },
    ],
  },
  {
    id: "matcha-berry",
    name: "Berry Matcha 40g",
    slug: "berry-matcha-40g",
    hidden: true, // gearchiveerd: oud assortiment, tijdelijk offline
    price: 21.95,
    description: "Vrolijke blend van matcha met aardbei en framboos. Vol antioxidanten, fruitig en lichtzoet - heerlijk in smoothies of als zomerse iced latte.",
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
        description: "Fröhliche Mischung aus Matcha mit Erdbeere und Himbeere. Voller Antioxidantien, fruchtig und leicht süß - köstlich in Smoothies oder als sommerliche Iced Latte.",
        shortDescription: "Matcha mit Erdbeere und Himbeere.",
        ingredients: "Japanischer Matcha, Erdbeerpulver, Himbeerpulver",
      },
      no: {
        name: "Bær-Matcha 40g",
        description: "Livlig blanding av matcha med jordbær og bringebær. Full av antioksidanter, fruktig og lett søt - nydelig i smoothier eller som sommerlig iced latte.",
        shortDescription: "Matcha med jordbær og bringebær.",
        ingredients: "Japansk matcha, jordbærpulver, bringebærpulver",
      },
    },
    reviews: [
      { name: "Lynn B.", rating: 5, text: "Vrolijke smaak, heerlijk in smoothies met banaan.", date: "2025-12-11" },
      { name: "Fenna H.", rating: 5, text: "Mooie roze matcha latte gemaakt - Instagram-waardig.", date: "2026-04-06" },
      { name: "Jelle M.", rating: 4, text: "Fruitig en niet te zoet, leuke afwisseling.", date: "2026-06-21" },
    ],
  },
  {
    id: "iced-matcha",
    name: "Iced Matcha Blend 60g",
    slug: "iced-matcha-blend-60g",
    hidden: true, // gearchiveerd: oud assortiment, tijdelijk offline
    price: 23.95,
    description: "Speciaal ontwikkelde blend die ook in koud water perfect oplost. Voor de ultieme iced matcha latte zonder klontjes - gewoon shaken en genieten.",
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
        description: "Speziell entwickelte Mischung, die sich auch in kaltem Wasser perfekt auflöst. Für die ultimative Iced Matcha Latte ohne Klümpchen - einfach schütteln und genießen.",
        shortDescription: "Löst sich sofort in kaltem Wasser auf.",
        ingredients: "100% japanischer Matcha (kalt löslich)",
      },
      no: {
        name: "Iced Matcha Blend 60g",
        description: "Spesialutviklet blanding som løser seg perfekt opp selv i kaldt vann. For den ultimate iced matcha latte uten klumper - bare rist og nyt.",
        shortDescription: "Løser seg umiddelbart opp i kaldt vann.",
        ingredients: "100 % japansk matcha (kaldtoppløselig)",
      },
    },
    reviews: [
      { name: "Amber R.", rating: 5, text: "Echt geen klontjes in koud water, geweldig!", date: "2026-02-06" },
      { name: "Bram L.", rating: 5, text: "Perfect voor zomerse iced lattes. Shaken en klaar.", date: "2026-05-02" },
      { name: "Cato V.", rating: 5, text: "Game changer voor cold brew matcha lovers.", date: "2026-07-02" },
    ],
  },
  {
    id: "tin-reserve",
    name: "Ceremonial Reserve Tin 100g",
    slug: "ceremonial-reserve-tin",
    hidden: true, // gearchiveerd: oud assortiment, tijdelijk offline
    price: 89.95,
    description: "Onze meest exclusieve matcha, verpakt in een matzwart luchtdicht blik met goudfolie detail. Een single-origin reserve uit een kleine familieboerderij in Uji - beperkte oplage.",
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
        description: "Unser exklusivster Matcha, verpackt in einer mattschwarzen, luftdichten Dose mit Goldfolien-Detail. Eine Single-Origin-Reserve von einer kleinen Familienfarm in Uji - limitierte Auflage.",
        shortDescription: "Single-Origin Reserve in Luxus-Dose.",
        ingredients: "100% biologischer Single-Origin-Matcha",
        preparation: "2 g Matcha sieben, 70 ml Wasser (75°C) hinzufügen und zu feinem Schaum schlagen.",
      },
      no: {
        name: "Seremoniell Reserve-boks 100g",
        description: "Vår mest eksklusive matcha, pakket i en matt sort, lufttett boks med detaljer i gullfolie. En single origin-reserve fra en liten familiegård i Uji - begrenset opplag.",
        shortDescription: "Single origin-reserve i eksklusiv boks.",
        ingredients: "100 % økologisk single origin-matcha",
        preparation: "Sikt 2 g matcha, tilsett 70 ml vann (75 °C) og visp til et fint skum.",
      },
    },
    reviews: [
      { name: "Charlotte W.", rating: 5, text: "Ongekend verfijnd. Een echte traktatie.", date: "2025-11-13" },
      { name: "Maximilian D.", rating: 5, text: "De diepste umami die ik ooit heb geproefd. De moeite waard.", date: "2026-02-08" },
      { name: "Beatrice M.", rating: 5, text: "Het blik alleen al is een sieraad. Inhoud sublim.", date: "2026-05-14" },
      { name: "Henry K.", rating: 5, text: "Echt premium niveau, vergelijkbaar met Tokyo theehuizen.", date: "2026-07-09" },
    ],
  },
  {
    id: "travel-kit",
    name: "Travel Ritual Kit",
    slug: "travel-ritual-kit",
    hidden: true, // gearchiveerd: oud assortiment, tijdelijk offline
    price: 64.95,
    description: "Jouw matcha ritueel onderweg. Compacte canvas etui met roestvrijstalen reisklopper, kleine keramische cup en een travel-size matcha pouch (15g). Perfect voor reizen, kantoor of weekendjes weg.",
    shortDescription: "Matcha ritueel onderweg - compleet kit.",
    category: "kits-sets",
    categoryLabel: "Kits & Sets",
    images: [productTravelKit],
    badge: "Nieuw",
    relatedIds: ["starter-kit", "ceremonial-30", "cups-set"],
    i18n: {
      de: {
        name: "Reise-Ritual Set",
        description: "Dein Matcha-Ritual für unterwegs. Kompaktes Canvas-Etui mit Edelstahl-Reisebesen, kleinem Keramikbecher und einer Travel-Size Matcha-Pouch (15 g). Perfekt für Reisen, Büro oder Wochenendtrips.",
        shortDescription: "Matcha-Ritual unterwegs - komplettes Set.",
      },
      no: {
        name: "Reise-ritualsett",
        description: "Matcharitualet ditt på farten. Kompakt etui i canvas med reisevisp i rustfritt stål, liten keramikkopp og en matchapose i reisestørrelse (15 g). Perfekt til reiser, kontoret eller helgeturer.",
        shortDescription: "Matcharitualet på farten - komplett sett.",
      },
    },
    reviews: [
      { name: "Pieter L.", rating: 5, text: "Eindelijk goede matcha tijdens reizen!", date: "2025-09-20" },
      { name: "Janneke V.", rating: 5, text: "Compact, alles past perfect. Meegenomen op city trip.", date: "2025-12-31" },
      { name: "Rik B.", rating: 4, text: "Reisklopper werkt goed, etui is mooi gemaakt.", date: "2026-05-01" },
    ],
  },
  {
    id: "cups-set",
    name: "Handmade Cup Set (2 stuks)",
    slug: "handmade-cup-set",
    hidden: true, // gearchiveerd: oud assortiment, tijdelijk offline
    price: 49.95,
    description: "Set van twee handgemaakte Japanse keramische bekers met uniek groen-crème glazuur. Ambachtelijk gedraaid in Mino, Japan - geen twee zijn hetzelfde.",
    shortDescription: "2 handgemaakte Japanse keramische bekers.",
    category: "accessories",
    categoryLabel: "Accessoires",
    images: [productCupsSet],
    relatedIds: ["matcha-bowl", "tin-reserve", "premium-set"],
    i18n: {
      de: {
        name: "Handgemachtes Tassen-Set (2 Stück)",
        description: "Set aus zwei handgefertigten japanischen Keramikbechern mit einzigartiger grün-cremefarbener Glasur. Handwerklich gedreht in Mino, Japan - keine zwei sind gleich.",
        shortDescription: "2 handgefertigte japanische Keramikbecher.",
      },
      no: {
        name: "Håndlaget koppesett (2 stk.)",
        description: "Sett med to håndlagde japanske keramikkopper med unik glasur i grønt og krem. Dreid for hånd i Mino, Japan - ingen to er like.",
        shortDescription: "2 håndlagde japanske keramikkopper.",
      },
    },
    reviews: [
      { name: "Indy K.", rating: 5, text: "Twee unieke kunstwerkjes. Mooi cadeau gegeven.", date: "2025-05-19" },
      { name: "Loes M.", rating: 5, text: "Voelt warm in de hand, perfecte grootte voor een matcha shot.", date: "2025-09-11" },
      { name: "Stef D.", rating: 5, text: "Glazuur is werkelijk prachtig, geen twee dezelfde.", date: "2026-01-18" },
    ],
  },
  {
    id: "recipe-book",
    name: "The Matcha Ritual - Receptenboek",
    slug: "the-matcha-ritual-book",
    hidden: true, // gearchiveerd: oud assortiment, tijdelijk offline
    price: 29.95,
    description: "Een prachtig vormgegeven hardcover boek met 60+ recepten, rituelen en verhalen rond matcha. Van klassieke bereidingen tot moderne lattes, smoothies en gebak.",
    shortDescription: "60+ recepten, rituelen en verhalen.",
    category: "kits-sets",
    categoryLabel: "Kits & Sets",
    images: [productRecipeBook],
    relatedIds: ["starter-kit", "premium-set", "gift-box"],
    i18n: {
      de: {
        name: "The Matcha Ritual - Kochbuch",
        description: "Ein wunderschön gestaltetes Hardcover-Buch mit 60+ Rezepten, Ritualen und Geschichten rund um Matcha. Von klassischen Zubereitungen bis hin zu modernen Lattes, Smoothies und Backwaren.",
        shortDescription: "60+ Rezepte, Rituale und Geschichten.",
      },
      no: {
        name: "The Matcha Ritual - oppskriftsbok",
        description: "En vakkert utformet innbundet bok med over 60 oppskrifter, ritualer og historier om matcha. Fra klassiske tilberedninger til moderne latte, smoothier og bakverk.",
        shortDescription: "60+ oppskrifter, ritualer og historier.",
      },
    },
    reviews: [
      { name: "Floor B.", rating: 5, text: "Inspirerend en mooi vormgegeven.", date: "2025-12-17" },
      { name: "Nadia V.", rating: 5, text: "Veel meer dan alleen recepten - ook prachtige verhalen.", date: "2026-03-16" },
      { name: "Pepijn J.", rating: 4, text: "Goed boek, recepten zijn duidelijk en goed te volgen.", date: "2026-06-01" },
    ],
  },
  // ─────────────────────────────────────────────────────────────
  // Nieuw assortiment - leverbaar via Teemdrop
  // Prijzen in EUR; NOK volgt automatisch via CurrencyContext
  // (koers 11,5 + charm-afronding op ...9).
  // ─────────────────────────────────────────────────────────────
  {
    id: "matcha-set-compleet",
    name: "Matcha Set Compleet",
    slug: "matcha-set-compleet",
    hidden: false,
    price: 38.95, // ≈ 449 kr
    description: "De complete matchaset voor wie het ritueel helemaal goed wil doen. Met een keramische kom met schenktuit, een handgebonden bamboe chasen van 100 prongs, een keramische chasen-houder om de klopper in vorm te houden, een bamboe chashaku en een fijnmazige RVS-zeef tegen klontjes. Geleverd in een geschenkdoos - klaar om te geven of om zelf mee te beginnen.",
    shortDescription: "Kom, chasen, houder, lepel én zeef in geschenkdoos.",
    category: "kits-sets",
    categoryLabel: "Kits & Sets",
    images: [productMatchaSetCompleet],
    badge: "Bestseller",
    bestseller: true,
    ingredients: "Keramiek, bamboe, roestvrij staal",
    origin: "Ontworpen naar Japans model",
    preparation: "Zeef 1–2 gram matcha in de kom. Voeg 70 ml water van 80 °C toe en klop met de chasen in een W-beweging tot een fijne schuimlaag. Bewaar de chasen na gebruik op de houder.",
    weight: "Set van 5 delen",
    relatedIds: ["matcha-poeder-100g", "matcha-set-green", "chasen-bamboe-100"],
    i18n: {
      de: {
        name: "Matcha Set Komplett",
        description: "Das komplette Matcha-Set für alle, die das Ritual richtig zelebrieren wollen. Mit Keramikschale mit Ausguss, handgebundenem Bambus-Chasen mit 100 Borsten, keramischem Chasen-Halter, Bambus-Chashaku und feinmaschigem Edelstahlsieb gegen Klümpchen. In einer Geschenkbox geliefert - bereit zum Verschenken oder für den eigenen Start.",
        shortDescription: "Schale, Chasen, Halter, Löffel und Sieb in der Geschenkbox.",
        ingredients: "Keramik, Bambus, Edelstahl",
        origin: "Nach japanischem Vorbild gestaltet",
        preparation: "1–2 g Matcha in die Schale sieben. 70 ml Wasser (80 °C) hinzufügen und mit dem Chasen in W-Bewegungen schaumig schlagen. Chasen nach Gebrauch auf dem Halter trocknen lassen.",
        weight: "5-teiliges Set",
        categoryLabel: "Kits & Sets",
      },
      en: {
        name: "Complete Matcha Set",
        description: "The complete matcha set for anyone who wants to do the ritual properly. Includes a ceramic bowl with pouring spout, a hand-tied 100-prong bamboo chasen, a ceramic whisk holder to keep the chasen in shape, a bamboo chashaku and a fine stainless steel sifter to prevent clumps. Delivered in a gift box - ready to give or to start with yourself.",
        shortDescription: "Bowl, whisk, holder, scoop and sifter in a gift box.",
        ingredients: "Ceramic, bamboo, stainless steel",
        origin: "Designed after the Japanese original",
        preparation: "Sift 1–2 grams of matcha into the bowl. Add 70 ml of water at 80 °C and whisk in a W motion until a fine foam forms. Dry the chasen on its holder after use.",
        weight: "5-piece set",
        categoryLabel: "Kits & Sets",
      },
      fr: {
        name: "Coffret Matcha Complet",
        description: "Le coffret matcha complet pour celles et ceux qui veulent accomplir le rituel dans les règles. Avec un bol en céramique à bec verseur, un chasen en bambou à 100 brins noué à la main, un repose-chasen en céramique, un chashaku en bambou et un tamis fin en inox contre les grumeaux. Livré en coffret cadeau - prêt à offrir ou à s'offrir.",
        shortDescription: "Bol, fouet, repose-fouet, cuillère et tamis en coffret.",
        ingredients: "Céramique, bambou, acier inoxydable",
        origin: "Conçu d'après le modèle japonais",
        preparation: "Tamisez 1 à 2 g de matcha dans le bol. Ajoutez 70 ml d'eau à 80 °C et fouettez en W jusqu'à obtenir une mousse fine. Laissez sécher le chasen sur son support après usage.",
        weight: "Coffret 5 pièces",
        categoryLabel: "Kits & Coffrets",
      },
      no: {
        name: "Matchasett Komplett",
        description: "Det komplette matchasettet for deg som vil gjøre ritualet skikkelig. Med keramikkskål med helletut, håndbundet bambus-chasen med 100 tinder, chasenholder i keramikk som holder vispen i form, en chashaku i bambus og en finmasket sil i rustfritt stål mot klumper. Leveres i gaveeske - klar til å gis bort eller til å starte med selv.",
        shortDescription: "Skål, visp, holder, skje og sil i gaveeske.",
        ingredients: "Keramikk, bambus, rustfritt stål",
        origin: "Utformet etter japansk forbilde",
        preparation: "Sikt 1–2 gram matcha i skålen. Tilsett 70 ml vann på 80 °C og visp i W-bevegelser til det dannes et fint skum. La chasenen tørke på holderen etter bruk.",
        weight: "Sett på 5 deler",
        categoryLabel: "Sett & Pakker",
      },
    },
    reviews: [
      { name: "Sanne B.", rating: 5, text: "Alles zit erbij - de zeef maakt echt verschil, geen klontjes meer.", date: "2026-06-14" },
      { name: "Kristine H.", rating: 5, text: "Mooie set en stevige kwaliteit. Als cadeau gegeven en het viel enorm in de smaak.", date: "2026-07-02" },
      { name: "Tim R.", rating: 4, text: "Kom met schenktuit is heel praktisch. Chasen klopt prima schuim.", date: "2026-07-21" },
    ],
  },
  {
    id: "matcha-set-green",
    name: "Matcha Set Green",
    slug: "matcha-set-green",
    hidden: false,
    price: 32.95, // ≈ 379 kr
    description: "Een strak vormgegeven matchaset in zachtgroen keramiek. Met de karakteristieke geribbelde kom met schenktuit, een bamboe chasen, keramische chasen-houder en bamboe chashaku. Alles wat je nodig hebt voor een dagelijks matcha-ritueel, zonder overbodige extra's.",
    shortDescription: "Geribbelde kom, chasen, houder en bamboe lepel.",
    category: "kits-sets",
    categoryLabel: "Kits & Sets",
    images: [productMatchaSetGreen],
    badge: "Nieuw",
    ingredients: "Keramiek, bamboe",
    origin: "Ontworpen naar Japans model",
    preparation: "Zeef 1–2 gram matcha in de kom. Schenk 70 ml water van 80 °C erbij en klop met de chasen in een W-beweging tot het schuimt.",
    weight: "Set van 4 delen",
    relatedIds: ["matcha-set-compleet", "matcha-poeder-100g", "chasen-bamboe-100"],
    i18n: {
      de: {
        name: "Matcha Set Green",
        description: "Ein klar gestaltetes Matcha-Set in zartgrüner Keramik. Mit der charakteristischen gerillten Schale mit Ausguss, einem Bambus-Chasen, keramischem Chasen-Halter und Bambus-Chashaku. Alles für das tägliche Matcha-Ritual, ohne überflüssiges Beiwerk.",
        shortDescription: "Gerillte Schale, Chasen, Halter und Bambuslöffel.",
        ingredients: "Keramik, Bambus",
        origin: "Nach japanischem Vorbild gestaltet",
        preparation: "1–2 g Matcha in die Schale sieben. 70 ml Wasser (80 °C) angießen und mit dem Chasen in W-Bewegungen schaumig schlagen.",
        weight: "4-teiliges Set",
        categoryLabel: "Kits & Sets",
      },
      en: {
        name: "Matcha Set Green",
        description: "A cleanly designed matcha set in soft green ceramic. With the characteristic ribbed bowl with pouring spout, a bamboo chasen, ceramic whisk holder and bamboo chashaku. Everything you need for a daily matcha ritual, with nothing superfluous.",
        shortDescription: "Ribbed bowl, whisk, holder and bamboo scoop.",
        ingredients: "Ceramic, bamboo",
        origin: "Designed after the Japanese original",
        preparation: "Sift 1–2 grams of matcha into the bowl. Pour in 70 ml of water at 80 °C and whisk in a W motion until foamy.",
        weight: "4-piece set",
        categoryLabel: "Kits & Sets",
      },
      fr: {
        name: "Coffret Matcha Green",
        description: "Un coffret matcha au design épuré en céramique vert tendre. Avec le bol nervuré à bec verseur caractéristique, un chasen en bambou, un repose-chasen en céramique et un chashaku en bambou. Tout le nécessaire pour un rituel matcha quotidien, sans superflu.",
        shortDescription: "Bol nervuré, fouet, repose-fouet et cuillère en bambou.",
        ingredients: "Céramique, bambou",
        origin: "Conçu d'après le modèle japonais",
        preparation: "Tamisez 1 à 2 g de matcha dans le bol. Versez 70 ml d'eau à 80 °C et fouettez en W jusqu'à obtenir une mousse.",
        weight: "Coffret 4 pièces",
        categoryLabel: "Kits & Coffrets",
      },
      no: {
        name: "Matchasett Green",
        description: "Et rent utformet matchasett i mykt grønt keramikk. Med den karakteristiske riflete skålen med helletut, en bambus-chasen, chasenholder i keramikk og chashaku i bambus. Alt du trenger til et daglig matcharitual, uten unødvendig ekstrautstyr.",
        shortDescription: "Riflet skål, visp, holder og bambusskje.",
        ingredients: "Keramikk, bambus",
        origin: "Utformet etter japansk forbilde",
        preparation: "Sikt 1–2 gram matcha i skålen. Hell over 70 ml vann på 80 °C og visp i W-bevegelser til det skummer.",
        weight: "Sett på 4 deler",
        categoryLabel: "Sett & Pakker",
      },
    },
    reviews: [
      { name: "Ingrid L.", rating: 5, text: "Prachtige zachtgroene kleur, precies zoals op de foto. Schenktuit werkt fijn.", date: "2026-06-28" },
      { name: "Mees T.", rating: 5, text: "Fijne instapset. De houder houdt de chasen mooi in model.", date: "2026-07-17" },
      { name: "Eline B.", rating: 4, text: "Mooi en compact. Had de zeef er graag bij gehad, maar verder top.", date: "2026-08-04" },
    ],
  },
  {
    id: "matcha-poeder-100g",
    name: "Matcha Poeder 100g",
    slug: "matcha-poeder-100g",
    hidden: false,
    price: 19.95, // ≈ 229 kr
    description: "Fijngemalen groene matcha in een hersluitbare aromazak van 100 gram. Levendig groen, zacht van smaak en met een lichte natuurlijke zoetheid - geschikt voor zowel puur kloppen als voor lattes, smoothies en gebak. De hersluitbare zak houdt kleur en aroma vast.",
    shortDescription: "100 g in hersluitbare aromazak. Puur of in latte.",
    category: "matcha-powder",
    categoryLabel: "Matcha Poeder",
    images: [productMatchaPoederZak],
    badge: "Bestseller",
    bestseller: true,
    ingredients: "100% groene thee (Camellia sinensis), steengemalen",
    origin: "Japanse stijl, fijn steengemalen",
    preparation: "Zeef 1–2 gram matcha. Voeg 70 ml water van 80 °C toe en klop met een chasen tot schuimig. Voor een latte: 2 gram met 50 ml water, aanvullen met 200 ml warme melk.",
    weight: "100g",
    relatedIds: ["matcha-set-compleet", "matcha-poeder-pot-100g", "chasen-bamboe-100"],
    i18n: {
      de: {
        name: "Matcha Pulver 100g",
        description: "Fein gemahlener grüner Matcha im wiederverschließbaren Aromabeutel mit 100 Gramm. Leuchtend grün, mild im Geschmack und mit einer leichten natürlichen Süße - geeignet zum puren Aufschlagen ebenso wie für Lattes, Smoothies und Backwaren. Der wiederverschließbare Beutel bewahrt Farbe und Aroma.",
        shortDescription: "100 g im wiederverschließbaren Aromabeutel. Pur oder als Latte.",
        ingredients: "100% Grüntee (Camellia sinensis), steingemahlen",
        origin: "Japanischer Stil, fein steingemahlen",
        preparation: "1–2 g Matcha sieben. 70 ml Wasser (80 °C) hinzufügen und mit einem Chasen schaumig schlagen. Für einen Latte: 2 g mit 50 ml Wasser anrühren und mit 200 ml warmer Milch auffüllen.",
        categoryLabel: "Matcha Pulver",
      },
      en: {
        name: "Matcha Powder 100g",
        description: "Finely ground green matcha in a resealable 100 gram aroma pouch. Vividly green, mild in flavour and with a light natural sweetness - suitable both for whisking pure and for lattes, smoothies and baking. The resealable pouch preserves colour and aroma.",
        shortDescription: "100 g in a resealable aroma pouch. Pure or in a latte.",
        ingredients: "100% green tea (Camellia sinensis), stone ground",
        origin: "Japanese style, finely stone ground",
        preparation: "Sift 1–2 grams of matcha. Add 70 ml of water at 80 °C and whisk with a chasen until foamy. For a latte: 2 grams with 50 ml water, topped up with 200 ml warm milk.",
        categoryLabel: "Matcha Powder",
      },
      fr: {
        name: "Poudre de Matcha 100g",
        description: "Matcha vert finement moulu en sachet aromatique refermable de 100 grammes. D'un vert vif, doux en bouche et légèrement sucré naturellement - aussi bien pour un fouettage pur que pour les lattes, smoothies et pâtisseries. Le sachet refermable préserve la couleur et l'arôme.",
        shortDescription: "100 g en sachet refermable. Pur ou en latte.",
        ingredients: "100% thé vert (Camellia sinensis), moulu à la meule de pierre",
        origin: "Style japonais, finement moulu à la pierre",
        preparation: "Tamisez 1 à 2 g de matcha. Ajoutez 70 ml d'eau à 80 °C et fouettez au chasen jusqu'à obtenir une mousse. Pour un latte : 2 g avec 50 ml d'eau, complétés par 200 ml de lait chaud.",
        categoryLabel: "Poudre de Matcha",
      },
      no: {
        name: "Matchapulver 100g",
        description: "Finmalt grønn matcha i gjenlukkbar aromapose på 100 gram. Levende grønn, mild i smaken og med en lett naturlig sødme - like godt egnet til å vispe rent som til latte, smoothier og bakverk. Den gjenlukkbare posen bevarer farge og aroma.",
        shortDescription: "100 g i gjenlukkbar aromapose. Ren eller i latte.",
        ingredients: "100 % grønn te (Camellia sinensis), steinmalt",
        origin: "Japansk stil, fint steinmalt",
        preparation: "Sikt 1–2 gram matcha. Tilsett 70 ml vann på 80 °C og visp med en chasen til det skummer. Til latte: 2 gram med 50 ml vann, fyll opp med 200 ml varm melk.",
        categoryLabel: "Matchapulver",
      },
    },
    reviews: [
      { name: "Anna B.", rating: 5, text: "Mooie kleur en geen bittere nasmaak. Zak sluit goed af.", date: "2026-06-09" },
      { name: "Håkon S.", rating: 5, text: "Bra pris for 100 g. Fin smak i latte.", date: "2026-07-05" },
      { name: "Iris W.", rating: 4, text: "Fijn poeder, lost goed op. Gebruik het vooral voor bakken.", date: "2026-07-30" },
      { name: "Bram J.", rating: 5, text: "Dagelijkse matcha voor een nette prijs. Gaat lang mee.", date: "2026-08-11" },
    ],
  },
  {
    id: "matcha-poeder-pot-100g",
    name: "Matcha Poeder Glazen Pot 100g",
    slug: "matcha-poeder-pot-100g",
    hidden: false,
    price: 23.95, // ≈ 279 kr
    description: "Dezelfde fijngemalen matcha, nu in een luchtdichte glazen voorraadpot van 100 gram. Het donkere schroefdeksel houdt licht en vocht buiten, zodat kleur en aroma langer behouden blijven. Staat mooi op het aanrecht en scoopt makkelijk - ideaal als je dagelijks matcha zet.",
    shortDescription: "100 g in luchtdichte glazen pot. Blijft langer vers.",
    category: "matcha-powder",
    categoryLabel: "Matcha Poeder",
    images: [productMatchaPoederPot],
    badge: "Premium",
    ingredients: "100% groene thee (Camellia sinensis), steengemalen",
    origin: "Japanse stijl, fijn steengemalen",
    preparation: "Zeef 1–2 gram matcha. Voeg 70 ml water van 80 °C toe en klop met een chasen tot schuimig. Sluit de pot na gebruik direct en bewaar donker en droog.",
    weight: "100g",
    relatedIds: ["matcha-poeder-100g", "matcha-set-compleet", "chasen-bamboe-100"],
    i18n: {
      de: {
        name: "Matcha Pulver im Glas 100g",
        description: "Derselbe fein gemahlene Matcha, jetzt im luftdichten Vorratsglas mit 100 Gramm. Der dunkle Schraubdeckel hält Licht und Feuchtigkeit fern, sodass Farbe und Aroma länger erhalten bleiben. Steht schön auf der Arbeitsplatte und lässt sich leicht portionieren - ideal, wenn du täglich Matcha zubereitest.",
        shortDescription: "100 g im luftdichten Glas. Bleibt länger frisch.",
        ingredients: "100% Grüntee (Camellia sinensis), steingemahlen",
        origin: "Japanischer Stil, fein steingemahlen",
        preparation: "1–2 g Matcha sieben. 70 ml Wasser (80 °C) hinzufügen und mit einem Chasen schaumig schlagen. Glas nach Gebrauch sofort verschließen, dunkel und trocken lagern.",
        categoryLabel: "Matcha Pulver",
      },
      en: {
        name: "Matcha Powder Glass Jar 100g",
        description: "The same finely ground matcha, now in an airtight 100 gram glass storage jar. The dark screw lid keeps out light and moisture, so colour and aroma last longer. It looks good on the counter and scoops easily - ideal if you make matcha every day.",
        shortDescription: "100 g in an airtight glass jar. Stays fresh longer.",
        ingredients: "100% green tea (Camellia sinensis), stone ground",
        origin: "Japanese style, finely stone ground",
        preparation: "Sift 1–2 grams of matcha. Add 70 ml of water at 80 °C and whisk with a chasen until foamy. Close the jar right after use and store dark and dry.",
        categoryLabel: "Matcha Powder",
      },
      fr: {
        name: "Poudre de Matcha en Bocal 100g",
        description: "Le même matcha finement moulu, cette fois en bocal de conservation hermétique de 100 grammes. Le couvercle à vis foncé protège de la lumière et de l'humidité, préservant plus longtemps la couleur et l'arôme. Élégant sur le plan de travail et facile à doser - idéal si vous préparez du matcha chaque jour.",
        shortDescription: "100 g en bocal hermétique. Reste frais plus longtemps.",
        ingredients: "100% thé vert (Camellia sinensis), moulu à la meule de pierre",
        origin: "Style japonais, finement moulu à la pierre",
        preparation: "Tamisez 1 à 2 g de matcha. Ajoutez 70 ml d'eau à 80 °C et fouettez au chasen jusqu'à obtenir une mousse. Refermez le bocal aussitôt et conservez à l'abri de la lumière.",
        categoryLabel: "Poudre de Matcha",
      },
      no: {
        name: "Matchapulver på Glass 100g",
        description: "Samme finmalte matcha, nå i lufttett oppbevaringsglass på 100 gram. Det mørke skrulokket holder lys og fuktighet ute, slik at farge og aroma holder seg lenger. Det står fint på benken og er lett å dosere fra - ideelt hvis du lager matcha hver dag.",
        shortDescription: "100 g i lufttett glass. Holder seg ferskere lenger.",
        ingredients: "100 % grønn te (Camellia sinensis), steinmalt",
        origin: "Japansk stil, fint steinmalt",
        preparation: "Sikt 1–2 gram matcha. Tilsett 70 ml vann på 80 °C og visp med en chasen til det skummer. Lukk glasset rett etter bruk og oppbevar mørkt og tørt.",
        categoryLabel: "Matchapulver",
      },
    },
    reviews: [
      { name: "Marit H.", rating: 5, text: "De pot houdt de matcha echt langer vers dan een zak. Mooi op het aanrecht.", date: "2026-06-22" },
      { name: "Joris D.", rating: 4, text: "Prima kwaliteit, scoopt makkelijk. Iets duurder dan de zak maar het waard.", date: "2026-07-24" },
      { name: "Silje K.", rating: 5, text: "Fin farge og god smak. Glasset er solid.", date: "2026-08-08" },
    ],
  },
  {
    id: "chasen-bamboe-100",
    name: "Bamboe Chasen - 100 Prongs",
    slug: "chasen-bamboe-100",
    hidden: false,
    price: 16.95, // ≈ 199 kr
    description: "Een handgebonden bamboe klopper met honderd fijne tanden, gesneden uit één stuk bamboe. Dat is het gereedschap dat matcha van korrelig naar fluweelzacht brengt: de dunne tanden slaan lucht in de thee en geven die kenmerkende fijne schuimlaag. Spoel na gebruik met warm water en laat drogen op een chasen-houder.",
    shortDescription: "Handgebonden bamboe klopper, 100 fijne tanden.",
    category: "accessories",
    categoryLabel: "Accessoires",
    images: [productChasenBamboe100],
    ingredients: "100% bamboe, handgebonden",
    origin: "Traditioneel Japans model",
    preparation: "Week de chasen 1 minuut in warm water voor het eerste gebruik. Klop in een snelle W-beweging, niet roerend. Spoel na gebruik af zonder zeep en droog op een houder.",
    weight: "Ca. 11 cm",
    relatedIds: ["matcha-poeder-100g", "matcha-set-compleet", "matcha-set-green"],
    i18n: {
      de: {
        name: "Bambus-Chasen - 100 Borsten",
        description: "Ein handgebundener Bambusbesen mit hundert feinen Borsten, aus einem Stück Bambus geschnitten. Genau dieses Werkzeug macht aus körnigem Matcha eine samtige Tasse: Die dünnen Borsten schlagen Luft in den Tee und erzeugen die charakteristische feine Schaumschicht. Nach Gebrauch mit warmem Wasser abspülen und auf einem Chasen-Halter trocknen lassen.",
        shortDescription: "Handgebundener Bambusbesen mit 100 feinen Borsten.",
        ingredients: "100% Bambus, handgebunden",
        origin: "Traditionelles japanisches Modell",
        preparation: "Chasen vor dem ersten Gebrauch 1 Minute in warmem Wasser einweichen. In schnellen W-Bewegungen schlagen, nicht rühren. Nach Gebrauch ohne Spülmittel abspülen und auf dem Halter trocknen.",
        weight: "Ca. 11 cm",
        categoryLabel: "Zubehör",
      },
      en: {
        name: "Bamboo Chasen - 100 Prongs",
        description: "A hand-tied bamboo whisk with one hundred fine prongs, carved from a single piece of bamboo. This is the tool that takes matcha from grainy to velvet: the thin prongs beat air into the tea and create that characteristic fine layer of foam. Rinse with warm water after use and dry on a chasen holder.",
        shortDescription: "Hand-tied bamboo whisk with 100 fine prongs.",
        ingredients: "100% bamboo, hand-tied",
        origin: "Traditional Japanese design",
        preparation: "Soak the chasen in warm water for 1 minute before first use. Whisk in a fast W motion, not stirring. Rinse without soap after use and dry on a holder.",
        weight: "Approx. 11 cm",
        categoryLabel: "Accessories",
      },
      fr: {
        name: "Chasen en Bambou - 100 brins",
        description: "Un fouet en bambou noué à la main, doté de cent brins fins taillés dans une seule pièce de bambou. C'est l'outil qui transforme un matcha granuleux en tasse veloutée : les brins fins incorporent de l'air au thé et créent cette fine mousse caractéristique. Rincez à l'eau chaude après usage et laissez sécher sur un repose-chasen.",
        shortDescription: "Fouet en bambou noué main, 100 brins fins.",
        ingredients: "100% bambou, noué à la main",
        origin: "Modèle japonais traditionnel",
        preparation: "Faites tremper le chasen 1 minute dans de l'eau chaude avant la première utilisation. Fouettez en W rapides, sans remuer. Rincez sans savon après usage et séchez sur un support.",
        weight: "Env. 11 cm",
        categoryLabel: "Accessoires",
      },
      no: {
        name: "Bambus-Chasen - 100 tinder",
        description: "En håndbundet bambusvisp med hundre fine tinder, skåret ut av ett stykke bambus. Det er dette redskapet som tar matchaen fra kornete til fløyelsmyk: de tynne tindene pisker luft inn i teen og gir det karakteristiske fine skumlaget. Skyll med varmt vann etter bruk og la den tørke på en chasenholder.",
        shortDescription: "Håndbundet bambusvisp med 100 fine tinder.",
        ingredients: "100 % bambus, håndbundet",
        origin: "Tradisjonell japansk modell",
        preparation: "Bløtlegg chasenen i varmt vann i 1 minutt før første gangs bruk. Visp i raske W-bevegelser, ikke rør. Skyll uten såpe etter bruk og tørk på en holder.",
        weight: "Ca. 11 cm",
        categoryLabel: "Tilbehør",
      },
    },
    reviews: [
      { name: "Lieke S.", rating: 5, text: "Veel fijner schuim dan met een garde. Voelt stevig aan.", date: "2026-06-30" },
      { name: "Ola N.", rating: 5, text: "Solid visp til god pris. Fungerer perfekt.", date: "2026-07-19" },
      { name: "Femke A.", rating: 4, text: "Doet precies wat het moet. Wel echt op een houder laten drogen.", date: "2026-08-13" },
    ],
  },

];

// ─── EINDE productsRaw ─── (sitemap-script scant tot hier)

// ─── Redirects voor het gearchiveerde assortiment ────────────

/**
 * Oude productslugs sturen door naar het dichtstbijzijnde nieuwe product.
 * De kennisbank, blog, glossary en landingspagina's bevatten honderden
 * inhoudelijke links naar deze slugs; hiermee blijven die werken zonder 404.
 * Een slug zonder mapping valt terug op /shop (afgehandeld in ProductDetail).
 */
export const ARCHIVED_SLUG_REDIRECTS: Record<string, string> = {
  "ceremonial-matcha-30g": "matcha-poeder-100g",
  "ceremonial-matcha-100g": "matcha-poeder-100g",
  "culinary-matcha-100g": "matcha-poeder-100g",
  "vanilla-matcha-50g": "matcha-poeder-100g",
  "matcha-yuzu-blend-40g": "matcha-poeder-100g",
  "mint-matcha-40g": "matcha-poeder-100g",
  "cacao-matcha-50g": "matcha-poeder-100g",
  "berry-matcha-40g": "matcha-poeder-100g",
  "iced-matcha-blend-60g": "matcha-poeder-100g",
  "hojicha-poeder-50g": "matcha-poeder-100g",
  "sencha-loose-leaf-75g": "matcha-poeder-100g",
  "genmaicha-loose-leaf-50g": "matcha-poeder-100g",
  "discovery-tea-box": "matcha-poeder-100g",
  "ceremonial-reserve-tin": "matcha-poeder-pot-100g",
  "starter-kit": "matcha-set-compleet",
  "premium-ritual-set": "matcha-set-compleet",
  "gift-box": "matcha-set-compleet",
  "bamboe-chashaku": "matcha-set-compleet",
  "the-matcha-ritual-book": "matcha-set-compleet",
  "travel-ritual-kit": "matcha-set-green",
  "keramische-matcha-kom": "matcha-set-green",
  "handmade-cup-set": "matcha-set-green",
  "bamboe-chasen": "chasen-bamboe-100",
  "elektrische-melkopschuimer": "chasen-bamboe-100",
};

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

/**
 * Bepaalt of een /product/<slug>-pad omgeleid moet worden. Wordt in de router
 * afgehandeld - vóór de pagina mount - omdat een redirect vanuit een al
 * gemounte pagina de AnimatePresence-overgang halverwege onderbreekt en de
 * nieuwe pagina op opacity 0 laat staan.
 *
 * Retourneert null als het pad prima is.
 */
export const resolveProductPath = (pathname: string): string | null => {
  // /<taal>/<productslug-in-die-taal>/<slug> - de basis verschilt per taal
  // (product / produkt / produit), dus die accepteren we allemaal.
  const match = /^\/([a-z]{2})\/(?:product|produkt|produit)\/([^/?#]+)\/?$/.exec(pathname);
  if (!match) return null;
  const [, lang, raw] = match;
  const slug = decodeURIComponent(raw);
  if (productsRaw.some(p => p.slug === slug && isVisible(p))) return null;
  const target = ARCHIVED_SLUG_REDIRECTS[slug];
  return target ? `/${lang}/${PRODUCT_BASE[lang] ?? "product"}/${target}` : `/${lang}/${SHOP_BASE[lang] ?? "shop"}`;
};

/** Basis-slugs die resolveProductPath nodig heeft zonder circulaire import. */
const PRODUCT_BASE: Record<string, string> = {
  nl: "product", en: "product", de: "produkt", fr: "produit", no: "produkt",
};
const SHOP_BASE: Record<string, string> = {
  nl: "shop", en: "shop", de: "shop", fr: "boutique", no: "butikk",
};

/** Gemiddelde score en totaal aantal reviews over het zichtbare assortiment. */
export const getReviewAggregate = (): { average: number; count: number } => {
  const all = productsRaw.filter(isVisible).flatMap(p => p.reviews);
  if (!all.length) return { average: 0, count: 0 };
  const sum = all.reduce((acc, r) => acc + r.rating, 0);
  return { average: sum / all.length, count: all.length };
};

/** Laagste prijs in het zichtbare assortiment - voor "shop vanaf …"-CTA's. */
export const getLowestPrice = (): number =>
  Math.min(...productsRaw.filter(isVisible).map(p => p.price));

/**
 * Basis-id van een winkelwagenregel. Bundels en staffelkortingen voegen een
 * suffix toe (`-bundle`, `-x2`) en krijgen daarmee een eigen regel met eigen
 * stuksprijs; voor "zit dit al in de wagen?" tel je het basisproduct.
 */
export const baseProductId = (id: string): string =>
  id.replace(/-(?:bundle|x\d+)$/, "");

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
