import { Helmet } from "react-helmet-async";

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

const SITE_URL = "https://yourmatcha.nl";
const DEFAULT_IMAGE = "/og-default.jpg";
const SUPPORTED_LOCALES = ["nl-NL", "nl-BE", "en-GB", "de-DE", "fr-FR"];

const SEO = ({
  title,
  description,
  canonical,
  image,
  type = "website",
  jsonLd,
  noindex,
  keywords,
  locale = "nl_NL",
  publishedTime,
  modifiedTime,
  author = "YourMatcha",
}: SEOProps) => {
  const path = canonical || "/";
  const url = path.startsWith("http") ? path : `${SITE_URL}${path}`;
  const fullTitle = title.includes("YourMatcha") ? title : `${title} | YourMatcha`;
  const ogImage = image
    ? image.startsWith("http")
      ? image
      : `${SITE_URL}${image.startsWith("/") ? image : `/${image}`}`
    : `${SITE_URL}${DEFAULT_IMAGE}`;
  const jsonLdArr = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];

  return (
    <Helmet>
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

      {/* Hreflang alternates */}
      <link rel="alternate" hrefLang="nl-NL" href={url} />
      <link rel="alternate" hrefLang="nl-BE" href={url} />
      <link rel="alternate" hrefLang="x-default" href={url} />

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
      <meta property="og:locale" content={locale} />
      {SUPPORTED_LOCALES.filter(l => l.replace("-", "_") !== locale).map(l => (
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
