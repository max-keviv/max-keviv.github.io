import {spawnSync} from 'node:child_process';
import {existsSync} from 'node:fs';
process.stdin.setEncoding('utf8');if(process.stdin.isTTY)process.stdin.setRawMode(true);
console.log('Ready for source credential JSON on stdin (input hidden).');
const input=await new Promise(resolve=>{let data='';process.stdin.on('data',chunk=>{data+=chunk;if(data.includes('\n'))resolve(data.trim());});});
process.stdin.pause();if(process.stdin.isTTY)process.stdin.setRawMode(false);
const credential=JSON.parse(input);
function git(args,extraEnv={}){const r=spawnSync('/usr/bin/git',args,{encoding:'utf8',env:{...process.env,...extraEnv}});if(r.status!==0)throw Error('Git operation failed: '+args[0]+' '+(r.stderr||'').replaceAll(credential.token,'[redacted]'));return r.stdout.trim();}
if(!existsSync('.git'))git(['init','-b',credential.branch]);
git(['add','.']);
if(git(['status','--porcelain']))git(['-c','user.name=Portfolio Builder','-c','user.email=portfolio@localhost','commit','-m','Implement hosted Cortana portfolio']);
const sha=git(['rev-parse','HEAD']);
const auth={GIT_CONFIG_COUNT:'1',GIT_CONFIG_KEY_0:'http.extraHeader',GIT_CONFIG_VALUE_0:'Authorization: Bearer '+credential.token,GIT_TERMINAL_PROMPT:'0'};
git(['push',credential.remote_url,'HEAD:refs/heads/'+credential.branch],auth);
const remote=git(['ls-remote',credential.remote_url,'refs/heads/'+credential.branch],auth).split(/\s/)[0];
if(remote!==sha)throw Error('Remote SHA mismatch');
console.log(JSON.stringify({commit_sha:sha,pushed:true}));
