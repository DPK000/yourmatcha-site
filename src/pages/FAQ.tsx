import PageHero from "@/components/PageHero";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import ScrollReveal from "@/components/ScrollReveal";

const sections = [
  {
    title: "Producten & Kwaliteit",
    items: [
      ["Wat is het verschil tussen ceremonial en culinary matcha?", "Ceremonial grade is gemaakt van de jongste, zachtste theeblaadjes en bedoeld om puur met water te drinken. Culinary grade heeft een robuustere smaak en is ideaal voor lattes, smoothies en bakken."],
      ["Waar komt jullie matcha vandaan?", "Onze matcha komt rechtstreeks uit Uji (Kyoto) en Kagoshima — twee van de meest gerenommeerde theeregio's van Japan. We werken direct met familieboerderijen die we persoonlijk bezoeken."],
      ["Is jullie matcha biologisch?", "Ja. Al onze matcha is gecertificeerd biologisch (EU-Bio en JAS) en wordt geteeld zonder pesticiden of kunstmest."],
      ["Hoe bewaar ik matcha het beste?", "Koel, donker en luchtdicht. Na opening adviseren we de matcha binnen 4–6 weken op te drinken voor de meest levendige kleur en smaak."],
    ],
  },
  {
    title: "Verzending & Levering",
    items: [
      ["Hoe snel wordt mijn bestelling geleverd?", "We versturen binnen 1 werkdag. In Nederland en België ben je doorgaans binnen 1–2 werkdagen voorzien."],
      ["Wat zijn de verzendkosten?", "Standaard verzending kost €4,95. Boven €35 verzenden we gratis binnen NL en BE."],
      ["Verzenden jullie ook internationaal?", "Momenteel verzenden we binnen de EU. Buiten de EU? Stuur ons een bericht voor een offerte op maat."],
    ],
  },
  {
    title: "Bestellen & Retour",
    items: [
      ["Kan ik mijn bestelling wijzigen of annuleren?", "Neem binnen 2 uur na bestelling contact op. Daarna is je pakket meestal al onderweg."],
      ["Wat is jullie retourbeleid?", "Ongeopende producten kunnen binnen 14 dagen retour. Geopende voedingsproducten nemen we vanwege hygiëne niet retour."],
      ["Hoe kan ik betalen?", "iDEAL, Bancontact, creditcard, Apple Pay, Google Pay en achteraf betalen via Klarna."],
    ],
  },
  {
    title: "Abonnementen",
    items: [
      ["Hoe werkt een abonnement?", "Je kiest een ritme (elke 2, 4 of 6 weken). Je ontvangt automatisch je matcha en bespaart 15%. Je kunt op elk moment pauzeren of opzeggen."],
      ["Kan ik mijn abonnement aanpassen?", "Ja — wijzig product, frequentie of bezorgadres op elk moment via je account."],
    ],
  },
];

const FAQ = () => (
  <>
    <PageHero
      eyebrow="Veelgestelde Vragen"
      title="Goed om te weten"
      subtitle="Antwoorden op de meest gestelde vragen. Staat jouw vraag er niet bij? Neem gerust contact op."
    />
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl space-y-14">
        {sections.map(section => (
          <ScrollReveal key={section.title}>
            <h2 className="font-heading text-2xl md:text-3xl font-semibold mb-6">{section.title}</h2>
            <Accordion type="single" collapsible className="w-full">
              {section.items.map(([q, a], i) => (
                <AccordionItem key={i} value={`${section.title}-${i}`} className="border-border/60">
                  <AccordionTrigger className="text-left font-medium hover:no-underline hover:text-primary py-5">{q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">{a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </ScrollReveal>
        ))}
      </div>
    </section>
  </>
);

export default FAQ;
