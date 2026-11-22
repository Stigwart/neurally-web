/** Every route the site serves, used by the smoke and accessibility tests. */
export const corePages = [
  "/",
  "/approach/",
  "/services/",
  "/about/",
  "/contact/",
  "/assessment/",
  "/privacy/",
];

export const landingPages = [
  "/industries/",
  "/industries/financial-services-insurance/",
  "/industries/marketplaces-ecommerce/",
  "/industries/b2b-saas/",
  "/industries/professional-services/",
  "/teams/",
  "/teams/product-technology-leaders/",
  "/teams/operations-customer-service/",
  "/teams/ceos-founders-boards/",
  "/use-cases/",
  "/use-cases/ai-strategy-for-boards/",
  "/use-cases/ai-transformation-rescue/",
  "/use-cases/ai-operating-model/",
  "/use-cases/ai-governance/",
];

export const articlePages = [];

export const allPages = [...corePages, ...landingPages, ...articlePages];

export const redirects: [string, string][] = [
  ["/approach.html", "/approach/"],
  ["/services.html", "/services/"],
  ["/about.html", "/about/"],
  ["/contact.html", "/contact/"],
  ["/assessment.html", "/assessment/"],
  ["/privacy.html", "/privacy/"],
  ["/sitemap.xml", "/sitemap-index.xml"],
];
