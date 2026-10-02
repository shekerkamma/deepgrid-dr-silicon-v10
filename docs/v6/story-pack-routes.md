# DeepGrid v6: story pack for the routes the earlier packs did not cover
Story-architect, 2026-10-02. Covers /technology and its four sub-pages, the five use-case pages, /resources
(+ docs, videos), /procurement, /ask, /about (+ team, recognition) and /contact. Extends `story-pack.md`
(home, Rule 0) and `story-pack-depth.md` (product pages, documents); does not change either spine.

Method: each built page's outline (h1–h3 plus word count, `qa/outlines.md`) was read against an argument arc
(context → tension → proof → implication → action) and the rule that every section heading states a verdict,
not a topic.

## 1. BLUF
Every page on the site makes one argument an equipment-maker engineer can act on: what the part or company
does, why that needs this silicon, the proof, what is not yet proven, and the next step.

## 2. Audience decision
An engineer evaluating a socket should be able to decide, from any page, whether to read deeper, compare, or
contact DeepGrid with a named part, without meeting a page that only lists topics.

## 3. Tension
The covered routes argue; several uncovered ones only label. Five use-case pages share one template whose
h1 is a category name and whose call to action talks about a motor even on the smart-meter page. One
resources page counts "six documents" and lists nine. Company pages carry old-site boilerplate and awards
with no named source next to an evidence-graded product story.

## 4. Argument arc (per route group)
| Group | Context | Tension | Proof | Implication | Action |
|---|---|---|---|---|---|
| Technology hub | Two chips, one frozen core | a datapath fault must reach the gate driver without firmware | block diagram, data paths, fmax | decisions frozen until silicon | control loop, package, evaluate |
| Safety | the fault path | firmware cannot be trusted to stop a bridge | animated path, failure table, fault injection | classifier warns, hardware trips | evidence, contact |
| Control loop | the CPU runs two regulators | a fetch-bound core cannot run the loop | stage timeline, 300-cycle budget | headroom by loop rate | package, contact |
| Die | six functional groups | one is frozen | per-group blocks and why | five are yours, one is not | package, evidence |
| Package | 44 signals, 9 × 9 mm | limits are nominals until silicon | pinout, limits, lock status | what a board design can lock now | contact |
| Use cases (×5) | where the chips sit in this system | the failure modes this system must survive | chips, roles, failure → block | evidence stage per chip | contact with the system named |
| Resources | documents behind every figure | readers need the source, not a PDF dump | in-site documents, decks, films | choose by decision | read, contact |
| Procurement | where DG32 leads and does not | gaps vs the incumbent | sequencing, roadmap | evaluate now vs second spin | evaluation plan |
| About / team / recognition | who builds it | trust must match evidence | team, partners, recognition | recognition is not readiness | technology, contact |
| Contact | the system and its constraints | an enquiry needs the right inputs | self-serve sources | bring the constraints | send |

## 5. Section spine and verdict (finding per route)
| Route | Verdict headings? | Finding | Grade |
|---|---|---|---|
| /technology | yes (every h2 is a sentence with a verdict) | sound | keep |
| /technology/safety | yes | sound | keep |
| /technology/control-loop | mostly | "One control tick, stage by stage" and "What the loop is driving" were topic labels; "Budget the entire loop" is an evaluation-guide task, kept | **fixed 2026-10-02**: two h2s rewritten from their own copy |
| /technology/die | acceptable | h2s are group names inside a scroll explorer; each group's verdict is its WHY line directly under the name | keep (renaming would hurt the explorer's wayfinding) |
| /technology/package | mostly | "Where each group of signals leaves the package" was a label | **fixed 2026-10-02**: "Eleven signal groups share 44 pins…" (content.ts pinGroups) |
| /use-cases/* | no | h1 is the category ("Vehicles"); the verdict sits in the lede; h2s identical on all five; CTA copy is motor-specific on every page | **fixed 2026-10-02** (below) |
| /resources | yes | "Every figure … one of these six documents" while nine are listed | **fixed 2026-10-02**: count derived from the list |
| /resources/docs | no | h1 "Resources"; SDK, Integration Guides, Software Downloads, API Reference as "On request": old-site catalogue, implies an SDK no source shows | flag (reference content) |
| /resources/videos | partly | platform groups are labels; acceptable for an index | keep |
| /procurement | yes | sound | keep |
| /ask | n/a | tool page; h1 renders client-side (sweep confirmed one h1) | keep |
| /about | no | Philosophy / Vision / Mission / Values (Innovation, Safety, Quality, Collaboration): generic boilerplate from deepgridsemi.com | flag (reference content) |
| /about/team | n/a | directory; sound | keep |
| /about/recognition | no | six awards (WEF Technology Pioneer, Fast Company, CES, SIA, "Top 10 AI semiconductor", DG-T100 design award) have no image or named source (`docs/deepgridsemi/README.md`) | flag (reference content) |
| /contact | yes | sound | keep |

## 6. Evidence map
- **Direct:** DG32 figures (claims.ts grades), Technical Annex sheets, product-page values, the TiE50 /
  Top 50 Telangana awards (photographed on stage).
- **Fair synthesis:** use-case "where it can fail, and what catches it" (Annex engineering questions mapped
  to blocks); evidence stage per chip (applications-story-data).
- **Interpretation, flagged not cut:** deepgridsemi.com company copy (About boilerplate, six unsourced awards,
  the resources-docs catalogue with "On request" SDK items). The user named deepgridsemi.com the authority
  (2026-09); carry verbatim, flag doubts, the owner decides.

## 7. Content cuts
None applied to reference content. Cut from this pass: nothing else. Proposed for the owner's decision:
the SDK / Integration Guides / Software Downloads placeholders until an SDK exists; the six unsourced awards
unless a source is named; the About values list in favour of the portfolio argument already on /company.

## 8. Rebuild instructions
1. **Done:** use-case pages lead with the verdict headline as h1 (category moves to the kicker); section
   titles state a verdict per area; the call to action asks for the inputs this system needs, per area
   (`applications-story-data.ts` `fit`, `ask`).
2. **Done:** /resources document count derived from the list.
3. **Done:** control loop, two topic h2s rewritten as verdicts from their own copy.
4. Die: kept; the WHY line under each group name is its verdict.
5. **Done:** package, the pin-plan heading states the plan (11 groups, 44 pins).
6. Owner decisions (do not change without them): About boilerplate, unsourced awards, SDK placeholders.

## Quality gate
- Each section has a reason to exist: yes after 1–5, except the flagged reference content.
- A reader understands each page without the source documents: yes.
- Examples specific enough to prove the claim: yes on technology and use-case pages; no on recognition.
- Clear next action: yes on every page (contact / evaluate / read).
- Unsupported claims or internal terms visible: the six unsourced awards (flagged).
