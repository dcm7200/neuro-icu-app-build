'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Upload, AlertCircle, CheckCircle } from 'lucide-react'

interface ImportedUser {
  email: string
  first_name: string
  last_name: string
  role: string
}

interface ImportResult {
  email: string
  status: 'success' | 'error'
  message: string
}

export default function ImportPage() {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<ImportedUser[]>([])
  const [importing, setImporting] = useState(false)
  const [results, setResults] = useState<ImportResult[]>([])
  const [phase, setPhase] = useState<'select' | 'preview' | 'results'>('select')

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return

    setFile(selectedFile)

    // Parse CSV
    const text = await selectedFile.text()
    const lines = text.split('\n')
    const headers = lines[0].split(',').map((h) => h.trim().toLowerCase())

    const users: ImportedUser[] = []
    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue

      const values = lines[i].split(',').map((v) => v.trim())
      const user: ImportedUser = {
        email: values[headers.indexOf('email')] || '',
        first_name: values[headers.indexOf('first_name') || headers.indexOf('firstname')] || '',
        last_name: values[headers.indexOf('last_name') || headers.indexOf('lastname')] || '',
        role: values[headers.indexOf('role')] || 'resident',
      }

      if (user.email && user.first_name && user.last_name) {
        users.push(user)
      }
    }

    setPreview(users)
    if (users.length > 0) {
      setPhase('preview')
    }
  }

  const handleImport = async () => {
    if (preview.length === 0) return

    setImporting(true)
    const importResults: ImportResult[] = []

    try {
      for (const userToImport of preview) {
        try {
          // Create auth user
          const { data: authData, error: authError } = await supabase.auth.admin.createUser({
            email: userToImport.email,
            password: Math.random().toString(36).slice(-12),
            email_confirm: true,
          })

          if (authError) throw authError

          const userId = authData.user!.id

          // Create user profile
          const { error: profileError } = await supabase.from('users').insert([
            {
              id: userId,
              email: userToImport.email,
              first_name: userToImport.first_name,
              last_name: userToImport.last_name,
            },
          ] as any)

          if (profileError) throw profileError

          // Assign role
          const { data: roleData } = await supabase
            .from('roles')
            .select('id')
            .eq('name', userToImport.role.toLowerCase())
            .single()

          if (roleData) {
            await supabase.from('user_roles').insert([
              {
                user_id: userId,
                role_id: roleData.id,
              },
            ] as any)
          }

          importResults.push({
            email: userToImport.email,
            status: 'success',
            message: 'User created successfully',
          })
        } catch (err) {
          importResults.push({
            email: userToImport.email,
            status: 'error',
            message: err instanceof Error ? err.message : 'Failed to create user',
          })
        }
      }

      setResults(importResults)
      setPhase('results')
    } finally {
      setImporting(false)
    }
  }

  const downloadTemplate = () => {
    const csv = 'email,first_name,last_name,role\nuser@hospital.com,John,Doe,resident'
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'users_template.csv'
    a.click()
  }

  return (
    <div className='max-w-4xl mx-auto'>
      <div className='mb-6'>
        <h1 className='text-3xl font-bold text-gray-900'>Bulk Import Users</h1>
        <p className='text-gray-600 mt-1'>Upload a CSV file to create multiple user accounts</p>
      </div>

      {/* Select Phase */}
      {phase === 'select' && (
        <div className='bg-white rounded-lg shadow-md p-8'>
          <div className='space-y-6'>
            <div>
              <h2 className='text-xl font-bold text-gray-900 mb-4'>Upload CSV File</h2>
              <div className='border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 hover:bg-blue-50 transition cursor-pointer'>
                <input
                  type='file'
                  accept='.csv'
                  onChange={handleFileSelect}
                  className='hidden'
                  id='file-input'
                />
                <label htmlFor='file-input' className='cursor-pointer block'>
                  <Upload className='w-12 h-12 text-gray-400 mx-auto mb-3' />
                  <p className='text-lg font-semibold text-gray-700'>Click to upload CSV</p>
                  <p className='text-sm text-gray-600 mt-1'>or drag and drop</p>
                  {file && <p className='text-sm text-green-600 mt-2'>✓ {file.name}</p>}
                </label>
              </div>
            </div>

            <div>
              <h3 className='font-semibold text-gray-900 mb-3'>CSV Format</h3>
              <div className='bg-gray-50 p-4 rounded border border-gray-200 font-mono text-sm'>
                <p>email,first_name,last_name,role</p>
                <p className='text-gray-600'>user1@hospital.com,John,Doe,resident</p>
                <p className='text-gray-600'>user2@hospital.com,Jane,Smith,nurse</p>
              </div>
              <p className='text-sm text-gray-600 mt-2'>
                Valid roles: resident, nurse, np, instructor, admin
              </p>
            </div>

            <div className='flex gap-4'>
              <button
                onClick={downloadTemplate}
                className='px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition'
              >
                Download Template
              </button>
              <button
                onClick={() => router.push('/admin/users')}
                className='px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition'
              >
                Back to Users
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preview Phase */}
      {phase === 'preview' && (
        <div className='bg-white rounded-lg shadow-md p-8'>
          <h2 className='text-xl font-bold text-gray-900 mb-4'>Review Users</h2>
          <p className='text-gray-600 mb-4'>{preview.length} users found in file</p>

          <div className='overflow-x-auto mb-6'>
            <table className='w-full text-sm'>
              <thead className='bg-gray-100'>
                <tr>
                  <th className='px-4 py-2 text-left font-semibold'>Email</th>
                  <th className='px-4 py-2 text-left font-semibold'>First Name</th>
                  <th className='px-4 py-2 text-left font-semibold'>Last Name</th>
                  <th className='px-4 py-2 text-left font-semibold'>Role</th>
                </tr>
              </thead>
              <tbody>
                {preview.slice(0, 10).map((user, i) => (
                  <tr key={i} className='border-b hover:bg-gray-50'>
                    <td className='px-4 py-2'>{user.email}</td>
                    <td className='px-4 py-2'>{user.first_name}</td>
                    <td className='px-4 py-2'>{user.last_name}</td>
                    <td className='px-4 py-2'>
                      <span className='inline-block px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-semibold'>
                        {user.role}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {preview.length > 10 && <p className='text-sm text-gray-600 mb-4'>... and {preview.length - 10} more</p>}

          <div className='flex gap-4'>
            <button
              onClick={handleImport}
              disabled={importing}
              className='px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:bg-gray-400'
            >
              {importing ? 'Importing...' : 'Import All Users'}
            </button>
            <button
              onClick={() => {
                setPhase('select')
                setFile(null)
                setPreview([])
              }}
              className='px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition'
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Results Phase */}
      {phase === 'results' && (
        <div className='bg-white rounded-lg shadow-md p-8'>
          <h2 className='text-xl font-bold text-gray-900 mb-6'>Import Results</h2>

          <div className='grid grid-cols-2 gap-4 mb-6'>
            <div className='bg-green-50 p-4 rounded border border-green-200'>
              <p className='text-3xl font-bold text-green-600'>
                {results.filter((r) => r.status === 'success').length}
              </p>
              <p className='text-green-700 font-semibold'>Successful</p>
            </div>
            <div className='bg-red-50 p-4 rounded border border-red-200'>
              <p className='text-3xl font-bold text-red-600'>
                {results.filter((r) => r.status === 'error').length}
              </p>
              <p className='text-red-700 font-semibold'>Failed</p>
            </div>
          </div>

          <div className='space-y-2 max-h-96 overflow-y-auto mb-6'>
            {results.map((result) => (
              <div
                key={result.email}
                className={`flex items-start gap-3 p-3 rounded border ${
                  result.status === 'success'
                    ? 'bg-green-50 border-green-200'
                    : 'bg-red-50 border-red-200'
                }`}
              >
                {result.status === 'success' ? (
                  <CheckCircle className='w-5 h-5 text-green-600 flex-shrink-0 mt-0.5' />
                ) : (
                  <AlertCircle className='w-5 h-5 text-red-600 flex-shrink-0 mt-0.5' />
                )}
                <div className='flex-1'>
                  <p className={`font-semibold ${result.status === 'success' ? 'text-green-900' : 'text-red-900'}`}>
                    {result.email}
                  </p>
                  <p className={`text-sm ${result.status === 'success' ? 'text-green-700' : 'text-red-700'}`}>
                    {result.message}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className='flex gap-4'>
            <button
              onClick={() => router.push('/admin/users')}
              className='px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition'
            >
              Go to Users
            </button>
            <button
              onClick={() => {
                setPhase('select')
                setFile(null)
                setPreview([])
                setResults([])
              }}
              className='px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition'
            >
              Import Another File
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
