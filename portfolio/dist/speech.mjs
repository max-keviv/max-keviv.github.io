// Sentence-sized turns let the voice breathe without adding spoken stage directions.
export function speechSegments(text) {
  const clean = text.replace(/https?:\/\/\S+/g, 'the link on screen').replace(/[*#`]/g, '').replace(/\n+/g, '. ').replace(/\.{2,}/g, '.').trim();
  const sentences = Array.from(new Intl.Segmenter('en', {granularity: 'sentence'}).segment(clean), part => part.segment);
  return sentences.map(sentence => {
    const text = sentence.trim();
    const question = /\?[”"’']?$/.test(text);
    const upbeat = /^(hi\b|hey\b|oh\b|absolutely\b|you’re welcome\b)/i.test(text);
    return {text, rate: question ? 0.98 : upbeat ? 1.02 : 1, pitch: question ? 1.06 : upbeat ? 1.04 : 1, pause: question ? 240 : 170};
  }).filter(part => part.text);
}
export function createSpeaker({synth, makeUtterance, getVoice, schedule = setTimeout, unschedule = clearTimeout}) {
  let generation = 0, timer = null, active = null;
  function cancel() {
    generation++;
    if (timer !== null) unschedule(timer);
    timer = null;
    if (active) active.onend = active.onerror = null;
    active = null;
    synth.cancel();
  }
  function speak(text, {onDone, onError}) {
    cancel();
    const token = generation, parts = speechSegments(text), voice = getVoice();
    function next(index) {
      if (token !== generation) return;
      timer = null;
      if (index >= parts.length) { active = null; onDone(); return; }
      const part = parts[index], utterance = makeUtterance(part.text);
      active = utterance;
      if (voice) utterance.voice = voice;
      utterance.lang = voice?.lang || 'en-US';
      utterance.rate = part.rate; utterance.pitch = part.pitch;
      utterance.onend = () => {
        if (token !== generation) return;
        active = null;
        if (index === parts.length - 1) next(index + 1);
        else timer = schedule(() => next(index + 1), part.pause);
      };
      utterance.onerror = () => { if (token === generation) { cancel(); onError(); } };
      synth.speak(utterance);
    }
    next(0);
  }
  return {speak, cancel};
}
