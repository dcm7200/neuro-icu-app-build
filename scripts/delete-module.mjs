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

async function deleteModule() {
  try {
    console.log('🗑️  Deleting module "Welcome to BNI Neurocritical Care"...\n');

    // Find the module
    const { data: modules, error: findError } = await supabase
      .from('curriculum_modules')
      .select('id, title')
      .ilike('title', '%Welcome to BNI%');

    if (findError) {
      console.error('Error finding module:', findError);
      return;
    }

    if (!modules || modules.length === 0) {
      console.log('❌ Module not found');
      return;
    }

    const module = modules[0];
    console.log(`Found: ${module.title} (ID: ${module.id})\n`);

    // Delete lessons first (cascade)
    const { error: deleteLessonsError } = await supabase
      .from('module_lessons')
      .delete()
      .eq('module_id', module.id);

    if (deleteLessonsError) {
      console.error('Error deleting lessons:', deleteLessonsError);
      return;
    }

    console.log('✅ Deleted all lessons in module');

    // Delete the module
    const { error: deleteModuleError } = await supabase
      .from('curriculum_modules')
      .delete()
      .eq('id', module.id);

    if (deleteModuleError) {
      console.error('Error deleting module:', deleteModuleError);
      return;
    }

    console.log('✅ Deleted module');
    console.log('\n✨ Done! Module and all its lessons have been deleted.');

  } catch (err) {
    console.error('Fatal:', err.message);
  }
}

deleteModule();
