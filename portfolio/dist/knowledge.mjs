export const unknown = 'I don’t have that detail in the story Vivek has shared. You can ask about his experience, skills, education, projects, or achievements, or connect with him on LinkedIn.';
export function selectTopic(question) {
  const q = question.toLowerCase();
  if (/resume|résumé|\bcv\b/.test(q)) return 'resume';
  if (/contact|linkedin|github|reach|connect|email|phone/.test(q)) return 'contact';
  if (/available|availability|salary|married|\bage\b|birthday|address|currently|current role|present role|looking for|hiring|notice period/.test(q)) return 'unknown';
  if (/education|studied|study|college|university|degree|cgpa|coursework/.test(q)) return 'education';
  if (/journey|career path|background/.test(q)) return 'journey';
  if (/asha|healthcare|clinic|pipecat|langgraph|cqrs|voice.agent|voice.server|react.loop|react.agent|revenue|observability|logging|alerting|monitoring/.test(q)) return 'experience';
  if (/metro|parcel|delivery|bus|gps|rental|intercity|onboarding|intern|productivity|reliability|protocol|ticket|refund|open.data/.test(q)) return 'experience';
  if (/achiev|award|proud|impact|metric|cost|saved|saving|accuracy|booking/.test(q)) return 'achievements';
  if (/project|surveillance|yolo|deepsort|openstreetmap|open.source/.test(q)) return 'projects';
  if (/skill|stack|language|technolog|framework/.test(q)) return 'skills';
  if (/work|experience|asha|namma|juspay|agent|pipecat|langgraph|clinic|healthcare|payment|mobility|kafka|clickhouse|cqrs/.test(q)) return 'experience';
  if (/^(hi|hello|hey)[!.\s]*$|who|about|introduc|overview/.test(q)) return 'summary';
  return 'unknown';
}
export function answerFromProfile(profile, question) {
  if (!profile) return 'Vivek’s profile is still loading. Please try again in a moment.';
  const topic=selectTopic(question);
  if(topic==='resume')return 'Here’s Vivek’s résumé, with his experience, projects, skills, and education. You can open or save the PDF below.';
  if(topic==='unknown')return unknown;
  if (topic === 'experience') {
    const detail = profile.workDetails?.find(item => item.keywords.some(word => question.toLowerCase().includes(word)));
    if (detail) return detail.answer;
    if (/asha|healthcare|clinic|agent/i.test(question)) return profile.experience[0];
    if (!/juspay/i.test(question)) return 'At Namma Yatri, Vivek worked across ride booking, ticketing, delivery, and bus systems. He also built healthcare AI and clinic automation at Asha Health, after earlier onboarding and reliability work at Juspay. Which part would you like to explore?';
  }
  const values=profile[topic];
  if(typeof values==='string')return values;
  if(!Array.isArray(values)||!values.length)return unknown;
  if(topic==='experience') {
    const company=question.toLowerCase().match(/asha|namma|juspay/);
    if(company) return values.filter(v=>v.toLowerCase().startsWith(company[0])).join('\n\n') || unknown;
    if(/agent|pipecat|langgraph|clinic|healthcare|cqrs/i.test(question))return values[0];
  }
  return values.join('\n\n');
}
// The model may select source passages but may not invent the final wording.
export function validatedSelection(raw, passages) {
  try {const ids=JSON.parse(raw).ids;if(!Array.isArray(ids)||!ids.length||ids.length>3||ids.some(i=>!Number.isInteger(i)||i<0||i>=passages.length))return null;return [...new Set(ids)].map(i=>passages[i]).join('\n\n');}catch{return null;}
}
