import productCeremonial30 from "@/assets/product-ceremonial-30.jpg";
import productStarterKit from "@/assets/product-starter-kit.jpg";
import productPremiumSet from "@/assets/product-premium-set.jpg";
import productGiftBox from "@/assets/product-gift-box.jpg";
import productChasen from "@/assets/product-chasen.jpg";
import productMatchaBowl from "@/assets/product-matcha-bowl.jpg";
import productChashaku from "@/assets/product-chashaku.jpg";
import productFrother from "@/assets/product-frother.jpg";
import productHojicha from "@/assets/product-hojicha.jpg";
import productGenmaicha from "@/assets/product-genmaicha.jpg";
import productMatchaYuzu from "@/assets/product-matcha-yuzu.jpg";

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
  relatedIds?: string[];
  reviews: { name: string; rating: number; text: string; date: string }[];
}

export const categories = [
  { value: "all", label: "Alle Producten" },
  { value: "matcha-powder", label: "Matcha Poeder" },
  { value: "kits-sets", label: "Kits & Sets" },
  { value: "accessories", label: "Accessoires" },
  { value: "teas-drinks", label: "Thee & Dranken" },
];

export const products: Product[] = [
  {
    id: "ceremonial-30",
    name: "Ceremonial Grade Matcha 30g",
    slug: "ceremonial-grade-matcha-30g",
    price: 18.95,
    description: "Onze premium ceremonial grade matcha, handgeplukt in de Uji-regio van Kyoto, Japan. Deze fijngemalen groene thee heeft een levendig groene kleur, een zoete umami smaak en een fluweelzachte textuur. Perfect voor de traditionele Japanse theeceremonie of een pure matcha ervaring.",
    shortDescription: "Handgeplukt in Uji, Japan. Zuivere umami smaak.",
    category: "matcha-powder",
    categoryLabel: "Matcha Poeder",
    images: [productCeremonial30],
    badge: "Bestseller",
    bestseller: true,
    ingredients: "100% biologische Japanse matcha (Camellia sinensis)",
    origin: "Uji, Kyoto, Japan",
    preparation: "Zeef 1-2 gram matcha in een kom. Voeg 70ml water toe (80°C). Klop met een chasen tot schuimig.",
    weight: "30g",
    relatedIds: ["ceremonial-100", "starter-kit", "chasen"],
    reviews: [
      { name: "Sophie V.", rating: 5, text: "De beste matcha die ik ooit heb geproefd. Prachtige kleur en smaak.", date: "2024-02-15" },
      { name: "Lars M.", rating: 5, text: "Geweldige kwaliteit, mijn dagelijkse ritueel.", date: "2024-01-20" },
      { name: "Emma D.", rating: 4, text: "Heerlijke matcha, snelle levering.", date: "2024-03-01" },
    ],
  },
  {
    id: "ceremonial-100",
    name: "Ceremonial Grade Matcha 100g",
    slug: "ceremonial-grade-matcha-100g",
    price: 49.95,
    description: "Onze premium ceremonial grade matcha in een voordeelverpakking van 100 gram. Dezelfde ongeëvenaarde kwaliteit uit de Uji-regio, voor de echte matcha liefhebber die dagelijks geniet van het perfecte kopje.",
    shortDescription: "Premium kwaliteit, voordeelverpakking.",
    category: "matcha-powder",
    categoryLabel: "Matcha Poeder",
    images: [productCeremonial30],
    badge: "Voordeel",
    ingredients: "100% biologische Japanse matcha (Camellia sinensis)",
    origin: "Uji, Kyoto, Japan",
    preparation: "Zeef 1-2 gram matcha in een kom. Voeg 70ml water toe (80°C). Klop met een chasen tot schuimig.",
    weight: "100g",
    relatedIds: ["ceremonial-30", "premium-set", "matcha-bowl"],
    reviews: [
      { name: "Thomas K.", rating: 5, text: "Perfecte waarde voor deze kwaliteit.", date: "2024-02-28" },
    ],
  },
  {
    id: "culinary-100",
    name: "Culinary Grade Matcha 100g",
    slug: "culinary-grade-matcha-100g",
    price: 24.95,
    description: "Onze culinary grade matcha is perfect voor matcha lattes, smoothies, gebak en andere recepten. Een iets robuustere smaak die zich uitstekend mengt met melk en andere ingrediënten.",
    shortDescription: "Ideaal voor lattes, smoothies & recepten.",
    category: "matcha-powder",
    categoryLabel: "Matcha Poeder",
    images: [productCeremonial30],
    relatedIds: ["frother", "ceremonial-30"],
    ingredients: "100% Japanse matcha (Camellia sinensis)",
    origin: "Kagoshima, Japan",
    weight: "100g",
    reviews: [
      { name: "Anna B.", rating: 5, text: "Perfect voor mijn ochtend latte!", date: "2024-01-15" },
    ],
  },
  {
    id: "starter-kit",
    name: "Starter Kit",
    slug: "starter-kit",
    price: 39.95,
    description: "Alles wat je nodig hebt om te starten met matcha. Bevat 30g ceremonial grade matcha, een handgemaakte bamboe chasen (klopper) en een prachtige keramische matcha kom. Het perfecte cadeau voor jezelf of een geliefde.",
    shortDescription: "30g matcha + bamboe klopper + keramische kom.",
    category: "kits-sets",
    categoryLabel: "Kits & Sets",
    images: [productStarterKit],
    badge: "Populair",
    bestseller: true,
    relatedIds: ["ceremonial-30", "chashaku", "chasen"],
    reviews: [
      { name: "Mila J.", rating: 5, text: "Prachtige set, geweldig cadeau!", date: "2024-02-10" },
      { name: "Daan V.", rating: 5, text: "Alles van hoge kwaliteit. Aanrader.", date: "2024-01-25" },
    ],
  },
  {
    id: "premium-set",
    name: "Premium Ritual Set",
    slug: "premium-ritual-set",
    price: 79.95,
    description: "Het ultieme matcha ritueel. Deze luxe set bevat 100g ceremonial grade matcha, een handgemaakte bamboe chasen, een ambachtelijke keramische kom en een traditionele chakin doek. Verpakt in een prachtige geschenkdoos.",
    shortDescription: "100g matcha + klopper + kom + chakin doek.",
    category: "kits-sets",
    categoryLabel: "Kits & Sets",
    images: [productPremiumSet],
    badge: "Premium",
    relatedIds: ["ceremonial-100", "chashaku"],
    reviews: [
      { name: "Isabel R.", rating: 5, text: "Schitterend! Voelt echt als een luxe ritueel.", date: "2024-03-05" },
    ],
  },
  {
    id: "gift-box",
    name: "Gift Box",
    slug: "gift-box",
    price: 59.95,
    description: "Een zorgvuldig samengestelde geschenkdoos met onze beste producten. Perfect als cadeau voor matcha liefhebbers. Bevat een selectie matcha, accessoires en een persoonlijk kaartje.",
    shortDescription: "Gecureerde selectie in premium verpakking.",
    category: "kits-sets",
    categoryLabel: "Kits & Sets",
    images: [productGiftBox],
    relatedIds: ["starter-kit", "premium-set"],
    reviews: [],
  },
  {
    id: "chasen",
    name: "Bamboe Chasen (Klopper)",
    slug: "bamboe-chasen",
    price: 14.95,
    description: "Een traditionele bamboe matcha klopper, handgemaakt van een enkel stuk bamboe met 80 fijne tanden. Essentieel voor het bereiden van de perfecte schuimige matcha.",
    shortDescription: "Handgemaakt, 80 tanden, traditioneel bamboe.",
    category: "accessories",
    categoryLabel: "Accessoires",
    images: [productChasen],
    relatedIds: ["matcha-bowl", "chashaku", "ceremonial-30"],
    reviews: [
      { name: "Ruben H.", rating: 4, text: "Mooie kwaliteit klopper.", date: "2024-02-20" },
    ],
  },
  {
    id: "matcha-bowl",
    name: "Handgemaakte Keramische Matcha Kom",
    slug: "keramische-matcha-kom",
    price: 29.95,
    description: "Een prachtige handgemaakte keramische matcha kom (chawan) met een uniek glazuur. Elke kom is uniek en gemaakt door ambachtslieden. De brede vorm is ideaal voor het kloppen van matcha.",
    shortDescription: "Uniek handgemaakt, ambachtelijk glazuur.",
    category: "accessories",
    categoryLabel: "Accessoires",
    images: [productMatchaBowl],
    relatedIds: ["chasen", "chashaku", "ceremonial-30"],
    reviews: [
      { name: "Lotte S.", rating: 5, text: "Prachtig! Elk stuk is echt uniek.", date: "2024-01-30" },
    ],
  },
  {
    id: "chashaku",
    name: "Bamboe Chashaku (Lepel)",
    slug: "bamboe-chashaku",
    price: 7.95,
    description: "Een traditionele bamboe matcha lepel voor het afmeten van de perfecte hoeveelheid matcha. Handgemaakt en duurzaam.",
    shortDescription: "Traditionele bamboe maatlepel.",
    category: "accessories",
    categoryLabel: "Accessoires",
    images: [productChashaku],
    relatedIds: ["chasen", "matcha-bowl"],
    reviews: [],
  },
  {
    id: "frother",
    name: "Elektrische Melkopschuimer",
    slug: "elektrische-melkopschuimer",
    price: 12.95,
    description: "Een handige elektrische melkopschuimer, perfect voor het snel bereiden van matcha lattes. Compact en eenvoudig in gebruik.",
    shortDescription: "Snel & eenvoudig matcha lattes maken.",
    category: "accessories",
    categoryLabel: "Accessoires",
    images: [productFrother],
    relatedIds: ["culinary-100"],
    reviews: [],
  },
  {
    id: "hojicha",
    name: "Hojicha Poeder 50g",
    slug: "hojicha-poeder-50g",
    price: 16.95,
    description: "Geroosterde Japanse groene thee in poedervorm. Hojicha heeft een warm, karamelachtig en nootachtig smaakprofiel met weinig cafeïne. Heerlijk als warme thee of latte.",
    shortDescription: "Gerosterde thee, warm & karamelachtig.",
    category: "teas-drinks",
    categoryLabel: "Thee & Dranken",
    images: [productHojicha],
    relatedIds: ["genmaicha", "matcha-yuzu"],
    ingredients: "100% Japanse hojicha (Camellia sinensis)",
    origin: "Kyoto, Japan",
    weight: "50g",
    reviews: [
      { name: "Eva T.", rating: 5, text: "Heerlijk voor 's avonds, laag in cafeïne.", date: "2024-02-18" },
    ],
  },
  {
    id: "genmaicha",
    name: "Genmaicha Loose Leaf 50g",
    slug: "genmaicha-loose-leaf-50g",
    price: 12.95,
    description: "Traditionele Japanse groene thee gemengd met geroosterde rijst. Een unieke, nootachtige en hartige smaak die geweldig is bij het ontbijt of als middagthee.",
    shortDescription: "Groene thee met geroosterde rijst.",
    category: "teas-drinks",
    categoryLabel: "Thee & Dranken",
    images: [productGenmaicha],
    relatedIds: ["hojicha", "matcha-yuzu"],
    ingredients: "Japanse groene thee, geroosterde rijst",
    origin: "Shizuoka, Japan",
    weight: "50g",
    reviews: [],
  },
  {
    id: "matcha-yuzu",
    name: "Matcha Yuzu Blend 40g",
    slug: "matcha-yuzu-blend-40g",
    price: 19.95,
    description: "Een unieke blend van onze premium matcha met Japanse yuzu citrus. Verfrissend en aromatisch, perfect voor een zomerse matcha ervaring of als basis voor cocktails.",
    shortDescription: "Verfrissende matcha met Japanse yuzu citrus.",
    category: "teas-drinks",
    categoryLabel: "Thee & Dranken",
    images: [productMatchaYuzu],
    badge: "Nieuw",
    relatedIds: ["ceremonial-30", "hojicha"],
    ingredients: "Japanse matcha, yuzu schilpoeder",
    origin: "Uji, Japan",
    weight: "40g",
    reviews: [],
  },
];

export const getProductBySlug = (slug: string) => products.find(p => p.slug === slug);
export const getProductById = (id: string) => products.find(p => p.id === id);
export const getRelatedProducts = (product: Product) =>
  (product.relatedIds || []).map(id => getProductById(id)).filter(Boolean) as Product[];
export const getFeaturedProducts = () => products.filter(p => p.bestseller || p.badge);
