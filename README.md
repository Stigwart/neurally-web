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
| `index.html` | The whole one-page site (hero, problem, approach, engagements, about, contact) |
| `css/styles.css` | All styling |
| `js/main.js` | Small bits of page behaviour (currently just the footer year) |
| `assets/` | Images, logos, etc. (empty for now) |

## Content source of truth

The business positioning, offer, ICP and copy all come from the Google Drive
business docs, not this repo — see `CLAUDE.md` for the link. Update the docs
there first, then bring copy changes back into `index.html`.

## Deploying

Not yet deployed. Being static HTML/CSS/JS, it can be hosted anywhere with zero
config — GitHub Pages, Netlify, Vercel, Cloudflare Pages all work by pointing
at this repo root.
