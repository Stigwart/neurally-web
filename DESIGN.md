---
name: Neurally
description: A light, spacious site for a senior AI and business transformation adviser. Paper base, white rounded panels, four stage colours carrying the page, and one dark band at the close.
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
  decide-tint: "#E4EDF4"
  design-tint: "#FAF3DC"
  deliver-tint: "#E7EEE0"
  embed-tint: "#F8E1DC"
  lilac-100: "#EFEAF6"
  lilac-200: "#DDD3EC"
  lilac-300: "#C9BCE0"
  lilac-400: "#B3A2D3"
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
  hero:
    fontFamily: "Archivo Variable, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "clamp(2.75rem, 0.9rem + 7.4vw, 6.5rem)"
    fontWeight: 600
    lineHeight: 0.95
    letterSpacing: "-0.045em"
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
    fontFamily: "Instrument Sans Variable, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.08em"
rounded:
  xs: "2px"
  sm: "4px"
  md: "8px"
  lg: "14px"
  xl: "24px"
  2xl: "32px"
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

**Creative North Star: "Stage light"** (every page, from November 2026)

The site is light and spacious. It sits on warm paper with white
rounded panels, and the four stage colours carry the visitor down the page in
the order the work runs: Decide (blue), Design (yellow), Deliver (sage), Embed
(coral). There is one dark band, the closing call to action, which runs into
the footer.

Three things make it Neurally's own:

1. **Stage colour as the main image.** The four pastels drift behind the hero
   headline and fill the four stage cards. They are still used only for their
   own stage and always in stage order.
2. **One answer at a time.** Dense content is shown through interaction, not
   long lists: pick a problem to read its answer, open a stage to read its
   detail. Without scripting everything is shown.
3. **A call-led page.** "Book a free discovery call" is the one primary
   action. It appears in the hero, the problem answer, the first engagement
   card and the close. Links to other pages are text links.

It still rejects robot imagery, neon, logo walls, and metric tiles built on
client results. Neurally has none of those results yet and the design does not
pretend otherwise. Proof is carried by published fees, clear scope and
labelled career evidence.

**Home and inner pages.** The homepage is the fullest expression: a centred
hero, the problem picker, the stage row and the stepped engagement cards.
Inner pages share the tone, type, header and closing band, and use the same
white panels: tiles in a grid and rows in a list, in place of hairline-separated
lists. They stay left-aligned for long reading. Their heroes carry a quieter
echo of the home hero: four soft stage shapes at the right edge.

## Colour

### Tones

Every section has a tone. Components never hard-code a colour; they use
semantic utilities that resolve differently in each tone. The page default is
`light`. `Section tone="paper"` gives a slightly deeper band to separate long
pages, and `ink` is used only for the closing band and the footer.

| Utility                | Ink (close, footer) | Paper (`data-tone="paper"`) |
| ---------------------- | ------------------- | --------------------------- |
| `bg`                   | ink-900             | paper-200                   |
| `surface`              | ink-850             | paper                       |
| `raised`               | ink-800             | white                       |
| `fg`                   | paper               | ink-900                     |
| `muted`                | stone-400           | stone-600                   |
| `faint`                | stone-500           | stone-600                   |
| `line` / `line-strong` | paper at 13% / 30%  | ink at 14% / 40%            |
| `accent`               | decide              | decide-deep                 |

In `paper`, surface is white so panels stand out on the deeper band.
`light` (the default) is: bg paper, surface and raised white, fg ink-900,
muted and faint stone-600, line ink at 12%, accent decide-deep.

All text pairs meet WCAG AA (4.5:1) in both tones.

### Named rules

**The Stage Order Rule.** Stage colours always appear in the order blue,
yellow, sage, coral, and each is used only for its own stage. Set
`data-stage="decide"` (or design, deliver, embed) on an element and
`bg-stage`, `text-stage` and `border-stage` inside it take that colour. On
paper the deep variant is used automatically so text stays legible.

**The Wash Rule (Stage light).** Set `data-wash="decide"` (or design, deliver,
embed) to fill a panel with its stage colour. Text inside is ink and muted
text is darkened to ink-600, which keeps AA contrast on all four pastels.
Washes are for stage content and the hero shapes only. Every other panel is
white on paper.

