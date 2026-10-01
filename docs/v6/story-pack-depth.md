# DeepGrid v6 depth layer: story pack
Story-architect, 2026-10-01. Extends `docs/v6/story-pack.md`; does not replace it. Rule 0: the eight home
sections, their order and their verdict headings are the fixed spine. This pack adds what the spine never
specified: where each section goes when a reader wants more, and what is on the other side.

User, 2026-10-01: "why we are creating html files for reference links ... the site [should] be designed as
self-sufficient modern website ... Every section should have sufficient details: story board, narrative
description along with further references, links."

## 1. BLUF
Every product named on the site has a page of its own that explains the job, the physical requirement, the
architecture, the evaluation questions and the evidence, inside the site's own design; source documents are
cited beside the claims and read inside the site, never as a separate document dump.

## 2. Audience decision
An equipment-maker engineer who clicks any product, section or citation should land on a designed page that
answers the next question, and should be able to decide whether that part belongs in their evaluation
without leaving the site or opening a PDF.

## 3. Tension
Today the home page sends 23 of its 45 links to generated document pages (`/downloads/*.html`): a different
font, no site navigation, raw document titles. Nine of the ten product names in #portfolio link to
`/products`, which embeds the same list, so the click goes in a circle. The only place SKU-2 through D100 are
described is a 1,069-word annex page. A reader who wants depth falls off the site; a reader who stays sees
ten names and no products.

## 4. Argument arc (depth layer)
1. Home section states the verdict (unchanged spine).
2. Its "go deeper" link lands on a designed page that continues the same argument.
3. Product pages: job, physics, architecture, specification, evaluation questions, evidence, sources, action.
4. Citations stay small and exact, and open the document inside the site at the cited section.
5. Every page closes on a next step: compare, evaluate, or contact with the part named.

## 5. Section spine: home (Rule 0), with depth added

