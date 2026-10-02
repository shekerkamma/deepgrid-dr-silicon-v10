"""Stage 3 of architecture-to-everything: one self-contained interactive <part>-workflow.html per part.

Same data (nativeDiagrams via build.native) and the same interaction code (app/nd-interact.ts, bundled with the
repo's esbuild) as the site, with the diagram CSS lifted from app/dr.css, so the standalone file and the page
cannot drift apart. No external CSS, JS or images: it works offline.

    python3 scripts/sku-diagrams/workflow_html.py   # writes public/downloads/<part>-workflow.html
"""
import html, json, os, re, subprocess, sys
sys.path.insert(0, os.path.dirname(__file__))
from build import ROOT, native, zones_of  # noqa: E402
from specs import SPECS  # noqa: E402
from specs_native import NATIVE  # noqa: E402

TOKENS = ('--background:#101212;--surface:#191d1b;--muted:#292d29;--border:#3d453b;--rule:#48544066;--ink:#eeeae2;'
          '--ink-2:#a7b09f;--copper:#d4a36e;--cpu:#2f9e8c;--sc-t-control:.875rem;--sc-t-meta:.75rem;--sc-t-block:1.15rem;'
          '--sc-t-body:.9375rem;--sc-track-meta:.08em;--sc-radius-sm:4px;--sc-radius-md:6px;--sc-measure:64ch;--text-meta:.75rem;'
          '--font-mono:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;--serif:Georgia,serif')
UNIT = re.compile(r'(\d) (?=(?:MHz|kHz|GHz|Gbps|Mbps|kSPS|MSPS|KB|MB|GB|TOPS|mA|µs|ns|ms|µW|dBm|dB|ppm|bit|V|A|s|cycles)\b)')
MARK = {'①': '1', '②': '2', '③': '3', '④': '4', '⑤': '5', '⑥': '6', 'F': 'fault path'}


def e(s): return html.escape(UNIT.sub('\\1\u00a0', s or ''), quote=True)


def render(d, title, markers):
    out = [f'<figure class="nd" aria-label="{e(title)}"><div class="nd-bar"><div><span class="mono">SYSTEM ARCHITECTURE · INTERACTIVE</span>'
           f'<strong>{e(title)}</strong></div></div><p class="nd-hint">Select a block to see what it receives and feeds; the arrows show each connection.</p>'
           '<div class="nd-body"><svg class="nd-wires" aria-hidden="true"></svg>']
    if d.get('banner'): out.append(f'<p class="nd-banner">{e(d["banner"])}</p>')
    if d.get('input'): out.append(f'<p class="nd-io" data-k="IN" data-t="External inputs" data-s="{e(d["input"])}"><span class="mono">IN</span>{e(d["input"])}</p>')
    out.append(f'<div class="nd-frame"><p class="nd-frame-label mono">{e(d["frame"])}</p>')
    for r in d['rows']:
        if 'bus' in r:
            out.append(f'<p class="nd-bus" data-k="{e(r["k"])}" data-t="{e(r["bus"].split("·")[0].strip())}" data-s="{e(r["bus"])}">{e(r["bus"])}</p>'); continue
        cols = ' '.join(f'minmax(0,{z["w"]}fr)' for z in r['zones'])
        out.append(f'<div class="nd-row" style="grid-template-columns:{cols}">')
        for z in r['zones']:
            tone = f' is-{z["tone"]}' if z.get('tone') else ''
            out.append(f'<section class="nd-zone{tone}" aria-label="{e(z["name"])}" data-k="{e(z.get("k",""))}" data-t="{e(z["name"])}"><p class="nd-zone-name">{e(z["name"])}</p>'
                       f'<div class="nd-blocks" role="group" aria-label="{e(z["name"])}" style="--c:{z["cols"]};--cm:{z.get("mcols", min(z["cols"], 2))}">')
            for b in z['blocks']:
                if not b: out.append('<div class="nd-gap" aria-hidden="true"></div>'); continue
                st = f' style="--s:{b["span"]};--sm:{min(b["span"], 2)}"' if b.get('span') else ''
                marks = ''.join(f'<span class="nd-mark{" is-fault" if m == "F" else ""}" aria-label="Marker {MARK.get(m, m)}">{m}</span>' for m in b.get('marks', []))
                marks = f'<span class="nd-marks">{marks}</span>' if marks else ''
                out.append(f'<div class="nd-block" data-k="{e(b["k"])}" data-t="{e(b["t"])}" data-s="{e(b.get("s",""))}" role="button" tabindex="0" aria-pressed="false"{st}>'
                           f'{marks}<strong>{e(b["t"])}</strong>' + (f'<span>{e(b["s"])}</span>' if b.get('s') else '') + '</div>')
            out.append('</div>' + (f'<p class="nd-zone-note">{e(z["note"])}</p>' if z.get('note') else '') + '</section>')
        out.append('</div>')
    out.append('</div>')
    if d.get('output'): out.append(f'<p class="nd-io" data-k="OUT" data-t="External outputs" data-s="{e(d["output"])}"><span class="mono">OUT</span>{e(d["output"])}</p>')
    if d.get('strip'): out.append(f'<p class="nd-strip"><span><b class="mono">PROTOTYPE</b> {e(d["strip"][0])}</span><span><b class="mono">PRODUCT</b> {e(d["strip"][1])}</span></p>')
    out.append('<div class="nd-tip" hidden role="tooltip"></div></div><p class="nd-live sr-only" aria-live="polite"></p>')
    if markers:
        out.append('<ol class="wf-legend">' + ''.join(f'<li><b>{m}</b> {e(t)}</li>' for m, t in markers) + '</ol>')
    out.append('</figure>')
    return ''.join(out)


