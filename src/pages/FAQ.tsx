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
      ["Waar komt jullie matcha vandaan?", "Onze matcha is fijn steengemalen groene thee in Japanse stijl. Het poeder is levendig groen, zacht van smaak en geschikt om puur te kloppen én voor lattes, smoothies en gebak."],
      ["Wat is het verschil tussen de zak en de glazen pot?", "De inhoud is hetzelfde: 100 gram matcha. De hersluitbare aromazak is de voordeligste keuze; de glazen voorraadpot houdt licht en vocht beter buiten, waardoor kleur en smaak langer behouden blijven."],
      ["Hoe lang doe ik met 100 gram matcha?", "Bij twee gram per kop haal je er zo'n vijftig kopjes uit - ruim anderhalve maand als je dagelijks drinkt."],
      ["Hoe bewaar ik matcha het beste?", "Koel, donker en luchtdicht. Na opening adviseren we de matcha binnen 4-6 weken op te drinken voor de meest levendige kleur en smaak."],
    ],
  },
  {
    title: "Verzending & Levering",
    items: [
      ["Hoe snel wordt mijn bestelling geleverd?", "Je bestelling is doorgaans binnen 5-7 werkdagen bij je, met track & trace."],
      ["Wat zijn de verzendkosten?", "Standaard verzending kost €4,95. Boven €35 verzenden we gratis."],
      ["Verzenden jullie ook internationaal?", "Ja, we verzenden binnen de EU en naar Noorwegen. De levertijd is overal 5-7 werkdagen."],
    ],
  },
  {
    title: "Bestellen & Retour",
    items: [
      ["Kan ik mijn bestelling wijzigen of annuleren?", "Neem binnen 2 uur na bestelling contact op. Daarna is je pakket meestal al in behandeling."],
      ["Wat is jullie retourbeleid?", "Je hebt 30 dagen bedenktijd. Ongeopende producten stuur je gewoon terug; voor geopende matcha geldt onze niet-goed-geld-teruggarantie."],
      ["Hoe kan ik betalen?", "Veilig via Stripe: creditcard, Apple Pay en Google Pay."],
    ],
  },
  {
    title: "Abonnementen",
    items: [
      ["Hoe werkt een abonnement?", "Je kiest een plan en ontvangt elke maand automatisch je matcha, met 15% korting en gratis verzending. Je kunt op elk moment pauzeren of stoppen."],
      ["Kan ik mijn abonnement aanpassen?", "Ja - één e-mail is genoeg om van plan te wisselen, te pauzeren of te stoppen. Geen opzegtermijn."],
    ],
  },
];

const sectionsEn: FaqSection[] = [
  {
    title: "Products & Quality",
    items: [
      ["Where does your matcha come from?", "Our matcha is finely stone-ground green tea in the Japanese style. The powder is vividly green, mild in flavour and suitable both for whisking pure and for lattes, smoothies and baking."],
      ["What is the difference between the pouch and the glass jar?", "The contents are the same: 100 grams of matcha. The resealable aroma pouch is the better value; the glass storage jar keeps out light and moisture better, so colour and flavour last longer."],
      ["How long does 100 grams of matcha last?", "At two grams per cup you get around fifty cups - a good month and a half if you drink it daily."],
      ["How should I store matcha?", "Cool, dark and airtight. After opening we recommend drinking it within 4-6 weeks for the most vivid colour and flavour."],
    ],
  },
  {
    title: "Shipping & Delivery",
    items: [
      ["How quickly is my order delivered?", "Your order usually arrives within 5-7 working days, with track & trace."],
      ["What are the shipping costs?", "Standard shipping costs €4.95. Over €35 we ship free."],
      ["Do you ship internationally?", "Yes, we ship within the EU and to Norway. Delivery takes 5-7 working days everywhere."],
    ],
  },
  {
    title: "Ordering & Returns",
    items: [
      ["Can I change or cancel my order?", "Get in touch within 2 hours of ordering. After that your parcel is usually already being processed."],
      ["What is your returns policy?", "You have 30 days to change your mind. Unopened products can simply be returned; for opened matcha our money-back guarantee applies."],
      ["How can I pay?", "Securely via Stripe: credit card, Apple Pay and Google Pay."],
    ],
  },
  {
    title: "Subscriptions",
    items: [
      ["How does a subscription work?", "You pick a plan and receive your matcha automatically every month, with 15% off and free shipping. You can pause or cancel at any time."],
      ["Can I change my subscription?", "Yes - one email is enough to switch plans, pause or cancel. No notice period."],
    ],
  },
];

