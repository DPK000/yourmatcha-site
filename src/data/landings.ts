export interface LandingSection {
  heading: string;
  /** Markdown-light content: paragraphs, ## H2 (optional sub), ### H3, "- " bullets, [text](url) links, **bold**. */
  body: string;
}

export interface LandingFAQ {
  q: string;
  a: string;
}

export interface LandingPage {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  hero: string;
  sections: LandingSection[];
  productsTitle: string;
  productsSubtitle?: string;
  productSlugs: string[];
  faqs: LandingFAQ[];
  relatedLinks?: { label: string; to: string }[];
  updated: string;
}

export const landingPages: LandingPage[] = [
  {
    slug: "matcha-poeder",
    metaTitle: "Matcha Poeder Kopen: Ceremonial & Culinary uit Uji (2026)",
    metaDescription: "Authentiek Japans matcha poeder uit Uji. Ceremonial, culinary en smaakvarianten — handgeplukt, stenen gemalen. Bestel direct van de bron.",
    eyebrow: "Matcha Poeder",
    title: "Matcha poeder kopen — authentieke Japanse kwaliteit",
    hero:
      "Onze matcha poeders komen rechtstreeks uit Uji, het historische hart van de Japanse matcha. Handgeplukt, stenen gemalen, en zonder tussenhandelaren. Kies de juiste grade voor jouw gebruik — van zuivere ceremonial tot robuuste culinary.",
    sections: [
      {
        heading: "Welke matcha poeder past bij jou?",
        body: `Niet elke matcha is voor hetzelfde gemaakt. Drie hoofdtypes:

- **Ceremonial grade** — Eerste oogst (ichibancha), bedoeld om puur met water te drinken. Zoet, umami, romige textuur.
- **Culinary grade** — Robuuster en kosteneffectief. Ideaal voor lattes, smoothies en bakken.
- **Smaakvarianten** — Yuzu, mint, cacao, berry — voor wie experimenteert.

Lees onze gids [ceremonial vs culinary matcha](/kennis/ceremonial-vs-culinary-matcha) voor de complete vergelijking.`,
      },
      {
        heading: "Waarom Uji?",
        body: `Uji ligt ten zuiden van Kyoto en produceert al **800 jaar** premium matcha. Drie redenen:

- **Klimaat** — mistige rivierdalen verlangzamen rijping, complexere smaak.
- **Bodem** — vulkanisch, mineraal-rijk.
- **Generaties ervaring** — onze familieboerderij werkt al sinds 1872 op dezelfde velden.

Lees meer over [Uji matcha](/kennis/uji-matcha-regio) en bekijk de keten op onze [herkomst pagina](/herkomst).`,
      },
      {
        heading: "Hoe bewaar je matcha poeder?",
        body: `Matcha is gevoelig voor lucht, licht, warmte en vocht:

- Bewaar in **luchtdichte verpakking** (origineel zakje of tin).
- **Donker en koel** (≤20 °C, geen direct zonlicht).
- **Open 4–6 weken** voor optimale smaak.

Volledige uitleg in [matcha bewaren](/kennis/matcha-bewaren).`,
      },
    ],
    productsTitle: "Onze matcha poeders",
    productsSubtitle: "Allemaal direct uit Uji — 100% biologisch, eerste oogst (ichibancha).",
    productSlugs: [
      "ceremonial-matcha-30g",
      "ceremonial-matcha-100g",
      "culinary-matcha-100g",
      "ceremonial-reserve-tin",
      "matcha-yuzu-blend-40g",
      "mint-matcha-40g",
      "cacao-matcha-50g",
      "berry-matcha-40g",
      "iced-matcha-blend-60g",
      "vanilla-matcha-50g",
    ],
    faqs: [
      {
        q: "Welke matcha poeder is het beste voor beginners?",
        a: "Een ceremonial 30g is ideaal om mee te starten — kleine portie, lage drempel. Drink je vooral lattes? Begin met 100g culinary — robuuster en kosteneffectiever per gram.",
      },
      {
        q: "Hoe lang is matcha poeder houdbaar?",
        a: "Ongeopend 12 maanden vanaf productiedatum. Geopend 4 tot 6 weken voor optimale smaak en kleur — daarna nog veilig maar minder vol van smaak.",
      },
      {
        q: "Wat kost goede matcha poeder?",
        a: "Authentieke Japanse ceremonial matcha kost €0,50–€1 per gram. Culinary ligt rond €0,30–€0,50/g. Onder €0,15/g is vrijwel altijd oud of vermengd met goedkopere groene thee.",
      },
      {
        q: "Is matcha poeder hetzelfde als groene thee?",
        a: "Nee. Matcha is fijn gemalen Japanse groene thee waarvan je het hele blad drinkt — daardoor tot 137x meer antioxidanten dan een normaal kopje groene thee.",
      },
    ],
    relatedLinks: [
      { label: "Matcha bereiden gids", to: "/kennis/matcha-bereiden" },
      { label: "Beste matcha kopen 2026", to: "/kennis/beste-matcha-kopen-2026" },
      { label: "Matcha accessoires", to: "/matcha-accessoires" },
    ],
    updated: "2026-05-13",
  },
  {
    slug: "matcha-accessoires",
    metaTitle: "Matcha Accessoires: Chasen, Chawan, Chashaku & Meer",
    metaDescription: "Authentieke Japanse matcha accessoires: bamboe chasen, ceramische chawan, chashaku en melkopschuimers. Voor een echt matcha ritueel thuis.",
    eyebrow: "Accessoires",
    title: "Matcha accessoires — alles voor je ritueel",
    hero:
      "Een goede matcha verdient de juiste tools. Onze accessoires zijn ambachtelijk gemaakt in Japan — van bamboe chasen handgesneden door één vakman tot ceramische chawan-kommen uit kleine ateliers.",
    sections: [
      {
        heading: "De essentiële tools",
        body: `Voor een echt matcha ritueel heb je vier dingen nodig:

- **Chasen** (bamboe klopper) — 70 tot 120 fijne tanden voor microschuim.
- **Chawan** (matcha kom) — brede vorm geeft de chasen ruimte.
- **Chashaku** (bamboe lepel) — twee schepjes ≈ 2 g matcha.
- **Zeefje** — onmisbaar tegen klontjes.

Een complete [matcha starterspakket](/kennis/matcha-starterspakket) bevat al deze tools.`,
      },
      {
        heading: "Bamboe chasen — hoe kies je?",
        body: `Een goede chasen is handgesneden uit één stuk bamboe. Geen plastic-handvat, geen lijm.

- **70 tanden** — basis, voor dagelijks gebruik.
- **80–100 tanden** — fijner schuim, voor liefhebbers.
- **120 tanden** — competitieve grade, voor ceremoniële usucha.

Voor 90% van de matcha-drinkers is een chasen met 80 tanden ideaal.`,
      },
      {
        heading: "Onderhoud en houdbaarheid",
        body: `Een bamboe chasen gaat **3 tot 6 maanden** bij dagelijks gebruik. Tips voor langer plezier:

- Week voor het eerste gebruik 2 minuten in lauw water.
- Spoel meteen na gebruik met koud water — geen zeep.
- Bewaar **rechtop op een kusari** (chasen-houder) — niet plat.
- Vervang zodra meerdere tanden afbreken.

Bekijk ook onze [chasen onderhoud tips](/kennis/matcha-kloppen-zonder-klontjes).`,
      },
    ],
    productsTitle: "Matcha tools en accessoires",
    productsSubtitle: "Ambachtelijk gemaakt in Japan, geselecteerd voor dagelijks gebruik.",
    productSlugs: [
      "bamboe-chasen",
      "keramische-matcha-kom",
      "bamboe-chashaku",
      "elektrische-melkopschuimer",
      "handmade-cup-set",
      "travel-ritual-kit",
      "the-matcha-ritual-book",
    ],
    faqs: [
      {
        q: "Heb ik een chasen echt nodig voor matcha?",
        a: "Niet strikt noodzakelijk. Een elektrische melkopschuimer of cocktailshaker werkt ook. Een chasen geeft echter het fijnste schuim en hoort bij het traditionele ritueel.",
      },
      {
        q: "Hoe lang gaat een bamboe chasen mee?",
        a: "Bij dagelijks gebruik 3 tot 6 maanden. Bij weekend-gebruik tot een jaar. Vervang zodra meerdere tanden afbreken — de chasen geeft dan geen goed schuim meer.",
      },
      {
        q: "Wat is het verschil tussen een chawan en een gewone kom?",
        a: "Een chawan is breder en heeft een ondiepe bodem zodat de chasen ruimte heeft om te kloppen. Bij een hoge, smalle mok zit je de chasen tegen de wanden en krijg je geen schuim.",
      },
    ],
    relatedLinks: [
      { label: "Matcha starterspakket gids", to: "/kennis/matcha-starterspakket" },
      { label: "Matcha zonder chasen", to: "/kennis/matcha-zonder-chasen" },
      { label: "Matcha kits & sets", to: "/matcha-kits" },
    ],
    updated: "2026-05-13",
  },
  {
    slug: "matcha-kits",
    metaTitle: "Matcha Kits & Sets: Complete Pakketten voor Thuis (2026)",
    metaDescription: "Matcha starterskits en premium ritual sets — compleet met matcha, chasen, kom en chashaku. Direct beginnen, geen extra aanschaf nodig.",
    eyebrow: "Kits & Sets",
    title: "Matcha kits — alles in één pakket",
    hero:
      "Een matcha kit haalt de keuzestress weg. Wij hebben sets samengesteld voor elk niveau — van een eerste introductie tot een complete ceremoniële opstelling.",
    sections: [
      {
        heading: "Welke kit past bij jou?",
        body: `Drie pakketten, drie momenten:

- **Starter kit** — Eerste kennismaking. Culinary matcha + chasen + kom + zeefje.
- **Premium ritual set** — Voor de liefhebber. Ceremonial matcha + handgemaakte tools.
- **Gift box** — Cadeauklaar verpakt, sterke selectie zonder zelf te kiezen.

Lees onze [koopgids](/kennis/beste-matcha-kopen-2026) voor het volledige plaatje.`,
      },
      {
        heading: "Waarom een kit boven losse producten?",
        body: `Drie redenen:

1. **Tools zijn op elkaar afgestemd** — de chasen past in de kom, de chashaku doseert exact voor onze matcha.
2. **Geen verkeerde combinaties** — bv. een grote chawan met te weinig matcha geeft frustratie.
3. **Voordeliger** — een set kost ~15% minder dan losse aanschaf.

Plus: een kit voelt als een cadeau — ook aan jezelf.`,
      },
      {
        heading: "Wat als je al een chawan of chasen hebt?",
        body: `Dan zijn losse producten zinvoller. Bekijk onze [matcha poeders](/matcha-poeder) of [accessoires](/matcha-accessoires) per stuk.

Twijfel je? Een [discovery tea box](/product/discovery-tea-box) bevat alleen poeders — geen tools.`,
      },
    ],
    productsTitle: "Onze matcha kits",
    productsSubtitle: "Compleet, doordacht samengesteld, klaar voor gebruik.",
    productSlugs: ["starter-kit", "premium-ritual-set", "gift-box", "discovery-tea-box", "travel-ritual-kit"],
    faqs: [
      {
        q: "Wat zit er in een matcha starter kit?",
        a: "Onze starter kit bevat: matcha-poeder, bamboe chasen, ceramische chawan en een zeefje. Genoeg om direct authentieke matcha thuis te bereiden.",
      },
      {
        q: "Is een matcha kit een goed cadeau?",
        a: "Ja — vooral voor beginners. De ontvanger kan direct beginnen zonder extra aankopen. Voor een premium-uitstraling kies je de gift box of premium ritual set.",
      },
      {
        q: "Wat is het verschil tussen de starter kit en premium ritual set?",
        a: "Starter kit: culinary matcha + standaard tools (~€60). Premium ritual set: ceremonial matcha + handgemaakte chasen en chawan + boekje (~€110). De premium-set is bedoeld voor liefhebbers en cadeau-momenten.",
      },
    ],
    relatedLinks: [
      { label: "Matcha cadeau ideeën", to: "/kennis/matcha-cadeau-ideeen" },
      { label: "Matcha starterspakket gids", to: "/kennis/matcha-starterspakket" },
      { label: "Cadeau gids", to: "/cadeau-gids" },
    ],
    updated: "2026-05-13",
  },
  {
    slug: "japanse-thee",
    metaTitle: "Japanse Thee Kopen: Hojicha, Genmaicha, Sencha & Blends",
    metaDescription: "Authentieke Japanse thee — hojicha, genmaicha, sencha en matcha blends. Direct uit Japan, voor wie verder wil dan matcha alleen.",
    eyebrow: "Japanse Thee",
    title: "Japanse thee — meer dan matcha",
    hero:
      "Matcha is maar één van de Japanse theeën. Hojicha (geroosterd, weinig cafeïne), genmaicha (met geroosterde rijst), sencha (frisse losse blad-thee) — elk heeft een eigen smaakprofiel en moment.",
    sections: [
      {
        heading: "De Japanse thee-familie",
        body: `Drie hoofdtypes plus matcha:

- **Matcha** — gepoederde groene thee, je drinkt het hele blad.
- **Sencha** — losse groene theeblad, fris en grasachtig.
- **Hojicha** — geroosterde groene thee, nootachtig, weinig cafeïne.
- **Genmaicha** — groene thee met geroosterde rijst, hartig.

Lees over [hojicha](/kennis/hojicha-uitleg) en [genmaicha](/kennis/genmaicha-gids) voor de complete uitleg.`,
      },
      {
        heading: "Welke voor welk moment?",
        body: `- **Ochtend / focus**: matcha of sencha (cafeïne).
- **Middag / na lunch**: matcha latte of sencha.
- **Avond / na diner**: hojicha of genmaicha (weinig cafeïne).
- **Zwangerschap**: hojicha of genmaicha — lees onze [zwangerschapsgids](/kennis/matcha-tijdens-zwangerschap).`,
      },
      {
        heading: "Bereiding per theesoort",
        body: `Elke thee heeft zijn eigen watertemperatuur:

| Thee | Temperatuur | Trektijd |
|---|---|---|
| Matcha | 75–80 °C | n.v.t. (gepoederd) |
| Sencha | 70–75 °C | 60 sec |
| Hojicha | 90–95 °C | 30 sec |
| Genmaicha | 80–85 °C | 30–60 sec |

Hoger water = hogere kans op bitterheid. Hojicha is uitzondering doordat het al geroosterd is.`,
      },
    ],
    productsTitle: "Onze Japanse theeën",
    productsSubtitle: "Geselecteerd voor wie verder wil dan matcha.",
    productSlugs: ["hojicha-poeder-50g", "sencha-loose-leaf-75g", "genmaicha-loose-leaf-50g", "matcha-yuzu-blend-40g", "discovery-tea-box"],
    faqs: [
      {
        q: "Wat is het verschil tussen matcha en sencha?",
        a: "Bij sencha trek je losse theeblaadjes in heet water en gooi je ze daarna weg. Bij matcha is het blad fijn gemalen en drink je het hele blad — daardoor veel meer antioxidanten per kop.",
      },
      {
        q: "Heeft hojicha cafeïne?",
        a: "Heel weinig — ongeveer 7 tot 15 mg per kop, vijf tot tien keer minder dan matcha. Daardoor is hojicha geschikt voor de avond en voor cafeïnegevoelige drinkers.",
      },
      {
        q: "Kan ik genmaicha mengen met matcha?",
        a: "Ja — dit heet matcha-iri genmaicha en is een populaire Japanse variant. Genmaicha geeft hartige, popcorn-achtige tonen aan de matcha.",
      },
    ],
    relatedLinks: [
      { label: "Hojicha uitleg", to: "/kennis/hojicha-uitleg" },
      { label: "Genmaicha gids", to: "/kennis/genmaicha-gids" },
      { label: "Cafeïnearme thee", to: "/cafeinearme-thee" },
    ],
    updated: "2026-05-13",
  },
  {
    slug: "cadeau-gids",
    metaTitle: "Matcha Cadeau Gids: Voor Elk Budget & Elke Ontvanger (2026)",
    metaDescription: "Een matcha cadeau dat écht raak is. Van starter kits tot premium ritual sets — onze gids helpt je kiezen voor elke ontvanger en elk budget.",
    eyebrow: "Cadeau Gids",
    title: "Matcha als cadeau — origineel en persoonlijk",
    hero:
      "Een matcha-cadeau zegt iets: ik denk aan jouw welzijn, jouw rituelen, jouw smaak. Onze cadeau gids helpt je kiezen voor elke ontvanger — van nieuwsgierige beginner tot serieuze liefhebber.",
    sections: [
      {
        heading: "Kies op budget",
        body: `- **Tot €25** — Een [bamboe chasen](/product/bamboe-chasen) of [ceremonial 30g](/product/ceremonial-matcha-30g) — kleine attentie met grote impact.
- **€25–€50** — Een smaakvariant zoals [yuzu matcha](/product/matcha-yuzu-blend-40g) of een [keramische chawan](/product/keramische-matcha-kom).
- **€50–€80** — Onze [starter kit](/product/starter-kit) — compleet pakket waarmee de ontvanger direct begint.
- **€80+** — De [premium ritual set](/product/premium-ritual-set) of [gift box](/product/gift-box) — cadeauklaar verpakt.

Volledige uitleg in [matcha cadeau ideeën](/kennis/matcha-cadeau-ideeen).`,
      },
      {
        heading: "Kies op ontvanger",
        body: `- **Beginner** — Starter kit. Geen extra aankopen nodig.
- **Koffieverlater** — Ceremonial 100g + chasen — geeft stabiele focus zonder crash.
- **Sporter / yogi** — Pre-workout pakket met ceremonial of iced matcha blend.
- **Foodie** — Discovery tea box — proeft alles in kleine porties.
- **Mindfulness fan** — Premium ritual set — het ritueel is meditatief.
- **Cafeïne-gevoelig / zwanger** — Hojicha poeder + chawan.`,
      },
      {
        heading: "Pakketten en verzending",
        body: `Alle cadeaus worden **luxe verpakt** geleverd. Optionele extra's:

- Handgeschreven kaartje (gratis bij bestelling)
- Direct verzenden naar de ontvanger (jouw adres als afzender)
- Voor 14:00 besteld = morgen geleverd binnen NL & BE`,
      },
    ],
    productsTitle: "Top cadeau-keuzes",
    productsSubtitle: "Onze meest geliefde cadeau-producten — getest door honderden klanten.",
    productSlugs: ["gift-box", "premium-ritual-set", "starter-kit", "discovery-tea-box", "ceremonial-matcha-30g", "matcha-yuzu-blend-40g", "the-matcha-ritual-book"],
    faqs: [
      {
        q: "Wat is een goed matcha cadeau onder €50?",
        a: "Een starter kit (€60 — net erover, vaak afgeprijsd onder €50) of een ceremonial 30g met bamboe chasen apart. Beide zijn complete giften zonder dat de ontvanger nog iets nodig heeft.",
      },
      {
        q: "Is matcha geschikt voor iemand die geen thee drinkt?",
        a: "Verrassend vaak ja — vooral voor koffieverlaters. Matcha latte voelt anders dan thee en geeft langduriger focus. Een starter kit met culinary matcha is een veilige instap.",
      },
      {
        q: "Kunnen jullie het cadeau direct naar de ontvanger sturen?",
        a: "Ja. Bij de bestelling geef je het ontvanger-adres op. Wij verpakken cadeauklaar, met handgeschreven kaartje als je dat wenst, en jouw naam als afzender.",
      },
    ],
    relatedLinks: [
      { label: "Matcha cadeau ideeën", to: "/kennis/matcha-cadeau-ideeen" },
      { label: "Matcha starterspakket gids", to: "/kennis/matcha-starterspakket" },
      { label: "Matcha kits & sets", to: "/matcha-kits" },
    ],
    updated: "2026-05-13",
  },
  {
    slug: "matcha-voor-beginners",
    metaTitle: "Matcha voor Beginners: Waar Begin Je? (Complete Gids 2026)",
    metaDescription: "Net begonnen met matcha? Onze gids voor beginners — welke matcha, welke tools, eerste bereiding en de zeven beginnersfouten om te vermijden.",
    eyebrow: "Voor Beginners",
    title: "Matcha voor beginners — start hier",
    hero:
      "Beginnen met matcha hoeft niet duur of complex te zijn. We helpen je kiezen wat je écht nodig hebt — en wat je gerust kunt overslaan.",
    sections: [
      {
        heading: "Drie tips als je nu begint",
        body: `1. **Begin klein** — een 30g zakje is genoeg om te ontdekken of je matcha lekker vindt voor je investeert in 100g.
2. **Sla cooking-grade over** — bittere thee in een mooi zakje. Kies meteen culinary of ceremonial.
3. **Niet bang zijn voor de prijs** — 1 kop goede matcha kost €0,80, vergelijkbaar met een betere koffie.`,
      },
      {
        heading: "Wat heb je écht nodig?",
        body: `Vier dingen:

- **Matcha poeder** (~€20)
- **Water op 75–80 °C** (waterkoker met temperatuurregeling óf gewoon kokend + 60 sec wachten)
- **Een zeefje** (~€5, of een uit je keukenla)
- **Een opklopper** — klein melkopschuimertje (€10), chasen (€20) of zelfs een afgesloten potje

Niet nodig: matcha-blender machines, "fancy" zeefjes, supplements. Lees [matcha zonder chasen](/kennis/matcha-zonder-chasen) voor alle alternatieven.`,
      },
      {
        heading: "Je eerste bereiding",
        body: `**Pure matcha (usucha) in 5 stappen:**

1. Zeef 2 g matcha in een mok of [chawan](/product/keramische-matcha-kom).
2. Voeg 60 ml water van 75 °C toe.
3. Klop snel in M-vorm met opschuimer of chasen — 15 sec.
4. Drink direct.

**Eerste latte:** Zeef 2 g matcha, los op met 30 ml water, schenk 200 ml warme havermelk op. Klaar.

Volledige uitleg in onze [matcha bereiden gids](/kennis/matcha-bereiden) en [matcha latte maken](/kennis/matcha-latte-maken).`,
      },
      {
        heading: "De zeven beginnersfouten",
        body: `1. Kokend water — verbrandt matcha, geeft bitterheid.
2. Niet zeven — klontjes gegarandeerd.
3. Te veel poeder — 2 g is genoeg.
4. Suiker direct in de matcha — zoet altijd de melk apart.
5. Oude matcha drinken — verlies smaak na 6 weken open.
6. Culinary puur drinken — kies ceremonial voor puur.
7. Cirkels kloppen — moet horizontaal in M-vorm.

[Volledig artikel hier](/blog/7-matcha-fouten-beginners).`,
      },
    ],
    productsTitle: "Onze top beginnerskeuzes",
    productsSubtitle: "Wat we aanbevelen als startpunt voor wie net begint.",
    productSlugs: ["starter-kit", "ceremonial-matcha-30g", "culinary-matcha-100g", "bamboe-chasen", "elektrische-melkopschuimer"],
    faqs: [
      {
        q: "Wat is het minimale dat ik nodig heb om met matcha te beginnen?",
        a: "Matcha-poeder (€20), water van 75–80 °C, een keukenzeef en iets om mee op te kloppen. Totaalbudget: vanaf €30. Geen chasen vereist.",
      },
      {
        q: "Welke matcha is het beste voor een beginner?",
        a: "Een ceremonial 30g om mee te proeven, of culinary 100g als je vooral lattes wilt drinken. Beide zijn vergevingsgezinde startpunten — niet te delicaat, niet te robuust.",
      },
      {
        q: "Is matcha bitter?",
        a: "Goede matcha is niet bitter — het is zoet, vol umami en lichtjes grasachtig. Bitterheid wijst meestal op te warm water (>85 °C), te veel poeder, of slechte kwaliteit matcha.",
      },
    ],
    relatedLinks: [
      { label: "Matcha starterspakket gids", to: "/kennis/matcha-starterspakket" },
      { label: "Matcha bereiden", to: "/kennis/matcha-bereiden" },
      { label: "7 fouten van beginners", to: "/blog/7-matcha-fouten-beginners" },
    ],
    updated: "2026-05-13",
  },
  {
    slug: "matcha-voor-sporters",
    metaTitle: "Matcha voor Sporters: Pre-workout, Focus & Vetverbranding",
    metaDescription: "Matcha als natuurlijke pre-workout: stabiele energie, vetverbranding boost en geen jitters. Plus de juiste producten en doseringen voor sporters.",
    eyebrow: "Voor Sporters",
    title: "Matcha voor sporters — natuurlijke pre-workout",
    hero:
      "Matcha geeft cafeïne plus L-theanine — stabiele energie zonder jitters, vetverbranding-boost via EGCG en geen maagklachten. Hier is hoe je het inzet rond training.",
    sections: [
      {
        heading: "Waarom matcha als pre-workout?",
        body: `Drie ingrediënten werken samen:

- **Cafeïne** (~70 mg) verhoogt uithoudingsvermogen 2–5%.
- **L-theanine** voorkomt jitters en geeft kalme focus.
- **EGCG** verhoogt vetverbranding tijdens cardio met 17% (volgens 2018-studie).

Lees onze volledige [matcha en sport](/kennis/matcha-en-sport) gids.`,
      },
      {
        heading: "Dosering en timing",
        body: `- **20–30 min voor cardio** — EGCG circuleert tijdens beweging.
- **Standaard dosering** — 2 g matcha.
- **Lange duurtraining** — 2,5–3 g (boven 3 g kan maag-irritatie geven).
- **Niet later dan 14:00** — cafeïne kan slaap beïnvloeden.`,
      },
      {
        heading: "Welke matcha voor welke sport?",
        body: `| Sport | Aanrader |
|---|---|
| Cardio / wandelen | Ceremonial matcha (puur) |
| Hardlopen | Ceremonial of culinary |
| Yoga / pilates | Ceremonial (L-theanine boost) |
| Krachttraining | Culinary + iets eten ervoor |
| Iced workout drink | Iced matcha blend |`,
      },
    ],
    productsTitle: "Onze top keuzes voor sporters",
    productsSubtitle: "Geselecteerd op cafeïne-gehalte, oplosbaarheid en smaakprofiel.",
    productSlugs: ["ceremonial-matcha-100g", "iced-matcha-blend-60g", "culinary-matcha-100g", "mint-matcha-40g", "starter-kit"],
    faqs: [
      {
        q: "Hoeveel matcha voor pre-workout?",
        a: "Standaard 2 gram, 20–30 minuten voor je training. Voor lange duurtraining 2,5–3 g, voor lichte yoga 1–1,5 g.",
      },
      {
        q: "Matcha of koffie als pre-workout?",
        a: "Voor cardio, yoga en lange duurtraining: matcha. Stabiele energie van EGCG. Voor explosieve krachttraining bij vroege ochtend: koffie kan sneller piek geven.",
      },
      {
        q: "Kan ik matcha gebruiken voor afvallen?",
        a: "Ja, als ondersteuning. Bij 2 koppen per dag + caloriedeficit + beweging: realistisch 1–2 kg extra per 12 weken. Lees onze volledige uitleg over [matcha en afvallen](/kennis/matcha-en-afvallen).",
      },
    ],
    relatedLinks: [
      { label: "Matcha en sport gids", to: "/kennis/matcha-en-sport" },
      { label: "Matcha en afvallen", to: "/kennis/matcha-en-afvallen" },
      { label: "Matcha vs koffie", to: "/kennis/matcha-vs-koffie" },
    ],
    updated: "2026-05-13",
  },
  {
    slug: "cafeinearme-thee",
    metaTitle: "Cafeïnearme Japanse Thee: Hojicha, Genmaicha & Alternatieven",
    metaDescription: "Op zoek naar Japanse thee met weinig cafeïne? Hojicha en genmaicha bevatten 5 tot 10 keer minder cafeïne dan matcha — perfect voor de avond.",
    eyebrow: "Cafeïnearm",
    title: "Cafeïnearme Japanse thee",
    hero:
      "Hou je van het Japanse thee-ritueel maar wil je minder cafeïne? Hojicha (geroosterd, ~10 mg) en genmaicha (met rijst, ~10 mg) geven je smaakdiepte zonder slaapverstoring of cafeïne-piek.",
    sections: [
      {
        heading: "Cafeïne per Japanse thee",
        body: `| Thee | Cafeïne per kop |
|---|---|
| Matcha (2 g) | ~70 mg |
| Sencha | ~30 mg |
| Genmaicha | ~10 mg |
| Hojicha | ~7–15 mg |
| Karigane | ~15 mg |
| Decaf groene thee | ~5 mg |

Lees onze volledige [matcha cafeïne vergelijking](/kennis/matcha-cafeine).`,
      },
      {
        heading: "Hojicha — geroosterd en kalmerend",
        body: `Hojicha (焙茶) is groene thee die geroosterd is op ~200 °C. Twee effecten:

- **Cafeïne breekt af** door de hoge temperatuur.
- **Smaak verandert** — nootachtig, karamel, geen bitterheid.

Veel matcha-fans gebruiken hojicha latte als avondvariant. Lees [hojicha uitleg](/kennis/hojicha-uitleg).`,
      },
      {
        heading: "Wanneer kies je cafeïnearm?",
        body: `- **Na 14:00–16:00** — om slaap te beschermen
- **Tijdens zwangerschap** — lees [matcha tijdens zwangerschap](/kennis/matcha-tijdens-zwangerschap)
- **Borstvoeding** — minder cafeïne via moedermelk
- **Gevoelig voor cafeïne** — hartkloppingen, onrust
- **Kinderen** — hojicha is in Japan een populaire kinderthee`,
      },
    ],
    productsTitle: "Cafeïnearme keuzes",
    productsSubtitle: "Onze laag-cafeïne Japanse theeën.",
    productSlugs: ["hojicha-poeder-50g", "genmaicha-loose-leaf-50g", "sencha-loose-leaf-75g", "discovery-tea-box"],
    faqs: [
      {
        q: "Welke Japanse thee heeft het minste cafeïne?",
        a: "Hojicha — ongeveer 7 tot 15 mg per kop, vergelijkbaar met een stukje pure chocolade. Vijf tot tien keer minder dan matcha.",
      },
      {
        q: "Kan ik 's avonds hojicha drinken?",
        a: "Ja — door de zeer lage cafeïne heeft hojicha bij de meeste mensen geen invloed op de slaap, zelfs 1–2 uur voor bed.",
      },
      {
        q: "Is genmaicha cafeïnevrij?",
        a: "Niet helemaal, maar vrijwel — ~10 mg per kop. Door het hoge rijstaandeel (vaak 50/50) zit er natuurlijk veel minder cafeïne in dan in pure groene thee.",
      },
    ],
    relatedLinks: [
      { label: "Hojicha uitleg", to: "/kennis/hojicha-uitleg" },
      { label: "Genmaicha gids", to: "/kennis/genmaicha-gids" },
      { label: "Matcha tijdens zwangerschap", to: "/kennis/matcha-tijdens-zwangerschap" },
    ],
    updated: "2026-05-13",
  },
  {
    slug: "matcha-als-koffievervanger",
    metaTitle: "Matcha als Koffievervanger: Hoe Stap Je Over? (Volledige Gids)",
    metaDescription: "Overstappen van koffie naar matcha? Wat je kunt verwachten, hoe je de overgang maakt en welke matcha het best koffie vervangt.",
    eyebrow: "Koffievervanger",
    title: "Matcha als koffievervanger",
    hero:
      "Veel mensen stappen over van koffie naar matcha voor stabielere energie, minder maagklachten en betere slaap. Hier is hoe je het zonder cafeïne-crash doet.",
    sections: [
      {
        heading: "Waarom overstappen?",
        body: `Voor wie koffie te scherp wordt, geeft matcha:

- **Stabiele energie** — 4–6 uur, geen crash.
- **Geen maagklachten** — matcha is milder voor de maag.
- **Betere slaap** — vooral als je matcha 's middags drinkt i.p.v. een 3e koffie.
- **Geen tandverkleuring** — anders dan koffie.

Volledige vergelijking in [matcha vs koffie](/kennis/matcha-vs-koffie).`,
      },
      {
        heading: "De overgang in 3 weken",
        body: `**Week 1** — Vervang de tweede koffie (rond 10:00) door matcha. Behoud je ochtendkoffie.

**Week 2** — Vervang ook je middagdrink (na lunch) door matcha. Mogelijk lichte hoofdpijn — dat is cafeïne-detox.

**Week 3** — Vervang je ochtendkoffie door matcha latte. Je voelt nu duidelijk verschil in focus en slaap.

Niet iedereen hoeft 100% over te stappen. Veel mensen blijven met **één ochtendkoffie + de rest matcha**.`,
      },
      {
        heading: "Welke matcha vervangt koffie het best?",
        body: `- **Voor een sterke wake-up:** ceremonial 100g, puur met water of als sterke latte.
- **Voor de "koffie smaak" gevoel:** hojicha latte — geroosterde, koffie-achtige tonen.
- **Voor iced koffie fans:** iced matcha blend met havermelk.

Geen specifieke koffievervangende variant nodig — gewone goede matcha werkt prima.`,
      },
    ],
    productsTitle: "Onze koffievervanger top",
    productsSubtitle: "Gekozen op effect, smaak en gebruiksgemak voor ex-koffiedrinkers.",
    productSlugs: ["ceremonial-matcha-100g", "culinary-matcha-100g", "hojicha-poeder-50g", "starter-kit", "elektrische-melkopschuimer"],
    faqs: [
      {
        q: "Heeft matcha meer cafeïne dan koffie?",
        a: "Nee — een kop matcha bevat 60–70 mg cafeïne, een kop filterkoffie 90–100 mg. Matcha voelt sterker omdat het langer en stabieler werkt door L-theanine.",
      },
      {
        q: "Krijg ik hoofdpijn als ik overstap van koffie naar matcha?",
        a: "Mogelijk in week 1–2. Dit is cafeïne-detox bij lagere totale inname. Drink genoeg water en bouw geleidelijk af in plaats van direct stoppen.",
      },
      {
        q: "Kan ik matcha en koffie op één dag drinken?",
        a: "Ja, en velen doen dat — ochtendkoffie + matcha 's middags. Let wel op je totale cafeïne (max 400 mg/dag voor volwassenen).",
      },
    ],
    relatedLinks: [
      { label: "Matcha vs koffie", to: "/kennis/matcha-vs-koffie" },
      { label: "Matcha en focus", to: "/kennis/matcha-en-focus" },
      { label: "Matcha en slaap", to: "/kennis/matcha-en-slaap" },
    ],
    updated: "2026-05-13",
  },
];

export const getLandingPageBySlug = (slug: string) => landingPages.find(l => l.slug === slug);
