---
name: DeepGrid Silicon Portfolio
description: Mature-node silicon portfolio and strategy, with DG32 as the detailed pre-silicon engineering proof point. v6 preserves ink, copper, bone and self-hosted Newsreader, Inter and JetBrains Mono.
colors:
  ink: "#101212"
  surface: "#191d1b"
  muted: "#292d29"
  accent-surface: "#343d31"
  border: "#3d453b"
  rule: "#48544066"
  paper: "#eeeae2"
  paper-bright: "#f4f0e7"
  ink-2: "#a7b09f"
  muted-foreground: "#a0a59b"
  copper: "#d4a36e"
  copper-ring: "#d9ac78"
  hardware: "#bf7f3b"
  cpu: "#a0a59b"
  safe: "#2f9e8c"
  overlay-shadow: "rgb(0 0 0 / .45)"
  bone-ink: "#18201c"
  bone-muted: "#48534b"
  bone-copper: "#78522e"
  portfolio-muted: "#aaaFA7"
  portfolio-rule: "#343b36"
  portfolio-frame: "#566157"
  strategy-rule: "#8c978b"
  diagnostics-surface: "#151a17"
  evaluation-surface: "#1b221e"
  evaluation-muted: "#aab3a8"
  journey-rule: "#677166"
typography:
  portfolio-display:
    fontFamily: "'Newsreader Variable', Georgia, serif"
    fontSize: "clamp(3.5rem, 6vw, 6.5rem)"
    fontWeight: 450
    lineHeight: 1.02
    letterSpacing: "-0.025em"
  portfolio-headline:
    fontFamily: "'Inter Variable', system-ui, sans-serif"
    fontSize: "clamp(2rem, 3.7vw, 4rem)"
    fontWeight: 450
    lineHeight: 1.13
    letterSpacing: "-0.025em"
  portfolio-body:
    fontFamily: "'Inter Variable', system-ui, sans-serif"
    fontSize: "1rem"
    lineHeight: 1.75
  portfolio-label:
    fontFamily: "'JetBrains Mono Variable', monospace"
    fontSize: "0.7rem"
    letterSpacing: "0.09em"
  display:
    fontFamily: "'Newsreader Variable', Georgia, 'Times New Roman', serif"
    fontSize: "clamp(2.4rem, 3.8vw, 3.5rem)"
    lineHeight: 1.05
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "'Newsreader Variable', Georgia, 'Times New Roman', serif"
    fontSize: "clamp(1.9rem, 2.6vw, 2.45rem)"
    lineHeight: 1.16
    letterSpacing: "-0.025em"
  title:
    fontFamily: "'Newsreader Variable', Georgia, 'Times New Roman', serif"
    fontSize: "clamp(1.5rem, 2.1vw, 1.95rem)"
    lineHeight: 1.22
    letterSpacing: "-0.02em"
  body:
    fontFamily: "'Inter Variable', system-ui, sans-serif"
    fontSize: "0.9375rem"
    lineHeight: 1.65
    letterSpacing: "normal"
  label:
    fontFamily: "'JetBrains Mono Variable', ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "0.75rem"
    letterSpacing: "0.08em"
rounded:
  xs: "2px"
  sm: "3px"
  md: "4px"
  lg: "6px"
  xl: "8px"
  pill: "9999px"
  circle: "50%"
spacing:
  measure: "64ch"
components:
  button-primary:
    backgroundColor: "{colors.copper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "10px 16px"
  text-link:
    textColor: "{colors.copper}"
    typography: "{typography.body}"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.paper}"
    rounded: "{rounded.md}"
    padding: "16px 20px"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.paper}"
    rounded: "{rounded.md}"
    padding: "11px 13px"
    height: "44px"
---

# Design System: DeepGrid Silicon Portfolio

<!-- Incumbent identity extracted 2026-09-24; v6 merged from implementation 2026-09-30. Sources: app/globals.css, app/dr.css, app/portfolio-v6.css, app/route-journey.css and app/portfolio-workbench.tsx. Owner delegated the direction and documentation merge; historical audit counts are not current verification. -->

