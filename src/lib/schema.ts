import { site, abs } from "../data/site";
import { engagements } from "../data/engagements";

type Json = Record<string, unknown>;

const ORG_ID = `${site.url}/#organization`;
const PERSON_ID = `${site.url}/about/#stuart-davis`;
const WEBSITE_ID = `${site.url}/#website`;

export const organization = (): Json => ({
  "@type": "ProfessionalService",
  "@id": ORG_ID,
  name: site.name,
  legalName: site.company.legalName,
  url: `${site.url}/`,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.company.street,
    addressLocality: site.company.locality,
    postalCode: site.company.postcode,
    addressCountry: "GB",
  },
  description:
    "Neurally is a UK-based AI and business transformation advisory that helps leadership teams decide where AI is worth the investment, redesign the business around it and lead the change through to measured results.",
  logo: abs("/assets/linkedin/neurally-logo-300x300.png"),
  image: abs("/og/home.png"),
  email: site.email,
  areaServed: { "@type": "Country", name: "United Kingdom" },
  founder: { "@id": PERSON_ID },
  sameAs: [site.linkedinCompany],
  priceRange: "££",
});

export const website = (): Json => ({
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: `${site.url}/`,
  name: site.name,
  inLanguage: site.locale,
  publisher: { "@id": ORG_ID },
});

export const person = (): Json => ({
  "@type": "Person",
  "@id": PERSON_ID,
  name: site.founder,
  jobTitle: "Founder",
  url: abs("/about/"),
  sameAs: [site.linkedin],
  worksFor: { "@id": ORG_ID },
  alumniOf: { "@type": "CollegeOrUniversity", name: "University of Bath" },
  knowsAbout: [
    "AI strategy",
    "Operating model design",
    "Product management",
    "Business transformation",
    "AI governance",
  ],
});

export const breadcrumbList = (crumbs: { name: string; href: string }[]): Json => ({
  "@type": "BreadcrumbList",
  itemListElement: crumbs.map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: c.name,
    item: abs(c.href),
  })),
});

export const faqPage = (items: { q: string; a: string }[]): Json => ({
  "@type": "FAQPage",
  mainEntity: items.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a.replace(/<[^>]+>/g, "") },
  })),
});

export const services = (): Json[] =>
  engagements.map((e) => ({
    "@type": "Service",
    "@id": `${site.url}/services/#${e.id}`,
    name: e.name,
    description: e.summary,
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Country", name: "United Kingdom" },
    url: abs(`/services/#${e.id}`),
    ...(e.price !== undefined
      ? {
          offers: {
            "@type": "Offer",
            price: e.price,
            priceCurrency: "GBP",
            url: abs(`/services/#${e.id}`),
          },
        }
      : {}),
  }));

export const article = (a: {
  title: string;
  description: string;
  href: string;
  published: Date;
  updated?: Date | undefined;
  image: string;
}): Json => ({
  "@type": "Article",
  headline: a.title,
  description: a.description,
  url: abs(a.href),
  mainEntityOfPage: abs(a.href),
  datePublished: a.published.toISOString(),
  dateModified: (a.updated ?? a.published).toISOString(),
  inLanguage: site.locale,
  image: abs(a.image),
  author: { "@id": PERSON_ID },
  publisher: { "@id": ORG_ID },
});

export const webPage = (p: { title: string; description: string; href: string }): Json => ({
  "@type": "WebPage",
  "@id": `${abs(p.href)}#webpage`,
  url: abs(p.href),
  name: p.title,
  description: p.description,
  inLanguage: site.locale,
  isPartOf: { "@id": WEBSITE_ID },
  about: { "@id": ORG_ID },
});

export const graph = (nodes: Json[]): string =>
  JSON.stringify({ "@context": "https://schema.org", "@graph": nodes });
