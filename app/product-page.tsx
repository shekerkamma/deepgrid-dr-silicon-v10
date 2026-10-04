'use client';
/** One product page (/products/<slug>). Structure follows deepgridsemi.com's DG-A100 page, section for
 *  section: hero with the part in the middle and three figures beside it, an overview with a media
 *  carousel, a key-features grid, the architecture with its specification around it, readiness, what
 *  it is designed for, and the call to action. Content comes from product-pages-data.ts (authored from
 *  the annex), maturity and boundary from portfolio-story-data.ts, status and evidence from
 *  applications-story-data.ts, beats from the story-architect storyboards, so every surface states the
 *  same thing. Motion: fade-in-up on entry, a pulsing ring and a separating 3D die in the hero, a
 *  carousel; all of it stands still under a reduced-motion preference. */
import {useEffect, useRef, useState} from 'react';
import {
  Activity, ArrowRight, ArrowUpRight, Car, ChevronLeft, ChevronRight, CircuitBoard, Clock, Cog, Cpu, Download,
  FileText, Gauge, Layers, Network, Play, Radio, Shield, ShieldCheck, Thermometer, Zap, type LucideIcon,
} from 'lucide-react';
import {Diagram, Storyboard, DiagramNotes} from './detail';
import {archStories} from './arch-stories';
import {explainers} from './explainers';
import {FilmPlayer} from './film-player';
import {productDiagrams, nbspUnits} from './diagram-notes';
import {productBySlug, productSlugById, type ProductPage} from './product-pages-data';
import {portfolioParts} from './portfolio-story-data';
import {products, areas} from './applications-story-data';
import {groundedDocuments} from './documents-data';
import {readHref} from './doc-links';
import {url} from './routes';
import './product-page.css';

const SECTIONS = [
  ['pp-inside', 'Overview'],
  ['pp-features', 'Key features'],
  ['pp-specs', 'Architecture'],
  ['pp-highlights', 'Highlights'],
  ['pp-readiness', 'Readiness'],
  ['pp-fit', 'Designed for'],
  ['pp-integration', 'Integration'],
  ['pp-sources', 'Sources'],
] as const;

