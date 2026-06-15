import PageHero from "@/components/PageHero";
import { Truck, Package, RotateCcw, Clock, MapPin, ShieldCheck } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import SEO from "@/components/SEO";
import { useLang } from "@/i18n";

type RateRow = { country: string; rate: string; time: string };

const COPY = {
  nl: {
    seoTitle: "Verzending & retouren — Gratis bezorging in NL en België",
    seoDescription:
      "Bestel je matcha vandaag, ontvang 'm morgen. Gratis verzending vanaf €35 in Nederland en België, zorgvuldig verpakt, 14 dagen retour, track & trace.",
    seoKeywords: "matcha verzendkosten, gratis verzending matcha, levertijd matcha, matcha retourneren",
    heroEyebrow: "Verzending & Retour",
    heroTitle: "Snel, veilig en duurzaam",
    heroSubtitle:
      "Alles wat je moet weten over hoe we jouw matcha bij je thuis bezorgen — en wat je kunt doen als iets niet klopt.",
    items: [
      { title: "Gratis verzending", text: "Boven €35 binnen Nederland en België." },
      { title: "Snelle levering", text: "Verzonden binnen 1 werkdag, ontvangen in 1–2 dagen." },
      { title: "Zorgvuldig verpakt", text: "Volledig recyclebare verpakking, geen plastic vulling." },
      { title: "14 dagen retour", text: "Niet tevreden? Stuur ongeopend retour binnen 14 dagen." },
      { title: "Track & trace", text: "Direct na verzending ontvang je een volgnummer per mail." },
      { title: "100% verzekerd", text: "Elk pakket is volledig verzekerd tegen verlies of schade." },
    ],
    ratesTitle: "Verzendtarieven",
    thCountry: "Land",
    thRate: "Tarief",
    thTime: "Levertijd",
    rates: [
      { country: "Nederland", rate: "€4,95 (gratis > €35)", time: "1–2 werkdagen" },
      { country: "België", rate: "€5,95 (gratis > €35)", time: "2–3 werkdagen" },
      { country: "Duitsland", rate: "€7,95", time: "3–4 werkdagen" },
      { country: "Frankrijk", rate: "€9,95", time: "3–5 werkdagen" },
      { country: "Overig EU", rate: "€12,95", time: "4–7 werkdagen" },
    ] as RateRow[],
    returnsTitle: "Retourneren",
    returnsP1:
      "Niet helemaal tevreden? Geen probleem. Je hebt 14 dagen na ontvangst de tijd om je bestelling ongeopend en in originele staat retour te sturen. Geopende voedingsproducten kunnen we vanwege hygiëneregels niet terugnemen — voor accessoires geldt deze beperking niet.",
    returnsP2a: "Stuur een mail naar ",
    returnsP2b: " en we sturen je een retourlabel. Het bedrag staat binnen 5 werkdagen na ontvangst weer op je rekening.",
  },
  no: {
    seoTitle: "Frakt og retur — Trygg levering til Norge",
    seoDescription:
      "Bestill matchaen din i dag — vi sender innen 1 virkedag. Frakt til Norge for 149 kr, omsorgsfullt pakket, 14 dagers returrett og sporing hele veien.",
    seoKeywords: "matcha fraktkostnader, matcha levering Norge, leveringstid matcha, returnere matcha",
    heroEyebrow: "Frakt og retur",
    heroTitle: "Raskt, trygt og bærekraftig",
    heroSubtitle:
      "Alt du trenger å vite om hvordan vi leverer matchaen hjem til deg — og hva du kan gjøre hvis noe ikke stemmer.",
    items: [
      { title: "Gratis frakt", text: "Over 400 kr innenfor Nederland og Belgia." },
      { title: "Rask levering", text: "Sendt innen 1 virkedag — til Norge er pakken fremme på 4–7 virkedager." },
      { title: "Omsorgsfullt pakket", text: "Fullt gjenvinnbar emballasje, uten plastfyll." },
      { title: "14 dagers returrett", text: "Ikke fornøyd? Returner uåpnet innen 14 dager." },
      { title: "Sporing", text: "Rett etter forsendelse får du et sporingsnummer på e-post." },
      { title: "100 % forsikret", text: "Hver pakke er fullt forsikret mot tap og skade." },
    ],
    ratesTitle: "Fraktpriser",
    thCountry: "Land",
    thRate: "Pris",
    thTime: "Leveringstid",
    rates: [
      { country: "Nederland", rate: "57 kr (gratis > 400 kr)", time: "1–2 virkedager" },
      { country: "Belgia", rate: "68 kr (gratis > 400 kr)", time: "2–3 virkedager" },
      { country: "Tyskland", rate: "91 kr", time: "3–4 virkedager" },
      { country: "Frankrike", rate: "114 kr", time: "3–5 virkedager" },
      { country: "Øvrige EU", rate: "149 kr", time: "4–7 virkedager" },
      { country: "Norge", rate: "149 kr", time: "4–7 virkedager" },
    ] as RateRow[],
    returnsTitle: "Retur",
    returnsP1:
      "Ikke helt fornøyd? Ingen problem. Du har 14 dager fra du mottar bestillingen på å returnere den uåpnet og i original stand. Åpnede matvarer kan vi av hygienehensyn ikke ta i retur — for tilbehør gjelder ikke denne begrensningen.",
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
            <p className="text-muted-foreground leading-relaxed">{c.returnsP2a}<a href="mailto:retour@yourmatcha.nl" className="text-primary underline">retour@yourmatcha.nl</a>{c.returnsP2b}</p>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
};

export default Shipping;
