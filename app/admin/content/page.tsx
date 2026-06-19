'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Database } from '@/types/database'
import { Plus, Edit2, Trash2, ChevronDown, ChevronUp } from 'lucide-react'

type Module = Database['public']['Tables']['curriculum_modules']['Row']
type Lesson = Database['public']['Tables']['module_lessons']['Row']

interface ModuleWithLessons extends Module {
  lessons?: Lesson[]
  expanded?: boolean
}

export default function ContentPage() {
  const [modules, setModules] = useState<ModuleWithLessons[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [editingModule, setEditingModule] = useState<Module | null>(null)
  const [expandedModule, setExpandedModule] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Foundation',
    estimated_hours: 1,
  })

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const { data, error } = await supabase
          .from('curriculum_modules')
          .select(`
            *,
            module_lessons (
              id,
              title,
              content_type,
              estimated_duration_minutes,
              order_position
            )
          `)
          .order('display_order')

        if (error) throw error
        setModules(data || [])
      } catch (err) {
        console.error('Error fetching modules:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchModules()
  }, [])

  const handleCreateModule = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.description) {
      alert('Please fill in all required fields')
      return
    }

    try {
      const { error } = await supabase.from('curriculum_modules').insert([
        {
          name: formData.name,
          description: formData.description,
          category: formData.category,
          estimated_hours: formData.estimated_hours,
          display_order: modules.length + 1,
        },
      ] as any)

      if (error) throw error

      // Refresh modules list
      const { data } = await supabase
        .from('curriculum_modules')
        .select(`
          *,
          module_lessons (
            id,
            title,
            content_type,
            estimated_duration_minutes,
            order_position
          )
        `)
        .order('display_order')

      setModules(data || [])
      setFormData({ name: '', description: '', category: 'Foundation', estimated_hours: 1 })
      setShowCreateForm(false)
      alert('Module created successfully!')
    } catch (err) {
      console.error('Error creating module:', err)
      alert('Failed to create module')
    }
  }

  const handleDeleteModule = async (moduleId: string) => {
    if (!confirm('Delete this module? This will also delete all lessons and quizzes.')) return

    try {
      // Delete associated data first
      await supabase.from('module_lessons').delete().eq('module_id', moduleId)
      await supabase.from('quizzes').delete().eq('module_id', moduleId)
      await supabase.from('curriculum_modules').delete().eq('id', moduleId)

      setModules(modules.filter((m) => m.id !== moduleId))
      alert('Module deleted')
    } catch (err) {
      console.error('Error deleting module:', err)
      alert('Failed to delete module')
    }
  }

  const toggleExpanded = (moduleId: string) => {
    setExpandedModule(expandedModule === moduleId ? null : moduleId)
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
      <div className='flex justify-between items-center mb-6'>
        <div>
          <h1 className='text-3xl font-bold text-gray-900'>Content Management</h1>
          <p className='text-gray-600 mt-1'>Create and manage curriculum modules</p>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className='flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition'
        >
          <Plus size={18} /> Create Module
        </button>
      </div>

      {/* Create Form */}
      {showCreateForm && (
        <div className='bg-white rounded-lg shadow-md p-6 mb-6 border-2 border-blue-300'>
          <h2 className='text-xl font-bold text-gray-900 mb-4'>Create New Module</h2>
          <form onSubmit={handleCreateModule} className='space-y-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Module Title *</label>
              <input
                type='text'
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className='w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='e.g., ICP Management Fundamentals'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Description *</label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className='w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='Brief description of what students will learn'
                rows={3}
              />
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className='w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                >
                  <option value='Foundation'>Foundation</option>
                  <option value='Pathophysiology'>Pathophysiology</option>
                  <option value='Protocols'>Protocols</option>
                  <option value='Advanced'>Advanced</option>
                </select>
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Estimated Hours</label>
                <input
                  type='number'
                  min='0.5'
                  step='0.5'
                  value={formData.estimated_hours}
                  onChange={(e) => setFormData({ ...formData, estimated_hours: parseFloat(e.target.value) })}
                  className='w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>
            </div>

            <div className='flex gap-3 pt-4'>
              <button
                type='submit'
                className='px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium'
              >
                Create Module
              </button>
              <button
                type='button'
                onClick={() => {
                  setShowCreateForm(false)
                  setFormData({ name: '', description: '', category: 'Foundation', estimated_hours: 1 })
                }}
                className='px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition'
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Modules List */}
      <div className='space-y-3'>
        {modules.map((module) => (
          <div key={module.id} className='bg-white rounded-lg shadow border border-gray-200 overflow-hidden'>
            <div className='flex items-center justify-between p-6 hover:bg-gray-50 transition'>
              <div className='flex-1 cursor-pointer' onClick={() => toggleExpanded(module.id)}>
                <div className='flex items-center gap-3'>
                  {expandedModule === module.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  <div>
                    <h3 className='font-bold text-gray-900 text-lg'>{module.name}</h3>
                    <p className='text-sm text-gray-600'>{module.description}</p>
                    <div className='flex gap-4 mt-2 text-xs text-gray-500'>
                      <span>Category: {module.category}</span>
                      <span>Hours: {module.estimated_hours}</span>
                      <span>Lessons: {(module.module_lessons || []).length}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className='flex gap-2'>
                <button
                  onClick={() => setEditingModule(module)}
                  className='p-2 text-blue-600 hover:bg-blue-50 rounded transition'
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => handleDeleteModule(module.id)}
                  className='p-2 text-red-600 hover:bg-red-50 rounded transition'
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            {/* Expanded Lessons */}
            {expandedModule === module.id && (
              <div className='border-t border-gray-200 bg-gray-50 p-6'>
                <h4 className='font-semibold text-gray-900 mb-3'>Lessons in this module</h4>
                {(module.module_lessons || []).length === 0 ? (
                  <p className='text-sm text-gray-600'>No lessons yet. Add via the lesson builder.</p>
                ) : (
                  <ul className='space-y-2'>
                    {module.module_lessons?.map((lesson) => (
                      <li
                        key={lesson.id}
                        className='flex items-center justify-between p-3 bg-white rounded border border-gray-200'
                      >
                        <div>
                          <p className='font-medium text-gray-900'>{lesson.title}</p>
                          <p className='text-xs text-gray-600'>
                            {lesson.content_type.replace('_', ' ')} • {lesson.estimated_duration_minutes} min
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {modules.length === 0 && (
        <div className='text-center py-12 bg-white rounded-lg border border-gray-200'>
          <p className='text-gray-600 mb-4'>No modules created yet</p>
          <button
            onClick={() => setShowCreateForm(true)}
            className='px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition'
          >
            Create First Module
          </button>
        </div>
      )}

      {/* Help Text */}
      <div className='mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4'>
        <p className='text-sm text-blue-900'>
          <strong>Note:</strong> To add lessons and quizzes to modules, use the SQL seeding script or contact an administrator.
        </p>
      </div>
    </div>
  )
}