**The Lilac Rule.** Lilac is the one secondary colour. It is for things that
are not a stage: the engagement cards (four steps, deepening with the length
of the engagement), the problem answer panel, and glows. Stage colours still
mean a stage and nothing else.

**The Tint Rule.** Each stage colour has a pale tint (`decide-tint` and so
on, set with `data-wash="decide-tint"`). Use a tint where content belongs to
a stage but a full wash would be too heavy, such as the three questions on
Approach.

**The Glow Rule.** Colour follows the visitor down every page as soft glows.
A section glow sits at one edge, alternating left and right down the page
(`glow` prop on `Section`). A glow can also sit behind a component such as the
founder portrait or the contact form (`Glow side="behind"`). Every glow mixes
at least two colours, taken from the stage colours and lilac. Glows are never
placed behind running text, and anything next to a "behind" glow is given
`relative` so it paints above it.

**The Scarce Chroma Rule.** There is no colour beyond the four stage colours,
their tints and deep shades, and lilac. The interface accent (links, focus
rings, text selection, primary-button hover) is the Decide blue, because the
first step is the action.

**The Hatch Rule.** The hatch means "AI
takes this on" in the allocation board on the Approach page and is otherwise
a quiet edge texture at low opacity, always masked to fade out. It is never a
full background, and it is not used on light panels.

## Typography

- **Archivo** (variable, weight 500) for display, headlines, titles and
  figures. Tight negative tracking, never below -0.04em.
- **Instrument Sans** (variable) for all running text.
- No monospace face. Index numbers, breadcrumbs, dates and small labels are
  sentence case in Instrument Sans at `text-sm`.

The home hero uses the `hero` size. `Beat` sets display and headline sizes at
weight 600. Home section headings are centred; inner pages are left-aligned.

Both are self-hosted. Archivo and Instrument Sans are preloaded.

**Plain-label headings.** Every heading names what its section contains:
"Our approach", "The four stages", "Common questions". The rules are:

- Key words first, so the heading makes sense read on its own.
- Sentence case and no full stop.
- One heading per section. There is no second headline line. A supporting
  sentence, where one helps, is ordinary text under the heading (the `second`
  prop on `Beat`), and it does end with a full stop.
- No heading that is only a count or a fragment, and no questions.
- The same section gets the same label on every page. Landing pages all use
  "What leaders are saying", "Decisions to make", "Common mistakes", "How the
  four stages apply", "Career evidence", "Where to start" and "Common
  questions". The page's own sentence sits beneath as the supporting line.

The homepage title, "Take AI from pilot to payback.", is Stuart's own line
and is the one exception. Article titles are editorial and are not covered.

**Index numbers** appear only where order carries meaning: stages 01–04,
engagements 00–08, numbered decisions. They are never decoration.

Headings use `text-wrap: balance`; paragraphs use `text-wrap: pretty`. Body
copy is held to a 42rem measure.

## Layout

- A 12-column grid inside an 80rem container with a fluid gutter.
- The common section shape is an asymmetric split: heading in 4 or 5 columns,
  content in 7 or 8.
- Lists are white panels, not hairline rows. Use `.tiles` with `.tile` for a
  grid of short items (32px radius) and `.rows` with `.row` for a stacked list
  (24px radius). A tile with `data-wash` takes its stage colour. Hairlines are
  kept only inside a panel, to separate its own lines.
- Section spacing is fluid (`py-section`, `py-section-sm`). On Stage light,
  sections after the first drop their top padding so the gap between bands is
  one `section` step, and the hero content sits centred in the first screen.
- On Stage light, panels are white with a 32px radius (`rounded-2xl`), section
  headings are centred, and lists that would be long become a picker or a row
  of cards.
- Tested at 375, 768, 1280 and 1600. No horizontal scroll at any width.

## Components

