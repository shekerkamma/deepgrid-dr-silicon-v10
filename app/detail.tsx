'use client';
import {useEffect,useRef} from 'react';
import {ArrowUpRight,Download} from 'lucide-react';
import {attach} from './nd-interact';
import {url} from './routes';
import {readHref} from './doc-links';
import {nbspUnits as nb, type DiagramNotes as DiagramNotesData, type DiagramRef, type NativeDiagramData} from './diagram-notes';
import type {Explained,Step} from './detail-content';

// Layout primitives for the detailed sections. Content lives in detail-content.ts.

export function Eyebrow({children}:{children:React.ReactNode}){return <p className="eyebrow"><span/> {children}</p>}
export function SectionHead({title,copy,kicker}:{tag?:string;kicker?:string;title:string;copy:string}){return <header className="section-head"><div>{kicker&&<p className="kicker">{kicker}</p>}<h1>{title}</h1></div><p>{copy}</p></header>}

export function Sec({kicker,title,em,copy,children}:{kicker:string;title:string;em?:string;copy?:React.ReactNode;children?:React.ReactNode}){
 return <section className="dr-sec"><header className="dr-sec-head"><div><p className="dr-kicker">{kicker}</p><h2 className="dr-h2">{title}{em&&<><br/><em>{em}</em></>}</h2></div>{copy&&<div className="dr-sec-copy">{typeof copy==='string'?<p>{copy}</p>:copy}</div>}</header>{children}</section>;
}

export function ExplainedGrid({items,cols=3}:{items:Explained[];cols?:2|3}){
 return <div className={'dr-explained dr-cols-'+cols}>{items.map(x=><article key={x.name}><h3>{x.name}</h3><p>{x.what}</p><p className="dr-why-line"><span className="mono">WHY</span>{x.why}</p>{x.points&&<ul>{x.points.map(p=><li key={p}>{p}</li>)}</ul>}</article>)}</div>;
}

export function Steps({steps,label}:{steps:Step[];label?:string}){
 return <ol className="dr-steps" aria-label={label}>{steps.map(([t,d],i)=><li key={t}><span className="dr-step-n">{String(i+1).padStart(2,'0')}</span><div><h3>{t}</h3><p>{d}</p></div></li>)}</ol>;
}

export function Flows({flows}:{flows:{title:string;lead:string;steps:Step[]}[]}){
 return <div className={'dr-flows dr-flows-'+flows.length}>{flows.map(f=><div key={f.title} className="dr-flow"><h3>{f.title}</h3><p className="dr-flow-lead">{f.lead}</p><Steps steps={f.steps} label={f.title}/></div>)}</div>;
}

export function DataTable({caption,head,rows,wide}:{caption:string;head:string[];rows:readonly (readonly (string|number)[])[];wide?:boolean}){
 return <div className="table-scroll"><table className={'dr-table'+(wide?' dr-table-wide':'')}><caption>{caption}</caption><thead><tr>{head.map(h=><th scope="col" key={h}>{h}</th>)}</tr></thead><tbody>{rows.map(r=><tr key={String(r[0])}><th scope="row">{r[0]}</th>{r.slice(1).map((c,i)=><td key={i}>{c}</td>)}</tr>)}</tbody></table></div>;
}

export function Callout({label,children,action}:{label:string;children:React.ReactNode;action?:React.ReactNode}){return <aside className="dr-callout"><span className="mono">{label}</span><p>{children}</p>{action}</aside>}

export function Stats({items}:{items:readonly (readonly [string,string])[]}){return <div className="spec-grid dr-stats-grid">{items.map(([v,k])=><div key={k}><span>{k}</span><strong>{v}</strong></div>)}</div>}

// A draw.io diagram at its native size (its labels are drawn at 10 px), in a frame wider than the
// text column, with a fit-to-width toggle and the full-size and source links.

const MARK_NAMES: Record<string, string> = {'①': '1', '②': '2', '③': '3', '④': '4', '⑤': '5', '⑥': '6', F: 'fault path'};

/** One architecture diagram in the site's own design (docs/v6/story-pack-depth.md §6 row 3: native, labelled
 *  stages, no raster text). Zones are cards, blocks sit inside them, and the numbered markers of the reading
 *  path sit on the blocks they name; the legend is the first thing in the notes below. On a phone every zone
 *  stacks, so nothing scrolls sideways. The draw.io drawing stays one click away as the full diagram. */