export default function ProductPageView({slug}: {slug: string}) {
  const p: ProductPage = productBySlug[slug];
  const part = portfolioParts.find(x => x.id === p.portfolioId)!;
  const record = products[p.id];
  const doc = groundedDocuments.find(d => d.id === record.evidenceDoc)!;
  const annex = groundedDocuments.find(d => d.id === 'doc2')!;
  const dg = productDiagrams[p.id];
  const story = archStories[p.id];
  const explainer = explainers.find(e => e.slug === p.slug);
  const S = story?.sections;
  const base = p.id === 'sku4' ? 'dg32-lite' : p.slug;
  const fits = areas.flatMap(a => a.items.filter(i => i.product === p.id).map(i => ({area: a, role: i.role})));
  const sheet = `Sheet ${String(record.sheet).padStart(2, '0')}`;
  const contact = url('/contact') + '?part=' + encodeURIComponent(`${part.code} ${part.name}`);
  const deck = url(`/downloads/${base}-architecture.pptx`);
  const half = Math.ceil(p.specs.length / 2);
  const animated = `/diagrams/${p.slug}-architecture-animated.svg`;   // scripts/sku-diagrams/animate.py
  const interfaces = p.specs.filter(([n]) => /interface|input|network|rs-485|can-fd|vision|output|connect/i.test(n));

  return (
    <article className="pp">
      <nav className="pp-bar" aria-label={`${part.code} sections`}>
        <div className="pp-bar-name"><span className="mono">{part.code}</span> {part.name}</div>
        <ul>{SECTIONS.map(([id, label]) => <li key={id}><a href={'#' + id}>{label}</a></li>)}</ul>
        <a className="pp-bar-cta" href={contact}>Discuss this part <ArrowUpRight size={14} aria-hidden="true"/></a>
      </nav>

      {/* 1 · Hero: the name, the part, three figures (DG-A100: name, exploded chip render, three cards). */}
      <header className="pp-hero">
        <div className="pp-hero-copy pp-reveal">
          <h1><span className="pp-hero-code">{part.code} · {part.process}</span> {part.name}</h1>
          <p className="pp-hero-claim">{p.headline}</p>
          <div className="pp-actions">
            <a className="primary" href={contact}>Discuss {part.code} <ArrowUpRight size={16} aria-hidden="true"/></a>
            {explainer && <a className="text-link" href="#pp-inside"><Play size={14} aria-hidden="true"/> Watch how it works · {explainer.length}</a>}
          </div>
        </div>
        <figure className="pp-hero-object pp-reveal">
          <Chip code={part.code} blocks={p.blocks.map(b => b.name)}/>
          <figcaption>Illustration: the part's blocks on one die. Pre-silicon; not a render of manufactured silicon.</figcaption>
        </figure>
        <dl className="pp-hero-specs pp-reveal">
          {p.heroSpecs.map(name => { const row = p.specs.find(r => r[0] === name)!; const Icon = iconFor(name); return (
            <div key={name}><dt><Icon size={16} aria-hidden="true"/>{name}<span className="pp-status">{status(row[1])}</span></dt><dd>{nbspUnits(row[1])}</dd></div>
          ); })}
        </dl>
      </header>

      {/* 2 · Overview: name, status line, actions; the media carousel (DG-A100: three product views). */}
      <section id="pp-inside" className="pp-sec pp-overview pp-reveal">
        <div className="pp-overview-copy">
          <p className="dr-kicker">{part.code} · {part.maturity}</p>
          <h2>{part.code} {part.name}</h2>
          <p className="pp-subtitle">{story?.headline ?? p.headline}</p>
          <p className="pp-lede">{p.lede}</p>
          <dl className="pp-facts">
            <div><dt>Job</dt><dd>{part.job}</dd></div>
            <div><dt>Replaces</dt><dd>{record.replaces}</dd></div>
            <div><dt>Status</dt><dd>{record.status ?? part.maturity}</dd></div>
          </dl>
          <div className="pp-actions">
            <a className="primary" href={deck}><Download size={15} aria-hidden="true"/> Architecture deck</a>
            <a className="text-link" href="#pp-specs">The architecture <ArrowRight size={15} aria-hidden="true"/></a>
          </div>
        </div>
        <Carousel label={`${part.code} media`} slides={[
          ...(explainer ? [{key: 'film', title: `How it works · ${explainer.length}`, node: <FilmPlayer film={explainer}/>}] : []),
          ...(dg ? [{key: 'diagram', title: 'Architecture, animated', node: <a className="pp-slide-img" href="#pp-diagram"><img src={url(animated)} alt={dg.alt} width={dg.width} height={dg.height} loading="lazy"/></a>}] : []),
        ]}/>
      </section>

      {/* 3 · Key features: one card per storyboard beat (DG-A100: a grid of six feature cards). */}
      {story && (
        <section id="pp-features" className="pp-sec pp-reveal">
          <header className="pp-center-head"><h2>Key features</h2><p>{story.lead.split('. ')[0]}.</p></header>
          <ol className="pp-features">
            {story.beats.slice(0, 6).map((b, i) => { const Icon = iconFor(b.title + ' ' + b.zones.join(' ')); return (
              <li key={i} className={i === 0 ? 'is-lead' : undefined}>
                <Icon size={22} aria-hidden="true"/>
                <p className="pp-feature-zone">{(b.zones[0] ?? '').split('  ·  ')[0]}</p>
                <h3>{b.title}</h3>
                <p>{firstSentence(b.body)}</p>
              </li>
            ); })}
          </ol>
        </section>
      )}

      {/* 4 · Architecture and technical specifications: the diagram in the middle, the targets around it,
          a row of facts beneath (DG-A100: schematic with spec cards either side, four chips below). */}
      <section id="pp-specs" className="pp-sec pp-reveal">
        <header className="pp-center-head"><h2>Architecture &amp; technical specifications</h2><p>{S?.specs.copy ?? `Every figure is a design target stated in the Technical Annex, ${sheet}. None is a measurement of manufactured silicon.`}</p></header>
        <div className="pp-arch">
          <dl className="pp-spec-cards">{p.specs.slice(0, half).map(r => <SpecCard key={r[0]} row={r}/>)}</dl>
          {dg && <a className="pp-arch-figure" href="#pp-diagram"><img src={url(animated)} alt={dg.alt} width={dg.width} height={dg.height} loading="lazy"/><span>Open the full diagram <ArrowRight size={14} aria-hidden="true"/></span></a>}
          <dl className="pp-spec-cards">{p.specs.slice(half).map(r => <SpecCard key={r[0]} row={r}/>)}</dl>
        </div>
        <dl className="pp-chips">
          <div><dt>Process</dt><dd>{part.process}</dd></div>
          <div><dt>Maturity</dt><dd>{part.maturity}</dd></div>
          <div><dt>Designed toward</dt><dd>{p.designedToward.join(' · ')}</dd></div>
          <div><dt>Source</dt><dd>Technical Annex v3, {sheet.toLowerCase()}</dd></div>
        </dl>
        <p className="pp-note">Standards the architecture is designed toward. No DeepGrid part holds a certification or qualification today.</p>
        {p.reconcile && <aside className="pp-reconcile"><p className="dr-kicker">WHERE THE SOURCES DIFFER</p><p>{p.reconcile}</p></aside>}
        {dg && story && (
          <details id="pp-diagram" className="sb-ref pp-diagram-full"><summary className="dr-kicker">THE FULL DIAGRAM, ITS STORYBOARD AND SOURCES</summary>
            {dg.note && <p className="pp-note">{nbspUnits(dg.note)}</p>}
            <Diagram src={dg.src} title={dg.title} alt={dg.alt} width={dg.width} height={dg.height} drawio={dg.drawio} guide={dg.guide} html={`/downloads/${base}-workflow.html`} deck={`/downloads/${base}-architecture.pptx`}/>
            <Storyboard story={story} questionsHref="#pp-readiness"/>
            <DiagramNotes notes={dg.notes}/>
            <p className="pp-note">Architecture from the annex, {sheet}. A functional view, not a floorplan.</p>
          </details>
        )}
      </section>

      {/* Performance highlights (DG-R100/S100/T100): three large figures. Ours are design targets, so the
          tiles say so, and there are no benchmark bars: nothing has been measured on silicon. */}
      <section id="pp-highlights" className="pp-sec pp-reveal">
        <header className="pp-center-head"><h2>Performance highlights</h2><p>Design targets from the Technical Annex, {sheet.toLowerCase()}. None is a measurement of manufactured silicon.</p></header>
        <ul className="pp-highlights">
          {p.highlights.map(([fig, label, row]) => { const value = p.specs.find(r => r[0] === row)![1]; return (
            <li key={label}><strong>{nbspUnits(fig)}</strong><span className="pp-hl-label">{label}</span><span className="pp-status">{status(value)}</span><span className="pp-hl-rest">{row}: {nbspUnits(value)}</span></li>
          ); })}
        </ul>
      </section>

      {/* 5 · Readiness: the label holds while the cards scroll (DG-A100: "System readiness"), ending on
          the evidence panel where DG-A100 shows its measured prototype pipeline. */}
      <section id="pp-readiness" className="pp-sec pp-readiness pp-reveal">
        <header className="pp-readiness-head">
          <p className="dr-kicker">READINESS</p>
          <h2>{S?.questions.title ?? 'What an evaluator should ask first.'}</h2>
          <p>{S?.questions.copy ?? `The annex asks these of its own design. Each is a question silicon, test or layout has to answer before ${part.code} can be relied on.`}</p>
        </header>
        <div className="pp-readiness-cards">
          {p.physics.map((x, i) => (
            <article key={'r' + i}><p className="pp-card-kicker">Why its own silicon</p><h3>{x.requirement}</h3><p>{x.consequence}</p></article>
          ))}
          {p.questions.map((q, i) => (
            <article key={'q' + i}><p className="pp-card-kicker">Open question {String(i + 1).padStart(2, '0')}</p><h3>{q.title}</h3><p>{q.question}</p></article>
          ))}
          <article className="pp-evidence-panel">
            <p className="pp-card-kicker">Evidence today</p>
            <h3>{S?.evidence.title ?? (part.maturity === 'Pre-silicon engineering evidence' ? 'Simulated and implemented, not yet measured.' : 'An architecture, with its evidence named.')}</h3>
            <dl className="pp-evidence">
              <div><dt>Strongest evidence</dt><dd>{record.evidence}</dd></div>
              {record.status && <div><dt>Development status</dt><dd>{record.status}</dd></div>}
            </dl>
            <p className="pp-note">{S?.evidence.copy ?? part.boundary}</p>
            <a className="text-link" href={url('/evidence')}>How every figure on this site was obtained <ArrowUpRight size={15} aria-hidden="true"/></a>
            {p.deeper && <ul className="pp-deeper">{p.deeper.map(d => <li key={d.href}><a href={url(d.href)}>{d.label}<ArrowUpRight size={14} aria-hidden="true"/></a></li>)}</ul>}
          </article>
        </div>
      </section>

      {/* 6 · Designed for: application cards (DG-A100: four application cards), then the parts beside it. */}
      <section id="pp-fit" className="pp-sec pp-designed pp-reveal">
        <header className="pp-center-head"><h2>Designed for</h2><p>{S?.fit.copy ?? part.evaluation}</p></header>
        <ul className="pp-apps">
          {fits.map(f => { const Icon = areaIcon(f.area.id); return (
            <li key={f.area.id}><a href={url('/use-cases/' + f.area.id)}><Icon size={22} aria-hidden="true"/><span className="pp-app-name">{f.area.name}<ArrowUpRight size={14} aria-hidden="true"/></span><span>{f.role}</span></a></li>
          ); })}
        </ul>
        <ul className="pp-related">
          {p.related.map(r => {
            const rp = productBySlug[r.slug];
            const rpart = portfolioParts.find(x => x.id === rp.portfolioId)!;
            return <li key={r.slug}><a href={url('/products/' + r.slug)}><span className="mono">{rpart.code}</span> {rpart.name}<span className="pp-why">{r.why}</span></a></li>;
          })}
        </ul>
      </section>

      {/* Integration & compatibility (DG-R100/S100/T100): three columns of what a designer plugs into. */}
      <section id="pp-integration" className="pp-sec pp-reveal">
        <header className="pp-center-head"><h2>Integration &amp; compatibility</h2><p>The interfaces it presents, the standards it is designed toward, and the design files to take into your own tools.</p></header>
        <div className="pp-integration">
          <article><h3><Network size={18} aria-hidden="true"/> Interfaces</h3><ul>{(interfaces.length ? interfaces : p.specs.slice(0, 3)).map(([n, v]) => <li key={n}><b>{n}</b> {nbspUnits(v)}</li>)}</ul></article>
          <article><h3><ShieldCheck size={18} aria-hidden="true"/> Designed toward</h3><ul>{p.designedToward.map(x => <li key={x}>{x}</li>)}</ul><p className="pp-note">No DeepGrid part holds a certification or qualification today.</p></article>
          <article><h3><Download size={18} aria-hidden="true"/> Design files</h3><ul>
            <li><a href={deck}>Architecture deck (.pptx)</a></li>
            {dg && <li><a href={url(dg.drawio)}>Editable diagram (.drawio)</a></li>}
            <li><a href={url(`/downloads/${base}-workflow.html`)}>Interactive workflow (.html)</a></li>
            {dg && <li><a href={readHref(dg.guide)}>Architecture guide</a></li>}
          </ul></article>
        </div>
      </section>

      {/* 7 · Call to action (DG-A100: talk to our team, download the whitepaper). */}
      <section className="pp-close pp-reveal">
        <h2>{S?.close.title ?? `Bring the socket. We will tell you what ${part.code} has to prove for it.`}</h2>
        <p>{S?.close.copy ?? 'Send the platform, voltage and power environment, interfaces and qualification needs. The reply names what is architecture, what is evidence and what would have to be tested.'}</p>
        <div className="pp-actions">
          <a className="primary" href={contact}>Discuss {part.code} <ArrowUpRight size={16} aria-hidden="true"/></a>
          <a className="pp-ghost" href={deck}><Download size={15} aria-hidden="true"/> Download the architecture deck</a>
          <a className="text-link" href={url('/products')}>Compare all ten parts <ArrowUpRight size={15} aria-hidden="true"/></a>
        </div>
      </section>

      <section id="pp-sources" className="pp-sec">
        <header className="pp-sources-head"><p className="dr-kicker">SOURCES</p><h2>{S?.sources.title ?? 'Read the source behind every figure.'}</h2>
          <p>{(S?.sources.copy ?? 'Each document opens inside the site at the cited section; the PDF is the edition of record.') + (dg?.annexDiffers ? ' Where the annex sheet differs from this page, the difference is stated beside it.' : '')}</p></header>
        <ul className="pp-sources">
          <li>
            <a href={readHref(annex.specFile, part.source.section.includes('§3') ? undefined : '2. Complete 14-Sheet Portfolio Matrix')}><FileText size={15} aria-hidden="true"/><span>{annex.title}</span><span className="pp-cite">{sheet}{part.source.section ? ' · ' + part.source.section : ''}</span></a>
            <a className="pp-pdf" href={url(annex.pdfFile)}>PDF · {annex.pdfPageCount}{dg?.annexDiffers ? ' · values differ from this page' : ''}</a>
            {dg?.annexDiffers && <p className="pp-differs">Some values on {sheet.toLowerCase()} differ from this page, which follows the product specification: {nbspUnits(dg.annexDiffers)}.</p>}
          </li>
          {doc.id !== annex.id && (
            <li>
              <a href={readHref(doc.specFile)}><FileText size={15} aria-hidden="true"/><span>{doc.title}</span><span className="pp-cite">Evidence for this part</span></a>
              <a className="pp-pdf" href={url(doc.pdfFile)}>PDF · {doc.pdfPageCount}</a>
            </li>
          )}
          {part.source.path !== annex.specFile && (
            <li><a href={readHref(part.source.path, part.source.section)}><FileText size={15} aria-hidden="true"/><span>{part.source.title}</span><span className="pp-cite">{part.source.section}</span></a></li>
          )}
        </ul>
      </section>
      <Reveal/>
    </article>
  );
}

