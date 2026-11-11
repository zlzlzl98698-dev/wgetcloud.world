const fs = require('fs');

const faqFile = 'docs/faq/index.md';
let content = fs.readFileSync(faqFile, 'utf8');

// Parse Q&As: ### Q\d+: (.*?)\n\*\*答：\*\*\s*([\s\S]*?)(?=\n### Q|\n---|\n## )
const regex = /### Q\d+:\s*(.*?)\n\*\*答：\*\*\s*([\s\S]*?)(?=\n### Q|\n---|\n## )/g;
let match;
const qas = [];

while ((match = regex.exec(content)) !== null) {
  const question = match[1].trim();
  let answer = match[2].trim()
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // remove markdown links for clean text
    .replace(/\*\*|\*|`/g, '') // remove markdown bold/code
    .replace(/\n+/g, ' '); // collapse lines
  if (answer.length > 250) answer = answer.slice(0, 250) + '...';
  qas.push({ question, answer });
}

console.log('Extracted Q&As for Schema:', qas.length);

// Select top 15 Q&As for FAQPage Schema
const topQas = qas.slice(0, 15);
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": topQas.map(qa => ({
    "@type": "Question",
    "name": qa.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": qa.answer
    }
  }))
};

const schemaHead = `head:
  - - script
    - type: application/ld+json
    - '${JSON.stringify(faqSchema)}'`;

// Replace frontmatter in docs/faq/index.md
if (content.startsWith('---\n')) {
  const parts = content.split('---\n');
  // parts[0] is empty, parts[1] is frontmatter, parts.slice(2).join('---') is rest
  let fm = parts[1];
  if (!fm.includes('head:')) {
    fm = fm.trim() + '\n' + schemaHead + '\n';
  } else {
    // replace existing head or append
    fm = fm.replace(/head:[\s\S]*?(?=\n[a-z]+:|$)/i, schemaHead + '\n');
  }
  content = '---\n' + fm + '---\n' + parts.slice(2).join('---\n');
  fs.writeFileSync(faqFile, content, 'utf8');
  console.log('Successfully injected FAQPage Schema into docs/faq/index.md!');
}
