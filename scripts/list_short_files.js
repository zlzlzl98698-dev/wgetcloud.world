const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  fs.readdirSync(dir).forEach(file => {
    file = path.join(dir, file);
    if (fs.statSync(file).isDirectory()) {
      if (!file.includes('.vitepress') && !file.includes('public')) {
        results = results.concat(walk(file));
      }
    } else if (file.endsWith('.md')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk('docs');
const stats = files.map(f => {
  const content = fs.readFileSync(f, 'utf8');
  const pureChinese = (content.match(/[\u4e00-\u9fa5]/g) || []).length;
  return { file: f, pureChinese, length: content.length };
}).sort((a, b) => a.pureChinese - b.pureChinese);

stats.slice(0, 45).forEach(s => console.log(`${s.pureChinese}\t${s.file}`));
