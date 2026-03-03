/**
 * SEO.tsx — Helmet-based head management with E-E-A-T schema helpers
 *
 * Export helpers buildWebPageSchema, buildBreadcrumbSchema, buildServiceSchema,
 * buildFAQSchema to keep page-level JSON-LD DRY and consistent.
 */
import { Helmet } from "react-helmet-async";

// ---------------------------------------------------------------------------
// Component interface
// ---------------------------------------------------------------------------
export interface SEOProps {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
  ogType?: string;
  jsonLd?: object | object[];
  noIndex?: boolean;
  /** ISO date string forwarded to <meta name="revised"> */
  dateModified?: string;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
export const BASE_URL = "https://www.vmproducers.com";
const DEFAULT_OG_IMAGE = `${BASE_URL}/hero-bg.webp`;
export const TODAY = new Date().toISOString().split("T")[0];

// ---------------------------------------------------------------------------
// JSON-LD Schema Helpers — import these in page files
// ---------------------------------------------------------------------------

export const orgRef = { "@id": `${BASE_URL}/#organization` } as const;
export const websiteRef = { "@id": `${BASE_URL}/#website` } as const;
export const founderRef = { "@id": `${BASE_URL}/#founder` } as const;

/**
 * WebPage schema with speakable spec for SGE extraction.
 * E-E-A-T: links to org + author (founder) as signals.
 */
export function buildWebPageSchema({
  path,
  name,
  description,
  dateModified = TODAY,
}: {
  path: string;
  name: string;
  description: string;
  dateModified?: string;
}) {
  const url = `${BASE_URL}${path}`;
  return {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name,
    isPartOf: websiteRef,
    about: orgRef,
    author: founderRef,
    description,
    dateModified,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["[data-speakable]", "h1", "h2", ".service-summary"],
    },
    breadcrumb: { "@id": `${url}#breadcrumb` },
  };
}

/** BreadcrumbList for a 2-level page (Home → PageName). */
export function buildBreadcrumbSchema(pagePath: string, pageLabel: string) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${BASE_URL}${pagePath}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/` },
      { "@type": "ListItem", position: 2, name: pageLabel, item: `${BASE_URL}${pagePath}` },
    ],
  };
}

/**
 * ProfessionalService schema — more specific than generic Service,
 * reinforces topical authority and E-E-A-T.
 */
export function buildServiceSchema({
  path,
  serviceType,
  name,
  description,
  offerNames,
}: {
  path: string;
  serviceType: string;
  name: string;
  description: string;
  offerNames: string[];
}) {
  return {
    "@type": ["Service", "ProfessionalService"],
    serviceType,
    name,
    description,
    provider: orgRef,
    url: `${BASE_URL}${path}`,
    areaServed: "Worldwide",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${name} Services`,
      itemListElement: offerNames.map((n) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: n },
      })),
    },
  };
}

/** FAQPage schema from an array of Q&A pairs. */
export function buildFAQSchema(items: Array<{ question: string; answer: string }>) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export const SEO = ({
  title,
  description,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  jsonLd,
  noIndex = false,
  dateModified,
}: SEOProps) => {
  const fullTitle = title.includes("VM Producers")
    ? title
    : `${title} | VM Producers`;
  const canonicalUrl = `${BASE_URL}${canonical}`;

  // Normalise to array so we render one <script> per schema object
  const schemas: object[] = jsonLd
    ? Array.isArray(jsonLd) ? jsonLd : [jsonLd]
    : [];

  return (
    <Helmet>
      <html lang="en" />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      {dateModified && <meta name="revised" content={dateModified} />}
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
      )}

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="VM Producers" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* JSON-LD — one <script> per schema for clean separation */}
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEO;
