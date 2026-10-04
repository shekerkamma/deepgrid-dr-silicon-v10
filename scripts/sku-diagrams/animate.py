#!/usr/bin/env python3
"""Animated architecture diagrams for the product pages: public/diagrams/<slug>-architecture-animated.svg.
The animation itself lives in content-ideas skills/part-explainer-film/scripts/animate_diagram.py (signal
flow, reading path, fallback PNGs dropped, motion-off render identical to the source).
Usage: python3 scripts/sku-diagrams/animate.py"""
import importlib.util, pathlib
SITE = pathlib.Path(__file__).resolve().parents[2]; HOME = pathlib.Path.home(); RUNS = HOME / "content-ideas/runs"
spec = importlib.util.spec_from_file_location("animate_diagram", HOME / "content-ideas/skills/part-explainer-film/scripts/animate_diagram.py")
ad = importlib.util.module_from_spec(spec); spec.loader.exec_module(ad)
for slug in ["sku-1", "sku-2", "sku-3", "sku-4", "sku-5", "sku-6", "sku-7", "sku-8", "sku-9", "d100"]:
    ad.build(RUNS / f"2026-10-03-part-explainers/{slug}/zones.json", RUNS / f"2026-10-03-arch-storyboards/{slug}.json",
             SITE / "public/diagrams" / f"{slug}-architecture-animated.svg", slug)
