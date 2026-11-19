/** Every route the site serves, used by the smoke and accessibility tests. */
export const corePages = [
  "/",
  "/services/",
  "/about/",
  "/contact/",
  "/assessment/",
  "/privacy/",
  "/insights/",
];

export const landingPages = [
  "/industries/financial-services-insurance/",
  "/industries/marketplaces-ecommerce/",
  "/industries/b2b-saas/",
  "/industries/professional-services/",
  "/teams/product-technology-leaders/",
  "/teams/operations-customer-service/",
  "/teams/ceos-founders-boards/",
  "/use-cases/ai-strategy-for-boards/",
  "/use-cases/ai-transformation-rescue/",
  "/use-cases/ai-operating-model/",
  "/use-cases/ai-governance/",
];

export const articlePages = [
  "/insights/why-ai-pilots-dont-pay-back/",
  "/insights/what-stays-with-people/",
  "/insights/ai-governance-under-consumer-duty/",
];

export const allPages = [...corePages, ...landingPages, ...articlePages];

export const redirects: [string, string][] = [
  ["/approach.html", "/services/"],
  ["/services.html", "/services/"],
  ["/about.html", "/about/"],
  ["/contact.html", "/contact/"],
  ["/assessment.html", "/assessment/"],
  ["/privacy.html", "/privacy/"],
  ["/sitemap.xml", "/sitemap-index.xml"],
  ["/approach/", "/services/"],
  ["/industries/", "/services/"],
  ["/teams/", "/services/"],
  ["/use-cases/", "/services/"],
  ["/insights/tags/governance/", "/insights/"],
];