/** A figure's standing, stated on its card: the annex gives targets; a few rows are simulated results. */
function status(value: string) { return /simulated/i.test(value) ? 'Simulated' : 'Target'; }

function firstSentence(s: string) { const m = s.match(/^.+?[.!?](\s|$)/); return (m ? m[0] : s).trim(); }

/** One icon per figure or feature, chosen from its words; a fixed vocabulary, never decoration for its own sake. */
const ICONS: [RegExp, LucideIcon][] = [
  [/fault|safe|lockstep|upset|protect|esd|secur|island|failsafe|tamper/i, ShieldCheck],
  [/rail|power|volt|surge|swing|fuse|bus\b|input|supply/i, Zap],
  [/radar|rf|sweep|chirp|array|ghz|link|can|rs-485|network|ethernet|tsn/i, Radio],
  [/latency|loop|timing|deglitch|watchdog|cycle|clock|µs|ms\b/i, Clock],
  [/process|nm|die|bcd|cmos|package/i, Layers],
  [/processor|core|risc|control|engine|navigation|flight|compute|ai\b/i, Cpu],
  [/adc|converter|sens|sample|meter|accuracy|front end|measure/i, Activity],
  [/temperature|thermal|heat|°c/i, Thermometer],
  [/output|column|display|pwm|drive/i, Gauge],
  [/interface|crossbar|router|gateway/i, Network],
];
function iconFor(text: string): LucideIcon { return ICONS.find(([re]) => re.test(text))?.[1] ?? Cpu; }
function areaIcon(id: string): LucideIcon { return ({vehicles: Car, grid: Zap, motors: Cog, defence: Shield, boards: CircuitBoard} as Record<string, LucideIcon>)[id] ?? Cpu; }

