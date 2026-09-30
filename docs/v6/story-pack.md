# DeepGrid portfolio story pack
Story-architect, 2026-09-30. Replacement narrative contract; not yet implemented. User-confirmed scope: “DeepGrid’s silicon portfolio and strategy, with DG32 as the detailed proof point.”

## BLUF
DeepGrid designs the silicon functions between compute and the physical world—motion, power, sensing, interfaces and safety—and develops that portfolio through mature processes, reusable IP and staged qualification. DG32 supplies the detailed engineering proof point. Every other part retains its own maturity label.

## Audience decision
An equipment maker should identify the relevant silicon job, inspect the named product architecture and its evidence, and decide what to evaluate with the team. Company strategy leads; DG32 demonstrates it. Architecture breadth never implies product availability.

## Tension
Compute alone cannot drive a motor, preserve an analog signal, survive a harness transient or start a rugged board predictably. Those jobs have different process, voltage, package and qualification requirements. DeepGrid starts at the equipment socket. Credibility is the second tension: architecture, returned silicon and qualified production are different states.

## Argument arc
System jobs → product sockets → reusable foundation and specialist blocks → DG32 mechanism → diagnostic constraints → fabrication and qualification → roadmaps and stop rules → evaluation decision.

Peak: select DG32 from the system, open its package, inject a wrong value, and follow CHECKER/comparator/fault latch to disabled bridge outputs. A motor coasts illustratively rather than freezing.
Tell-someone sentence: “Start with a machine, find the silicon jobs inside it, and open one chip to see why its safety path exists.”

## Section spine / storyboard

### 1. Silicon starts with the system.
Role: opening answer. Copy: “Motion. Power. Sensing. Interfaces. Safety. DeepGrid designs the silicon around these jobs, with a mature-node portfolio for industrial, vehicle and defence equipment.” Architecture scope and readiness sit beside the action.
Evidence: indexed sku-1…sku-9, track-b-d100, dg-sdv-platform; deepgrid-sku-compendium-architecture.md §§1–2.
Visual: one wide representative engineering assembly, four functional regions, named sockets. HTML labels remain readable. Selection isolates a function; scroll separates board, package and function planes. Label representative system, not reference design.
Takeaway: locate DeepGrid inside an equipment design. Action: explore the portfolio.

### 2. The socket decides the silicon.
Role: discovery and tension. Motion pairs motor controller and safety MCU; infrastructure groups meter, PMIC and supervisor; connectivity/perception covers transceiver, radar and display; integration covers zonal gateway and D100. DG SDV is a reference platform, not an eleventh chip.
Evidence: sku-1…sku-9, track-b-d100, dg-sdv-platform; SKU architecture §2.
Visual: a function-organised product atlas with names, purposes, sources and maturity. Selection illuminates associated parts; avoid identical marketing cards.
Takeaway: different jobs and different maturity; DG32 becomes the inspectable case.

### 3. Reuse the foundation. Keep specialist blocks specialist.
Role: strategy. Copy: “A common digital foundation can travel across products. Analog, power, interface and RF blocks still have to meet their own physical requirements.” Explain organic-substrate integration as proposed process combination and the equipment-maker route to market: silicon inside boxes, LRUs and assemblies.
Evidence: dgridriscv-core-architecture, sip-packaging, boxes-not-chips; deepgrid-mature-silicon-architecture.md §§6–7; SKU architecture §3.5.
Visual: a flat relationship diagram, shared blocks solid, specialist blocks separate, proposed links dashed and keyed. Conceptual SiP is distinct from DG32 QFN.
Takeaway: reuse is a method; the portfolio is not one common die/package.

### 4. DG32 makes the safety argument inspectable.
Role: proof. Copy: “MAIN executes. CHECKER follows with a two-cycle skew. When results disagree, the comparator records a sticky cause and the hardware fault path disables the bridge.” The 39-cycle injected-fault result remains labelled Simulated and source-linked.
Evidence: dg32-lite, sku-4; claim fault-39; dg32-lite-architecture-guide.md; detail-content.faultPath.
Visual: the same object moves from atlas into close-up, then opens into a functional plate. One inject/reset action: MAIN → CHECKER → comparator → fault latch → FAULT_N → gate-driver enable. No duplicate fault demonstrations.
Takeaway: a specific mechanism replaces a safety slogan. No certification or measured silicon claim.

