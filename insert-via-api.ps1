# Insert Module 5 and Lesson 2 via Supabase REST API

$SUPABASE_URL = "https://onrdlphtuditorofccna.supabase.co"
$ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ucmRscGh0dWRpdG9yb2ZjY25hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYwMDQ3NzEsImV4cCI6MTczMzc4MDc3MX0.LFMqhG-qPo7OJCJDx6_YM6Tq-yQDYEgBe-VlQpf6YlEY"

# Step 1: Check if Module 5 exists
Write-Host "🔍 Checking for Module 5..."
$checkModule = @{
    Uri     = "$SUPABASE_URL/rest/v1/curriculum_modules?name=eq.The Neurological Examination"
    Method  = "GET"
    Headers = @{
        "apikey"       = $ANON_KEY
        "Content-Type" = "application/json"
    }
} | Invoke-WebRequest

$modules = $checkModule.Content | ConvertFrom-Json
if ($modules.Count -gt 0) {
    Write-Host "✅ Module 5 found:" $modules[0].id
    $MODULE_ID = $modules[0].id
} else {
    Write-Host "📝 Creating Module 5..."
    
    $moduleBody = @{
        name               = "The Neurological Examination"
        description        = "Master the comprehensive neuro exam from foundations to specialized techniques in critical care."
        category           = "Pathophysiology"
        order_position     = 5
        estimated_hours    = 3.0
        is_required        = $true
    } | ConvertTo-Json
    
    $createModule = @{
        Uri     = "$SUPABASE_URL/rest/v1/curriculum_modules"
        Method  = "POST"
        Headers = @{
            "apikey"       = $ANON_KEY
            "Content-Type" = "application/json"
        }
        Body    = $moduleBody
    } | Invoke-WebRequest
    
    $newModule = $createModule.Content | ConvertFrom-Json
    Write-Host "✅ Module 5 created:" $newModule.id
    $MODULE_ID = $newModule.id
}

# Step 2: Insert Lesson 2
Write-Host "📝 Inserting Lesson 2..."

$lessonContent = @"
# Focused Exam in the Unconscious or Sedated Patient

## Overview
The neurological examination of an unconscious or sedated patient requires modification from the standard awake exam. This lesson focuses on the coma exam—a streamlined, systematic approach to assess the unconscious patient's neurological status.

## Learning Objectives
- Perform a focused neurological exam in sedated/unconscious patients
- Assess level of consciousness using standardized scales
- Evaluate pupillary function and brainstem reflexes
- Interpret motor and reflex findings
- Recognize patterns that suggest localization of injury

## What is the Coma Exam?

The **coma exam** is a streamlined assessment for unconscious patients. It prioritizes:
- **Consciousness level** (arousal, responsiveness)
- **Brainstem function** (pupils, eye movements, gag reflex)
- **Motor function** (tone, posture, response to stimuli)
- **Reflexes** (deep tendon, pathological)

## Part 1: Level of Consciousness - Glasgow Coma Scale (GCS)

The GCS is the gold standard for documenting consciousness level:

**Eye Opening (E):** 1-4 points
- 4 = Spontaneous
- 3 = To verbal command
- 2 = To pain
- 1 = No response

**Verbal Response (V):** 1-5 points
- 5 = Oriented, converses normally
- 4 = Disoriented conversation
- 3 = Inappropriate words
- 2 = Incomprehensible sounds
- 1 = No response

**Motor Response (M):** 1-6 points
- 6 = Obeys commands
- 5 = Localizes to pain
- 4 = Withdraws from pain
- 3 = Abnormal flexion (decorticate)
- 2 = Abnormal extension (decerebrate)
- 1 = No response

**Total GCS = E + V + M (range 3–15)**

## Part 2: Brainstem Function

### Pupillary Assessment
- Size: Normal 2-4mm
- Reactivity: Should constrict briskly to light
- Symmetry: Normally equal

Abnormal patterns:
- Pinpoint pupils: Pontine hemorrhage or opioid overdose
- Mid-fixed pupils: Midbrain dysfunction
- Blown pupil (one side): Uncal herniation (emergency)
- Sluggish pupils: Metabolic encephalopathy

### Brainstem Reflexes
- Oculocephalic reflex (Doll's Eyes): Eyes move opposite to head turn
- Corneal reflex: Touch cornea; both eyes should blink
- Gag reflex: Stimulate back of pharynx; should trigger contraction

## Part 3: Motor Examination

### Tone Assessment
- Flaccid: No resistance
- Normal: Slight resistance
- Rigid: Increased tone throughout
- Spastic: Velocity-dependent increase

### Posturing
- Decorticate (flexor): Arms flexed, legs extended → cerebral injury
- Decerebrate (extensor): All extremities extended → brainstem injury
- Flaccid: No posturing → spinal cord injury

## Part 4: Reflex Assessment

Deep Tendon Reflexes:
- Brisk: Upper motor neuron lesion
- Normal: Baseline
- Diminished: LMN or nerve injury
- Absent: Severe LMN injury

Pathological Reflexes:
- Babinski sign: Extensor plantar response → UMN lesion
- Clonus: Rhythmic jerking → hyperreflexia

## Video: Focused Neuro Exam in the Comatose Patient

Watch this demonstration: https://youtu.be/YFk3TEgaiTM

## Interpretation: What the Exam Tells You

GCS and Prognosis:
- GCS 3-5: Very severe, often irreversible
- GCS 6-8: Severe, significant morbidity
- GCS 9-12: Moderate, variable outcomes
- GCS 13-15: Mild, generally better prognosis

Motor Patterns:
- Localizing response: Better prognosis
- Decorticate: Cerebral injury with some brainstem function
- Decerebrate: Brainstem injury, worse prognosis
- Flaccid: Worst prognosis

## Key Takeaways

✅ The coma exam is a simplified, systematic approach for unconscious patients
✅ GCS is the standard for documenting consciousness
✅ Brainstem signs help localize injury
✅ Motor responses indicate severity and prognosis
✅ Serial exams matter more than one-time assessment
✅ Track changes and escalate when deteriorating
"@

$lessonBody = @{
    module_id                  = $MODULE_ID
    title                      = "Focused Exam in the Unconscious or Sedated Patient"
    content_type              = "lecture"
    body                      = $lessonContent
    order_position            = 2
    estimated_duration_minutes = 20
} | ConvertTo-Json -Depth 10

$createLesson = @{
    Uri     = "$SUPABASE_URL/rest/v1/module_lessons"
    Method  = "POST"
    Headers = @{
        "apikey"       = $ANON_KEY
        "Content-Type" = "application/json"
    }
    Body    = $lessonBody
} | Invoke-WebRequest

$newLesson = $createLesson.Content | ConvertFrom-Json
Write-Host "✅ Lesson 2 inserted successfully!"
Write-Host "📊 Lesson ID:" $newLesson.id
Write-Host "`n🎉 Done! Visit http://localhost:3000/modules to see Module 5, Lesson 2"
