# D100: Architecture Guide

Deepgrid Semi · drone SoC · reading guide to the D100 system architecture diagram · October 2026

> Architecture scope, pre-silicon. Everything here is drawn from the SKU Architecture Compendium,
> Technical Annex v3: sheet 11 (Drone SoC D100, Fig 3) and the SiP integration sheet. An FPGA
> prototype validates the design; no D100 silicon has been fabricated or measured. The failsafe
> architecture does not establish jamming immunity, certified flight safety or an awarded silicon
> contract.

## What is D100?

D100 is a drone SoC that combines real-time flight control, visual-inertial odometry for
navigation without GPS, and a hardware failsafe island that is independent of the mission stack.
The product is a 130 nm ASIC at a fixed 200 MHz. An optional neural accelerator joins in variant 2
on a separate 28 nm die in the same package.

The defining choice is the failsafe island: recovery is hardware, not firmware. When the flight
software hangs, the radio link drops or GPS is lost, the island brings the airframe to a safe
state through its own path to the motor controllers, without the flight computer.

---

## Architecture Overview

Five groups share one 128-bit AXI4 crossbar at 200 MHz:

1. **Flight control**: two DGridRiscV cores running the PX4 or ArduPilot loop, sensor and motor interfaces.
2. **Visual-inertial odometry**: camera input, image processing, feature extraction and a 30 Hz pose engine.
3. **AI, variant 2 only**: an INT8/INT4 NPU of about 10 TOPS on a 28 nm die.
4. **Failsafe island**: link monitor, safe-state machine and an independent path to the ESCs, on isolated power and clock.
5. **Platform**: memory, storage, power management, secure boot and external interfaces.

---

## Component: Flight control

What it does: runs the hard real-time flight loop and drives the motors.

- **DGridRiscV × 2**, RV32IM_Zicsr: one flight-control core and one navigation core, running PX4 or ArduPilot.
- **IMU / MAG / BARO** over three SPI links at 8 kHz.
- **ESC OUT**: DShot600 on eight channels.
- **RC + TELEMETRY**: SBUS, CRSF and MAVLink over UART.

## Component: Visual-inertial odometry

What it does: estimates the airframe's position and attitude from cameras and the IMU, so the
aircraft can navigate where GPS is unavailable.

Why it is geometry: the sheet describes the odometry as geometry, not learned perception, so it
needs no trained model to hold a pose.

- **MIPI CSI-2**: two lanes, up to 1080p60.
- **ISP**: rectification and lens-shading correction.
- **FEATURE**: FAST corners with BRIEF descriptors, about 2k points per frame.
- **POSE ENGINE**: an EKF with IMU pre-integration and sliding-window bundle adjustment, producing a 30 Hz, six-degree-of-freedom pose.

## Component: AI accelerator (variant 2)

What it does: object detection (YOLO-family) and segmentation for obstacle avoidance.

Why it is a separate die: vision AI needs dense logic that 130 nm cannot supply, so
the accelerator is a 28 nm die that joins the same package in a later wave.

- **NPU**: INT8 / INT4, about 10 TOPS class, with a MAC array, 2 MB of SRAM and DMA.
- Present in variant 2 only; the flight-control and failsafe functions do not depend on it.

## Component: Failsafe island

What it does: watches the link and the flight computer from outside and can take the motors on
its own.

Why it exists: recovery must still work when the flight software is the thing that failed, so it
cannot run as a task inside that software.

- **Link monitor**: detects RC loss, GPS loss and IMU fault, in hardware rather than firmware.
- **Safe-state FSM**: return to home or land.
- **Independent path**: drives the ESCs directly and bypasses the flight cores, the odometry and the AI.
- **Isolated power and clock**: a fault in the mission stack's supply or clock does not take the island with it.

## Component: Platform

- **LPDDR4**: 2 GB on a 32-bit interface.
- **eMMC / NAND** for logging.
- **PMU** with five power domains.
- **SEC**: secure boot.
- **ETH / USB3** for payload and ground link; **CAN-FD × 2, SPI and I²C** for gimbal and payload; **JTAG** for debug.

---

## Key Data Flows

### Normal flight

1. Sensors and the RC link reach the flight cores.
2. The cameras run through the ISP and the feature extractor to the pose engine.
3. The 30 Hz pose reaches the flight loop over the crossbar.
4. The flight loop sends motor commands on ESC OUT.

### A failsafe trip

1. The link monitor sees RC loss, GPS loss or an IMU fault.
2. It trips the safe-state FSM, which selects return to home or land.
3. The independent path takes the ESCs directly, bypassing the flight cores, odometry and AI.

---

## Prototype and product

| Stage | Implementation | Role |
|---|---|---|
| Prototype | Artix-7 FPGA at 81.25 MHz | Validation only |
| Product | 130 nm ASIC, SkyWater SKY130 / IHP SG13G2 open PDK, 200 MHz fixed | The shipping part |

FPGA timing closure is a prototype milestone; it is not a measurement of the ASIC.

## Where the values come from

Structure follows the annex figure. For the camera interface, the annex figure (a stereo pair at 720p60) and the
compendium chapter (two lanes, up to 1080p60) differ; the diagram uses the chapter value, which is the one the
product page states.

## Package

The SiP sheet places the dies on a four-layer organic substrate in a 15 × 15 mm BGA: wire-bonded
mature dies plus one flip-chip 28 nm compute die, die-to-die SPI, UART and GPIO over the
substrate, deliberately not UCIe. The 28 nm AI-compute die joins in a later wave.

## What the architecture does not establish

- **Jamming immunity.** The odometry does not need GPS, but the sheet's GPS-denied use case is a design intent, not a tested result.
- **Certified flight safety.** The sheet names a DGCA type-certification path; no certificate exists.
- **Navigation accuracy.** No drift figure has been measured; the D100 product page lists it as an open question.
