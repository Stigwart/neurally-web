# Neurally Website — Navigation

## What this is

The public website for Stuart Davis's AI consulting business. This repo holds
only the site itself. No business content lives here as the source of truth.

It is an **Astro** static site (TypeScript strict, **Tailwind CSS v4**) deployed
to **Cloudflare Pages**. `README.md` covers running, deploying, adding pages and
changing tokens. `DESIGN.md` covers the design system.

## Where the real business docs live

All business documentation — the proposition, ICP, offerings, brand
positioning, elevator pitches — is kept in Google Drive, **not** in this repo:

`My Drive/ventures/neurally-docs/` (Google Drive, linked as this venture's
docs folder)

Start with `neurally-overview-v2.1.md` in that folder for the full proposition
this site's copy is drawn from, and `CLAUDE.md` there for the wider venture
navigation (Linear project, go-to-market plan, related repos).

## Related repos

- [`../content-studio/`](../content-studio/) — LinkedIn content and
  positioning system for the same consultancy launch.
- [`../product-ops/`](../product-ops/) — the productised IP behind the main
  sellable offer.

## Working on this site

1. Check the Drive `neurally-overview-v2.1.md` for current positioning before
   writing new copy. Don't invent claims not backed by that doc or Stuart
   directly. Every factual claim on the site has a row in
   `docs/claims-ledger.md`; add or update the row in the same change.
2. **Never push to `main` directly.** Pushing `main` publishes the live site.
   Work on a branch and open a pull request; Cloudflare Pages builds a preview
   for it and CI must be green.
3. Run `npm run verify` before opening a PR (types, lint, format, build, link
   check, HTML validation, Playwright and axe).
4. Pages: Home, Approach, Services, About, Contact, Assessment, Privacy, 404,
   plus landing pages by industry, team and use case, and an Insights section.
   Landing pages and articles are Markdown files in `src/content/` and need no
   code. Stuart has authorised adding more of these when a page can be made
   substantive and distinct. Don't add thin or templated pages.
5. Facts that appear in more than one place live in `src/data/` (fees and
   engagements, stages, career figures, FAQs). Change them there, never in a
   page. Engagement fees are exact.
6. Never publish invented client results, testimonials, logos or case studies.
   Career figures are Stuart's evidence from the Drive doc and must stay
   labelled as pre-Neurally (the `CareerNote` component does this). Past
   employers appear as text, never as a logo wall. Professional services is a
   focus area, not claimed experience.
7. The founding-client discount (see Drive `proof-plan.md`) is private and
   network-only. Never add it to this site. The only discount that may appear
   is the Workshop credit.
8. Integrations: the contact form and the assessment post to Web3Forms (public
   access key in `src/data/site.ts`), every page carries GoatCounter analytics
   (`neurally.goatcounter.com`), and the discovery call links out to Calendly.
   If you add a third party, update `public/_headers` (CSP) and the privacy
   page.
9. Styling uses the tokens in the `@theme` block of `src/styles/global.css`.
   Don't add arbitrary values where a token exists. All motion must respect
   `prefers-reduced-motion`.
10. British English. Short, plain sentences. No hype, and nothing a regulated
    (FCA, Consumer Duty) audience would read as an overstated AI claim.