## Overview

The v6 merge (2026-09-30) follows the approved system-workbench direction with named product labels
and maturity discipline. The portfolio leads; DG32 is the inspectable engineering case. The incumbent
ink/copper/bone palette, wordmark and three font families remain the identity. Bone now carries selected
strategy and qualification sections; it is the existing paper material used as a surface, with dark text
and deeper copper for legibility. It does not introduce another brand accent.

**Creative North Star: "The Datasheet That Argues"**

This is a semiconductor reference document that happens to be a website. It reads like a well set
technical journal: serif headings that state a finding, sans-serif body text at a comfortable
measure, and monospace for anything a machine produced. The page is dark because a datasheet full
of oscilloscope traces, die renders and signal diagrams is easier to read on ink than on paper, and
because the imagery it carries is photographic and dark.

The restraint is the argument. Every figure on the site carries the kind of evidence behind it, and
claims that failed verification are printed with the reason they were withdrawn. A visual system
that shouted would undercut that. So: one accent colour, used sparingly; rules and type rather than
cards and shadows; no gradients on text, no glows, no stripes down the side of a panel. Where the
site wants emphasis it uses size, weight and space.

Motion is functional. The v6 workbench uses function selection and fault injection to expose causal states. Retained engineering routes carry their established interactions. Every explanation needs a complete readable resting state: content that exists only mid-animation is unavailable in screenshots and to readers with reduced motion. Runtime validation is required before motion behavior is marked passed.

**Key Characteristics:**
- Dark ink ground, warm copper accent, one cool teal reserved for the safe state
- Serif display over sans body over monospace labels: three voices, never four
- Rules and type carry structure; shadows appear only on overlays and on hover
- Evidence grade printed next to figures, not implied
- Reduced motion is a first-class path, not a fallback

## Colors

A warm copper accent on a cool near-black ground, with a single teal admitted only where the
hardware is in a safe state.

### Primary
- **Copper** (`#d4a36e`): the one accent. Section kickers, active tabs, links, the left edge of a
  data bar, the value a reader is meant to land on. A slightly lighter **Copper Ring**
  (`#d9ac78`) is the focus ring and the primary fill.
- **Hardware Copper** (`#bf7f3b`): deeper, used only for the hardware share of a cycle-budget bar,
  so hardware and CPU are distinguishable without a legend.

### Secondary
- **Signal Teal** (`#2f9e8c`): reserved. It marks the safe state, a held value and a passing gate.
  It is the only hue on the site that is not copper or neutral, and it earns that by never being
  decorative.

### Neutral
- **Ink** (`#101212`): the page ground. Cool, very slightly green.
- **Surface** (`#191d1b`): panels, inputs and any raised block.
- **Muted** (`#292d29`) and **Accent Surface** (`#343d31`): selection and hover grounds.
- **Border** (`#3d453b`): the visible edge on inputs and cards.
- **Rule** (`#48544066`): the hairline. Deliberately translucent, so it recedes on any ground.
- **Paper** (`#eeeae2`): body text. **Paper Bright** (`#f4f0e7`) for emphasis on a dark panel.
- **Ink 2** (`#a7b09f`) and **Muted Foreground** (`#a0a59b`): secondary text, captions and labels.

### Portfolio surface roles (v6)
- **Bone:** Paper is the ground of reuse and qualification chapters and the company route-to-market
  section. Bone Ink, Bone Muted and Bone Copper provide dark text and a deeper copper link on this ground.
- **Diagnostics / Evaluation Surface:** subdued dark grounds separate workload constraints and the close.
- **Portfolio / Strategy / Journey Rules:** hairlines and frames organise atlas rows and flat diagrams.
- **Industrial materials:** the workbench renderer uses literal copper, package, pad, seam and light colours.
  These describe object shading, not new UI accents. The sidecar records only actual renderer literals;
  removed colours from the historical detector snapshot are not added to the palette.

### Named Rules

**The One Accent Rule.** Copper is the only accent. A new state gets a new *shape*, weight or
position, not a new hue. Teal is the single exception and it means "safe", nothing else.

