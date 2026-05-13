import { Link, Navigate } from "react-router-dom";
import { ArrowRight, ChevronRight } from "lucide-react";
import SEO from "@/components/SEO";
import { getLandingPageBySlug, type LandingPage as LandingPageData } from "@/data/landings";
import { getProductBySlug } from "@/data/products";

interface Props {
  slug: string;
}

const renderBody = (body: string) => {
  const blocks: JSX.Element[] = [];
  const lines = body.split("\n");
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("### ")) {
      blocks.push(
        <h3 key={key++} className="font-heading text-lg font-semibold mt-6 mb-2">
          {line.slice(4)}
        </h3>,
      );
      i++;
    } else if (line.startsWith("## ")) {
      blocks.push(
        <h3 key={key++} className="font-heading text-xl font-semibold mt-8 mb-3">
          {line.slice(3)}
        </h3>,
      );
      i++;
    } else if (line.startsWith("- ") || line.match(/^\d+\.\s/)) {
      const items: string[] = [];
      const ordered = !!line.match(/^\d+\.\s/);
      while (i < lines.length && (lines[i].startsWith("- ") || lines[i].match(/^\d+\.\s/))) {
        items.push(lines[i].replace(/^- |^\d+\.\s/, ""));
        i++;
      }
      const ListTag = ordered ? "ol" : "ul";
      blocks.push(
        <ListTag
          key={key++}
          className={`${ordered ? "list-decimal" : "list-disc"} list-outside pl-5 my-3 space-y-1.5 text-foreground/85`}
        >
          {items.map((it, idx) => (
            <li key={idx} dangerouslySetInnerHTML={{ __html: inline(it) }} />
          ))}
        </ListTag>,
      );
    } else if (line.startsWith("|")) {
      const rows: string[][] = [];
      while (i < lines.length && lines[i].startsWith("|")) {
        rows.push(
          lines[i]
            .split("|")
            .slice(1, -1)
            .map(c => c.trim()),
        );
        i++;
      }
      const [header, , ...body] = rows;
      blocks.push(
        <div key={key++} className="my-5 overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-secondary">
              <tr>
                {header.map((h, idx) => (
                  <th key={idx} className="text-left px-4 py-3 font-semibold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {body.map((r, rIdx) => (
                <tr key={rIdx} className="border-t border-border">
                  {r.map((c, cIdx) => (
                    <td key={cIdx} className="px-4 py-3 text-foreground/80">
                      {c}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>,
      );
    } else if (line.trim() === "") {
      i++;
    } else {
      blocks.push(
        <p
          key={key++}
          className="text-foreground/85 leading-relaxed my-3"
          dangerouslySetInnerHTML={{ __html: inline(line) }}
        />,
      );
      i++;
    }
  }
  return blocks;
};

const inline = (s: string) =>
  s
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" class="text-primary underline underline-offset-2 hover:no-underline">$1</a>',
    );

const buildSchemas = (page: LandingPageData) => {
  const url = `https://yourmatcha.nl/${page.slug}`;

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://yourmatcha.nl/" },
      { "@type": "ListItem", position: 2, name: page.title, item: url },
    ],
  };

  const faq =
    page.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: page.faqs.map(f => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }
      : null;

  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: page.title,
    description: page.metaDescription,
    url,
    dateModified: page.updated,
  };

  return faq ? [webPage, breadcrumb, faq] : [webPage, breadcrumb];
};

const priceFormatter = new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" });

const LandingPage = ({ slug }: Props) => {
  const page = getLandingPageBySlug(slug);
  if (!page) return <Navigate to="/" replace />;

  const products = page.productSlugs
    .map(s => getProductBySlug(s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <>
      <SEO
        title={page.metaTitle}
        description={page.metaDescription}
        canonical={`/${page.slug}`}
        jsonLd={buildSchemas(page)}
      />

      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <p className="text-[10px] tracking-[0.3em] uppercase text-primary mb-4">{page.eyebrow}</p>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-light leading-tight mb-6">
            {page.title}
          </h1>
          <p className="text-base md:text-lg text-foreground/75 leading-relaxed max-w-2xl mx-auto">
            {page.hero}
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          {page.sections.map((s, idx) => (
            <div key={idx} className="mb-12 last:mb-0">
              <h2 className="font-heading text-2xl md:text-3xl font-semibold mb-4">{s.heading}</h2>
              <div>{renderBody(s.body)}</div>
            </div>
          ))}
        </div>
      </section>

      {products.length > 0 && (
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-10">
              <h2 className="font-heading text-2xl md:text-3xl font-semibold mb-3">{page.productsTitle}</h2>
              {page.productsSubtitle && (
                <p className="text-sm text-muted-foreground leading-relaxed">{page.productsSubtitle}</p>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map(p => (
                <Link
                  key={p.id}
                  to={`/product/${p.slug}`}
                  className="group block bg-card rounded-2xl overflow-hidden border border-border/60 hover:border-primary/40 transition-all"
                >
                  <div className="aspect-square bg-secondary overflow-hidden">
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-[10px] tracking-widest uppercase text-muted-foreground mb-1.5">
                      {p.categoryLabel}
                    </p>
                    <h3 className="font-heading text-base font-semibold leading-tight mb-2 group-hover:text-primary transition-colors">
                      {p.name}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-3 line-clamp-2">
                      {p.shortDescription}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold">{priceFormatter.format(p.price)}</span>
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary group-hover:gap-2 transition-all">
                        Bekijk <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {page.faqs.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
            <h2 className="font-heading text-2xl md:text-3xl font-semibold mb-6">Veelgestelde vragen</h2>
            <div className="space-y-4">
              {page.faqs.map((f, i) => (
                <details key={i} className="group bg-secondary rounded-xl px-5 py-4 cursor-pointer">
                  <summary className="font-semibold list-none flex items-center justify-between">
                    {f.q}
                    <span className="text-primary text-xl group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-3">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {page.relatedLinks && page.relatedLinks.length > 0 && (
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
            <h2 className="font-heading text-2xl font-semibold mb-6">Verder lezen</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {page.relatedLinks.map(rl => (
                <Link
                  key={rl.to}
                  to={rl.to}
                  className="group block bg-card rounded-xl p-5 border border-border/60 hover:border-primary/40 transition-all"
                >
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                    {rl.label} <ChevronRight className="w-4 h-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default LandingPage;
