'use client';
/** "Our products" as deepgridsemi.com draws it on its home and Accelerators pages: a row of tall tiles,
 *  each part's name set vertically; the tile under the pointer or focus opens to its claim, three target
 *  figures and its links. The tile ground is a quiet gradient and the part's number: film posters carry
 *  their own titles, which read as broken fragments in a narrow tile. Every figure is a target. */
import {useState} from 'react';
import {ArrowUpRight, Play} from 'lucide-react';
import {productPages} from './product-pages-data';
import {portfolioParts} from './portfolio-story-data';
import {explainers} from './explainers';
import {nbspUnits} from './diagram-notes';
import {url} from './routes';
import './product-tiles.css';

export default function ProductTiles({title = 'Our products', lede = 'Ten parts, each built for one physical job. Pre-silicon; every figure is a design target.'}: {title?: string; lede?: string}) {
  const [open, setOpen] = useState(0);
  return (
    <section className="pt" aria-labelledby="pt-title">
      <header className="pt-head"><h2 id="pt-title">{title}</h2><p>{lede}</p></header>
      <ul className="pt-row">
        {productPages.map((p, i) => {
          const part = portfolioParts.find(x => x.id === p.portfolioId)!;
          const film = explainers.find(e => e.slug === p.slug);
          return (
            <li key={p.slug} className={'pt-tile' + (i === open ? ' is-open' : '')} onMouseEnter={() => setOpen(i)} onFocus={() => setOpen(i)}>
              <span className="pt-mark" aria-hidden="true">{part.code.replace('SKU-', '')}</span>
              <a className="pt-spine" href={url('/products/' + p.slug)} aria-label={`${part.code} ${part.name}`} aria-expanded={i === open} onClick={e => { if (i !== open) { e.preventDefault(); setOpen(i); } }}>
                <span>{part.code}</span> {part.name}
              </a>
              <div className="pt-body" aria-hidden={i !== open}>
                <p className="pt-code">{part.code} · {part.process}</p>
                <h3>{part.name}</h3>
                <p className="pt-claim">{p.headline}</p>
                <dl>{p.highlights.map(([fig, label]) => <div key={label}><dt>{label}</dt><dd>{nbspUnits(fig)}</dd></div>)}</dl>
                <div className="pt-actions">
                  <a className="primary" href={url('/products/' + p.slug)} tabIndex={i === open ? 0 : -1}>View details <ArrowUpRight size={14} aria-hidden="true"/></a>
                  {film && <a className="pt-ghost" href={url('/products/' + p.slug) + '#pp-inside'} tabIndex={i === open ? 0 : -1}><Play size={13} aria-hidden="true"/> Film · {film.length}</a>}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
