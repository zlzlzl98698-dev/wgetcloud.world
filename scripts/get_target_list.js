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
    } else if (file.endsWith('.md') && !file.endsWith('index.md')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk('docs');
const shortFiles = [];
files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const pureChinese = (content.match(/[\u4e00-\u9fa5]/g) || []).length;
  if (pureChinese < 1200) {
    shortFiles.push({ file: f, pureChinese });
  }
});

console.log('Total short secondary pages:', shortFiles.length);
shortFiles.forEach((sf, i) => {
  console.log(`${i+1}. [${sf.pureChinese} 字] ${sf.file}`);
});
