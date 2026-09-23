export const greeting = "Hey, I’m Cortana. Nice to meet you! Want to hear what Vivek’s been building, or how he got here?";
export function socialReply(question) {
  const q = question.toLowerCase().trim();
  if (/^(hi|hello|hey|hi cortana|hello cortana|hey cortana)[!.\s]*$/.test(q) || /who are you|your name|introduce yourself|what are you/.test(q)) return greeting;
  if (/^(thanks|thank you|thank you cortana|thanks cortana)[!.\s]*$/.test(q)) return 'You’re welcome! Happy to help.';
  if (/how are you|how's it going/.test(q)) return 'I’m here and ready to chat! What brings you to Vivek’s corner of the internet?';
  if (/are you (the real|microsoft)|are you from microsoft/.test(q)) return 'I’m Cortana, Vivek’s custom AI companion here—not Microsoft’s assistant. Same name, a different mission: helping you get to know Vivek.';
  return null;
}
export function withPersonality(answer, topic) {
  const leads={journey:'Let’s rewind a little.',experience:'Here’s where Vivek has been putting his ideas to work.',achievements:'Let’s talk impact. These are a few highlights from his résumé.',skills:'His toolkit has range. Here’s the breakdown.',projects:'A couple of projects worth a closer look.',education:'Here’s where the foundations were laid.'};
  return leads[topic] ? `${leads[topic]}\n\n${answer}` : answer;
}
// SpeechSynthesis does not expose gender; prefer known feminine English voices.
export function preferredVoice(voices) {
  const names=['Samantha','Ava','Aria','Jenny','Zira','Victoria','Karen','Moira','Tessa','Veena','Serena','Susan','Google UK English Female'];
  for(const name of names){const voice=voices.find(v=>/^en(?:-|_)/i.test(v.lang)&&v.name.toLowerCase().includes(name.toLowerCase()));if(voice)return voice;}
  return voices.find(v=>/^en(?:-|_)/i.test(v.lang)&&v.default)||voices.find(v=>/^en(?:-|_)/i.test(v.lang))||null;
}
