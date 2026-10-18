// Verify every asset used by the 0.23 HTML package survives deduplication.
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(process.argv[2] || '_site');
const assets = require('./required-assets.json');
let missing = [];
for (const item of ['index.html','style.css','app.js','catalogue.js','model.js','sharing-model.js','sharing.js','sw.js',...assets]) {
  const full = path.join(root, item);
  if (!fs.existsSync(full) || !fs.statSync(full).isFile()) missing.push(item);
}
if (missing.length) { console.error('Missing HTML runtime assets:', missing.join(', ')); process.exit(1); }
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
for (const f of ['app.js','catalogue.js','model.js','sharing-model.js','sharing.js','style.css']) {
  if (!html.includes(f)) { console.error('HTML does not load', f); process.exit(1); }
}
console.log(`Tidy-ish HTML ready: ${assets.length} assets and all required scripts present.`);