### 5. Spend the remaining cycles on useful diagnosis.
Role: implication and trade-off. Hardware acquires, transforms and updates PWM; firmware still runs d/q PI regulators. 82% diagnostic headroom at 10 kHz differs from the simulated ~100 kHz ceiling. Features and small classifiers must fit cycles and memory. The 8-bit ADC can limit signal quality; some diagnostics need conditioning or higher-resolution external conversion. 2DOM adds attention on a separate clock without raising control-loop ceiling.
Evidence: foc-loop-budget, dg32-tree-ensembles, dg32-dsp-pipeline, dg32-afe-sensing, dg32-2dom-system; claims adc-177, cordic-53, hw-300, loop-100k, headroom-82; architecture guide + AI workload document.
Visual: hardware/software time budget, waveform → features → advisory diagnosis, then separate attention domain across CDC. Safety stays independent.
Takeaway: useful diagnostics depend on cycles, memory and captured signal.

### 6. A tapeout is a milestone. Qualification is another job.
Role: evidence and development reality. Design → implementation → MPW fabrication → bring-up → characterisation → qualification. The 198-day model is 30 digital + 168 physical days, analytic planning. Analog/HV can require additional silicon cycles.
Evidence: 198-day-loop, import-funnel-10x; claim loop-198; mature-silicon architecture §§2–3; evidenceLadder/notClaimed.
Visual: production-route drawing, stacked on mobile; evidence attached to gates. Current/planned/completed states use verified records, no invented dates.
Takeaway: tools/shared fabrication are methods, not proof of an achieved cost multiplier or turnaround.

### 7. Two roadmaps. Four reasons to change course.
Role: strategy and governance. Selective process scaling and manufacturing diversification are separate plans. Show mature-node foundation and later logic/compute stages beside intended capability/foundry routes. Stop rules cover unsigned meter commitment, repeated screening failures, adverse commodity economics and delayed SCL plans.
Evidence: sku-node-roadmap, three-factory, chinese-price-crash; SKU architecture §3.6; mature-silicon architecture §§4,8.
Visual: two labelled lanes; conditions → responses in a compact decision register. No map implying interchangeable qualified fabs.
Takeaway: ambition has gates and course corrections.

### 8. Bring the system. Start with the evidence.
Role: close/action. Copy: “Tell us the platform, voltage and power environment, control or sensing requirements, qualification needs and project timing. Start with the relevant part and its evidence.”
Evidence: documentSources, claims, evidenceLadder; products/resources/evidence/contact.
Visual: choose a system function to get named products, documents and enquiry path. Readiness remains visible before contact.
Takeaway: begin a scoped OEM evaluation.

## Evidence map
Direct: source product names/roles, DG32 SKU-4, checker skew, sticky cause, simulated 39-cycle shutdown, 177-cycle ADC, 53–58-cycle CORDIC, ~300-cycle hardware cost, 10 kHz headroom, 8-bit ADC, separate attention clock and QFN compatibility; stated integration/roadmap/governance architectures.
Fair synthesis: function grouping, DG32 proof point, constraints mapped to evaluation. Grouping does not imply one approved board with every chip.
Interpretation: equipment-maker sales strategy, reuse/integration benefits, manufacturing diversification, analytic calendar/economics. Plans stay plans.
Precedence: index for discovery; claims.ts and named sources for publication. The index cannot verify itself. Corrective 53–58-cycle CORDIC beats <20-cycle shorthand. Loose headroom and accelerometer-free assertions are withheld.

## Content cuts
Remove generic wafer/package beauty shots and pedestal; SoC2/forklift gallery; duplicate fault demos; repeated italic headings; unreadable architecture thumbnails. Withhold market-funnel headlines, 10× economics, forecast revenue/margins and withdrawn traction claims. No accelerometer-free diagnosis, unrestricted FP32 equivalence, certification, returned silicon or completed domestic qualification claims. A dated shuttle plan is not current readiness proof.

## Rebuild instructions
Replace DG32-first entry with portfolio-first discovery. Store content with catalog node IDs, claim IDs and source paths, rendered beside decisions. One deterministic Three.js assembly spans system/product/DG32 control/fault/domain states. Transitions reveal information, maximum four callouts. Mobile stacks deliberately; no empty pinned travel or scroll capture. Exact static scene states support reduced motion/WebGL failure. Strategy is diagrammatic, hardware physical, proposed integration labelled. End with evaluation/maturity matrix.
Verify comprehension, facts, desktop/mobile/reduced motion, fallback, route/nav and live deployment before publishing replacement endpoint.

## Quality gate
Can an OEM locate a function, separate architecture from availability, explain DG32’s fault and hardware/software boundaries, distinguish reuse from integration, locate evidence and take a specific next step? Each section must answer one question.
