import PageHero from "@/components/PageHero";
import ScrollReveal from "@/components/ScrollReveal";
import { Leaf, Recycle, HandHeart, Globe2 } from "lucide-react";
import lifestyle3 from "@/assets/lifestyle-3.jpg";
import SEO from "@/components/SEO";

const pillars = [
  { icon: Leaf, title: "100% Biologisch", text: "Al onze thee is gecertificeerd biologisch (EU-Bio en JAS). Geen pesticiden, geen kunstmest, geen kortere wegen." },
  { icon: HandHeart, title: "Direct Trade", text: "We werken al jaren met dezelfde familieboerderijen in Uji en Kagoshima. Eerlijke prijzen, langetermijn relaties, geen tussenhandel." },
  { icon: Recycle, title: "Recyclebaar", text: "Onze pouches zijn volledig recyclebaar en onze verzenddozen zijn gemaakt van 100% gerecycled karton zonder plastic vulling." },
  { icon: Globe2, title: "CO₂ Gecompenseerd", text: "We compenseren 100% van onze verzendingen via geverifieerde herbebossingsprojecten in Nederland en Indonesië." },
];

const Sustainability = () => (
  <>
    <SEO
      title="Duurzaamheid — Biologische matcha, direct trade en CO₂-gecompenseerde verzending"
      description="YourMatcha is biologisch gecertificeerd (EU-Bio + JAS), werkt direct met Japanse familieboerderijen in Uji en Kagoshima, en compenseert 100% van de verzendingen."
      canonical="/duurzaamheid"
      keywords="biologische matcha, duurzame matcha, direct trade thee, eerlijke matcha, CO2 neutraal verzenden"
    />
    <PageHero
      eyebrow="Duurzaamheid"
      title="Met respect voor land, mens en plant"
      subtitle="Premium matcha betekent voor ons ook: zorgvuldig omgaan met de mensen en plekken waar het vandaan komt."
    />

    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pillars.map((p, i) => (
            <ScrollReveal key={i}>
              <div className="bg-secondary rounded-2xl p-8 h-full">
                <p.icon className="w-8 h-8 text-primary mb-5" />
                <h3 className="font-heading text-xl font-semibold mb-2">{p.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{p.text}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-5xl">
        <ScrollReveal>
          <span className="inline-flex items-center gap-2 text-xs tracking-wide bg-primary/10 text-primary px-3 py-1.5 rounded-full mb-6 font-medium">🇯🇵 Onze partners</span>
          <h2 className="font-heading text-3xl md:text-4xl font-light leading-tight mb-5">Vier generaties <span className="italic">vakmanschap</span></h2>
          <p className="text-muted-foreground leading-relaxed mb-4">De familie Tanaka verzorgt al sinds 1924 de tuinen waar onze ceremonial matcha groeit. We bezoeken hen jaarlijks, proeven elke nieuwe oogst en betalen direct — zonder tussenpersonen.</p>
          <p className="text-muted-foreground leading-relaxed">Door deze directe relatie kunnen we niet alleen de hoogste kwaliteit garanderen, maar ook eerlijke werkomstandigheden en investeringen in duurzame teeltmethodes.</p>
        </ScrollReveal>
        <div className="aspect-[4/3] rounded-2xl overflow-hidden">
          <img src={lifestyle3} alt="Theeboerderij Uji" loading="lazy" className="w-full h-full object-cover" />
        </div>
      </div>
    </section>

    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
        <ScrollReveal>
          <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-3">Onze impact 2025</p>
          <h2 className="font-heading text-3xl md:text-4xl font-semibold mb-12">In cijfers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              ["12.400", "Bomen geplant"],
              ["100%", "CO₂ gecompenseerd"],
              ["8", "Familieboerderijen"],
              ["0", "Plastic in verpakking"],
            ].map(([n, l]) => (
              <div key={l} className="bg-secondary rounded-2xl p-6">
                <div className="font-heading text-3xl md:text-4xl text-primary font-light">{n}</div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mt-2">{l}</div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  </>
);

export default Sustainability;
