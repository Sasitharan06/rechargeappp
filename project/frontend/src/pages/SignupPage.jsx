import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import config from '../config';

const SignupPage = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name || !email || !phone || !password || !confirm) {
      setError('Please fill in all fields.')
      return
    }
    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }

    try {
      const response = await fetch(`${config.API_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Signup failed');
      }

      login(data) // Use the returned user object which includes _id and phone
      navigate('/plans')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="bg-white min-h-[70vh]">
      <div className="container-page py-12 grid gap-10 lg:grid-cols-[2fr_1fr] items-start">
        <div className="max-w-xl mx-auto w-full">
          <h1 className="text-3xl font-bold text-airtel-dark mb-2">Create your account</h1>
          <p className="text-gray-600 mb-6">Sign up to manage numbers, view history, and access exclusive offers.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Full name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-airtel-primary"
                placeholder="Your name"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-airtel-primary"
                placeholder="you@example.com"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Mobile Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-airtel-primary"
                placeholder="9876543210"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-airtel-primary"
                placeholder="••••••••"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Confirm password</label>
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-airtel-primary"
                placeholder="••••••••"
              />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button
              type="submit"
              className="w-full bg-airtel-primary text-white font-semibold py-3 rounded-xl hover:bg-red-700 transition shadow-lg"
            >
              Sign Up
            </button>
          </form>

          <p className="text-sm text-gray-600 mt-4">
            Already have an account?{' '}
            <Link to="/login" className="text-airtel-primary font-semibold">Login</Link>
          </p>
        </div>

        <div className="bg-airtel-light rounded-3xl p-6 shadow-soft border border-red-50 text-sm text-airtel-dark">
          <h2 className="font-bold text-lg mb-2">Perks you get</h2>
          <ul className="space-y-2 text-gray-700">
            <li>• Personalized plan alerts</li>
            <li>• Priority customer support</li>
            <li>• Early access to promotional offers</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SignupPage
