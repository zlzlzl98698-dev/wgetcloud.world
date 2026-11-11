const fs = require('fs');
let s = fs.readFileSync('scripts/mega_expand_phase1.js', 'utf8');

// replace unescaped `总耗时` and `TLS握手`
s = s.split('`总耗时`').join('\\`总耗时\\`');
s = s.split('`TLS握手`').join('\\`TLS握手\\`');
s = s.split('`AMM`').join('\\`AMM\\`');
s = s.split('`BREEZE`').join('\\`BREEZE\\`');
s = s.split('`DALAO`').join('\\`DALAO\\`');
s = s.split('`TWILIGHT`').join('\\`TWILIGHT\\`');
s = s.split('`<body>`').join('\\`<body>\\`');

fs.writeFileSync('scripts/mega_expand_phase1.js', s, 'utf8');
console.log('Fixed phase1 syntax');
