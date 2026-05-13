export interface GlossaryTerm {
  term: string;
  alternativeNames?: string[];
  definition: string;
  /** Topic groups for filtering: bereiding, types, tools, regio, gezondheid, cultuur. */
  group: "Types" | "Tools" | "Bereiding" | "Regio & Herkomst" | "Gezondheid & Stoffen" | "Cultuur";
  relatedLink?: { label: string; to: string };
}

export const glossaryTerms: GlossaryTerm[] = [
  // Types
  {
    term: "Matcha",
    definition:
      "Fijngemalen Japanse groene theeblaadjes (Camellia sinensis). Anders dan losse blad-thee drink je het hele blad, waardoor je meer cafeïne, L-theanine en antioxidanten binnenkrijgt.",
    group: "Types",
    relatedLink: { label: "Wat is matcha?", to: "/kennis/wat-is-matcha" },
  },
  {
    term: "Ceremonial grade",
    definition:
      "De hoogste matcha-kwaliteit, gemaakt van de jongste blaadjes (ichibancha). Bedoeld om puur met water te drinken — zoet, vol umami, geen bitterheid. Prijs €0,50–€1,50 per gram.",
    group: "Types",
    relatedLink: { label: "Ceremonial vs Culinary", to: "/kennis/ceremonial-vs-culinary-matcha" },
  },
  {
    term: "Culinary grade",
    definition:
      "Robuustere matcha-kwaliteit voor lattes, smoothies en bakken. Komt van latere oogsten en is iets robuuster van smaak. Prijs €0,15–€0,50 per gram.",
    group: "Types",
  },
  {
    term: "Koicha",
    alternativeNames: ["濃茶", "dikke thee"],
    definition:
      "Dikke, paste-achtige matcha bereiding. ~4 g matcha met slechts 30 ml water. Gedeeld uit één kom in formele theeceremonies. Vereist hoge-kwaliteit ceremonial matcha.",
    group: "Bereiding",
  },
  {
    term: "Usucha",
    alternativeNames: ["薄茶", "dunne thee"],
    definition:
      "De dagelijkse matcha-bereiding. ~2 g matcha met 60–70 ml water, snel opgeklopt met chasen. Dit is wat de meeste mensen 'matcha' noemen.",
    group: "Bereiding",
  },
  {
    term: "Hojicha",
    alternativeNames: ["焙茶"],
    definition:
      "Geroosterde Japanse groene thee met nootachtige, karamel-achtige smaak. Bevat slechts 7–15 mg cafeïne per kop — vijf tot tien keer minder dan matcha. Ideaal voor de avond.",
    group: "Types",
    relatedLink: { label: "Hojicha uitleg", to: "/kennis/hojicha-uitleg" },
  },
  {
    term: "Genmaicha",
    alternativeNames: ["玄米茶"],
    definition:
      "Japanse groene thee gemengd met geroosterde bruine rijst. Hartig, popcorn-achtig en met slechts ~10 mg cafeïne per kop.",
    group: "Types",
    relatedLink: { label: "Genmaicha gids", to: "/kennis/genmaicha-gids" },
  },
  {
    term: "Sencha",
    alternativeNames: ["煎茶"],
    definition:
      "De meest gedronken Japanse groene thee — losse blaadjes, gestoomd en gedroogd. Fris, grasachtig, ~30 mg cafeïne per kop.",
    group: "Types",
  },
  {
    term: "Gyokuro",
    alternativeNames: ["玉露"],
    definition:
      "Premium Japanse groene losse-blad thee. Net als matcha 20+ dagen beschaduwd vóór de oogst, wat zorgt voor diepe umami en zoete smaak. Lager bereid dan sencha (50–60 °C).",
    group: "Types",
  },
  {
    term: "Tencha",
    alternativeNames: ["碾茶"],
    definition:
      "De basis-thee waaruit matcha wordt gemalen. Gestoomde, gedroogde en van stelen ontdane theeblaadjes — klaar om in stenen molens fijngemalen te worden.",
    group: "Types",
  },
  {
    term: "Matcha latte",
    definition:
      "Matcha gemengd met opgeschuimde melk (vaak haver- of amandelmelk). Romiger en milder dan pure matcha — populair als koffievervanger.",
    group: "Bereiding",
    relatedLink: { label: "Matcha latte maken", to: "/kennis/matcha-latte-maken" },
  },
  {
    term: "Iced matcha",
    definition:
      "Koude matcha-bereiding, vaak als iced latte. Vereist meer mechanische kracht (shaker, blender) of een speciaal koud-gemalen blend om klontjes te voorkomen.",
    group: "Bereiding",
    relatedLink: { label: "Iced matcha bereiden", to: "/kennis/iced-matcha-bereiden" },
  },

  // Tools
  {
    term: "Chasen",
    alternativeNames: ["茶筅", "bamboe klopper"],
    definition:
      "Handgesneden bamboe garde met 70 tot 120 fijne tanden. Wordt in M- of W-vorm horizontaal gebruikt om matcha tot fijn schuim te kloppen. Gaat 3 tot 6 maanden bij dagelijks gebruik.",
    group: "Tools",
    relatedLink: { label: "Bekijk chasen", to: "/product/bamboe-chasen" },
  },
  {
    term: "Chawan",
    alternativeNames: ["茶碗", "matcha kom"],
    definition:
      "De ceremoniële matcha-kom — breed en met ondiepe bodem, zodat de chasen ruimte heeft. Vorm verschilt per seizoen: dieper in winter, lager in zomer.",
    group: "Tools",
    relatedLink: { label: "Bekijk chawan", to: "/product/keramische-matcha-kom" },
  },
  {
    term: "Chashaku",
    alternativeNames: ["茶杓"],
    definition:
      "Lange, smalle bamboe theelepel voor matcha. Twee schepjes ≈ 2 g — de standaard dosering. Vaak met een naam (mei) gegeven door de maker.",
    group: "Tools",
    relatedLink: { label: "Bekijk chashaku", to: "/product/bamboe-chashaku" },
  },
  {
    term: "Natsume",
    alternativeNames: ["棗"],
    definition:
      "Houten of gelakte theekistje voor usucha-matcha. Vernoemd naar de jujube-vrucht door de gelijkende vorm.",
    group: "Tools",
  },
  {
    term: "Ishi-usu",
    alternativeNames: ["石臼", "stenen molen"],
    definition:
      "Traditionele granieten stenen molen waarmee matcha wordt gemalen. Produceert slechts 30 g per uur — daarom is goede matcha relatief duur.",
    group: "Tools",
  },
  {
    term: "Kusari",
    definition:
      "Een houder of standaard waarop je een chasen rechtop bewaart. Belangrijk voor levensduur — een chasen die plat ligt vervormt sneller.",
    group: "Tools",
  },
  {
    term: "Hishaku",
    alternativeNames: ["柄杓"],
    definition:
      "Lange bamboe waterlepel waarmee tijdens een formele theeceremonie heet water uit de ketel wordt geschept.",
    group: "Tools",
  },
  {
    term: "Fukusa",
    alternativeNames: ["袱紗"],
    definition:
      "Vierkante zijden doek die in de theeceremonie ritueel wordt gevouwen om tools symbolisch te reinigen.",
    group: "Tools",
  },

  // Bereiding
  {
    term: "Ichibancha",
    alternativeNames: ["一番茶", "eerste oogst"],
    definition:
      "De eerste oogst van het jaar, doorgaans in mei. De jongste, meest aromatische blaadjes — met het hoogste L-theanine en chlorofyl. Gebruikt voor premium ceremonial matcha.",
    group: "Bereiding",
  },
  {
    term: "Nibancha",
    alternativeNames: ["二番茶", "tweede oogst"],
    definition:
      "De tweede oogst, in juni/juli. Robuuster en lagere L-theanine dan ichibancha. Vaak gebruikt voor culinary grade matcha.",
    group: "Bereiding",
  },
  {
    term: "Sanbancha",
    alternativeNames: ["三番茶", "derde oogst"],
    definition:
      "De derde oogst, in augustus. Voornamelijk gebruikt voor hojicha (roosteren) of cooking-grade producten.",
    group: "Bereiding",
  },
  {
    term: "Tana",
    definition:
      "Het beschaduwingsdoek dat 20 dagen voor de oogst over theeplanten wordt gespannen. Verhoogt chlorofyl en aminozuren — essentieel voor matcha's umami.",
    group: "Bereiding",
  },
  {
    term: "Tencha-oogst",
    definition:
      "De specifieke handpluk van blaadjes bestemd voor matcha — alleen de jongste 3 blaadjes worden geplukt om tencha te maken.",
    group: "Bereiding",
  },

  // Regio & Herkomst
  {
    term: "Uji",
    alternativeNames: ["宇治"],
    definition:
      "Regio ten zuiden van Kyoto, het historische hart van Japanse matcha. Al 800 jaar bron van premium kwaliteit door uniek klimaat en eeuwen ervaring.",
    group: "Regio & Herkomst",
    relatedLink: { label: "Uji matcha regio", to: "/kennis/uji-matcha-regio" },
  },
  {
    term: "Nishio",
    alternativeNames: ["西尾"],
    definition:
      "Stad in Aichi Prefecture, Japans grootste matcha-producent in volume. Vaak iets lagere prijzen dan Uji voor vergelijkbare kwaliteit.",
    group: "Regio & Herkomst",
  },
  {
    term: "Kagoshima",
    alternativeNames: ["鹿児島"],
    definition:
      "Zuidelijke Japanse prefectuur met moderne theeteelt. Mildere smaakprofielen, vaak toegankelijker geprijsd.",
    group: "Regio & Herkomst",
  },
  {
    term: "Shizuoka",
    alternativeNames: ["静岡"],
    definition:
      "Japans tweede grootste thee-regio, vooral sencha en culinary-grade matcha. Centraal-Japan, met grootschalige productie.",
    group: "Regio & Herkomst",
  },
  {
    term: "Camellia sinensis",
    definition:
      "De wetenschappelijke naam voor de theeplant. Alle 'echte' thee — groene, zwarte, oolong, witte, matcha — komt van deze plant.",
    group: "Regio & Herkomst",
  },

  // Gezondheid & Stoffen
  {
    term: "L-theanine",
    definition:
      "Aminozuur dat bijna uitsluitend in groene thee voorkomt. Verhoogt alfa-hersengolven, geeft 'kalme alertheid' en vertraagt cafeïne-opname. Per kop matcha ~25–30 mg.",
    group: "Gezondheid & Stoffen",
    relatedLink: { label: "Wetenschap achter L-theanine", to: "/blog/ltheanine-wetenschap-matcha" },
  },
  {
    term: "EGCG",
    alternativeNames: ["Epigallocatechin gallaat"],
    definition:
      "Krachtig antioxidant in matcha. Onderzocht voor vetverbranding, hartgezondheid en celbescherming. Matcha bevat tot 137x meer EGCG dan gewone groene thee.",
    group: "Gezondheid & Stoffen",
  },
  {
    term: "Catechines",
    definition:
      "Verzamelnaam voor de antioxidant-stoffen in groene thee (waaronder EGCG, EGC, ECG). Verantwoordelijk voor veel van matcha's gezondheidseffecten.",
    group: "Gezondheid & Stoffen",
  },
  {
    term: "Cafeïne in matcha",
    definition:
      "Een standaard kop matcha (2 g) bevat ~60–70 mg cafeïne — iets minder dan filterkoffie maar door L-theanine veel langduriger werkend (4–6 uur).",
    group: "Gezondheid & Stoffen",
    relatedLink: { label: "Matcha cafeïne", to: "/kennis/matcha-cafeine" },
  },
  {
    term: "Chlorofyl",
    definition:
      "De groene plantenstof verantwoordelijk voor matcha's helder jadegroene kleur. Verhoogd door beschaduwing voor de oogst. Werkt ook als mild ontgiftend antioxidant.",
    group: "Gezondheid & Stoffen",
  },
  {
    term: "Umami",
    definition:
      "De 'vijfde smaak' — hartig, vol, savoury. In matcha komt umami voort uit aminozuren (vooral L-theanine en glutaminezuur) die door beschaduwing toenemen.",
    group: "Gezondheid & Stoffen",
  },

  // Cultuur
  {
    term: "Chanoyu",
    alternativeNames: ["茶の湯", "Japanse theeceremonie"],
    definition:
      "De geritualiseerde Japanse theeceremonie. Niet alleen thee zetten — een meditatieve oefening met 500 jaar geschiedenis. Vier principes: wa (harmonie), kei (respect), sei (zuiverheid), jaku (rust).",
    group: "Cultuur",
    relatedLink: { label: "Theeceremonie uitgelegd", to: "/kennis/japanse-theeceremonie-chanoyu" },
  },
  {
    term: "Sadō",
    alternativeNames: ["茶道", "chadō", "de weg van de thee"],
    definition: "Andere naam voor de Japanse theeceremonie, met nadruk op het pad/de discipline van de theekunst.",
    group: "Cultuur",
  },
  {
    term: "Wabi-sabi",
    definition:
      "Japanse esthetiek van eenvoud, imperfectie en vergankelijkheid. Diepgaand verbonden met de theeceremonie en het ontwerp van chashitsu en chadōgu.",
    group: "Cultuur",
  },
  {
    term: "Chashitsu",
    alternativeNames: ["茶室"],
    definition:
      "De traditionele theekamer — bewust klein (4,5 tatami mat) en eenvoudig. Heeft een lage ingang (nijiriguchi) waardoor gasten moeten buigen.",
    group: "Cultuur",
  },
  {
    term: "Sen no Rikyū",
    definition:
      "16e-eeuws theemeester (1522–1591) die de Japanse theeceremonie zoals we die kennen perfectioneerde. Formuleerde de vier kernprincipes wa-kei-sei-jaku.",
    group: "Cultuur",
  },
  {
    term: "Wagashi",
    alternativeNames: ["和菓子"],
    definition:
      "Traditionele Japanse zoetigheden, vaak geserveerd vóór de bittere matcha in een ceremonie om de smaakbalans te creëren.",
    group: "Cultuur",
  },
  {
    term: "Eisai",
    definition:
      "Zen-monnik (1141–1215) die matcha in de 12e eeuw vanuit China naar Japan bracht. Schreef het eerste Japanse theeboek 'Kissa Yōjōki' ('Thee drinken voor gezondheid').",
    group: "Cultuur",
  },
  {
    term: "Roji",
    definition:
      "De tuinpad dat naar het theehuis leidt. Symbolische overgang van de dagelijkse wereld naar de meditatieve theeruimte.",
    group: "Cultuur",
  },
  {
    term: "Tokonoma",
    definition:
      "Alkove in de theekamer waar een hangrol (kakemono) en bloemstuk worden geplaatst — beide aangepast aan het seizoen en de gasten.",
    group: "Cultuur",
  },
];
