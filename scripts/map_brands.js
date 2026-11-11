const fs = require('fs');
const code = fs.readFileSync('scripts/brands_source.js', 'utf8');
const brands = eval(code.replace('module.exports =', ''));
console.log('Total brands:', brands.length);
brands.forEach(b => {
  console.log(`${b.name} -> /brands/${b.slug}`);
});
