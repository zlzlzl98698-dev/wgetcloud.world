const fs = require('fs');
const content = fs.readFileSync('docs/index.md', 'utf8');

const pureChinese = (content.match(/[\u4e00-\u9fa5]/g) || []).length;
const totalChars = content.length;
const lines = content.split('\n').length;
const headings = content.split('\n').filter(l => l.startsWith('#')).length;
const links = (content.match(/\[.*?\]\(.*?\)/g) || []).length;

console.log({
  pureChinese,
  totalChars,
  lines,
  headings,
  links
});
