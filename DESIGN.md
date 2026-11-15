---
name: Neurally
description: A dark-and-paper editorial ledger for a senior AI and business transformation adviser. Four stage colours are the only chroma, and a fine hatch from the logo is the only texture.
colors:
  ink-950: "#0C0C0B"
  ink-900: "#121211"
  ink-850: "#191918"
  ink-800: "#212120"
  ink-700: "#2C2C2A"
  ink-600: "#3A3A37"
  paper: "#FAF8F4"
  paper-200: "#F2EFE8"
  paper-300: "#E6E2D9"
  stone-400: "#ABA79E"
  stone-500: "#8F8C84"
  stone-600: "#5A5750"
  decide: "#A9C4D9"
  design: "#EFDBA0"
  deliver: "#B7C9A8"
  embed: "#E8A599"
  decide-deep: "#3F6885"
  design-deep: "#7A6520"
  deliver-deep: "#4C6638"
  embed-deep: "#9C4A3A"
typography:
  display:
    fontFamily: "Archivo Variable, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "clamp(2.5rem, 1.1rem + 4.6vw, 4.75rem)"
    fontWeight: 500
    lineHeight: 0.98
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Archivo Variable, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "clamp(1.875rem, 1.3rem + 2.4vw, 3.25rem)"
    fontWeight: 500
    lineHeight: 1.06
    letterSpacing: "-0.032em"
  figure:
    fontFamily: "Archivo Variable, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "clamp(2.25rem, 1.6rem + 2.6vw, 3.75rem)"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Archivo Variable, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "clamp(1.375rem, 1.2rem + 0.7vw, 1.75rem)"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  body-xl:
    fontFamily: "Instrument Sans Variable, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "clamp(1.25rem, 1.15rem + 0.4vw, 1.4375rem)"
    fontWeight: 400
    lineHeight: 1.4
  body-lg:
    fontFamily: "Instrument Sans Variable, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.55
  body:
    fontFamily: "Instrument Sans Variable, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  body-sm:
    fontFamily: "Instrument Sans Variable, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "IBM Plex Mono, ui-monospace, SF Mono, Menlo, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.08em"
rounded:
  xs: "2px"
  sm: "4px"
  md: "8px"
  lg: "14px"
  full: "999px"
spacing:
  gutter: "clamp(1.25rem, 0.6rem + 3vw, 3rem)"
  section: "clamp(4.5rem, 3rem + 7vw, 9rem)"
  section-sm: "clamp(3rem, 2rem + 4vw, 5.5rem)"
  page: "80rem"
  measure: "42rem"
motion:
  ease-out-expo: "cubic-bezier(0.16, 1, 0.3, 1)"
  fast: "160ms"
  base: "320ms"
  slow: "700ms"
  slower: "1100ms"
components:
  button-primary:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink-900}"
    rounded: "{rounded.full}"
    padding: "0 20px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.paper}"
    rounded: "{rounded.full}"
    padding: "0 20px"
  panel:
    backgroundColor: "{colors.ink-850}"
    textColor: "{colors.paper}"
    rounded: "{rounded.lg}"
    padding: "24px"
  input:
    backgroundColor: "{colors.ink-850}"
    textColor: "{colors.paper}"
    rounded: "{rounded.md}"
    padding: "12px 16px"
---

# Design System: Neurally

The tokens above mirror the `@theme` block in `src/styles/global.css`, which is
the source of truth. If the two ever disagree, the CSS wins and this file needs
updating.

## Overview

**Creative North Star: "The Operator's Ledger"**

The site reads like a senior operator's working document: plain-spoken, exact
and unhurried. Sentences carry the page. Structure comes from hairlines, a
strict grid and generous space between sections, not from cards, gradients or
stock imagery.

The reference for craft and rhythm is Genesy (see `docs/fable/moodboard.md`):
a near-monochrome base, one disciplined accent, large confident type, two-beat
headlines and a mono index system. Neurally keeps that restraint and makes it
its own in three ways:

1. **Stage colour.** The only chroma is four pastel colours, one for each stage
   of the work: Decide (blue), Design (yellow), Deliver (sage), Embed (coral).
2. **The hatch.** The logo is drawn from parallel strokes. The same fine
   diagonal hatch is the site's single texture. In the hero it marks work that
   AI takes on; elsewhere it appears only as a faint edge.
3. **Ink and paper.** Sections alternate between a warm near-black and a warm
   paper, so long copy is comfortable to read and the page has a pulse.

It rejects AI-startup gloss (gradients, glows, neon, robot imagery), big-firm
deck styling, logo walls, and metric tiles built on client results. Neurally
has none of those results yet and the design does not pretend otherwise. Proof
is carried by published fees, clear scope and labelled career evidence.

## Colour

### Tones

Every section is one of two tones. Components never hard-code a colour; they
use semantic utilities that resolve differently in each tone.

| Utility                | Ink (default)      | Paper (`data-tone="paper"`) |
| ---------------------- | ------------------ | --------------------------- |
| `bg`                   | ink-900            | paper-200                   |
| `surface`              | ink-850            | paper                       |
| `raised`               | ink-800            | white                       |
| `fg`                   | paper              | ink-900                     |
| `muted`                | stone-400          | stone-600                   |
| `faint`                | stone-500          | stone-600                   |
| `line` / `line-strong` | paper at 13% / 30% | ink at 14% / 40%            |
| `accent`               | decide             | decide-deep                 |

