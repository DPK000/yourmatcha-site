import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { type Lang, getCurrentLang } from "@/i18n";

export interface GlossaryTerm {
  term: string;
  alternativeNames?: string[];
  definition: string;
  /** Topic groups for filtering: bereiding, types, tools, regio, gezondheid, cultuur. */
  group: "Types" | "Tools" | "Bereiding" | "Regio & Herkomst" | "Gezondheid & Stoffen" | "Cultuur";
  relatedLink?: { label: string; to: string };
}

interface GlossaryTranslation {
  term?: string;
  alternativeNames?: string[];
  definition?: string;
  relatedLinkLabel?: string;
}

interface RawGlossaryTerm extends GlossaryTerm {
  i18n?: Partial<Record<Exclude<Lang, "nl">, GlossaryTranslation>>;
}

/** Display labels for the raw `group` enum. Raw value is kept for filtering. */
export const GROUP_TRANSLATIONS: Record<GlossaryTerm["group"], Record<Exclude<Lang, "nl">, string>> = {
  Types: { de: "Sorten", en: "Types", fr: "Types", no: "Typer" },
  Tools: { de: "Werkzeuge", en: "Tools", fr: "Outils", no: "Verktøy" },
  Bereiding: { de: "Zubereitung", en: "Preparation", fr: "Préparation", no: "Tilberedning" },
  "Regio & Herkomst": { de: "Region & Herkunft", en: "Region & Origin", fr: "Région & Origine", no: "Region & opprinnelse" },
  "Gezondheid & Stoffen": { de: "Gesundheit & Stoffe", en: "Health & Compounds", fr: "Santé & Composés", no: "Helse & innholdsstoffer" },
  Cultuur: { de: "Kultur", en: "Culture", fr: "Culture", no: "Kultur" },
};

/** Translate a group label for display only (filtering still uses the raw enum value). */
export function groupLabel(group: GlossaryTerm["group"], lang: Lang): string {
  if (lang === "nl") return group;
  return GROUP_TRANSLATIONS[group]?.[lang] ?? group;
}

function localizeGlossary(g: RawGlossaryTerm, lang: Lang): GlossaryTerm {
  const { i18n: tr, ...base } = g;
  if (lang === "nl" || !tr) return base;
  const t = tr[lang];
  return {
    ...base,
    term: t?.term ?? base.term,
    alternativeNames: t?.alternativeNames ?? base.alternativeNames,
    definition: t?.definition ?? base.definition,
    relatedLink: base.relatedLink
      ? { ...base.relatedLink, label: t?.relatedLinkLabel ?? base.relatedLink.label }
      : base.relatedLink,
  };
}