def main():
    css = open(os.path.join(ROOT, 'app/dr.css'), encoding='utf-8').read()
    css = css[css.index('/* Native architecture diagram (NativeDiagram'):]
    js = subprocess.run([os.path.join(ROOT, 'node_modules/.bin/esbuild'), os.path.join(ROOT, 'app/nd-interact.ts'), '--bundle',
                         '--format=iife', '--global-name=ND', '--minify', '--target=es2019'], capture_output=True, text=True, check=True).stdout
    titles = {'lite': 'DG32-LITE', '2dom': 'DG32-2DOM', 'd100': 'D100 drone SoC'}
    n = 0
    for s in list(SPECS) + NATIVE:
        d = native(s)
        name = titles.get(s['id']) or f'{s["code"]} {s["name"]}'
        slug = s.get('slug') or {'lite': 'dg32-lite', '2dom': 'dg32-2dom'}.get(s['id'], s['id'])
        markers = s.get('markers') or []
        page = (f'<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">'
                f'<title>{e(name)} system architecture</title><style>:root{{{TOKENS}}}*{{box-sizing:border-box}}'
                'body{margin:0;background:var(--background);color:var(--ink);font:15px/1.5 Inter,system-ui,sans-serif;padding:24px}'
                'main{max-width:1320px;margin:0 auto}h1{font:400 1.9rem/1.2 Georgia,serif;margin:0 0 6px}main>p{color:var(--ink-2);margin:0 0 18px}'
                '.sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0)}.nd{margin:0}'
                '.wf-legend{list-style:none;margin:0;padding:14px 18px 18px;display:grid;gap:6px;color:var(--ink-2);font-size:.875rem;border-top:1px solid var(--rule)}'
                '.wf-legend b{color:var(--copper);margin-right:6px}' + css + '</style></head><body><main>'
                f'<h1>{e(name)} system architecture</h1><p>Pre-silicon architecture, DeepGrid Semi. Values are design targets. '
                'Select any block to trace its connections.</p>' + render(d, f'{name} system architecture', markers) +
                f'</main><script>{js}\nND.attach(document.querySelector(".nd-body"),{json.dumps(d["edges"], ensure_ascii=False)});</script></body></html>\n')
        open(os.path.join(ROOT, 'public/downloads', f'{slug}-workflow.html'), 'w', encoding='utf-8').write(page)
        n += 1
    print(f'{n} workflow HTML files')


if __name__ == '__main__':
    main()
