/** Site-wide facts. Change them here and every page follows. */
export const site = {
  name: "Neurally",
  descriptor: "AI & business transformation advisory",
  url: "https://www.neurally.co.uk",
  email: "hello@neurally.co.uk",
  calendly: "https://calendly.com/stuartdavis/30min",
  linkedin: "https://www.linkedin.com/in/stuartgdavis/",
  founder: "Stuart Davis",
  locale: "en-GB",
  defaultDescription:
    "Neurally helps leadership teams decide where AI is worth the investment, redesign products, processes and teams around it, and lead the change through to measured results.",
  /** Public Web3Forms key, shared by the contact form and the assessment. */
  web3forms: {
    endpoint: "https://api.web3forms.com/submit",
    accessKey: "365c5876-bc42-4524-b242-26a0ef6928e6",
  },
  goatcounter: "https://neurally.goatcounter.com/count",
} as const;

export const abs = (path: string) => new URL(path, site.url).href;
