# SKU-3: Architecture Guide

Deepgrid Semi · hi-rel power-management IC · reading guide to the SKU-3 system architecture diagram · October 2026

> Architecture scope, pre-silicon. The diagram is redrawn from the SKU Architecture Compendium, Technical Annex v3, sheet 4. Every value is a design target, not a measurement. Standards appear only as targets the design is developed toward; no certificate exists for any DeepGrid part.

## What is SKU-3?

SKU-3 turns a 28 V aircraft or vehicle bus into four sequenced, monitored rails. It conditions the input, pre-regulates with a synchronous buck under peak-current-mode control, and supervises every rail with window monitors, current limits and an upset-hardened sequencer.

---

## Architecture Overview

1. **Input conditioning**: EMI filter and TVS clamp, an ideal-diode reverse-polarity stage, soft-start inrush limiting, and hysteretic under- and over-voltage lockout.
2. **Pre-regulator · synchronous buck**: A type-III error amplifier, a PWM comparator with slope compensation, an adaptive dead-time gate driver, an LDMOS half-bridge power stage and sense-FET current sensing.
3. **Reference + bias**: A Brokaw bandgap at 1.20 V and 12 ppm/°C with one-time OTP trim, PTAT and CTAT bias, and an 8 MHz RC oscillator.
4. **Rail generation**: Four regulated rails, each followed by an over- and under-voltage window monitor and a foldback current limit that reports power-good.
5. **Supervision · sequencing · telemetry**: A programmable sequencer, a SAR telemetry ADC for voltage and current per rail over SPI, a windowed watchdog, and DICE latches with TMR on the sequencer state machine.

## Component: Input conditioning

What it does: EMI filter and TVS clamp, an ideal-diode reverse-polarity stage, soft-start inrush limiting, and hysteretic under- and over-voltage lockout.

Why it exists: An aircraft bus carries surges and spikes the downstream rails must never see.

- **EMI + TVS**: CM choke + pi · clamp 36 V
- **Ideal diode**: reverse polarity · back-to-back LDMOS
- **Inrush**: soft-start FET · dI/dt limited
- **UVLO + OVLO**: 18 V / 34 V · hysteretic

## Component: Pre-regulator · synchronous buck

What it does: A type-III error amplifier, a PWM comparator with slope compensation, an adaptive dead-time gate driver, an LDMOS half-bridge power stage and sense-FET current sensing.

Why it exists: Peak-current-mode control limits current cycle by cycle, so a fault downstream cannot run away.

- **Error amp**: type-III comp · 60 dB DC
- **PWM comp**: + slope comp · 500 kHz
- **Gate driver**: adaptive dead-time · 20 ns non-overlap
- **Current sense**: sense-FET + amp · cycle-by-cycle limit
- **Power stage**: LDMOS half-bridge

## Component: Reference + bias

What it does: A Brokaw bandgap at 1.20 V and 12 ppm/°C with one-time OTP trim, PTAT and CTAT bias, and an 8 MHz RC oscillator.

- **Bandgap**: Brokaw cell · 1.20 V · 12 ppm/°C
- **Trim**: OTP 6-bit · one-time, post-package
- **Bias**: PTAT + CTAT
- **Osc**: RC 8 MHz · ±2% trimmed

## Component: Rail generation

What it does: Four regulated rails, each followed by an over- and under-voltage window monitor and a foldback current limit that reports power-good.

- **Rail 1 regulator**: soft-start ramp
- **Window monitor**: OV / UV · ±3% window
- **OC limit**: foldback
- **Rail 2 regulator**: soft-start ramp
- **Window monitor**: OV / UV · ±3% window
- **OC limit**: foldback
- **Rail 3 regulator**: soft-start ramp
- **Window monitor**: OV / UV · ±3% window
- **OC limit**: foldback
- **Rail 4 regulator**: soft-start ramp
- **Window monitor**: OV / UV · ±3% window
- **OC limit**: foldback

## Component: Supervision · sequencing · telemetry

What it does: A programmable sequencer, a SAR telemetry ADC for voltage and current per rail over SPI, a windowed watchdog, and DICE latches with TMR on the sequencer state machine.

Why it exists: A single-event upset must not reorder or drop a rail, so the sequencer state is hardened by design.

- **Sequencer**: programmable order · 1 ms step · FSM + delay counter
- **Telemetry**: SAR ADC · V/I per rail · SPI · MUX 8:1
- **Watchdog**: windowed · 1 ms / 10 ms
- **SEU harden**: DICE latches · TMR on the FSM

---

## Key Data Flows

- ① The 28 V bus enters input conditioning.
- ② The conditioned bus feeds the pre-regulator.
- ③ The pre-regulator output feeds the four rail regulators.
- ④ Each rail reports power-good to the sequencer through its window monitor and current limit.
- ⑤ Current sense closes the peak-current-mode inner loop.

## Where the sources disagree

The annex figure and the compendium chapter the product page is written from give different values here. The diagram leaves these values off rather than choose one.

- rail regulators and currents: the figure draws 3V3 and 1V8 LDOs at 2 A and 3 A and 1V2 and 0V9 bucks at 5 A and 6 A, the chapter 5 V and 3.3 V bucks at 2 A and 3 A and 1.8 V and 1.2/0.9 V LDOs at 500 mA and 300 mA
- telemetry ADC resolution: 12-bit in the figure, 10-bit in the chapter
- sequencer depth: 8 slots in the figure, 4 steps in the chapter

## Designed toward

Targets the design is developed toward, not certificates held:

- DO-160 sections 16 and 17
- MIL-STD-704F
- MIL-STD-1275D
- MIL-STD-461G
- MIL-STD-883 Class B
