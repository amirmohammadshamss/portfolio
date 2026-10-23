import { chromium } from 'playwright';
import { readFile, writeFile } from 'node:fs/promises';
import { PDFDocument } from 'pdf-lib';
import { serveStatic } from './static-server';
import { profile } from '../src/data/profile';
const {server,url}=await serveStatic();
const browser=await chromium.launch();
try {
 const page=await browser.newPage({viewport:{width:1440,height:810},deviceScaleFactor:1});
 await page.goto(url+'/portfolio/print/',{waitUntil:'networkidle'});
 await page.emulateMedia({media:'print'});
 await page.evaluate(async()=>{await document.fonts.ready; await Promise.all(Array.from(document.images).map(async img=>{img.loading='eager';if(!img.complete) await new Promise<void>((resolve,reject)=>{img.onload=()=>resolve();img.onerror=()=>reject(Error(img.src));}); if(!img.naturalWidth) throw Error('Broken image: '+img.src);}));});
 const overflow=await page.locator('.pdf-page').evaluateAll(pages=>pages.map((p,i)=>({page:i+1,overflow:p.scrollHeight>p.clientHeight+2 || p.scrollWidth>p.clientWidth+2})).filter(p=>p.overflow));
 if(overflow.length) throw Error('Print overflow: '+JSON.stringify(overflow));
 await page.pdf({path:'out/portfolio.pdf',width:'1440px',height:'810px',printBackground:true,preferCSSPageSize:true,tagged:true});
 const pdf=await PDFDocument.load(await readFile('out/portfolio.pdf'));
 pdf.setTitle(`${profile.name} — Software Engineering Portfolio`);pdf.setAuthor(profile.name);pdf.setSubject(profile.summary);pdf.setKeywords(['portfolio','software development','mobile','full stack']);pdf.setLanguage('en-US');
 const expected=await page.locator('.pdf-page').count(); if(pdf.getPageCount()!==expected) throw Error(`Expected ${expected} pages; got ${pdf.getPageCount()}`);
 const bytes=await pdf.save();
 await Promise.all([writeFile('out/portfolio.pdf',bytes),writeFile('public/portfolio.pdf',bytes)]);
 console.log(`Generated out/portfolio.pdf and public/portfolio.pdf (${expected} pages)`);
} finally {await browser.close();server.close();}
