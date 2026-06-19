#!/usr/bin/env node

/**
 * Import curriculum JSON into Supabase
 * Usage: node scripts/import-curriculum.js <path-to-json>
 */

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

async function importCurriculum(jsonPath) {
  try {
    const data = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
    console.log(`📚 Importing curriculum: ${data.curriculum.title}`);

    const moduleMap = {}; // phase_id -> module_id mapping

    // 1. Insert modules (curriculum_modules table)
    console.log(`\n📖 Inserting ${data.modules.length} modules...`);
    for (const module of data.modules) {
      const { data: inserted, error } = await supabase
        .from("curriculum_modules")
        .insert({
          title: module.title,
          description: module.summary || "",
          category: module.phase_id, // Use phase as category
          estimated_hours: null,
          order_index: parseInt(module.module_id.replace("M", "")),
        })
        .select();

      if (error) {
        console.warn(`  ⚠️  ${module.module_id}: ${error.message}`);
        continue;
      }

      const moduleId = inserted[0].id;
      moduleMap[module.module_id] = moduleId;
      console.log(`  ✓ ${module.module_id}: ${module.title}`);

      // 2. Insert lessons for this module
      for (const lesson of module.lessons) {
        const { error: lessonError } = await supabase
          .from("module_lessons")
          .insert({
            module_id: moduleId,
            title: lesson.title,
            content: `Content for: ${lesson.title}. Use the rich editor to add detailed content.`,
            lesson_order: parseInt(lesson.id.split(".L")[1]),
          });
        if (lessonError) {
          console.warn(`    ⚠️  ${lesson.id}: ${lessonError.message}`);
        } else {
          console.log(`    ✓ ${lesson.id}`);
        }
      }

      // 3. Create or link competencies
      if (module.competency_tags && module.competency_tags.length > 0) {
        for (const tag of module.competency_tags) {
          // First, find or create the competency
          const { data: compData } = await supabase
            .from("competencies")
            .select("id")
            .eq("title", tag)
            .limit(1);

          let competencyId;
          if (compData && compData.length > 0) {
            competencyId = compData[0].id;
          } else {
            const { data: newComp } = await supabase
              .from("competencies")
              .insert({ title: tag, description: `Competency: ${tag}` })
              .select();
            competencyId = newComp[0].id;
          }

          // Link to module
          const { error: mapError } = await supabase
            .from("module_competency_map")
            .insert({
              module_id: moduleId,
              competency_id: competencyId,
            });
          if (!mapError) {
            console.log(`    📌 Competency: ${tag}`);
          }
        }
      }
    }

    console.log(`\n✅ Curriculum import complete!`);
    console.log(`   Phases: ${data.phases.length}`);
    console.log(`   Modules: ${data.modules.length}`);
    console.log(`   Total estimated hours: ${data.curriculum.estimated_total_hours}`);
  } catch (err) {
    console.error("❌ Import failed:", err.message);
    process.exit(1);
  }
}

const jsonPath = process.argv[2] || "./curriculum_import.json";
if (!fs.existsSync(jsonPath)) {
  console.error(`❌ File not found: ${jsonPath}`);
  process.exit(1);
}

importCurriculum(jsonPath);
