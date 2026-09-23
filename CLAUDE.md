# Neurally Website — Navigation

## What this is

The public website for Stuart Davis's AI consulting business. This repo holds
only the site itself (HTML/CSS/JS) — no business content lives here as the
source of truth.

## Where the real business docs live

All business documentation — the proposition, ICP, offerings, brand
positioning, elevator pitches — is kept in Google Drive, **not** in this repo:

`My Drive/Projects/ventures/neurally/` (Google Drive, linked as this venture's
docs folder)

Start with `overview.md` in that folder for the full "Human Ratio" proposition
this site's copy is drawn from, and `CLAUDE.md` there for the wider venture
navigation (Linear project, go-to-market plan, related repos).

## Related repos

- [`../content-studio/`](../content-studio/) — LinkedIn content and
  positioning system for the same consultancy launch.
- [`../product-ops/`](../product-ops/) — the productised IP behind the main
  sellable offer.

## Working on this site

1. Check the Drive `overview.md` for current positioning before writing new
   copy — don't invent claims not backed by that doc or Stuart directly.
2. This is a plain static site: edit the `*.html` pages / `css/` / `js/main.js`
   directly, no build step, no framework. Nav and footer are duplicated in
   every page — keep them in sync.
3. Six pages (Home, Approach, Services, About, Contact, Privacy). Don't add
   pages unless Stuart asks for them.
4. Never publish invented client results, testimonials or case studies. The
   About page's numbers are Stuart's career evidence from the Drive doc and
   must stay labelled as pre-Neurally.
5. The contact form posts to Web3Forms (real access key live in `js/main.js`)
   and the site carries GoatCounter analytics (`neurally.goatcounter.com`,
   live in every page's `<head>`). The free discovery call links to Calendly.
   None of this is a build step — still plain static HTML/JS.
6. The founding-client discount (see Drive `proof-plan.md`) is private and
   network-only — never add it to this site.
