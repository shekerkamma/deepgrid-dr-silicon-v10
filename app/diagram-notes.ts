/** Reading notes for every architecture diagram on the site: what each zone of the drawing is, why
 *  it exists, what the numbered markers mean, and where to read further.
 *
 *  Zone and marker copy is taken from the architecture guide that ships beside each diagram
 *  (public/downloads/dg32-*-architecture-guide.md); `section` is that guide's heading, so each note
 *  opens the guide at the paragraph it summarises. Add no figure here that the guide does not carry.
 *
 *  Background references explain the general technique a block uses. They are reading, not evidence:
 *  none of them describes DG32, and none implies DG32 shares those parts' certifications. Every URL
 *  was opened and checked on 2026-10-02. */
import {readHref} from './doc-links';
import {url} from './routes';

export type DiagramZone = {name: string; what: string; why?: string; section: string};
export type DiagramMarker = {mark: string; text: string};
export type DiagramRef = {title: string; note: string; href: string; meta?: string};
export type DiagramNotes = {
  guide: string;
  zones: DiagramZone[];
  markers: DiagramMarker[];
  primary: DiagramRef[];
  background: DiagramRef[];
};

const DOCS = '/downloads/docs/';
const LITE_GUIDE = '/downloads/dg32-lite-architecture-guide.md';
const DOM_GUIDE = '/downloads/dg32-2dom-architecture-guide.md';

const AMBA: DiagramRef = {
  title: 'Arm AMBA specifications, including AXI',
  note: 'The bus protocol family the on-chip bus and the engine bridges are modelled on.',
  href: 'https://www.arm.com/architecture/system-architectures/amba/amba-specifications',
  meta: 'Arm',
};

