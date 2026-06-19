/**
 * inject-lesson-visuals.js
 * Injects SVG/image blocks into M05–M10 lesson content in Supabase.
 * Run: node scripts/inject-lesson-visuals.js
 *
 * Strategy: inserts an image block immediately after the first heading block
 * in each target lesson, or at a specified position.
 *
 * Built by Sage 🦉 on 2026-06-19
 */

const { createClient } = require('@supabase/supabase-js');

const sb = createClient(
  'https://onrdlphtuditorofccna.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ucmRscGh0dWRpdG9yb2ZjY25hIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODgxMDM1NywiZXhwIjoyMDk0Mzg2MzU3fQ.v9IpS6xMIULvlz7FDPeU0rw80TzHvSSTujSruj19B5o'
);

// Visual definitions: which lesson gets which image blocks, and where to insert them
// insertAfterType: insert after the Nth block of this type (0-indexed)
const VISUAL_INJECTIONS = [
  // ── M09 — ICP & Herniation ──────────────────────────────────────
  {
    lessonTitle: 'M09.L1 — ICP Physiology, CPP, and Autoregulation',
    injections: [
      {
        afterHeadingContaining: 'Monro',
        block: {
          type: 'image',
          content: {
            url: '/images/lessons/m09-monro-kellie.svg',
            caption: 'Monro-Kellie Doctrine: The skull is a rigid container. As one compartment expands, others must compress. When compensatory reserve is exhausted, small volume increases cause catastrophic ICP rises.'
          }
        }
      },
      {
        afterHeadingContaining: 'Autoregul',
        block: {
          type: 'image',
          content: {
            url: '/images/lessons/m09-autoregulation.svg',
            caption: 'Cerebral Autoregulation Curve: Normal brain maintains constant CBF across CPP 60–150 mmHg. In TBI, the curve may shift rightward or fail entirely — making the brain passively pressure-dependent.'
          }
        }
      }
    ]
  },
  {
    lessonTitle: 'M09.L2 — ICP Monitoring: EVD, Bolt, Waveforms, and Troubleshooting',
    injections: [
      {
        afterHeadingContaining: 'Waveform',
        block: {
          type: 'image',
          content: {
            url: '/images/lessons/m09-icp-waveforms.svg',
            caption: 'ICP Waveform Morphology: Normal ICP shows P1>P2>P3. When compliance is lost, P2 rises above P1 — a critical sign of exhausted compensatory reserve. Plateau (A) waves indicate impending herniation.'
          }
        }
      }
    ]
  },
  {
    lessonTitle: 'M09.L3 — Medical ICP Management: Tiered Protocol',
    injections: [
      {
        insertAtPosition: 1,
        block: {
          type: 'image',
          content: {
            url: '/images/lessons/m09-tiered-icp.svg',
            caption: 'Tiered ICP Management: Escalate stepwise. Tier 0 applies to every patient. Confirm ICP >20 mmHg sustained >5 min before advancing. Never skip tiers unless herniation is imminent.'
          }
        }
      }
    ]
  },
  {
    lessonTitle: 'M09.L4 — Herniation Syndromes: Recognition and Emergency Response',
    injections: [
      {
        insertAtPosition: 1,
        block: {
          type: 'image',
          content: {
            url: '/images/lessons/m09-herniation-syndromes.svg',
            caption: 'Brain Herniation Syndromes: Uncal is most common — blown ipsilateral pupil is the hallmark. Tonsillar herniation is immediately fatal. Cushing\'s Triad (HTN + bradycardia + irregular breathing) = imminent brainstem death.'
          }
        }
      }
    ]
  },

  // ── M05 — Neurological Exam ──────────────────────────────────────
  {
    lessonTitle: 'M05.L1 — Awake Comprehensive Exam',
    injections: [
      {
        afterHeadingContaining: 'Level of Consciousness',
        block: {
          type: 'image',
          content: {
            url: '/images/lessons/m05-gcs.svg',
            caption: 'Glasgow Coma Scale: Always report as E__V__M__, not just the total. An acute drop of ≥2 points requires attending notification. Intubated patients score V=1T — do not guess.'
          }
        }
      }
    ]
  },
  {
    lessonTitle: 'M05.L2 — Focused Exam in the Unconscious or Sedated Patient',
    injections: [
      {
        afterHeadingContaining: 'Pupil',
        block: {
          type: 'image',
          content: {
            url: '/images/lessons/m05-pupil-responses.svg',
            caption: 'Pupillary Responses: Size, symmetry, and reactivity together. A unilateral fixed dilated pupil is uncal herniation until proven otherwise — act first, image second. Use pupilometer (NPi <3 = abnormal) when available.'
          }
        }
      }
    ]
  },

  // ── M06 — SAH / ICH ─────────────────────────────────────────────
  {
    lessonTitle: 'M06.L1 — Aneurysmal SAH: Presentation, Grading, and Acute Management',
    injections: [
      {
        afterHeadingContaining: 'Grading',
        block: {
          type: 'image',
          content: {
            url: '/images/lessons/m06-hunt-hess-fisher.svg',
            caption: 'Hunt-Hess & Modified Fisher Grading: Document both on admission. Hunt-Hess predicts clinical severity and surgical risk. Modified Fisher 3–4 carries highest vasospasm risk — highest vigilance Day 3–21.'
          }
        }
      },
      {
        afterHeadingContaining: 'Anatomy',
        block: {
          type: 'image',
          content: {
            url: '/images/lessons/m06-circle-of-willis.svg',
            caption: 'Circle of Willis: Aneurysms most commonly form at bifurcation points — AComm (30%), PComm (25%), MCA bifurcation (20%). Territory of rupture predicts vasospasm pattern and DCI risk.'
          }
        }
      }
    ]
  },

  // ── M07 — Stroke / GBS / MG ─────────────────────────────────────
  {
    lessonTitle: 'M07.L1 — Acute Ischemic Stroke: tPA, Thrombectomy, and LVO Workup',
    injections: [
      {
        insertAtPosition: 1,
        block: {
          type: 'image',
          content: {
            url: '/images/lessons/m07-tpa-algorithm.svg',
            caption: 'IV tPA Eligibility Algorithm: Time is brain — 1.9 million neurons/min. Door-to-needle <60 min. Always obtain CTA head/neck immediately after tPA to evaluate for LVO and thrombectomy candidacy.'
          }
        }
      }
    ]
  },

  // ── M08 — Seizures / SE ─────────────────────────────────────────
  {
    lessonTitle: 'M08.L2 — Status Epilepticus: First-Line Through Refractory Management',
    injections: [
      {
        insertAtPosition: 1,
        block: {
          type: 'image',
          content: {
            url: '/images/lessons/m08-se-ladder.svg',
            caption: 'SE Treatment Escalation Ladder: Goal — seizure termination within 60 min of onset. Benzodiazepines are first-line; second-line AEDs are equivalent (LEV = VPA = fosphenytoin). Refractory SE requires intubation and continuous EEG.'
          }
        }
      }
    ]
  },

  // ── M10 — Brain Death ────────────────────────────────────────────
  {
    lessonTitle: 'M10.L1 — Brain Death: Criteria, Prerequisites, and Clinical Exam',
    injections: [
      {
        insertAtPosition: 1,
        block: {
          type: 'image',
          content: {
            url: '/images/lessons/m10-brain-death-sequence.svg',
            caption: 'Brain Death Determination Sequence: All prerequisites must be confirmed before starting the clinical exam. Time of death = time the apnea test is completed. Two attending physicians required per BNI protocol.'
          }
        }
      }
    ]
  }
];

