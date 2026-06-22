import fs from 'fs';
const dir = 'C:/Users/dcm72/.openclaw/workspace/neuro-icu-app-build/public/team';
const people = [
  { file: 'chadwick', initials: 'AC', color: '#7c3aed' },
  { file: 'twomey',   initials: 'KT', color: '#0891b2' },
  { file: 'castillo', initials: 'RC', color: '#059669' },
  { file: 'mak',      initials: 'HM', color: '#d97706' },
];
for (const p of people) {
  const svg = `<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <circle cx="100" cy="100" r="100" fill="${p.color}"/>
  <text x="100" y="118" text-anchor="middle" font-size="72" font-weight="700" font-family="system-ui,sans-serif" fill="white">${p.initials}</text>
</svg>`;
  fs.writeFileSync(`${dir}/${p.file}.svg`, svg);
  console.log('Saved', p.file + '.svg');
}
