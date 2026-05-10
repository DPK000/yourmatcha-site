import PageHero from "@/components/PageHero";

const sections = [
  ["Welke gegevens verzamelen we?", "Naam, e-mail, adres, betaalgegevens en bestelhistorie. Daarnaast pseudonieme analyticsgegevens om de website te verbeteren."],
  ["Waarvoor gebruiken we ze?", "Om je bestelling te verwerken, te leveren en je service te bieden. Met jouw toestemming sturen we een occasionele nieuwsbrief."],
  ["Hoe lang bewaren we je gegevens?", "Klantgegevens 7 jaar (fiscale verplichting). Marketing- en accountdata zolang je actief bent of toestemming geeft."],
  ["Met wie delen we je gegevens?", "Uitsluitend met partijen die nodig zijn voor de uitvoering: betaaldienst (Mollie), verzendpartner (PostNL/DPD), e-mailtool (Mailchimp). Nooit voor commerciële doorverkoop."],
  ["Jouw rechten", "Inzage, correctie, verwijdering, dataportabiliteit en bezwaar. Mail privacy@yourmatcha.nl en we reageren binnen 14 dagen."],
  ["Cookies", "Functionele cookies altijd; analyse- en marketingcookies alleen na expliciete toestemming via onze cookiebanner."],
];

const Privacy = () => (
  <>
    <PageHero eyebrow="Privacybeleid" title="Jouw data, met respect" subtitle="We gebruiken zo min mogelijk gegevens, alleen waarvoor nodig, en delen niets zonder jouw toestemming." />
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl space-y-10">
        {sections.map(([t, d]) => (
          <div key={t}>
            <h2 className="font-heading text-2xl font-semibold mb-3">{t}</h2>
            <p className="text-muted-foreground leading-relaxed">{d}</p>
          </div>
        ))}
        <p className="text-xs text-muted-foreground pt-6 border-t border-border">Laatst bijgewerkt: mei 2026</p>
      </div>
    </section>
  </>
);

export default Privacy;