const sectionsDe: FaqSection[] = [
  {
    title: "Produkte & Qualität",
    items: [
      ["Woher kommt euer Matcha?", "Unser Matcha ist fein steingemahlener Grüntee nach japanischer Art. Das Pulver ist leuchtend grün, mild im Geschmack und eignet sich zum puren Aufschlagen ebenso wie für Lattes, Smoothies und Gebäck."],
      ["Was ist der Unterschied zwischen Beutel und Glas?", "Der Inhalt ist derselbe: 100 Gramm Matcha. Der wiederverschließbare Aromabeutel ist die günstigere Wahl; das Vorratsglas hält Licht und Feuchtigkeit besser fern, sodass Farbe und Geschmack länger erhalten bleiben."],
      ["Wie lange reichen 100 Gramm Matcha?", "Bei zwei Gramm pro Tasse ergibt das rund fünfzig Tassen - gut anderthalb Monate bei täglichem Genuss."],
      ["Wie lagere ich Matcha am besten?", "Kühl, dunkel und luftdicht. Nach dem Öffnen empfehlen wir, ihn innerhalb von 4-6 Wochen zu verbrauchen, für die lebendigste Farbe und den besten Geschmack."],
    ],
  },
  {
    title: "Versand & Lieferung",
    items: [
      ["Wie schnell wird meine Bestellung geliefert?", "Deine Bestellung ist in der Regel innerhalb von 5-7 Werktagen bei dir, mit Sendungsverfolgung."],
      ["Was kostet der Versand?", "Der Standardversand kostet €4,95. Ab €35 versenden wir gratis."],
      ["Versendet ihr auch international?", "Ja, wir versenden innerhalb der EU und nach Norwegen. Die Lieferzeit beträgt überall 5-7 Werktage."],
    ],
  },
  {
    title: "Bestellung & Rückgabe",
    items: [
      ["Kann ich meine Bestellung ändern oder stornieren?", "Melde dich innerhalb von 2 Stunden nach der Bestellung. Danach ist dein Paket meist schon in Bearbeitung."],
      ["Wie sieht eure Rückgaberegelung aus?", "Du hast 30 Tage Bedenkzeit. Ungeöffnete Produkte schickst du einfach zurück; für geöffneten Matcha gilt unsere Geld-zurück-Garantie."],
      ["Wie kann ich bezahlen?", "Sicher über Stripe: Kreditkarte, Apple Pay und Google Pay."],
    ],
  },
  {
    title: "Abo",
    items: [
      ["Wie funktioniert ein Abo?", "Du wählst einen Plan und erhältst deinen Matcha jeden Monat automatisch, mit 15% Rabatt und Gratisversand. Du kannst jederzeit pausieren oder kündigen."],
      ["Kann ich mein Abo anpassen?", "Ja - eine E-Mail genügt, um den Plan zu wechseln, zu pausieren oder zu kündigen. Ohne Kündigungsfrist."],
    ],
  },
];