// ── Helper: insert a block at a specific position in the blocks array ──────
function insertAtPosition(blocks, position, newBlock) {
  const result = [...blocks];
  result.splice(position, 0, newBlock);
  return result;
}

// ── Helper: insert a block after the first heading containing a keyword ─────
function insertAfterHeading(blocks, keyword, newBlock) {
  const idx = blocks.findIndex(
    b => b.type === 'heading' && b.content?.text?.toLowerCase().includes(keyword.toLowerCase())
  );
  if (idx === -1) {
    console.warn(`  ⚠️  Heading containing "${keyword}" not found — inserting at position 2`);
    return insertAtPosition(blocks, 2, newBlock);
  }
  // Insert right after that heading (and any immediately following paragraph)
  const result = [...blocks];
  result.splice(idx + 1, 0, newBlock);
  return result;
}

// ── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log('🦉 Sage — Injecting lesson visuals into Supabase\n');

  // Fetch all M05–M10 lessons
  const { data: lessons, error } = await sb
    .from('module_lessons')
    .select('id, title, content')
    .in('module_id', [
      '00672257-13b2-4e6d-b364-73e3da3dd26c', // M05
      'b7f29cb0-3158-4d02-8a57-d11ff8dbfe7f',  // M06
      '2306fd88-d9a7-4b12-99f3-25dbeffcfdf6',  // M07
      '433f60f4-6e4e-44b6-857b-435ebabbc05d',  // M08
      'c7d7896d-ccc8-4620-91cf-1da867b4219e',  // M09
      '4d6cc322-15e8-41a5-917b-58f98032401e'   // M10
    ]);

  if (error) {
    console.error('❌ Failed to fetch lessons:', error);
    process.exit(1);
  }

  let updated = 0;
  let skipped = 0;

  for (const injection of VISUAL_INJECTIONS) {
    const lesson = lessons.find(l => l.title === injection.lessonTitle);
    if (!lesson) {
      console.warn(`⚠️  Lesson not found: ${injection.lessonTitle}`);
      skipped++;
      continue;
    }

    let content;
    try {
      content = typeof lesson.content === 'string' ? JSON.parse(lesson.content) : lesson.content;
    } catch {
      console.error(`❌ Failed to parse content for: ${lesson.title}`);
      skipped++;
      continue;
    }

    if (!content?.blocks) {
      console.warn(`⚠️  No blocks found in: ${lesson.title}`);
      skipped++;
      continue;
    }

    let blocks = [...content.blocks];

    // Check if already injected (avoid duplicates)
    const alreadyHasImage = blocks.some(b => b.type === 'image');
    if (alreadyHasImage) {
      console.log(`⏭️  Already has images, skipping: ${lesson.title}`);
      skipped++;
      continue;
    }

    // Apply each injection for this lesson
    for (const inj of injection.injections) {
      if (inj.afterHeadingContaining) {
        blocks = insertAfterHeading(blocks, inj.afterHeadingContaining, inj.block);
        console.log(`  ✅ Inserted after heading "${inj.afterHeadingContaining}"`);
      } else if (typeof inj.insertAtPosition === 'number') {
        blocks = insertAtPosition(blocks, inj.insertAtPosition, inj.block);
        console.log(`  ✅ Inserted at position ${inj.insertAtPosition}`);
      }
    }

    const updatedContent = { ...content, blocks };

    const { error: updateError } = await sb
      .from('module_lessons')
      .update({ content: updatedContent })
      .eq('id', lesson.id);

    if (updateError) {
      console.error(`❌ Update failed for "${lesson.title}":`, updateError);
      skipped++;
    } else {
      console.log(`✅ ${lesson.title}`);
      updated++;
    }
  }

  console.log(`\n🎉 Done. Updated: ${updated} | Skipped: ${skipped}`);
}

main().catch(console.error);
