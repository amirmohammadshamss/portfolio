import assert from 'node:assert/strict';
import { mkdir, readFile } from 'node:fs/promises';
import { chromium } from 'playwright';
import { PDFDocument } from 'pdf-lib';
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';
import { serveStatic } from './static-server';
import { referenceIntroduction } from '../src/data/reference-content';
import { visibleProjects, pdfProjects } from '../src/data/projects';
const {server,url,origin}=await serveStatic();const browser=await chromium.launch();
try {
 await mkdir('artifacts',{recursive:true});const page=await browser.newPage();
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 page.on('response',r=>{if(r.status()>=400)errors.push(`${r.status()}: ${r.url()}`)});
 for(const route of ['/',...visibleProjects.map(p=>`/projects/${p.slug}/`),'/portfolio/print/']){
  const response=await page.goto(url+route,{waitUntil:'networkidle'});assert.equal(response?.status(),200,route);
  await page.evaluate(async()=>{await document.fonts.ready;document.querySelectorAll('img').forEach(i=>i.loading='eager');await Promise.all([...document.images].map(img=>img.decode()));});
  assert.equal(await page.locator('h1').count() + await page.locator('.pdf-page').count()>0,true);
  const links=await page.locator('a[href]').evaluateAll(elements=>elements.map(e=>(e as HTMLAnchorElement).href));
  for(const link of new Set(links.filter(l=>l.startsWith(origin)))) {const response=await page.request.get(link);assert.equal(response.status(),200,link);}
  if(route.startsWith('/projects/')){await page.getByRole('button',{name:/View full resolution/}).first().click();await page.locator('dialog').waitFor({state:'visible'});await page.keyboard.press('Escape');assert.equal(await page.locator('dialog').isVisible(),false);}
 }
 for(const width of [390,768,1440]){
  await page.setViewportSize({width,height:1000});await page.goto(url+'/',{waitUntil:'networkidle'});
  await page.evaluate(async()=>{await document.fonts.ready;document.querySelectorAll('img').forEach(img=>img.loading='eager');await Promise.all([...document.images].map(img=>img.decode()));});
  const dimensions=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth, viewport:window.innerWidth, offenders:[...document.querySelectorAll('body *')].map(e=>({c:e.className,r:e.getBoundingClientRect().right})).filter(e=>e.r>window.innerWidth+1)}));
  await page.screenshot({path:`artifacts/home-${width}.png`,fullPage:true});
  assert.ok(dimensions.scroll<=dimensions.viewport+1,`Horizontal overflow at ${width}: ${JSON.stringify(dimensions)}`);
 }
 const download=await page.locator('a[download]').first().getAttribute('href');assert.ok(download?.endsWith('/portfolio.pdf'));
 const bytes=await readFile('out/portfolio.pdf');const pdf=await PDFDocument.load(bytes);assert.equal(pdf.getPageCount(),3+pdfProjects.reduce((n,p)=>n+(p.pdfLayout==='extended'?2:1)+(p.screenshotText?.length?1:0),0));
 for(const p of pdf.getPages()){assert.ok(Math.abs(p.getWidth()-1080)<1);assert.ok(Math.abs(p.getHeight()-607.5)<1);}
 const textPdf=await getDocument({data:new Uint8Array(bytes),useSystemFonts:true}).promise;
 const texts:string[]=[];for(let i=1;i<=textPdf.numPages;i++){const p=await textPdf.getPage(i);const content=await p.getTextContent();const text=content.items.map(item=>'str' in item ? item.str:'').join(' ');assert.ok(text.length>50,`Blank PDF page ${i}`);texts.push(text);}
 assert.ok(texts.join(' ').includes('Amir Mohammad Shams'));for(const project of pdfProjects)assert.ok(texts.join(' ').includes(project.title));
 const normalize=(value:string)=>value.normalize('NFKC').replace(/\s+/g,' ').trim();
 const pdfText=normalize(texts.join(' '));
 const home=await page.request.get(url+'/');const homeHtml=normalize(await home.text());
 for(const paragraph of [...referenceIntroduction,...pdfProjects.flatMap(p=>p.referenceParagraphs??[])]){assert.ok(pdfText.includes(normalize(paragraph)),`Missing PDF paragraph: ${paragraph}`);}
 for(const project of pdfProjects){for(const text of project.screenshotText??[]){assert.ok(pdfText.includes(normalize(text)),`Missing PDF UI text: ${text}`);}}
 assert.ok(homeHtml.includes('Word Storm'));assert.ok(homeHtml.includes('FinTech product'));
 assert.equal(errors.length,0,errors.join('\n'));console.log(`Verified ${visibleProjects.length} case studies, links, images, gallery keyboard controls, three viewport widths, download link, and ${pdf.getPageCount()} searchable PDF pages.`);
}finally{await browser.close();server.close();}
