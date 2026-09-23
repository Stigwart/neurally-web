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
| `index.html` | Home: hero, the problem, five-stage path, why Neurally, diagnostic CTA |
| `approach.html` | Three questions, the path, how opportunities are sized, principles, boundaries |
| `services.html` | The four engagements, fit, common questions |
| `about.html` | Founder, scope of expertise, career evidence (clearly marked as pre-Neurally) |
| `contact.html` | Scoping-conversation form (opens a pre-filled email, no backend) |
| `404.html` | GitHub Pages not-found page (uses root-relative paths) |
| `css/tokens.css` | Design tokens from the Neurally design system (Claude Design project) |
| `css/styles.css` | Component styles: nav, section, rule, button, tag, card, stat, stage list, forms, footer |
| `js/main.js` | Footer year and the contact form's mailto composer |
| `assets/` | Logo mark (warm off-white colourway, C2PA metadata stripped) |

The nav and footer are repeated in each page. If you change one, change them all.

## Design system

Visuals come from the **Neurally design system** in Claude Design (dark Ink ground,
Archivo + Instrument Sans, four stage colours: blue, yellow, sage, coral). Stage
colours are semantic. On this site they map to the four engagements: Diagnostic (blue),
Design (yellow), Leadership (sage), Advisory (coral).

## Content source of truth

The business positioning, offer, ICP and copy all come from the Google Drive
business docs, not this repo — see `CLAUDE.md` for the link. Update the docs
there first, then bring copy changes back into `index.html`.

## Deploying

GitHub Pages serves `main` from the repo root at https://www.neurally.co.uk (see
`CNAME`). Pushing to `main` publishes.
