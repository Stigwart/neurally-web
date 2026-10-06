---
name: Neurally
description: A dark, restrained working-ledger site for a senior AI and business transformation adviser, with four pastel stage colours as the only chroma.
colors:
  ink: "#1A1A1A"
  ink-sunken: "#141414"
  ink-raised: "#202020"
  ink-overlay: "#2A2A29"
  ink-border: "#383836"
  ink-border-strong: "#4A4A47"
  ink-muted: "#8A8A85"
  ink-secondary: "#B0ACA3"
  paper: "#FAF8F4"
  paper-sunken: "#EDEAE3"
  decide-blue: "#A9C4D9"
  decide-blue-light: "#C7DAE8"
  decide-blue-deep: "#7FA3BF"
  decide-blue-tint: "#34383C"
  design-yellow: "#EFDBA0"
  design-yellow-light: "#F5E7BE"
  design-yellow-deep: "#CFB877"
  design-yellow-tint: "#403D32"
  deliver-sage: "#B7C9A8"
  deliver-sage-light: "#CEDBC3"
  deliver-sage-deep: "#8FA67D"
  deliver-sage-tint: "#363933"
  embed-coral: "#E8A599"
  embed-coral-light: "#F0C0B7"
  embed-coral-deep: "#C97F71"
  embed-coral-tint: "#3F3331"
typography:
  display-l:
    fontFamily: "Archivo, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "56px"
    fontWeight: 400
    lineHeight: 1.04
    letterSpacing: "-0.038em"
  display-m:
    fontFamily: "Archivo, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "44px"
    fontWeight: 400
    lineHeight: 1.06
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Archivo, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "34px"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Archivo, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "20px"
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  body-l:
    fontFamily: "Instrument Sans, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.6
  body:
    fontFamily: "Instrument Sans, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
  body-s:
    fontFamily: "Instrument Sans, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Instrument Sans, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.14em"
rounded:
  xs: "2px"
  sm: "4px"
  md: "8px"
  lg: "12px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "40px"
  section: "96px"
  gutter: "32px"
components:
  button-primary:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "10px 20px"
  button-primary-hover:
    backgroundColor: "{colors.paper-sunken}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.paper}"
    rounded: "{rounded.md}"
    padding: "10px 20px"
  button-accent:
    backgroundColor: "transparent"
    textColor: "{colors.decide-blue}"
    rounded: "{rounded.md}"
    padding: "10px 20px"
  card:
    backgroundColor: "{colors.ink-raised}"
    textColor: "{colors.paper}"
    rounded: "{rounded.md}"
    padding: "24px"
  tag:
    backgroundColor: "{colors.ink-raised}"
    textColor: "{colors.ink-secondary}"
    rounded: "{rounded.sm}"
    padding: "4px 10px"
  input:
    backgroundColor: "{colors.ink-raised}"
    textColor: "{colors.paper}"
    rounded: "{rounded.md}"
    padding: "10px 14px"
---

# Design System: Neurally

## Overview

**Creative North Star: "The Operator's Ledger"**

The site reads like a senior operator's working document: dark, plain-spoken, and exact. A near-black Ink ground carries warm off-white type; structure comes from hairline borders and spacing rather than boxes, gradients or imagery. Colour is deliberately scarce. The only chroma on the page is four pastel stage colours that annotate the four stages of the work (Decide, Design, Deliver, Embed) and always appear in that order.

The mood is restrained, precise and authoritative. Headlines are set large, light-weight and tightly tracked, so a sentence carries the page instead of decoration. Body copy is compact and sits on a 62ch measure. The oversized logo mark appears once, as a 7%-opacity texture behind the hero, so brand presence is felt without being displayed.

This system rejects generic AI-startup gloss (gradients, glows, neon, brain and robot imagery) and big-four consultancy styling (stock-photo corporate, blue-and-grey deck aesthetics).

**Key Characteristics:**
- Dark Ink ground by default; an optional `.on-paper` inverse theme exists for light surfaces.
- One display family (Archivo) and one text family (Instrument Sans); two voices, no more.
- Four stage colours are semantic marks, never decoration.
- Hairline 1px borders and tonal surface layers instead of heavy shadows.
- Small radii (4px and 8px); no pills, no large rounded blocks.
- The only all-caps style is the 12px tracked kicker.

