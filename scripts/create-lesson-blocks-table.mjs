#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.join(__dirname, '..', '.env.local');

// Parse .env.local
const envContent = fs.readFileSync(envPath, 'utf-8');
const env = {};
envContent.split('\n').forEach(line => {
  if (line && !line.startsWith('#')) {
    const [key, ...parts] = line.split('=');
    env[key.trim()] = parts.join('=').trim();
  }
});

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { autoRefreshToken: false, persistSession: false }
});

async function createTable() {
  try {
    console.log('🏗️  Creating lesson_blocks table...\n');

    // Use rpc to execute raw SQL
    const { error } = await supabase.rpc('exec', {
      sql: `
        CREATE TABLE IF NOT EXISTS public.lesson_blocks (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          lesson_id TEXT NOT NULL REFERENCES public.module_lessons(title) ON DELETE CASCADE,
          block_type TEXT NOT NULL,
          content JSONB NOT NULL,
          order_index INTEGER DEFAULT 0,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        
        CREATE INDEX IF NOT EXISTS idx_lesson_blocks_lesson_id ON public.lesson_blocks(lesson_id);
        CREATE INDEX IF NOT EXISTS idx_lesson_blocks_order ON public.lesson_blocks(lesson_id, order_index);
      `
    });

    // If RPC doesn't exist, try direct SQL approach
    if (error) {
      console.log('⚠️  RPC exec not available, trying alternative...\n');
      
      // Create the table directly with Supabase admin
      const { data, error: createError } = await supabase
        .from('information_schema.tables')
        .select('*')
        .eq('table_schema', 'public')
        .eq('table_name', 'lesson_blocks');

      if (!createError && data.length === 0) {
        console.log('❌ Cannot create table - RPC not available');
        console.log('Please run this SQL in Supabase console:');
        console.log(`
CREATE TABLE IF NOT EXISTS public.lesson_blocks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id TEXT NOT NULL,
  block_type TEXT NOT NULL,
  content JSONB NOT NULL,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_lesson_blocks_lesson_id ON public.lesson_blocks(lesson_id);
        `);
        process.exit(1);
      } else {
        console.log('✅ lesson_blocks table already exists');
      }
    } else {
      console.log('✅ lesson_blocks table created successfully');
    }
  } catch (err) {
    console.error('❌ Error:', err.message);
  }
}

createTable();
