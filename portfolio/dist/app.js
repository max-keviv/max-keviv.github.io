import { createSpeaker } from './speech.mjs';
import { greeting, socialReply, withPersonality, preferredVoice } from './persona.mjs';
import { answerFromProfile, selectTopic } from './knowledge.mjs';
const $ = s => document.querySelector(s);
let profile = null, busy = false, voiceOn = false, soundOn = false, recognition = null, listening = false, speaking = false, generation = 0;
const history = [];
let chatAbort = null;
const speaker = window.speechSynthesis ? createSpeaker({synth: window.speechSynthesis, makeUtterance: text => new SpeechSynthesisUtterance(text), getVoice: () => preferredVoice(window.speechSynthesis.getVoices()) || automaticVoice}) : null;
function cancelSpeech() { speaker?.cancel(); }
let automaticVoice = null;
function refreshVoices() { automaticVoice = preferredVoice(window.speechSynthesis?.getVoices() || []); }
refreshVoices();
window.speechSynthesis?.addEventListener('voiceschanged', refreshVoices);
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const status = text => $('#status').textContent = text;
const info = $('#info');
$('#about').onclick = $('#settings').onclick = () => info.showModal();
$('#close-info').onclick = () => info.close();
fetch('./profile.json').then(r => { if (!r.ok) throw Error(); return r.json(); }).then(p => profile = p).catch(() => status('Profile unavailable. Please try again later.'));
function addMessage(role, text) {
  $('#conversation').hidden = false;
  document.body.classList.add('has-chat'); $('#new-chat').hidden = false;
  const el = document.createElement('div'); el.className = `message ${role}`;
  const label = document.createElement('strong'); label.textContent = role === 'user' ? 'You' : 'Cortana';
  el.append(label, document.createTextNode(text)); $('#conversation').append(el);
  $('#conversation').scrollTop = $('#conversation').scrollHeight;
  return el;
}
function safeUrl(url) { try { const u = new URL(url, location.href); return ['https:', 'http:'].includes(u.protocol) ? u.href : null; } catch { return null; } }
function fallback(question) { return answerFromProfile(profile, question); }
function listen() {
  if (!voiceOn || busy || speaking || listening || !SpeechRecognition) return;
  recognition = new SpeechRecognition(); recognition.lang = 'en-US'; recognition.interimResults = false; recognition.continuous = false;
  recognition.onstart = () => { listening = true; document.body.classList.add('listening'); status('Listening… take your time'); };
  recognition.onresult = e => { const text = e.results[0][0].transcript; recognition.onend = null; recognition.stop(); listening = false; document.body.classList.remove('listening'); ask(text); };
  recognition.onerror = e => { if (e.error === 'aborted') return; stopVoice(); status(e.error === 'not-allowed' ? 'Microphone permission denied. You can still type below.' : 'Voice input paused. Try again or type your question.'); };
  recognition.onend = () => { listening = false; document.body.classList.remove('listening'); if (voiceOn && !busy && !speaking) { stopVoice(); status('Microphone paused. Tap Let’s talk to continue.'); } };
  try { recognition.start(); } catch { stopVoice(); status('Voice input unavailable. Please type instead.'); }
}
function stopVoice() { voiceOn = false; listening = false; speaking = false; if (recognition) { recognition.onend = null; recognition.abort(); } cancelSpeech(); document.body.classList.remove('listening','speaking'); $('#voice span').textContent = 'Let’s talk'; $('#voice').setAttribute('aria-label','Start voice conversation'); }
function speak(text) {
  if (!soundOn || !window.speechSynthesis) { if (voiceOn) listen(); return; }
  cancelSpeech(); speaking = true; document.body.classList.add('speaking'); status('Speaking…');
  speaker.speak(text, {
    onDone: () => { speaking = false; document.body.classList.remove('speaking'); status('What else would you like to know?'); if (voiceOn) listen(); },
    onError: () => { stopVoice(); status('Spoken replies are unavailable. Your answer is above.'); }
  });
}
async function ask(raw) {
  const question = String(raw).trim().slice(0,1200); if (!question || busy) return;
  if (recognition) { recognition.onend = null; recognition.abort(); } listening = false; speaking = false; cancelSpeech(); document.body.classList.remove('listening','speaking');
  busy = true; const token = ++generation; $('#question').value = ''; addMessage('user',question); syncComposer(); status('Thinking…');
  const social = socialReply(question);
  let answer = social || fallback(question), hosted = false;
  if (!social && !['resume','contact'].includes(selectTopic(question))) {
    const controller = new AbortController(); chatAbort = controller;
    const timer = setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch('/api/chat', {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({question,history:history.slice(-6).map(m=>({...m,content:m.content.slice(0,2000)}))}),signal:controller.signal});
      if (response.ok) { const result = await response.json(); if (typeof result.answer === 'string' && result.answer.trim()) {answer = result.answer; hosted = true;} }
    } catch { /* The résumé remains accessible when hosted AI is unavailable. */ }
    finally { clearTimeout(timer); if (chatAbort === controller) chatAbort = null; }
  }
  if (token !== generation) return;
  if (!social && !hosted) answer = withPersonality(answer, selectTopic(question));
  history.push({role:'user',content:question},{role:'assistant',content:answer});
  const el = addMessage('assistant',answer);
  if (/resume|résumé|cv\b/i.test(question) && profile?.resumeUrl && safeUrl(profile.resumeUrl)) { const a = document.createElement('a'); a.href=safeUrl(profile.resumeUrl); a.target='_blank'; a.rel='noopener noreferrer'; a.textContent='Open résumé ↗'; el.append(document.createElement('br'),a); }
  if (!social && (selectTopic(question) === 'contact' || selectTopic(question) === 'unknown')) {
    for (const [label, url] of [['LinkedIn ↗', profile?.contactUrl], ['GitHub ↗', profile?.githubUrl]]) {
      if (!url || !safeUrl(url)) continue;
      const a = document.createElement('a'); a.href = safeUrl(url); a.target = '_blank'; a.rel = 'noopener noreferrer'; a.textContent = label; el.append(document.createElement('br'), a);
    }
  }
  busy = false; syncComposer(); status(!social && !hosted && !['resume','contact'].includes(selectTopic(question)) ? 'Cortana · Answering from Vivek’s shared story' : 'Cortana · What shall we explore next?'); speak(answer); return answer;
}
function syncComposer() { $('.send').disabled = busy || !$('#question').value.trim(); $('#question').setAttribute('aria-busy', String(busy)); }
$('#question').addEventListener('input', syncComposer);
$('#question').addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) { e.preventDefault(); if (!busy) ask($('#question').value); } });
$('#composer').onsubmit = e => { e.preventDefault(); ask($('#question').value); };
document.querySelectorAll('[data-question]').forEach(b => b.onclick = () => ask(b.dataset.question));
$('#sound').onclick = () => { soundOn = !soundOn; $('#sound').setAttribute('aria-label',soundOn ? 'Mute spoken replies' : 'Enable spoken replies'); $('#sound').setAttribute('aria-pressed', String(soundOn)); $('#sound').title = soundOn ? 'Mute spoken replies' : 'Enable spoken replies'; if (!soundOn) { cancelSpeech(); speaking=false; document.body.classList.remove('speaking'); status('Cortana · Spoken replies muted'); if (voiceOn) listen(); } };
$('#voice').onclick = () => {
  if (voiceOn) { stopVoice(); status('Voice ended. You can keep typing.'); return; }
  if (!SpeechRecognition) { status('Voice input isn’t supported in this browser. Please type below.'); $('#question').focus(); return; }
  voiceOn = true; soundOn = true; $('#sound').setAttribute('aria-pressed','true'); $('#sound').setAttribute('aria-label','Mute spoken replies'); $('#voice span').textContent = 'End voice'; $('#voice').setAttribute('aria-label','End voice conversation');
  if (!history.length) addMessage('assistant', greeting);
  speak(history.length ? 'I’m here. What would you like to know?' : greeting);
};
$('#new-chat').onclick = $('#clear').onclick = () => { generation++; chatAbort?.abort(); busy = false; stopVoice(); history.length = 0; $('#conversation').replaceChildren(); $('#conversation').hidden = true; document.body.classList.remove('has-chat'); status('I’m Cortana. Your curiosity starts here.'); $('#new-chat').hidden = true; $('#question').value = ''; syncComposer(); info.close(); $('#question').focus(); };
document.addEventListener('visibilitychange',() => { if (document.hidden) stopVoice(); });
window.addEventListener('pagehide',stopVoice);
try { document.modelContext?.registerTool({name:'ask_about_vivek',description:'Ask Cortana a question about Vivek and display the answer in the conversation.',inputSchema:{type:'object',properties:{question:{type:'string',maxLength:1200}},required:['question'],additionalProperties:false},annotations:{readOnlyHint:false},execute:async input => { if(typeof input?.question !== 'string' || !input.question.trim() || input.question.length>1200) throw Error('A question of 1–1200 characters is required.'); if(busy) throw Error('Wait for the current reply.'); return {answer:await ask(input.question)}; }}); } catch { /* Optional API is not supported in all browsers. */ }
