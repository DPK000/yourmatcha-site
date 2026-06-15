import { motion } from "framer-motion";
import aboutHero from "@/assets/about-hero.jpg";
import lifestyle3 from "@/assets/lifestyle-3.jpg";
import { Leaf, Award, Heart } from "lucide-react";
import SEO from "@/components/SEO";
import { useLang } from "@/i18n";

const COPY = {
  nl: {
    seoTitle: "Over YourMatcha — Het verhaal achter onze ceremoniële matcha uit Uji",
    seoDescription:
      "Ontdek het verhaal van YourMatcha: single-origin ceremoniële matcha direct van familieboerderijen in Uji en Kagoshima. Eerlijke handel, biologische teelt, oprecht Japans vakmanschap.",
    seoKeywords:
      "over yourmatcha, ceremoniële matcha Japan, single origin matcha, matcha uit Uji, Japanse matcha boer, direct trade matcha",
    heroAlt: "Matcha bereiding",
    heroTitle: "Ons Verhaal",
    storyTitle: "Van Uji naar Jouw Kopje",
    storyP1:
      "YourMatcha is geboren uit een passie voor de pure, ongeëvenaarde smaak van Japanse matcha. Tijdens een reis door de theevelden van Uji — het hart van Japanse theecultuur — ontdekten we de bijzondere wereld achter elk kopje matcha.",
    storyP2:
      "We werken rechtstreeks samen met familietheeboerderijen die al generaties lang de kunst van het theetelen beheersen. Onze matcha wordt in het voorjaar geplukt, wanneer de bladeren het rijkst zijn aan aminozuren en chlorofyl, en vervolgens langzaam steengemalen tot het fijnste poeder.",
    storyP3:
      "Ons doel is simpel: de allerbeste matcha toegankelijk maken voor iedereen in Nederland en België. Geen compromissen, geen tussenpersonen — gewoon pure, authentieke matcha van boerderij tot kopje.",
    sourcingAlt: "Theeplantage Japan",
    sourcingTitle: "De Uji-Regio",
    sourcingP1:
      "De Uji-regio in Kyoto staat al meer dan 800 jaar bekend als het epicentrum van de Japanse theecultuur. Het mistige klimaat, de vruchtbare bodem en de nabijheid van de Uji-rivier creëren de perfecte omstandigheden voor de allerbeste matcha.",
    sourcingP2:
      "Onze theeboerderijen gebruiken traditionele beschaduwingstechnieken — de theeplanten worden weken voor de oogst afgedekt, waardoor het chlorofyl- en L-theaninegehalte stijgt. Dit geeft onze matcha zijn kenmerkende levendige groene kleur en zoete, umami-rijke smaak.",
    valuesTitle: "Onze Waarden",
    values: [
      { title: "Puurheid", desc: "100% biologische matcha zonder toevoegingen. Wat je ziet is wat je krijgt." },
      { title: "Kwaliteit", desc: "Elke batch wordt getest op smaak, kleur en fijnheid voordat het bij jou komt." },
      { title: "Duurzaamheid", desc: "We ondersteunen duurzame landbouw en eerlijke prijzen voor onze boeren." },
    ],
  },
  no: {
    seoTitle: "Om YourMatcha — Historien bak vår seremonielle matcha fra Uji",
    seoDescription:
      "Bli kjent med historien bak YourMatcha: single origin seremoniell matcha direkte fra familiegårder i Uji og Kagoshima. Rettferdig handel, økologisk dyrking og ekte japansk håndverk.",
    seoKeywords:
      "om yourmatcha, seremoniell matcha Japan, single origin matcha, matcha fra Uji, japansk matchabonde, direct trade matcha",
    heroAlt: "Tilberedning av matcha",
    heroTitle: "Vår historie",
    storyTitle: "Fra Uji til din kopp",
    storyP1:
      "YourMatcha ble til av en lidenskap for den rene, uovertrufne smaken av japansk matcha. På en reise gjennom temarkene i Uji — hjertet av japansk tekultur — oppdaget vi den helt spesielle verdenen som skjuler seg bak hver kopp matcha.",
    storyP2:
      "Vi samarbeider direkte med familiedrevne tegårder som har mestret tedyrkingens kunst i generasjoner. Matchaen vår høstes om våren, når bladene er på sitt rikeste på aminosyrer og klorofyll, før den males langsomt på steinkvern til det aller fineste pulveret.",
    storyP3:
      "Målet vårt er enkelt: å gjøre den aller beste matchaen tilgjengelig for alle. Ingen kompromisser, ingen mellomledd — bare ren, autentisk matcha fra gård til kopp.",
    sourcingAlt: "Teplantasje i Japan",
    sourcingTitle: "Uji-regionen",
    sourcingP1:
      "Uji-regionen i Kyoto har i over 800 år vært kjent som episenteret for japansk tekultur. Det tåkete klimaet, den fruktbare jorden og nærheten til Uji-elven skaper perfekte forhold for matcha i verdensklasse.",
    sourcingP2:
      "Tegårdene våre bruker tradisjonelle skyggeteknikker — teplantene dekkes til i ukene før innhøsting, slik at innholdet av klorofyll og L-theanin øker. Det gir matchaen vår den karakteristiske, livlige grønnfargen og den søte, umamirike smaken.",
    valuesTitle: "Våre verdier",
    values: [
      { title: "Renhet", desc: "100 % økologisk matcha uten tilsetninger. Det du ser, er det du får." },
      { title: "Kvalitet", desc: "Hver batch testes på smak, farge og finhet før den når deg." },
      { title: "Bærekraft", desc: "Vi støtter bærekraftig jordbruk og rettferdige priser for bøndene våre." },
    ],
  },
};

const valueIcons = [Leaf, Award, Heart];

const About = () => {
  const lang = useLang();
  const c = COPY[lang === "no" ? "no" : "nl"];

  return (
    <div>
      <SEO
        title={c.seoTitle}
        description={c.seoDescription}
        canonical="/over-ons"
        keywords={c.seoKeywords}
      />
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center">
        <div className="absolute inset-0">
          <img src={aboutHero} alt={c.heroAlt} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-foreground/40" />
        </div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-4xl md:text-6xl font-light text-cream"
          >
            {c.heroTitle}
          </motion.h1>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-heading text-3xl font-semibold mb-6 text-center">{c.storyTitle}</h2>
            <div className="space-y-5 text-muted-foreground leading-relaxed">
              <p>{c.storyP1}</p>
              <p>{c.storyP2}</p>
              <p>{c.storyP3}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sourcing */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="aspect-[4/3] rounded overflow-hidden">
              <img src={lifestyle3} alt={c.sourcingAlt} className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="font-heading text-3xl font-semibold mb-6">{c.sourcingTitle}</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">{c.sourcingP1}</p>
              <p className="text-muted-foreground leading-relaxed">{c.sourcingP2}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-semibold text-center mb-12">{c.valuesTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {c.values.map((val, i) => {
              const Icon = valueIcons[i];
              return (
                <motion.div
                  key={val.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center p-8"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-5">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold mb-3">{val.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{val.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
