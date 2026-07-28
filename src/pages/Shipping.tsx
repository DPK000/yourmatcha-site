import PageHero from "@/components/PageHero";
import { Truck, Package, RotateCcw, Clock, MapPin, ShieldCheck } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import SEO from "@/components/SEO";
import { useLang } from "@/i18n";

type RateRow = { country: string; rate: string; time: string };

const COPY = {
  nl: {
    seoTitle: "Verzending & retouren — Gratis bezorging vanaf €35",
    seoDescription:
      "Bestel je matcha vandaag, ontvang 'm morgen. Gratis verzending vanaf €35, zorgvuldig verpakt, 30 dagen retour, track & trace.",
    seoKeywords: "matcha verzendkosten, gratis verzending matcha, levertijd matcha, matcha retourneren",
    heroEyebrow: "Verzending & Retour",
    heroTitle: "Snel, veilig en duurzaam",
    heroSubtitle:
      "Alles wat je moet weten over hoe we jouw matcha bij je thuis bezorgen — en wat je kunt doen als iets niet klopt.",
    items: [
      { title: "Gratis verzending", text: "Bij elke bestelling boven €35." },
      { title: "Snelle levering", text: "Verzonden binnen 1 werkdag, ontvangen in 1–2 dagen." },
      { title: "Zorgvuldig verpakt", text: "Volledig recyclebare verpakking, geen plastic vulling." },
      { title: "30 dagen retour", text: "Niet tevreden? Meld je retour binnen 30 dagen — geld terug." },
      { title: "Track & trace", text: "Direct na verzending ontvang je een volgnummer per mail." },
      { title: "100% verzekerd", text: "Elk pakket is volledig verzekerd tegen verlies of schade." },
    ],
    ratesTitle: "Verzendtarieven",
    thCountry: "Land",
    thRate: "Tarief",
    thTime: "Levertijd",
    rates: [
      { country: "Nederland", rate: "€4,95 (gratis > €35)", time: "1–2 werkdagen" },
      { country: "België", rate: "€4,95 (gratis > €35)", time: "2–3 werkdagen" },
      { country: "Duitsland", rate: "€4,95 (gratis > €35)", time: "3–4 werkdagen" },
      { country: "Frankrijk", rate: "€4,95 (gratis > €35)", time: "3–5 werkdagen" },
      { country: "Noorwegen", rate: "€4,95 (gratis > €35)", time: "4–7 werkdagen" },
    ] as RateRow[],
    returnsTitle: "Retourneren",
    returnsP1:
      "Niet helemaal tevreden? Geen probleem. Je hebt 30 dagen na ontvangst de tijd om je bestelling retour te melden. Ongeopende producten stuur je gewoon terug; heb je de matcha al geproefd en ben je niet tevreden, dan geldt onze niet-goed-geld-teruggarantie.",
    returnsP2a: "Stuur een mail naar ",
    returnsP2b: " en we sturen je een retourlabel. Het bedrag staat binnen 5 werkdagen na ontvangst weer op je rekening.",
  },
  no: {
    seoTitle: "Frakt og retur — Trygg levering til Norge",
    seoDescription:
      "Bestill matchaen din i dag — vi sender innen 1 virkedag. Gratis frakt over 400 kr, omsorgsfullt pakket, 30 dagers åpent kjøp og sporing hele veien.",
    seoKeywords: "matcha fraktkostnader, matcha levering Norge, leveringstid matcha, returnere matcha",
    heroEyebrow: "Frakt og retur",
    heroTitle: "Raskt, trygt og bærekraftig",
    heroSubtitle:
      "Alt du trenger å vite om hvordan vi leverer matchaen hjem til deg — og hva du kan gjøre hvis noe ikke stemmer.",
    items: [
      { title: "Gratis frakt", text: "På alle bestillinger over 400 kr — også til Norge." },
      { title: "Rask levering", text: "Sendt innen 1 virkedag — til Norge er pakken fremme på 4–7 virkedager." },
      { title: "Omsorgsfullt pakket", text: "Fullt gjenvinnbar emballasje, uten plastfyll." },
      { title: "30 dagers åpent kjøp", text: "Ikke fornøyd? Meld retur innen 30 dager — pengene tilbake." },
      { title: "Sporing", text: "Rett etter forsendelse får du et sporingsnummer på e-post." },
      { title: "100 % forsikret", text: "Hver pakke er fullt forsikret mot tap og skade." },
    ],
    ratesTitle: "Fraktpriser",
    thCountry: "Land",
    thRate: "Pris",
    thTime: "Leveringstid",
    rates: [
      { country: "Norge", rate: "59 kr (gratis > 400 kr)", time: "4–7 virkedager" },
      { country: "Nederland", rate: "59 kr (gratis > 400 kr)", time: "1–2 virkedager" },
      { country: "Belgia", rate: "59 kr (gratis > 400 kr)", time: "2–3 virkedager" },
      { country: "Tyskland", rate: "59 kr (gratis > 400 kr)", time: "3–4 virkedager" },
      { country: "Frankrike", rate: "59 kr (gratis > 400 kr)", time: "3–5 virkedager" },
    ] as RateRow[],
    returnsTitle: "Retur",
    returnsP1:
      "Ikke helt fornøyd? Ingen problem. Du har 30 dager fra du mottar bestillingen på å melde retur. Uåpnede produkter sender du bare tilbake; har du allerede smakt matchaen og ikke er fornøyd, gjelder vår fornøyd-eller-pengene-tilbake-garanti.",
    returnsP2a: "Send en e-post til ",
    returnsP2b: ", så sender vi deg en returetikett. Beløpet er tilbake på kontoen din innen 5 virkedager etter at vi har mottatt pakken.",
  },
};

