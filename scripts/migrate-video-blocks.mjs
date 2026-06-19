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

async function migrate() {
  try {
    console.log('🎬 Migrating video blocks to new format...\n');

    // Get all lessons
    const { data: lessons, error: fetchError } = await supabase
      .from('module_lessons')
      .select('id, content');

    if (fetchError) {
      console.error('Error fetching lessons:', fetchError);
      return;
    }

    let updated = 0;

    for (const lesson of lessons || []) {
      if (!lesson.content) continue;

      let content = lesson.content;
      if (typeof content === 'string') {
        try {
          content = JSON.parse(content);
        } catch (e) {
          continue;
        }
      }

      if (!content.blocks) continue;

      // Look for paragraph blocks with video HTML
      let hasVideoHTML = false;
      const newBlocks = [];

      for (const block of content.blocks) {
        if (block.type === 'paragraph' && block.content?.text?.includes('<video')) {
          // Extract src from video HTML
          const srcMatch = block.content.text.match(/src="([^"]+)"/);
          const typeMatch = block.content.text.match(/type="([^"]+)"/);
          
          if (srcMatch) {
            const videoUrl = srcMatch[1];
            const videoType = typeMatch ? typeMatch[1] : 'video/mp4';
            
            // Get title from previous paragraph if it exists
            const prevTitle = newBlocks.length > 0 && newBlocks[newBlocks.length - 1].type === 'paragraph'
              ? newBlocks[newBlocks.length - 1].content.text
              : '🎥 Video';

            // Remove the previous paragraph if it's just a title
            if (newBlocks.length > 0 && newBlocks[newBlocks.length - 1].content?.text?.startsWith('🎥')) {
              newBlocks.pop();
            }

            // Add title paragraph
            newBlocks.push({
              type: 'paragraph',
              content: { text: prevTitle }
            });

            // Add proper video block
            newBlocks.push({
              type: 'video',
              content: {
                src: videoUrl,
                type: videoType
              }
            });

            hasVideoHTML = true;
          }
        } else {
          newBlocks.push(block);
        }
      }

      if (hasVideoHTML) {
        content.blocks = newBlocks;
        const { error: updateError } = await supabase
          .from('module_lessons')
          .update({ content: JSON.stringify(content) })
          .eq('id', lesson.id);

        if (updateError) {
          console.error(`Error updating lesson ${lesson.id}:`, updateError);
        } else {
          console.log(`✅ Migrated lesson ${lesson.id}`);
          updated++;
        }
      }
    }

    console.log(`\n✨ Done! Updated ${updated} lessons with video blocks.`);

  } catch (err) {
    console.error('Fatal:', err.message);
  }
}

migrate();