All text pairs meet WCAG AA (4.5:1) in both tones.

### Named rules

**The Stage Order Rule.** Stage colours always appear in the order blue,
yellow, sage, coral, and each is used only for its own stage. Set
`data-stage="decide"` (or design, deliver, embed) on an element and
`bg-stage`, `text-stage` and `border-stage` inside it take that colour. On
paper the deep variant is used automatically so text stays legible.

**The Scarce Chroma Rule.** Outside stage marks, the page is neutral. The
interface accent (links, focus rings, text selection, primary-button hover) is
the Decide blue, because the first step is the action. No fifth colour, and no
gradients.

**The Hatch Rule.** The hatch means "AI takes this on" in the allocation board
and is otherwise a quiet edge texture at low opacity, always masked to fade
out. It is never a full background.

## Typography

- **Archivo** (variable, weight 500) for display, headlines, titles and
  figures. Tight negative tracking, never below -0.04em.
- **Instrument Sans** (variable) for all running text.
- **IBM Plex Mono** for index numbers, breadcrumbs, dates and small uppercase
  labels only. It marks data and sequence. It is not used for body copy.

All three are self-hosted. Archivo and Instrument Sans are preloaded.

**Two-beat headings.** Most headings are a statement followed by a quieter
second line that completes it ("Governance runs through every stage. / It starts before anything is built."). The `Beat` component renders the second beat in `muted`. Keep both
beats short, and don't force a second beat where the first is enough.

**Index numbers** appear only where order carries meaning: stages 01–04,
engagements 00–08, numbered decisions. They are never decoration.

Headings use `text-wrap: balance`; paragraphs use `text-wrap: pretty`. Body
copy is held to a 42rem measure.

## Layout

- A 12-column grid inside an 80rem container with a fluid gutter.
- The common section shape is an asymmetric split: heading in 4 or 5 columns,
  content in 7 or 8.
- Lists are rows separated by hairlines, not cards. Panels with a border and a
  14px radius are reserved for things that are objects: the allocation board,
  forms, the entry-engagement block, the assessment prompt.
- Section spacing is fluid (`py-section`, `py-section-sm`).
- Tested at 375, 768, 1280 and 1600. No horizontal scroll at any width.

## Components

| Component         | Use                                                                                                 |
| ----------------- | --------------------------------------------------------------------------------------------------- |
| `Section`         | A band of the page. `tone="paper"` switches tone                                                    |
| `Beat`            | Two-beat heading at display, headline or title size                                                 |
| `PageHero`        | Breadcrumbs, H1, lede and actions for inner pages                                                   |
| `Button`          | `primary` (filled pill), `secondary` (outline pill), `text` (underlined). The arrow nudges on hover |
| `AllocationBoard` | The hero signature: seven tasks, three lanes, real radio controls                                   |
| `StagePath`       | The four stages as a scroll story with a sticky index                                               |
| `Ladder`          | The engagement ladder: expandable rows, or linked rows on Home                                      |
| `Compare`         | "Without / With" rows                                                                               |
| `Faq`             | Accordion. One answer open at a time; also emits FAQ structured data via the page                   |
| `LinkCards`       | Hairline rows linking to other pages                                                                |
| `CareerNote`      | The caveat that must accompany every career figure                                                  |
| `Cta`             | The closing call to action                                                                          |
| `Field`           | Labelled input or textarea with an inline error                                                     |

## Motion

Motion is expressive in a few places and absent everywhere else.

- **The hero settle.** On load, each task on the allocation board starts
  undecided at the left and settles into its lane in sequence. Moving a task
  slides its marker and changes its fill.
- **Line rise.** Page headlines rise out of a mask, one beat after the other.
- **Scroll story.** In the stage path, a rule in each stage's colour draws
  down as you read, and the sticky index marks the current stage.
- **Reveals.** Rows rise 16px and fade as they enter, staggered within a
  group. Hairlines draw from the left.
- **Page transitions.** A short cross-fade and rise between pages, using
  cross-document view transitions. No JavaScript is involved.
- **Micro-interactions.** Arrows nudge, disclosure icons rotate, accordions
  open with an eased height.

Rules: ease-out-expo for anything entering; nothing bounces; durations come
from tokens. Content is visible by default and entrance motion only applies
when scripting is available. With `prefers-reduced-motion: reduce`, every
animation and transition is switched off, page transitions are disabled, and
all content is shown in its final state.

The motion code is about 2 KB of TypeScript (`src/scripts/site.ts`) with no
library.

## Browser surfaces

Text selection is Decide blue on ink. Focus rings are a 2px accent outline
with a 3px offset. Link underlines sit 0.22em below the baseline. Figures in
tables and tallies use tabular numerals. The scrollbar is themed to the ink
palette. Form carets take the accent.

## Do and don't

- Do let a sentence carry a section. Don't add an icon to explain it.
- Do use a stage colour for its stage. Don't use it because a section looks
  plain.
- Do label career figures with the employer and "before Neurally". Don't
  present them as tiles of client results.
- Do write new sections with existing components and tokens. Don't add
  arbitrary colour, size or spacing values where a token exists.
