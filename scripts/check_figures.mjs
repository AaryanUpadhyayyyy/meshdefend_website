import fs from 'fs';

const content = fs.readFileSync('../newsroom sample.html', 'utf8');
const pressChunk = content.slice(content.indexOf('id="pressreleases"'), content.indexOf('id="in-the-news"'));
console.log('Press images/figures count:', [...pressChunk.matchAll(/<figure[\s\S]*?<\/figure>/gi)].length);
for (const m of [...pressChunk.matchAll(/<figure[\s\S]*?<\/figure>/gi)].slice(0, 3)) {
  console.log('Press figure:', m[0]);
}

const newsChunk = content.slice(content.indexOf('id="in-the-news"'), content.indexOf('id="awards"'));
console.log('News images/figures count:', [...newsChunk.matchAll(/<figure[\s\S]*?<\/figure>/gi)].length);
for (const m of [...newsChunk.matchAll(/<figure[\s\S]*?<\/figure>/gi)].slice(0, 3)) {
  console.log('News figure:', m[0]);
}
