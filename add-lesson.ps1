$url = 'https://onrdlphtuditorofccna.supabase.co/rest/v1/curriculum_modules'
$apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ucmRscGh0dWRpdG9yb2ZjY25hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4MTAzNTcsImV4cCI6MjA5NDM4NjM1N30.VjRYh5PblksFZIIPsrTaUQK-2fJTq5fGR7_f0d2YlEY'

$headers = @{
    'apikey' = $apiKey
    'Content-Type' = 'application/json'
}

$body = @{
    name = 'The Neurological Examination'
    description = 'Master the comprehensive neuro exam from foundations to specialized techniques in critical care.'
    category = 'Pathophysiology'
    order_position = 5
    estimated_hours = 3.0
    is_required = $true
} | ConvertTo-Json

Write-Host 'Creating Module 5...'
$response = Invoke-WebRequest -Uri $url -Method POST -Headers $headers -Body $body
$module = $response.Content | ConvertFrom-Json
$moduleId = $module[0].id

Write-Host "Module created with ID: $moduleId"

# Now insert the lesson
$lessonUrl = 'https://onrdlphtuditorofccna.supabase.co/rest/v1/module_lessons'
$lessonBody = @{
    module_id = $moduleId
    title = 'Focused Exam in the Unconscious or Sedated Patient'
    content_type = 'lecture'
    body = 'Focused Exam in the Unconscious or Sedated Patient. Lesson on coma exam, Glasgow Coma Scale, brainstem reflexes, and motor assessment. Video: https://youtu.be/YFk3TEgaiTM'
    order_position = 2
    estimated_duration_minutes = 20
} | ConvertTo-Json

Write-Host 'Creating Lesson 2...'
$lessonResponse = Invoke-WebRequest -Uri $lessonUrl -Method POST -Headers $headers -Body $lessonBody
$lesson = $lessonResponse.Content | ConvertFrom-Json
$lessonId = $lesson[0].id

Write-Host "Lesson created with ID: $lessonId"
Write-Host "Done! Visit http://localhost:3000/modules"
