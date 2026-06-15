import PageHero from "@/components/PageHero";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import ScrollReveal from "@/components/ScrollReveal";
import SEO from "@/components/SEO";
import { useLang } from "@/i18n";

type FaqSection = { title: string; items: [string, string][] };

const sectionsNl: FaqSection[] = [
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

const sectionsNo: FaqSection[] = [
  {
    title: "Produkter og kvalitet",
    items: [
      ["Hva er forskjellen på ceremonial og culinary matcha?", "Ceremonial grade lages av de yngste og mykeste tebladene og er ment å nytes ren, kun pisket med vann. Culinary grade har en mer robust smak og passer perfekt til latte, smoothies og baking."],
      ["Hvor kommer matchaen deres fra?", "Matchaen vår kommer direkte fra Uji (Kyoto) og Kagoshima — to av Japans mest anerkjente teregioner. Vi samarbeider direkte med familiegårder som vi besøker personlig."],
      ["Er matchaen deres økologisk?", "Ja. All matchaen vår er sertifisert økologisk (EU-Bio og JAS) og dyrkes uten sprøytemidler eller kunstgjødsel."],
      ["Hvordan oppbevarer jeg matcha best?", "Kjølig, mørkt og lufttett. Etter åpning anbefaler vi å drikke opp matchaen innen 4–6 uker for den mest livlige fargen og smaken."],
    ],
  },
  {
    title: "Frakt og levering",
    items: [
      ["Hvor raskt får jeg bestillingen min?", "Vi sender innen 1 virkedag. Til Norge er pakken vanligvis fremme i løpet av 4–7 virkedager."],
      ["Hva koster frakten?", "Frakt til Norge koster 149 kr. Innenfor Nederland og Belgia starter frakten på 57 kr, og over 400 kr sender vi gratis dit."],
      ["Sender dere også internasjonalt?", "Ja — vi sender innenfor hele EU og til Norge. Bor du et annet sted? Send oss en melding, så gir vi deg et skreddersydd tilbud."],
    ],
  },
  {
    title: "Bestilling og retur",
    items: [
      ["Kan jeg endre eller kansellere bestillingen min?", "Ta kontakt innen 2 timer etter at du har bestilt. Etter det er pakken som regel allerede på vei."],
      ["Hva er returvilkårene deres?", "Uåpnede produkter kan returneres innen 14 dager. Åpnede matvarer tar vi av hygienehensyn ikke i retur."],
      ["Hvordan kan jeg betale?", "Kredittkort, Apple Pay, Google Pay, iDEAL, Bancontact og fakturabetaling via Klarna."],
    ],
  },
  {
    title: "Abonnement",
    items: [
      ["Hvordan fungerer et abonnement?", "Du velger en rytme (hver 2., 4. eller 6. uke). Matchaen kommer automatisk i posten, og du sparer 15 %. Du kan pause eller si opp når som helst."],
      ["Kan jeg endre abonnementet mitt?", "Ja — bytt produkt, frekvens eller leveringsadresse når som helst via kontoen din."],
    ],
  },
];

const buildFaqSchema = (sections: FaqSection[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: sections.flatMap(s =>
    s.items.map(([q, a]) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    }))
  ),
});

const COPY = {
  nl: {
    sections: sectionsNl,
    faqSchema: buildFaqSchema(sectionsNl),
    seoTitle: "Veelgestelde vragen over matcha — bereiding, kwaliteit, verzending",
    seoDescription:
      "Alle antwoorden over ceremoniële matcha kopen: verschil ceremonial vs culinary, bereiding, bewaren, verzending in NL & BE, retourbeleid en abonnementen.",
    seoKeywords: "matcha veelgestelde vragen, ceremonial vs culinary matcha, matcha bewaren, matcha bereiden, matcha kwaliteit",
    heroEyebrow: "Veelgestelde Vragen",
    heroTitle: "Goed om te weten",
    heroSubtitle: "Antwoorden op de meest gestelde vragen. Staat jouw vraag er niet bij? Neem gerust contact op.",
  },
  no: {
    sections: sectionsNo,
    faqSchema: buildFaqSchema(sectionsNo),
    seoTitle: "Ofte stilte spørsmål om matcha — tilberedning, kvalitet, frakt",
    seoDescription:
      "Alle svar om kjøp av seremoniell matcha: forskjellen på ceremonial og culinary, tilberedning, oppbevaring, frakt til Norge, returvilkår og abonnement.",
    seoKeywords: "matcha ofte stilte spørsmål, ceremonial vs culinary matcha, oppbevare matcha, tilberede matcha, matcha kvalitet",
    heroEyebrow: "Ofte stilte spørsmål",
    heroTitle: "Godt å vite",
    heroSubtitle: "Svar på spørsmålene vi får oftest. Finner du ikke det du lurer på? Ta gjerne kontakt med oss.",
  },
};

const FAQ = () => {
  const lang = useLang();
  const c = COPY[lang === "no" ? "no" : "nl"];

  return (
    <>
      <SEO
        title={c.seoTitle}
        description={c.seoDescription}
        canonical="/faq"
        keywords={c.seoKeywords}
        jsonLd={c.faqSchema}
      />
      <PageHero
        eyebrow={c.heroEyebrow}
        title={c.heroTitle}
        subtitle={c.heroSubtitle}
      />
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl space-y-14">
          {c.sections.map(section => (
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
};

export default FAQ;
