import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { type Lang, getCurrentLang } from "@/i18n";
import blogMatchaLatte from "@/assets/blog-matcha-latte.webp";
import blogCeremonialVsCulinary from "@/assets/blog-ceremonial-vs-culinary.webp";
import blogSeasonalRecipes from "@/assets/blog-seasonal-recipes.webp";

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

interface BlogTranslation {
  title?: string;
  excerpt?: string;
  content?: string;
  category?: string;
}

interface RawBlogPost extends BlogPost {
  i18n?: Partial<Record<Exclude<Lang, "nl">, BlogTranslation>>;
}

const CATEGORY_TRANSLATIONS: Record<string, Record<Exclude<Lang, "nl">, string>> = {
  Recepten: { de: "Rezepte", en: "Recipes", fr: "Recettes", no: "Oppskrifter" },
  Wellness: { de: "Wellness", en: "Wellness", fr: "Bien-être", no: "Velvære" },
  "Matcha 101": { de: "Matcha 101", en: "Matcha 101", fr: "Matcha 101", no: "Matcha 101" },
  "Behind the Brand": { de: "Hinter den Kulissen", en: "Behind the Brand", fr: "Coulisses", no: "Bak merket" },
  Alle: { de: "Alle", en: "All", fr: "Tous", no: "Alle" },
};

function localizeBlog(p: RawBlogPost, lang: Lang): BlogPost {
  const { i18n: tr, ...base } = p;
  if (lang === "nl" || !tr) return base;
  const t = tr[lang];
  return {
    ...base,
    title: t?.title ?? base.title,
    excerpt: t?.excerpt ?? base.excerpt,
    content: t?.content ?? base.content,
    category: t?.category ?? CATEGORY_TRANSLATIONS[base.category]?.[lang] ?? base.category,
  };
}

export const blogCategories = ["Alle", "Recepten", "Wellness", "Matcha 101", "Behind the Brand"];

