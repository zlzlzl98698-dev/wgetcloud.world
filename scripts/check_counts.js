const fs = require('fs');
const path = require('path');

function getMdFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
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
  return { file: f.replace(/\\/g, '/'), cnChars, totalChars: content.length };
});

stats.sort((a,b) => a.cnChars - b.cnChars);

console.log('Shortest 25 files:');
stats.slice(0, 30).forEach(s => {
  console.log(s.file + ': ' + s.cnChars + ' CN chars (' + s.totalChars + ' total)');
});

console.log('\nFAQ index status:');
const faqStat = stats.find(s => s.file === 'docs/faq/index.md');
if (faqStat) console.log(faqStat.file + ': ' + faqStat.cnChars + ' CN chars (' + faqStat.totalChars + ' total)');
