'use client';
import {useEffect,useRef,useState} from 'react';
import {ArrowUpRight,Download,Maximize2,Minimize2} from 'lucide-react';
import {url} from './routes';
import {readHref} from './doc-links';
import type {DiagramNotes as DiagramNotesData,DiagramRef} from './diagram-notes';
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
export function Diagram({src,title,alt,width,height,drawio,guide,caption,notes}:{src:string;title:string;alt:string;width:number;height:number;drawio?:string;guide?:string;caption?:React.ReactNode;notes?:DiagramNotesData}){
 const [fit,setFit]=useState(false),[more,setMore]=useState(false);
 const body=useRef<HTMLDivElement>(null);
 // fade the right edge while part of the diagram is still off to the side
 useEffect(()=>{const el=body.current;if(!el)return;const check=()=>setMore(el.scrollLeft+el.clientWidth<el.scrollWidth-4);check();const img=el.querySelector('img');el.addEventListener('scroll',check,{passive:true});img?.addEventListener('load',check);const ro=new ResizeObserver(check);ro.observe(el);return ()=>{el.removeEventListener('scroll',check);img?.removeEventListener('load',check);ro.disconnect();};},[fit]);
 return <figure className="dr-diagram">
  <div className="dr-diagram-bar"><div><span className="mono">ARCHITECTURE DIAGRAM · DRAW.IO</span><strong>{title}</strong></div>
   <div className="dr-diagram-actions"><button className="small-button" onClick={()=>setFit(!fit)} aria-pressed={fit}>{fit?<><Maximize2 size={14}/>Actual size</>:<><Minimize2 size={14}/>Fit to width</>}</button><a className="text-link" href={src} target="_blank" rel="noreferrer">Open full size <ArrowUpRight size={15}/></a>{drawio&&<a className="text-link" href={drawio} download>Source (.drawio) <Download size={15}/></a>}{guide&&<a className="text-link" href={url(guide)}>Read architecture guide <Download size={15}/></a>}</div></div>
  <div ref={body} className="dr-diagram-body" data-more={more?'':undefined} tabIndex={0} role="region" aria-label={title+'. Scroll sideways to see all of it.'}><img src={src} alt={alt} width={width} height={height} loading="lazy" style={{minWidth:fit?0:width}}/></div>
  {caption&&<figcaption>{caption}</figcaption>}
  {notes&&<DiagramNotes notes={notes}/>}
 </figure>;
}

/** The reading notes under an architecture diagram: what each zone is and why it exists, what the
 *  numbered markers mean, then the primary documents and background reading. Data: diagram-notes.ts. */
export function DiagramNotes({notes}:{notes:DiagramNotesData}){
 const refs=(items:DiagramRef[],external:boolean)=><ul className="dr-dnotes-list">{items.map(r=><li key={r.href}><a href={r.href} {...(external?{target:'_blank',rel:'noreferrer'}:{})}><strong>{r.title}{external&&<ArrowUpRight size={14} aria-hidden="true"/>}</strong><span>{r.note}</span>{r.meta&&<small className="mono">{r.meta}</small>}</a></li>)}</ul>;
 return <div className="dr-dnotes">
  <section aria-label="How to read this diagram">
   <p className="dr-kicker">HOW TO READ THIS DIAGRAM</p>
   <dl className="dr-dnotes-zones">{notes.zones.map(z=><div key={z.name}><dt>{z.name}</dt><dd><p>{z.what}</p>{z.why&&<p className="dr-dnotes-why"><b>Why</b> {z.why}</p>}<a className="dr-dnotes-cite" href={readHref(notes.guide,z.section)}>Guide: {z.section.replace(/^Component: /,'')}</a></dd></div>)}</dl>
   <p className="dr-kicker dr-dnotes-gap">THE NUMBERED MARKERS</p>
   <ol className="dr-dnotes-marks">{notes.markers.map(m=><li key={m.mark}><b aria-hidden="true">{m.mark}</b><span><span className="sr-only">Marker {m.mark}: </span>{m.text}</span></li>)}</ol>
  </section>
  <section aria-label="Sources and further reading" className="dr-dnotes-refs">
   <p className="dr-kicker">PRIMARY SOURCES</p>
   {refs(notes.primary,false)}
   <p className="dr-kicker dr-dnotes-gap">BACKGROUND READING</p>
   {refs(notes.background,true)}
   <p className="disclaimer">Background reading explains the general technique each block uses. None of it describes DG32 or implies its certification.</p>
  </section>
 </div>;
}
