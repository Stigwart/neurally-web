# Decision log

Decisions made in Stuart's place during the rebuild, with the reasoning. Anything
here can be reversed; the ones marked **Review** are the ones most worth a look
before merging.

## Scope and structure

- **D1. Four use-case pages, not three.** The brief allowed splitting "AI
  operating model & governance" if search intent was distinct. Research found it
  is: operating-model searches are about structure, roles and process, governance
  searches about controls, risk and accountability, and different firms rank for
  each. Both pages have enough substance. Total: 11 landing pages plus 3 hubs.
- **D2. One schema for all three landing families.** Industries, teams and use
  cases share one Zod schema and one template (`src/layouts/Landing.astro`). A
  new page is one Markdown file. The pages differ in content, not in layout.
- **D3. Navigation groups the landing pages under "Who it's for".** Eleven
  pages won't fit a top bar. Desktop gets a three-column panel, mobile gets the
  full list, and the footer links to every page for crawlers.
- **D4. URLs are clean and end in a slash** (`/approach/`). Old `.html` URLs
  301 to them. `/index.html` is left to Cloudflare Pages, which already
  redirects it to `/`.
- **D5. `CNAME` removed after the cutover.** It only mattered to GitHub Pages,
  which was switched off on 15 November 2026.
- **D6. Slugs chosen from the research** for the plain head phrase:
  `financial-services-insurance`, `marketplaces-ecommerce`, `b2b-saas`,
  `professional-services`, `product-technology-leaders`,
  `operations-customer-service`, `ceos-founders-boards`,
  `ai-strategy-for-boards`, `ai-transformation-rescue`, `ai-operating-model`,
  `ai-governance`. The research returned SERP observations only, with no search
  volumes, so treat titles as a sensible first version. **Review** (this is the
  open "title sign-off" item).

## Design

- **D7. Direction: "the ledger".** Warm near-black and paper, the four stage
  colours as the only chroma, Archivo for display and Instrument Sans for text
  (both carried over from the existing brand so it stays recognisably Neurally),
  IBM Plex Mono for indices and labels. The logo's parallel strokes become the
  site's one texture, a fine hatch that marks work AI takes on.
- **D8. Accent is the Decide blue.** The reference uses one electric-blue
  accent. Adding a fifth colour would have diluted the stage system, so the
  accent (links, focus, selection, primary-button hover) is the Decide blue: the
  first step is the action.
- **D9. Dark and paper sections alternate.** The reference is dark throughout.
  Long copy and articles read better on paper, so sections switch tone with one
  attribute (`data-tone`).
- **D10. Mono index numbers only where order carries meaning** (stages 01–04,
  engagements 00–08, numbered decisions). The moodboard asked for the index
  system; the design skill warns against decorative numbering. This keeps both.
- **D11. Signature hero: an allocation board.** One workflow, seven tasks, each
  allocated to a person, to AI assistance, or to AI within limits. It animates
  from undecided to decided on load and the visitor can move any task. It is
  labelled "Illustrative". Stuart confirmed the customer-complaint example.
- **D12. Motion without a library.** CSS does the entrances, the hero settle
  and the page transitions (cross-document view transitions). About 2 KB of
  TypeScript adds scroll progress and the active stage. No GSAP, and Astro's
  client router was not used, so there is no script re-initialisation to get
  wrong and analytics counts every page normally. Browsers without view
  transitions get a normal navigation.
- **D13. Reference viewed through the moodboard only.** The moodboard already
  held the extracted palette, type, structure and motion, so I did not spend
  tokens re-capturing Genesy.

## Copy

- **D14. Added "Neurally does not give legal or regulatory advice".** The
  governance and financial-services pages talk about Consumer Duty, UK GDPR and
  the EU AI Act. Saying plainly where the advice stops is more credible with a
  regulated audience. Stuart confirmed these stay.
- **D15. H1 is "Take AI from pilot to payback."** Stuart chose it on 15
  November 2026 to replace "Stop experimenting with AI. Start operating with
  it.", which read as a formula. The sub-heading carries the detail.
