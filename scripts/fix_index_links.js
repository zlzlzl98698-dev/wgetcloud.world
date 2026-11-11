const fs = require('fs');
const path = require('path');

// Load brands mapping
const code = fs.readFileSync(path.join(__dirname, 'brands_source.js'), 'utf8');
const brands = eval(code.replace('module.exports =', ''));

let content = fs.readFileSync(path.join(__dirname, '../docs/index.md'), 'utf8');

// Map table links
// The table had rows like: [深度评测](/brands/guangsu)
// Let's replace by brand name in the table
brands.forEach(b => {
  // b.name -> b.slug
  // In table, we had: | **01** | **光速云** | ... | [深度评测](/brands/...) |
  // Let's replace any `/brands/guangsu` -> `/brands/lightspeed-cloud`
});

// Explicit replacements for all links in docs/index.md
const replacements = [
  ['/brands/guangsu', '/brands/lightspeed-cloud'],
  ['/brands/muguang', '/brands/twilight-speed'],
  ['/brands/feimao', '/brands/flycat-cloud'],
  ['/brands/weifeng', '/brands/breeze-net'],
  ['/brands/dalao', '/brands/dalao-cloud'],
  ['/brands/xingdaomeng', '/brands/singdao-dream'],
  ['/brands/ermao', '/brands/two-cats-cloud'],
  ['/brands/wuyou', '/brands/worryfree-link'],
  ['/brands/weitu', '/brands/rabbit-cloud'],
  ['/brands/firefly', '/brands/firefly-accelerator'],
  ['/solutions/cross-border-tiktok-ip-setup', '/solutions/tiktok-crossborder-livestream'],
  ['/reviews/', '/brands/'],
  ['/run-warning/', '/runaway/']
];

replacements.forEach(([from, to]) => {
  content = content.split(from).join(to);
});

// Also replace the rest of the 42 brands in the table:
const nameToSlug = {};
brands.forEach(b => {
  nameToSlug[b.name] = b.slug;
});

// Replace remaining /brands/jike, /brands/suying, etc. with exact slugs
const manualBrandFixes = {
  jike: 'cyberguard-vpn',
  suying: 'sujie-speedworld',
  jifeng: 'shanyue-leap',
  mojie: 'u1s1-cloud',
  paopaogou: 'lingmao-net',
  yiyou: 'yifan-cloud',
  beike: 'kexin-cloud',
  longmao: 'longmao-cloud',
  lanmei: 'sogo-cloud',
  shandianmao: 'shandianshu-mouse',
  yunyi: 'yunjiexian-border',
  juzi: 'liulian-cloud',
  shulan: 'shenxing-speed',
  qingyun: 'qingyunti-ladder',
  feiniao: 'flyingbird-fly',
  fengchao: 'quanqiu-cloud',
  ziyoujing: 'wgetcloud-proxy',
  tanyou: 'yinxingren-invisible',
  maitian: 'baiyueguang-cloud',
  xiongmao: 'fatcat-cloud',
  haiou: 'tntcloud-speed',
  yinghuo: 'yinghuochong-firefly',
  jisumao: 'shanshui-cloud',
  mengzhi: 'lingdong-cloud',
  qicai: 'langwang-net',
  tengfei: 'edgenova-cloud',
  lefei: 'guangnian-ladder',
  jiguang: 'huanqiuti-ladder',
  shunfeng: 'jilian-cloud',
  manbu: 'tizi-cloud',
  yunyou: 'sslar-net',
  ziyouzhiyi: 'yuzhou-cloud'
};

for (const [key, slug] of Object.entries(manualBrandFixes)) {
  content = content.split(`/brands/${key}`).join(`/brands/${slug}`);
}

fs.writeFileSync(path.join(__dirname, '../docs/index.md'), content, 'utf8');
console.log('All links in docs/index.md successfully updated!');
