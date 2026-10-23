import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
export async function serveStatic() {
 const root = resolve('out'); const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
 const mime: Record<string,string> = { '.html':'text/html', '.js':'application/javascript', '.css':'text/css', '.svg':'image/svg+xml', '.png':'image/png', '.jpg':'image/jpeg', '.jpeg':'image/jpeg', '.woff2':'font/woff2', '.pdf':'application/pdf', '.xml':'application/xml' };
 const server = createServer(async (req,res) => { try { let pathname=decodeURIComponent(new URL(req.url || '/', 'http://localhost').pathname); if(base) { if(!pathname.startsWith(base+'/')) {res.writeHead(404).end();return;} pathname=pathname.slice(base.length); } let file=resolve(root,'.'+pathname); if(file!==root && !file.startsWith(root+sep)) {res.writeHead(403).end();return;} if((await stat(file)).isDirectory()) file=resolve(file,'index.html'); const body=await readFile(file);res.writeHead(200,{'Content-Type':mime[extname(file)]||'application/octet-stream'}).end(body); } catch {res.writeHead(404).end('Not found');} });
 await new Promise<void>(r=>server.listen(0,'127.0.0.1',r)); const address=server.address(); if(!address || typeof address==='string') throw Error('No local port');
 return {server, origin:`http://127.0.0.1:${address.port}`, url:`http://127.0.0.1:${address.port}${base}`};
}