**The Named Colour Rule.** Repeated UI colours use named roles. The v6 bone, rule and dark-surface roles above are extracted from implementation. Industrial renderer materials are documented separately rather than promoted to interaction tokens. Historical literal-count audits are not current measurements.

**v10 decisions (2026-10-04).** Three roles were settled in the v10 QA pass. (1) **Diagram Ground**
(`#f4f2ec`, token `--diagram-ground`) is the light ground behind the draw.io architecture diagrams on the
product pages. (2) **Safe** (`--safe`, Signal Teal) is now its own token: `--cpu` had been teal and was used
both for the CPU share of a cycle bar and for safe states, which broke the teal rule; the CPU share is now
the neutral `--muted-foreground`, and every safe state reads `--safe`. (3) The product hero's exploded-die
render uses dark material shades (`#1d2420`, `#121614`, `#2a2f2a`, `#181c1a`) under the object-shading
exemption; they are renderer materials, not interaction colours.

**The Alpha Is Not A Colour Rule.** `#d4a36e1f` is copper at 12%, not a separate colour. Express it
from the token (`color-mix`, or a documented alpha token), never as a new hex, so a change to copper
reaches every place copper is implied.

## Typography

**Display Font:** self-hosted Newsreader Variable, with Georgia, Times New Roman and serif fallbacks
**Body Font:** self-hosted Inter Variable, with system-ui and sans-serif fallbacks
**Label / Mono Font:** self-hosted JetBrains Mono Variable, with ui-monospace, SFMono-Regular, Menlo and monospace fallbacks

**Character:** a journal pairing rather than a product one. The serif gives headings the authority
of a printed specification; the sans keeps long technical body text quiet and legible; the monospace
marks everything a machine emitted, which on this site is most of the numbers. The self-hosted variable faces keep the editorial pairing consistent; fallback stacks remain available while fonts load.

### Hierarchy
- **Display** (serif, `clamp(2.4rem, 3.8vw, 3.5rem)`, line-height 1.05, tracking -0.035em): the
  page headline, once per route.
- **Headline** (serif, `clamp(1.9rem, 2.6vw, 2.45rem)`, 1.16, -0.025em): a section verdict.
- **Title** (serif, `clamp(1.5rem, 2.1vw, 1.95rem)`, 1.22, -0.02em): a block heading.
- **Card** (serif, 1.35rem, 1.28, -0.015em): the heading inside a panel.
- **Body** (sans, 0.9375rem, 1.65): running text, held to a 64ch measure.
- **Control** (sans, 0.875rem): buttons, tabs and form controls.
- **Label** (mono, 0.75rem, tracking 0.08em, uppercase): kickers, units, table headers, evidence
  grades and anything a tool produced.

### Named Rules

**The Verdict Heading Rule.** A heading states the finding, not the topic. "Both domains close
post-route with positive slack" rather than "Timing closure". A heading that ends in a question mark
has not been written yet.

**The Machine Voice Rule.** Monospace means a machine produced it: a measured value, a part number,
an evidence grade, a file name. Prose never sets itself in monospace for texture.

**The Joined Quantity Rule.** A number and its unit are joined by a non-breaking space
(`50&nbsp;MHz`, `300&nbsp;cycles`), so a wrap can never separate them. Tabular figures
(`font-variant-numeric: tabular-nums`) are on every table, metric and counter.

## Layout

A single centred column, `page-wrap`, capped at 1600px with an 8% side gutter that tightens to 5%
below 650px, and body text capped at a 64ch measure regardless of viewport. Sections are separated by generous vertical space
and hairline rules rather than boxes.

The inherited editorial type scale remains fluid. V6 uses Newsreader hero display at `clamp(3.5rem, 6vw, 6.5rem)` and 1.02 line-height; Inter section verdicts use `clamp(2rem, 3.7vw, 4rem)` and 1.13 line-height. Below 800px the hero uses `clamp(3.4rem, 10vw, 5.5rem)` and section verdicts use 2.3rem. Component layout uses CSS grid with `minmax(0, 1fr)` tracks, collapsing to a single
column at 720–800px depending on the component. Tap targets are at least 24px in every state, and
controls that take a press are 44px.