const blogPostsRaw: RawBlogPost[] = [
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
    image: blogMatchaLatte,
    i18n: {
      de: {
        title: "Wie macht man die perfekte Matcha Latte",
        excerpt: "Entdecke das Geheimnis hinter einer samtigen Matcha Latte mit der perfekten Balance zwischen Süße und Umami.",
        content: `## Die Perfekte Matcha Latte

Eine Matcha Latte ist mehr als nur Matcha und Milch. Es ist ein Ritual, ein Moment der Ruhe in deinem hektischen Tag. Hier teilen wir unser Rezept für die ultimative Matcha Latte.

### Was du brauchst
- 2 g ceremonial oder culinary grade Matcha
- 30 ml warmes Wasser (80°C)
- 200 ml Hafermilch (oder deine Lieblingsmilch)
- Optional: eine Prise Vanille oder Honig

### Schritte
1. **Sieb deinen Matcha** — Das verhindert Klümpchen und sorgt für eine glatte Textur.
2. **Warmes Wasser hinzufügen** — Verwende Wasser bei 80°C, nicht kochend.
3. **Schaumig schlagen** — Verwende einen Chasen oder Milchaufschäumer.
4. **Milch aufschäumen** — Erhitze und schäume deine Milch separat auf.
5. **Kombinieren** — Gieße die aufgeschäumte Milch über den Matcha.

### Tipps
- Verwende immer gesiebten Matcha für die besten Ergebnisse
- Hafermilch schäumt am besten für eine cremige Latte
- Süßungsmittel zur Milch hinzufügen, nicht zum Matcha`,
      },
      no: {
        title: "Slik lager du den perfekte matcha latten",
        excerpt: "Oppdag hemmeligheten bak en fløyelsmyk matcha latte med den perfekte balansen mellom sødme og umami.",
        content: `## Den perfekte matcha latten

En matcha latte er mer enn bare matcha og melk. Det er et ritual, et øyeblikk av ro i en travel hverdag. Her deler vi oppskriften vår på den ultimate matcha latten.

### Hva trenger du?
- 2 gram ceremonial eller culinary grade matcha
- 30 ml varmt vann (80 °C)
- 200 ml havremelk (eller din favorittmelk)
- Valgfritt: en klype vanilje eller honning

### Steg
1. **Sikt matchaen** — Dette forhindrer klumper og gir en glatt tekstur.
2. **Tilsett varmt vann** — Bruk vann på 80 °C, ikke kokende.
3. **Visp til det skummer** — Bruk en chasen eller melkeskummer.
4. **Skum melken** — Varm og skum melken separat.
5. **Kombiner** — Hell den skummede melken over matchaen.

### Tips
- Bruk alltid siktet matcha for best resultat
- Havremelk skummer best for en kremet latte
- Tilsett søtning i melken, ikke i matchaen`,
      },
    },
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
    image: blogCeremonialVsCulinary,
    i18n: {
      de: {
        title: "Ceremonial vs Culinary Grade: Was ist der Unterschied?",
        excerpt: "Lerne den Unterschied zwischen Ceremonial und Culinary Grade Matcha — und wann du welchen verwendest.",
        content: `## Ceremonial vs Culinary Grade Matcha

Nicht jeder Matcha ist gleich. Der wichtigste Unterschied ist der zwischen Ceremonial und Culinary Grade. Aber was bedeutet das genau?

### Ceremonial Grade
- **Geschmack**: Süß, umami, kaum bitter
- **Farbe**: Lebhaft, leuchtend grün
- **Textur**: Extrem fein gemahlen
- **Verwendung**: Purer Matcha, traditionelle Teezeremonie
- **Preis**: Höher, wegen der Auswahl der jüngsten Blätter

### Culinary Grade
- **Geschmack**: Robuster, etwas bitterer
- **Farbe**: Dunkleres Grün
- **Textur**: Fein, aber etwas grober
- **Verwendung**: Lattes, Smoothies, Backen, Kochen
- **Preis**: Erschwinglicher

### Wann verwendest du welchen?
Trinkst du Matcha pur mit Wasser? Wähle Ceremonial Grade. Mischst du ihn mit Milch oder verwendest du ihn in Rezepten? Dann ist Culinary Grade perfekt.`,
      },
      no: {
        title: "Ceremonial vs Culinary Grade: Hva er forskjellen?",
        excerpt: "Lær forskjellen mellom ceremonial og culinary grade matcha — og når du bruker hvilken.",
        content: `## Ceremonial vs Culinary Grade matcha

Ikke all matcha er skapt lik. Det viktigste skillet går mellom ceremonial og culinary grade. Men hva betyr det egentlig?

### Ceremonial Grade
- **Smak**: Søt, umami, knapt bitter
- **Farge**: Levende, klar grønn
- **Tekstur**: Ekstremt finmalt
- **Bruk**: Ren matcha, tradisjonell teseremoni
- **Pris**: Høyere, på grunn av utvalget av de yngste bladene

### Culinary Grade
- **Smak**: Mer robust, litt mer bitter
- **Farge**: Mørkere grønn
- **Tekstur**: Fin, men litt grovere
- **Bruk**: Latter, smoothier, baking, matlaging
- **Pris**: Rimeligere

### Når bruker du hva?
Drikker du matcha ren med bare vann? Velg ceremonial grade. Blander du den med melk eller bruker den i oppskrifter? Da er culinary grade perfekt.`,
      },
    },
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
    image: blogSeasonalRecipes,
    i18n: {
      de: {
        title: "5 Matcha-Rezepte für jede Jahreszeit",
        excerpt: "Von eiskalter Matcha-Limonade im Sommer bis zur warmen Matcha-Chai im Winter.",
        content: `## 5 Matcha-Rezepte für jede Jahreszeit

Matcha ist unglaublich vielseitig. Hier sind fünf Rezepte, die du das ganze Jahr über genießen kannst.

### 1. Frühling: Matcha-Erdbeer-Smoothie
1 TL Matcha mit gefrorenen Erdbeeren, Banane und Hafermilch mixen.

### 2. Sommer: Iced Matcha Yuzu Limonade
Matcha in kaltem Wasser auflösen, Yuzu-Saft hinzufügen und über Eis servieren.

### 3. Herbst: Matcha Kürbis Latte
Matcha mit Kürbisgewürz und aufgeschäumter Milch kombinieren.

### 4. Winter: Matcha Chai
Matcha mit Chai-Gewürzen und warmer Milch mischen.

### 5. Immer: Classic Matcha Latte
Der zeitlose Favorit, der immer funktioniert.`,
      },
      no: {
        title: "5 matchaoppskrifter for enhver årstid",
        excerpt: "Fra iskald matchalimonade om sommeren til varm matcha chai om vinteren.",
        content: `## 5 matchaoppskrifter for enhver årstid

Matcha er utrolig allsidig. Her er fem oppskrifter du kan nyte hele året.

### 1. Vår: Matcha-jordbærsmoothie
Blend 1 ts matcha med frosne jordbær, banan og havremelk.

### 2. Sommer: Iced matcha yuzu-limonade
Løs opp matcha i kaldt vann, tilsett yuzujuice og server over is.

### 3. Høst: Matcha gresskar-latte
Kombiner matcha med gresskarkrydder og skummet melk.

### 4. Vinter: Matcha chai
Bland matcha med chaikrydder og varm melk.

### 5. Alltid: Klassisk matcha latte
Den tidløse favoritten som alltid fungerer.`,
      },
    },
  },
  {
    id: "4",
    slug: "7-matcha-fouten-beginners",
    title: "7 Matcha Fouten die Beginners Maken (en Hoe Je Ze Vermijdt)",
    excerpt: "Bitter, klonterig of vlak van smaak? In 9 van de 10 gevallen is het één van deze fouten — en allemaal zijn ze in 30 seconden te fixen.",
    content: `## De Top 7 Beginner-fouten

Iedereen die met matcha begint maakt minstens drie van deze fouten. Goed nieuws: ze zijn allemaal makkelijk te corrigeren.

### 1. Kokend water gebruiken
Dit is veruit de meest gemaakte fout. Matcha is geen zwarte thee — kokend water (100 °C) verbrandt het poeder en geeft een bittere, scherpe smaak. Gebruik water van **75–80 °C**. Geen thermometer? Kook water en wacht 60 seconden.

### 2. Niet zeven
Matcha is hygroscopisch — het trekt vocht aan en klontjes vormen meteen. Een fijne zeef (10 seconden werk) lost 80% van alle problemen op.

### 3. Te veel matcha gebruiken
Meer is niet beter. **2 gram (1 theelepel)** per kop is standaard. Boven 3 gram krijg je een onaangenaam intens, bijna kruidige smaak — vaak verward met "slechte matcha".

### 4. Suiker direct in de matcha doen
Suiker lost niet op in pure matcha-water. Het wordt korrelig. **Zoet altijd de melk apart** (honing, vanille of agave) en combineer pas daarna.

### 5. Oude matcha drinken
Geopende matcha is op zijn best in **de eerste 4–6 weken**. Daarna verliest de smaak fineur en de kleur dofts uit. Koop kleinere zakjes als je niet dagelijks drinkt.

### 6. Culinary gebruiken om puur te drinken
Culinary grade is bedoeld voor lattes en bakken — robuust met lichte bitterheid. Drink je puur met water? Kies dan ceremonial grade.

### 7. Cirkels kloppen
Een chasen werkt alleen met **horizontale M- of W-bewegingen**, niet met cirkels. Cirkels mengen niet — ze duwen matcha alleen rond.

## De Fix-Checklist
- Water: 75–80 °C, niet kokend
- Zeven: altijd
- Dosering: 2 g per kop
- Suiker: door de melk, niet door de matcha
- Versheid: ≤6 weken na opening
- Grade: ceremonial voor puur, culinary voor lattes
- Techniek: M-vorm, met je pols

Volg deze zeven regels en je matcha smaakt direct een tier hoger.`,
    category: "Matcha 101",
    readTime: "4 min",
    date: "2026-04-22",
    image: blogMatchaLatte,
    i18n: {
      no: {
        title: "7 matchafeil nybegynnere gjør (og hvordan du unngår dem)",
        excerpt: "Bitter, klumpete eller flat på smak? I 9 av 10 tilfeller skyldes det én av disse feilene — og alle kan fikses på 30 sekunder.",
        content: `## De 7 vanligste nybegynnerfeilene

Alle som begynner med matcha gjør minst tre av disse feilene. Gode nyheter: alle er enkle å rette opp.

### 1. Å bruke kokende vann
Dette er den desidert vanligste feilen. Matcha er ikke svart te — kokende vann (100 °C) brenner pulveret og gir en bitter, skarp smak. Bruk vann på **75–80 °C**. Ikke noe termometer? Kok opp vann og vent 60 sekunder.

### 2. Å ikke sikte
Matcha er hygroskopisk — den trekker til seg fuktighet, og klumper dannes med en gang. En finmasket sikt (10 sekunders arbeid) løser 80 % av alle problemer.

### 3. Å bruke for mye matcha
Mer er ikke bedre. **2 gram (1 teskje)** per kopp er standard. Over 3 gram får du en ubehagelig intens, nesten krydret smak — ofte forvekslet med «dårlig matcha».

### 4. Å ha sukker rett i matchaen
Sukker løser seg ikke opp i ren matcha og vann. Det blir kornete. **Søt alltid melken separat** (honning, vanilje eller agave) og kombiner først etterpå.

### 5. Å drikke gammel matcha
Åpnet matcha er på sitt beste **de første 4–6 ukene**. Etter det mister smaken finessen, og fargen blekner. Kjøp mindre poser hvis du ikke drikker daglig.

### 6. Å bruke culinary til å drikke ren
Culinary grade er laget for latter og baking — robust med en lett bitterhet. Drikker du matchaen ren med vann? Velg ceremonial grade.

### 7. Å vispe i sirkler
En chasen fungerer bare med **horisontale M- eller W-bevegelser**, ikke sirkler. Sirkler blander ikke — de bare skyver matchaen rundt.

## Fiks-sjekklisten
- Vann: 75–80 °C, ikke kokende
- Sikting: alltid
- Dosering: 2 g per kopp
- Sukker: i melken, ikke i matchaen
- Ferskhet: ≤6 uker etter åpning
- Grade: ceremonial for ren drikking, culinary for latter
- Teknikk: M-form, fra håndleddet

Følg disse syv reglene, og matchaen din smaker umiddelbart et hakk bedre.`,
      },
    },
  },
  {
    id: "5",
    slug: "matcha-morning-routine",
    title: "Onze Morning Routine: Een Dag in Matcha bij YourMatcha",
    excerpt: "Bij YourMatcha drinken we matcha de hele dag door. Hier is hoe we onze koppen verdelen — en waarom timing alles is.",
    content: `## Een Werkdag in Matcha

Bij YourMatcha hebben we matcha niet alleen als bedrijf, maar ook als dagelijkse ritueel. Zo ziet een typische werkdag eruit.

### 7:00 — Ochtend usucha
We beginnen met **2 gram ceremonial matcha, puur met 60 ml water op 75 °C**. Geen melk, geen suiker. Dit is het moment om de smaak echt te proeven en de dag rustig in te zetten.

Waarom puur? Op een nuchtere maag voel je het effect van L-theanine en cafeïne het scherpst. Drie minuten focus zonder afleiding, en dan starten.

### 9:30 — Hot matcha latte
Tweede kop tijdens de eerste werkblok. Een **culinary matcha latte met havermelk barista** — romig, langer-houdbaar dan puur, en perfect voor een 90-minuten focusblok.

### 12:30 — Lunchpauze, geen matcha
Na de lunch geen matcha tot 14:00. Eerst eten, dan rust.

### 14:00 — Iced matcha
De middagpiek. Onze **iced matcha blend** met koud water en havermelk. Cafeïne werkt nog tot 18:00–19:00 — daarom is dit onze laatste kop.

### 16:00 — Hojicha (geen matcha)
Hier schakelen we over naar **hojicha** — geroosterde groene thee met slechts 7 mg cafeïne. Hetzelfde ritueel, geen slaapverstoring.

### 19:00 — Genmaicha bij eten
Bij het diner serveren we vaak genmaicha — Japanse rijstthee, nootachtig, kalmerend.

## De Regel: Vier Koppen Maximum

We houden ons aan **maximaal vier matcha-koppen per dag** (3x ceremonial/culinary + 1x hojicha). Genoeg voor stabiele focus zonder cafeïne-tolerantie op te bouwen.

## Wat is Jouw Routine?

Iedereen heeft een andere bioritme. Sommige collega's drinken één perfecte kop matcha per dag. Anderen alleen tijdens deep work. De sleutel is consistentie — niet hoeveelheid.

Probeer een week lang dezelfde matcha-routine en zie wat het met je energie doet.`,
    category: "Behind the Brand",
    readTime: "4 min",
    date: "2026-04-15",
    image: blogSeasonalRecipes,
    i18n: {
      no: {
        title: "Morgenrutinen vår: En dag i matcha hos YourMatcha",
        excerpt: "Hos YourMatcha drikker vi matcha hele dagen. Slik fordeler vi koppene våre — og derfor er timing alt.",
        content: `## En arbeidsdag i matcha

Hos YourMatcha er matcha ikke bare bedriften vår, men også et daglig ritual. Slik ser en typisk arbeidsdag ut.

### 7:00 — Morgenens usucha
Vi starter med **2 gram ceremonial matcha, ren med 60 ml vann på 75 °C**. Ingen melk, ikke noe sukker. Dette er øyeblikket for å virkelig kjenne smaken og starte dagen rolig.

Hvorfor ren? På tom mage merker du effekten av L-theanin og koffein aller tydeligst. Tre minutter fokus uten distraksjoner — og så i gang.

### 9:30 — Varm matcha latte
Kopp nummer to i løpet av den første arbeidsøkten. En **culinary matcha latte med havremelk barista** — kremet, varer lenger enn ren matcha, og perfekt for en 90-minutters fokusøkt.

### 12:30 — Lunsjpause, ingen matcha
Etter lunsj ingen matcha før 14:00. Først mat, så ro.

### 14:00 — Iced matcha
Ettermiddagstoppen. Vår **iced matcha blend** med kaldt vann og havremelk. Koffeinen virker helt til 18:00–19:00 — derfor er dette dagens siste kopp.

### 16:00 — Hojicha (ikke matcha)
Her bytter vi til **hojicha** — ristet grønn te med bare 7 mg koffein. Samme ritual, ingen forstyrret nattesøvn.

### 19:00 — Genmaicha til maten
Til middag serverer vi ofte genmaicha — japansk grønn te med ristet ris, nøtteaktig og beroligende.

## Regelen: Maks fire kopper

Vi holder oss til **maksimalt fire kopper matcha om dagen** (3x ceremonial/culinary + 1x hojicha). Nok til stabilt fokus uten å bygge opp koffeintoleranse.

## Hva er din rutine?

Alle har sin egen biorytme. Noen kolleger drikker én perfekt kopp matcha om dagen. Andre bare under deep work. Nøkkelen er konsistens — ikke mengde.

Prøv den samme matcharutinen i en uke, og se hva den gjør med energien din.`,
      },
    },
  },
  {
    id: "6",
    slug: "behind-brand-uji-bezoek",
    title: "Behind the Brand: Ons Bezoek aan een Uji-Theeboerderij",
    excerpt: "Vorig voorjaar bezochten we de familie Tanaka in Uji. Dit is wat we leerden over het verschil tussen marketing-matcha en echt ambacht.",
    content: `## Een Reis naar de Bron

In april 2026 vlogen we voor het derde jaar op rij naar Uji — een kleine regio ten zuiden van Kyoto die al 800 jaar premium matcha produceert. Ons doel: de eerste oogst (ichibancha) bijwonen op de familieboerderij waar onze ceremonial matcha vandaan komt.

### Het Begin: 04:30 in de Mist

De eerste oogst gebeurt in de vroege ochtend, wanneer de mist nog over de theevelden hangt. De Tanaka-familie werkt al sinds 1872 op dezelfde velden. Geen toeristen, geen Instagram-shoots — gewoon werken.

### Twintig Dagen Beschaduwen

Wat ons elke keer raakt: drie weken voor de oogst worden alle planten met doek bedekt. Dit dwingt de plant om meer chlorofyl en L-theanine te produceren — verantwoordelijk voor het diepe groen en de umami-smaak. Het is arbeidsintensief en risicovol (schimmel, regen) — en het is wat echte matcha onderscheidt.

### Handpluk: Alleen de Jongste Blaadjes

Geen machines. Alleen vrouwen die al decennia plukken, op het oog herkennend welke blaadjes klaar zijn. Voor 1 kilo ceremonial matcha pluk je gemiddeld 30 kilo verse blaadjes.

### De Stenen Molens

Het meest indrukwekkende moment: de **ishi-usu** — granieten stenen molens die al 60 jaar in de familie zijn. Eén molen produceert **30 gram matcha per uur**. Dat is waarom premium matcha zo duur is — je betaalt voor tijd en techniek die letterlijk niet sneller kan.

### Wat We Leerden

1. **Marketing-matcha en echt ambacht zijn niet hetzelfde**. Veel "Japanse" matcha op Europese markten komt van industriële ball-mills, niet stenen.
2. **Familieboerderijen zijn een aflopende zaak**. Jonge Japanners willen vaak iets anders, dus directe relaties met deze boerderijen worden steeds zeldzamer.
3. **Smaak vertelt het verhaal**. Onze ceremonial matcha smaakt zoals het smaakt door deze 800 jaar accumulatie — niet door marketing.

## Waarom We Geen Tussenhandelaren Gebruiken

We werken sinds 2022 direct met deze familie. Geen importeur tussen ons en de boerderij. Dat betekent een eerlijke prijs voor de boer én transparantie voor jou.

In onze [herkomst-pagina](/herkomst) zie je de complete keten — van veld tot zakje.

## Wat Komt Hierna?

Volgend voorjaar gaan we terug — deze keer voor een uitgebreide proefsessie van competitieve grade matcha (boven ceremonial). Houd de blog in de gaten.`,
    category: "Behind the Brand",
    readTime: "5 min",
    date: "2026-04-08",
    image: blogCeremonialVsCulinary,
    i18n: {
      no: {
        title: "Behind the Brand: Vårt besøk på en tegård i Uji",
        excerpt: "I fjor vår besøkte vi familien Tanaka i Uji. Dette lærte vi om forskjellen mellom markedsførings-matcha og ekte håndverk.",
        content: `## En reise til kilden

I april 2026 fløy vi for tredje år på rad til Uji — en liten region sør for Kyoto som har produsert premium matcha i 800 år. Målet vårt: å være med på den første innhøstingen (ichibancha) på familiegården der vår ceremonial matcha kommer fra.

### Starten: 04:30 i tåken

Den første innhøstingen skjer tidlig om morgenen, mens tåken fortsatt ligger over temarkene. Tanaka-familien har dyrket de samme markene siden 1872. Ingen turister, ingen Instagram-fotografering — bare arbeid.

### Tjue dager i skyggen

Det som griper oss hver gang: tre uker før innhøstingen dekkes alle plantene til med duk. Det tvinger planten til å produsere mer klorofyll og L-theanin — det som gir den dype grønnfargen og umamismaken. Det er arbeidskrevende og risikabelt (mugg, regn) — og det er nettopp dette som skiller ekte matcha fra resten.

### Håndplukking: Bare de yngste bladene

Ingen maskiner. Bare kvinner som har plukket i flere tiår, og som ser på øyemål hvilke blader som er klare. For 1 kilo ceremonial matcha plukkes det i snitt 30 kilo ferske blader.

### Steinmøllene

Det mest imponerende øyeblikket: **ishi-usu** — steinmøller i granitt som har vært i familien i 60 år. Én mølle produserer **30 gram matcha i timen**. Det er derfor premium matcha er så dyr — du betaler for tid og teknikk som bokstavelig talt ikke kan gå fortere.

### Hva vi lærte

1. **Markedsførings-matcha og ekte håndverk er ikke det samme.** Mye «japansk» matcha på det europeiske markedet kommer fra industrielle kulemøller, ikke stein.
2. **Familiegårdene er i ferd med å forsvinne.** Unge japanere vil ofte noe annet, så direkte relasjoner med disse gårdene blir stadig sjeldnere.
3. **Smaken forteller historien.** Vår ceremonial matcha smaker som den gjør takket være 800 år med akkumulert kunnskap — ikke takket være markedsføring.

## Derfor bruker vi ingen mellomledd

Vi har jobbet direkte med denne familien siden 2022. Ingen importør mellom oss og gården. Det betyr en rettferdig pris til bonden — og full åpenhet for deg.

På [opprinnelsessiden vår](/herkomst) ser du hele kjeden — fra mark til pose.

## Hva skjer videre?

Neste vår drar vi tilbake — denne gangen for en grundig smakssesjon med competitive grade matcha (over ceremonial). Følg med på bloggen.`,
      },
    },
  },
  {
    id: "7",
    slug: "lente-matcha-recepten-2026",
    title: "Lente 2026: 3 Nieuwe Matcha Recepten voor het Seizoen",
    excerpt: "Sakura, aardbeien en eerste-oogst matcha — drie verse recepten die de lente in een glas vangen.",
    content: `## Drie Lente-recepten met Matcha

De lente is hét matcha-seizoen — de ichibancha (eerste oogst) is op zijn frist en de smaken zijn op hun delicaatst. Hier zijn drie recepten die we deze maand het meest maken.

### 1. Strawberry Matcha Latte (iced)

Een TikTok-favoriet die we hebben verfijnd: tweelaagse latte met aardbeienpuree en koude matcha.

**Ingrediënten:**
- 100 g verse aardbeien
- 1 tl ahornsiroop (optioneel)
- 200 ml koude havermelk
- 2 g ceremonial matcha
- 30 ml koud water
- IJs

**Bereiding:**
1. Pureer de aardbeien met ahornsiroop, schenk onderin een glas.
2. Voeg ijsblokjes toe.
3. Schenk koude havermelk over de aardbeien.
4. Zeef matcha in een shaker, voeg 30 ml koud water + 2 ijsblokjes toe, schud 15 sec.
5. Schenk matcha langzaam over de melk voor een drielaagse latte.

### 2. Sakura Matcha Mochi

Voor wie wil bakken: zachte mochi-bolletjes met matcha-vulling en kersenbloesem-tinten.

**Ingrediënten:**
- 200 g mochiko (rijstmeel)
- 50 g suiker
- 200 ml water
- 2 g matcha (in vulling)
- 100 g witte boon paste (shiro-an)

**Bereiding:**
1. Meng mochiko, suiker en water. Stoom 20 min.
2. Maak vulling: kneed witte boon paste met matcha.
3. Vorm bolletjes, vul met matcha-paste.
4. Bestrooi licht met aardappelzetmeel.

Een complete versie staat in onze [recepten-sectie](/recepten/matcha-mochi).

### 3. Matcha Asparagus Risotto

Verrassend hartig — matcha door risotto geeft een prachtige groene kleur en subtiele umami die past bij witte asperges.

**Ingrediënten:**
- 250 g arborio rijst
- 4 witte asperges (in stukken)
- 1 sjalot
- 750 ml warme groentebouillon
- 1 g culinary matcha (op het einde)
- 30 g Parmezaan
- Olijfolie + boter

**Bereiding:**
1. Fruit sjalot, voeg rijst toe.
2. Voeg bouillon scheutje voor scheutje toe, blijf roeren.
3. Voeg na 15 min asperges toe.
4. Op het laatste moment: matcha door de risotto, samen met Parmezaan.

Het matcha-poeder mag niet meekoken — hitte verbrandt het. Toevoegen aan het einde, vlak voor serveren.

## Welke Matcha Bij Deze Recepten?

- **Strawberry latte**: culinary of premium ceremonial — beide werken.
- **Mochi**: ceremonial — de pure smaak komt door.
- **Risotto**: culinary — robuust genoeg voor cooking.

Lees onze [koopgids](/kennis/beste-matcha-kopen-2026) voor de juiste keuze.`,
    category: "Recepten",
    readTime: "5 min",
    date: "2026-03-28",
    image: blogSeasonalRecipes,
    i18n: {
      no: {
        title: "Våren 2026: 3 nye matchaoppskrifter for sesongen",
        excerpt: "Sakura, jordbær og førstehøstet matcha — tre ferske oppskrifter som fanger våren i et glass.",
        content: `## Tre våroppskrifter med matcha

Våren er matchasesongen fremfor noen — ichibanchaen (den første innhøstingen) er på sitt ferskeste, og smakene er på sitt mest delikate. Her er de tre oppskriftene vi lager mest denne måneden.

### 1. Strawberry Matcha Latte (iced)

En TikTok-favoritt vi har raffinert: tolags latte med jordbærpuré og kald matcha.

**Ingredienser:**
- 100 g ferske jordbær
- 1 ts lønnesirup (valgfritt)
- 200 ml kald havremelk
- 2 g ceremonial matcha
- 30 ml kaldt vann
- Is

**Fremgangsmåte:**
1. Kjør jordbærene til puré med lønnesirupen, og hell i bunnen av et glass.
2. Tilsett isbiter.
3. Hell kald havremelk over jordbærene.
4. Sikt matcha i en shaker, tilsett 30 ml kaldt vann + 2 isbiter, og rist i 15 sek.
5. Hell matchaen sakte over melken for en trelags latte.

### 2. Sakura Matcha Mochi

For deg som vil bake: myke mochiboller med matchafyll og et hint av kirsebærblomst.

**Ingredienser:**
- 200 g mochiko (rismel)
- 50 g sukker
- 200 ml vann
- 2 g matcha (i fyllet)
- 100 g hvit bønnepasta (shiro-an)

**Fremgangsmåte:**
1. Bland mochiko, sukker og vann. Damp i 20 min.
2. Lag fyllet: kna hvit bønnepasta med matcha.
3. Form boller, og fyll dem med matchapasta.
4. Dryss lett med potetstivelse.

En komplett versjon finner du i [oppskriftsseksjonen vår](/recepten/matcha-mochi).

### 3. Matcha-asparges-risotto

Overraskende i det salte kjøkkenet — matcha i risotto gir en nydelig grønn farge og en subtil umami som passer perfekt til hvite asparges.

**Ingredienser:**
- 250 g arborioris
- 4 hvite asparges (i biter)
- 1 sjalottløk
- 750 ml varm grønnsaksbuljong
- 1 g culinary matcha (helt til slutt)
- 30 g parmesan
- Olivenolje + smør

**Fremgangsmåte:**
1. Surr sjalottløken, og tilsett risen.
2. Tilsett buljongen litt etter litt, og rør hele tiden.
3. Tilsett aspargesen etter 15 min.
4. Helt til slutt: rør matchaen inn i risottoen, sammen med parmesanen.

Matchapulveret må ikke kokes med — varmen brenner det. Tilsett det på slutten, rett før servering.

## Hvilken matcha til disse oppskriftene?

- **Strawberry latte**: culinary eller premium ceremonial — begge fungerer.
- **Mochi**: ceremonial — den rene smaken kommer til sin rett.
- **Risotto**: culinary — robust nok til matlaging.

Les [kjøpsguiden vår](/kennis/beste-matcha-kopen-2026) for å velge riktig.`,
      },
    },
  },
  {
    id: "8",
    slug: "ltheanine-wetenschap-matcha",
    title: "De Wetenschap Achter L-Theanine: Waarom Matcha Anders Werkt",
    excerpt: "L-theanine is het 'magic ingredient' in matcha — een aminozuur dat focus en kalmte tegelijk geeft. Dit is wat 30+ studies erover zeggen.",
    content: `## Het Stofje dat Matcha Bijzonder Maakt

Als iemand zegt "matcha geeft kalme focus", praten ze eigenlijk over **L-theanine** — een aminozuur dat bijna uitsluitend in groene thee voorkomt. Geen kruidensupplement, geen marketingclaim — er staan honderden peer-reviewed studies achter.

### Wat is L-Theanine?

L-theanine (γ-glutamylethylamide) werd in 1949 geïsoleerd uit groene thee door Japanse onderzoeker Yajiro Sakato. Het is een aminozuur dat de bloed-hersenbarrière passeert — vrij zeldzaam voor voedingsstoffen.

In matcha zit per kop ongeveer **25–30 mg L-theanine**, samen met 70 mg cafeïne — een cruciale combinatie.

### Wat Doet Het in Je Brein?

L-theanine heeft drie hoofdeffecten in het brein:

**1. Verhoogt alfa-hersengolven**
Alfa-golven (8–12 Hz) treden op tijdens "relaxed alertness" — denken zonder stress. EEG-studies (Nobre et al., 2008) tonen verhoging binnen 30–40 min na inname.

**2. Verhoogt GABA, dopamine en serotonine**
L-theanine moduleert deze neurotransmitters wat een licht kalmerend effect geeft zonder slaperigheid.

**3. Vertraagt cafeïne-opname**
Studies tonen dat L-theanine de scherpe piek van cafeïne afzwakt — je krijgt langere, stabielere alertheid in plaats van een spike.

### De 2:1 Ratio

Een meta-analyse uit 2015 (Camfield et al.) concludeerde dat de **optimale ratio voor cognitieve prestaties cafeïne:L-theanine = 2:1** is. Matcha zit daar van nature op (70:30).

Synthetische pre-workouts proberen dit te repliceren, maar verliezen vaak de subtiliteit.

### Wat Voel Je Concreet?

Mensen beschrijven het verschil met koffie zo:

- **Koffie**: "geweldig idee, maar mijn handen trillen lichtjes"
- **Matcha**: "ik denk helderder zonder dat ik het merk"

Niet iedereen voelt direct verschil — gevoeligheid voor L-theanine varieert. Bij dagelijks gebruik wordt het effect duidelijker.

### Onderzoek in 3 Hoofdpunten

1. **Owen et al. (2008, Nutritional Neuroscience):** 50 mg cafeïne + 100 mg L-theanine verbeterde aandachtsverlegging en alertheid significant t.o.v. placebo.
2. **Foxe et al. (2012):** combinatie verbeterde prestaties op multitasking-taken vergeleken met cafeïne alleen.
3. **Hidese et al. (2019):** L-theanine alleen verbeterde werkgeheugen en executieve functies.

### Hoe Krijg Je het Maximum?

Drie tips uit onderzoek:

1. **Drink puur, niet met veel suiker.** Suiker veroorzaakt insulinepieken die L-theanine effect compromiseren.
2. **Niet direct na een vette maaltijd.** L-theanine wordt minder snel opgenomen.
3. **Combineer met fysieke activiteit.** Sport + matcha geeft de duidelijkste merkbare focus-boost.

### L-Theanine Supplementen vs Matcha

Er bestaan **pure L-theanine supplementen** (200 mg per capsule, ~€15 per maand). Werkt prima, maar:

- Je mist EGCG, chlorofyl en andere matcha-stoffen
- Geen ritueel
- Niet lekker

Voor de meeste mensen is matcha drinken minstens zo effectief — en aangenamer.

### Wat met Cafeïnegevoelige Mensen?

L-theanine is ook beschikbaar in **decaf groene thee** (5–8 mg per kop) en **hojicha** (10–15 mg). Geen scherpe focus, maar wel ontspanning. Lees [hojicha uitleg](/kennis/hojicha-uitleg) en [matcha en slaap](/kennis/matcha-en-slaap) voor het volledige plaatje.

## Conclusie

L-theanine is geen marketing-trucje. Het is een goed onderzochte stof die matcha onderscheidt van koffie en andere cafeïnedragers. Drink je een kop matcha, dan krijg je een 800 jaar oude formule die toevallig perfect aansluit op moderne neuroscience.

Voor de complete vergelijking lees [matcha vs koffie](/kennis/matcha-vs-koffie) en [matcha en focus](/kennis/matcha-en-focus).`,
    category: "Wellness",
    readTime: "6 min",
    date: "2026-03-20",
    image: blogCeremonialVsCulinary,
    i18n: {
      no: {
        title: "Vitenskapen bak L-theanin: Derfor virker matcha annerledes",
        excerpt: "L-theanin er «den magiske ingrediensen» i matcha — en aminosyre som gir fokus og ro på samme tid. Dette sier over 30 studier om den.",
        content: `## Stoffet som gjør matcha spesiell

Når noen sier at «matcha gir rolig fokus», snakker de egentlig om **L-theanin** — en aminosyre som nesten utelukkende finnes i grønn te. Ikke et urtetilskudd, ikke en markedsføringspåstand — det står hundrevis av fagfellevurderte studier bak.

### Hva er L-theanin?

L-theanin (γ-glutamyletylamid) ble isolert fra grønn te i 1949 av den japanske forskeren Yajiro Sakato. Det er en aminosyre som passerer blod-hjerne-barrieren — ganske sjeldent for næringsstoffer.

En kopp matcha inneholder omtrent **25–30 mg L-theanin**, sammen med 70 mg koffein — en avgjørende kombinasjon.

### Hva gjør det i hjernen din?

L-theanin har tre hovedeffekter i hjernen:

**1. Øker alfa-hjernebølger**
Alfabølger (8–12 Hz) oppstår under «relaxed alertness» — tenkning uten stress. EEG-studier (Nobre et al., 2008) viser en økning innen 30–40 min etter inntak.

**2. Øker GABA, dopamin og serotonin**
L-theanin modulerer disse nevrotransmitterne, noe som gir en lett beroligende effekt uten søvnighet.

**3. Bremser koffeinopptaket**
Studier viser at L-theanin demper den skarpe koffeintoppen — du får lengre og mer stabil årvåkenhet i stedet for en spike.

### 2:1-ratioen

En metaanalyse fra 2015 (Camfield et al.) konkluderte med at den **optimale ratioen for kognitiv ytelse er koffein:L-theanin = 2:1**. Der ligger matcha helt naturlig (70:30).

Syntetiske pre-workouts prøver å kopiere dette, men mister ofte subtiliteten.

### Hva merker du konkret?

Folk beskriver forskjellen fra kaffe slik:

- **Kaffe**: «god idé, men hendene mine skjelver litt»
- **Matcha**: «jeg tenker klarere uten at jeg merker det»

Ikke alle kjenner forskjell med en gang — følsomheten for L-theanin varierer. Ved daglig bruk blir effekten tydeligere.

### Forskningen i 3 hovedpunkter

1. **Owen et al. (2008, Nutritional Neuroscience):** 50 mg koffein + 100 mg L-theanin forbedret oppmerksomhetsskifte og årvåkenhet signifikant sammenlignet med placebo.
2. **Foxe et al. (2012):** kombinasjonen forbedret prestasjonen på multitasking-oppgaver sammenlignet med koffein alene.
3. **Hidese et al. (2019):** L-theanin alene forbedret arbeidsminne og eksekutive funksjoner.

### Hvordan får du mest ut av det?

Tre tips fra forskningen:

1. **Drikk den ren, ikke med mye sukker.** Sukker gir insulintopper som svekker effekten av L-theanin.
2. **Ikke rett etter et fettrikt måltid.** Da tas L-theanin langsommere opp.
3. **Kombiner med fysisk aktivitet.** Trening + matcha gir det tydeligst merkbare fokusløftet.

### L-theanin-tilskudd vs matcha

Det finnes **rene L-theanin-tilskudd** (200 mg per kapsel, ~170 kr i måneden). De fungerer fint, men:

- Du går glipp av EGCG, klorofyll og andre matchastoffer
- Ikke noe ritual
- Ikke godt

For de fleste er det minst like effektivt å drikke matcha — og langt hyggeligere.

### Hva med koffeinfølsomme?

L-theanin finnes også i **koffeinfri grønn te** (5–8 mg per kopp) og **hojicha** (10–15 mg). Ikke det skarpe fokuset, men ro og avspenning. Les [hojicha forklart](/kennis/hojicha-uitleg) og [matcha og søvn](/kennis/matcha-en-slaap) for hele bildet.

## Konklusjon

L-theanin er ikke et markedsføringstriks. Det er et grundig undersøkt stoff som skiller matcha fra kaffe og andre koffeinkilder. Når du drikker en kopp matcha, får du en 800 år gammel formel som tilfeldigvis passer perfekt med moderne nevrovitenskap.

For den fullstendige sammenligningen, les [matcha vs kaffe](/kennis/matcha-vs-koffie) og [matcha og fokus](/kennis/matcha-en-focus).`,
      },
    },
  },
];

