import PageHero from "@/components/PageHero";
import SEO from "@/components/SEO";
import { useLang } from "@/i18n";

const COPY = {
  nl: {
    eyebrow: "Privacybeleid",
    title: "Jouw data, met respect",
    subtitle: "We gebruiken zo min mogelijk gegevens, alleen waarvoor nodig, en delen niets zonder jouw toestemming.",
    updated: "Laatst bijgewerkt: mei 2026",
    sections: [
      ["Welke gegevens verzamelen we?", "Naam, e-mail, adres, betaalgegevens en bestelhistorie. Daarnaast pseudonieme analyticsgegevens om de website te verbeteren."],
      ["Waarvoor gebruiken we ze?", "Om je bestelling te verwerken, te leveren en je service te bieden. Met jouw toestemming sturen we een occasionele nieuwsbrief."],
      ["Hoe lang bewaren we je gegevens?", "Klantgegevens 7 jaar (fiscale verplichting). Marketing- en accountdata zolang je actief bent of toestemming geeft."],
      ["Met wie delen we je gegevens?", "Uitsluitend met partijen die nodig zijn voor de uitvoering: betaaldienst (Stripe), verzendpartner en hostingdiensten (Supabase, Vercel). Nooit voor commerciële doorverkoop."],
      ["Jouw rechten", "Inzage, correctie, verwijdering, dataportabiliteit en bezwaar. Mail info@yourmatcha.nl en we reageren binnen 14 dagen."],
      ["Cookies", "Functionele cookies altijd; analyse- en marketingcookies alleen na expliciete toestemming via onze cookiebanner."],
    ],
  },
  en: {
    eyebrow: "Privacy policy",
    title: "Your data, treated with respect",
    subtitle: "We collect as little as possible, only what we need, and share nothing without your consent.",
    updated: "Last updated: May 2026",
    sections: [
      ["What data do we collect?", "Name, email, address, payment details and order history. Plus pseudonymised analytics data to improve the website."],
      ["What do we use it for?", "To process and deliver your order and to provide you with support. With your consent we send an occasional newsletter."],
      ["How long do we keep your data?", "Customer records for 7 years (a legal tax requirement). Marketing and account data for as long as you are active or give consent."],
      ["Who do we share your data with?", "Only with parties needed to fulfil your order: payment provider (Stripe), shipping partner and hosting services (Supabase, Vercel). Never for commercial resale."],
      ["Your rights", "Access, correction, deletion, data portability and objection. Email info@yourmatcha.nl and we respond within 14 days."],
      ["Cookies", "Functional cookies always; analytics and marketing cookies only after explicit consent via our cookie banner."],
    ],
  },
  de: {
    eyebrow: "Datenschutzerklärung",
    title: "Deine Daten, mit Respekt behandelt",
    subtitle: "Wir erheben so wenig Daten wie möglich, nur wofür sie nötig sind, und geben nichts ohne deine Einwilligung weiter.",
    updated: "Zuletzt aktualisiert: Mai 2026",
    sections: [
      ["Welche Daten erheben wir?", "Name, E-Mail, Adresse, Zahlungsdaten und Bestellhistorie. Dazu pseudonymisierte Analysedaten zur Verbesserung der Website."],
      ["Wofür nutzen wir sie?", "Um deine Bestellung zu bearbeiten, zu liefern und dir Service zu bieten. Mit deiner Einwilligung senden wir gelegentlich einen Newsletter."],
      ["Wie lange speichern wir deine Daten?", "Kundendaten 7 Jahre (steuerliche Pflicht). Marketing- und Kontodaten so lange, wie du aktiv bist oder einwilligst."],
      ["Mit wem teilen wir deine Daten?", "Ausschließlich mit Parteien, die zur Abwicklung nötig sind: Zahlungsdienst (Stripe), Versandpartner und Hosting-Dienste (Supabase, Vercel). Niemals zum kommerziellen Weiterverkauf."],
      ["Deine Rechte", "Auskunft, Berichtigung, Löschung, Datenübertragbarkeit und Widerspruch. Schreib an info@yourmatcha.nl, wir antworten innerhalb von 14 Tagen."],
      ["Cookies", "Funktionale Cookies immer; Analyse- und Marketing-Cookies nur nach ausdrücklicher Einwilligung über unseren Cookie-Banner."],
    ],
  },
  fr: {
    eyebrow: "Politique de confidentialité",
    title: "Vos données, traitées avec respect",
    subtitle: "Nous collectons le strict minimum, uniquement ce qui est nécessaire, et ne partageons rien sans votre consentement.",
    updated: "Dernière mise à jour : mai 2026",
    sections: [
      ["Quelles données collectons-nous ?", "Nom, e-mail, adresse, informations de paiement et historique de commandes. Ainsi que des données analytiques pseudonymisées pour améliorer le site."],
      ["À quoi servent-elles ?", "À traiter et livrer votre commande et à vous offrir un service client. Avec votre accord, nous envoyons une newsletter occasionnelle."],
      ["Combien de temps les conservons-nous ?", "Les données clients 7 ans (obligation fiscale). Les données marketing et de compte tant que vous êtes actif ou donnez votre consentement."],
      ["Avec qui les partageons-nous ?", "Uniquement avec les parties nécessaires à l'exécution : prestataire de paiement (Stripe), partenaire d'expédition et services d'hébergement (Supabase, Vercel). Jamais pour de la revente commerciale."],
      ["Vos droits", "Accès, rectification, suppression, portabilité et opposition. Écrivez à info@yourmatcha.nl, nous répondons sous 14 jours."],
      ["Cookies", "Cookies fonctionnels toujours ; cookies analytiques et marketing uniquement après consentement explicite via notre bandeau."],
    ],
  },
  no: {
    eyebrow: "Personvernerklæring",
    title: "Dine data, med respekt",
    subtitle: "Vi bruker så lite opplysninger som mulig, kun til det som er nødvendig, og deler ingenting uten ditt samtykke.",
    updated: "Sist oppdatert: mai 2026",
    sections: [
      ["Hvilke opplysninger samler vi inn?", "Navn, e-post, adresse, betalingsopplysninger og bestillingshistorikk. I tillegg pseudonymiserte analysedata for å forbedre nettsiden."],
      ["Hva bruker vi dem til?", "Til å behandle og levere bestillingen din og gi deg god kundeservice. Med ditt samtykke sender vi et nyhetsbrev fra tid til annen."],
      ["Hvor lenge lagrer vi opplysningene dine?", "Kundeopplysninger i 7 år (lovpålagt etter nederlandsk skattelovgivning). Markedsførings- og kontodata så lenge du er aktiv eller gir samtykke."],
      ["Hvem deler vi opplysningene dine med?", "Kun med parter som er nødvendige for gjennomføringen: betalingstjeneste (Stripe), fraktpartner og driftstjenester (Supabase, Vercel). Aldri for kommersielt videresalg."],
      ["Dine rettigheter", "Innsyn, retting, sletting, dataportabilitet og innsigelse. Send e-post til info@yourmatcha.nl, så svarer vi innen 14 dager."],
      ["Informasjonskapsler (cookies)", "Funksjonelle informasjonskapsler brukes alltid; analyse- og markedsføringskapsler kun etter uttrykkelig samtykke via cookiebanneret vårt."],
    ],
  },
} as const;

const Privacy = () => {
  const lang = useLang();
  const copy = COPY[lang] ?? COPY.nl;
  return (
    <>
      <SEO
        title={copy.eyebrow}
        description={copy.subtitle}
        canonical="/privacy"
      />
      <PageHero eyebrow={copy.eyebrow} title={copy.title} subtitle={copy.subtitle} />
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl space-y-10">
          {copy.sections.map(([t, d]) => (
            <div key={t}>
              <h2 className="font-heading text-2xl font-semibold mb-3">{t}</h2>
              <p className="text-muted-foreground leading-relaxed">{d}</p>
            </div>
          ))}
          <p className="text-xs text-muted-foreground pt-6 border-t border-border">{copy.updated}</p>
        </div>
      </section>
    </>
  );
};

export default Privacy;
