# Neurally — Website

Marketing website for Stuart Davis's AI consulting business (working name
**Neurally**, brand concept **The Human Ratio** — see `CLAUDE.md` for where the
full positioning lives). Plain static HTML/CSS/JS — no build step.

## Quick start

Open `index.html` directly in a browser, or serve it locally:

```bash
python3 -m http.server 8000
```

Then visit http://localhost:8000.

## Structure

| Path | What |
|---|---|
| `index.html` | Home: hero, four problem/message pairs, why it stalls, four-stage path, why Neurally, ladder recap CTA, hidden self-assessment/endorsements placeholders |
| `approach.html` | Three questions, the path, how opportunities are sized, governance in regulated environments, principles, boundaries |
| `services.html` | The engagement ladder (free call, Workshop, Diagnostic, Deep Dive) plus unpriced Design/Leadership/Advisory, fit, common questions |
| `about.html` | Founder hero (photo, LinkedIn), narrative, dated career timeline, career evidence (pre-Neurally), how I work, hidden endorsements |
| `contact.html` | Calendly booking CTA plus a form that posts to Web3Forms, with a mailto fallback on failure |
| `privacy.html` | Privacy notice covering the contact form, Calendly and GoatCounter |
| `404.html` | GitHub Pages not-found page (uses root-relative paths) |
| `css/tokens.css` | Design tokens from the Neurally design system (Claude Design project) |
| `css/styles.css` | Component styles: nav, section, rule, button, tag, card, stat, stage list, forms, footer, plus timeline/about-hero/offer-group added for the Sept 2026 update |
| `js/main.js` | Footer year and the contact form's Web3Forms submit handler |
| `assets/` | Logo mark (warm off-white colourway, C2PA metadata stripped), founder headshot |

The nav and footer are repeated in each page. If you change one, change them all.

## Design system

Visuals come from the **Neurally design system** in Claude Design (dark Ink ground,
Archivo + Instrument Sans, four stage colours: blue, yellow, sage, coral). Stage
colours are semantic and map to the four stages of the work: Decide (blue), Design
(yellow), Deliver (sage) and Embed (coral). The home page's four key messages use the
same order. On Services, the free call is neutral (no stage colour); the Workshop,
Diagnostic and Deep Dive are blue (three depths of Decide); Operating Model Design is
yellow; Implementation Support and Leadership are sage; Training is coral; Advisory
runs alongside any stage and uses blue.

## Third-party integrations

- **Web3Forms** — the contact form posts to it (`js/main.js`). Needs a real
  `WEB3FORMS_ACCESS_KEY` in place of the placeholder before go-live.
- **Calendly** — the free discovery call booking link
  (`https://calendly.com/stuartdavis/30min`), used as an external link, not embedded.
- **GoatCounter** — cookie-free analytics, one script tag per page
  (`neurally.goatcounter.com`).

The founding-client discount mentioned in the Drive `proof-plan.md` is intentionally
not documented here or anywhere in this repo — it's a private, network-only offer
and must never appear on the site.

## Content source of truth

The business positioning, offer, ICP and copy all come from the Google Drive
business docs, not this repo — see `CLAUDE.md` for the link. Update the docs
there first, then bring copy changes back into the site.

## Deploying

GitHub Pages serves `main` from the repo root at https://www.neurally.co.uk (see
`CNAME`). Pushing to `main` publishes.
