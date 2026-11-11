const fs = require('fs');
const path = require('path');

function getMd(d) {
  let r = [];
  fs.readdirSync(d).forEach(f => {
    const p = path.join(d, f);
    if (fs.statSync(p).isDirectory()) {
      if (f !== '.vitepress' && f !== 'node_modules' && f !== 'dist') r = r.concat(getMd(p));
    } else if (f.endsWith('.md')) r.push(p);
  });
  return r;
}

const files = getMd('docs');
files.forEach(file => {
  let c = fs.readFileSync(file, 'utf8');
  let changed = false;
  // Match markdown links [text](https://...aff...) or [text](https://...code=...)
  const regex = /\[([^\]]+)\]\((https?:\/\/[^\)]+(?:aff|code=|invite|gscloud)[^\)]*)\)/gi;
  c = c.replace(regex, (match, text, url) => {
    changed = true;
    return `<a href="${url}" target="_blank" rel="nofollow sponsored noopener">${text}</a>`;
  });
  if (changed) {
    fs.writeFileSync(file, c, 'utf8');
    console.log('Fixed markdown aff links in:', file);
  }
});
console.log('All markdown aff links processed!');
