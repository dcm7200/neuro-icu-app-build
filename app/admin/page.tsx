'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/lib/store'
import { Users, BookOpen, BarChart3, Settings, FileUp, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface AdminStats {
  totalUsers: number
  totalModules: number
  totalQuizzes: number
  completionRate: number
}

export default function AdminPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [recentActivity, setRecentActivity] = useState<any[]>([])

  useEffect(() => {
    const fetchStats = async () => {
      if (!user) return

      try {
        // Count users
        const { count: userCount } = await supabase
          .from('users')
          .select('*', { count: 'exact', head: true })

        // Count modules
        const { count: moduleCount } = await supabase
          .from('curriculum_modules')
          .select('*', { count: 'exact', head: true })

        // Count quizzes
        const { count: quizCount } = await supabase
          .from('quizzes')
          .select('*', { count: 'exact', head: true })

        // Calculate completion rate
        const { data: progressData } = await supabase
          .from('user_module_progress')
          .select('status')

        const completed = progressData?.filter((p) => p.status === 'completed').length || 0
        const total = progressData?.length || 1
        const completionRate = Math.round((completed / total) * 100)

        // Recent quiz attempts
        const { data: attempts } = await supabase
          .from('quiz_attempts')
          .select(
            `
            *,
            users (
              first_name,
              last_name
            )
          `
          )
          .order('attempted_at', { ascending: false })
          .limit(5)

        setStats({
          totalUsers: userCount || 0,
          totalModules: moduleCount || 0,
          totalQuizzes: quizCount || 0,
          completionRate,
        })

        setRecentActivity(attempts || [])
      } catch (err) {
        console.error('Error fetching stats:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [user])

  const adminCards = [
    {
      title: 'Manage Users',
      description: 'Create, edit, and manage user accounts',
      icon: Users,
      href: '/admin/users',
      color: 'blue',
    },
    {
      title: 'Bulk Import',
      description: 'Import multiple users via CSV',
      icon: FileUp,
      href: '/admin/import',
      color: 'green',
    },
    {
      title: 'Add Rich Lesson',
      description: 'Create beautiful, interactive lessons',
      icon: BookOpen,
      href: '/admin/add-lesson-rich',
      color: 'purple',
    },

    {
      title: 'Content Management',
      description: 'Create and manage modules and quizzes',
      icon: BookOpen,
      href: '/admin/content',
      color: 'pink',
    },
    {
      title: 'Reports & Analytics',
      description: 'View progress and performance reports',
      icon: BarChart3,
      href: '/admin/reports',
      color: 'orange',
    },
  ]

  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200 hover:shadow-lg hover:shadow-blue-100',
    green: 'bg-green-50 border-green-200 hover:shadow-lg hover:shadow-green-100',
    purple: 'bg-purple-50 border-purple-200 hover:shadow-lg hover:shadow-purple-100',
    indigo: 'bg-indigo-50 border-indigo-200 hover:shadow-lg hover:shadow-indigo-100',
    pink: 'bg-pink-50 border-pink-200 hover:shadow-lg hover:shadow-pink-100',
    orange: 'bg-orange-50 border-orange-200 hover:shadow-lg hover:shadow-orange-100',
  }

  const iconColorClasses = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    purple: 'text-purple-600',
    indigo: 'text-indigo-600',
    pink: 'text-pink-600',
    orange: 'text-orange-600',
  }

  if (loading) {
    return (
      <div className='flex items-center justify-center py-12'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600'></div>
      </div>
    )
  }

  return (
    <div className='max-w-6xl mx-auto'>
      {/* Header */}
      <div className='mb-8'>
        <h1 className='text-4xl font-bold text-gray-900'>Admin Dashboard</h1>
        <p className='text-gray-600 mt-2'>Manage users, content, and view analytics</p>
      </div>

      {/* Stats */}
      {stats && (
        <div className='grid grid-cols-4 gap-4 mb-8'>
          <div className='bg-white p-6 rounded-lg shadow border border-gray-200'>
            <p className='text-4xl font-bold text-blue-600'>{stats.totalUsers}</p>
            <p className='text-gray-600 font-semibold mt-2'>Total Users</p>
          </div>
          <div className='bg-white p-6 rounded-lg shadow border border-gray-200'>
            <p className='text-4xl font-bold text-green-600'>{stats.totalModules}</p>
            <p className='text-gray-600 font-semibold mt-2'>Modules</p>
          </div>
          <div className='bg-white p-6 rounded-lg shadow border border-gray-200'>
            <p className='text-4xl font-bold text-purple-600'>{stats.totalQuizzes}</p>
            <p className='text-gray-600 font-semibold mt-2'>Quizzes</p>
          </div>
          <div className='bg-white p-6 rounded-lg shadow border border-gray-200'>
            <p className='text-4xl font-bold text-orange-600'>{stats.completionRate}%</p>
            <p className='text-gray-600 font-semibold mt-2'>Completion Rate</p>
          </div>
        </div>
      )}

      {/* Admin Functions */}
      <div className='grid grid-cols-2 gap-6 mb-8'>
        {adminCards.map((card) => {
          const Icon = card.icon
          const colorClass = colorClasses[card.color as keyof typeof colorClasses]
          const iconColor = iconColorClasses[card.color as keyof typeof iconColorClasses]

          return (
            <Link
              key={card.href}
              href={card.href}
              className={`border-2 rounded-lg p-6 transition cursor-pointer ${colorClass}`}
            >
              <div className='flex items-start justify-between'>
                <div className='flex-1'>
                  <div className='flex items-center gap-3 mb-2'>
                    <Icon className={`w-8 h-8 ${iconColor}`} />
                    <h3 className='text-lg font-bold text-gray-900'>{card.title}</h3>
                  </div>
                  <p className='text-gray-600'>{card.description}</p>
                </div>
                <ArrowRight className='w-5 h-5 text-gray-400 flex-shrink-0 mt-2' />
              </div>
            </Link>
          )
        })}
      </div>

      {/* Recent Activity */}
      <div className='bg-white rounded-lg shadow border border-gray-200 p-6'>
        <h2 className='text-xl font-bold text-gray-900 mb-4'>Recent Quiz Activity</h2>

        {recentActivity.length === 0 ? (
          <p className='text-gray-600 text-center py-8'>No recent activity</p>
        ) : (
          <div className='space-y-3'>
            {recentActivity.map((activity) => (
              <div key={activity.id} className='flex items-center justify-between p-4 bg-gray-50 rounded border border-gray-200'>
                <div>
                  <p className='font-semibold text-gray-900'>
                    {(activity.users as any)?.first_name} {(activity.users as any)?.last_name}
                  </p>
                  <p className='text-sm text-gray-600'>
                    {activity.passed ? '✓ Passed' : '✗ Failed'} - Score: {activity.score}%
                  </p>
                </div>
                <p className='text-sm text-gray-500'>
                  {new Date(activity.attempted_at).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
