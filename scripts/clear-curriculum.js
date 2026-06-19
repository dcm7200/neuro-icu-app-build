#!/usr/bin/env node

import { createClient } from "@supabase/supabase-js";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

// Load .env.local
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.join(__dirname, "../.env.local");
const envContent = fs.readFileSync(envPath, "utf-8");
const envLines = envContent.split("\n");
const env = {};
for (const line of envLines) {
  const [key, value] = line.split("=");
  if (key && value) {
    env[key.trim()] = value.trim();
  }
}

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing SUPABASE env vars");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function clearCurriculum() {
  try {
    console.log("🗑️  Clearing curriculum data...");

    // Delete all curriculum modules (cascades to lessons, etc.)
    const { error: deleteError } = await supabase
      .from("curriculum_modules")
      .delete()
      .gt("id", "00000000-0000-0000-0000-000000000000"); // Delete all

    if (deleteError) {
      console.error("Delete error:", deleteError.message);
      throw deleteError;
    }

    console.log("✅ Curriculum cleared!");
  } catch (err) {
    console.error("❌ Error:", err.message);
    process.exit(1);
  }
}

clearCurriculum();
