# Neurally website upgrade — brief for Fable

You are rebuilding neurally.co.uk end to end and delivering it as one pull
request. Work autonomously. Stuart has already made the decisions in §2; don't
reopen them. If something is genuinely his call and you can't settle it from
this brief, the repo or the Drive docs, pick the safer option, record it in the
decision log (§9), and keep going. Don't stop to ask.

---

## 1. Outcome

A senior leader at a 50–1,000-person UK business lands on the site, from Google
or LinkedIn, and within 10 seconds should conclude: *this is a serious, senior
operator who understands my situation, and the first step is low-risk.* They
then book the free discovery call or take the assessment.

The finished site has to beat https://highintentlabs.com/ and the firms in
the Drive `Comps/` folder on perceived quality and credibility. The craft bar is the
best of godly.design and onepagelove.com, but **don't browse those galleries**. The
one design reference is Genesy (see §7 and `docs/fable/moodboard.md`).

Improve all seven areas together. Treat none as optional:

1. Copy and content
2. Quality and feel (open redesign)
3. More motion (expressive)
4. Higher engineering standards
5. SEO, including landing pages by use case, team and industry
6. Polish and consistency
7. Ease of maintenance and extension

## 2. Decisions already made by Stuart

| Topic | Decision |
|---|---|
| Stack | **Astro** (latest stable), static output, TypeScript strict, **Tailwind CSS v4** (via `@tailwindcss/vite`). Replaces the no-build HTML site. |
| Design reference | **https://genesy.framer.website/** is the only reference. Analysis is in `docs/fable/moodboard.md`. Don't search for others. |
| Hosting | **Cloudflare Pages** is the target. Build `npm run build`, output `dist/`. Real 301s via `public/_redirects`, security headers via `public/_headers`. Stuart connects the repo and handles DNS. Don't touch DNS or `CNAME` behaviour on `main`. **Cloudflare is not connected during your run, so there is no live preview.** Verify everything locally: serve `dist/` with `npx wrangler pages dev dist` (runs locally, no account needed) so `_redirects` and `_headers` are actually exercised, and run Playwright and Lighthouse against that local server. In CI, upload `dist/` as a build artefact on the PR so Stuart can download and inspect it. |
| Visual | **Open redesign.** Keep the name and logo mark (`assets/logo-warm-off-white.svg`, plus other colourways in Drive `design/logo-final-svg/`). Everything else can change: type, palette, layout, texture, imagery. It must stay recognisably *Neurally / The Human Ratio*, professional and calm in its confidence, not a startup template. |
| Motion | **Expressive.** Scroll-driven storytelling, a signature hero moment, page transitions, considered micro-interactions. It has to stay fast (§6) and must fully respect `prefers-reduced-motion`. |
| Copy | **Rewrite freely.** The primary source is the existing site copy. Use the Drive docs for depth and fact-checking. The result must be professional and must position Neurally strongly against competitors like High Intent Labs. |
| Landing pages | About 10–11 deep pages (§5). Quality beats volume. |
| Insights | Markdown/MDX-driven Insights section, plus 3 cornerstone articles. |
| Process | Fully autonomous, through to one PR. Work on a branch and never push to `main`; pushing `main` publishes the live site. |

## 3. Read first

**Start with `docs/fable/context-pack.md` and `docs/fable/moodboard.md`.** Together
they condense the current site copy, the Drive proposition, the fees, Stuart's
career evidence, the competitor landscape and the design reference into about 10k tokens. Treat
them as your working source. **Don't bulk-read the sources listed below.** Open one
only to check a specific fact (cite it in the claims ledger) or when you're porting
its code: `js/main.js` (Web3Forms submit and fallback), `js/assessment.js` (questions and
scoring), and the `<head>` of one page (GoatCounter tag, existing JSON-LD). Take one
reduced-scale screenshot of the live home page as the "before" image.

Sources, for spot-checks only:

1. This repo: `CLAUDE.md`, `PRODUCT.md`, `DESIGN.md`, `*.html`, `css/`, `js/`.
2. Drive docs, synced locally at
   `~/Library/CloudStorage/GoogleDrive-*/My Drive/ventures/neurally-docs/`
   (expand the glob; there is one Google Drive account folder):
   - `neurally-overview-v2.1.md`: the current, authoritative proposition. (`CLAUDE.md` refers to an older
     `overview.md` path; v2.1 is the one to use.)
   - `Comps/*.md`: competitor analyses, including `premium-ai-advisory-landscape.md`.
   - `neurally-one-page-summary-v2.html`: a compressed version of the pitch.
   - Read `proof-plan.md` **only** so you know what to keep off the site.
     The founding-client discount never appears anywhere in this repo or on the site.