export const diagramNotes: Record<'lite' | '2dom', DiagramNotes> = {
  lite: {
    guide: LITE_GUIDE,
    zones: [
      {name: 'Safety core', section: 'Component: Safety core',
        what: 'MAIN runs the application. CHECKER runs the same instructions two cycles later on identical inputs, the comparator checks every committed store, and the fault latch holds the first cause and drives FAULT_N.',
        why: 'A silent datapath fault produces a wrong PWM edge, and a wrong edge can destroy a bridge.'},
      {name: 'Memory and boot', section: 'Component: Memory and boot',
        what: 'The 64 KB mask ROM validates the flash image, copies it into 32 KB of dual-port SRAM and jumps to it. One SRAM port serves data, the other instruction fetch.',
        why: 'The die has no management core and no debugger halt, so the boot path must start the chip on its own.'},
      {name: 'Supervision', section: 'Component: Safety core',
        what: 'The windowed watchdog faults a kick that arrives too early or too late. The interrupt controller delivers 16 sources identically to both cores.',
        why: 'Identical delivery is what keeps CHECKER in step when firmware branches on an interrupt or a peripheral read.'},
      {name: 'On-chip bus', section: 'Component: Bus, system and test',
        what: 'Two masters, the CPU first and the DMA second, with single-outstanding, deterministic latency. An unmapped or disabled address completes with a bus error.',
        why: 'On a chip with no debugger, a hung bus would be a brick.'},
      {name: 'Motor drive', section: 'Component: Motor drive',
        what: 'Centre-aligned complementary PWM on six gate pins with dead-time, and a hardware brake that forces all six outputs off within two clock cycles. Four DShot channels share the PWM pads.',
        why: 'Gate timing and the safe state are too important to leave to a firmware loop.'},
      {name: 'Sensing and math', section: 'Component: Sensing and math',
        what: 'Encoder and Hall decode with edge timestamps, an 8-bit differential SAR ADC fired by the PWM, and a CORDIC for sin, cos and atan2 at a fixed cost per operation.',
        why: 'The CPU core is fetch-bound at about 8 cycles per instruction, so the expensive parts of the loop are hardware.'},
      {name: 'Connectivity and test', section: 'Component: Connectivity',
        what: 'Two UARTs, an SPI master, an I²C master and GPIO with atomic set and clear. JTAG and internal scan chains serve production test.'},
      {name: 'Dashed boxes, off-chip', section: 'Power-on boot',
        what: 'QSPI NOR flash holds the application image. The gate driver and three-phase bridge, the motor sensors and the host sit outside the package.'},
    ],
    markers: [
      {mark: '①', text: 'The PWM period centre fires the ADC sample, where current ripple is lowest.'},
      {mark: '②', text: 'Phase current goes to the CORDIC, which runs the Clarke and Park transforms with the rotor angle.'},
      {mark: '③', text: 'The transformed currents go to the CPU, which runs the d and q PI regulators in plain C.'},
      {mark: '④', text: 'The PI output sets the PWM duty in shadow registers that load at the next period boundary.'},
      {mark: '⑤', text: 'Gate signals leave for the external gate driver.'},
      {mark: 'F', text: 'The red dashed line: FAULT_N from the fault latch turns the bridge off in hardware, without firmware.'},
    ],
    primary: [
      {title: 'DG32-LITE architecture guide', note: 'Every block, the three data flows, timing headroom and the locked decisions.', href: readHref(LITE_GUIDE), meta: 'Opens in the site'},
      {title: 'DG32-LITE preliminary datasheet', note: 'Pin, electrical and peripheral detail for the part.', href: url(DOCS + 'deepgrid-dg32-lite-preliminary-datasheet.pdf'), meta: 'PDF · 12 pages'},
      {title: 'DG32 QFN-64 datasheets, both parts', note: 'DG32-LITE and DG32-2DOM in one document.', href: url(DOCS + 'deepgrid-datasheets-qfn64.pdf'), meta: 'PDF · 24 pages'},
      {title: 'Architecture deck and narrated film', note: 'The same diagram walked through slide by slide.', href: url('/resources') + '?pkg=lite', meta: 'Deck · film'},
    ],
    background: [
      {title: 'Hercules safety MCUs (TI SPRY178)', note: 'How a checker CPU fed the same inputs, offset by 1.5 or 2 cycles, catches faults; also why a watchdog should be windowed.', href: 'https://www.ti.com/lit/fs/spry178/spry178.pdf', meta: 'Texas Instruments · PDF'},
      {title: 'Field Orientated Control of 3-Phase AC-Motors (TI BPRA073)', note: 'The Clarke and Park transforms, the PI regulator and space-vector PWM behind markers ① to ④.', href: 'https://www.ti.com/lit/an/bpra073/bpra073.pdf', meta: 'Texas Instruments · PDF'},
      {title: 'The CORDIC trigonometric computing technique', note: 'Volder, IRE Transactions on Electronic Computers, 1959: the shift-and-add method the CORDIC block uses.', href: 'https://doi.org/10.1109/TEC.1959.5222693', meta: 'IEEE · DOI'},
      {title: 'RISC-V ratified specifications', note: 'The RV32IM instruction set both cores execute.', href: 'https://riscv.org/specifications/ratified/', meta: 'RISC-V International'},
      AMBA,
      {title: 'DShot and bidirectional DShot', note: 'The digital ESC protocol the four DShot channels speak.', href: 'https://brushlesswhoop.com/dshot-and-bidirectional-dshot/', meta: 'Explainer'},
      {title: 'SkyWater SKY130 PDK documentation', note: 'The open 130 nm process the datasheet names.', href: 'https://skywater-pdk.readthedocs.io/en/main/', meta: 'SkyWater · Google'},
    ],
  },
  '2dom': {
    guide: DOM_GUIDE,
    zones: [
      {name: '50 MHz control domain', section: 'Component: Shared base (identical to DG32-LITE)',
        what: 'Everything in DG32-LITE: the lockstep CPU pair, fault latch and supervision, boot ROM and SRAM, motor drive, sensing and math, connectivity and test.',
        why: 'The control core is closed and hardened. Reopening it to add the engine would risk the one part of the chip that must be right, so the engine is an addition only.'},
      {name: 'Clock-domain bridges', section: 'Component: Clock-domain bridges',
        what: 'A lite bridge for programming, one transaction at a time, and burst read and burst write bridges that each move a whole burst in one crossing, through a four-phase request and acknowledge over two-flop synchronisers.',
        why: 'Crossings are rare, because keys and values load once and outputs write back once, so a small, provably safe handshake beats a FIFO with gray-coded pointers.'},
      {name: '114 MHz attention engine', section: 'Component: INT8 attention engine',
        what: 'Six stages per query row: program the shapes, multiply QKᵀ on a 16-lane array, weight through the softmax EXP table, combine with one reciprocal per row, requantise to INT8, write back.',
        why: 'Condition monitoring needs matrix math that a fetch-bound CPU core cannot run without starving the control loop.'},
      {name: 'K and V buffers, EXP table', section: 'Component: Key/value buffers',
        what: 'Keys and values sit on SRAM macros next to the engine, loaded once per kick and re-read for every query row. The EXP table holds 256 15-bit weights.',
        why: 'Loading once keeps per-head bus traffic around 1% of occupancy, so the engine does not fight the rest of the die for memory.'},
      {name: 'DMA and interrupts', section: 'Component: Key/value buffers',
        what: 'The DMA can feed the engine from the SRAM’s idle second read port, and the engine’s done interrupt reaches both lockstep cores.'},
    ],
    markers: [
      {mark: '①', text: 'Firmware on the lockstep CPU programs the shapes through the lite bridge, then sets start.'},
      {mark: '②', text: 'Keys, values and the EXP table load once through the burst read bridge.'},
      {mark: '③', text: 'The INT8 output writes back to memory through the burst write bridge.'},
      {mark: '④', text: 'The engine raises done; the interrupt controller delivers it to both cores. A later kick can reuse the resident keys and values.'},
    ],
    primary: [
      {title: 'DG32-2DOM architecture guide', note: 'The engine pipeline, buffers, bridges, timing and the four design decisions.', href: readHref(DOM_GUIDE), meta: 'Opens in the site'},
      {title: 'DG32-2DOM system architecture: block definition', note: 'Per-block architecture of the attention variant.', href: url(DOCS + 'deepgrid-dg32-2dom-system-architecture.pdf'), meta: 'PDF · 24 pages'},
      {title: 'DG32-2DOM preliminary datasheet', note: 'DG32-LITE plus the INT8 attention accelerator on a second clock.', href: url(DOCS + 'deepgrid-dg32-2dom-preliminary-datasheet.pdf'), meta: 'PDF · 12 pages'},
      {title: 'Architecture deck and narrated film', note: 'The same diagram walked through slide by slide.', href: url('/resources') + '?pkg=2dom', meta: 'Deck · film'},
    ],
    background: [
      {title: 'Clock domain crossing design and verification', note: 'Cummings, SNUG Boston 2008: two-flop synchronisers, handshakes with acknowledge feedback, and when a gray-pointer FIFO is needed instead.', href: 'https://www.paradigm-works.com/technical-library?term=clock+domain+crossing', meta: 'Paradigm Works library'},
      {title: 'Attention is all you need', note: 'Vaswani et al., 2017: the scaled dot-product attention the engine computes, QKᵀ then softmax then a weighted sum of values.', href: 'https://arxiv.org/abs/1706.03762', meta: 'arXiv'},
      {title: 'Quantization for integer-arithmetic-only inference', note: 'Jacob et al., 2018: the INT8 quantise and requantise scheme that integer engines follow.', href: 'https://arxiv.org/abs/1712.05877', meta: 'arXiv'},
      AMBA,
    ],
  },
};
