# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

CEOs, founders, and product and technology leaders of scaling and established businesses (roughly 50 to 1,000 people) where AI could change costs, capacity, speed, products or customer value, but the route from experiments to investment decisions is unclear. Product and technology leaders are a first-class buyer, not secondary. Sectors of particular depth: financial services and insurance, marketplaces and e-commerce, B2B SaaS and subscription, professional services.

They arrive with AI activity but no payback: pilots and tool purchases multiplying, disconnected initiatives, a board expecting an AI strategy, or a transformation that needs diagnosing or rescuing.

## Product Purpose

The public website for Neurally, an AI and business transformation advisory run by Stuart Davis. It explains the proposition and moves a qualified visitor to book a free 30-minute discovery call (Calendly), take the AI maturity assessment, or send a contact form message (Web3Forms). Success is a well-fitted leader booking a scoping conversation.

## Positioning

A senior operator, not an adviser. Stuart brings 19+ years leading product, technology and transformation in regulated consumer platforms (Compare the Market, Fresha, ClearScore, Not On The High Street, Gumtree) and carries work from the board-level decision through operating-model redesign into delivery. Fixed, published fees for the first three engagements make entry low-risk. Full positioning: Drive `neurally-docs/neurally-overview-v2.1.md`.

## Operating Context

Business documentation is the source of truth and lives in Google Drive (`ventures/neurally-docs`), not in this repo. Copy changes start there. The site is an Astro static site (TypeScript, Tailwind CSS v4) deployed to Cloudflare Pages at neurally.co.uk. Merging to `main` publishes; every pull request gets a preview. Navigation and footer are single components, and facts used in more than one place live in `src/data/`.

## Capabilities and Constraints

- Core pages: Home, Approach, Services, About, Contact, Assessment, Privacy, 404.
- Landing pages by industry, team and use case, and an Insights section with articles. These are Markdown files validated by a schema. Stuart has authorised adding more where a page is substantive and distinct.
- Engagement ladder: free discovery call; AI Opportunity Workshop (1 day, £2,500, credited against a Diagnostic or Deep Dive booked within 60 days); AI Advantage Diagnostic (1 week, £6,000); AI Transformation Deep Dive (2 weeks, £12,500). Operating-model design is a fixed fee once scoped. Implementation support, transformation leadership, AI training and advisory are quoted after scoping.
- Neurally never sells software or resells tools; client teams or chosen partners do the build.
- British English (en-GB).
- Claims must hold up with regulated-sector audiences (FCA, Consumer Duty). Do not overstate AI outcomes. Every factual claim has a row in `docs/claims-ledger.md`.
- The founding-client discount is private and network-only; never put it on the site.
- Integrations: Web3Forms (contact form and assessment results), GoatCounter cookie-free analytics, Calendly external link. Fonts are self-hosted.
- Budgets: Lighthouse mobile Performance 95+, Accessibility, Best Practices and SEO 100; WCAG 2.2 AA; all motion respects reduced-motion.

## Brand Commitments

Name: Neurally. The logo mark and founder headshot are in `src/assets/` and `public/assets/`. Design tokens are in the `@theme` block of `src/styles/global.css`; `DESIGN.md` describes the system.

## Evidence on Hand

- Career evidence from pre-Neurally roles (About page), with figures from the Drive overview. It must stay labelled as pre-Neurally career outcomes, not client results.
- No Neurally client case studies, testimonials or endorsements exist. Do not fabricate them. There is no endorsements section; do not add one until real endorsements exist.

## Product Principles

1. Honest evidence only: every claim traces to the Drive docs or Stuart directly.
2. Operator credibility over consultancy theatre: show real experience and clear scope.
3. Business outcomes first, technology second: decisions, operating model and delivery, not tools.
4. Low-risk entry: fixed fees and a free first call are visible and plain.
5. Say what stays with people as well as what AI takes on.
