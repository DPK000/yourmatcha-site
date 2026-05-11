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
    reviews: [
        {
          "name": "Sophie V.",
          "rating": 5,
          "text": "De beste matcha die ik ooit heb geproefd. Prachtige kleur en smaak.",
          "date": "2024-02-15"
        },
        {
          "name": "Lars M.",
          "rating": 5,
          "text": "Geweldige kwaliteit, mijn dagelijkse ritueel.",
          "date": "2024-01-20"
        },
        {
          "name": "Emma D.",
          "rating": 4,
          "text": "Heerlijke matcha, snelle levering.",
          "date": "2024-03-01"
        },
        {
          "name": "Julia K.",
          "rating": 5,
          "text": "Levendig groen en zo'n zachte umami. Echt verschil met supermarkt matcha.",
          "date": "2024-03-18"
        },
        {
          "name": "Tom S.",
          "rating": 5,
          "text": "Mooie verpakking, perfect kopje matcha. Wordt vaste bestelling.",
          "date": "2024-04-05"
        },
        {
          "name": "Sanne B.",
          "rating": 5,
          "text": "Smaak is fluweelzacht, bijna romig. Aanrader voor de echte liefhebber.",
          "date": "2024-04-22"
        },
        {
          "name": "Marit H.",
          "rating": 4,
          "text": "Fijne matcha, klopt zonder klontjes. Iets pittiger dan verwacht.",
          "date": "2024-05-09"
        }
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
    reviews: [
        {
          "name": "Thomas K.",
          "rating": 5,
          "text": "Perfecte waarde voor deze kwaliteit.",
          "date": "2024-02-28"
        },
        {
          "name": "Linde V.",
          "rating": 5,
          "text": "100g gaat lang mee en blijft vers in de pouch. Top!",
          "date": "2024-03-15"
        },
        {
          "name": "Bram J.",
          "rating": 5,
          "text": "Heldere umami en lange afdronk. Beste prijs-kwaliteit.",
          "date": "2024-04-01"
        },
        {
          "name": "Esmee P.",
          "rating": 5,
          "text": "Voor mijn ochtend ritueel — dagelijks genot.",
          "date": "2024-04-19"
        },
        {
          "name": "Joris D.",
          "rating": 4,
          "text": "Hoge kwaliteit, levering keurig binnen 2 dagen.",
          "date": "2024-05-03"
        }
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
    reviews: [
        {
          "name": "Anna B.",
          "rating": 5,
          "text": "Perfect voor mijn ochtend latte!",
          "date": "2024-01-15"
        },
        {
          "name": "Mees T.",
          "rating": 5,
          "text": "Mengt prachtig met haver- en amandelmelk. Mooi groen schuim.",
          "date": "2024-02-12"
        },
        {
          "name": "Iris W.",
          "rating": 4,
          "text": "Stevige smaak, ideaal voor bakken. Mijn matcha brownies zijn een hit.",
          "date": "2024-03-08"
        },
        {
          "name": "Sander R.",
          "rating": 5,
          "text": "Beste culinary die ik geprobeerd heb. Geen bittere ondertoon.",
          "date": "2024-04-14"
        },
        {
          "name": "Kim L.",
          "rating": 5,
          "text": "Gebruik het dagelijks voor smoothies. Top kwaliteit voor de prijs.",
          "date": "2024-05-01"
        }
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
    reviews: [
        {
          "name": "Noor P.",
          "rating": 5,
          "text": "Verslavend lekker in een latte!",
          "date": "2024-03-10"
        },
        {
          "name": "Femke A.",
          "rating": 5,
          "text": "De vanille is écht echt — geen kunstmatige smaak.",
          "date": "2024-03-28"
        },
        {
          "name": "Roos D.",
          "rating": 5,
          "text": "Mijn favoriete avond drankje, zo romig.",
          "date": "2024-04-15"
        },
        {
          "name": "Jasper V.",
          "rating": 4,
          "text": "Lekker zoet zonder suiker toe te voegen. Aanrader.",
          "date": "2024-05-02"
        }
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
    reviews: [
        {
          "name": "Mila J.",
          "rating": 5,
          "text": "Prachtige set, geweldig cadeau!",
          "date": "2024-02-10"
        },
        {
          "name": "Daan V.",
          "rating": 5,
          "text": "Alles van hoge kwaliteit. Aanrader.",
          "date": "2024-01-25"
        },
        {
          "name": "Lieke S.",
          "rating": 5,
          "text": "Perfect om te beginnen met matcha. Duidelijke uitleg erbij.",
          "date": "2024-03-12"
        },
        {
          "name": "Wouter F.",
          "rating": 5,
          "text": "Mooi verpakt, ideaal als verjaardagscadeau gegeven.",
          "date": "2024-04-08"
        },
        {
          "name": "Eline B.",
          "rating": 4,
          "text": "Fijne starter, kom is prachtig handgemaakt.",
          "date": "2024-04-25"
        },
        {
          "name": "Nina H.",
          "rating": 5,
          "text": "Binnen 5 minuten mijn eerste perfecte kopje. Topservice.",
          "date": "2024-05-10"
        }
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
    reviews: [
        {
          "name": "Isabel R.",
          "rating": 5,
          "text": "Schitterend! Voelt als een luxe ritueel.",
          "date": "2024-03-05"
        },
        {
          "name": "Olivier M.",
          "rating": 5,
          "text": "Verpakking is een belevenis op zich. Cadeau gegeven aan moeder — ze was sprakeloos.",
          "date": "2024-03-22"
        },
        {
          "name": "Camille D.",
          "rating": 5,
          "text": "De kom is een kunstwerk en de matcha is sublime.",
          "date": "2024-04-09"
        },
        {
          "name": "Hugo P.",
          "rating": 5,
          "text": "Premium in elk detail, geld dubbel en dwars waard.",
          "date": "2024-04-28"
        },
        {
          "name": "Saskia V.",
          "rating": 5,
          "text": "Mijn dagelijks ritueel sinds ik deze set heb. Geweldig.",
          "date": "2024-05-14"
        }
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
    reviews: [
        {
          "name": "Hannah L.",
          "rating": 5,
          "text": "Cadeau gegeven aan mijn zus — ze was helemaal verrast door de mooie verpakking.",
          "date": "2024-02-20"
        },
        {
          "name": "Vincent K.",
          "rating": 5,
          "text": "Perfect Sinterklaas cadeau. Voelt echt premium aan.",
          "date": "2024-03-15"
        },
        {
          "name": "Britt M.",
          "rating": 5,
          "text": "Inhoud is goed gekozen, niets overbodigs. Mooi kaartje erbij.",
          "date": "2024-04-02"
        },
        {
          "name": "Tessa W.",
          "rating": 4,
          "text": "Mooi cadeau, snelle levering met handgeschreven kaart.",
          "date": "2024-04-20"
        }
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
    reviews: [
        {
          "name": "Robin J.",
          "rating": 5,
          "text": "Geweldige manier om de hele lijn te proeven. Hojicha was mijn favoriet!",
          "date": "2024-03-01"
        },
        {
          "name": "Demi V.",
          "rating": 5,
          "text": "Perfect om te ontdekken wat bij je past. Goede portiegrootte.",
          "date": "2024-03-25"
        },
        {
          "name": "Sven P.",
          "rating": 4,
          "text": "Leuke box, alleen wel snel doorheen.",
          "date": "2024-04-12"
        },
        {
          "name": "Anouk B.",
          "rating": 5,
          "text": "Ideaal als kennismaking. Heb daarna meteen sencha bijbesteld.",
          "date": "2024-05-05"
        }
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
    reviews: [
        {
          "name": "Ruben H.",
          "rating": 4,
          "text": "Mooie kwaliteit klopper.",
          "date": "2024-02-20"
        },
        {
          "name": "Maud E.",
          "rating": 5,
          "text": "Veel beter dan goedkope varianten — schuim is veel fijner.",
          "date": "2024-03-10"
        },
        {
          "name": "Quinn L.",
          "rating": 5,
          "text": "Echte vakmanschap, voelt licht en stevig tegelijk.",
          "date": "2024-04-01"
        },
        {
          "name": "Stijn M.",
          "rating": 5,
          "text": "Gaat mij lang mee, behandel ik met zorg. Top product.",
          "date": "2024-04-22"
        }
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
    reviews: [
        {
          "name": "Lotte S.",
          "rating": 5,
          "text": "Prachtig! Elk stuk is echt uniek.",
          "date": "2024-01-30"
        },
        {
          "name": "Floortje N.",
          "rating": 5,
          "text": "Ligt perfect in de hand, mooi glazuur. Voelt warm aan.",
          "date": "2024-02-25"
        },
        {
          "name": "Bas K.",
          "rating": 5,
          "text": "Voelt ambachtelijk. Goede afmeting voor klassieke bereiding.",
          "date": "2024-03-19"
        },
        {
          "name": "Yara D.",
          "rating": 4,
          "text": "Heel mooi stuk, levering goed verpakt.",
          "date": "2024-04-15"
        }
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
    reviews: [
        {
          "name": "Thijs B.",
          "rating": 5,
          "text": "Perfecte hoeveelheid in één scoop. Mooi bamboe.",
          "date": "2024-02-08"
        },
        {
          "name": "Iris H.",
          "rating": 5,
          "text": "Klein detail dat veel verschil maakt in het ritueel.",
          "date": "2024-03-04"
        },
        {
          "name": "Niek V.",
          "rating": 4,
          "text": "Goede prijs, doet wat het moet doen.",
          "date": "2024-04-10"
        }
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
    reviews: [
        {
          "name": "Sophia M.",
          "rating": 5,
          "text": "Snel, krachtig en stil. Mijn lattes zijn nu perfect schuimig.",
          "date": "2024-02-14"
        },
        {
          "name": "Dennis R.",
          "rating": 5,
          "text": "Klein maar krachtig, perfect voor culinary matcha.",
          "date": "2024-03-03"
        },
        {
          "name": "Lara K.",
          "rating": 4,
          "text": "Werkt goed, batterijen gaan lang mee.",
          "date": "2024-03-28"
        },
        {
          "name": "Mark V.",
          "rating": 5,
          "text": "Voor wie geen chasen wil — dit is de oplossing.",
          "date": "2024-04-19"
        }
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
    reviews: [
        {
          "name": "Eva T.",
          "rating": 5,
          "text": "Heerlijk voor 's avonds, laag in cafeïne.",
          "date": "2024-02-18"
        },
        {
          "name": "Pim D.",
          "rating": 5,
          "text": "Karamel- en notenaroma, echt verrassend lekker.",
          "date": "2024-03-09"
        },
        {
          "name": "Inge V.",
          "rating": 5,
          "text": "Geweldig in een latte met havermelk. Comfort in een kop.",
          "date": "2024-04-02"
        },
        {
          "name": "Suze L.",
          "rating": 4,
          "text": "Warme smaak, perfect voor herfstavonden.",
          "date": "2024-04-23"
        }
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
    reviews: [
        {
          "name": "Bart W.",
          "rating": 5,
          "text": "Zacht grasachtig en zoet — niet bitter zoals andere sencha's.",
          "date": "2024-03-06"
        },
        {
          "name": "Karlijn R.",
          "rating": 5,
          "text": "Mijn dagelijkse middagthee. Hoge kwaliteit losse blad.",
          "date": "2024-03-29"
        },
        {
          "name": "Hidde M.",
          "rating": 4,
          "text": "Verfrissend, mooie heldergele kleur na zetten.",
          "date": "2024-04-18"
        },
        {
          "name": "Saar B.",
          "rating": 5,
          "text": "Heerlijk verfrissend, goed te zetten meerdere keren.",
          "date": "2024-05-08"
        }
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
    reviews: [
        {
          "name": "Jeroen H.",
          "rating": 5,
          "text": "Nootachtig en hartig, perfect bij het ontbijt.",
          "date": "2024-02-22"
        },
        {
          "name": "Lisanne K.",
          "rating": 5,
          "text": "De geroosterde rijst geeft echt een extra dimensie. Top!",
          "date": "2024-03-17"
        },
        {
          "name": "Casper N.",
          "rating": 4,
          "text": "Verrassend lekker, ook voor wie niet van groene thee houdt.",
          "date": "2024-04-09"
        }
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
    reviews: [
        {
          "name": "Romee S.",
          "rating": 5,
          "text": "Frisse citrustwist, ideaal in een iced latte.",
          "date": "2024-03-12"
        },
        {
          "name": "Tijn B.",
          "rating": 5,
          "text": "Heel zomers, gebruikt in een matcha gin tonic. Geweldig!",
          "date": "2024-04-05"
        },
        {
          "name": "Maartje V.",
          "rating": 4,
          "text": "Aromatisch en uniek. Hou wel van een uitgesproken smaak.",
          "date": "2024-04-25"
        }
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
    reviews: [
        {
          "name": "Nora J.",
          "rating": 5,
          "text": "Koel en verfrissend, perfect na een workout.",
          "date": "2024-04-01"
        },
        {
          "name": "Olivia P.",
          "rating": 5,
          "text": "Alsof je een matcha mojito drinkt. Heerlijk!",
          "date": "2024-04-22"
        },
        {
          "name": "Lucas T.",
          "rating": 4,
          "text": "Munt is subtiel, niet overheersend. Top.",
          "date": "2024-05-10"
        }
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
    reviews: [
        {
          "name": "Sara D.",
          "rating": 5,
          "text": "Smaakt als gezonde chocolademelk, maar dan met focus boost!",
          "date": "2024-03-18"
        },
        {
          "name": "Roel V.",
          "rating": 5,
          "text": "Mijn middag pick-me-up. Diep en romig.",
          "date": "2024-04-14"
        },
        {
          "name": "Veerle K.",
          "rating": 5,
          "text": "Geweldig in een warme latte met kaneel. Verslavend.",
          "date": "2024-05-02"
        }
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
    reviews: [
        {
          "name": "Lynn B.",
          "rating": 5,
          "text": "Vrolijke smaak, heerlijk in smoothies met banaan.",
          "date": "2024-04-08"
        },
        {
          "name": "Fenna H.",
          "rating": 5,
          "text": "Mooie roze matcha latte gemaakt — Instagram-waardig.",
          "date": "2024-04-29"
        },
        {
          "name": "Jelle M.",
          "rating": 4,
          "text": "Fruitig en niet te zoet, leuke afwisseling.",
          "date": "2024-05-15"
        }
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
    reviews: [
        {
          "name": "Amber R.",
          "rating": 5,
          "text": "Echt geen klontjes in koud water, geweldig!",
          "date": "2024-04-20"
        },
        {
          "name": "Bram L.",
          "rating": 5,
          "text": "Perfect voor zomerse iced lattes. Shaken en klaar.",
          "date": "2024-05-05"
        },
        {
          "name": "Cato V.",
          "rating": 5,
          "text": "Game changer voor cold brew matcha lovers.",
          "date": "2024-05-18"
        }
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
    reviews: [
        {
          "name": "Charlotte W.",
          "rating": 5,
          "text": "Ongekend verfijnd. Een echte traktatie.",
          "date": "2024-04-02"
        },
        {
          "name": "Maximilian D.",
          "rating": 5,
          "text": "De diepste umami die ik ooit heb geproefd. De moeite waard.",
          "date": "2024-04-20"
        },
        {
          "name": "Beatrice M.",
          "rating": 5,
          "text": "Het blik alleen al is een sieraad. Inhoud sublim.",
          "date": "2024-05-07"
        },
        {
          "name": "Henry K.",
          "rating": 5,
          "text": "Echt premium niveau, vergelijkbaar met Tokyo theehuizen.",
          "date": "2024-05-19"
        }
      ],
  },
  {
    id: "travel-kit",
    name: "Travel Ritual Kit",
    slug: "travel-ritual-kit",
    price: 64.95,
    description: "Jouw matcha ritueel onderweg. Compacte canvas etui met roestvrijstalen reisklopper, kleine keramische cup en een travel-size matcha pouch (15g). Perfect voor reizen, kantoor of weekendjes weg.",
    shortDescription: "Matcha ritueel onderweg — compleet kit.",
    category: "kits-sets",
    categoryLabel: "Kits & Sets",
    images: [productTravelKit],
    badge: "Nieuw",
    relatedIds: ["starter-kit", "ceremonial-30", "cups-set"],
    reviews: [
        {
          "name": "Pieter L.",
          "rating": 5,
          "text": "Eindelijk goede matcha tijdens reizen!",
          "date": "2024-03-22"
        },
        {
          "name": "Janneke V.",
          "rating": 5,
          "text": "Compact, alles past perfect. Meegenomen op city trip.",
          "date": "2024-04-12"
        },
        {
          "name": "Rik B.",
          "rating": 4,
          "text": "Reisklopper werkt goed, etui is mooi gemaakt.",
          "date": "2024-05-04"
        }
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
    reviews: [
        {
          "name": "Indy K.",
          "rating": 5,
          "text": "Twee unieke kunstwerkjes. Mooi cadeau gegeven.",
          "date": "2024-02-28"
        },
        {
          "name": "Loes M.",
          "rating": 5,
          "text": "Voelt warm in de hand, perfecte grootte voor een matcha shot.",
          "date": "2024-03-20"
        },
        {
          "name": "Stef D.",
          "rating": 5,
          "text": "Glazuur is werkelijk prachtig, geen twee dezelfde.",
          "date": "2024-04-15"
        }
      ],
  },
  {
    id: "recipe-book",
    name: "The Matcha Ritual — Receptenboek",
    slug: "the-matcha-ritual-book",
    price: 29.95,
    description: "Een prachtig vormgegeven hardcover boek met 60+ recepten, rituelen en verhalen rond matcha. Van klassieke bereidingen tot moderne lattes, smoothies en gebak.",
    shortDescription: "60+ recepten, rituelen en verhalen.",
    category: "kits-sets",
    categoryLabel: "Kits & Sets",
    images: [productRecipeBook],
    relatedIds: ["starter-kit", "premium-set", "gift-box"],
    reviews: [
        {
          "name": "Floor B.",
          "rating": 5,
          "text": "Inspirerend en mooi vormgegeven.",
          "date": "2024-04-10"
        },
        {
          "name": "Nadia V.",
          "rating": 5,
          "text": "Veel meer dan alleen recepten — ook prachtige verhalen.",
          "date": "2024-04-26"
        },
        {
          "name": "Pepijn J.",
          "rating": 4,
          "text": "Goed boek, recepten zijn duidelijk en goed te volgen.",
          "date": "2024-05-12"
        }
      ],
  },
];

export const getProductBySlug = (slug: string) => products.find(p => p.slug === slug);
export const getProductById = (id: string) => products.find(p => p.id === id);
export const getRelatedProducts = (product: Product) =>
  (product.relatedIds || []).map(id => getProductById(id)).filter(Boolean) as Product[];
export const getFeaturedProducts = () => products.filter(p => p.bestseller || p.badge);
