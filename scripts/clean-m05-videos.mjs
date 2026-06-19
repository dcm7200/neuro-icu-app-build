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

async function clean() {
  try {
    console.log('🧹 Cleaning M05.L1 content...\n');

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

    console.log('Before:', content.blocks.length, 'blocks');

    // Remove the first MP4 video block and its preceding paragraph
    const blocks = content.blocks;
    const newBlocks = [];
    let skipNextParagraph = false;

    for (let i = 0; i < blocks.length; i++) {
      const block = blocks[i];
      
      // Skip the MP4 video block
      if (block.type === 'video' && block.content.src?.includes('.mp4')) {
        console.log('✅ Removed MP4 video block');
        skipNextParagraph = true;
        continue;
      }

      // Skip the paragraph before it (if marked)
      if (skipNextParagraph && block.type === 'paragraph' && block.content.text === '🎥 Awake Exam') {
        console.log('✅ Removed associated paragraph');
        skipNextParagraph = false;
        continue;
      }

      newBlocks.push(block);
    }

    content.blocks = newBlocks;

    console.log('After:', content.blocks.length, 'blocks\n');

    // Update lesson
    const { error: updateError } = await supabase
      .from('module_lessons')
      .update({ content: JSON.stringify(content) })
      .ilike('title', '%Awake%');

    if (updateError) {
      console.error('Error updating lesson:', updateError);
      return;
    }

    console.log('✨ Done! Lesson updated. Refresh your browser to see changes.');

  } catch (err) {
    console.error('Fatal:', err.message);
  }
}

clean();
