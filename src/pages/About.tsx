import { motion } from "framer-motion";
import aboutHero from "@/assets/about-hero.jpg";
import lifestyle3 from "@/assets/lifestyle-3.jpg";
import { Leaf, Award, Heart } from "lucide-react";

const About = () => (
  <div>
    {/* Hero */}
    <section className="relative h-[50vh] min-h-[400px] flex items-center">
      <div className="absolute inset-0">
        <img src={aboutHero} alt="Matcha bereiding" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-foreground/40" />
      </div>
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-heading text-4xl md:text-6xl font-light text-cream"
        >
          Ons Verhaal
        </motion.h1>
      </div>
    </section>

    {/* Story */}
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-heading text-3xl font-semibold mb-6 text-center">Van Uji naar Jouw Kopje</h2>
          <div className="space-y-5 text-muted-foreground leading-relaxed">
            <p>
              YourMatcha is geboren uit een passie voor de pure, ongeëvenaarde smaak van Japanse matcha.
              Tijdens een reis door de theevelden van Uji — het hart van Japanse theecultuur — ontdekten
              we de bijzondere wereld achter elk kopje matcha.
            </p>
            <p>
              We werken rechtstreeks samen met familietheeboerderijen die al generaties lang de kunst van
              het theetelen beheersen. Onze matcha wordt in het voorjaar geplukt, wanneer de bladeren het
              rijkst zijn aan aminozuren en chlorofyl, en vervolgens langzaam steengemalen tot het fijnste poeder.
            </p>
            <p>
              Ons doel is simpel: de allerbeste matcha toegankelijk maken voor iedereen in Nederland en België.
              Geen compromissen, geen tussenpersonen — gewoon pure, authentieke matcha van boerderij tot kopje.
            </p>
          </div>
        </motion.div>
      </div>
    </section>

    {/* Sourcing */}
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="aspect-[4/3] rounded overflow-hidden">
            <img src={lifestyle3} alt="Theeplantage Japan" className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="font-heading text-3xl font-semibold mb-6">De Uji-Regio</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              De Uji-regio in Kyoto staat al meer dan 800 jaar bekend als het epicentrum van de Japanse
              theecultuur. Het mistige klimaat, de vruchtbare bodem en de nabijheid van de Uji-rivier
              creëren de perfecte omstandigheden voor de allerbeste matcha.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Onze theeboerderijen gebruiken traditionele beschaduwingstechnieken — de theeplanten worden
              weken voor de oogst afgedekt, waardoor het chlorofyl- en L-theaninegehalte stijgt. Dit geeft
              onze matcha zijn kenmerkende levendige groene kleur en zoete, umami-rijke smaak.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* Values */}
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-heading text-3xl font-semibold text-center mb-12">Onze Waarden</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Leaf, title: "Puurheid", desc: "100% biologische matcha zonder toevoegingen. Wat je ziet is wat je krijgt." },
            { icon: Award, title: "Kwaliteit", desc: "Elke batch wordt getest op smaak, kleur en fijnheid voordat het bij jou komt." },
            { icon: Heart, title: "Duurzaamheid", desc: "We ondersteunen duurzame landbouw en eerlijke prijzen voor onze boeren." },
          ].map((val, i) => (
            <motion.div
              key={val.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-8"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-5">
                <val.icon className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-xl font-semibold mb-3">{val.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{val.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default About;
