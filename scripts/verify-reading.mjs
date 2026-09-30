import {chromium} from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
const site=process.argv[2].replace(/\/?$/,'/');
const browser=await chromium.launch();
const page=await browser.newPage();
const files=[];
function walk(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){const f=path.join(dir,e.name);if(e.isDirectory())walk(f);else if(f.endsWith('.md'))files.push(f);}}
walk('public/downloads');
const failures=[];
for(const width of [1440,390]){
 await page.setViewportSize({width,height:900});
 for(const file of files){
  const target=site+file.replace(/^public[\\/]/,'').replaceAll('\\','/').replace(/\.md$/,'.html');
  const response=await page.goto(target,{waitUntil:'domcontentloaded'});
  if(response.status()!==200||await page.locator('article h1').count()!==1)failures.push(`${width}: missing reader ${target}`);
  if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+2))failures.push(`${width}: overflow ${target}`);
  if(!await page.getByRole('link',{name:'Download Markdown source'}).getAttribute('download').then(x=>x!==null))failures.push(`missing raw download ${target}`);
 }
 for(const route of ['', 'company.html']){
  await page.goto(site+route,{waitUntil:'networkidle'});
  const bad=await page.locator('.v6-bone h2,.v6-bone h3,.v6-bone strong').evaluateAll(nodes=>nodes.filter(el=>{const c=getComputedStyle(el).color.match(/\d+/g);return c&&Number(c[0])>150&&Number(c[1])>150&&Number(c[2])>150}).map(el=>el.textContent));
  if(bad.length)failures.push(`${width} ${route}: pale text on light surface: ${bad.join(', ')}`);
  const rawLinks=await page.locator('a[href*=".md"]:not([download])').count();
  if(rawLinks)failures.push(`${width} ${route}: ${rawLinks} raw-source reading links`);
 }
}
if(process.argv[3]){
 fs.mkdirSync(process.argv[3],{recursive:true});
 for(const width of [1440,390]){
  await page.setViewportSize({width,height:900});
  await page.goto(site,{waitUntil:'networkidle'});
  await page.locator('.v6-bone').first().screenshot({path:path.join(process.argv[3],`${width}-reuse.png`)});
  await page.goto(site+'downloads/deepgrid-sku-compendium-architecture.html',{waitUntil:'domcontentloaded'});
  await page.screenshot({path:path.join(process.argv[3],`${width}-reader.png`)});
 }
}
await browser.close();
if(failures.length)throw Error(failures.join('\n'));
console.log(`Reading gate PASS: ${files.length} document editions at desktop/phone widths; home/company light-surface foregrounds and source-reading links.`);