| Component         | Use                                                                                                                                                                                         |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Section`         | A band of the page. `tone="paper"` switches tone                                                                                                                                            |
| `Beat`            | A plain-label heading with an optional supporting line                                                                                                                                      |
| `PageHero`        | Breadcrumbs, H1, lede and actions for inner pages                                                                                                                                           |
| `Button`          | `primary` (filled pill), `secondary` (outline pill), `text` (underlined). The arrow nudges on hover                                                                                         |
| `AllocationBoard` | Approach page: seven tasks, three lanes, real radio controls. No longer on Home                                                                                                             |
| `ProblemPicker`   | Home: five problems with icons; one answer and a booking button on show at a time                                                                                                           |
| `StageRow`        | Home and Approach: the four stages as colour cards; one open, three collapsed to a spine; stacked on small screens                                                                          |
| `Steps`           | Home: engagements as lilac cards that step up in height with their length; the free call carries the button. A fifth, dark "Ongoing" step in the same layout sums up the longer engagements |
| `Ladder`          | The engagement ladder on Services: expandable white rows with fees                                                                                                                          |
| `Compare`         | "Without / With" rows                                                                                                                                                                       |
| `Faq`             | Accordion. One answer open at a time; also emits FAQ structured data via the page                                                                                                           |
| `LinkCards`       | White rows linking to other pages                                                                                                                                                           |
| `CareerNote`      | The caveat that must accompany every career figure                                                                                                                                          |
| `Glow`            | A soft glow of two or three colours, at a section edge or behind a component                                                                                                                |
| `Cta`             | The closing call to action                                                                                                                                                                  |
| `Field`           | Labelled input or textarea with an inline error                                                                                                                                             |

## Motion

Stage light motion is expressive and choreographed. It is built with GSAP and
ScrollTrigger, bundled from npm (`src/scripts/home.ts`). There is no smooth
scrolling library and nothing takes over the scroll.

- **Hero.** The headline lines rise out of a mask (CSS). The four stage
  shapes float in and then never sit still: each swells and wanders on its
  own slow loop, leans towards the mouse with a soft lag, and falls behind as
  the page scrolls.
- **Glows (every page).** Each glow drifts on a slow CSS loop, shifts as its
  section scrolls through the screen, and leans towards the mouse
  (`src/scripts/glow.ts`, no library).
- **Problems.** Icons draw their strokes in. A white highlight slides between
  statements, and the answer's lines rise in when the selection changes.
- **Stage row.** As the row arrives, each stage opens once in order and it
  rests on Decide. After that the visitor opens stages by hover, tap or key.
- **Rises.** Elements marked `data-rise` rise 32px and fade as they arrive,
  staggered within a group.
- **Close.** The dark band grows to full width as it arrives.
- **Micro-interactions.** Arrows nudge, cards lift 4px on hover, accordions
  open with an eased height.

Inner pages use CSS-only motion: `data-reveal` rises (`src/scripts/site.ts`)
and hero shapes that drift on a slow CSS loop. The stage row has its own small
script (`src/scripts/stage-row.ts`) with no library.
GSAP is loaded on the homepage only.

Rules: ease-out-expo for anything entering; nothing bounces. Content is
visible by default and entrance states are only set by script, so the page
never depends on JavaScript to become visible. With
`prefers-reduced-motion: reduce`, no entrance, drift or scroll-linked motion
runs, page transitions are disabled, and the picker and stage row still work.

## Browser surfaces

Text selection is Decide blue on ink. Focus rings are a 2px accent outline
with a 3px offset. Link underlines sit 0.22em below the baseline. Figures in
tables and tallies use tabular numerals. The scrollbar is themed to the ink
palette. Form carets take the accent.

## Do and don't

- Do let a sentence carry a section. Use an icon only where it helps someone
  scan a set of choices, from the bundled Lucide set in `src/lib/icons.ts`.
- Do keep one primary button per section, and make it the booking button.
  Don't use a filled or outlined button for a link to another page.
- Do use a stage colour for its stage. Don't use it because a section looks
  plain.
- Do label career figures with the employer and "before Neurally". Don't
  present them as tiles of client results.
- Do write new sections with existing components and tokens. Don't add
  arbitrary colour, size or spacing values where a token exists.
