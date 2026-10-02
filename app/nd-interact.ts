/** The interactive layer of a native architecture diagram (workflow-visualizer, Stage 3 of
 *  architecture-to-everything): connections drawn between blocks, a hover/focus tooltip that says what a block
 *  receives and feeds, and click-to-highlight that dims everything not connected. Plain DOM so the same code runs
 *  inside the site (NativeDiagram) and in each standalone <part>-workflow.html (bundled by scripts/sku-diagrams).
 *  Endpoints are elements carrying data-k; the drawing is an SVG layer under the blocks, redrawn on resize. */
export type NdEdge = {a: string; b: string; m?: string; d?: string};

const NS = 'http://www.w3.org/2000/svg';

export function attach(body: HTMLElement, edges: NdEdge[]): () => void {
  const svg = body.querySelector<SVGSVGElement>('svg.nd-wires');
  const tip = body.querySelector<HTMLElement>('.nd-tip');
  const live = body.parentElement?.querySelector<HTMLElement>('.nd-live') ?? null;
  if (!svg) return () => {};
  const node = (k: string) => body.querySelector<HTMLElement>(`[data-k="${CSS.escape(k)}"]`);
  const name = (k: string) => node(k)?.dataset.t || k;

  function draw() {
    const box = body.getBoundingClientRect();
    svg!.setAttribute('viewBox', `0 0 ${box.width} ${box.height}`);
    svg!.setAttribute('width', String(box.width));
    svg!.setAttribute('height', String(box.height));
    svg!.replaceChildren();
    const defs = document.createElementNS(NS, 'defs');
    defs.innerHTML = '<marker id="nd-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="currentColor"/></marker>';
    svg!.appendChild(defs);
    for (const e of edges) {
      const A = node(e.a), B = node(e.b);
      if (!A || !B || A.contains(B) || B.contains(A)) continue;
      const a = A.getBoundingClientRect(), b = B.getBoundingClientRect();
      const ax = a.left - box.left, ay = a.top - box.top, bx = b.left - box.left, by = b.top - box.top;
      const overlapY = Math.min(ay + a.height, by + b.height) - Math.max(ay, by);
      let x1, y1, x2, y2, d;
      if (overlapY > 8) {
        const right = bx > ax;
        x1 = right ? ax + a.width : ax; y1 = Math.max(ay, by) + overlapY / 2;
        x2 = right ? bx : bx + b.width; y2 = y1;
        d = `M${x1} ${y1}L${x2} ${y2}`;
      } else {
        const down = by > ay;
        x1 = ax + a.width / 2; y1 = down ? ay + a.height : ay;
        x2 = bx + b.width / 2; y2 = down ? by : by + b.height;
        const my = (y1 + y2) / 2;
        d = `M${x1} ${y1}C${x1} ${my} ${x2} ${my} ${x2} ${y2}`;
      }
      const p = document.createElementNS(NS, 'path');
      p.setAttribute('d', d);
      p.setAttribute('class', 'nd-wire' + (e.m === 'F' ? ' is-fault' : '') + (e.m ? ' is-path' : ''));
      p.setAttribute('marker-end', 'url(#nd-arrow)');
      p.dataset.a = e.a; p.dataset.b = e.b;
      const t = document.createElementNS(NS, 'title');
      t.textContent = `${name(e.a)} → ${name(e.b)}${e.d ? ': ' + e.d : ''}`;
      p.appendChild(t);
      svg!.appendChild(p);
    }
  }

  function links(k: string) {
    const into = edges.filter(e => e.b === k), out = edges.filter(e => e.a === k);
    const fmt = (e: NdEdge, other: string) => `${name(other)}${e.d ? ' (' + e.d + ')' : ''}${e.m ? ' ' + e.m : ''}`;
    return {into: into.map(e => fmt(e, e.a)), out: out.map(e => fmt(e, e.b))};
  }
  function describe(k: string) {
    const el = node(k); if (!el) return '';
    const l = links(k);
    return [el.dataset.t, el.dataset.s, l.into.length ? 'Receives: ' + l.into.join('; ') : '', l.out.length ? 'Feeds: ' + l.out.join('; ') : ''].filter(Boolean).join('. ');
  }

  function showTip(el: HTMLElement) {
    if (!tip) return;
    const k = el.dataset.k!, l = links(k);
    tip.replaceChildren();
    const h = document.createElement('strong'); h.textContent = el.dataset.t || k; tip.appendChild(h);
    if (el.dataset.s) { const s = document.createElement('span'); s.textContent = el.dataset.s; tip.appendChild(s); }
    for (const [label, list] of [['Receives', l.into], ['Feeds', l.out]] as const) {
      if (!list.length) continue;
      const r = document.createElement('span'); r.className = 'nd-tip-row';
      const b = document.createElement('b'); b.textContent = label; r.appendChild(b); r.appendChild(document.createTextNode(' ' + list.join('; '))); tip.appendChild(r);
    }
    const box = body.getBoundingClientRect(), r = el.getBoundingClientRect();
    tip.hidden = false;
    const left = Math.min(Math.max(8, r.left - box.left), box.width - tip.offsetWidth - 8);
    const below = r.bottom - box.top + 8;
    tip.style.left = left + 'px';
    tip.style.top = (below + tip.offsetHeight > box.height ? r.top - box.top - tip.offsetHeight - 8 : below) + 'px';
  }
  const hideTip = () => { if (tip) tip.hidden = true; };

  function select(k: string | null) {
    body.classList.toggle('has-sel', !!k);
    const on = new Set<string>(k ? [k] : []);
    if (k) for (const e of edges) { if (e.a === k) on.add(e.b); if (e.b === k) on.add(e.a); }
    body.querySelectorAll<HTMLElement>('[data-k]').forEach(el => {
      const hit = on.has(el.dataset.k!);
      el.classList.toggle('is-on', hit);
      if (el.getAttribute('role') === 'button') el.setAttribute('aria-pressed', String(el.dataset.k === k));
    });
    svg!.querySelectorAll<SVGPathElement>('.nd-wire').forEach(p => p.classList.toggle('is-on', !!k && (p.dataset.a === k || p.dataset.b === k)));
    if (live) live.textContent = k ? describe(k) : '';
  }
  let current: string | null = null;
  const toggle = (k: string) => { current = current === k ? null : k; select(current); };

  const onClick = (ev: MouseEvent) => {
    const el = (ev.target as HTMLElement).closest<HTMLElement>('[role="button"][data-k]');
    if (el && body.contains(el)) toggle(el.dataset.k!); else if (current) { current = null; select(null); }
  };
  const onKey = (ev: KeyboardEvent) => {
    const el = (ev.target as HTMLElement).closest<HTMLElement>('[role="button"][data-k]');
    if (el && (ev.key === 'Enter' || ev.key === ' ')) { ev.preventDefault(); toggle(el.dataset.k!); }
    if (ev.key === 'Escape' && current) { current = null; select(null); }
  };
  const onOver = (ev: Event) => { const el = (ev.target as HTMLElement).closest<HTMLElement>('[role="button"][data-k]'); if (el) showTip(el); };
  const onOut = (ev: Event) => { const el = (ev.target as HTMLElement).closest<HTMLElement>('[role="button"][data-k]'); if (el) hideTip(); };

  body.addEventListener('click', onClick);
  body.addEventListener('keydown', onKey);
  body.addEventListener('mouseover', onOver);
  body.addEventListener('mouseout', onOut);
  body.addEventListener('focusin', onOver);
  body.addEventListener('focusout', onOut);
  const ro = new ResizeObserver(() => draw());
  ro.observe(body);
  draw();
  return () => {
    ro.disconnect();
    body.removeEventListener('click', onClick);
    body.removeEventListener('keydown', onKey);
    body.removeEventListener('mouseover', onOver);
    body.removeEventListener('mouseout', onOut);
    body.removeEventListener('focusin', onOver);
    body.removeEventListener('focusout', onOut);
  };
}
