import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {resolve,sep} from 'node:path';
import {createChatHandler} from './chat.mjs';
const root=resolve(fileURLToPath(new URL('../dist/',import.meta.url)));
const profile=JSON.parse(await readFile(resolve(root,'profile.json'),'utf8'));
const chat=createChatHandler(profile);
const types={html:'text/html; charset=utf-8',css:'text/css',js:'text/javascript',mjs:'text/javascript',json:'application/json',pdf:'application/pdf'};
const port=Number(process.env.PORT||4174);
createServer(async(req,res)=>{
 try{
  const url=new URL(req.url,`http://${req.headers.host}`);
  if(url.pathname==='/api/chat'){
   let chunks=[],length=0;for await(const chunk of req){length+=chunk.length;if(length>12000){res.writeHead(413);res.end();return;}chunks.push(chunk);}
   const request=new Request(url,{method:req.method,headers:req.headers,...(!['GET','HEAD'].includes(req.method)?{body:Buffer.concat(chunks)}:{})});
   // Never trust a visitor-supplied IP header in local preview.
   request.headers.set('cf-connecting-ip',req.socket.remoteAddress||'local');
   const result=await chat(request,process.env);res.writeHead(result.status,Object.fromEntries(result.headers));res.end(Buffer.from(await result.arrayBuffer()));return;
  }
  if(!['GET','HEAD'].includes(req.method)){res.writeHead(405);res.end();return;}
  const path=resolve(root,'.'+decodeURIComponent(url.pathname==='/'?'/index.html':url.pathname));
  if(!path.startsWith(root+sep)||path.includes(sep+'server'+sep)){res.writeHead(404);res.end();return;}
  const content=await readFile(path);res.writeHead(200,{'Content-Type':types[path.split('.').pop()]||'application/octet-stream','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});res.end(req.method==='HEAD'?undefined:content);
 }catch{res.writeHead(404);res.end('Not found');}
}).listen(port,'127.0.0.1',()=>console.log(`Portfolio: http://localhost:${port} · Hosted AI ${process.env.GROQ_API_KEY?'configured':'awaiting API key'}`));