const sectionsFr: FaqSection[] = [
  {
    title: "Produits & Qualité",
    items: [
      ["D'où vient votre matcha ?", "Notre matcha est un thé vert finement moulu à la meule de pierre, à la japonaise. La poudre est d'un vert vif, douce en bouche et convient aussi bien au fouettage pur qu'aux lattes, smoothies et pâtisseries."],
      ["Quelle différence entre le sachet et le bocal ?", "Le contenu est identique : 100 grammes de matcha. Le sachet aromatique refermable est le plus économique ; le bocal en verre protège mieux de la lumière et de l'humidité, préservant plus longtemps la couleur et la saveur."],
      ["Combien de temps dure 100 grammes de matcha ?", "À deux grammes par tasse, cela représente une cinquantaine de tasses - un bon mois et demi à raison d'une par jour."],
      ["Comment conserver le matcha ?", "Au frais, à l'abri de la lumière et hermétiquement. Après ouverture, nous conseillons de le consommer sous 4 à 6 semaines pour une couleur et une saveur optimales."],
    ],
  },
  {
    title: "Livraison",
    items: [
      ["Sous quel délai ma commande est-elle livrée ?", "Votre commande arrive généralement sous 5 à 7 jours ouvrés, avec suivi de colis."],
      ["Quels sont les frais de livraison ?", "La livraison standard coûte 4,95 €. Au-delà de 35 €, elle est offerte."],
      ["Livrez-vous à l'international ?", "Oui, nous livrons dans l'UE et en Norvège. Le délai est partout de 5 à 7 jours ouvrés."],
    ],
  },
  {
    title: "Commande & Retours",
    items: [
      ["Puis-je modifier ou annuler ma commande ?", "Contactez-nous dans les 2 heures suivant la commande. Ensuite, votre colis est généralement déjà en préparation."],
      ["Quelle est votre politique de retour ?", "Vous disposez de 30 jours pour changer d'avis. Les produits non ouverts peuvent être renvoyés ; pour le matcha ouvert, notre garantie satisfait ou remboursé s'applique."],
      ["Comment puis-je payer ?", "En toute sécurité via Stripe : carte bancaire, Apple Pay et Google Pay."],
    ],
  },
  {
    title: "Abonnements",
    items: [
      ["Comment fonctionne un abonnement ?", "Vous choisissez une formule et recevez votre matcha automatiquement chaque mois, avec 15% de réduction et la livraison offerte. Vous pouvez mettre en pause ou résilier à tout moment."],
      ["Puis-je modifier mon abonnement ?", "Oui - un e-mail suffit pour changer de formule, mettre en pause ou résilier. Sans préavis."],
    ],
  },
];

