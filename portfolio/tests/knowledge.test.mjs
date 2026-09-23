import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {answerFromProfile} from '../dist/knowledge.mjs';
const profile=JSON.parse(await readFile(new URL('../dist/profile.json',import.meta.url)));
test('internship uses the corrected owner-supplied impact',()=>{
 const answer=answerFromProfile(profile,'Tell me about his internship');
 assert.match(answer,/two weeks to one week/);
 assert.doesNotMatch(answer,/four weeks|Asha|3,000/);
});
test('a metro booking question does not dump all achievements',()=>{
 const answer=answerFromProfile(profile,'What did he do for Google Maps metro booking?');
 assert.match(answer,/from scratch/);assert.doesNotMatch(answer,/parcel|onboarding|5,000/);
});
test('default journey stays within the supplied career chapters',()=>{
 const answer=answerFromProfile(profile,'Tell me his journey');
 assert.match(answer,/March 2022/);assert.match(answer,/Namma Yatri/);assert.doesNotMatch(answer,/Asha|CGPA|₹/);
});
