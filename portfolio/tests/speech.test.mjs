import test from 'node:test';
import assert from 'node:assert/strict';
import {createSpeaker, speechSegments} from '../dist/speech.mjs';
function harness() {
  const utterances = [], pending = new Map(); let id = 0, done = 0;
  const speaker = createSpeaker({synth:{cancel(){},speak(u){utterances.push(u);}}, makeUtterance:text=>({text}), getVoice:()=>({lang:'en-US'}), schedule:fn=>{pending.set(++id,fn);return id;}, unschedule:id=>pending.delete(id)});
  return {speaker, utterances, pending, finish:()=>done++, get done(){return done;}};
}
test('cancel during a pause prevents the next sentence', () => {
  const h=harness();h.speaker.speak('Hello! How are you?',{onDone:h.finish,onError:assert.fail});
  h.utterances[0].onend();assert.equal(h.pending.size,1);
  h.speaker.cancel();assert.equal(h.pending.size,0);assert.equal(h.done,0);
});
test('late events from replaced speech cannot finish the new reply', () => {
  const h=harness();h.speaker.speak('First reply.',{onDone:h.finish,onError:assert.fail});
  const stale=h.utterances[0].onend;
  h.speaker.speak('New reply.',{onDone:h.finish,onError:assert.fail});stale();assert.equal(h.done,0);
  h.utterances[1].onend();assert.equal(h.done,1);
});
test('decimal metrics stay intact and sentences play in sequence', () => {
  assert.equal(speechSegments('His CGPA was 8.2. Want more?')[0].text,'His CGPA was 8.2.');
  const h=harness();h.speaker.speak('Hey! Want more?',{onDone:h.finish,onError:assert.fail});
  assert.equal(h.utterances.length,1);h.utterances[0].onend();
  [...h.pending.values()][0]();assert.equal(h.utterances[1].text,'Want more?');
  h.utterances[1].onend();assert.equal(h.done,1);
});
