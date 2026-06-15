import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
  type?: "website" | "article" | "product";
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  noindex?: boolean;
  keywords?: string;
  locale?: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
}

// Multi-domain: each language has its own primary domain
const DOMAINS: Record<string, string> = {
  nl: "https://yourmatcha.nl",
  de: "https://yourmatcha.de",
  en: "https://yourmatcha.com",
  fr: "https://yourmatcha.fr",
  no: "https://yourmatcha.no",
};
const DEFAULT_IMAGE = "/og-default.jpg";
const SUPPORTED_LOCALES = ["nl-NL", "nl-BE", "en-GB", "de-DE", "fr-FR", "nb-NO"];

const OG_LOCALES: Record<string, string> = {
  nl: "nl_NL",
  de: "de_DE",
  en: "en_GB",
  fr: "fr_FR",
  no: "nb_NO",
};

const HREFLANG_MAP: Record<string, string> = {
  nl: "nl-NL",
  de: "de-DE",
  en: "en-GB",
  fr: "fr-FR",
  no: "nb-NO",
};

const SEO = ({
  title,
  description,
  canonical,
  image,
  type = "website",
  jsonLd,
  noindex,
  keywords,
  locale,
  publishedTime,
  modifiedTime,
  author = "YourMatcha",
}: SEOProps) => {
  const { i18n } = useTranslation();
  const lang = (i18n.language || "nl").slice(0, 2);
  const siteUrl = DOMAINS[lang] || DOMAINS.nl;
  const ogLocale = locale || OG_LOCALES[lang] || "nl_NL";

  const path = canonical || "/";
  const url = path.startsWith("http") ? path : `${siteUrl}${path}`;
  const fullTitle = title.includes("YourMatcha") ? title : `${title} | YourMatcha`;
  const ogImage = image
    ? image.startsWith("http")
      ? image
      : `${siteUrl}${image.startsWith("/") ? image : `/${image}`}`
    : `${siteUrl}${DEFAULT_IMAGE}`;
  const jsonLdArr = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];

  return (
    <Helmet>
      <html lang={lang} />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content={author} />
      <link rel="canonical" href={url} />

      {/* Robots */}
      {noindex ? (
        <meta name="robots" content="noindex,nofollow" />
      ) : (
        <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
      )}

      {/* Hreflang alternates — point each language to its primary domain */}
      {Object.entries(HREFLANG_MAP).map(([code, hreflang]) => (
        <link key={hreflang} rel="alternate" hrefLang={hreflang} href={`${DOMAINS[code]}${path}`} />
      ))}
      <link rel="alternate" hrefLang="nl-BE" href={`${DOMAINS.nl}${path}`} />
      <link rel="alternate" hrefLang="x-default" href={`${DOMAINS.nl}${path}`} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:site_name" content="YourMatcha" />
      <meta property="og:locale" content={ogLocale} />
      {SUPPORTED_LOCALES.filter(l => l.replace("-", "_") !== ogLocale).map(l => (
        <meta key={l} property="og:locale:alternate" content={l.replace("-", "_")} />
      ))}

      {/* Article-specific */}
      {type === "article" && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === "article" && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === "article" && <meta property="article:author" content={author} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@yourmatcha" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {jsonLdArr.map((data, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(data)}</script>
      ))}
    </Helmet>
  );
};

export default SEO;
