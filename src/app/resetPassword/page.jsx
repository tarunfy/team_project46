'use client'
import { AuthContext } from '@/context/authContext'
import { useRouter } from 'next/navigation'
import { useContext, useState } from 'react'

import 'react-toastify/dist/ReactToastify.css'
const ForgotPassword = () => {
  const router = useRouter()
  const { resetPassword } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleResetPassword = async (e) => {
    e.preventDefault()
    setError('')
    setMessage('')
    if (!email) {
      setError('Please enter your email address.')
      return
    }

    try {
      await resetPassword(email)
      setMessage(
        'Password reset email sent successfully! Please check your inbox.',
      )
      router.push('/login')
    } catch (error) {
      'Error sending password reset email: ' + error.message
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-80 rounded-lg bg-white p-8 shadow-md">
        <h2 className="mb-6 text-2xl font-semibold text-gray-700">
          Reset Your Password
        </h2>
        <form onSubmit={handleResetPassword}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Enter your email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-2 w-full rounded-md border px-4 py-2 text-gray-700"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {message && <p className="mt-2 text-sm text-green-500">{message}</p>}
          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-[#b060ff] px-3 py-1.5 text-lg font-semibold text-white shadow-sm hover:bg-[#a272d3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  )
}

export default ForgotPassword
