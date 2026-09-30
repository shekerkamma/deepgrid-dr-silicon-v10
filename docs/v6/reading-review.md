# Site-wide reading and layout correction

The user's review revealed failures missed by the initial v6 finish review: bone sections changed CSS variables without applying their foreground colour, and source-reading links navigated to raw Markdown. The former affected home and company. A source audit covered all 24 routes and shared component families; no other equivalent inherited light-prose defect was found.

Corrections:
- Light sections resolve their foreground explicitly. Headers pair the argument with its supporting text; mobile stacks them.
- The shared portfolio atlas prioritises the part's job, with architecture and boundaries in native disclosures.
- Reuse has connected foundation/specialist/integration geometry. Its light panels define their own foregrounds on the dark company surface. Qualification and process/manufacturing plans use distinct sequences.
- All 23 downloadable Markdown files gain static reading editions with an outline, readable typography, scrollable tables/code and library navigation. Original downloads and Markdown fetched by inline readers remain unchanged.
- Guide reading actions in technology/resources and the graph report in Ask open reading editions. Explicit Markdown download actions retain their format labels.
- The route-specific evaluation guide lives inside the existing related-content block as an expandable section, replacing the separate repeated closing block.

Checks: TypeScript and build/source gates passed. All 23 readers passed at desktop and phone widths, including fixes for three overflowing long-line documents. Home/company light foreground and source-reading link regression checks passed. Desktop and phone screenshots inspected together. The 24-route desktop/phone/reduced-motion sweep and gated publication are recorded separately by CI.

This is a correction review, not an assertion that every page has been rebuilt or that an automated pass settles subjective design quality. Archived document editions retain original assertions and explicitly link to the current evidence boundaries.
