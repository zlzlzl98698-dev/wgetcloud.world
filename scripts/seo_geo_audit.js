const fs = require('fs');
const path = require('path');

function getHtmlFiles(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getHtmlFiles(fullPath));
    } else if (file.endsWith('.html')) {
      results.push(fullPath);
    }
  });
  return results;
}

const distDir = 'docs/.vitepress/dist';
const files = getHtmlFiles(distDir);
console.log('=== HTML FILES AUDIT ===');
console.log('Total HTML files in dist:', files.length);

// 1. Canonical Audit
const canonicalResults = [];
let missingCanonical = 0;
let canonicalFormatIssues = 0;

// 2. Schema JSON-LD Audit
const schemaResults = [];
let missingSchema = 0;
let schemaParseErrors = 0;

// 3. Outbound Link & Nofollow Audit
const outboundLinks = [];
let sponsoredNoFollowMissing = 0;

// 4. Meta & Title Audit
const titles = new Map();
const descriptions = new Map();
let duplicateTitles = 0;
let duplicateDescriptions = 0;
let missingH1 = 0;
let multipleH1 = 0;

// 5. GA4 / Tracking code audit
const trackingIds = new Set();

// 6. DOM / CSR vs SSR check
let clientOnlyIssues = 0;

files.forEach(f => {
  const html = fs.readFileSync(f, 'utf8');
  const relPath = path.relative(distDir, f).replace(/\\/g, '/');

  // Canonical check
  const canMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["'](.*?)["']/i) ||
                   html.match(/<link[^>]*href=["'](.*?)["'][^>]*rel=["']canonical["']/i);
  if (!canMatch) {
    missingCanonical++;
  } else {
    const canHref = canMatch[1];
    if (!canHref.startsWith('https://wgetcloud.world')) {
      canonicalFormatIssues++;
      canonicalResults.push({ file: relPath, issue: 'Non-official domain or HTTP: ' + canHref });
    }
  }

  // Schema check
  const scriptRegex = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let sMatch;
  let hasSchema = false;
  while ((sMatch = scriptRegex.exec(html)) !== null) {
    hasSchema = true;
    try {
      const parsed = JSON.parse(sMatch[1]);
      schemaResults.push({ file: relPath, type: parsed['@type'] || (Array.isArray(parsed) ? 'Array' : 'Unknown') });
    } catch (e) {
      schemaParseErrors++;
      schemaResults.push({ file: relPath, error: e.message });
    }
  }
  if (!hasSchema) {
    missingSchema++;
  }

  // Outbound link check (affiliate, external sponsors)
  const aRegex = /<a\b([^>]*)href=["']([^"']*)["']([^>]*)>/gi;
  let aMatch;
  while ((aMatch = aRegex.exec(html)) !== null) {
    const fullTag = aMatch[0];
    const href = aMatch[2];
    if (href.startsWith('http://') || href.startsWith('https://')) {
      if (!href.startsWith('https://wgetcloud.world') && !href.startsWith('http://localhost') && !href.startsWith('http://127.0.0.1')) {
        const isAffiliate = href.includes('aff') || href.includes('invite') || href.includes('register') || href.includes('link') || href.includes('track');
        const hasRel = fullTag.includes('rel=');
        const hasNoFollow = fullTag.includes('nofollow');
        const hasSponsored = fullTag.includes('sponsored');
        outboundLinks.push({
          file: relPath,
          href,
          fullTag,
          isAffiliate,
          hasNoFollow,
          hasSponsored
        });
        if (isAffiliate && (!hasNoFollow || !hasSponsored)) {
          sponsoredNoFollowMissing++;
        }
      }
    }
  }

  // Title check
  const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
  if (titleMatch) {
    const t = titleMatch[1].trim();
    if (!titles.has(t)) titles.set(t, []);
    titles.get(t).push(relPath);
  }

  // Meta description check
  const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i) ||
                    html.match(/<meta[^>]*content=["']([^"']*)["'][^>]*name=["']description["']/i);
  if (descMatch) {
    const d = descMatch[1].trim();
    if (!descriptions.has(d)) descriptions.set(d, []);
    descriptions.get(d).push(relPath);
  }

  // H1 check
  const h1Matches = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi) || [];
  if (h1Matches.length === 0) missingH1++;
  if (h1Matches.length > 1) multipleH1++;

  // GA / Tracking check
  const gaMatch = html.match(/G-[A-Za-z0-9]+/g);
  if (gaMatch) gaMatch.forEach(id => trackingIds.add(id));
  const baiduMatch = html.match(/hm\.baidu\.com\/hm\.js\?[a-z0-9]+/gi);
  if (baiduMatch) baiduMatch.forEach(id => trackingIds.add(id));

  // Check SSR: is there actual text in main?
  const mainMatch = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i);
  if (mainMatch) {
    const mainText = mainMatch[1].replace(/<[^>]+>/g, '').trim();
    if (mainText.length < 50) {
      clientOnlyIssues++;
    }
  }
});

console.log('\n--- 1. CANONICAL AUDIT ---');
console.log('Missing canonical:', missingCanonical);
console.log('Canonical domain/protocol issues:', canonicalFormatIssues);
if (canonicalResults.length > 0) console.log(canonicalResults.slice(0, 5));

console.log('\n--- 2. SCHEMA JSON-LD AUDIT ---');
console.log('Files missing schema:', missingSchema);
console.log('Schema parse errors:', schemaParseErrors);
console.log('Valid schemas found:', schemaResults.length);

console.log('\n--- 3. OUTBOUND & AFFILIATE LINK AUDIT ---');
console.log('Total external links:', outboundLinks.length);
console.log('Affiliate/commercial links missing nofollow/sponsored:', sponsoredNoFollowMissing);
if (sponsoredNoFollowMissing > 0) {
  console.log('Samples of missing nofollow:');
  outboundLinks.filter(l => l.isAffiliate && (!l.hasNoFollow || !l.hasSponsored)).slice(0, 10).forEach(l => {
    console.log(`[${l.file}] -> ${l.href} | Tag: ${l.fullTag}`);
  });
}

console.log('\n--- 4. TITLES & DESCRIPTIONS AUDIT ---');
titles.forEach((flist, t) => {
  if (flist.length > 1) {
    duplicateTitles++;
    console.log(`Duplicate Title (${flist.length} pages): "${t}" ->`, flist.slice(0, 3));
  }
});
console.log('Total duplicate title groups:', duplicateTitles);

descriptions.forEach((flist, d) => {
  if (flist.length > 1) {
    duplicateDescriptions++;
    console.log(`Duplicate Description (${flist.length} pages): "${d.slice(0, 40)}..." ->`, flist.slice(0, 3));
  }
});
console.log('Total duplicate description groups:', duplicateDescriptions);
console.log('Pages missing H1:', missingH1);
console.log('Pages with multiple H1s:', multipleH1);

console.log('\n--- 5. TRACKING & CODE ISOLATION AUDIT ---');
console.log('Tracking IDs found:', Array.from(trackingIds));

console.log('\n--- 6. SSR CONTENT AVAILABILITY ---');
console.log('Empty main / CSR fallback pages:', clientOnlyIssues);
