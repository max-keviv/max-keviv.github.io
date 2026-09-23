import {readFile,writeFile,mkdir} from 'node:fs/promises';
const names=['index.html','style.css','app.js','knowledge.mjs','persona.mjs','profile.json','Vivek_Vishal_Resume.pdf'];
const types={html:'text/html; charset=utf-8',css:'text/css',js:'text/javascript',mjs:'text/javascript',json:'application/json',pdf:'application/pdf'};
const assets={};for(const name of names)assets['/'+name]={type:types[name.split('.').pop()],data:(await readFile('dist/'+name)).toString('base64')};
const profile=JSON.parse(await readFile('dist/profile.json','utf8'));
const chatSource=(await readFile('server/chat.mjs','utf8')).replaceAll('export ','');
const worker=`${chatSource}\nconst assets=${JSON.stringify(assets)};\nconst chat=createChatHandler(${JSON.stringify(profile)});\nexport default {async fetch(request,env){const url=new URL(request.url);if(url.pathname==='/api/chat')return chat(request,env);if(!['GET','HEAD'].includes(request.method))return new Response('Method not allowed',{status:405});const asset=assets[url.pathname==='/'?'/index.html':url.pathname];if(!asset)return new Response('Not found',{status:404});const bytes=Uint8Array.from(atob(asset.data),c=>c.charCodeAt(0));return new Response(request.method==='HEAD'?null:bytes,{headers:{'Content-Type':asset.type,'Cache-Control':'no-cache','X-Content-Type-Options':'nosniff','Referrer-Policy':'strict-origin-when-cross-origin'}});}};\n`;
await mkdir('dist/server',{recursive:true});await writeFile('dist/server/index.js',worker);console.log('Built standalone Worker with explicit public assets; no secrets bundled.');