The declared map contains 24 routes. The shared sticky navigation carries a page-progress hairline, and every route
ends with the same cross-reference block: sibling sections with a reason each, then the source
documents behind that page.

The v6 hero is a .8fr / 1.2fr copy-and-workbench grid. Portfolio sections use 5% gutters and 5rem
vertical padding, shifting to 6% and 3rem below 800px. Atlas rows are .5fr / 2fr / 1.1fr and become
single-column below 800px. The four-column cycle budget becomes two columns; qualification gates
shift from three to two. Evaluation rows and route guides stack below 700px. A bone section is a full
chapter ground, not a collection of pale cards. Diagram links and limits remain textual and source-linked.

## Elevation & Depth

**Flat at rest, lifted only when something genuinely floats.** Most depth comes from tonal
layering, ink to surface to muted, and from hairline rules. Nothing on the page carries a shadow in
its resting state except true overlays.

The earlier 2026-09-24 scan recorded 26 shadow declarations across 16 values; these are historical audit counts. They
fall into three roles, and the spread of values is loose rather than a designed scale: an elevation
pass could reduce 16 values to about four without changing how anything reads.

Zero-offset coloured halos were removed: on all four rules that had one, the state was already
carried by a copper border and a tinted background, so the glow decorated a signal that was already
there.

### Shadow Vocabulary
- **Overlay** (`box-shadow: 0 12px 32px rgba(0,0,0,0.45)`, 8 uses): modals, drawers and the deck
  viewer. The most reused value on the site and the closest thing it has to a standard.
- **Deep overlay** (`0 16px 48px rgba(0,0,0,0.4)`, 3 uses; `0 24px 64px rgba(0,0,0,0.8)`): the
  largest floating surfaces, where the page behind needs to recede.
- **Hover lift** (`0 4px 20px #00000033`, and one copper-tinted `0 6px 18px rgba(212,163,110,.22)`):
  the only shadows that appear in response to a pointer, on interactive cards.

### Named Rules

**The No Halo Rule.** `box-shadow: 0 0 Npx <colour>` is banned and gated in the build
(`scripts/check-css-bans.mjs`). A shadow has an offset, or it is not a shadow. An inset hairline
(`inset 0 0 0 1px`) is a ring and is allowed.

**The Resting Flatness Rule.** A surface that is part of the page carries no shadow. A shadow means
the element is above the page (a modal, a drawer) or is responding to a pointer. There is no
ambient elevation.

**The No Side Tab Rule.** A thick coloured border on one edge of a panel is banned. State is carried
by the whole frame, the background tint and the label, never by a stripe.

## Shapes

Small radii. The incumbent scale uses 2px, 3px and 4px,
with 6px and 8px on the largest panels, 50% on dots and status pips, and a 9999px pill used twice.
Three neighbouring steps under 5px is one more than this system needs: 3px and 4px are not
distinguishable at a glance, and collapsing them is the one shape change worth making.

Several structural elements are deliberately square, including the architecture and library tab
bars, whose active state is a 3px top border on a 0px-radius button.

Borders are 1px and translucent by default. The form language is rectangular and quiet: this is a
document, and a document does not have pill-shaped edges.

## Components

### Buttons
- **Shape:** slightly softened corners (4px), or square where the control is structural.
- **Primary:** copper fill, ink text, 10px 16px padding, minimum 44px tall.
- **Text link:** copper text with an underline offset 3px, no background, arrow glyph for an
  outbound or cross-section link.
- **Hover / Focus:** enumerated transitions on colour, background, border, opacity, shadow and
  transform at 0.15s. `transition: all` is banned and gated in the build. Focus is a 2px copper ring
  at 2–4px offset, never removed. It is written two ways across the codebase, `var(--ring)` (4 uses)
  and `var(--copper)` (5, one of them `!important`); they differ by a hair (`#d9ac78` against
  `#d4a36e`). Prefer `var(--ring)`, which exists for exactly this.

