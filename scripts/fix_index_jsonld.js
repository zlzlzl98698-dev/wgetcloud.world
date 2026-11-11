const fs = require('fs');
let content = fs.readFileSync('docs/index.md', 'utf8');

const scriptTag = '<script type="application/ld+json">';
const scriptStart = content.indexOf(scriptTag);
if (scriptStart !== -1) {
  content = content.slice(0, scriptStart).trim();
  fs.writeFileSync('docs/index.md', content, 'utf8');
  console.log('Removed script tag from markdown body');
}
