import PageHero from "@/components/PageHero";
import { Truck, Package, RotateCcw, Clock, MapPin, ShieldCheck } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import SEO from "@/components/SEO";

const Shipping = () => {
  const items = [
    { icon: Truck, title: "Gratis verzending", text: "Boven €35 binnen Nederland en België." },
    { icon: Clock, title: "Snelle levering", text: "Verzonden binnen 1 werkdag, ontvangen in 1–2 dagen." },
    { icon: Package, title: "Zorgvuldig verpakt", text: "Volledig recyclebare verpakking, geen plastic vulling." },
    { icon: RotateCcw, title: "14 dagen retour", text: "Niet tevreden? Stuur ongeopend retour binnen 14 dagen." },
    { icon: MapPin, title: "Track & trace", text: "Direct na verzending ontvang je een volgnummer per mail." },
    { icon: ShieldCheck, title: "100% verzekerd", text: "Elk pakket is volledig verzekerd tegen verlies of schade." },
  ];

  return (
    <>
      <SEO
        title="Verzending & retouren — Gratis bezorging in NL en België"
        description="Bestel je matcha vandaag, ontvang 'm morgen. Gratis verzending vanaf €35 in Nederland en België, zorgvuldig verpakt, 14 dagen retour, track & trace."
        canonical="/verzending"
        keywords="matcha verzendkosten, gratis verzending matcha, levertijd matcha, matcha retourneren"
      />
      <PageHero
        eyebrow="Verzending & Retour"
        title="Snel, veilig en duurzaam"
        subtitle="Alles wat je moet weten over hoe we jouw matcha bij je thuis bezorgen — en wat je kunt doen als iets niet klopt."
      />
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {items.map((it, i) => (
              <ScrollReveal key={i}>
                <div className="bg-secondary rounded-2xl p-7 h-full">
                  <it.icon className="w-7 h-7 text-primary mb-4" />
                  <h3 className="font-heading text-lg font-semibold mb-2">{it.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{it.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <h2 className="font-heading text-3xl font-semibold mb-6">Verzendtarieven</h2>
            <div className="overflow-hidden rounded-2xl border border-border">
              <table className="w-full text-sm">
                <thead className="bg-secondary text-left">
                  <tr>
                    <th className="px-5 py-4 font-medium">Land</th>
                    <th className="px-5 py-4 font-medium">Tarief</th>
                    <th className="px-5 py-4 font-medium">Levertijd</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr><td className="px-5 py-4">Nederland</td><td className="px-5 py-4">€4,95 (gratis &gt; €35)</td><td className="px-5 py-4">1–2 werkdagen</td></tr>
                  <tr><td className="px-5 py-4">België</td><td className="px-5 py-4">€5,95 (gratis &gt; €35)</td><td className="px-5 py-4">2–3 werkdagen</td></tr>
                  <tr><td className="px-5 py-4">Duitsland</td><td className="px-5 py-4">€7,95</td><td className="px-5 py-4">3–4 werkdagen</td></tr>
                  <tr><td className="px-5 py-4">Frankrijk</td><td className="px-5 py-4">€9,95</td><td className="px-5 py-4">3–5 werkdagen</td></tr>
                  <tr><td className="px-5 py-4">Overig EU</td><td className="px-5 py-4">€12,95</td><td className="px-5 py-4">4–7 werkdagen</td></tr>
                </tbody>
              </table>
            </div>
          </ScrollReveal>

          <ScrollReveal className="mt-16">
            <h2 className="font-heading text-3xl font-semibold mb-4">Retourneren</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">Niet helemaal tevreden? Geen probleem. Je hebt 14 dagen na ontvangst de tijd om je bestelling ongeopend en in originele staat retour te sturen. Geopende voedingsproducten kunnen we vanwege hygiëneregels niet terugnemen — voor accessoires geldt deze beperking niet.</p>
            <p className="text-muted-foreground leading-relaxed">Stuur een mail naar <a href="mailto:retour@yourmatcha.nl" className="text-primary underline">retour@yourmatcha.nl</a> en we sturen je een retourlabel. Het bedrag staat binnen 5 werkdagen na ontvangst weer op je rekening.</p>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
};

export default Shipping;