3. Competitor (already summarised in the context pack, §10): https://highintentlabs.com/. It sells AI-agent consulting plus
   leader training, and leans on a ~50-logo wall, named testimonials and
   cohort scarcity. **Neurally has none of those and must not fake them.** Win on:
   senior operator depth (19+ years, regulated consumer platforms), published
   fixed fees, decision-to-delivery continuity, Consumer Duty and FCA
   credibility, intellectual clarity (The Human Ratio, anchored as described in
   the context pack §1), and a noticeably better crafted site.

## 4. Non-negotiables

- **Honest evidence only.** Never invent client results, testimonials, logos,
  case studies or statistics. Career figures stay labelled as pre-Neurally
  career evidence. Past employers can be named in text as Stuart's career
  history. Never present them as a client logo wall. Professional services is
  a focus sector, not claimed past experience. Keep `docs/claims-ledger.md`:
  one row per factual claim on the site, with its source (file and section).
- **Regulated-audience tone.** No overstated AI outcomes, no hype. British English (en-GB).
- **Integrations keep working:** Web3Forms (the existing access key in
  `js/main.js`, shared by the assessment), GoatCounter (`neurally.goatcounter.com`,
  on every page), Calendly (`https://calendly.com/stuartdavis/30min`, external
  link). The privacy page must still describe exactly what the site does. If you
  add any new third party (fonts CDN, analytics events, etc.), update the privacy page.
- **Prefer no new third-party requests at runtime.** Self-host fonts.
- **The AI maturity assessment keeps its questions, scoring and scenarios**
  unless you find a real bug. Port it to a typed island and restyle it.
- **Never break existing URLs.** Every current `*.html` URL either still
  resolves or 301s to its new clean URL via `_redirects`. Update the sitemap,
  canonicals and internal links.
- Update `CLAUDE.md`, `README.md`, `PRODUCT.md` and `DESIGN.md` to match the new
  reality (Astro, Cloudflare, landing pages and Insights now allowed). Stuart has
  authorised the landing pages and Insights, which supersedes the old "six pages
  only" rule.

## 5. Information architecture and SEO

Do some keyword and SERP research for UK intent first (web search, plus checking
who ranks), then finalise slugs and titles. Starting point:

- **Core:** Home, Approach, Services (engagement ladder with published fees), About,
  Contact, Assessment, Privacy, 404.
- **Industries** (`/industries/…` + hub): Financial services & insurance;
  Marketplaces & e-commerce; B2B SaaS & subscription; Professional services
  (focus area, no claim of past client work).
- **Teams** (`/teams/…` + hub): Product & technology leaders; Operations &
  customer service; CEOs, founders & boards.
- **Use cases** (`/use-cases/…` + hub): AI strategy for the board; AI
  transformation rescue; AI operating model & governance. Split the last one
  into two pages only if the research shows distinct search intent and you can
  give each enough substance.
- **Insights** (`/insights/…`): index, tags, RSS, 3 cornerstone articles
  built from the positioning. Suggested angles: why AI pilots don't pay back;
  The Human Ratio, deciding what stays with people; AI governance under Consumer Duty.

Each landing page must be **genuinely distinct**: the reader's situation in
their own words, the specific decisions and risks for that context, how the
Neurally path applies, the relevant entry engagement and fee, a page-specific
FAQ, and contextual internal links. No templated pages with nouns swapped in.
If you can't make a page substantive from the sources, drop it and say so in
the PR.

Technical SEO: unique titles and meta descriptions, canonicals, `@astrojs/sitemap`,
robots, OG/Twitter images (generated per page at build time is ideal),
JSON-LD (Organization, Person, ProfessionalService, Service with offers,
FAQPage, BreadcrumbList, Article), breadcrumbs, semantic headings, internal-link
hubs, a fast LCP.

## 6. Engineering and quality bar

- **Structure:** layouts, components, content collections with **Zod schemas**
  for industries, teams, use cases and insights, so a new landing page is one
  Markdown/MDX file with front matter and no new code. One nav/footer component.
- **Styling: Tailwind CSS v4.** Put design tokens in one `@theme` block (colours,
  fonts, type scale, spacing, radii, easing and durations). Use utilities in
  components. Extract a component instead of repeating long class strings, and avoid
  `@apply` except for prose and base styles. Use `@tailwindcss/typography` for MDX
  articles, `prettier-plugin-tailwindcss` for class order, and no arbitrary values where a
  token should exist. Replace the old `css/tokens.css` and `css/styles.css` entirely.
- **Motion:** pick the minimum library set that delivers the effect, for example
  GSAP + ScrollTrigger and/or CSS scroll-driven animations, plus Astro view
  transitions. Load motion code lazily and only on pages that use it. Every
  effect needs a reduced-motion fallback that still reads well.