function SpecCard({row: [name, value]}: {row: [string, string]}) {
  const Icon = iconFor(name + ' ' + value);
  return <div><dt><Icon size={15} aria-hidden="true"/>{name}<span className="pp-status">{status(value)}</span></dt><dd>{nbspUnits(value)}</dd></div>;
}

/** The hero's object: an exploded die stack (lid, die, substrate) with the part's own blocks on the die,
 *  in the spirit of DG-A100's layered chip render. Drawn in CSS 3D; the layers part on entry and drift. */
function Chip({code, blocks}: {code: string; blocks: string[]}) {
  return (
    <div className="pp-chip" aria-hidden="true">
      <span className="pp-chip-ring"/>
      <div className="pp-chip-stack">
        <div className="pp-chip-layer pp-chip-sub"><i/></div>
        <div className="pp-chip-layer pp-chip-die">{blocks.slice(0, 6).map(b => <span key={b}>{b}</span>)}</div>
        <div className="pp-chip-layer pp-chip-lid"><b>{code}</b></div>
      </div>
    </div>
  );
}

/** Media carousel: one slide at a time, arrows and dots, keyboard-reachable; leaving a slide pauses its video. */
function Carousel({label, slides}: {label: string; slides: {key: string; title: string; node: React.ReactNode}[]}) {
  const [i, setI] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => { root.current?.querySelectorAll('video').forEach(v => { if (!v.closest('.is-active')) v.pause(); }); }, [i]);
  if (!slides.length) return null;
  const go = (d: number) => setI(x => (x + d + slides.length) % slides.length);
  return (
    <div className="pp-carousel" ref={root} role="region" aria-roledescription="carousel" aria-label={label}>
      <div className="pp-slides">
        {slides.map((s, k) => <div key={s.key} className={'pp-slide' + (k === i ? ' is-active' : '')} role="group" aria-roledescription="slide" aria-label={`${k + 1} of ${slides.length}: ${s.title}`} hidden={k !== i}>{s.node}</div>)}
      </div>
      {slides.length > 1 && (
        <div className="pp-carousel-nav">
          <button type="button" onClick={() => go(-1)} aria-label="Previous"><ChevronLeft size={18} aria-hidden="true"/></button>
          <span className="pp-carousel-title">{slides[i].title}</span>
          <span className="pp-dots">{slides.map((s, k) => <button key={s.key} type="button" className={k === i ? 'is-on' : undefined} onClick={() => setI(k)} aria-label={s.title} aria-current={k === i}/>)}</span>
          <button type="button" onClick={() => go(1)} aria-label="Next"><ChevronRight size={18} aria-hidden="true"/></button>
        </div>
      )}
    </div>
  );
}

/** Fade-in-up on entry, as DG-A100's sections do. Without IntersectionObserver or with reduced motion,
 *  everything is visible from the start. */
function Reveal() {
  useEffect(() => {
    const els = [...document.querySelectorAll<HTMLElement>('.pp-reveal')];
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('is-in')); return; }
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } }), {rootMargin: '0px 0px -8% 0px'});
    els.forEach(e => io.observe(e));
    return () => io.disconnect();
  }, []);
  return null;
}

export {productSlugById};
