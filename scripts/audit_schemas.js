const fs = require('fs');
const path = require('path');

function getHtml(dir) {
  let r = [];
  fs.readdirSync(dir).forEach(f => {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) r = r.concat(getHtml(p));
    else if (f.endsWith('.html')) r.push(p);
  });
  return r;
}

const sample = [
  'index.html',
  'brands/lightspeed-cloud.html',
  'faq/index.html',
  'recommend/index.html',
  'clients/shadowrocket-ios-setup.html',
  'brands/index.html',
  'free-nodes/index.html',
  'runaway/index.html'
];

sample.forEach(sf => {
  const p = path.join('docs/.vitepress/dist', sf);
  if (fs.existsSync(p)) {
    const html = fs.readFileSync(p, 'utf8');
    const scripts = html.match(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi) || [];
    console.log(`=== ${sf} (${scripts.length} schemas) ===`);
    scripts.forEach((s, idx) => {
      const json = s.replace(/<script[^>]*>|<\/script>/gi, '').trim();
      try {
        const obj = JSON.parse(json);
        if (obj['@graph']) {
          console.log(`  [${idx}] @graph: ` + obj['@graph'].map(x => x['@type']).join(', '));
        } else {
          console.log(`  [${idx}] @type: ${obj['@type']}`);
        }
      } catch (e) {
        console.log(`  [${idx}] JSON Parse Error: ${e.message}`);
      }
    });
  }
});
