#!/usr/bin/env node
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envContent = fs.readFileSync(path.join(__dirname, '..', '.env.local'), 'utf-8');
const env = {};
envContent.split('\n').forEach(line => { if(line&&!line.startsWith('#')){const[k,...v]=line.split('=');env[k.trim()]=v.join('=').trim();} });
const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {auth:{autoRefreshToken:false,persistSession:false}});

// Single person card HTML — matches existing style exactly
function card(imgFile, name, credentials, role) {
  return `
    <div style="text-align:center;padding:8px;">
      <img src="/team/${imgFile}" alt="${name}"
        style="width:90px;height:90px;border-radius:50%;object-fit:cover;border:2px solid #e5e7eb;display:block;margin:0 auto 8px;" />
      <p style="font-weight:600;font-size:13px;margin:0 0 2px;color:#111;">${name}</p>
      <p style="font-size:11px;color:#6b7280;margin:0;">${credentials}</p>
      <p style="font-size:11px;color:#9ca3af;margin:2px 0 0;">${role}</p>
    </div>`;
}

async function run() {
  const { data, error } = await supabase
    .from('module_lessons')
    .select('id,content')
    .eq('title', 'M01.L1 — Welcome, Faculty, and the Culture of Speaking Up')
    .single();

  if (error || !data) { console.error('Lesson not found:', error?.message); process.exit(1); }

  const parsed = JSON.parse(data.content);
  const blocks = parsed.blocks;

  // ── Find and update APP grid (block 17 in current state) ─────────────────
  const appIdx = blocks.findIndex(b =>
    b.type === 'html' && b.content?.html?.includes('lizano.jpg')
  );

  if (appIdx === -1) { console.error('APP grid block not found'); process.exit(1); }

  // Check if Ashley / Katie already in there (idempotent)
  if (!blocks[appIdx].content.html.includes('chadwick')) {
    // Insert two new cards before the closing </div></div>
    const newCards =
      card('chadwick.svg', 'Ashley Chadwick', 'DNP, ACNP', 'Nurse Practitioner') +
      card('twomey.svg',   'Katie Twomey',    'PA-C',      'Physician Assistant');
    blocks[appIdx].content.html = blocks[appIdx].content.html.replace('</div></div>', newCards + '</div></div>');
    console.log('✅ Added Ashley Chadwick + Katie Twomey to APP section');
  } else {
    console.log('ℹ️  Ashley/Katie already present — skipping APP section');
  }

  // ── Find and update Pharmacist grid (block 20) ───────────────────────────
  const pharmIdx = blocks.findIndex(b =>
    b.type === 'html' && b.content?.html?.includes('haller.jpg')
  );

  if (pharmIdx === -1) { console.error('Pharmacist grid block not found'); process.exit(1); }

  if (!blocks[pharmIdx].content.html.includes('castillo')) {
    const newCards =
      card('castillo.svg', 'Renee Castillo', 'PharmD',       'NCC Pharmacist') +
      card('mak.svg',      'Hannah Mak',     'PharmD',       'NCC Pharmacist');
    blocks[pharmIdx].content.html = blocks[pharmIdx].content.html.replace('</div></div>', newCards + '</div></div>');
    console.log('✅ Added Renee Castillo + Hannah Mak to Pharmacist section');
  } else {
    console.log('ℹ️  Castillo/Mak already present — skipping Pharmacist section');
  }

  // ── Push back to Supabase ─────────────────────────────────────────────────
  const { error: updateErr } = await supabase
    .from('module_lessons')
    .update({ content: JSON.stringify(parsed) })
    .eq('id', data.id);

  if (updateErr) { console.error('Update failed:', updateErr.message); process.exit(1); }
  console.log('✅ M01.L1 updated successfully');
  process.exit(0);
}

run().catch(console.error);
