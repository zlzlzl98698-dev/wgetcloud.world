const fs = require('fs');
const content = fs.readFileSync('docs/index.md', 'utf8');
const lines = content.split('\n');
console.log('Total lines:', lines.length);
lines.forEach((l, i) => {
  if (l.startsWith('#')) {
    console.log(`Line ${i + 1}: ${l}`);
  }
});
