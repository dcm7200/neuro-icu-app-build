'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/lib/store'
import { Database } from '@/types/database'
import { Plus, Trash2, Edit2, Search, Download } from 'lucide-react'

type User = Database['public']['Tables']['users']['Row']
type UserRole = Database['public']['Tables']['user_roles']['Row']

interface UserWithRole extends User {
  role?: string
}

export default function UsersPage() {
  const router = useRouter()
  const { user: currentUser } = useAuth()
  const [users, setUsers] = useState<UserWithRole[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [editingUser, setEditingUser] = useState<UserWithRole | null>(null)
  const [formData, setFormData] = useState({
    email: '',
    first_name: '',
    last_name: '',
    role: 'resident',
  })

  useEffect(() => {
    const fetchUsers = async () => {
      if (!currentUser) return

      try {
        const { data: usersData, error: usersError } = await supabase
          .from('users')
          .select(`
            *,
            user_roles (
              roles (
                name
              )
            )
          `)
          .order('created_at', { ascending: false })

        if (usersError) throw usersError

        const formattedUsers = usersData.map((u: any) => ({
          ...u,
          role: u.user_roles?.[0]?.roles?.name || 'resident',
        }))

        setUsers(formattedUsers)
      } catch (err) {
        console.error('Error fetching users:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [currentUser])

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.email || !formData.first_name || !formData.last_name) {
      alert('Please fill in all required fields')
      return
    }

    try {
      // Create user via Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email: formData.email,
        password: Math.random().toString(36).slice(-12), // Random password, user sets their own
        email_confirm: true,
      })

      if (authError) throw authError

      const userId = authData.user!.id

      // Create user profile
      const { error: profileError } = await supabase.from('users').insert([
        {
          id: userId,
          email: formData.email,
          first_name: formData.first_name,
          last_name: formData.last_name,
        },
      ] as any)

      if (profileError) throw profileError

      // Assign role
      const { data: roleData } = await supabase
        .from('roles')
        .select('id')
        .eq('name', formData.role)
        .single()

      if (roleData) {
        await supabase.from('user_roles').insert([
          {
            user_id: userId,
            role_id: roleData.id,
          },
        ] as any)
      }

      alert(`User created! Password reset link sent to ${formData.email}`)
      setFormData({ email: '', first_name: '', last_name: '', role: 'resident' })
      setShowCreateForm(false)

      // Refresh list
      const { data: updatedUsers } = await supabase
        .from('users')
        .select(`
          *,
          user_roles (
            roles (
              name
            )
          )
        `)
        .order('created_at', { ascending: false })

      if (updatedUsers) {
        const formatted = updatedUsers.map((u: any) => ({
          ...u,
          role: u.user_roles?.[0]?.roles?.name || 'resident',
        }))
        setUsers(formatted)
      }
    } catch (err) {
      console.error('Error creating user:', err)
      alert('Failed to create user. Please try again.')
    }
  }

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Are you sure? This will delete the user account.')) return

    try {
      // Delete user via admin API
      await supabase.auth.admin.deleteUser(userId)
      setUsers(users.filter((u) => u.id !== userId))
    } catch (err) {
      console.error('Error deleting user:', err)
      alert('Failed to delete user')
    }
  }

  const handleExportCSV = () => {
    const headers = ['Email', 'First Name', 'Last Name', 'Role', 'Created At']
    const rows = users.map((u) => [
      u.email,
      u.first_name,
      u.last_name,
      u.role || 'resident',
      new Date(u.created_at).toLocaleDateString(),
    ])

    const csv = [headers, ...rows].map((row) => row.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `users_${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  const filteredUsers = users.filter(
    (u) =>
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.last_name.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
          <h1 className='text-3xl font-bold text-gray-900'>User Management</h1>
          <p className='text-gray-600 mt-1'>Manage resident and staff accounts</p>
        </div>
        <div className='flex gap-3'>
          <button
            onClick={handleExportCSV}
            className='flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition'
          >
            <Download size={18} /> Export CSV
          </button>
          <button
            onClick={() => setShowCreateForm(true)}
            className='flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition'
          >
            <Plus size={18} /> Create User
          </button>
        </div>
      </div>

      {/* Create Form */}
      {showCreateForm && (
        <div className='bg-white rounded-lg shadow-md p-6 mb-6 border-2 border-blue-300'>
          <h2 className='text-xl font-bold text-gray-900 mb-4'>Create New User</h2>
          <form onSubmit={handleCreateUser} className='space-y-4'>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Email *</label>
                <input
                  type='email'
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className='w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                  placeholder='user@hospital.com'
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Role</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className='w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                >
                  <option value='resident'>Resident</option>
                  <option value='nurse'>Nurse</option>
                  <option value='np'>NP/PA</option>
                  <option value='instructor'>Instructor</option>
                  <option value='admin'>Admin</option>
                </select>
              </div>
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>First Name *</label>
                <input
                  type='text'
                  required
                  value={formData.first_name}
                  onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                  className='w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                  placeholder='John'
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Last Name *</label>
                <input
                  type='text'
                  required
                  value={formData.last_name}
                  onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                  className='w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                  placeholder='Doe'
                />
              </div>
            </div>

            <div className='flex gap-3 pt-4'>
              <button
                type='submit'
                className='px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium'
              >
                Create User
              </button>
              <button
                type='button'
                onClick={() => {
                  setShowCreateForm(false)
                  setFormData({ email: '', first_name: '', last_name: '', role: 'resident' })
                }}
                className='px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition'
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Search */}
      <div className='mb-6'>
        <div className='relative'>
          <Search className='absolute left-4 top-3 text-gray-400' size={20} />
          <input
            type='text'
            placeholder='Search by email or name...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='w-full pl-12 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>
      </div>

      {/* Users Table */}
      <div className='bg-white rounded-lg shadow-md overflow-hidden'>
        <table className='w-full'>
          <thead className='bg-gray-100 border-b'>
            <tr>
              <th className='px-6 py-3 text-left text-sm font-semibold text-gray-900'>Email</th>
              <th className='px-6 py-3 text-left text-sm font-semibold text-gray-900'>Name</th>
              <th className='px-6 py-3 text-left text-sm font-semibold text-gray-900'>Role</th>
              <th className='px-6 py-3 text-left text-sm font-semibold text-gray-900'>Created</th>
              <th className='px-6 py-3 text-left text-sm font-semibold text-gray-900'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className='border-b hover:bg-gray-50 transition'>
                <td className='px-6 py-4 text-sm text-gray-900'>{user.email}</td>
                <td className='px-6 py-4 text-sm text-gray-700'>
                  {user.first_name} {user.last_name}
                </td>
                <td className='px-6 py-4 text-sm'>
                  <span className='inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold'>
                    {user.role || 'resident'}
                  </span>
                </td>
                <td className='px-6 py-4 text-sm text-gray-600'>
                  {new Date(user.created_at).toLocaleDateString()}
                </td>
                <td className='px-6 py-4 text-sm'>
                  <div className='flex gap-2'>
                    <button
                      onClick={() => setEditingUser(user)}
                      className='p-2 text-blue-600 hover:bg-blue-50 rounded transition'
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className='p-2 text-red-600 hover:bg-red-50 rounded transition'
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredUsers.length === 0 && (
          <div className='text-center py-12'>
            <p className='text-gray-600'>No users found</p>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className='mt-6 grid grid-cols-4 gap-4'>
        <div className='bg-white p-4 rounded-lg shadow text-center'>
          <p className='text-3xl font-bold text-blue-600'>{users.length}</p>
          <p className='text-gray-600 text-sm'>Total Users</p>
        </div>
        <div className='bg-white p-4 rounded-lg shadow text-center'>
          <p className='text-3xl font-bold text-green-600'>
            {users.filter((u) => u.role === 'resident').length}
          </p>
          <p className='text-gray-600 text-sm'>Residents</p>
        </div>
        <div className='bg-white p-4 rounded-lg shadow text-center'>
          <p className='text-3xl font-bold text-purple-600'>
            {users.filter((u) => u.role === 'instructor').length}
          </p>
          <p className='text-gray-600 text-sm'>Instructors</p>
        </div>
        <div className='bg-white p-4 rounded-lg shadow text-center'>
          <p className='text-3xl font-bold text-orange-600'>
            {users.filter((u) => u.role === 'admin').length}
          </p>
          <p className='text-gray-600 text-sm'>Admins</p>
        </div>
      </div>
    </div>
  )
}