### Chips
- **Style:** 4px radius, surface background, translucent border, mono label at 0.75rem.
- **State:** the selected chip takes a copper border and copper text; the ground shifts one tonal
  step. No stripe, no glow.

### Cards / Containers
- **Corner Style:** 6px.
- **Background:** surface (`#191d1b`) on the ink ground.
- **Shadow Strategy:** none. See Elevation & Depth.
- **Border:** 1px translucent rule, or a solid border where the card is interactive.
- **Internal Padding:** 16–20px.

### Inputs / Fields
- **Style:** surface ground, 1px border, 6px radius, 11px 13px padding, 44px minimum height.
- **Focus:** a 2px copper ring at 2px offset.
- **Error:** a warm red-sand border (`#e8a08a`) with the message rendered directly beneath the
  field, wired through `aria-invalid` and `aria-describedby`. Focus moves to the first invalid field
  on submit.

### Navigation
- Sticky top tab bar across all routes, mono labels, a page-progress hairline along its top edge, and
  the active route marked by a copper top border on a square button. Below 800px the bar collapses
  into a sheet behind a labelled menu button.

### The Cross-Reference Block (signature)
Every route ends with the same structure: a hairline-separated list of sibling sections, each with a
one-line reason a reader would actually act on, then the source documents behind that page with
their page counts. It is typeset as part of the document, with no cards and no accent bar, so it
reads as the end of the argument rather than as a widget.

### Portfolio system workbench (v6, 2026-09-30)
The representative assembly is a production raster with interactive Three.js material overlays.
HTML labels identify motion (SKU-1 + DG32), power (SKU-3 + SKU-6), interface (SKU-5), controller
(DG32 QFN-64) and a conceptual sensing socket. Labels state roles; the assembly is not a validated
reference board. A functional DG32 plate distinguishes execution, checking, comparison, sticky
latching, FAULT_N and external gate-driver disable. The opened package is illustrative, not a die layout.
Motor movement explains loss of drive and coast-down; it does not measure mechanical behaviour.
Reduced-motion, pause/reset and WebGL-free comprehension are required; final runtime motion review
is recorded by the implementation verification, not inferred from this documentation scan.

### Source-led product atlas
Horizontal editorial rows replace a uniform card grid. Function filters use native buttons with
`aria-pressed`; each row joins a named architecture, purpose, boundary, maturity, evaluation needs
and a named source. Nine core SKUs plus D100 retain individual maturity; DG SDV remains a separate
reference platform. DG32 simulation evidence is not transferred to the other parts.

### Strategy diagrams and integration labels
Shared digital foundations, specialist physical blocks and proposed organic-substrate SiP are distinct
regions. Proposed integration uses a dashed frame and an explicit label. DG32 QFN-64 remains separate.
Qualification gates name the evidence needed at each state. Process and manufacturing roadmaps occupy
separate lanes; four stop conditions pair a source-defined trigger with its response.

### Per-route evaluation guides
The shared Shell adds 22 route-specific guides, each with a verdict, three evaluation checks, a source
link and a reasoned onward route. Home and company carry evaluation inside their rebuilt story instead.
The guide complements the retained engineering or company body; it is not evidence that every page
body was rebuilt. The exact 24-route review is in `docs/v6/site-review.md`.

## Do's and Don'ts

### Do:
- **Do** state a finding in a heading, and print the evidence grade next to a figure.
- **Do** use the named palette and documented material roles. A colour used twice is a token.
- **Do** join a number to its unit with a non-breaking space, and set numerals as tabular figures.
- **Do** enumerate the properties a transition animates.
- **Do** give every scroll-driven surface a complete resting state, and a reduced-motion path.
- **Do** keep body text inside the 64ch measure.

### Don't:
- **Don't** add a second accent hue. Teal means safe and nothing else.
- **Don't** use `transition: all`, a zero-offset coloured halo, or a coloured stripe down one edge
  of a panel. All three are gated in the build.
- **Don't** add an unassigned near-black UI colour; reuse a surface role. Object-shading materials remain separately documented.
- **Don't** set prose in monospace, or a machine-produced value in the serif.
- **Don't** put a number on the page that no source document carries.




