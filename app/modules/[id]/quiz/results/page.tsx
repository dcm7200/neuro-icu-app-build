'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/lib/store'
import { Database } from '@/types/database'
import { ArrowLeft, CheckCircle, XCircle } from 'lucide-react'

type Quiz = Database['public']['Tables']['quizzes']['Row']
type QuizAttempt = Database['public']['Tables']['quiz_attempts']['Row']
type QuizQuestion = Database['public']['Tables']['quiz_questions']['Row']

interface QuestionReview extends QuizQuestion {
  userAnswer?: string
  isCorrect?: boolean
  feedbackText?: string
}

export default function QuizResultsPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const moduleId = params.id as string
  const attemptId = (params.attemptId || '') as string

  const [attempt, setAttempt] = useState<QuizAttempt | null>(null)
  const [quiz, setQuiz] = useState<Quiz | null>(null)
  const [questions, setQuestions] = useState<QuestionReview[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchResults = async () => {
      if (!user || !attemptId) return

      try {
        // Fetch the quiz attempt
        const { data: attemptData, error: attemptError } = await supabase
          .from('quiz_attempts')
          .select('*')
          .eq('id', attemptId)
          .eq('user_id', user.id)
          .single()

        if (attemptError) throw attemptError
        setAttempt(attemptData)

        // Fetch the quiz
        const { data: quizData, error: quizError } = await supabase
          .from('quizzes')
          .select('*')
          .eq('id', attemptData.quiz_id)
          .single()

        if (quizError) throw quizError
        setQuiz(quizData)

        // Fetch questions with review
        const { data: questionsData, error: questionsError } = await supabase
          .from('quiz_questions')
          .select('*')
          .eq('quiz_id', quizData.id)
          .order('order_position')

        if (questionsError) throw questionsError

        // Fetch user answers
        const { data: answersData, error: answersError } = await supabase
          .from('quiz_attempt_answers')
          .select(
            `
            *,
            quiz_options (
              id,
              text,
              is_correct
            )
          `
          )
          .eq('user_id', user.id)
          .in('question_id', questionsData?.map((q) => q.id) || [])

        if (answersError) throw answersError

        const reviewed = questionsData.map((q: any) => {
          const answer = answersData?.find((a: any) => a.question_id === q.id)
          return {
            ...q,
            userAnswer: answer?.quiz_options?.text || 'Not answered',
            isCorrect: answer?.is_correct,
            feedbackText: q.feedback_text || 'No feedback available',
          }
        })

        setQuestions(reviewed)
      } catch (err) {
        console.error('Error fetching results:', err)
        router.push(`/modules/${moduleId}/quiz`)
      } finally {
        setLoading(false)
      }
    }

    fetchResults()
  }, [user, attemptId, moduleId, router])

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-screen bg-gray-50'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4'></div>
          <p className='text-gray-600'>Loading results...</p>
        </div>
      </div>
    )
  }

  if (!attempt || !quiz) {
    return (
      <div className='flex items-center justify-center min-h-screen bg-gray-50'>
        <div className='text-center'>
          <p className='text-gray-600 mb-4'>Results not found.</p>
          <button
            onClick={() => router.back()}
            className='flex items-center gap-2 mx-auto text-blue-600 hover:text-blue-800'
          >
            <ArrowLeft size={20} /> Go Back
          </button>
        </div>
      </div>
    )
  }

  const passed = attempt.passed
  const passingScore = quiz.passing_score || 80

  return (
    <div className='max-w-3xl mx-auto p-6'>
      <button
        onClick={() => router.push(`/modules/${moduleId}`)}
        className='flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6'
      >
        <ArrowLeft size={20} /> Back to Module
      </button>

      <div className='bg-white rounded-lg shadow-md p-8 mb-6'>
        <div className='text-center mb-6'>
          {passed ? (
            <>
              <CheckCircle className='w-16 h-16 text-green-500 mx-auto mb-4' />
              <h1 className='text-3xl font-bold text-gray-900'>Quiz Passed!</h1>
            </>
          ) : (
            <>
              <XCircle className='w-16 h-16 text-red-500 mx-auto mb-4' />
              <h1 className='text-3xl font-bold text-gray-900'>Quiz Not Passed</h1>
            </>
          )}
        </div>

        <div className='grid grid-cols-3 gap-4 mb-6'>
          <div className='text-center border-b-2 border-gray-200 pb-4'>
            <p className='text-3xl font-bold text-blue-600'>{attempt.score}%</p>
            <p className='text-gray-600'>Your Score</p>
          </div>
          <div className='text-center border-b-2 border-gray-200 pb-4'>
            <p className='text-3xl font-bold text-gray-900'>{passingScore}%</p>
            <p className='text-gray-600'>Passing Score</p>
          </div>
          <div className='text-center border-b-2 border-gray-200 pb-4'>
            <p className='text-3xl font-bold text-gray-900'>
              {attempt.answered_questions}/{attempt.total_questions}
            </p>
            <p className='text-gray-600'>Answered</p>
          </div>
        </div>

        <div className='space-y-4'>
          <h2 className='text-xl font-bold text-gray-900 mb-4'>Review Your Answers</h2>
          {questions.map((question, index) => (
            <div key={question.id} className='border rounded-lg p-4'>
              <div className='flex items-start gap-3 mb-3'>
                {question.isCorrect ? (
                  <CheckCircle className='w-5 h-5 text-green-500 flex-shrink-0 mt-1' />
                ) : (
                  <XCircle className='w-5 h-5 text-red-500 flex-shrink-0 mt-1' />
                )}
                <div className='flex-1'>
                  <p className='font-semibold text-gray-900'>
                    Question {index + 1}: {question.question_text}
                  </p>
                  <p className='text-sm text-gray-600 mt-1'>
                    Your answer: <strong>{question.userAnswer}</strong>
                  </p>
                  {question.feedbackText && (
                    <div className='mt-2 bg-blue-50 border-l-4 border-blue-500 p-3 text-sm'>
                      <p className='text-gray-700'>{question.feedbackText}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='flex gap-4 justify-center'>
        <button
          onClick={() => router.push(`/modules/${moduleId}`)}
          className='px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700'
        >
          Back to Module
        </button>
        <button
          onClick={() => router.push('/dashboard')}
          className='px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  )
}
