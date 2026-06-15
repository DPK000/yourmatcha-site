import PageHero from "@/components/PageHero";
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
      ["Met wie delen we je gegevens?", "Uitsluitend met partijen die nodig zijn voor de uitvoering: betaaldienst (Mollie), verzendpartner (PostNL/DPD), e-mailtool (Mailchimp). Nooit voor commerciële doorverkoop."],
      ["Jouw rechten", "Inzage, correctie, verwijdering, dataportabiliteit en bezwaar. Mail privacy@yourmatcha.nl en we reageren binnen 14 dagen."],
      ["Cookies", "Functionele cookies altijd; analyse- en marketingcookies alleen na expliciete toestemming via onze cookiebanner."],
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
      ["Hvem deler vi opplysningene dine med?", "Kun med parter som er nødvendige for gjennomføringen: betalingstjeneste (Mollie), fraktpartner (PostNL/DPD), e-postverktøy (Mailchimp). Aldri for kommersielt videresalg."],
      ["Dine rettigheter", "Innsyn, retting, sletting, dataportabilitet og innsigelse. Send e-post til privacy@yourmatcha.nl, så svarer vi innen 14 dager."],
      ["Informasjonskapsler (cookies)", "Funksjonelle informasjonskapsler brukes alltid; analyse- og markedsføringskapsler kun etter uttrykkelig samtykke via cookiebanneret vårt."],
    ],
  },
} as const;

const Privacy = () => {
  const lang = useLang();
  const copy = lang === "no" ? COPY.no : COPY.nl;
  return (
    <>
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