// ─── Public API ──────────────────────────────────────────────

export const blogPosts: BlogPost[] = blogPostsRaw.map(p => localizeBlog(p, getCurrentLang()));

export const getBlogBySlug = (slug: string): BlogPost | undefined => {
  const p = blogPostsRaw.find(x => x.slug === slug);
  return p ? localizeBlog(p, getCurrentLang()) : undefined;
};

export function useBlogPosts(): BlogPost[] {
  const { i18n } = useTranslation();
  return useMemo(() => blogPostsRaw.map(p => localizeBlog(p, getCurrentLang())), [i18n.language]);
}

export function useBlogPost(slug: string | undefined): BlogPost | undefined {
  const { i18n } = useTranslation();
  return useMemo(() => {
    if (!slug) return undefined;
    const p = blogPostsRaw.find(x => x.slug === slug);
    return p ? localizeBlog(p, getCurrentLang()) : undefined;
  }, [slug, i18n.language]);
}

export function useBlogCategories(): string[] {
  const { i18n } = useTranslation();
  const lang = getCurrentLang();
  return useMemo(() => {
    if (lang === "nl") return blogCategories;
    return blogCategories.map(c => CATEGORY_TRANSLATIONS[c]?.[lang] ?? c);
  }, [i18n.language]);
}
