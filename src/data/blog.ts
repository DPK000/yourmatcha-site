import blogMatchaLatte from "@/assets/blog-matcha-latte.jpg";
import blogCeremonialVsCulinary from "@/assets/blog-ceremonial-vs-culinary.jpg";
import blogSeasonalRecipes from "@/assets/blog-seasonal-recipes.jpg";

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
}

export const blogCategories = ["Alle", "Recepten", "Wellness", "Matcha 101", "Behind the Brand"];

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "perfecte-matcha-latte",
    title: "Hoe Maak Je de Perfecte Matcha Latte",
    excerpt: "Ontdek het geheim achter een fluweelzachte matcha latte met de perfecte balans tussen zoet en umami.",
    content: `## De Perfecte Matcha Latte

Een matcha latte is meer dan alleen matcha en melk. Het is een ritueel, een moment van rust in je drukke dag. Hier delen we ons recept voor de ultieme matcha latte.

### Wat heb je nodig?
- 2 gram ceremonial of culinary grade matcha
- 30ml warm water (80°C)
- 200ml havermelk (of je favoriete melk)
- Optioneel: een snufje vanille of honing

### Stappen
1. **Zeef je matcha** — Dit voorkomt klontjes en zorgt voor een gladde textuur.
2. **Voeg warm water toe** — Gebruik water van 80°C, niet kokend.
3. **Klop tot schuimig** — Gebruik een chasen of melkopschuimer.
4. **Schuim je melk op** — Verwarm en schuim je melk apart.
5. **Combineer** — Giet de opgeschuimde melk over de matcha.

### Tips
- Gebruik altijd gezeefde matcha voor de beste resultaten
- Havermelk schuimt het beste voor een romige latte
- Voeg zoetmiddel toe aan de melk, niet aan de matcha`,
    category: "Recepten",
    readTime: "4 min",
    date: "2024-03-15",
    image: "/placeholder.svg",
  },
  {
    id: "2",
    slug: "ceremonial-vs-culinary",
    title: "Ceremonial vs Culinary Grade: Wat is het Verschil?",
    excerpt: "Leer het verschil tussen ceremonial en culinary grade matcha en wanneer je welke gebruikt.",
    content: `## Ceremonial vs Culinary Grade Matcha

Niet alle matcha is gelijk gemaakt. Het belangrijkste onderscheid is tussen ceremonial en culinary grade. Maar wat betekent dat precies?

### Ceremonial Grade
- **Smaak**: Zoet, umami, nauwelijks bitter
- **Kleur**: Levendig, helder groen
- **Textuur**: Extreem fijn gemalen
- **Gebruik**: Pure matcha, traditionele theeceremonie
- **Prijs**: Hoger, vanwege de selectie van de jongste bladeren

### Culinary Grade
- **Smaak**: Robuuster, iets meer bitter
- **Kleur**: Donkerder groen
- **Textuur**: Fijn, maar iets grover
- **Gebruik**: Lattes, smoothies, bakken, koken
- **Prijs**: Betaalbaarder

### Wanneer gebruik je wat?
Drink je matcha puur met alleen water? Kies ceremonial grade. Meng je het met melk of gebruik je het in recepten? Dan is culinary grade perfect.`,
    category: "Matcha 101",
    readTime: "3 min",
    date: "2024-03-01",
    image: "/placeholder.svg",
  },
  {
    id: "3",
    slug: "5-matcha-recepten",
    title: "5 Matcha Recepten voor Elk Seizoen",
    excerpt: "Van ijskoude matcha limonade in de zomer tot warme matcha chai in de winter.",
    content: `## 5 Matcha Recepten voor Elk Seizoen

Matcha is ongelooflijk veelzijdig. Hier zijn vijf recepten die je het hele jaar door kunt genieten.

### 1. Lente: Matcha Aardbei Smoothie
Blend 1 tl matcha met bevroren aardbeien, banaan en havermelk.

### 2. Zomer: Iced Matcha Yuzu Limonade
Los matcha op in koud water, voeg yuzu sap toe en serveer over ijs.

### 3. Herfst: Matcha Pompoen Latte
Combineer matcha met pompoenspice en opgeschuimde melk.

### 4. Winter: Matcha Chai
Meng matcha met chai kruiden en warme melk.

### 5. Altijd: Classic Matcha Latte
De tijdloze favoriet die altijd werkt.`,
    category: "Recepten",
    readTime: "5 min",
    date: "2024-02-20",
    image: "/placeholder.svg",
  },
];

export const getBlogBySlug = (slug: string) => blogPosts.find(p => p.slug === slug);
