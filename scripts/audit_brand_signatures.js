const fs = require('fs');
const path = require('path');
const brandDir = 'docs/brands';
const files = fs.readdirSync(brandDir).filter(f => f.endsWith('.md') && f !== 'index.md');
console.log('Brand markdown files:', files.length);

const h2Signatures = new Map();
files.forEach(f => {
  const c = fs.readFileSync(path.join(brandDir, f), 'utf8');
  const h2s = (c.match(/^## (.*)/gm) || []).map(h => h.replace(/^## /, '').trim());
  const sig = h2s.join(' || ');
  if (!h2Signatures.has(sig)) h2Signatures.set(sig, []);
  h2Signatures.get(sig).push(f);
});

console.log('Unique H2 structure signatures across 42 brand pages:', h2Signatures.size);
h2Signatures.forEach((flist, sig) => {
  console.log(`Signature (${flist.length} files): ${sig}`);
  if (flist.length > 5) {
    console.log('  Sample files:', flist.slice(0, 4));
  }
});