const glossaryTermsRaw: RawGlossaryTerm[] = [
  // Types
  {
    term: "Matcha",
    definition:
      "Fijngemalen Japanse groene theeblaadjes (Camellia sinensis). Anders dan losse blad-thee drink je het hele blad, waardoor je meer cafeïne, L-theanine en antioxidanten binnenkrijgt.",
    group: "Types",
    relatedLink: { label: "Wat is matcha?", to: "/kennis/wat-is-matcha" },
    i18n: {
      no: {
        definition:
          "Finmalte japanske grønne teblader (Camellia sinensis). I motsetning til løsbladte drikker du hele bladet, slik at du får i deg mer koffein, L-teanin og antioksidanter.",
        relatedLinkLabel: "Hva er matcha?",
      },
    },
  },
  {
    term: "Ceremonial grade",
    definition:
      "De hoogste matcha-kwaliteit, gemaakt van de jongste blaadjes (ichibancha). Bedoeld om puur met water te drinken — zoet, vol umami, geen bitterheid. Prijs €0,50–€1,50 per gram.",
    group: "Types",
    relatedLink: { label: "Ceremonial vs Culinary", to: "/kennis/ceremonial-vs-culinary-matcha" },
    i18n: {
      no: {
        definition:
          "Den høyeste matchakvaliteten, laget av de yngste bladene (ichibancha). Ment å drikkes ren med vann — søt, full av umami, uten bitterhet. Pris €0,50–€1,50 per gram.",
        relatedLinkLabel: "Ceremonial vs Culinary",
      },
    },
  },
  {
    term: "Culinary grade",
    definition:
      "Robuustere matcha-kwaliteit voor lattes, smoothies en bakken. Komt van latere oogsten en is iets robuuster van smaak. Prijs €0,15–€0,50 per gram.",
    group: "Types",
    i18n: {
      no: {
        definition:
          "En mer robust matchakvalitet for latter, smoothier og baking. Kommer fra senere innhøstinger og har en litt kraftigere smak. Pris €0,15–€0,50 per gram.",
      },
    },
  },
  {
    term: "Koicha",
    alternativeNames: ["濃茶", "dikke thee"],
    definition:
      "Dikke, paste-achtige matcha bereiding. ~4 g matcha met slechts 30 ml water. Gedeeld uit één kom in formele theeceremonies. Vereist hoge-kwaliteit ceremonial matcha.",
    group: "Bereiding",
    i18n: {
      no: {
        alternativeNames: ["濃茶", "tykk te"],
        definition:
          "En tykk, pastaaktig matchatilberedning. ~4 g matcha med bare 30 ml vann. Deles fra én skål under formelle teseremonier. Krever ceremonial matcha av høy kvalitet.",
      },
    },
  },
  {
    term: "Usucha",
    alternativeNames: ["薄茶", "dunne thee"],
    definition:
      "De dagelijkse matcha-bereiding. ~2 g matcha met 60–70 ml water, snel opgeklopt met chasen. Dit is wat de meeste mensen 'matcha' noemen.",
    group: "Bereiding",
    i18n: {
      no: {
        alternativeNames: ["薄茶", "tynn te"],
        definition:
          "Den dagligdagse matchatilberedningen. ~2 g matcha med 60–70 ml vann, raskt visket opp med en chasen. Dette er det de fleste kaller «matcha».",
      },
    },
  },
  {
    term: "Hojicha",
    alternativeNames: ["焙茶"],
    definition:
      "Geroosterde Japanse groene thee met nootachtige, karamel-achtige smaak. Bevat slechts 7–15 mg cafeïne per kop — vijf tot tien keer minder dan matcha. Ideaal voor de avond.",
    group: "Types",
    relatedLink: { label: "Hojicha uitleg", to: "/kennis/hojicha-uitleg" },
    i18n: {
      no: {
        definition:
          "Ristet japansk grønn te med en nøtteaktig, karamellaktig smak. Inneholder bare 7–15 mg koffein per kopp — fem til ti ganger mindre enn matcha. Ideell for kvelden.",
        relatedLinkLabel: "Hojicha forklart",
      },
    },
  },
  {
    term: "Genmaicha",
    alternativeNames: ["玄米茶"],
    definition:
      "Japanse groene thee gemengd met geroosterde bruine rijst. Hartig, popcorn-achtig en met slechts ~10 mg cafeïne per kop.",
    group: "Types",
    relatedLink: { label: "Genmaicha gids", to: "/kennis/genmaicha-gids" },
    i18n: {
      no: {
        definition:
          "Japansk grønn te blandet med ristet brun ris. Fyldig, popcornaktig og med bare ~10 mg koffein per kopp.",
        relatedLinkLabel: "Genmaicha-guide",
      },
    },
  },
  {
    term: "Sencha",
    alternativeNames: ["煎茶"],
    definition:
      "De meest gedronken Japanse groene thee — losse blaadjes, gestoomd en gedroogd. Fris, grasachtig, ~30 mg cafeïne per kop.",
    group: "Types",
    i18n: {
      no: {
        definition:
          "Den mest drukne japanske grønne teen — løse blader, dampet og tørket. Frisk, gressaktig, ~30 mg koffein per kopp.",
      },
    },
  },
  {
    term: "Gyokuro",
    alternativeNames: ["玉露"],
    definition:
      "Premium Japanse groene losse-blad thee. Net als matcha 20+ dagen beschaduwd vóór de oogst, wat zorgt voor diepe umami en zoete smaak. Lager bereid dan sencha (50–60 °C).",
    group: "Types",
    i18n: {
      no: {
        definition:
          "Japansk grønn løsbladte av premiumkvalitet. Som matcha skyggelegges den i 20+ dager før innhøsting, noe som gir dyp umami og søt smak. Trekkes ved lavere temperatur enn sencha (50–60 °C).",
      },
    },
  },
  {
    term: "Tencha",
    alternativeNames: ["碾茶"],
    definition:
      "De basis-thee waaruit matcha wordt gemalen. Gestoomde, gedroogde en van stelen ontdane theeblaadjes — klaar om in stenen molens fijngemalen te worden.",
    group: "Types",
    i18n: {
      no: {
        definition:
          "Basisteen som matcha males fra. Dampede, tørkede teblader med stilkene fjernet — klare til å finmales i steinkverner.",
      },
    },
  },
  {
    term: "Matcha latte",
    definition:
      "Matcha gemengd met opgeschuimde melk (vaak haver- of amandelmelk). Romiger en milder dan pure matcha — populair als koffievervanger.",
    group: "Bereiding",
    relatedLink: { label: "Matcha latte maken", to: "/kennis/matcha-latte-maken" },
    i18n: {
      no: {
        definition:
          "Matcha blandet med skummet melk (ofte havre- eller mandelmelk). Kremere og mildere enn ren matcha — populær som kaffeerstatning.",
        relatedLinkLabel: "Lag matcha latte",
      },
    },
  },
  {
    term: "Iced matcha",
    definition:
      "Koude matcha-bereiding, vaak als iced latte. Vereist meer mechanische kracht (shaker, blender) of een speciaal koud-gemalen blend om klontjes te voorkomen.",
    group: "Bereiding",
    relatedLink: { label: "Iced matcha bereiden", to: "/kennis/iced-matcha-bereiden" },
    i18n: {
      no: {
        definition:
          "En kald matchatilberedning, ofte som iskald latte. Krever mer mekanisk kraft (shaker, blender) eller en spesiell kaldmalt blanding for å unngå klumper.",
        relatedLinkLabel: "Tilbered iced matcha",
      },
    },
  },

  // Tools
  {
    term: "Chasen",
    alternativeNames: ["茶筅", "bamboe klopper"],
    definition:
      "Handgesneden bamboe garde met 70 tot 120 fijne tanden. Wordt in M- of W-vorm horizontaal gebruikt om matcha tot fijn schuim te kloppen. Gaat 3 tot 6 maanden bij dagelijks gebruik.",
    group: "Tools",
    relatedLink: { label: "Bekijk chasen", to: "/product/bamboe-chasen" },
    i18n: {
      no: {
        alternativeNames: ["茶筅", "bambusvisp"],
        definition:
          "En håndskåret bambusvisp med 70 til 120 fine tinder. Brukes horisontalt i en M- eller W-bevegelse for å piske matcha til fint skum. Varer 3 til 6 måneder ved daglig bruk.",
        relatedLinkLabel: "Se chasen",
      },
    },
  },
  {
    term: "Chawan",
    alternativeNames: ["茶碗", "matcha kom"],
    definition:
      "De ceremoniële matcha-kom — breed en met ondiepe bodem, zodat de chasen ruimte heeft. Vorm verschilt per seizoen: dieper in winter, lager in zomer.",
    group: "Tools",
    relatedLink: { label: "Bekijk chawan", to: "/product/keramische-matcha-kom" },
    i18n: {
      no: {
        alternativeNames: ["茶碗", "matchaskål"],
        definition:
          "Den seremonielle matchaskålen — bred og med grunn bunn, slik at chasen har plass. Formen varierer med årstidene: dypere om vinteren, lavere om sommeren.",
        relatedLinkLabel: "Se chawan",
      },
    },
  },
  {
    term: "Chashaku",
    alternativeNames: ["茶杓"],
    definition:
      "Lange, smalle bamboe theelepel voor matcha. Twee schepjes ≈ 2 g — de standaard dosering. Vaak met een naam (mei) gegeven door de maker.",
    group: "Tools",
    relatedLink: { label: "Bekijk chashaku", to: "/product/bamboe-chashaku" },
    i18n: {
      no: {
        definition:
          "En lang, smal teskje av bambus for matcha. To skjeer ≈ 2 g — standarddoseringen. Ofte gitt et navn (mei) av lagemakeren.",
        relatedLinkLabel: "Se chashaku",
      },
    },
  },
  {
    term: "Natsume",
    alternativeNames: ["棗"],
    definition:
      "Houten of gelakte theekistje voor usucha-matcha. Vernoemd naar de jujube-vrucht door de gelijkende vorm.",
    group: "Tools",
    i18n: {
      no: {
        definition:
          "En teboks av tre eller lakk for usucha-matcha. Oppkalt etter jujube-frukten på grunn av den lignende formen.",
      },
    },
  },
  {
    term: "Ishi-usu",
    alternativeNames: ["石臼", "stenen molen"],
    definition:
      "Traditionele granieten stenen molen waarmee matcha wordt gemalen. Produceert slechts 30 g per uur — daarom is goede matcha relatief duur.",
    group: "Tools",
    i18n: {
      no: {
        alternativeNames: ["石臼", "steinkvern"],
        definition:
          "En tradisjonell steinkvern av granitt som matcha males med. Produserer bare 30 g i timen — derfor er god matcha relativt dyr.",
      },
    },
  },
  {
    term: "Kusari",
    definition:
      "Een houder of standaard waarop je een chasen rechtop bewaart. Belangrijk voor levensduur — een chasen die plat ligt vervormt sneller.",
    group: "Tools",
    i18n: {
      no: {
        definition:
          "En holder eller stativ der du oppbevarer en chasen stående. Viktig for levetiden — en chasen som ligger flatt mister fasongen raskere.",
      },
    },
  },
  {
    term: "Hishaku",
    alternativeNames: ["柄杓"],
    definition:
      "Lange bamboe waterlepel waarmee tijdens een formele theeceremonie heet water uit de ketel wordt geschept.",
    group: "Tools",
    i18n: {
      no: {
        definition:
          "En lang vannøse av bambus som brukes til å øse varmt vann fra kjelen under en formell teseremoni.",
      },
    },
  },
  {
    term: "Fukusa",
    alternativeNames: ["袱紗"],
    definition:
      "Vierkante zijden doek die in de theeceremonie ritueel wordt gevouwen om tools symbolisch te reinigen.",
    group: "Tools",
    i18n: {
      no: {
        definition:
          "Et firkantet silketøy som under teseremonien brettes rituelt for å rense redskapene symbolsk.",
      },
    },
  },

  // Bereiding
  {
    term: "Ichibancha",
    alternativeNames: ["一番茶", "eerste oogst"],
    definition:
      "De eerste oogst van het jaar, doorgaans in mei. De jongste, meest aromatische blaadjes — met het hoogste L-theanine en chlorofyl. Gebruikt voor premium ceremonial matcha.",
    group: "Bereiding",
    i18n: {
      no: {
        alternativeNames: ["一番茶", "første innhøsting"],
        definition:
          "Årets første innhøsting, vanligvis i mai. De yngste, mest aromatiske bladene — med høyest innhold av L-teanin og klorofyll. Brukes til ceremonial matcha av premiumkvalitet.",
      },
    },
  },
  {
    term: "Nibancha",
    alternativeNames: ["二番茶", "tweede oogst"],
    definition:
      "De tweede oogst, in juni/juli. Robuuster en lagere L-theanine dan ichibancha. Vaak gebruikt voor culinary grade matcha.",
    group: "Bereiding",
    i18n: {
      no: {
        alternativeNames: ["二番茶", "andre innhøsting"],
        definition:
          "Den andre innhøstingen, i juni/juli. Kraftigere og med lavere L-teanin enn ichibancha. Ofte brukt til culinary grade matcha.",
      },
    },
  },
  {
    term: "Sanbancha",
    alternativeNames: ["三番茶", "derde oogst"],
    definition:
      "De derde oogst, in augustus. Voornamelijk gebruikt voor hojicha (roosteren) of cooking-grade producten.",
    group: "Bereiding",
    i18n: {
      no: {
        alternativeNames: ["三番茶", "tredje innhøsting"],
        definition:
          "Den tredje innhøstingen, i august. Brukes hovedsakelig til hojicha (risting) eller produkter av matlagingskvalitet.",
      },
    },
  },
  {
    term: "Tana",
    definition:
      "Het beschaduwingsdoek dat 20 dagen voor de oogst over theeplanten wordt gespannen. Verhoogt chlorofyl en aminozuren — essentieel voor matcha's umami.",
    group: "Bereiding",
    i18n: {
      no: {
        definition:
          "Skyggeleggingsduken som spennes over teplantene 20 dager før innhøsting. Øker klorofyll og aminosyrer — avgjørende for matchaens umami.",
      },
    },
  },
  {
    term: "Tencha-oogst",
    definition:
      "De specifieke handpluk van blaadjes bestemd voor matcha — alleen de jongste 3 blaadjes worden geplukt om tencha te maken.",
    group: "Bereiding",
    i18n: {
      no: {
        term: "Tencha-innhøsting",
        definition:
          "Den spesifikke håndplukkingen av blader beregnet på matcha — kun de tre yngste bladene plukkes for å lage tencha.",
      },
    },
  },

  // Regio & Herkomst
  {
    term: "Uji",
    alternativeNames: ["宇治"],
    definition:
      "Regio ten zuiden van Kyoto, het historische hart van Japanse matcha. Al 800 jaar bron van premium kwaliteit door uniek klimaat en eeuwen ervaring.",
    group: "Regio & Herkomst",
    relatedLink: { label: "Uji matcha regio", to: "/kennis/uji-matcha-regio" },
    i18n: {
      no: {
        definition:
          "En region sør for Kyoto, det historiske hjertet av japansk matcha. I 800 år en kilde til premiumkvalitet takket være et unikt klima og århundrer med erfaring.",
        relatedLinkLabel: "Uji matcha-region",
      },
    },
  },
  {
    term: "Nishio",
    alternativeNames: ["西尾"],
    definition:
      "Stad in Aichi Prefecture, Japans grootste matcha-producent in volume. Vaak iets lagere prijzen dan Uji voor vergelijkbare kwaliteit.",
    group: "Regio & Herkomst",
    i18n: {
      no: {
        definition:
          "En by i Aichi-prefekturet, Japans største matchaprodusent i volum. Ofte litt lavere priser enn Uji for tilsvarende kvalitet.",
      },
    },
  },
  {
    term: "Kagoshima",
    alternativeNames: ["鹿児島"],
    definition:
      "Zuidelijke Japanse prefectuur met moderne theeteelt. Mildere smaakprofielen, vaak toegankelijker geprijsd.",
    group: "Regio & Herkomst",
    i18n: {
      no: {
        definition:
          "Et sørlig japansk prefektur med moderne tedyrking. Mildere smaksprofiler, ofte til en mer tilgjengelig pris.",
      },
    },
  },
  {
    term: "Shizuoka",
    alternativeNames: ["静岡"],
    definition:
      "Japans tweede grootste thee-regio, vooral sencha en culinary-grade matcha. Centraal-Japan, met grootschalige productie.",
    group: "Regio & Herkomst",
    i18n: {
      no: {
        definition:
          "Japans nest største teregion, særlig sencha og culinary grade matcha. Sentralt i Japan, med storskala produksjon.",
      },
    },
  },
  {
    term: "Camellia sinensis",
    definition:
      "De wetenschappelijke naam voor de theeplant. Alle 'echte' thee — groene, zwarte, oolong, witte, matcha — komt van deze plant.",
    group: "Regio & Herkomst",
    i18n: {
      no: {
        definition:
          "Det vitenskapelige navnet på teplanten. All «ekte» te — grønn, svart, oolong, hvit, matcha — kommer fra denne planten.",
      },
    },
  },

  // Gezondheid & Stoffen
  {
    term: "L-theanine",
    definition:
      "Aminozuur dat bijna uitsluitend in groene thee voorkomt. Verhoogt alfa-hersengolven, geeft 'kalme alertheid' en vertraagt cafeïne-opname. Per kop matcha ~25–30 mg.",
    group: "Gezondheid & Stoffen",
    relatedLink: { label: "Wetenschap achter L-theanine", to: "/blog/ltheanine-wetenschap-matcha" },
    i18n: {
      no: {
        term: "L-teanin",
        definition:
          "En aminosyre som nesten utelukkende finnes i grønn te. Øker alfa-hjernebølger, gir «rolig årvåkenhet» og bremser opptaket av koffein. Rundt 25–30 mg per kopp matcha.",
        relatedLinkLabel: "Vitenskapen bak L-teanin",
      },
    },
  },
  {
    term: "EGCG",
    alternativeNames: ["Epigallocatechin gallaat"],
    definition:
      "Krachtig antioxidant in matcha. Onderzocht voor vetverbranding, hartgezondheid en celbescherming. Matcha bevat tot 137x meer EGCG dan gewone groene thee.",
    group: "Gezondheid & Stoffen",
    i18n: {
      no: {
        alternativeNames: ["Epigallokatekingallat"],
        definition:
          "En kraftig antioksidant i matcha. Studert for fettforbrenning, hjertehelse og cellebeskyttelse. Matcha inneholder opptil 137 ganger mer EGCG enn vanlig grønn te.",
      },
    },
  },
  {
    term: "Catechines",
    definition:
      "Verzamelnaam voor de antioxidant-stoffen in groene thee (waaronder EGCG, EGC, ECG). Verantwoordelijk voor veel van matcha's gezondheidseffecten.",
    group: "Gezondheid & Stoffen",
    i18n: {
      no: {
        term: "Katekiner",
        definition:
          "Fellesbetegnelse for antioksidantene i grønn te (deriblant EGCG, EGC, ECG). Ansvarlige for mange av matchaens helseeffekter.",
      },
    },
  },
  {
    term: "Cafeïne in matcha",
    definition:
      "Een standaard kop matcha (2 g) bevat ~60–70 mg cafeïne — iets minder dan filterkoffie maar door L-theanine veel langduriger werkend (4–6 uur).",
    group: "Gezondheid & Stoffen",
    relatedLink: { label: "Matcha cafeïne", to: "/kennis/matcha-cafeine" },
    i18n: {
      no: {
        term: "Koffein i matcha",
        definition:
          "En standard kopp matcha (2 g) inneholder ~60–70 mg koffein — litt mindre enn filterkaffe, men virker mye lengre (4–6 timer) takket være L-teanin.",
        relatedLinkLabel: "Matcha-koffein",
      },
    },
  },
  {
    term: "Chlorofyl",
    definition:
      "De groene plantenstof verantwoordelijk voor matcha's helder jadegroene kleur. Verhoogd door beschaduwing voor de oogst. Werkt ook als mild ontgiftend antioxidant.",
    group: "Gezondheid & Stoffen",
    i18n: {
      no: {
        term: "Klorofyll",
        definition:
          "Det grønne plantestoffet som gir matcha sin klare jadegrønne farge. Økes ved skyggelegging før innhøsting. Virker også som en mild, avgiftende antioksidant.",
      },
    },
  },
  {
    term: "Umami",
    definition:
      "De 'vijfde smaak' — hartig, vol, savoury. In matcha komt umami voort uit aminozuren (vooral L-theanine en glutaminezuur) die door beschaduwing toenemen.",
    group: "Gezondheid & Stoffen",
    i18n: {
      no: {
        definition:
          "Den «femte smaken» — fyldig, full, hjertelig. I matcha stammer umamien fra aminosyrer (særlig L-teanin og glutaminsyre) som øker ved skyggelegging.",
      },
    },
  },

  // Cultuur
  {
    term: "Chanoyu",
    alternativeNames: ["茶の湯", "Japanse theeceremonie"],
    definition:
      "De geritualiseerde Japanse theeceremonie. Niet alleen thee zetten — een meditatieve oefening met 500 jaar geschiedenis. Vier principes: wa (harmonie), kei (respect), sei (zuiverheid), jaku (rust).",
    group: "Cultuur",
    relatedLink: { label: "Theeceremonie uitgelegd", to: "/kennis/japanse-theeceremonie-chanoyu" },
    i18n: {
      no: {
        alternativeNames: ["茶の湯", "japansk teseremoni"],
        definition:
          "Den ritualiserte japanske teseremonien. Ikke bare det å lage te — en meditativ øvelse med 500 års historie. Fire prinsipper: wa (harmoni), kei (respekt), sei (renhet), jaku (ro).",
        relatedLinkLabel: "Teseremonien forklart",
      },
    },
  },
  {
    term: "Sadō",
    alternativeNames: ["茶道", "chadō", "de weg van de thee"],
    definition: "Andere naam voor de Japanse theeceremonie, met nadruk op het pad/de discipline van de theekunst.",
    group: "Cultuur",
    i18n: {
      no: {
        alternativeNames: ["茶道", "chadō", "teens vei"],
        definition: "Et annet navn på den japanske teseremonien, med vekt på veien/disiplinen i tekunsten.",
      },
    },
  },
  {
    term: "Wabi-sabi",
    definition:
      "Japanse esthetiek van eenvoud, imperfectie en vergankelijkheid. Diepgaand verbonden met de theeceremonie en het ontwerp van chashitsu en chadōgu.",
    group: "Cultuur",
    i18n: {
      no: {
        definition:
          "En japansk estetikk om enkelhet, ufullkommenhet og forgjengelighet. Dypt forbundet med teseremonien og utformingen av chashitsu og chadōgu.",
      },
    },
  },
  {
    term: "Chashitsu",
    alternativeNames: ["茶室"],
    definition:
      "De traditionele theekamer — bewust klein (4,5 tatami mat) en eenvoudig. Heeft een lage ingang (nijiriguchi) waardoor gasten moeten buigen.",
    group: "Cultuur",
    i18n: {
      no: {
        definition:
          "Det tradisjonelle terommet — bevisst lite (4,5 tatami-matter) og enkelt. Har en lav inngang (nijiriguchi) som tvinger gjestene til å bøye seg.",
      },
    },
  },
  {
    term: "Sen no Rikyū",
    definition:
      "16e-eeuws theemeester (1522–1591) die de Japanse theeceremonie zoals we die kennen perfectioneerde. Formuleerde de vier kernprincipes wa-kei-sei-jaku.",
    group: "Cultuur",
    i18n: {
      no: {
        definition:
          "En temester fra 1500-tallet (1522–1591) som fullkommengjorde den japanske teseremonien slik vi kjenner den. Formulerte de fire kjerneprinsippene wa-kei-sei-jaku.",
      },
    },
  },
  {
    term: "Wagashi",
    alternativeNames: ["和菓子"],
    definition:
      "Traditionele Japanse zoetigheden, vaak geserveerd vóór de bittere matcha in een ceremonie om de smaakbalans te creëren.",
    group: "Cultuur",
    i18n: {
      no: {
        definition:
          "Tradisjonelle japanske søtsaker, ofte servert før den bitre matchaen i en seremoni for å skape smaksbalanse.",
      },
    },
  },
  {
    term: "Eisai",
    definition:
      "Zen-monnik (1141–1215) die matcha in de 12e eeuw vanuit China naar Japan bracht. Schreef het eerste Japanse theeboek 'Kissa Yōjōki' ('Thee drinken voor gezondheid').",
    group: "Cultuur",
    i18n: {
      no: {
        definition:
          "En zen-munk (1141–1215) som brakte matcha fra Kina til Japan på 1100-tallet. Skrev den første japanske teboken «Kissa Yōjōki» («Å drikke te for helsen»).",
      },
    },
  },
  {
    term: "Roji",
    definition:
      "De tuinpad dat naar het theehuis leidt. Symbolische overgang van de dagelijkse wereld naar de meditatieve theeruimte.",
    group: "Cultuur",
    i18n: {
      no: {
        definition:
          "Hagestien som fører til tehuset. En symbolsk overgang fra den dagligdagse verden til det meditative terommet.",
      },
    },
  },
  {
    term: "Tokonoma",
    definition:
      "Alkove in de theekamer waar een hangrol (kakemono) en bloemstuk worden geplaatst — beide aangepast aan het seizoen en de gasten.",
    group: "Cultuur",
    i18n: {
      no: {
        definition:
          "En alkove i terommet der en hengerull (kakemono) og et blomsteroppsats plasseres — begge tilpasset årstiden og gjestene.",
      },
    },
  },
];

// ─── Public API ──────────────────────────────────────────────

export const glossaryTerms: GlossaryTerm[] = glossaryTermsRaw.map(g => localizeGlossary(g, getCurrentLang()));

export function useGlossaryTerms(): GlossaryTerm[] {
  const { i18n } = useTranslation();
  return useMemo(() => glossaryTermsRaw.map(g => localizeGlossary(g, getCurrentLang())), [i18n.language]);
}
