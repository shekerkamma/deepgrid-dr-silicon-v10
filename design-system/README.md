DeepGrid Semi presents mature-node silicon for physical systems: nine SKU architectures plus the D100 drone SoC, with DG32 as the one part carrying detailed pre-silicon engineering evidence. The system reads like a printed engineering journal on a near-black ground: a serif for verdicts, a quiet sans for argument, monospace for anything a machine produced, and copper as the single accent. Use it for the site, the part explainer films, the narrated DG32 films and the LinkedIn carousels, so all of them read as one brand.

## Content fundamentals

**Headings are verdicts, not topics.** Write the finding a reader should leave with.

- Yes: "One die runs the motor loop and drives its 120 V power stage" (SKU-1).
- Yes: "Both domains close post-route with positive slack."
- No: "Timing closure", "Architecture overview", or any heading ending in a question mark.

**Every figure carries its maturity beside it.** Simulation, implementation, planning, estimates, measured silicon and qualification are different claims. Print the grade in `label` style next to the number ("SIMULATED · PRE-SILICON"). The portfolio's own status lines show the voice: "Architecture scope", "Pre-silicon engineering evidence", "Cycle-2 wafer run.", "First silicon · September 2026 multi-project shuttle".

**Never put a number on screen that no source document carries.** Product pages are the value authority. Where a technical annex disagrees, the page wins, and the link to the annex says so beside it.

**Standards are "designed toward", never "compliant" or "certified".** No market-size figures, no traction claims. DG32's simulation evidence is never transferred to another part.

**Voice.** Third person about the product ("SKU-1 puts both on one 130 nm BCD die"), second person only in a call to action ("Download the datasheet"). Sentence case everywhere except `label` text, which is uppercase. Specific before general: name the block, the bus and the voltage.

**Typography of the words.**

- No em dashes. Use a full stop, a colon, or a middle dot (`·`) between machine items.
- Curly quotes and apostrophes (’ “ ”), never straight ones in body copy.
- A number and its unit are joined by a non-breaking space (`50 MHz`, `300 cycles`, `28 V`).
- Tabular figures (`font-variant-numeric: tabular-nums`) on every table, metric and counter.
- No emoji anywhere.

**In films and carousels.** On-screen words are labels of 2 to 6 words, never sentences; the narration carries the sentence. Open on the problem the part solves, one idea per scene, and close on what is still unproven plus the next step.

## Visual foundations

### Colour

- Ground every surface in `ink`. Raise panels one tonal step at a time: `surface`, then `surface-2` or `muted`, then `accent-surface` for a selected state. Do not invent another near-black; reuse a surface role.
- Set text in `paper`; secondary text in `ink-2`; muted kickers and taglines in `muted-foreground`; `paper-bright` only on `accent-surface`.
- `copper` is the one accent: links, the primary button, the active tab's top border, a highlighted diagram block. One copper-led element per view. Text on a copper fill is `on-copper`.
- `cpu` (teal) means the safe state and nothing else: a latched-safe output, a passed gate. Never decoration and never a second accent. On the bone ground it cannot carry text (2.7:1); write the word in `paper` over a `cpu` fill instead.
- `hardware` is the copper metal in renders. It shades objects; it never colours text or UI.
- The **bone** theme is a full chapter ground (`ink` becomes the bone ground, `paper` becomes bone ink, `copper` darkens to bone copper). It is a whole section, never a pale card on the ink ground. Raised surfaces collapse to the ground there and are framed by `border`.
- The brand mark's own colours (`mark-ground`, `mark-copper`, `mark-paper`) belong to the mark only.

### Type

- `portfolio-display` (Newsreader, 450) is the v6 hero headline, once per route. `display` is the inner-route headline; `headline` a section verdict; `title` a block heading; `card` a heading inside a panel. All serif headings are upright weight 400 to 450. An emphasised phrase inside one is `heading-em`, not italic.
- `body` (Inter, 0.9375rem / 1.65) is running text, never wider than `measure` (64ch). `portfolio-body` in v6 portfolio sections. `control` for buttons, tabs and form controls.
- `label` (JetBrains Mono, 0.75rem, 0.08em tracking, uppercase) marks what a machine produced: a measured value, a part number, an evidence grade, a file name. Prose never sets itself in mono for texture, and a machine value never sits in the serif.

### Layout and spacing

- One centred column, `page-max` 1600px, `gutter` 8% (5% below 650px). Sections are separated by `section-y` of space and a `rule` hairline, not by boxes.
- Grids use `minmax(0, 1fr)` tracks and collapse to one column between 720 and 800px.
- Every tap target is at least `target-min` (24px); anything that takes a press is `control-min` (44px) tall.
- Every route ends with the cross-reference block: sibling sections with a one-line reason each, then the source documents with page counts.

### Shape, borders, elevation

- Radii are small: `radius-md` for cards, chips and buttons, `radius-sm` for the primary button, `radius-lg` and `radius-xl` for the largest panels. Structural tab bars are square. `radius-pill` is spent; do not add more pills.
- Borders are 1px (`hairline`): `border` on interactive panels, `rule` between rows.
- Flat at rest. `shadow-overlay` for modals and drawers, `shadow-hover` only when a pointer lifts a card. A zero-offset coloured halo is banned (gated in the build), and so is a thick coloured stripe down one edge of a panel. State is carried by the whole frame, the ground tint and the label.

### States and focus

- Focus: a 2px (`focus-width`) solid `copper-ring` outline at 2 to 4px offset, never removed.
- Selected chip or tab: `copper` border and text, ground one step up (`muted` or `accent-surface`). No stripe, no glow.
- Invalid input: `error` border with the message directly beneath, wired through `aria-invalid` and `aria-describedby`.
- Disabled: 40% opacity, `not-allowed` cursor.

### Motion

- Transitions name their properties (colour, background, border, opacity, shadow, transform) at 0.15s. `transition: all` is banned and gated.
- Every scroll-driven or animated surface has a complete resting state and a reduced-motion path. In films: one travel direction, no idle motion, a short hold before the payoff.

### Imagery and diagrams

- Architecture diagrams are the draw.io block diagrams, with numbered reading-path markers (①, ②…) on copper discs. The storyboard beats beside a diagram name the marker they land on.
- Renders (the system workbench, the opened package) are labelled as illustrative: an illustration establishes no claim, certification or production status.
- No stock photos, no generated people, no gradients.

## Iconography

- There is no icon font. Links and cross-references use the arrow glyph (→) in the text colour; outbound links add ↗.
- Reading-path markers are the circled numerals ①–⑨, mono 600 in `ink` on a 30px `copper` disc (`radius-pill`).
- The brand mark is in the Logos asset group: the wordmark is white on transparent (use it on `ink` only), the "D" mark is the company's own blue-cyan logo, used at favicon and menu size and never sampled for UI colour.