## Colors

A near-monochrome warm-neutral palette with four muted pastel accents. Blue doubles as the interface accent.

### Primary
- **Decide Blue** (#A9C4D9): The interface accent and first stage colour. Links, hero kicker, focus ring, accent button, active borders, "Decide" stat and tag. Deep (#7FA3BF) is the pressed state; light (#C7DAE8) is hover and tag text; tint (#34383C) is the hover/background wash.

### Secondary
- **Design Yellow** (#EFDBA0): Second stage colour ("Design"), and also the text-selection background. Light #F5E7BE, deep #CFB877, tint #403D32.
- **Deliver Sage** (#B7C9A8): Third stage colour ("Deliver"). Light #CEDBC3, deep #8FA67D, tint #363933.
- **Embed Coral** (#E8A599): Fourth stage colour ("Embed"), and the form error colour. Light #F0C0B7, deep #C97F71, tint #3F3331.

### Neutral
- **Ink** (#1A1A1A): Page ground.
- **Sunken Ink** (#141414): Recessed bands such as the stat band.
- **Raised Ink** (#202020): Cards, inputs, tags.
- **Overlay Ink** (#2A2A29): Subtle borders and overlays.
- **Border Ink** (#383836) / **Strong Border Ink** (#4A4A47): Default and emphasised hairlines.
- **Muted Ink** (#8A8A85): Kickers and meta text.
- **Secondary Ink** (#B0ACA3): Supporting copy.
- **Warm Paper** (#FAF8F4): Primary text on dark; page ground on `.on-paper`; inverse button fill.
- **Paper Sunken** (#EDEAE3): Primary button hover.

### Named Rules
**The Stage Order Rule.** The four stage colours always appear in the order blue, yellow, sage, coral, mapping to Decide, Design, Deliver, Embed. A stage colour is never used for anything but its stage (blue also serves as the interface accent).

**The Scarce Chroma Rule.** Outside the stage marks and the blue accent, the page is neutral. A new accent colour or gradient is never introduced.

## Typography

**Display Font:** Archivo (with Helvetica Neue, Helvetica, Arial)
**Body Font:** Instrument Sans (with Helvetica Neue, Helvetica, Arial)

**Character:** Archivo at regular weight with tight negative tracking gives headlines a calm, editorial authority. Instrument Sans keeps running text neutral and legible. Hierarchy comes from size and tracking, not weight.

### Hierarchy
- **Display L** (400, 56px, 1.04, -0.038em): Home hero headline. Drops to 40px under 720px.
- **Display M** (400, 44px, 1.06, -0.035em): Inner-page openers, capped at 22ch. 34px on small screens.
- **Headline** (400, 34px, 1.1, -0.03em): Stat values and section titles. 28px on small screens.
- **Title** (500, 20px, 1.25, -0.02em): Card and timeline headings.
- **Body L** (400, 18px, 1.6): Hero lede and section intros, max 62ch.
- **Body** (400, 16px, 1.6): Default text.
- **Body S** (400, 14px, 1.55): Card copy, labels, hints, stat descriptions.
- **Label** (400, 12px, 0.14em, uppercase): Kickers only.

### Named Rules
**The One Caps Rule.** Uppercase is used only for the 12px tracked kicker. Headings and buttons are sentence case.

**The Light Headline Rule.** Display and headline sizes use regular weight (400). Weight is not used to create emphasis at large sizes.

## Layout

A single centred container (max 1180px; 760px for narrow reading columns) with a 32px gutter (16px under 720px). Sections use 96px vertical padding (72px on small screens), with a tight variant of 56px. Grids are 2, 3 or 4 columns that collapse to 2 at 960px and 1 at 600px. The stat band uses subgrid so problem, value and label rows align across columns. The contact page splits 1.4fr and 1fr with a 56px gap and stacks at 860px. Spacing follows a 2/4/6/8/12/16/20/24/32/40/56/72/96/128 scale. Nav and footer repeat on every page.

## Elevation & Depth

Depth is mostly tonal: page (#1A1A1A), sunken (#141414), raised (#202020) and overlay (#2A2A29) layers, separated by 1px borders. Shadows are quiet and appear on cards and on hover only.

### Shadow Vocabulary
- **Small** (`0 1px 2px rgba(0,0,0,0.40)`): Cards at rest.
- **Medium** (`0 2px 6px rgba(0,0,0,0.45), 0 0 0 1px rgba(250,248,244,0.04)`): Linked card on hover.
- **Large** (`0 12px 32px rgba(0,0,0,0.55), 0 0 0 1px rgba(250,248,244,0.06)`): Reserved for overlays.

### Named Rules
**The Tonal First Rule.** Separate surfaces with a tone step or a hairline before reaching for a shadow.

## Shapes

Small, practical corners: 8px on buttons, cards, inputs; 4px on tags and focus outlines; 2px and 12px exist in the scale but are rarely used. The signature shape is the 3px by 44px stage rule, a short coloured bar that opens a section and carries its stage colour. There are no pills and no circular badges.

## Components

### Buttons
- **Shape:** 8px radius, 1px border, medium weight, sentence case.
- **Primary:** Warm Paper fill with Ink text, 10px 20px (large: 14px 26px, 18px text; small: 6px 14px). Hover shifts to Paper Sunken.
- **Secondary:** Transparent with a strong hairline border; hover adds the blue tint and a blue border.
- **Accent:** Transparent with a Decide Blue outline and text; hover adds the blue tint.
- **Ghost:** Transparent, secondary text; hover raises to the Raised Ink surface.
- **Press / Focus:** 1px downward nudge on press; 2px blue focus outline with 2px offset. Transitions run 160ms on `cubic-bezier(0.2, 0, 0, 1)`.

### Cards / Containers
- **Corner Style:** 8px.
- **Background:** Raised Ink (#202020) with a 1px subtle border.
- **Shadow Strategy:** Small at rest; linked cards gain medium shadow and a blue border on hover.
- **Internal Padding:** 24px, 12px gap between children, 14px secondary text.

### Tags
- **Style:** 4px radius, 14px text, 4px 10px padding. Stage variants use the stage tint as background and the stage's light colour as text, with no border.

### Inputs / Fields
- **Style:** Raised Ink fill, 1px default border, 8px radius, 10px 14px padding, 16px text.
- **Focus:** Border shifts to blue; the outline is suppressed in favour of the border.
- **Error:** Coral border and coral status text.

### Navigation
- **Style:** Ink bar with a 1px bottom hairline, 20px vertical padding. Wordmark ("neurally" in lowercase, Archivo medium, -0.035em) with the logo mark on the left; text links and one small accent button ("Book a conversation") on the right. The current page link is emphasised. Links wrap on narrow screens.

### Stat Band (signature)
A sunken band of four columns, one per stage. Each has a tracked kicker naming the client problem, a headline-size value in the stage colour, and a 14px description. It is the system's clearest expression of the stage colours.

### Hero
Left-aligned two-line display headline on Ink, blue kicker above, 18px lede, one primary and one secondary button, and the logo mark as a 7%-opacity texture bleeding off the right edge.

## Do's and Don'ts

### Do:
- **Do** keep the ground Ink (#1A1A1A) with Warm Paper (#FAF8F4) text; use `.on-paper` only for deliberate light surfaces.
- **Do** use stage colours in the order blue, yellow, sage, coral and only for their stage.
- **Do** set headlines at weight 400 with negative tracking; use size, not weight, for hierarchy.
- **Do** separate surfaces with tone steps and 1px hairlines before using shadows.
- **Do** open sections with the 3px by 44px stage rule when a stage applies.
- **Do** keep copy blocks within 62ch (44ch for section titles).
- **Do** honour `prefers-reduced-motion`; motion is limited to 90-240ms state transitions.

### Don't:
- **Don't** use gradients, glows, neon, or brain and robot imagery (generic AI-startup gloss).
- **Don't** use stock-photo corporate imagery or blue-and-grey deck styling (big-four consultancy).
- **Don't** add new accent colours, or use stage colours as decoration.
- **Don't** use all-caps outside the kicker.
- **Don't** add pill buttons, large radii, or heavy drop shadows.
- **Don't** show the logo mark at full opacity at large size; it is a texture, not an illustration.
- **Don't** use bold weights for large headings.
