const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      if (!file.includes('.vitepress') && !file.includes('public')) {
        results = results.concat(walk(file));
      }
    } else if (file.endsWith('.md') && !file.endsWith('index.md')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk('docs');
console.log('Total non-index md files:', files.length);

const shortFiles = [];
files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const pureChinese = (content.match(/[\u4e00-\u9fa5]/g) || []).length;
  if (pureChinese < 1000) {
    shortFiles.push({ file: f, pureChinese, length: content.length });
  }
});

console.log('Files with less than 1000 Chinese characters:', shortFiles.length);
shortFiles.slice(0, 30).forEach(sf => {
  console.log(`${sf.pureChinese} chars | ${sf.file}`);
});
