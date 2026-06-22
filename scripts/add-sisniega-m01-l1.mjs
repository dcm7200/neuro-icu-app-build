#!/usr/bin/env node
// Adds Daniella Sisniega, MD to the Attending Neurointensivists HTML grid in M01.L1
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envContent = fs.readFileSync(path.join(__dirname, '..', '.env.local'), 'utf-8');
const env = {};
envContent.split('\n').forEach(line => {
  if (line && !line.startsWith('#')) {
    const [key, ...parts] = line.split('=');
    if (key) env[key.trim()] = parts.join('=').trim();
  }
});

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false }
});

const TITLE = 'M01.L1 — Welcome, Faculty, and the Culture of Speaking Up';

// New card to insert — alphabetically between Phuah (P) and Thomas (T)
const SISNIEGA_CARD = `\n    <div style="text-align:center;padding:8px;">
      <img src="/team/sisniega.svg" alt="Daniella Sisniega"
        style="width:90px;height:90px;border-radius:50%;object-fit:cover;border:2px solid #e5e7eb;display:block;margin:0 auto 8px;" />
      <p style="font-weight:600;font-size:13px;margin:0 0 2px;color:#111;">Daniella Sisniega</p>
      <p style="font-size:11px;color:#6b7280;margin:0;">MD</p>
      <p style="font-size:11px;color:#9ca3af;margin:2px 0 0;">Neurologist</p>
    </div>`;

async function update() {
  const { data, error: findError } = await supabase
    .from('module_lessons')
    .select('id, content')
    .eq('title', TITLE)
    .single();

  if (findError || !data) {
    console.error('❌ Lesson not found:', findError?.message);
    process.exit(1);
  }

  let content = typeof data.content === 'string' ? JSON.parse(data.content) : data.content;
  const blocks = content.blocks || [];

  // Find the "Attending Neurointensivists" html block (block after the heading)
  let htmlBlockIdx = -1;
  for (let i = 0; i < blocks.length; i++) {
    if (blocks[i].type === 'heading' && blocks[i].content?.text === 'Attending Neurointensivists') {
      // Next html block after this heading is our target
      for (let j = i + 1; j < blocks.length; j++) {
        if (blocks[j].type === 'html') {
          htmlBlockIdx = j;
          break;
        }
        if (blocks[j].type === 'heading') break; // stop at next section
      }
      break;
    }
  }

  if (htmlBlockIdx === -1) {
    console.error('❌ Could not find Attending Neurointensivists html block');
    process.exit(1);
  }

  const html = blocks[htmlBlockIdx].content.html;

  // Check if already present
  if (html.includes('Sisniega')) {
    console.log('ℹ️  Daniella Sisniega already present — no changes needed.');
    process.exit(0);
  }

  // Insert before the Rachel Thomas card (alphabetically S before T)
  const THOMAS_MARKER = '<div style="text-align:center;padding:8px;">\n      <img src="/team/thomas.jpg"';
  const insertPos = html.indexOf(THOMAS_MARKER);

  let newHtml;
  if (insertPos !== -1) {
    newHtml = html.slice(0, insertPos) + SISNIEGA_CARD + '\n    ' + html.slice(insertPos);
    console.log('✅ Inserted Daniella Sisniega before Rachel Thomas');
  } else {
    // Fallback: append before closing </div>
    const closePos = html.lastIndexOf('</div>');
    newHtml = html.slice(0, closePos) + SISNIEGA_CARD + '\n' + html.slice(closePos);
    console.log('✅ Inserted Daniella Sisniega at end of grid (Thomas marker not found)');
  }

  blocks[htmlBlockIdx].content.html = newHtml;
  content.blocks = blocks;

  const { error: updateError } = await supabase
    .from('module_lessons')
    .update({ content: JSON.stringify(content) })
    .eq('id', data.id);

  if (updateError) {
    console.error('❌ Update failed:', updateError.message);
    process.exit(1);
  }

  console.log('✅ M01.L1 Supabase record updated — Daniella Sisniega, MD added to Attending Neurointensivists');
  process.exit(0);
}

update().catch(console.error);