| # | Home section (unchanged) | Go deeper, on site | Citation line (small) | Removed |
|---|---|---|---|---|
| 1 | Silicon starts with the system. | Explore the portfolio (#portfolio); Inspect DG32 (/technology) | none | none |
| 2 | The socket decides the silicon. | Each product name opens `/products/<id>` | "SKU Architecture Compendium, Sheet N" opens the in-site document at that sheet | 10 reader links |
| 3 | Reuse the foundation. Keep specialist blocks specialist. | "How the foundation is shared" opens `/company` (strategy) | Compendium, Sheet 13 | 1 reader link |
| 4 | DG32 makes the safety argument inspectable. | "Follow the fault path" opens `/technology/safety` | DG32-LITE Architecture Guide, Safety core | 1 reader link |
| 5 | Spend the remaining cycles on useful diagnosis. | "The cycle budget" opens `/technology/control-loop` | DG32 AI architecture, workload analysis | 1 reader link |
| 6 | A tapeout is a milestone. Qualification is another job. | "How each figure was obtained" opens `/evidence` | Mature-silicon strategy, sections 2 and 3 | 1 reader link |
| 7 | Two roadmaps. Four reasons to change course. | "The full strategy" opens `/company` | Mature-silicon strategy, sections 4 and 8 | 1 reader link |
| 8 | Bring the system. Start with the evidence. | Each row opens its product page; "Discuss a system" opens `/contact?part=<id>` | none | 6 "Inspect source" links |

## 6. Product page spine (one template, ten pages)

Route `/products/<id>` for sku-1 … sku-9 and d100. DG32 (SKU-4) keeps its deep pages under /technology;
its product page is the same template and points into them. DG SDV is a reference platform, so it gets a
section on `/company`, not an eleventh product page.

| # | Section | Role | Evidence source | Visual treatment |
|---|---|---|---|---|
| 0 | Product bar (sticky) | Wayfinding: name, maturity badge, section links, "Discuss this part" | portfolioParts | Apple-style product sub-nav, tokens from DESIGN.md |
| 1 | Verdict headline + one paragraph | The job, in the equipment's terms | chapter "Core Idea" | Serif headline, Body lede, socket chip |
| 2 | Why this needs its own silicon | Tension: the physical requirement (voltage, noise, RF, radiation) and why the process fits | chapter specs + cheatsheet process rules | Two-column: requirement, consequence |
| 3 | Inside the part | Storyboard of the block architecture, signal in to signal out | chapter "Subsystem Block Architecture" | Native HTML/SVG block diagram, labelled stages, no raster text |
| 4 | Specification, at architecture stage | Every row a target, labelled as such | chapter spec table | Token table, "Architecture target" caption |
| 5 | Questions an evaluator should ask | The failure modes the design must answer | chapter "Deep Engineering Questions" | Numbered list, each with what would settle it |
| 6 | Where it fits | Sockets, systems, what it would replace; links to the use-case pages | chapter "Policy, Market" (replaces only) + applications data | Linked chips to /use-cases/* and related products |
| 7 | Evidence today | Maturity and what is not claimed | portfolioParts.maturity/boundary, claims.ts | Evidence ladder position, one plain caveat |
| 8 | Sources and further reading | Document, sheet and section; videos; related parts | documents-data, resources-data | Citation list opening in-site documents |
| 9 | Next step | One action with the part named | contact | Primary button + compare link |

## 7. Documents inside the site
The 23 generated readers move into the site shell at `/resources/docs/<slug>` (site header, navigation,
fonts, footer; a left table of contents and a sticky "on this page" rail, Mintlify-style). Titles lose the
em dash ("DeepGrid Semi: SKU Architecture Compendium"). A banner states the document is a source edition and
links `/evidence`. PDFs remain downloads. `/downloads/*.html` redirects to the new route so old links work.

## 8. Evidence map
- Direct (publish as architecture targets): process, rails, interfaces, block architecture, engineering
  questions; DG32 figures already in claims.ts with their grades.
- Fair synthesis: "where it fits" groupings; related-part links (from each chapter's "Connects To").
- Interpretation, withheld or softened: gross margins, ASPs, market sizes in rupees or units, "moat"
  language, sole-source procurement status, named customer programmes (MCEME, BEL 17") beyond what
  claims.ts allows; standards (ISO 26262 ASIL-D, MIL-STD-883, DO-160, AEC-Q100) appear only as "designed
  toward", never as met.

## 9. Content cuts
No margin, ASP, market-size or forecast figures on product pages. No "moat", "wedge" or "policy moat"
wording in client text. No ASCII diagrams. No raw document titles as headings. Nothing from `withheld`.

## 10. Rebuild instructions
1. `app/product-pages-data.ts`: ten records keyed by portfolio id, authored from the compendium chapters
   under the evidence map above; each spec row and question carries its sheet reference.
2. `app/products/[id]` route on the existing Shell, SectionHead and Sec components; static params for all ten.
3. Portfolio atlas, applications chips and the evaluation matrix link to `/products/<id>`.
4. Home citations: replace "↗ source" links with the go-deeper link plus a citation line (table above).
5. Reader generator renders into the site shell at `/resources/docs/<slug>`; `/downloads/*.html` become
   redirects.
6. Verify: build, sweep at 1440 and 390 (now with the link crawl), screenshots of all ten product pages and
   one document page, reduced motion, the claims check.

## 12. Every route (user, 2026-10-01: "Every section/page should be reviewed, not just home page")
Measured on the live site, 2026-10-01: sections are h2 blocks; words and links counted per section.
Two shared components put 2-3 document-page links on every route: `route-journey.tsx` (the "Start at the
system / Read the source" block) and `related.tsx` ("Where to go next"). Fixing those two removes most of the
site-wide off-site links; the rest are page-specific.

| Route | Words | Reader links | Verdict | Depth to add |
|---|---|---|---|---|
| Home | 1421 | 23 | Spine holds; depth missing | Section 5 table |
| /products | 2004 | 13 | Atlas loops back to itself | Atlas rows open /products/<id>; DG32 sections keep their depth |
| /products/<id> (new, x10) | 0 | n/a | Missing | Section 6 template |
| /applications | 3076 | 3 | Holds (own pack) | Chips open product pages |
| /technology, /control-loop, /die, /package, /safety | 720-1567 | 2-5 | Hold: deepest pages on the site | Shared blocks only; citations to in-site documents |
| /evidence | 1793 | 4 | Holds | "Other nine chips" rows open product pages |
| /procurement | 775 | 3 | Holds | Shared blocks only |
| /company | 427 | 4 | Thin: four sections under 30 words | Reuse/SiP, OEM route and roadmap need a paragraph, a diagram caption and a source line each; DG SDV reference platform section |
| /use-cases/boards, defence, grid, motors, vehicles | 231-395 | 3 each | Thin: "Where the chips fit" 27-76 words, "Evidence today" 20-79 words | Per use case: the system and its failure modes, where each chip sits in it (diagram), what each chip does there, evidence per chip, links to product pages |
| /about, /recognition, /team | 382-559 | 2 each | Authority copy (deepgridsemi.com), kept verbatim | Shared blocks only; flag generic copy to the user, do not rewrite |
| /resources | 1789 | 5 | Holds: the document library | Each document opens in-site at /resources/docs/<slug> |
| /resources/docs | 377 | 3 | Thin: six headings with 14-85 words, 21 external links, many "on request" | Becomes the in-site document index; "on request" items stay, labelled, never as empty cards |
| /resources/videos | 822 | 3 | Holds after 2026-09-30 fixes | Shared blocks only |
| /ask | 532 | 4 | Holds | Answers cite in-site documents |
| /contact | 529 | 3 | Holds | Accept ?part=<id> to prefill the part |

Quality gate addition: 0 links to `/downloads/*.html` on any route; every product named anywhere links to
its page; no section under 40 words unless it is a caption, a form or a link list.

## 11. Quality gate
- Does every link on the home page land on a designed page that continues the argument? (target: 0 links to
  `/downloads/*.html` from home)
- Can a reader describe SKU-3 (job, physics, architecture, open questions, status) without opening a PDF?
- Is every number on a product page either a labelled architecture target or a graded claim?
- Is anything from `withheld` or the cuts list visible?