const itemIcons = [Truck, Clock, Package, RotateCcw, MapPin, ShieldCheck];

const Shipping = () => {
  const lang = useLang();
  const c = COPY[lang === "no" ? "no" : "nl"];

  return (
    <>
      <SEO
        title={c.seoTitle}
        description={c.seoDescription}
        canonical="/verzending"
        keywords={c.seoKeywords}
      />
      <PageHero
        eyebrow={c.heroEyebrow}
        title={c.heroTitle}
        subtitle={c.heroSubtitle}
      />
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {c.items.map((it, i) => {
              const Icon = itemIcons[i];
              return (
                <ScrollReveal key={i}>
                  <div className="bg-secondary rounded-2xl p-7 h-full">
                    <Icon className="w-7 h-7 text-primary mb-4" />
                    <h3 className="font-heading text-lg font-semibold mb-2">{it.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{it.text}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          <ScrollReveal>
            <h2 className="font-heading text-3xl font-semibold mb-6">{c.ratesTitle}</h2>
            <div className="overflow-hidden rounded-2xl border border-border">
              <table className="w-full text-sm">
                <thead className="bg-secondary text-left">
                  <tr>
                    <th className="px-5 py-4 font-medium">{c.thCountry}</th>
                    <th className="px-5 py-4 font-medium">{c.thRate}</th>
                    <th className="px-5 py-4 font-medium">{c.thTime}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {c.rates.map(row => (
                    <tr key={row.country}>
                      <td className="px-5 py-4">{row.country}</td>
                      <td className="px-5 py-4">{row.rate}</td>
                      <td className="px-5 py-4">{row.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>

          <ScrollReveal className="mt-16">
            <h2 className="font-heading text-3xl font-semibold mb-4">{c.returnsTitle}</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">{c.returnsP1}</p>
            <p className="text-muted-foreground leading-relaxed">{c.returnsP2a}<a href="mailto:info@yourmatcha.nl" className="text-primary underline">info@yourmatcha.nl</a>{c.returnsP2b}</p>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
};

export default Shipping;
