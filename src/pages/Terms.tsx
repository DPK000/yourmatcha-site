import PageHero from "@/components/PageHero";
import SEO from "@/components/SEO";
import { useLang } from "@/i18n";

const COPY = {
  nl: {
    eyebrow: "Algemene Voorwaarden",
    title: "Heldere afspraken",
    subtitle: "De spelregels voor onze samenwerking - geschreven om eerlijk en duidelijk te zijn.",
    updated: "Laatst bijgewerkt: mei 2026",
    sections: [
      ["Toepasselijkheid", "Deze voorwaarden gelden voor alle bestellingen geplaatst bij YourMatcha B.V., gevestigd te Amsterdam, KvK 12345678."],
      ["Bestellingen & overeenkomst", "Een overeenkomst komt tot stand zodra wij je bestelling per e-mail bevestigen. Wij behouden ons het recht voor bestellingen te weigeren bij gegronde redenen."],
      ["Prijzen", "Alle prijzen zijn inclusief btw. Verzendkosten worden afzonderlijk getoond. Wij behouden ons het recht voor prijzen te wijzigen."],
      ["Betaling", "Betaling vooraf via iDEAL, creditcard of Apple/Google Pay - veilig verwerkt door Stripe."],
      ["Levering", "Wij streven naar levering binnen 5-7 werkdagen. Genoemde termijnen zijn indicatief en geen fatale termijnen."],
      ["Herroepingsrecht", "Je hebt wettelijk 14 dagen bedenktijd na ontvangst - bij YourMatcha vrijwillig verlengd tot 30 dagen. Voor geopende voedingsproducten geldt onze niet-goed-geld-teruggarantie."],
      ["Garantie", "Op accessoires geldt de wettelijke garantie. Klachten kun je melden via info@yourmatcha.nl."],
      ["Aansprakelijkheid", "Onze aansprakelijkheid is beperkt tot het orderbedrag. Wij sluiten aansprakelijkheid voor indirecte schade uit, voor zover wettelijk toegestaan."],
      ["Toepasselijk recht", "Op alle overeenkomsten is Nederlands recht van toepassing. Geschillen worden voorgelegd aan de bevoegde rechter te Amsterdam."],
    ],
  },
  en: {
    eyebrow: "Terms & Conditions",
    title: "Clear agreements",
    subtitle: "The ground rules for working together - written to be fair and readable.",
    updated: "Last updated: May 2026",
    sections: [
      ["Scope", "These terms apply to all orders placed with YourMatcha B.V., registered in Amsterdam, Dutch Chamber of Commerce no. 12345678."],
      ["Orders & agreement", "An agreement is formed once we confirm your order by email. We reserve the right to refuse orders on reasonable grounds."],
      ["Prices", "All prices include VAT. Shipping costs are shown separately. We reserve the right to change prices."],
      ["Payment", "Payment in advance by iDEAL, credit card or Apple/Google Pay - securely processed by Stripe."],
      ["Delivery", "We aim to deliver within 5-7 working days. Stated timeframes are indicative and not binding deadlines."],
      ["Right of withdrawal", "You have a statutory 14-day cooling-off period after receipt - voluntarily extended to 30 days at YourMatcha. For opened food products our money-back guarantee applies."],
      ["Warranty", "Statutory warranty applies to accessories. Complaints can be reported via info@yourmatcha.nl."],
      ["Liability", "Our liability is limited to the order amount. We exclude liability for indirect damage, as far as legally permitted."],
      ["Governing law", "Dutch law applies to all agreements. Disputes are submitted to the competent court in Amsterdam."],
    ],
  },
  de: {
    eyebrow: "Allgemeine Geschäftsbedingungen",
    title: "Klare Absprachen",
    subtitle: "Die Spielregeln für unsere Zusammenarbeit - fair und verständlich formuliert.",
    updated: "Zuletzt aktualisiert: Mai 2026",
    sections: [
      ["Geltungsbereich", "Diese Bedingungen gelten für alle Bestellungen bei YourMatcha B.V. mit Sitz in Amsterdam, niederländisches Handelsregister Nr. 12345678."],
      ["Bestellungen & Vertrag", "Ein Vertrag kommt zustande, sobald wir deine Bestellung per E-Mail bestätigen. Wir behalten uns vor, Bestellungen aus sachlichem Grund abzulehnen."],
      ["Preise", "Alle Preise verstehen sich inklusive Mehrwertsteuer. Versandkosten werden separat ausgewiesen. Preisänderungen bleiben vorbehalten."],
      ["Zahlung", "Vorkasse per iDEAL, Kreditkarte oder Apple/Google Pay - sicher abgewickelt über Stripe."],
      ["Lieferung", "Wir liefern in der Regel innerhalb von 5-7 Werktagen. Genannte Fristen sind Richtwerte und keine verbindlichen Termine."],
      ["Widerrufsrecht", "Du hast ein gesetzliches Widerrufsrecht von 14 Tagen nach Erhalt - bei YourMatcha freiwillig auf 30 Tage verlängert. Für geöffnete Lebensmittel gilt unsere Geld-zurück-Garantie."],
      ["Gewährleistung", "Für Zubehör gilt die gesetzliche Gewährleistung. Reklamationen bitte an info@yourmatcha.nl."],
      ["Haftung", "Unsere Haftung ist auf den Bestellwert begrenzt. Eine Haftung für mittelbare Schäden schließen wir aus, soweit gesetzlich zulässig."],
      ["Anwendbares Recht", "Auf alle Verträge ist niederländisches Recht anwendbar. Streitigkeiten werden dem zuständigen Gericht in Amsterdam vorgelegt."],
    ],
  },
  fr: {
    eyebrow: "Conditions générales",
    title: "Des accords clairs",
    subtitle: "Les règles du jeu de notre collaboration - rédigées pour être justes et lisibles.",
    updated: "Dernière mise à jour : mai 2026",
    sections: [
      ["Champ d'application", "Ces conditions s'appliquent à toutes les commandes passées auprès de YourMatcha B.V., établie à Amsterdam, registre du commerce néerlandais n° 12345678."],
      ["Commandes et contrat", "Le contrat est conclu dès que nous confirmons votre commande par e-mail. Nous nous réservons le droit de refuser une commande pour motif légitime."],
      ["Prix", "Tous les prix s'entendent TVA comprise. Les frais de livraison sont indiqués séparément. Nous nous réservons le droit de modifier les prix."],
      ["Paiement", "Paiement à l'avance par iDEAL, carte bancaire ou Apple/Google Pay - traité en toute sécurité par Stripe."],
      ["Livraison", "Nous visons une livraison sous 5 à 7 jours ouvrés. Les délais indiqués sont indicatifs et non contraignants."],
      ["Droit de rétractation", "Vous disposez d'un délai légal de rétractation de 14 jours après réception - volontairement étendu à 30 jours chez YourMatcha. Pour les denrées alimentaires ouvertes, notre garantie satisfait ou remboursé s'applique."],
      ["Garantie", "La garantie légale s'applique aux accessoires. Les réclamations peuvent être signalées via info@yourmatcha.nl."],
      ["Responsabilité", "Notre responsabilité est limitée au montant de la commande. Nous excluons toute responsabilité pour les dommages indirects, dans la mesure permise par la loi."],
      ["Droit applicable", "Le droit néerlandais s'applique à tous les contrats. Les litiges sont soumis au tribunal compétent d'Amsterdam."],
    ],
  },
  no: {
    eyebrow: "Salgsbetingelser",
    title: "Klare avtaler",
    subtitle: "Spillereglene for vårt samarbeid - skrevet for å være ærlige og tydelige.",
    updated: "Sist oppdatert: mai 2026",
    sections: [
      ["Anvendelse", "Disse betingelsene gjelder for alle bestillinger hos YourMatcha B.V., med forretningsadresse i Amsterdam, registrert i det nederlandske handelsregisteret (KvK) med nummer 12345678."],
      ["Bestillinger og avtale", "En avtale inngås så snart vi bekrefter bestillingen din per e-post. Vi forbeholder oss retten til å avvise bestillinger ved saklig grunn."],
      ["Priser", "Alle priser på yourmatcha.com er oppgitt inkludert mva. Fraktkostnader vises separat. Vi forbeholder oss retten til å endre priser."],
      ["Betaling", "Forskuddsbetaling med kort eller Apple/Google Pay - trygt behandlet av Stripe."],
      ["Levering", "Levering tar vanligvis 5-7 virkedager. Oppgitte leveringstider er veiledende og ikke bindende frister."],
      ["Angrerett", "Du har lovfestet 14 dagers angrerett etter mottak - hos YourMatcha frivillig utvidet til 30 dagers åpent kjøp. For åpnede næringsmidler gjelder vår fornøyd-eller-pengene-tilbake-garanti."],
      ["Garanti", "For tilbehør gjelder den lovbestemte reklamasjonsretten. Klager kan meldes via info@yourmatcha.nl."],
      ["Ansvar", "Vårt ansvar er begrenset til ordrebeløpet. Vi fraskriver oss ansvar for indirekte tap, så langt loven tillater det."],
      ["Lovvalg", "Nederlandsk rett gjelder for alle avtaler. Tvister bringes inn for kompetent domstol i Amsterdam."],
    ],
  },
} as const;

const Terms = () => {
  const lang = useLang();
  const copy = COPY[lang] ?? COPY.nl;
  return (
    <>
      <SEO
        title={copy.eyebrow}
        description={copy.subtitle}
        canonical="/voorwaarden"
      />
      <PageHero eyebrow={copy.eyebrow} title={copy.title} subtitle={copy.subtitle} />
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl space-y-10">
          {copy.sections.map(([t, d], i) => (
            <div key={i}>
              <h2 className="font-heading text-2xl font-semibold mb-3">{i + 1}. {t}</h2>
              <p className="text-muted-foreground leading-relaxed">{d}</p>
            </div>
          ))}
          <p className="text-xs text-muted-foreground pt-6 border-t border-border">{copy.updated}</p>
        </div>
      </section>
    </>
  );
};

export default Terms;
