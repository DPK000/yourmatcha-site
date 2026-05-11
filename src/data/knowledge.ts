export interface KnowledgeArticle {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  category: string;
  readTime: string;
  updated: string;
  /** Markdown-like content with ## H2 and ### H3 headings, paragraphs, and "- " bullets. */
  content: string;
  faqs?: { q: string; a: string }[];
}

export const knowledgeArticles: KnowledgeArticle[] = [
  {
    slug: "wat-is-matcha",
    title: "Wat is matcha? Alles wat je moet weten",
    metaTitle: "Wat is Matcha? Uitleg, smaak, herkomst & gezondheid (2025)",
    metaDescription: "Wat is matcha precies? Ontdek hoe Japanse matcha gemaakt wordt, hoe het smaakt, het verschil met groene thee en alle gezondheidsvoordelen — uitgelegd door experts.",
    excerpt: "Matcha is gemalen Japanse groene thee — maar wat het écht uniek maakt is de manier waarop het geteeld, geoogst en bereid wordt.",
    category: "Matcha 101",
    readTime: "6 min",
    updated: "2025-04-12",
    content: `## Wat is matcha?
Matcha is een fijngemalen poeder van Japanse groene theeblaadjes (Camellia sinensis). Anders dan bij gewone thee drink je het hele blad mee — daarom zit er meer cafeïne, meer L-theanine en meer antioxidanten in.

## Hoe wordt matcha gemaakt?
- **Beschaduwen:** 20 dagen vóór de oogst worden de theeplanten met netten afgedekt. Dit verhoogt chlorofyl en aminozuren.
- **Handpluk:** Alleen de jongste 3 blaadjes worden geplukt (ichibancha, eerste oogst).
- **Stomen & drogen:** De blaadjes worden binnen enkele uren gestoomd om oxidatie te stoppen. Dit wordt "tencha" genoemd.
- **Steenmolen:** Tencha wordt langzaam gemalen in granieten ishi-usu molens — 1 uur voor 30 gram.

## Hoe smaakt matcha?
Goede ceremonial grade matcha is **zoet, romig en vol umami** — nooit bitter. Een lichte grasachtigheid is normaal. Bittere matcha wijst meestal op een lagere kwaliteit of te warm water.

## Matcha vs groene thee
Bij gewone groene thee laat je blaadjes trekken en gooi je ze daarna weg. Bij matcha drink je het hele blad. Daardoor krijg je tot 137x meer antioxidanten dan bij standaard groene thee.

## Is matcha gezond?
Matcha bevat:
- **L-theanine** — voor focus zonder onrust.
- **EGCG** — een krachtig antioxidant dat veroudering tegengaat.
- **Cafeïne** — ongeveer 60–70 mg per kop, maar door de L-theanine geeft het langdurige energie zonder crash.

## Welke matcha moet ik kiezen?
- **Ceremonial grade**: voor pure matcha met water.
- **Culinary grade**: voor lattes, smoothies en bakken.

Lees ook ons artikel [Ceremonial vs Culinary matcha](/kennis/ceremonial-vs-culinary-matcha).`,
    faqs: [
      { q: "Wat is matcha precies?", a: "Matcha is fijngemalen Japanse groene theeblaadjes. Je drinkt het hele blad, waardoor je meer cafeïne, L-theanine en antioxidanten binnenkrijgt dan bij gewone groene thee." },
      { q: "Hoe smaakt goede matcha?", a: "Premium ceremonial grade matcha smaakt zoet, romig en vol umami. Een lichte grasachtige toon is normaal, maar het mag nooit bitter zijn." },
      { q: "Is matcha gezond?", a: "Ja. Matcha bevat L-theanine voor focus, EGCG-antioxidanten en cafeïne die geleidelijk vrijkomt — voor stabiele energie zonder crash." },
    ],
  },
  {
    slug: "ceremonial-vs-culinary-matcha",
    title: "Ceremonial vs Culinary matcha — wat is het verschil?",
    metaTitle: "Ceremonial vs Culinary Matcha: Verschil, Smaak & Gebruik",
    metaDescription: "Wat is het verschil tussen ceremonial en culinary grade matcha? Ontdek welke je gebruikt voor pure matcha, lattes en bakken — met praktische tips.",
    excerpt: "Twee namen, twee compleet verschillende producten. Hoe kies je de juiste matcha voor jouw gebruik?",
    category: "Matcha 101",
    readTime: "5 min",
    updated: "2025-03-28",
    content: `## Het belangrijkste verschil
- **Ceremonial grade** is gemaakt van de jongste blaadjes (ichibancha, eerste oogst), bedoeld om puur met water te drinken.
- **Culinary grade** komt van latere oogsten en is robuuster — perfect om te mengen.

## Smaakprofiel
**Ceremonial:** zoet, vol umami, romige textuur, nauwelijks bitterheid. Helder jadegroen.
**Culinary:** robuuster, iets aardser, kan een lichte bitterheid hebben die mooi balanceert met melk of suiker.

## Wanneer gebruik je wat?
| Gebruik | Aanbevolen |
|---|---|
| Pure matcha (usucha/koicha) | Ceremonial |
| Matcha latte | Culinary of premium ceremonial |
| Iced latte | Culinary of speciale iced blend |
| Bakken & koken | Culinary |
| Smoothie | Culinary |

## Veelgemaakte fouten
- **Te warm water:** matcha mag nooit met kokend water. Gebruik 70–80 °C.
- **Niet zeven:** klontjes ruïneren de textuur. Altijd zeven.
- **Verkeerde dosering:** 1–2 gram per kop is standaard.

## Wat kost goede matcha?
- Ceremonial: €0,50–€1 per gram
- Culinary: €0,20–€0,40 per gram

Bekijk ook [hoe je matcha bewaart](/kennis/matcha-bewaren).`,
    faqs: [
      { q: "Kan ik culinary matcha puur drinken?", a: "Het kan, maar de smaak is robuuster en kan licht bitter zijn. Voor pure matcha is ceremonial grade altijd beter." },
      { q: "Is ceremonial grade altijd beter?", a: "Niet per se — voor lattes en recepten verdwijnt het delicate profiel van ceremonial onder melk of suiker. Culinary is dan kosteneffectiever." },
    ],
  },
  {
    slug: "matcha-bereiden",
    title: "Matcha bereiden — de complete gids (warm & koud)",
    metaTitle: "Matcha Bereiden: Stap-voor-stap Gids voor Warm & Iced Matcha",
    metaDescription: "Leer matcha bereiden zoals een Japanse theemeester. Inclusief stappen voor matcha latte, iced matcha, watertemperatuur en troubleshooting.",
    excerpt: "De juiste hoeveelheid, watertemperatuur en techniek. Zo zet je elke keer een perfecte kom matcha.",
    category: "Bereiding",
    readTime: "7 min",
    updated: "2025-04-02",
    content: `## Wat heb je nodig?
- **Matcha** — 1 tot 2 gram per kop (ongeveer ½ tot 1 theelepel).
- **Water** — 70 tot 80 °C, nooit kokend.
- **Chasen** (bamboe klopper) of melkopschuimer.
- **Chawan** (matchakom) of brede mok.
- **Zeefje** — voorkomt klontjes.

## Pure matcha (usucha) — stap voor stap
1. Verwarm je kom met heet water en gooi het water weg.
2. Zeef 1–2 g matcha in de kom.
3. Voeg 60–70 ml water van 75–80 °C toe.
4. Klop snel in M- of W-vorm met de chasen tot er een laagje fijn schuim ontstaat (15–20 seconden).
5. Drink direct.

## Matcha latte
1. Bereid usucha (zie hierboven) met 30 ml water.
2. Verwarm 200 ml melk (havermelk schuimt het beste).
3. Schenk de melk op.
4. Optioneel: voeg honing of vanille toe **aan de melk**, niet aan de matcha.

## Iced matcha
1. Los 2 g matcha op in een shaker met 50 ml koud water.
2. Schud 15 seconden (of gebruik een speciale **iced blend** die direct oplost).
3. Vul aan met 200 ml ijskoude (plant)melk en ijs.

## Troubleshooting
- **Klontjes:** je hebt niet gezeefd of het water was te warm.
- **Bitter:** water te warm (>85 °C) of te veel matcha.
- **Geen schuim:** klop sneller, in M-vorm, met je pols (niet je hele arm).
- **Slap van smaak:** te weinig poeder, of de matcha is oud.

## Watertemperatuur cheat sheet
| Type matcha | Temperatuur |
|---|---|
| Premium ceremonial | 70–75 °C |
| Standaard ceremonial | 75–80 °C |
| Culinary | 80 °C |`,
    faqs: [
      { q: "Hoeveel matcha per kop?", a: "Een gemiddelde portie is 1 tot 2 gram (½ tot 1 theelepel) per kop van 70 ml water." },
      { q: "Welke watertemperatuur voor matcha?", a: "70 tot 80 °C. Kokend water (100 °C) verbrandt de matcha en geeft een bittere smaak." },
      { q: "Kan ik matcha maken zonder chasen?", a: "Ja — een kleine elektrische melkopschuimer werkt ook prima. De textuur wordt iets minder fijn dan met een traditionele bamboe chasen." },
    ],
  },
  {
    slug: "matcha-cafeine",
    title: "Hoeveel cafeïne zit er in matcha vergeleken met koffie?",
    metaTitle: "Matcha Cafeïne: Hoeveel mg per Kop & Vergelijking met Koffie",
    metaDescription: "Hoeveel cafeïne zit er in een kop matcha? Vergelijking met koffie, espresso en groene thee — plus uitleg waarom matcha geen crash geeft.",
    excerpt: "Matcha bevat cafeïne, maar werkt heel anders dan koffie. Dit is waarom — en hoeveel mg je precies binnenkrijgt.",
    category: "Wellness",
    readTime: "4 min",
    updated: "2025-03-15",
    content: `## Hoeveel cafeïne in matcha?
Een standaard kop matcha (1–2 g poeder) bevat **ongeveer 60 tot 70 mg cafeïne**. Een usucha (1 g) zit dichter bij 35 mg, een sterke koicha (4 g) kan tot 130 mg gaan.

## Matcha vs koffie vs groene thee
| Drank | Cafeïne (per portie) |
|---|---|
| Espresso (30 ml) | 65 mg |
| Filterkoffie (200 ml) | 95 mg |
| Matcha (1 kop, 1 g) | 35 mg |
| Matcha (1 kop, 2 g) | 70 mg |
| Groene thee (200 ml) | 30 mg |
| Zwarte thee (200 ml) | 45 mg |

## Waarom geeft matcha geen crash?
Matcha bevat **L-theanine**, een aminozuur dat de cafeïne vertraagt en kalmeert. Resultaat: 4 tot 6 uur stabiele energie en focus, in plaats van een snelle piek en dip zoals bij koffie.

## Hoeveel matcha per dag?
Voor de meeste volwassenen is **2 tot 3 koppen per dag** veilig en gezond. Zwanger? Houd het bij 1 kop. Cafeïnegevoelig? Kies hojicha — een geroosterde groene thee met veel minder cafeïne.

## Wanneer drink je matcha het best?
- **Ochtend:** ideaal in plaats van koffie voor stabiele focus.
- **Vroege middag:** voor productieve uren zonder middagdip.
- **Laat in de dag:** liever niet (na 16:00) — kies dan hojicha.`,
    faqs: [
      { q: "Heeft matcha meer cafeïne dan koffie?", a: "Nee — een kop matcha bevat 60–70 mg cafeïne, een kop filterkoffie 90–100 mg. Matcha voelt sterker omdat het langer en stabieler werkt." },
      { q: "Mag matcha tijdens zwangerschap?", a: "In beperkte hoeveelheden (1 kop per dag) wordt het algemeen veilig geacht, maar overleg altijd met je arts of verloskundige." },
    ],
  },
  {
    slug: "matcha-bewaren",
    title: "Matcha bewaren — zo blijft je poeder vers en groen",
    metaTitle: "Matcha Bewaren: Houdbaarheid, Tips & Veelgemaakte Fouten",
    metaDescription: "Hoe bewaar je matcha het beste? Tips voor optimale houdbaarheid, kleur en smaak — plus signalen dat je matcha over zijn houdbaarheidsdatum is.",
    excerpt: "Matcha is gevoelig voor licht, lucht en warmte. Met deze tips blijft je poeder weken langer goed.",
    category: "Bereiding",
    readTime: "3 min",
    updated: "2025-02-20",
    content: `## Hoe lang is matcha houdbaar?
- **Ongeopend:** 12 maanden vanaf productiedatum.
- **Geopend:** 4 tot 6 weken voor optimale smaak en kleur.

## De vier vijanden van matcha
1. **Lucht (oxidatie)** — verkleurt het poeder van helder groen naar dof olijfgroen.
2. **Licht** — breekt chlorofyl en antioxidanten af.
3. **Warmte** — versnelt smaakverlies.
4. **Vocht** — geeft klontjes en versnelt bederf.

## De juiste manier om matcha te bewaren
- Bewaar in **luchtdichte verpakking** — bij voorkeur het originele zakje of een ondoorzichtig blik.
- Zet op een **donkere, koele plek** (een kast bij ≤20 °C is prima).
- **Koelkast?** Alleen als de verpakking 100% luchtdicht is. Laat het altijd op kamertemperatuur komen voor je opent — anders krijg je condens.
- **Vriezer?** Geschikt voor ongeopende verpakking, maximaal 6 maanden.

## Hoe weet je of matcha bedorven is?
- Kleur: helder groen → dof bruin/olijf = oud.
- Geur: fris en grasachtig → muf of "papier" = weggooien.
- Smaak: zoet en umami → vlak of bitter = niet meer optimaal.

## Pro tip
Koop **kleinere verpakkingen** (30 g) als je niet dagelijks drinkt. Matcha verliest snel kwaliteit zodra het zakje open is.`,
    faqs: [
      { q: "Kan ik matcha in de koelkast bewaren?", a: "Alleen in een 100% luchtdichte verpakking. Laat het altijd op kamertemperatuur komen voor je opent — anders ontstaat condens." },
      { q: "Hoe lang blijft geopende matcha goed?", a: "Voor optimale smaak en kleur 4 tot 6 weken na opening. Daarna nog veilig om te drinken, maar minder vol van smaak." },
    ],
  },
  {
    slug: "matcha-gezondheidsvoordelen",
    title: "13 wetenschappelijk onderbouwde gezondheidsvoordelen van matcha",
    metaTitle: "Matcha Gezondheid: 13 Voordelen Onderbouwd door Onderzoek",
    metaDescription: "Wat doet matcha met je lichaam? 13 wetenschappelijk onderbouwde voordelen: focus, antioxidanten, hart, huid, gewicht en meer.",
    excerpt: "Van betere focus tot een gezonder hart — wat zegt het onderzoek écht over matcha?",
    category: "Wellness",
    readTime: "8 min",
    updated: "2025-04-08",
    content: `## 1. Vol antioxidanten (EGCG)
Matcha bevat tot 137x meer EGCG dan gewone groene thee. EGCG beschermt cellen tegen oxidatieve schade.

## 2. Stabiele energie
De combinatie cafeïne + L-theanine geeft 4–6 uur focus zonder crash.

## 3. Verbeterde concentratie
L-theanine verhoogt alpha-hersengolven, geassocieerd met "relaxed alertness".

## 4. Ondersteunt hartgezondheid
Onderzoek koppelt regelmatige groene thee consumptie aan lager LDL-cholesterol.

## 5. Stimuleert metabolisme
Catechines zoals EGCG kunnen vetverbranding licht verhogen tijdens beweging.

## 6. Stralende huid
Antioxidanten beschermen tegen UV-schade en vroegtijdige veroudering.

## 7. Detox
Chlorofyl ondersteunt de natuurlijke ontgifting van het lichaam.

## 8. Betere mondhygiëne
Catechines remmen bacteriegroei, wat tandbederf en slechte adem vermindert.

## 9. Ondersteunt immuunsysteem
EGCG, vitamine C en kalium versterken het afweersysteem.

## 10. Stabieler bloedsuiker
Matcha kan piekglucose na maaltijden verlagen.

## 11. Mindfulness
De bereidingsrituelen zijn een dagelijks moment van rust en aandacht.

## 12. Geen crash
Door de tragere afgifte van cafeïne is er geen suiker- of energiedip.

## 13. Plantaardig en duurzaam
Geen dierlijke ingrediënten, lage waterimpact bij ambachtelijke teelt.

## Belangrijk
Matcha is geen medicijn. Effecten zijn vaak subtiel en treden op bij regelmatig gebruik (1–2 koppen per dag). Bij medicatie of zwangerschap: overleg altijd met een arts.`,
    faqs: [
      { q: "Hoeveel matcha per dag voor gezondheidsvoordelen?", a: "1 tot 2 koppen per dag is voldoende voor merkbare voordelen voor focus, energie en antioxidante bescherming." },
      { q: "Helpt matcha echt bij afvallen?", a: "Matcha kan vetverbranding licht ondersteunen, vooral in combinatie met beweging — maar het is geen wondermiddel zonder een gezond dieet." },
    ],
  },
];

export const getKnowledgeBySlug = (slug: string) => knowledgeArticles.find(a => a.slug === slug);
