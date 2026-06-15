import { Link, useParams, Navigate } from "react-router-dom";
import { ChevronLeft, Clock, Calendar, ArrowRight } from "lucide-react";
import SEO from "@/components/SEO";
import { getKnowledgeBySlug, knowledgeArticles } from "@/data/knowledge";
import { useLang } from "@/i18n";

const COPY = {
  nl: {
    back: "Terug naar kennis",
    breadcrumbKnowledge: "Kennis",
    lastUpdated: "Laatst bijgewerkt",
    dateLocale: "nl-NL",
    faq: "Veelgestelde vragen",
    moreReading: "Meer lezen",
    readMore: "Lees verder",
  },
  no: {
    back: "Tilbake til kunnskapssenteret",
    breadcrumbKnowledge: "Kunnskap",
    lastUpdated: "Sist oppdatert",
    dateLocale: "nb-NO",
    faq: "Ofte stilte spørsmål",
    moreReading: "Mer å lese",
    readMore: "Les mer",
  },
} as const;

/** Lightweight markdown renderer for our controlled content set. */
const renderContent = (content: string) => {
  const blocks: JSX.Element[] = [];
  const lines = content.split("\n");
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("## ")) {
      blocks.push(<h2 key={key++} className="font-heading text-2xl md:text-3xl font-semibold mt-12 mb-4">{line.slice(3)}</h2>);
      i++;
    } else if (line.startsWith("### ")) {
      blocks.push(<h3 key={key++} className="font-heading text-xl font-semibold mt-8 mb-3">{line.slice(4)}</h3>);
      i++;
    } else if (line.startsWith("- ") || line.startsWith("* ")) {
      const items: string[] = [];
      while (i < lines.length && (lines[i].startsWith("- ") || lines[i].startsWith("* "))) {
        items.push(lines[i].slice(2));
        i++;
      }
      blocks.push(
        <ul key={key++} className="list-disc list-outside pl-5 my-4 space-y-2 text-foreground/85">
          {items.map((it, idx) => <li key={idx} dangerouslySetInnerHTML={{ __html: inline(it) }} />)}
        </ul>
      );
    } else if (line.startsWith("|")) {
      const rows: string[][] = [];
      while (i < lines.length && lines[i].startsWith("|")) {
        rows.push(lines[i].split("|").slice(1, -1).map(c => c.trim()));
        i++;
      }
      const [header, , ...body] = rows;
      blocks.push(
        <div key={key++} className="my-6 overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-secondary">
              <tr>{header.map((h, idx) => <th key={idx} className="text-left px-4 py-3 font-semibold">{h}</th>)}</tr>
            </thead>
            <tbody>
              {body.map((r, rIdx) => (
                <tr key={rIdx} className="border-t border-border">
                  {r.map((c, cIdx) => <td key={cIdx} className="px-4 py-3 text-foreground/80">{c}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else if (line.trim() === "") {
      i++;
    } else {
      blocks.push(
        <p key={key++} className="text-foreground/85 leading-relaxed my-4" dangerouslySetInnerHTML={{ __html: inline(line) }} />
      );
      i++;
    }
  }
  return blocks;
};

const inline = (s: string) =>
  s
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary underline underline-offset-2 hover:no-underline">$1</a>');

const KnowledgeArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = getKnowledgeBySlug(slug || "");
  const lang = useLang();
  const c = lang === "no" ? COPY.no : COPY.nl;
  if (!article) return <Navigate to="/kennis" replace />;

  const related = knowledgeArticles.filter(a => a.slug !== article.slug).slice(0, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.metaDescription,
    datePublished: article.updated,
    dateModified: article.updated,
    author: { "@type": "Organization", name: "YourMatcha" },
    publisher: { "@type": "Organization", name: "YourMatcha", logo: { "@type": "ImageObject", url: "https://yourmatcha.nl/og-default.jpg" } },
    mainEntityOfPage: `https://yourmatcha.nl/kennis/${article.slug}`,
  };

  const faqSchema = article.faqs?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: article.faqs.map(f => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }
    : null;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://yourmatcha.nl/" },
      { "@type": "ListItem", position: 2, name: c.breadcrumbKnowledge, item: "https://yourmatcha.nl/kennis" },
      { "@type": "ListItem", position: 3, name: article.title, item: `https://yourmatcha.nl/kennis/${article.slug}` },
    ],
  };

  return (
    <>
      <SEO
        title={article.metaTitle}
        description={article.metaDescription}
        canonical={`/kennis/${article.slug}`}
        type="article"
        jsonLd={faqSchema ? [articleSchema, faqSchema, breadcrumbSchema] : [articleSchema, breadcrumbSchema]}
      />

      <article className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <Link to="/kennis" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ChevronLeft className="w-4 h-4" /> {c.back}
          </Link>

          <p className="text-[10px] tracking-[0.3em] uppercase text-primary mb-4">{article.category}</p>
          <h1 className="font-heading text-4xl md:text-5xl font-light leading-tight mb-6">{article.title}</h1>
          <div className="flex items-center gap-5 text-xs text-muted-foreground mb-12 pb-8 border-b border-border">
            <span className="inline-flex items-center gap-1.5"><Clock className="w-3 h-3" /> {article.readTime}</span>
            <span className="inline-flex items-center gap-1.5"><Calendar className="w-3 h-3" /> {c.lastUpdated} {new Date(article.updated).toLocaleDateString(c.dateLocale)}</span>
          </div>

          <div className="prose-content">{renderContent(article.content)}</div>

          {article.faqs && article.faqs.length > 0 && (
            <section className="mt-16 pt-12 border-t border-border">
              <h2 className="font-heading text-2xl md:text-3xl font-semibold mb-6">{c.faq}</h2>
              <div className="space-y-4">
                {article.faqs.map((f, i) => (
                  <details key={i} className="group bg-secondary rounded-xl px-5 py-4 cursor-pointer">
                    <summary className="font-semibold list-none flex items-center justify-between">
                      {f.q}
                      <span className="text-primary text-xl group-open:rotate-45 transition-transform">+</span>
                    </summary>
                    <p className="text-sm text-muted-foreground leading-relaxed mt-3">{f.a}</p>
                  </details>
                ))}
              </div>
            </section>
          )}

          <section className="mt-16 pt-12 border-t border-border">
            <h2 className="font-heading text-2xl font-semibold mb-6">{c.moreReading}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {related.map(r => (
                <Link
                  key={r.slug}
                  to={`/kennis/${r.slug}`}
                  className="group block bg-card rounded-xl p-5 border border-border/60 hover:border-primary/40 transition-all"
                >
                  <p className="text-[10px] tracking-widest uppercase text-primary mb-2">{r.category}</p>
                  <h3 className="font-heading text-base font-semibold leading-tight mb-3 group-hover:text-primary transition-colors">{r.title}</h3>
                  <span className="inline-flex items-center gap-1 text-xs text-primary font-semibold group-hover:gap-2 transition-all">
                    {c.readMore} <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </article>
    </>
  );
};

export default KnowledgeArticle;