- **D16. The three articles are in Stuart's name and publish at launch**
  (Stuart's decision, 15 November 2026). They use only
  facts from the context pack plus two FCA sources and the BCG release. They keep
  first-person lines because they are bylined. To hold one back, set
  `draft: true` in its front matter.
- **D17. Article dates** stay staggered at 27 October, 3 November and 10
  November 2026 (Stuart's decision).
- **D18. BCG statistic kept, wording unchanged from the live site,** with the
  link. The release's own figure is 26% "embedded AI as part of a broader
  business transformation".
- **D19. Professional services page carries an explicit "focus area" note** and
  an FAQ that says Stuart has not led AI change inside such a firm.
- **D20. "Nine engagements"** counts the free call (00–08). The fee table on
  Home shows the first four.
- **D21. No endorsements section.** The hidden placeholders were removed
  rather than carried over.
- **D22. About page meta description** does not give a founding year, because
  none is in the sources.

## Engineering

- **D23. Astro 7** (latest stable at the time), Tailwind 4.3, TypeScript on
  the `strictest` preset.
- **D24. Assessment logic ported unchanged.** Questions, options, thresholds,
  scenario text, share-link format (`#r=` plus ten digits) and the Web3Forms
  payload are the same. Two small fixes: the keyboard tip no longer says "1 to
  4" (one question has five options), and "Retake" restores the results form
  after a successful send.
- **D25. Contact form posts with JavaScript and still has a plain HTML
  `action`** pointing at Web3Forms, so it works if the script fails.
- **D26. CSP allows inline styles** (`style-src 'unsafe-inline'`) because the
  stagger delays are set with inline custom properties. Scripts are locked to
  this site and `gc.zgo.at`. No inline scripts are used.
- **D27. HSTS without `preload`.** Preload is hard to undo; add it later if
  wanted.
- **D28. Lighthouse runs against `wrangler pages dev`** locally and in CI,
  because Cloudflare isn't connected. Real-network numbers will differ a
  little; re-run against the Cloudflare preview.
- **D29. External links aren't checked in CI.** Several sources block bots
  (BCG and Web3Forms return 403 to scripts), which would make CI flaky. Internal
  links and fragments are checked on every build.
- **D30. OG images are generated at build time** with Satori, one per page.
  The old `/assets/og-image.png` and LinkedIn assets are kept at their old URLs.
- **D31. Privacy page now names Cloudflare as host and adds a "what this site
  does not do" section.** It becomes accurate at cutover, which is why the PR
  must not merge before Cloudflare is connected.
- **D32. Node 22 LTS** is the minimum (Astro 7 requires 22.23.4 or newer).
  `.nvmrc` pins CI to 22; set `NODE_VERSION=22` in Cloudflare Pages.
- **D33. `.impeccable/design.json` was left as it is.** It is the design
  skill's cached sidecar for the old site. Run `/impeccable document` once to
  regenerate it from the new build if you use that tool's live mode.

## Copy review (15 November 2026)

- **D34. Site voice is "we".** Stuart's decision. Pages, FAQs, forms and
  landing pages say "we" and "us". The About page describes Stuart in the
  third person. The three articles keep "I" because they carry his byline.
  "Neurally" is kept where the company is being named or defined.
- **D35. Plain-language and AI-tell pass.** Checked against ISO 24495-1
  (relevant, findable, understandable, usable) and the humanizer rules.
  Removed contrast-for-weight lines ("not X, but Y"), one-line closers and
  aphorism headings; expanded abbreviations (NED, MAU, ML, P&L, B2B2C);
  defined "operating model" and "decision rights" where first used. Contrasts
  that correct a real belief or carry a required caveat ("career evidence, not
  client results") were kept. Assessment wording was not touched.
- **D36. Neurally is a limited company.** Stuart supplied the details on 15
  November 2026: Neurally Ltd, company number 17529243. The privacy page now
  names the company as data controller. The registered name, number, place of
  registration and office appear on the Privacy and Contact pages, which covers
  the website disclosure rule while the footer stays as "© Neurally" at
  Stuart's request. "England and Wales" is inferred from the company number
  format and the London office; correct `src/data/site.ts` if that is wrong.
- **D37. Delivery is framed as "with you until it is live".** Stuart's steer
  after comparing with High Intent Labs: Neurally can and should work with a
  client all the way through to delivery, even where others write the
  software. Answers that opened with "No, we don't build" now open with what
  we do through delivery, and say who writes the code second.
- **D38. Cutover on 15 November 2026.** The site moved to the Cloudflare Pages
  project `neurally-web`, connected to this repository, with `main` as the
  production branch. GitHub Pages is off. DNS stays at GoDaddy: `www` is a
  CNAME to `neurally-web.pages.dev` and the apex is forwarded to `www`.
