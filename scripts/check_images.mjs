import fs from 'fs';

const content = fs.readFileSync('../newsroom sample.html', 'utf8');

const imgMatches = [...content.matchAll(/<img[^>]+src=["']([^"']+)["']/gi)].map(m => m[1]);
console.log('Unique images in sample:', [...new Set(imgMatches)]);

const bgMatches = [...content.matchAll(/background(?:-image)?:\s*url\(([^)]+)\)/gi)].map(m => m[1]);
console.log('Background images in sample:', [...new Set(bgMatches)]);
