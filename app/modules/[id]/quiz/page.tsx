'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/lib/store'
import { Database } from '@/types/database'
import { CheckCircle, XCircle, Clock, ArrowLeft } from 'lucide-react'

type Quiz = Database['public']['Tables']['quizzes']['Row']
type QuizQuestion = Database['public']['Tables']['quiz_questions']['Row']
type QuizAttempt = Database['public']['Tables']['quiz_attempts']['Row']

interface QuestionWithOptions extends QuizQuestion {
  options: Array<{
    id: string
    question_id: string
    text: string
    is_correct: boolean
    order_position: number
  }>
}

export default function QuizPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const moduleId = params.id as string

  const [quiz, setQuiz] = useState<Quiz | null>(null)
  const [questions, setQuestions] = useState<QuestionWithOptions[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [quizStarted, setQuizStarted] = useState(false)
  const [quizComplete, setQuizComplete] = useState(false)
  const [score, setScore] = useState(0)
  const [attempts, setAttempts] = useState(0)
  const [maxAttempts, setMaxAttempts] = useState(3)

  useEffect(() => {
    const fetchQuizData = async () => {
      if (!user || !moduleId) return

      try {
        // Fetch quiz for this module
        const { data: quizData, error: quizError } = await supabase
          .from('quizzes')
          .select('*')
          .eq('module_id', moduleId)
          .single()

        if (quizError && quizError.code !== 'PGRST116') throw quizError
        if (!quizData) {
          // No quiz for this module
          router.push(`/modules/${moduleId}`)
          return
        }

        setQuiz(quizData)
        setMaxAttempts(quizData.max_attempts || 3)

        // Fetch questions and options
        const { data: questionsData, error: questionsError } = await supabase
          .from('quiz_questions')
          .select(
            `
            *,
            quiz_options (
              id,
              question_id,
              text,
              is_correct,
              order_position
            )
          `
          )
          .eq('quiz_id', quizData.id)
          .order('order_position')

        if (questionsError) throw questionsError

        setQuestions(
          questionsData.map((q: any) => ({
            ...q,
            options: (q.quiz_options || []).sort((a: any, b: any) => a.order_position - b.order_position),
          })) || []
        )

        // Fetch attempt count
        const { count, error: countError } = await supabase
          .from('quiz_attempts')
          .select('*', { count: 'exact' })
          .eq('user_id', user.id)
          .eq('quiz_id', quizData.id)

        if (countError) throw countError
        setAttempts(count || 0)
      } catch (err) {
        console.error('Error fetching quiz:', err)
        router.push(`/modules/${moduleId}`)
      } finally {
        setLoading(false)
      }
    }

    fetchQuizData()
  }, [user, moduleId, router])

  const handleAnswerSelect = (optionId: string) => {
    const currentQuestion = questions[currentQuestionIndex]
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion.id]: optionId,
    })
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const handleSubmitQuiz = async () => {
    if (submitting || !quiz || !user) return

    setSubmitting(true)
    try {
      // Calculate score
      let correctCount = 0
      const answers = selectedAnswers

      questions.forEach((question) => {
        const selectedOptionId = answers[question.id]
        if (selectedOptionId) {
          const selectedOption = question.options.find((o) => o.id === selectedOptionId)
          if (selectedOption?.is_correct) {
            correctCount++
          }
        }
      })

      const scorePercentage = Math.round((correctCount / questions.length) * 100)

      // Check if passed
      const passingScore = quiz.passing_score || 80
      const passed = scorePercentage >= passingScore

      // Save attempt to database
      const { error: attemptError } = await supabase.from('quiz_attempts').insert([
        {
          user_id: user.id,
          quiz_id: quiz.id,
          module_id: moduleId,
          score: scorePercentage,
          passed,
          answered_questions: Object.keys(answers).length,
          total_questions: questions.length,
          attempted_at: new Date().toISOString(),
        },
      ] as any)

      if (attemptError) throw attemptError

      // Save individual answers
      const answerRecords = Object.entries(answers).map(([questionId, optionId]) => ({
        user_id: user.id,
        question_id: questionId,
        selected_option_id: optionId,
        is_correct: questions
          .find((q) => q.id === questionId)
          ?.options.find((o) => o.id === optionId)?.is_correct,
      }))

      if (answerRecords.length > 0) {
        const { error: answersError } = await supabase.from('quiz_attempt_answers').insert(answerRecords as any)
        if (answersError) throw answersError
      }

      // Update module progress if passed
      if (passed) {
        const { error: progressError } = await supabase
          .from('user_module_progress')
          .update({
            status: 'completed',
            progress_percent: 100,
            completed_at: new Date().toISOString(),
          })
          .eq('user_id', user.id)
          .eq('module_id', moduleId)

        if (progressError) throw progressError
      }

      setScore(scorePercentage)
      setQuizComplete(true)
    } catch (err) {
      console.error('Error submitting quiz:', err)
      alert('Failed to submit quiz. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-screen bg-gray-50'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4'></div>
          <p className='text-gray-600'>Loading quiz...</p>
        </div>
      </div>
    )
  }

  if (!quiz || questions.length === 0) {
    return (
      <div className='flex items-center justify-center min-h-screen bg-gray-50'>
        <div className='text-center'>
          <p className='text-gray-600 mb-4'>No quiz available for this module.</p>
          <button
            onClick={() => router.push(`/modules/${moduleId}`)}
            className='flex items-center gap-2 mx-auto text-blue-600 hover:text-blue-800'
          >
            <ArrowLeft size={20} /> Back to Module
          </button>
        </div>
      </div>
    )
  }

  if (quizComplete) {
    const passed = score >= (quiz.passing_score || 80)
    return (
      <div className='max-w-2xl mx-auto p-6'>
        <div className='bg-white rounded-lg shadow-md p-8 text-center'>
          {passed ? (
            <>
              <CheckCircle className='w-16 h-16 text-green-500 mx-auto mb-4' />
              <h1 className='text-3xl font-bold text-gray-900 mb-2'>Quiz Passed! 🎉</h1>
              <p className='text-xl text-gray-600 mb-4'>You scored {score}%</p>
            </>
          ) : (
            <>
              <XCircle className='w-16 h-16 text-red-500 mx-auto mb-4' />
              <h1 className='text-3xl font-bold text-gray-900 mb-2'>Quiz Not Passed</h1>
              <p className='text-xl text-gray-600 mb-4'>
                You scored {score}%. Passing score is {quiz.passing_score || 80}%.
              </p>
            </>
          )}

          <div className='my-6 bg-gray-50 p-4 rounded border'>
            <p className='text-gray-700 mb-2'>
              <strong>Attempt {attempts + 1}</strong> of {maxAttempts}
            </p>
            <p className='text-sm text-gray-600'>
              {attempts + 1 < maxAttempts
                ? `You have ${maxAttempts - (attempts + 1)} attempt(s) remaining.`
                : 'This was your last attempt.'}
            </p>
          </div>

          <div className='flex gap-4 justify-center mt-6'>
            {!passed && attempts < maxAttempts && (
              <button
                onClick={() => {
                  setQuizComplete(false)
                  setQuizStarted(false)
                  setCurrentQuestionIndex(0)
                  setSelectedAnswers({})
                }}
                className='px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'
              >
                Retry Quiz
              </button>
            )}
            <button
              onClick={() => router.push(`/modules/${moduleId}`)}
              className='px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700'
            >
              Back to Module
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (!quizStarted) {
    return (
      <div className='max-w-2xl mx-auto p-6'>
        <button
          onClick={() => router.push(`/modules/${moduleId}`)}
          className='flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6'
        >
          <ArrowLeft size={20} /> Back
        </button>

        <div className='bg-white rounded-lg shadow-md p-8'>
          <h1 className='text-3xl font-bold text-gray-900 mb-4'>{quiz.title}</h1>
          <p className='text-gray-600 mb-6'>{quiz.description || 'Test your knowledge'}</p>

          <div className='space-y-4 mb-6'>
            <div className='flex items-start gap-3'>
              <Clock className='w-5 h-5 text-blue-600 mt-1 flex-shrink-0' />
              <div>
                <p className='font-semibold text-gray-900'>Number of Questions</p>
                <p className='text-gray-600'>{questions.length} questions</p>
              </div>
            </div>
            <div className='flex items-start gap-3'>
              <CheckCircle className='w-5 h-5 text-blue-600 mt-1 flex-shrink-0' />
              <div>
                <p className='font-semibold text-gray-900'>Passing Score</p>
                <p className='text-gray-600'>{quiz.passing_score || 80}% or higher</p>
              </div>
            </div>
            <div className='flex items-start gap-3'>
              <Clock className='w-5 h-5 text-blue-600 mt-1 flex-shrink-0' />
              <div>
                <p className='font-semibold text-gray-900'>Attempts Remaining</p>
                <p className='text-gray-600'>
                  {maxAttempts - attempts} of {maxAttempts}
                </p>
              </div>
            </div>
          </div>

          {attempts >= maxAttempts ? (
            <div className='bg-red-50 border border-red-200 rounded p-4 mb-6'>
              <p className='text-red-800'>You have used all available attempts for this quiz.</p>
            </div>
          ) : (
            <button
              onClick={() => setQuizStarted(true)}
              className='w-full px-6 py-3 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700'
            >
              Start Quiz
            </button>
          )}
        </div>
      </div>
    )
  }

  const currentQuestion = questions[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === questions.length - 1
  const allAnswered = Object.keys(selectedAnswers).length === questions.length

  return (
    <div className='max-w-2xl mx-auto p-6'>
      <div className='mb-6'>
        <div className='flex justify-between items-center mb-2'>
          <h2 className='text-sm font-semibold text-gray-700'>
            Question {currentQuestionIndex + 1} of {questions.length}
          </h2>
          <span className='text-sm text-gray-600'>{quiz.title}</span>
        </div>
        <div className='w-full bg-gray-200 rounded-full h-2'>
          <div
            className='bg-blue-600 h-2 rounded-full transition-all'
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className='bg-white rounded-lg shadow-md p-6 mb-6'>
        <h3 className='text-lg font-semibold text-gray-900 mb-6'>{currentQuestion.question_text}</h3>

        <div className='space-y-3'>
          {currentQuestion.options.map((option) => (
            <label key={option.id} className='flex items-center p-4 border-2 rounded cursor-pointer hover:bg-blue-50 transition' style={{
              borderColor: selectedAnswers[currentQuestion.id] === option.id ? '#2563eb' : '#e5e7eb',
              backgroundColor: selectedAnswers[currentQuestion.id] === option.id ? '#eff6ff' : 'transparent',
            }}>
              <input
                type='radio'
                name={`question-${currentQuestion.id}`}
                value={option.id}
                checked={selectedAnswers[currentQuestion.id] === option.id}
                onChange={() => handleAnswerSelect(option.id)}
                className='w-4 h-4 text-blue-600 cursor-pointer'
              />
              <span className='ml-3 text-gray-900'>{option.text}</span>
            </label>
          ))}
        </div>
      </div>

      <div className='flex gap-4 justify-between'>
        <button
          onClick={handlePreviousQuestion}
          disabled={currentQuestionIndex === 0}
          className='px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 disabled:bg-gray-400'
        >
          Previous
        </button>

        <div className='flex gap-2'>
          {currentQuestionIndex < questions.length - 1 && (
            <button
              onClick={handleNextQuestion}
              disabled={!selectedAnswers[currentQuestion.id]}
              className='px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 disabled:bg-gray-400'
            >
              Next
            </button>
          )}
          {isLastQuestion && (
            <button
              onClick={handleSubmitQuiz}
              disabled={!allAnswered || submitting}
              className='px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400'
            >
              {submitting ? 'Submitting...' : 'Submit Quiz'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
