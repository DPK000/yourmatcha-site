import PageHero from "@/components/PageHero";
import { Truck, Package, RotateCcw, Clock, MapPin, ShieldCheck } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import SEO from "@/components/SEO";
import { useLang } from "@/i18n";

type RateRow = { country: string; rate: string; time: string };

const COPY = {
  nl: {
    seoTitle: "Verzending & retouren - Gratis bezorging vanaf €35",
    seoDescription:
      "Alles over verzending: gratis vanaf €35, bezorgd in 5-7 werkdagen, zorgvuldig verpakt, 30 dagen retour en track & trace.",
    seoKeywords: "matcha verzendkosten, gratis verzending matcha, levertijd matcha, matcha retourneren",
    heroEyebrow: "Verzending & Retour",
    heroTitle: "Snel, veilig en duurzaam",
    heroSubtitle:
      "Alles wat je moet weten over hoe we jouw matcha bij je thuis bezorgen - en wat je kunt doen als iets niet klopt.",
    items: [
      { title: "Gratis verzending", text: "Bij elke bestelling boven €35." },
      { title: "Bezorgd in 5-7 dagen", text: "Levertijd geldt voor alle landen waar we naartoe verzenden." },
      { title: "Zorgvuldig verpakt", text: "Volledig recyclebare verpakking, geen plastic vulling." },
      { title: "30 dagen retour", text: "Niet tevreden? Meld je retour binnen 30 dagen - geld terug." },
      { title: "Track & trace", text: "Direct na verzending ontvang je een volgnummer per mail." },
      { title: "100% verzekerd", text: "Elk pakket is volledig verzekerd tegen verlies of schade." },
    ],
    ratesTitle: "Verzendtarieven",
    thCountry: "Land",
    thRate: "Tarief",
    thTime: "Levertijd",
    rates: [
      { country: "Nederland", rate: "€4,95 (gratis > €35)", time: "5–7 werkdagen" },
      { country: "België", rate: "€4,95 (gratis > €35)", time: "5–7 werkdagen" },
      { country: "Duitsland", rate: "€4,95 (gratis > €35)", time: "5–7 werkdagen" },
      { country: "Frankrijk", rate: "€4,95 (gratis > €35)", time: "5–7 werkdagen" },
      { country: "Noorwegen", rate: "€4,95 (gratis > €35)", time: "5–7 werkdagen" },
    ] as RateRow[],
    returnsTitle: "Retourneren",
    returnsP1:
      "Niet helemaal tevreden? Geen probleem. Je hebt 30 dagen na ontvangst de tijd om je bestelling retour te melden. Ongeopende producten stuur je gewoon terug; heb je de matcha al geproefd en ben je niet tevreden, dan geldt onze niet-goed-geld-teruggarantie.",
    returnsP2a: "Stuur een mail naar ",
    returnsP2b: " en we sturen je een retourlabel. Het bedrag staat binnen 5 werkdagen na ontvangst weer op je rekening.",
  },
  en: {
    seoTitle: "Shipping & returns - Free delivery over €35",
    seoDescription:
      "Everything about shipping: free over €35, delivered in 5-7 working days, carefully packed, 30-day returns and track & trace.",
    seoKeywords: "matcha shipping cost, free shipping matcha, matcha delivery time, return matcha",
    heroEyebrow: "Shipping & Returns",
    heroTitle: "Fast, safe and sustainable",
    heroSubtitle:
      "Everything you need to know about how we get your matcha to your door - and what to do if something is not right.",
    items: [
      { title: "Free shipping", text: "On every order over €35." },
      { title: "Delivered in 5-7 days", text: "The same delivery time applies to every country we ship to." },
      { title: "Carefully packed", text: "Fully recyclable packaging, no plastic filler." },
      { title: "30-day returns", text: "Not happy? Report your return within 30 days - money back." },
      { title: "Track & trace", text: "You get a tracking number by email right after dispatch." },
      { title: "100% insured", text: "Every parcel is fully insured against loss or damage." },
    ],
    ratesTitle: "Shipping rates",
    thCountry: "Country",
    thRate: "Rate",
    thTime: "Delivery time",
    rates: [
      { country: "Netherlands", rate: "€4.95 (free > €35)", time: "5–7 working days" },
      { country: "Belgium", rate: "€4.95 (free > €35)", time: "5–7 working days" },
      { country: "Germany", rate: "€4.95 (free > €35)", time: "5–7 working days" },
      { country: "France", rate: "€4.95 (free > €35)", time: "5–7 working days" },
      { country: "Norway", rate: "€4.95 (free > €35)", time: "5–7 working days" },
    ] as RateRow[],
    returnsTitle: "Returns",
    returnsP1:
      "Not entirely happy? No problem. You have 30 days from receipt to report a return. Unopened products can simply be sent back; if you have already tasted the matcha and are not satisfied, our money-back guarantee applies.",
    returnsP2a: "Send an email to ",
    returnsP2b: " and we will send you a return label. The amount is back in your account within 5 working days of receipt.",
  },
  de: {
    seoTitle: "Versand & Rückgabe - Gratis Lieferung ab €35",
    seoDescription:
      "Alles zum Versand: gratis ab €35, Lieferung in 5-7 Werktagen, sorgfältig verpackt, 30 Tage Rückgaberecht und Sendungsverfolgung.",
    seoKeywords: "Matcha Versandkosten, Gratis Versand Matcha, Matcha Lieferzeit, Matcha zurücksenden",
    heroEyebrow: "Versand & Rückgabe",
    heroTitle: "Schnell, sicher und nachhaltig",
    heroSubtitle:
      "Alles, was du darüber wissen musst, wie dein Matcha zu dir nach Hause kommt - und was du tun kannst, wenn etwas nicht stimmt.",
    items: [
      { title: "Gratis Versand", text: "Bei jeder Bestellung über €35." },
      { title: "Lieferung in 5-7 Tagen", text: "Diese Lieferzeit gilt für alle Länder, in die wir versenden." },
      { title: "Sorgfältig verpackt", text: "Vollständig recycelbare Verpackung, keine Plastikfüllung." },
      { title: "30 Tage Rückgabe", text: "Nicht zufrieden? Melde deine Rückgabe innerhalb von 30 Tagen - Geld zurück." },
      { title: "Sendungsverfolgung", text: "Direkt nach dem Versand erhältst du eine Tracking-Nummer per Mail." },
      { title: "100% versichert", text: "Jedes Paket ist vollständig gegen Verlust oder Schaden versichert." },
    ],
    ratesTitle: "Versandkosten",
    thCountry: "Land",
    thRate: "Preis",
    thTime: "Lieferzeit",
    rates: [
      { country: "Niederlande", rate: "€4,95 (gratis > €35)", time: "5–7 Werktage" },
      { country: "Belgien", rate: "€4,95 (gratis > €35)", time: "5–7 Werktage" },
      { country: "Deutschland", rate: "€4,95 (gratis > €35)", time: "5–7 Werktage" },
      { country: "Frankreich", rate: "€4,95 (gratis > €35)", time: "5–7 Werktage" },
      { country: "Norwegen", rate: "€4,95 (gratis > €35)", time: "5–7 Werktage" },
    ] as RateRow[],
    returnsTitle: "Rückgabe",
    returnsP1:
      "Nicht ganz zufrieden? Kein Problem. Du hast ab Erhalt 30 Tage Zeit, eine Rückgabe zu melden. Ungeöffnete Produkte schickst du einfach zurück; hast du den Matcha bereits probiert und bist nicht zufrieden, gilt unsere Geld-zurück-Garantie.",
    returnsP2a: "Schreib eine Mail an ",
    returnsP2b: " und wir senden dir ein Rücksendeetikett. Der Betrag ist innerhalb von 5 Werktagen nach Erhalt wieder auf deinem Konto.",
  },
  fr: {
    seoTitle: "Livraison & retours - Livraison offerte dès 35 €",
    seoDescription:
      "Tout sur la livraison : offerte dès 35 €, livré en 5 à 7 jours ouvrés, emballage soigné, retour sous 30 jours et suivi de colis.",
    seoKeywords: "frais de livraison matcha, livraison offerte matcha, délai de livraison matcha, retourner matcha",
    heroEyebrow: "Livraison & Retours",
    heroTitle: "Rapide, sûr et durable",
    heroSubtitle:
      "Tout ce qu'il faut savoir sur la façon dont votre matcha arrive chez vous - et que faire si quelque chose ne va pas.",
    items: [
      { title: "Livraison offerte", text: "Pour toute commande de plus de 35 €." },
      { title: "Livré en 5 à 7 jours", text: "Ce délai s'applique à tous les pays que nous desservons." },
      { title: "Emballage soigné", text: "Emballage entièrement recyclable, sans calage plastique." },
      { title: "Retour sous 30 jours", text: "Pas satisfait ? Signalez votre retour sous 30 jours - remboursé." },
      { title: "Suivi de colis", text: "Vous recevez un numéro de suivi par e-mail dès l'expédition." },
      { title: "100% assuré", text: "Chaque colis est entièrement assuré contre la perte ou les dommages." },
    ],
    ratesTitle: "Tarifs de livraison",
    thCountry: "Pays",
    thRate: "Tarif",
    thTime: "Délai",
    rates: [
      { country: "Pays-Bas", rate: "4,95 € (offerte > 35 €)", time: "5–7 jours ouvrés" },
      { country: "Belgique", rate: "4,95 € (offerte > 35 €)", time: "5–7 jours ouvrés" },
      { country: "Allemagne", rate: "4,95 € (offerte > 35 €)", time: "5–7 jours ouvrés" },
      { country: "France", rate: "4,95 € (offerte > 35 €)", time: "5–7 jours ouvrés" },
      { country: "Norvège", rate: "4,95 € (offerte > 35 €)", time: "5–7 jours ouvrés" },
    ] as RateRow[],
    returnsTitle: "Retours",
    returnsP1:
      "Pas entièrement satisfait ? Aucun souci. Vous disposez de 30 jours après réception pour signaler un retour. Les produits non ouverts peuvent simplement être renvoyés ; si vous avez déjà goûté le matcha et n'êtes pas satisfait, notre garantie satisfait ou remboursé s'applique.",
    returnsP2a: "Envoyez un e-mail à ",
    returnsP2b: " et nous vous adressons une étiquette de retour. Le montant est recrédité sous 5 jours ouvrés après réception.",
  },
  no: {
    seoTitle: "Frakt og retur - Gratis frakt over 400 kr",
    seoDescription:
      "Alt om frakt: gratis over 400 kr, levert på 5-7 virkedager, omsorgsfullt pakket, 30 dagers åpent kjøp og sporing hele veien.",
    seoKeywords: "matcha fraktkostnader, matcha levering Norge, leveringstid matcha, returnere matcha",
    heroEyebrow: "Frakt og retur",
    heroTitle: "Raskt, trygt og bærekraftig",
    heroSubtitle:
      "Alt du trenger å vite om hvordan vi leverer matchaen hjem til deg - og hva du kan gjøre hvis noe ikke stemmer.",
    items: [
      { title: "Gratis frakt", text: "På alle bestillinger over 400 kr - også til Norge." },
      { title: "Levert på 5-7 dager", text: "Samme leveringstid gjelder alle landene vi sender til." },
      { title: "Omsorgsfullt pakket", text: "Fullt gjenvinnbar emballasje, uten plastfyll." },
      { title: "30 dagers åpent kjøp", text: "Ikke fornøyd? Meld retur innen 30 dager - pengene tilbake." },
      { title: "Sporing", text: "Rett etter forsendelse får du et sporingsnummer på e-post." },
      { title: "100 % forsikret", text: "Hver pakke er fullt forsikret mot tap og skade." },
    ],
    ratesTitle: "Fraktpriser",
    thCountry: "Land",
    thRate: "Pris",
    thTime: "Leveringstid",
    rates: [
      { country: "Norge", rate: "59 kr (gratis > 400 kr)", time: "5–7 virkedager" },
      { country: "Nederland", rate: "59 kr (gratis > 400 kr)", time: "5–7 virkedager" },
      { country: "Belgia", rate: "59 kr (gratis > 400 kr)", time: "5–7 virkedager" },
      { country: "Tyskland", rate: "59 kr (gratis > 400 kr)", time: "5–7 virkedager" },
      { country: "Frankrike", rate: "59 kr (gratis > 400 kr)", time: "5–7 virkedager" },
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
  const c = COPY[lang] ?? COPY.nl;

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
