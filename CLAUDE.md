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
2. This is a plain static site: edit `index.html` / `css/styles.css` /
   `js/main.js` directly, no build step, no framework.
3. Keep it a single page for now unless Stuart asks for more — the brief is a
   simple brochure site, not a full marketing engine.
