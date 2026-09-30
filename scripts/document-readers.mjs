import fs from 'node:fs';
import path from 'node:path';
import {Marked} from 'marked';

const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const slug=s=>s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');

export function generateReaders(output,base){
 const docs=[];
 const walk=dir=>{for(const e of fs.readdirSync(dir,{withFileTypes:true})){const f=path.join(dir,e.name);if(e.isDirectory())walk(f);else if(e.name.endsWith('.md'))docs.push(f);}};
 walk(path.join(output,'downloads'));
 for(const file of docs){
  const text=fs.readFileSync(file,'utf8');
  const headings=[],ids=new Map();
  const md=new Marked({gfm:true});
  md.use({renderer:{
   html:({text})=>escape(text),
   heading({tokens,depth}){const label=tokens.map(t=>t.text||t.raw||'').join('').replace(/[*`]/g,'');const key=slug(label)||'section';const count=ids.get(key)||0;ids.set(key,count+1);const id=key+(count?'-'+count:'');if(depth===2)headings.push({id,label});return `<h${depth} id="${id}">${this.parser.parseInline(tokens)}</h${depth}>`;},
   link({href,title,tokens}){if(!href||/^(javascript|data|vbscript):/i.test(href))href='#';if(href.endsWith('.md'))href=href.replace(/\.md$/,'.html');return `<a href="${escape(href)}"${title?' title="'+escape(title)+'"':''}>${this.parser.parseInline(tokens)}</a>`;}
  }});
  const body=md.parse(text);
  const title=(text.match(/^#\s+(.+)$/m)?.[1]||path.basename(file,'.md')).replace(/[*`]/g,'');
  const raw=base+path.relative(output,file).replaceAll('\\','/');
  const css=`:root{color-scheme:dark;--ink:#eeeae2;--muted:#b9c2ba;--copper:#dbad7c;--line:#424b43}*{box-sizing:border-box}html{scroll-padding-top:6rem}body{margin:0;background:#101512;color:var(--ink);font:17px/1.8 Georgia,serif}a{color:var(--copper);text-underline-offset:4px}a:focus-visible,summary:focus-visible{outline:2px solid var(--copper);outline-offset:5px}.reader-nav{position:sticky;top:0;z-index:2;display:flex;justify-content:space-between;gap:1rem;align-items:center;background:#101512;border-bottom:1px solid var(--line);padding:1rem 4%;font:14px/1.5 system-ui,sans-serif}.reader-nav a{padding:.5rem 0}.reader-layout{max-width:1400px;margin:auto;padding:4rem 4%;display:grid;grid-template-columns:250px minmax(0,1fr);gap:4rem}aside{position:sticky;top:6rem;align-self:start;font:14px/1.6 system-ui,sans-serif}aside h2{font-size:16px}aside a{display:block;padding:.5rem 0;color:var(--muted);text-decoration:none}article{min-width:0;max-width:850px;overflow-wrap:anywhere}aside{min-width:0;overflow-wrap:anywhere}h1,h2,h3,h4{font-family:system-ui,sans-serif;line-height:1.2;letter-spacing:-.025em;text-wrap:balance}h1{font-size:clamp(2rem,4vw,3.5rem);margin:0 0 2rem}h2{font-size:1.7rem;border-top:1px solid var(--line);margin:3.5rem 0 1rem;padding-top:1.5rem}h3{font-size:1.25rem;margin:2rem 0 .75rem}p,li{max-width:72ch}li{margin:.35rem 0}p{margin:.8rem 0 1.3rem}strong{color:#fff4e5}code{font:14px/1.6 monospace;background:#232b25;padding:.2rem .4rem}pre{overflow:auto;max-width:100%;padding:1.25rem;background:#202922;white-space:pre}pre code{padding:0;background:none}blockquote{margin:1.5rem 0;padding:1rem 1.5rem;background:#202922}table{border-collapse:collapse;min-width:650px;font:14px/1.7 system-ui,sans-serif;text-align:left}td,th{padding:1rem;border-bottom:1px solid var(--line);vertical-align:top}th{color:var(--copper);background:#202922}.reader-table{overflow:auto;margin:2rem 0;max-width:100%;border:1px solid var(--line)}.reader-notice{font:14px/1.7 system-ui,sans-serif;color:var(--muted);margin-bottom:2rem;border-bottom:1px solid var(--line);padding-bottom:1.5rem}.reader-notice a{display:inline-block;margin-top:.5rem}img{max-width:100%;height:auto}hr{border:0;border-top:1px solid var(--line);margin:2rem 0}@media(max-width:800px){.reader-layout{grid-template-columns:1fr;gap:2rem;padding:2rem 6%}aside{position:static;border-bottom:1px solid var(--line);padding-bottom:1rem}aside details:not([open]){display:block}.reader-nav{flex-wrap:wrap}body{font-size:16px}}@media(prefers-reduced-motion:no-preference){html{scroll-behavior:smooth}}`;
  const wrapped=body.replace(/<table>/g,'<div class="reader-table" tabindex="0" role="region" aria-label="Scrollable source table"><table>').replace(/<\/table>/g,'</table></div>');
  const html=`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="site-base" content="${base}"><title>${escape(title)} — DeepGrid documents</title><style>${css}</style></head><body><nav class="reader-nav" aria-label="Document navigation"><a href="${base}">DeepGrid Semi</a><a href="${base}resources/docs">Engineering library</a><a href="${raw}" download>Download Markdown source</a></nav><main class="reader-layout"><aside><details open><summary>In this document</summary>${headings.map(h=>`<a href="#${h.id}">${escape(h.label)}</a>`).join('')}</details></aside><article><div class="reader-notice">Source document edition. Architecture targets, proposals and dated statements are preserved from the original; they do not establish measured silicon, qualification or certification.<br><a href="${base}evidence">Review current evidence and publication boundaries →</a></div>${wrapped}</article></main></body></html>`;
  fs.writeFileSync(file.replace(/\.md$/,'.html'),html);
 }
 console.log(`Generated ${docs.length} styled document reading editions.`);
}
