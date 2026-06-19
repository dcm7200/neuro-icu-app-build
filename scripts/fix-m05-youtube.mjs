#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.join(__dirname, '..', '.env.local');

const envContent = fs.readFileSync(envPath, 'utf-8');
const env = {};
envContent.split('\n').forEach(line => {
  if (line && !line.startsWith('#')) {
    const [key, ...parts] = line.split('=');
    env[key.trim()] = parts.join('=').trim();
  }
});

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false }
});

async function fix() {
  try {
    console.log('🔧 Fixing M05.L1 YouTube link...\n');

    const { data: lesson, error: fetchError } = await supabase
      .from('module_lessons')
      .select('content')
      .ilike('title', '%Awake%')
      .single();

    if (fetchError) {
      console.error('Error fetching lesson:', fetchError);
      return;
    }

    let content = lesson.content;
    if (typeof content === 'string') {
      content = JSON.parse(content);
    }

    // Find and replace the dead YouTube link
    content.blocks = content.blocks.map(block => {
      if (block.type === 'video' && block.content.src?.includes('youtu.be/SPZkVJzjRnU')) {
        console.log('❌ Removed dead link: https://youtu.be/SPZkVJzjRnU');
        return {
          ...block,
          content: {
            src: 'https://youtu.be/U4ni_qX3_PI',
            type: 'youtube'
          }
        };
      }
      return block;
    });

    console.log('✅ Added correct link: https://youtu.be/U4ni_qX3_PI\n');

    // Update lesson
    const { error: updateError } = await supabase
      .from('module_lessons')
      .update({ content: JSON.stringify(content) })
      .ilike('title', '%Awake%');

    if (updateError) {
      console.error('Error updating lesson:', updateError);
      return;
    }

    console.log('✨ Done! Refresh your browser to see the correct video.');

  } catch (err) {
    console.error('Fatal:', err.message);
  }
}

fix();
