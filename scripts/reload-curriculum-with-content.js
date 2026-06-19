#!/usr/bin/env node

/**
 * Reload Curriculum with Actual Content
 * Updates lessons with markdown content from files
 */

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

require('dotenv').config({ path: path.join(__dirname, '../.env.local') });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const curriculumDir = path.join(__dirname, '../curriculum');
const uploadedFilesDir = path.join(__dirname, '../../');

async function updateLessonContent() {
  console.log('🔄 Updating lesson content...\n');

  // Get all lessons
  const { data: lessons, error: fetchError } = await supabase
    .from('module_lessons')
    .select('*')
    .order('created_at');

  if (fetchError) {
    console.error('Error fetching lessons:', fetchError);
    return;
  }

  let updated = 0;

  for (const lesson of lessons) {
    // Try to find the content file
    let content = '';
    
    // First try curriculum directory
    const possiblePaths = [
      path.join(curriculumDir, `${lesson.title.replace(/[^a-zA-Z0-9\s]/g, '').substring(0, 30)}.md`),
      path.join(curriculumDir, `${lesson.title}.md`),
      // Also try uploaded files with original names
      ...fs.readdirSync(uploadedFilesDir)
        .filter(f => f.includes('M0') && f.includes('.md'))
        .map(f => path.join(uploadedFilesDir, f))
    ];

    for (const p of possiblePaths) {
      if (fs.existsSync(p)) {
        content = fs.readFileSync(p, 'utf8');
        break;
      }
    }

    if (content) {
      const { error: updateError } = await supabase
        .from('module_lessons')
        .update({ content })
        .eq('id', lesson.id);

      if (!updateError) {
        updated++;
        console.log(`✅ Updated: ${lesson.title}`);
      } else {
        console.error(`❌ Failed to update ${lesson.title}: ${updateError.message}`);
      }
    } else {
      console.log(`⏭️  Skipped: ${lesson.title} (no content file)`);
    }
  }

  console.log(`\n✨ Complete! Updated ${updated} lessons.`);
}

updateLessonContent().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
