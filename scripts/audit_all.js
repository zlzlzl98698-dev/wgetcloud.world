const fs = require('fs');
const path = require('path');

function getMdFiles(dir) {
  let results = [];
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      if (file !== '.vitepress' && file !== 'node_modules' && file !== 'dist') {
        results = results.concat(getMdFiles(fullPath));
      }
    } else if (file.endsWith('.md')) {
      results.push(fullPath);
    }
  });
  return results;
}

const files = getMdFiles('docs');
const stats = files.map(f => {
  const content = fs.readFileSync(f, 'utf8');
  const cnChars = (content.match(/[\u4e00-\u9fa5]/g) || []).length;
  const lines = content.split('\n').length;
  const h2Count = (content.match(/^## /gm) || []).length;
  return { file: f.replace(/\\/g, '/'), cnChars, lines, h2Count, total: content.length };
});

stats.sort((a,b) => a.cnChars - b.cnChars);

console.log('Total markdown files in docs:', stats.length);
console.log('\n=== Files with < 1000 Chinese characters ===');
const under1000 = stats.filter(s => s.cnChars < 1000);
console.log('Count:', under1000.length);
under1000.forEach(s => {
  console.log(s.file + ' -> ' + s.cnChars + ' CN chars | ' + s.lines + ' lines | ' + s.h2Count + ' H2s');
});
