# Neurally website

The public site for [Neurally](https://www.neurally.co.uk), an AI and business
transformation advisory led by Stuart Davis.

It is a static site built with **Astro**, **TypeScript** (strict) and
**Tailwind CSS v4**, deployed to **Cloudflare Pages**. There is no server and no
database. Business documentation lives in Google Drive, not here (see
`CLAUDE.md`).

## Run it locally

You need Node 22.23.4 or newer (Node 22 LTS or 24 LTS).

```bash
npm install
```

```bash
npm run dev
```

That serves the site at `http://localhost:4321` with live reload.

To see exactly what Cloudflare will serve, including redirects and security
headers:

```bash
npm run build
```

```bash
npm run preview
```

`preview` runs `wrangler pages dev dist` on `http://localhost:8788`. It runs
locally and needs no Cloudflare account.

## Check your work

```bash
npm run verify
```

This runs, in order: `astro check` (types), ESLint, Prettier, the build, the
internal link check, HTML validation and the Playwright suite (smoke tests,
form tests against a mocked endpoint, axe accessibility checks). CI runs the
same steps on every pull request, plus Lighthouse (`npm run lhci`) with the
budgets in `lighthouserc.json`, and uploads the built `dist/` as an artefact.

The first time, install the test browser: `npx playwright install chromium`.

## Deploy

Cloudflare Pages builds and deploys automatically:

| Setting                | Value                 |
| ---------------------- | --------------------- |
| Framework preset       | Astro                 |
| Build command          | `npm run build`       |
| Build output directory | `dist`                |
| Production branch      | `main`                |
| Environment variable   | `NODE_VERSION` = `22` |

The Cloudflare Pages project is `neurally-web`, connected to this repository.
Every pull request gets its own preview URL (Cloudflare comments it on the PR).
Merging to `main` publishes to `www.neurally.co.uk`.

DNS is held at GoDaddy, not Cloudflare. `www` is a CNAME to
`neurally-web.pages.dev`, and the apex `neurally.co.uk` is forwarded to
`https://www.neurally.co.uk` with a permanent redirect.

`public/_redirects` holds the 301s from the old `.html` URLs. `public/_headers`
holds the security headers and cache rules. Both are plain text and are read by
Cloudflare Pages.

## Where things are

```
src/
  content/           Landing pages and articles (Markdown). Start here.
    industries/  teams/  use-cases/  insights/
  content.config.ts  The schema each Markdown file must satisfy
  data/              Facts used in more than one place
    engagements.ts     the engagement ladder and fees
    stages.ts          Decide, Design, Deliver, Embed
    career.ts          Stuart's timeline and career figures
    faqs.ts            FAQs for Home, Approach and Services
    assessment.ts      assessment questions and scoring
    site.ts            email, Calendly, Web3Forms key, analytics
  components/        Header, Footer, Ladder, StagePath, Faq, and so on
  layouts/           Base (every page), Landing, Hub
  pages/             One file per URL, plus RSS and OG image endpoints
  scripts/           Navigation and motion, the forms, the assessment
  styles/global.css  Design tokens and the few hand-written styles
public/              Files served as they are (_redirects, _headers, icons)
tests/               Playwright smoke and accessibility tests
docs/                Claims ledger, decision log, the rebuild brief
```

## Add a landing page (under ten minutes)

1. Copy the closest existing file in `src/content/industries/`, `teams/` or
   `use-cases/`. The file name becomes the URL:
   `src/content/industries/healthcare.md` is served at `/industries/healthcare/`.
2. Edit the front matter. Every field is checked when you build, and the error
   message names the field that is wrong. The ones that matter most:
   - `name`: short label for menus and breadcrumbs.
   - `headline` and `headlineSecond`: the two beats of the H1.
   - `seoTitle` (up to 62 characters) and `description` (110–165 characters).
   - `situation.quotes`: the reader's situation in their own words.
   - `decisions`, `risks`, `path`: the substance of the page.
   - `entry.engagement`: an id from `src/data/engagements.ts`. The fee and
     outputs are pulled in automatically, so they can't drift.
   - `faq`: three to six questions. They are also published as FAQ structured
     data.
   - `related`: two to four other pages, written `collection/file-name`.
3. Optionally write a few paragraphs of Markdown under the front matter.
4. Run `npm run dev` and open the page.
5. Add a row to `docs/claims-ledger.md` for each new fact, and add the URL to
   `tests/pages.ts` so the tests cover it.

The page appears in the navigation, the footer, its hub, the sitemap, and gets
its own Open Graph image. No code changes are needed.

Rules that still apply: no invented client results, testimonials or logos;
career figures need `evidence` (which adds the "before Neurally" caveat
automatically); if the sector is a focus area and not a track record, say so
with `focusAreaNote`.

## Add an article

1. Create `src/content/insights/your-title.md`. The file name is the URL.
2. Front matter:

   ```yaml
   ---
   title: The title
   description: 110 to 165 characters for search results.
   standfirst: One or two sentences under the title.
   published: 2026-12-01
   tags: [Operating model]
   stage: design # optional: decide, design, deliver or embed
   readingMinutes: 6
   related: [use-cases/ai-operating-model]
   ---
   ```

3. Write the article in Markdown. Use `##` for section headings.
4. It appears on `/insights/`, on its tag pages and in `/rss.xml`. Set
   `draft: true` to keep it off the site.

Use `.mdx` instead of `.md` if you need a component inside an article.

## Change the design tokens

All tokens are in the `@theme` block at the top of `src/styles/global.css`:
colours, fonts, the type scale, spacing, radii, easing and durations. Change a
value there and every utility that uses it follows (`text-headline`,
`bg-surface`, `duration-base`, and so on).

- **Stage colours** (`--color-decide`, `--color-design`, `--color-deliver`,
  `--color-embed`) are the only chroma on the site. Each stage always keeps its
  own colour.
- **Tones.** A section is dark by default. Add `tone="paper"` to a `Section`
  (or `data-tone="paper"` to any element) and the semantic colours inside it
  (`bg`, `fg`, `muted`, `line`) switch. The two sets are defined just under
  the `@theme` block.
- **Fonts** are self-hosted through Fontsource packages and imported at the top
  of the same file. To change a typeface, install its package, swap the import
  and update `--font-display`, `--font-sans` or `--font-mono`.

`DESIGN.md` describes the design system and the reasoning behind it.

## Integrations

| What                                         | Where it is configured                                 | Notes                                   |
| -------------------------------------------- | ------------------------------------------------------ | --------------------------------------- |
| Web3Forms (contact form, assessment results) | `src/data/site.ts`                                     | The access key is public by design      |
| GoatCounter analytics                        | `src/data/site.ts`, loaded in `src/layouts/Base.astro` | Cookie-free                             |
| Calendly                                     | `src/data/site.ts`                                     | External link only; nothing is embedded |

If you add a third party, add it to the Content Security Policy in
`public/_headers` and describe it on the privacy page.
