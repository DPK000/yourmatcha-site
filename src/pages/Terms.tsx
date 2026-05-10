import PageHero from "@/components/PageHero";

const sections = [
  ["Toepasselijkheid", "Deze voorwaarden gelden voor alle bestellingen geplaatst bij YourMatcha B.V., gevestigd te Amsterdam, KvK 12345678."],
  ["Bestellingen & overeenkomst", "Een overeenkomst komt tot stand zodra wij je bestelling per e-mail bevestigen. Wij behouden ons het recht voor bestellingen te weigeren bij gegronde redenen."],
  ["Prijzen", "Alle prijzen zijn in euro's en inclusief btw. Verzendkosten worden afzonderlijk getoond. Wij behouden ons het recht voor prijzen te wijzigen."],
  ["Betaling", "Betaling vooraf via iDEAL, Bancontact, creditcard, Apple/Google Pay of Klarna (achteraf)."],
  ["Levering", "Wij streven naar levering binnen 1–2 werkdagen in NL & BE. Genoemde termijnen zijn indicatief en geen fatale termijnen."],
  ["Herroepingsrecht", "Je hebt 14 dagen bedenktijd na ontvangst om de overeenkomst te ontbinden. Geopende voedingsproducten zijn uitgesloten van retour."],
  ["Garantie", "Op accessoires geldt de wettelijke garantie. Klachten kun je melden via klacht@yourmatcha.nl."],
  ["Aansprakelijkheid", "Onze aansprakelijkheid is beperkt tot het orderbedrag. Wij sluiten aansprakelijkheid voor indirecte schade uit, voor zover wettelijk toegestaan."],
  ["Toepasselijk recht", "Op alle overeenkomsten is Nederlands recht van toepassing. Geschillen worden voorgelegd aan de bevoegde rechter te Amsterdam."],
];

const Terms = () => (
  <>
    <PageHero eyebrow="Algemene Voorwaarden" title="Heldere afspraken" subtitle="De spelregels voor onze samenwerking — geschreven om eerlijk en duidelijk te zijn." />
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl space-y-10">
        {sections.map(([t, d], i) => (
          <div key={i}>
            <h2 className="font-heading text-2xl font-semibold mb-3">{i + 1}. {t}</h2>
            <p className="text-muted-foreground leading-relaxed">{d}</p>
          </div>
        ))}
        <p className="text-xs text-muted-foreground pt-6 border-t border-border">Laatst bijgewerkt: mei 2026</p>
      </div>
    </section>
  </>
);

export default Terms;
