import PageHero from "@/components/PageHero";
import SEO from "@/components/SEO";
import { useLang } from "@/i18n";

const COPY = {
  nl: {
    eyebrow: "Algemene Voorwaarden",
    title: "Heldere afspraken",
    subtitle: "De spelregels voor onze samenwerking — geschreven om eerlijk en duidelijk te zijn.",
    updated: "Laatst bijgewerkt: mei 2026",
    sections: [
      ["Toepasselijkheid", "Deze voorwaarden gelden voor alle bestellingen geplaatst bij YourMatcha B.V., gevestigd te Amsterdam, KvK 12345678."],
      ["Bestellingen & overeenkomst", "Een overeenkomst komt tot stand zodra wij je bestelling per e-mail bevestigen. Wij behouden ons het recht voor bestellingen te weigeren bij gegronde redenen."],
      ["Prijzen", "Alle prijzen zijn in euro's en inclusief btw. Verzendkosten worden afzonderlijk getoond. Wij behouden ons het recht voor prijzen te wijzigen."],
      ["Betaling", "Betaling vooraf via iDEAL, creditcard of Apple/Google Pay — veilig verwerkt door Stripe."],
      ["Levering", "Wij streven naar levering binnen 1–2 werkdagen in NL & BE. Genoemde termijnen zijn indicatief en geen fatale termijnen."],
      ["Herroepingsrecht", "Je hebt wettelijk 14 dagen bedenktijd na ontvangst — bij YourMatcha vrijwillig verlengd tot 30 dagen. Voor geopende voedingsproducten geldt onze niet-goed-geld-teruggarantie."],
      ["Garantie", "Op accessoires geldt de wettelijke garantie. Klachten kun je melden via info@yourmatcha.nl."],
      ["Aansprakelijkheid", "Onze aansprakelijkheid is beperkt tot het orderbedrag. Wij sluiten aansprakelijkheid voor indirecte schade uit, voor zover wettelijk toegestaan."],
      ["Toepasselijk recht", "Op alle overeenkomsten is Nederlands recht van toepassing. Geschillen worden voorgelegd aan de bevoegde rechter te Amsterdam."],
    ],
  },
  no: {
    eyebrow: "Salgsbetingelser",
    title: "Klare avtaler",
    subtitle: "Spillereglene for vårt samarbeid — skrevet for å være ærlige og tydelige.",
    updated: "Sist oppdatert: mai 2026",
    sections: [
      ["Anvendelse", "Disse betingelsene gjelder for alle bestillinger hos YourMatcha B.V., med forretningsadresse i Amsterdam, registrert i det nederlandske handelsregisteret (KvK) med nummer 12345678."],
      ["Bestillinger og avtale", "En avtale inngås så snart vi bekrefter bestillingen din per e-post. Vi forbeholder oss retten til å avvise bestillinger ved saklig grunn."],
      ["Priser", "Alle priser på yourmatcha.no er oppgitt i norske kroner (NOK) og inkluderer mva. Fraktkostnader vises separat. Vi forbeholder oss retten til å endre priser."],
      ["Betaling", "Forskuddsbetaling med kort eller Apple/Google Pay — trygt behandlet av Stripe."],
      ["Levering", "Vi sender innen 1 virkedag. Levering til Norge tar vanligvis 4–7 virkedager, til Nederland og Belgia 1–2 virkedager. Oppgitte leveringstider er veiledende og ikke bindende frister."],
      ["Angrerett", "Du har lovfestet 14 dagers angrerett etter mottak — hos YourMatcha frivillig utvidet til 30 dagers åpent kjøp. For åpnede næringsmidler gjelder vår fornøyd-eller-pengene-tilbake-garanti."],
      ["Garanti", "For tilbehør gjelder den lovbestemte reklamasjonsretten. Klager kan meldes via info@yourmatcha.nl."],
      ["Ansvar", "Vårt ansvar er begrenset til ordrebeløpet. Vi fraskriver oss ansvar for indirekte tap, så langt loven tillater det."],
      ["Lovvalg", "Nederlandsk rett gjelder for alle avtaler. Tvister bringes inn for kompetent domstol i Amsterdam."],
    ],
  },
} as const;

const Terms = () => {
  const lang = useLang();
  const copy = lang === "no" ? COPY.no : COPY.nl;
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
