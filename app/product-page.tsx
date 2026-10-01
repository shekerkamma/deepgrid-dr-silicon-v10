'use client';
/** One product page (/products/<slug>). Spine: docs/v6/story-pack-depth.md §6. Content comes from
 *  product-pages-data.ts (authored from the annex), maturity and boundary from portfolio-story-data.ts,
 *  status and evidence from applications-story-data.ts, so every surface states the same thing. */
import {ArrowRight, ArrowUpRight, FileText} from 'lucide-react';
import {Sec, DataTable} from './detail';
import {productBySlug, productSlugById, type ProductPage} from './product-pages-data';
import {portfolioParts} from './portfolio-story-data';
import {products, areas} from './applications-story-data';
import {groundedDocuments} from './documents-data';
import {readHref} from './doc-links';
import {url} from './routes';
import './product-page.css';

const SECTIONS = [
  ['pp-physics', 'Why its own silicon'],
  ['pp-inside', 'Inside the part'],
  ['pp-specs', 'Specification'],
  ['pp-questions', 'Evaluation questions'],
  ['pp-fit', 'Where it fits'],
  ['pp-evidence', 'Evidence today'],
  ['pp-sources', 'Sources'],
] as const;

export default function ProductPageView({slug}: {slug: string}) {
  const p: ProductPage = productBySlug[slug];
  const part = portfolioParts.find(x => x.id === p.portfolioId)!;
  const record = products[p.id];
  const doc = groundedDocuments.find(d => d.id === record.evidenceDoc)!;
  const annex = groundedDocuments.find(d => d.id === 'doc2')!;
  const fits = areas.flatMap(a => a.items.filter(i => i.product === p.id).map(i => ({area: a, role: i.role})));
  const sheet = `Sheet ${String(record.sheet).padStart(2, '0')}`;
  const contact = url('/contact') + '?part=' + encodeURIComponent(`${part.code} ${part.name}`);

  return (
    <article className="pp">
      <nav className="pp-bar" aria-label={`${part.code} sections`}>
        <div className="pp-bar-name"><span className="mono">{part.code}</span> {part.name}</div>
        <ul>{SECTIONS.map(([id, label]) => <li key={id}><a href={'#' + id}>{label}</a></li>)}</ul>
        <a className="pp-bar-cta" href={contact}>Discuss this part <ArrowUpRight size={14} aria-hidden="true"/></a>
      </nav>

      <header className="pp-head">
        <p className="dr-kicker">{part.code} · {part.process}</p>
        <h1>{p.headline}</h1>
        <p className="pp-lede">{p.lede}</p>
        <dl className="pp-facts">
          <div><dt>Job</dt><dd>{part.job}</dd></div>
          <div><dt>Replaces</dt><dd>{record.replaces}</dd></div>
          <div><dt>Maturity</dt><dd><span className="pp-badge">{part.maturity}</span></dd></div>
        </dl>
      </header>

      <section id="pp-physics" className="pp-sec">
        <Sec kicker="WHY ITS OWN SILICON" title="The physical requirement sets the process." copy="Each requirement below is a property of the socket, not a preference; the right-hand column is what it forces on the silicon.">
          <ol className="pp-physics">
            {p.physics.map((x, i) => <li key={i}><p className="pp-req">{x.requirement}</p><ArrowRight size={16} aria-hidden="true"/><p>{x.consequence}</p></li>)}
          </ol>
        </Sec>
      </section>

      <section id="pp-inside" className="pp-sec">
        <Sec kicker="INSIDE THE PART" title="From signal in to signal out." copy={p.blockNote}>
          <ol className="pp-blocks" aria-label={`${part.code} block architecture`}>
            {p.blocks.map(b => (
              <li key={b.name}>
                <h3>{b.name}</h3>
                <ul>{b.items.map(i => <li key={i}>{i}</li>)}</ul>
              </li>
            ))}
          </ol>
          <p className="pp-note">Block architecture from the annex, {sheet}. A functional view, not a floorplan.</p>
        </Sec>
      </section>

      <section id="pp-specs" className="pp-sec">
        <Sec kicker="SPECIFICATION" title="Architecture targets, not datasheet values." copy={`Every figure is a design target stated in the Technical Annex, ${sheet}. None is a measurement of manufactured silicon.`}>
          <DataTable caption={`${part.code} architecture targets (Annex v3, ${sheet})`} head={['Parameter', 'Target']} rows={p.specs}/>
          <div className="pp-toward">
            <p className="dr-kicker">DESIGNED TOWARD</p>
            <ul>{p.designedToward.map(s => <li key={s}>{s}</li>)}</ul>
            <p className="pp-note">Standards the architecture is designed toward. No DeepGrid part holds a certification or qualification today.</p>
          </div>
          {p.reconcile && <aside className="pp-reconcile"><p className="dr-kicker">WHERE THE SOURCES DIFFER</p><p>{p.reconcile}</p></aside>}
        </Sec>
      </section>

      <section id="pp-questions" className="pp-sec">
        <Sec kicker="EVALUATION QUESTIONS" title="What an evaluator should ask first." copy={`The annex asks these of its own design. Each is a question silicon, test or layout has to answer before ${part.code} can be relied on.`}>
          <ol className="pp-questions">
            {p.questions.map(q => <li key={q.title}><h3>{q.title}</h3><p>{q.question}</p></li>)}
          </ol>
        </Sec>
      </section>

      <section id="pp-fit" className="pp-sec">
        <Sec kicker="WHERE IT FITS" title="The systems it goes into, and the parts beside it." copy={part.evaluation}>
          <div className="pp-fit">
            <ul className="pp-areas">
              {fits.map(f => (
                <li key={f.area.id}>
                  <a href={url('/use-cases/' + f.area.id)}><span className="pp-area-name">{f.area.name}<ArrowUpRight size={14} aria-hidden="true"/></span><span>{f.role}</span></a>
                </li>
              ))}
            </ul>
            <ul className="pp-related">
              {p.related.map(r => {
                const rp = productBySlug[r.slug];
                const rpart = portfolioParts.find(x => x.id === rp.portfolioId)!;
                return <li key={r.slug}><a href={url('/products/' + r.slug)}><span className="mono">{rpart.code}</span> {rpart.name}<span className="pp-why">{r.why}</span></a></li>;
              })}
            </ul>
          </div>
        </Sec>
      </section>

      <section id="pp-evidence" className="pp-sec">
        <Sec kicker="EVIDENCE TODAY" title={part.maturity === 'Pre-silicon engineering evidence' ? 'Simulated and implemented, not yet measured.' : 'An architecture, with its evidence named.'} copy={part.boundary}>
          <dl className="pp-evidence">
            <div><dt>Strongest evidence</dt><dd>{record.evidence}</dd></div>
            {record.status && <div><dt>Development status</dt><dd>{record.status}</dd></div>}
          </dl>
          <a className="text-link" href={url('/evidence')}>How every figure on this site was obtained <ArrowUpRight size={15} aria-hidden="true"/></a>
          {p.deeper && (
            <ul className="pp-deeper">{p.deeper.map(d => <li key={d.href}><a href={url(d.href)}>{d.label}<ArrowUpRight size={14} aria-hidden="true"/></a></li>)}</ul>
          )}
        </Sec>
      </section>

      <section id="pp-sources" className="pp-sec">
        <Sec kicker="SOURCES" title="Read the source behind every figure." copy="Each document opens inside the site at the cited section; the PDF is the edition of record.">
          <ul className="pp-sources">
            <li>
              <a href={readHref(annex.specFile, part.source.section.includes('§3') ? undefined : '2. Complete 14-Sheet Portfolio Matrix')}><FileText size={15} aria-hidden="true"/><span>{annex.title}</span><span className="pp-cite">{sheet}{part.source.section ? ' · ' + part.source.section : ''}</span></a>
              <a className="pp-pdf" href={url(annex.pdfFile)}>PDF · {annex.pdfPageCount}</a>
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
        </Sec>
      </section>

      <section className="pp-close">
        <h2>Bring the socket. We will tell you what {part.code} has to prove for it.</h2>
        <p>Send the platform, voltage and power environment, interfaces and qualification needs. The reply names what is architecture, what is evidence and what would have to be tested.</p>
        <div className="pp-actions">
          <a className="primary" href={contact}>Discuss {part.code} <ArrowUpRight size={16} aria-hidden="true"/></a>
          <a className="text-link" href={url('/products')}>Compare all ten parts <ArrowUpRight size={15} aria-hidden="true"/></a>
        </div>
      </section>
    </article>
  );
}

export {productSlugById};