const sectionsNo: FaqSection[] = [
  {
    title: "Produkter og kvalitet",
    items: [
      ["Hvor kommer matchaen deres fra?", "Matchaen vår er finmalt grønn te i japansk stil. Pulveret er levende grønt, mildt på smak og egner seg både til å vispe rent og til latte, smoothier og bakverk."],
      ["Hva er forskjellen på posen og glasset?", "Innholdet er det samme: 100 gram matcha. Den gjenlukkbare aromaposen er det rimeligste valget; oppbevaringsglasset holder lys og fuktighet bedre unna, slik at farge og smak bevares lenger."],
      ["Hvor lenge varer 100 gram matcha?", "Med to gram per kopp gir det rundt femti kopper - godt og vel halvannen måned hvis du drikker daglig."],
      ["Hvordan oppbevarer jeg matcha best?", "Kjølig, mørkt og lufttett. Etter åpning anbefaler vi å drikke den opp innen 4-6 uker for den mest levende fargen og smaken."],
    ],
  },
  {
    title: "Frakt og levering",
    items: [
      ["Hvor raskt blir bestillingen levert?", "Bestillingen din er vanligvis hos deg innen 5-7 virkedager, med sporing."],
      ["Hva koster frakten?", "Standard frakt koster 59 kr. Over 400 kr sender vi gratis."],
      ["Sender dere internasjonalt?", "Ja, vi sender innenfor EU og til Norge. Leveringstiden er 5-7 virkedager overalt."],
    ],
  },
  {
    title: "Bestilling og retur",
    items: [
      ["Kan jeg endre eller avbestille?", "Ta kontakt innen 2 timer etter bestilling. Etter det er pakken vanligvis allerede under behandling."],
      ["Hva er returvilkårene deres?", "Du har 30 dagers åpent kjøp. Uåpnede produkter sender du bare tilbake; for åpnet matcha gjelder vår fornøyd-eller-pengene-tilbake-garanti."],
      ["Hvordan kan jeg betale?", "Trygt via Stripe: kort, Apple Pay og Google Pay."],
    ],
  },
  {
    title: "Abonnement",
    items: [
      ["Hvordan fungerer et abonnement?", "Du velger en plan og får matchaen automatisk hver måned, med 15 % rabatt og gratis frakt. Du kan sette på pause eller avslutte når som helst."],
      ["Kan jeg endre abonnementet mitt?", "Ja - én e-post er nok for å bytte plan, sette på pause eller avslutte. Ingen oppsigelsestid."],
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
    seoTitle: "Veelgestelde vragen over matcha - bereiding, kwaliteit, verzending",
    seoDescription:
      "Alle antwoorden over matcha kopen: zak of glazen pot, bereiding, bewaren, verzending, retourbeleid en abonnementen.",
    seoKeywords: "matcha veelgestelde vragen, matcha bewaren, matcha bereiden, matcha kwaliteit, matcha verzending",
    heroEyebrow: "Veelgestelde Vragen",
    heroTitle: "Goed om te weten",
    heroSubtitle: "Antwoorden op de meest gestelde vragen. Staat jouw vraag er niet bij? Neem gerust contact op.",
  },
  en: {
    sections: sectionsEn,
    faqSchema: buildFaqSchema(sectionsEn),
    seoTitle: "Frequently asked questions about matcha - preparation, quality, shipping",
    seoDescription:
      "All the answers about buying matcha: pouch or glass jar, preparation, storage, shipping, returns and subscriptions.",
    seoKeywords: "matcha faq, storing matcha, preparing matcha, matcha quality, matcha shipping",
    heroEyebrow: "Frequently asked questions",
    heroTitle: "Good to know",
    heroSubtitle: "Answers to the questions we get most. Cannot find yours? Just get in touch.",
  },
  de: {
    sections: sectionsDe,
    faqSchema: buildFaqSchema(sectionsDe),
    seoTitle: "Häufige Fragen zu Matcha - Zubereitung, Qualität, Versand",
    seoDescription:
      "Alle Antworten rund um den Matcha-Kauf: Beutel oder Glas, Zubereitung, Lagerung, Versand, Rückgabe und Abo.",
    seoKeywords: "Matcha FAQ, Matcha lagern, Matcha zubereiten, Matcha Qualität, Matcha Versand",
    heroEyebrow: "Häufige Fragen",
    heroTitle: "Gut zu wissen",
    heroSubtitle: "Antworten auf die häufigsten Fragen. Deine ist nicht dabei? Melde dich einfach.",
  },
  fr: {
    sections: sectionsFr,
    faqSchema: buildFaqSchema(sectionsFr),
    seoTitle: "Questions fréquentes sur le matcha - préparation, qualité, livraison",
    seoDescription:
      "Toutes les réponses sur l'achat de matcha : sachet ou bocal, préparation, conservation, livraison, retours et abonnements.",
    seoKeywords: "faq matcha, conserver le matcha, préparer le matcha, qualité matcha, livraison matcha",
    heroEyebrow: "Questions fréquentes",
    heroTitle: "Bon à savoir",
    heroSubtitle: "Les réponses aux questions qu'on nous pose le plus. La vôtre n'y est pas ? Écrivez-nous.",
  },
  no: {
    sections: sectionsNo,
    faqSchema: buildFaqSchema(sectionsNo),
    seoTitle: "Ofte stilte spørsmål om matcha - tilberedning, kvalitet, frakt",
    seoDescription:
      "Alle svar om kjøp av matcha: pose eller glass, tilberedning, oppbevaring, frakt, returvilkår og abonnement.",
    seoKeywords: "matcha ofte stilte spørsmål, oppbevare matcha, tilberede matcha, matcha kvalitet, matcha frakt",
    heroEyebrow: "Ofte stilte spørsmål",
    heroTitle: "Godt å vite",
    heroSubtitle: "Svar på spørsmålene vi får oftest. Finner du ikke det du lurer på? Ta gjerne kontakt med oss.",
  },
};

const FAQ = () => {
  const lang = useLang();
  const c = COPY[lang] ?? COPY.nl;

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
