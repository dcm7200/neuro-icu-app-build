'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Database } from '@/types/database'
import { Download, TrendingUp } from 'lucide-react'

type QuizAttempt = Database['public']['Tables']['quiz_attempts']['Row']
type UserModuleProgress = Database['public']['Tables']['user_module_progress']['Row']

interface ReportData {
  totalQuizAttempts: number
  averageScore: number
  passRate: number
  moduleCompletion: number
  recentAttempts: any[]
  topPerformers: any[]
  strugglingUsers: any[]
}

export default function ReportsPage() {
  const [report, setReport] = useState<ReportData | null>(null)
  const [loading, setLoading] = useState(true)
  const [dateRange, setDateRange] = useState('all')

  useEffect(() => {
    const fetchReports = async () => {
      try {
        // Quiz attempts
        const { data: attempts } = await supabase
          .from('quiz_attempts')
          .select(`
            *,
            users (
              id,
              first_name,
              last_name,
              email
            )
          `)
          .order('attempted_at', { ascending: false })

        const filteredAttempts = attempts || []

        // Calculate metrics
        const passedAttempts = filteredAttempts.filter((a) => a.passed).length
        const passRate = filteredAttempts.length > 0 ? (passedAttempts / filteredAttempts.length) * 100 : 0
        const avgScore =
          filteredAttempts.length > 0
            ? filteredAttempts.reduce((sum, a) => sum + a.score, 0) / filteredAttempts.length
            : 0

        // Module progress
        const { data: progressData } = await supabase.from('user_module_progress').select('status')

        const completed = progressData?.filter((p) => p.status === 'completed').length || 0
        const total = progressData?.length || 1
        const moduleCompletion = (completed / total) * 100

        // Top performers (users with highest average score)
        const userScores: Record<string, { name: string; email: string; scores: number[] }> = {}

        filteredAttempts.forEach((attempt) => {
          const userId = (attempt.users as any)?.id
          const userName = `${(attempt.users as any)?.first_name} ${(attempt.users as any)?.last_name}`
          const userEmail = (attempt.users as any)?.email

          if (!userScores[userId]) {
            userScores[userId] = { name: userName, email: userEmail, scores: [] }
          }
          userScores[userId].scores.push(attempt.score)
        })

        const topPerformers = Object.values(userScores)
          .map((u) => ({
            name: u.name,
            email: u.email,
            avgScore: Math.round(u.scores.reduce((a, b) => a + b, 0) / u.scores.length),
            attempts: u.scores.length,
          }))
          .sort((a, b) => b.avgScore - a.avgScore)
          .slice(0, 5)

        const strugglingUsers = Object.values(userScores)
          .map((u) => ({
            name: u.name,
            email: u.email,
            avgScore: Math.round(u.scores.reduce((a, b) => a + b, 0) / u.scores.length),
            attempts: u.scores.length,
          }))
          .filter((u) => u.avgScore < 80)
          .sort((a, b) => a.avgScore - b.avgScore)
          .slice(0, 5)

        setReport({
          totalQuizAttempts: filteredAttempts.length,
          averageScore: Math.round(avgScore * 10) / 10,
          passRate: Math.round(passRate * 10) / 10,
          moduleCompletion: Math.round(moduleCompletion * 10) / 10,
          recentAttempts: filteredAttempts.slice(0, 10),
          topPerformers,
          strugglingUsers,
        })
      } catch (err) {
        console.error('Error fetching reports:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchReports()
  }, [dateRange])

  const handleExportReport = () => {
    if (!report) return

    const reportContent = `
Neuro ICU Onboarding App - Performance Report
Generated: ${new Date().toLocaleString()}

=== SUMMARY METRICS ===
Total Quiz Attempts: ${report.totalQuizAttempts}
Average Score: ${report.averageScore}%
Pass Rate: ${report.passRate}%
Module Completion Rate: ${report.moduleCompletion}%

=== TOP PERFORMERS ===
${report.topPerformers.map((u) => `${u.name} - Avg Score: ${u.avgScore}% (${u.attempts} attempts)`).join('\n')}

=== STRUGGLING USERS (Score < 80%) ===
${report.strugglingUsers.map((u) => `${u.name} - Avg Score: ${u.avgScore}% (${u.attempts} attempts)`).join('\n')}

=== RECENT QUIZ ATTEMPTS ===
${report.recentAttempts
  .map(
    (a) =>
      `${(a.users as any)?.first_name} ${(a.users as any)?.last_name} - Score: ${a.score}% - ${a.passed ? 'PASSED' : 'FAILED'} - ${new Date(a.attempted_at).toLocaleString()}`
  )
  .join('\n')}
    `.trim()

    const blob = new Blob([reportContent], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `report_${new Date().toISOString().split('T')[0]}.txt`
    a.click()
  }

  if (loading) {
    return (
      <div className='flex items-center justify-center py-12'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600'></div>
      </div>
    )
  }

  if (!report) {
    return (
      <div className='text-center py-12'>
        <p className='text-gray-600'>No data available yet</p>
      </div>
    )
  }

  return (
    <div className='max-w-6xl mx-auto'>
      {/* Header */}
      <div className='flex justify-between items-center mb-6'>
        <div>
          <h1 className='text-3xl font-bold text-gray-900'>Reports & Analytics</h1>
          <p className='text-gray-600 mt-1'>Track learner progress and performance</p>
        </div>
        <button
          onClick={handleExportReport}
          className='flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition'
        >
          <Download size={18} /> Export Report
        </button>
      </div>

      {/* Key Metrics */}
      <div className='grid grid-cols-4 gap-4 mb-8'>
        <div className='bg-white p-6 rounded-lg shadow border border-gray-200'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-gray-600 text-sm font-semibold'>Total Quiz Attempts</p>
              <p className='text-4xl font-bold text-blue-600 mt-2'>{report.totalQuizAttempts}</p>
            </div>
            <TrendingUp className='w-10 h-10 text-blue-200' />
          </div>
        </div>

        <div className='bg-white p-6 rounded-lg shadow border border-gray-200'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-gray-600 text-sm font-semibold'>Average Score</p>
              <p className='text-4xl font-bold text-green-600 mt-2'>{report.averageScore}%</p>
            </div>
            <TrendingUp className='w-10 h-10 text-green-200' />
          </div>
        </div>

        <div className='bg-white p-6 rounded-lg shadow border border-gray-200'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-gray-600 text-sm font-semibold'>Pass Rate</p>
              <p className='text-4xl font-bold text-purple-600 mt-2'>{report.passRate}%</p>
            </div>
            <TrendingUp className='w-10 h-10 text-purple-200' />
          </div>
        </div>

        <div className='bg-white p-6 rounded-lg shadow border border-gray-200'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-gray-600 text-sm font-semibold'>Module Completion</p>
              <p className='text-4xl font-bold text-orange-600 mt-2'>{report.moduleCompletion}%</p>
            </div>
            <TrendingUp className='w-10 h-10 text-orange-200' />
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className='grid grid-cols-2 gap-6 mb-8'>
        {/* Top Performers */}
        <div className='bg-white rounded-lg shadow border border-gray-200 p-6'>
          <h2 className='text-xl font-bold text-gray-900 mb-4'>🏆 Top Performers</h2>
          <div className='space-y-3'>
            {report.topPerformers.map((user, i) => (
              <div key={i} className='flex items-center justify-between p-3 bg-green-50 rounded border border-green-200'>
                <div>
                  <p className='font-semibold text-gray-900'>{user.name}</p>
                  <p className='text-xs text-gray-600'>{user.email}</p>
                </div>
                <div className='text-right'>
                  <p className='font-bold text-green-600'>{user.avgScore}%</p>
                  <p className='text-xs text-gray-600'>{user.attempts} attempts</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Struggling Users */}
        <div className='bg-white rounded-lg shadow border border-gray-200 p-6'>
          <h2 className='text-xl font-bold text-gray-900 mb-4'>⚠️ Need Support (Score &lt; 80%)</h2>
          {report.strugglingUsers.length === 0 ? (
            <p className='text-gray-600 text-center py-6'>All users are performing well! 🎉</p>
          ) : (
            <div className='space-y-3'>
              {report.strugglingUsers.map((user, i) => (
                <div key={i} className='flex items-center justify-between p-3 bg-red-50 rounded border border-red-200'>
                  <div>
                    <p className='font-semibold text-gray-900'>{user.name}</p>
                    <p className='text-xs text-gray-600'>{user.email}</p>
                  </div>
                  <div className='text-right'>
                    <p className='font-bold text-red-600'>{user.avgScore}%</p>
                    <p className='text-xs text-gray-600'>{user.attempts} attempts</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recent Quiz Attempts */}
      <div className='bg-white rounded-lg shadow border border-gray-200 p-6'>
        <h2 className='text-xl font-bold text-gray-900 mb-4'>Recent Quiz Attempts</h2>
        <div className='overflow-x-auto'>
          <table className='w-full text-sm'>
            <thead className='bg-gray-100 border-b'>
              <tr>
                <th className='px-4 py-3 text-left font-semibold'>User</th>
                <th className='px-4 py-3 text-left font-semibold'>Score</th>
                <th className='px-4 py-3 text-left font-semibold'>Status</th>
                <th className='px-4 py-3 text-left font-semibold'>Date</th>
              </tr>
            </thead>
            <tbody>
              {report.recentAttempts.map((attempt) => (
                <tr key={attempt.id} className='border-b hover:bg-gray-50'>
                  <td className='px-4 py-3'>
                    <div>
                      <p className='font-semibold text-gray-900'>
                        {(attempt.users as any)?.first_name} {(attempt.users as any)?.last_name}
                      </p>
                      <p className='text-xs text-gray-600'>{(attempt.users as any)?.email}</p>
                    </div>
                  </td>
                  <td className='px-4 py-3'>
                    <p className='font-bold'>{attempt.score}%</p>
                  </td>
                  <td className='px-4 py-3'>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        attempt.passed
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {attempt.passed ? '✓ Passed' : '✗ Failed'}
                    </span>
                  </td>
                  <td className='px-4 py-3 text-gray-600'>{new Date(attempt.attempted_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
