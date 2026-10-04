#!/usr/bin/env python3
"""Animated copies of the architecture diagrams, for the product page's architecture section.

The diagram is the real draw.io SVG; nothing is redrawn. Two layers of motion are added inside the SVG,
so it animates even as an <img> (no script):
  - signal flow: every connector (a stroked path with no fill) carries a moving dash;
  - the reading path: each storyboard beat's zones light in order, with the beat's number, on a loop.
Zone boxes come from part-explainer-film's zones.json (measured in the SVG's own coordinates); beat
order and zones from the story-architect storyboard. Reduced motion stops both and shows the plain diagram.

Usage: python3 scripts/sku-diagrams/animate.py   -> public/diagrams/<slug>-architecture-animated.svg
"""
import json, pathlib, re, sys

SITE = pathlib.Path(__file__).resolve().parents[2]
HOME = pathlib.Path.home()
RUNS = HOME / "content-ideas/runs"
PARTS = ["sku-1", "sku-2", "sku-3", "sku-4", "sku-5", "sku-6", "sku-7", "sku-8", "sku-9", "d100"]
BEAT_S = 2.6                      # seconds each beat stays lit
ACCENT = "#b54708"                # the diagrams' own accent, which holds contrast on their light ground


def build(slug):
    zones = json.load(open(RUNS / f"2026-10-03-part-explainers/{slug}/zones.json"))
    src = pathlib.Path(zones["svg"])
    if not src.exists(): sys.exit(f"BLOCKED: {slug}: {src} missing")
    beats = json.load(open(RUNS / f"2026-10-03-arch-storyboards/{slug}.json"))["beats"]
    svg = src.read_text(encoding="utf-8")
    n = len(beats); total = n * BEAT_S; on = 100 / n
    norm = lambda t: re.sub(r"\s+", " ", t).strip()          # diagram names carry double spaces ("Flight control  ·  hard real-time")
    boxes = {norm(k): v for k, v in zones["zones"].items()}
    lit, missing = [], []
    for k, b in enumerate(beats):
        for z in b.get("zones", []):
            box = boxes.get(norm(z))
            if not box: missing.append(z); continue
            x, y, w, h = box["x"], box["y"], box["w"], box["h"]
            lit.append(f'<g class="dga-beat" style="animation-delay:{k * BEAT_S:.2f}s">'
                       f'<rect x="{x - 4}" y="{y - 4}" width="{w + 8}" height="{h + 8}" rx="12"/>'
                       f'<circle cx="{x + w - 18}" cy="{y + 18}" r="15"/><text x="{x + w - 18}" y="{y + 23.5}">{k + 1}</text></g>')
    if missing: sys.exit(f"BLOCKED: {slug}: beat zones not in zones.json: {sorted(set(missing))}")
    style = f"""<style>
path[fill="none"][stroke]:not([stroke="none"]) {{ stroke-dasharray: 7 6; animation: dga-flow 1.1s linear infinite; }}
@keyframes dga-flow {{ to {{ stroke-dashoffset: -13; }} }}
.dga-beat {{ opacity: 0; animation: dga-beat {total:.2f}s linear infinite both; }}
.dga-beat rect {{ fill: {ACCENT}; fill-opacity: .07; stroke: {ACCENT}; stroke-width: 3.5; }}
.dga-beat circle {{ fill: {ACCENT}; }}
.dga-beat text {{ fill: #fff; font: 700 17px Inter, Arial, sans-serif; text-anchor: middle; }}
@keyframes dga-beat {{ 0% {{ opacity: 0; }} {on * .08:.3f}% {{ opacity: 1; }} {on * .92:.3f}% {{ opacity: 1; }} {on:.3f}% {{ opacity: 0; }} 100% {{ opacity: 0; }} }}
@media (prefers-reduced-motion: reduce) {{ path {{ animation: none !important; stroke-dasharray: none !important; }} .dga-beat {{ animation: none !important; opacity: 0; }} }}
</style>"""
    out = re.sub(r"(<svg\b[^>]*>)", r"\1" + style.replace("\\", "\\\\"), svg, count=1)
    out = out.replace("</svg>", '<g class="dga-path">' + "".join(lit) + "</g></svg>", 1) if out.rstrip().endswith("</svg>") else None
    if out is None: sys.exit(f"BLOCKED: {slug}: SVG does not end in </svg>")
    dest = SITE / "public/diagrams" / f"{slug}-architecture-animated.svg"
    dest.write_text(out, encoding="utf-8")
    print(f"{slug}: {n} beats, {len(lit)} zone lights, {total:.0f} s loop -> {dest.name} (from {src.name})")
    return dest.name


if __name__ == "__main__":
    for s in PARTS: build(s)