- **Tooling and CI** (GitHub Actions on the PR): `astro check`, ESLint, Prettier,
  build, internal link check, html validation, Playwright smoke tests (key
  pages render, contact and assessment forms submit against a mocked endpoint, no
  console errors), axe accessibility checks, Lighthouse CI with budgets.
- **Budgets (mobile, Lighthouse):** Performance ≥ 95, Accessibility 100, Best
  Practices 100, SEO 100. LCP < 2.0s, CLS < 0.05, INP good. Initial JS on content
  pages ≤ 60 KB gz excluding the motion chunk. WCAG 2.2 AA.
- **Responsive:** test at 375, 768, 1280, 1600. No horizontal scroll and no motion jank.
- **Security headers** in `_headers` (CSP that allows GoatCounter, Web3Forms and
  Calendly links, HSTS, Referrer-Policy, Permissions-Policy).

## 7. Design process

1. **Reference.** Read `docs/fable/moodboard.md` (Genesy, already analysed).
   View it once, following the screenshot rules in §8. Don't browse for more references.
2. **Direction.** Write a short design direction: concept, type pairing,
   palette, grid, texture/imagery, motion principles, and the signature hero moment.
   One idea worth exploring is a visual expression of *The Human Ratio*: the
   balance between what AI takes on and what stays with people. Choose one
   direction and commit to it.
3. **Build the homepage first.** Critique it hard against the references, iterate, and only
   then roll the system out across every page.
4. Use the **`impeccable`** skill installed in this repo for the shape → craft →
   critique → polish → audit loop and to regenerate `DESIGN.md`.
5. **Final pass:** the delegated screenshot sweep (§8) and a reduced-motion
   check, copy read-through for consistency of voice, terms and capitalisation,
   then run `/code-review` on the branch and fix what it finds.

## 8. How to spend tokens

You're the expensive, capable model, so do the judgement work yourself:
architecture, design direction, copy, landing-page content, critique.
Delegate to a cheaper subagent (`model: "haiku"`, or `"sonnet"` for slightly
more judgement) **only** when the task is well specified, low on judgement, and the
result comes back as a short summary, so delegating clearly saves tokens.
Examples:
- Fetching and summarising SERPs and keyword research into a compact table.
- Sweeping the built site for broken links, missing alt text or meta-length issues
  and returning a list.
- Running the test/lint/Lighthouse suite and returning only the failures.
- Mechanical, fully specified edits across many files.

Don't delegate design or copy decisions, and don't fan out large numbers of
agents. Avoid re-reading files you already have in context.

### Screenshot rules

Images are the biggest hidden token cost in this run.

- **Check text, structure, links, headings and meta by reading the page** (page text,
  the accessibility tree, or `curl` plus a parser), not with a screenshot.
- **Default to reduced scale (0.5 or less).** Use full resolution only for detail
  work on the homepage hero and one exemplar landing page, and zoom into a region
  rather than re-capturing the whole page.
- **Take one screenshot per iteration**, after a meaningful change. Don't take one
  after every edit, and don't capture several breakpoints while a design is still moving.
- **Check motion with a few stills.** Capture at most three frames of an animation
  (start, middle, end), plus a reduced-motion check. Use a script to test that it runs
  without jank (for example a Playwright trace or a check on the long-animation-frame
  API), not repeated screenshots.
- **Delegate the final sweep.** A Haiku subagent captures every page at 375 / 768 /
  1280 / 1600, at reduced scale, and returns **only a list of defects** (overflow,
  overlap, clipped text, contrast, broken images), never the images. You view only the
  ones it flags.
- **For PR before/after images**, save them to disk with Playwright and attach the
  files. Don't view them yourself.

## 9. Deliverables (in the PR)

- The Astro site on a branch, plus one PR against `main`. The PR description
  covers before/after screenshots (home, one landing page, mobile), the
  Lighthouse scores, the page inventory, and a URL redirect map.
- `docs/claims-ledger.md`: every factual claim → its source.
- `docs/fable/decision-log.md` (every
  assumption you made in Stuart's place).
- `README.md` with sections on running locally, deploying, adding a landing
  page in under 10 minutes, adding an article, and changing tokens.
- A **"Stuart's manual steps"** checklist at the top of the PR. It must open
  with a bold warning: **do not merge until Cloudflare Pages is connected.**
  GitHub Pages serves `main` from the repo root, so merging the Astro source
  while GitHub Pages is still live would break the site. Then: run the site
  locally (exact commands), connect the repo to Cloudflare Pages (exact
  settings), check the preview, merge, cut DNS over from GitHub Pages,
  resubmit the sitemap in Search Console, update the LinkedIn links, and
  anything else only he can do.

Done means: CI is green, every budget in §6 is met (or any shortfall is
explained), every page is in the claims ledger, and nothing in §4 is broken.