export function NativeDiagram({data,title,label,svg,drawio,guide,html,deck,caption,notes}:{data:NativeDiagramData;title:string;label?:string;svg?:string;drawio?:string;guide?:string;html?:string;deck?:string;caption?:React.ReactNode;notes?:DiagramNotesData}){
 const body=useRef<HTMLDivElement>(null);
 // Connections, hover detail and click-to-highlight are drawn by nd-interact once the blocks are laid out.
 useEffect(()=>{const el=body.current;return el&&data.edges?.length?attach(el,data.edges):undefined;},[data]);
 const interactive=!!data.edges?.length;
 return <figure className="nd" aria-label={title}>
  <div className="nd-bar"><div><span className="mono">{label??'SYSTEM ARCHITECTURE · INTERACTIVE'}</span><strong>{title}</strong></div>
   <div className="nd-actions">{svg&&<a className="text-link" href={svg} target="_blank" rel="noreferrer">Open full diagram <ArrowUpRight size={15} aria-hidden="true"/></a>}{drawio&&<a className="text-link" href={drawio} download>Source (.drawio) <Download size={15} aria-hidden="true"/></a>}{html&&<a className="text-link" href={html} target="_blank" rel="noreferrer">Interactive diagram (HTML) <ArrowUpRight size={15} aria-hidden="true"/></a>}{deck&&<a className="text-link" href={deck} download>Architecture deck (.pptx) <Download size={15} aria-hidden="true"/></a>}{guide&&<a className="text-link" href={url(guide)}>Read architecture guide <ArrowUpRight size={15} aria-hidden="true"/></a>}</div></div>
  {interactive&&<p className="nd-hint">Select a block to see what it receives and feeds; the arrows show each connection.</p>}
  <div className="nd-body" ref={body}>
   <svg className="nd-wires" aria-hidden="true"/>
   {data.banner&&<p className="nd-banner">{nb(data.banner)}</p>}
   {data.input&&<p className="nd-io" data-k="IN" data-t="External inputs" data-s={data.input}><span className="mono">IN</span>{nb(data.input)}</p>}
   <div className="nd-frame"><p className="nd-frame-label mono">{data.frame}</p>
    {data.rows.map((r,i)=>'bus' in r
     ? <p className="nd-bus" key={i} data-k={r.k} data-t={r.bus.split('·')[0].trim()} data-s={r.bus}>{nb(r.bus)}</p>
     : <div className="nd-row" key={i} style={{gridTemplateColumns:r.zones.map(z=>`minmax(0,${z.w}fr)`).join(' ')}}>
        {r.zones.map(z=><section key={z.name} className={'nd-zone'+(z.tone?' is-'+z.tone:'')} aria-label={z.name} data-k={z.k} data-t={z.name}>
         <p className="nd-zone-name">{z.name}</p>
         <div className="nd-blocks" role="group" aria-label={z.name} style={{'--c':z.cols,'--cm':z.mcols??Math.min(z.cols,2)} as React.CSSProperties}>
          {z.blocks.map((b,j)=>b
           ? <div key={j} className="nd-block" data-k={b.k} data-t={b.t} data-s={b.s} {...(interactive?{role:'button',tabIndex:0,'aria-pressed':false}:{})} style={b.span?{'--s':b.span,'--sm':Math.min(b.span,2)} as React.CSSProperties:undefined}>
              {b.marks&&<span className="nd-marks">{b.marks.map(m=><span key={m} className={'nd-mark'+(m==='F'?' is-fault':'')} aria-label={'Marker '+(MARK_NAMES[m]??m)}>{m}</span>)}</span>}
              <strong>{b.t}</strong>{b.s&&<span>{nb(b.s)}</span>}</div>
           : <div key={j} className="nd-gap" aria-hidden="true"/>)}
         </div>
         {z.note&&<p className="nd-zone-note">{nb(z.note)}</p>}
        </section>)}
       </div>)}
   </div>
   {data.output&&<p className="nd-io" data-k="OUT" data-t="External outputs" data-s={data.output}><span className="mono">OUT</span>{nb(data.output)}</p>}
   {data.strip&&<p className="nd-strip"><span><b className="mono">PROTOTYPE</b> {nb(data.strip[0])}</span><span><b className="mono">PRODUCT</b> {nb(data.strip[1])}</span></p>}
   <div className="nd-tip" hidden role="tooltip"/>
  </div>
  {interactive&&<p className="nd-live sr-only" aria-live="polite"/>}
  {caption&&<figcaption>{caption}</figcaption>}
  {notes&&<DiagramNotes notes={notes}/>}
 </figure>;
}

/** The reading notes under an architecture diagram: what each zone is and why it exists, what the
 *  numbered markers mean, then the primary documents and background reading. Data: diagram-notes.ts. */
export function DiagramNotes({notes}:{notes:DiagramNotesData}){
 const refs=(items:DiagramRef[],external:boolean)=><ul className="dr-dnotes-list">{items.map(r=><li key={r.href}><a href={r.href} {...(external?{target:'_blank',rel:'noreferrer'}:{})}><strong>{r.title}{external&&<ArrowUpRight size={14} aria-hidden="true"/>}</strong><span>{nb(r.note)}</span>{r.meta&&<small className="mono">{r.meta}</small>}</a></li>)}</ul>;
 return <div className="dr-dnotes">
  <section aria-label="How to read this diagram">
   <p className="dr-kicker">THE NUMBERED MARKERS</p>
   <ol className="dr-dnotes-marks">{notes.markers.map(m=><li key={m.mark}><b aria-hidden="true">{m.mark}</b><span><span className="sr-only">Marker {m.mark}: </span>{nb(m.text)}</span></li>)}</ol>
   <p className="dr-kicker dr-dnotes-gap">HOW TO READ THIS DIAGRAM</p>
   <dl className="dr-dnotes-zones">{notes.zones.map(z=><div key={z.name}><dt>{z.name}</dt><dd><p>{nb(z.what)}</p>{z.why&&<p className="dr-dnotes-why"><b>Why</b> {nb(z.why)}</p>}<a className="dr-dnotes-cite" href={readHref(notes.guide,z.section)}>Guide: {z.section.replace(/^Component: /,'')}</a></dd></div>)}</dl>
  </section>
  <section aria-label="Sources and further reading" className="dr-dnotes-refs">
   <p className="dr-kicker">PRIMARY SOURCES</p>
   {refs(notes.primary,false)}
   <details className="dr-dnotes-more"><summary className="dr-kicker">BACKGROUND READING · {notes.background.length}</summary>
    {refs(notes.background,true)}
    <p className="disclaimer">Background reading explains the general technique each block uses. None of it describes this part or implies its certification.</p>
   </details>
  </section>
 </div>;
}
