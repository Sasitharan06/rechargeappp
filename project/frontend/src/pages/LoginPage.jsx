import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { GoogleLogin } from '@react-oauth/google';
import config from '../config';

const LoginPage = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)



  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || !password) {
      setError('Please enter both email and password.')
      return
    }

    try {
      const response = await fetch(`${config.API_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      login(data);
      navigate('/plans');
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="relative min-h-[90vh] overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-red-50">
      {/* Animated Background Shapes */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-red-400 to-orange-400 rounded-full blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="container-page py-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Login Form */}
          <div className="max-w-xl mx-auto w-full animate-slide-in-left">
            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
              {/* Header with Icon */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-airtel-primary to-red-600 mb-4 animate-bounce-slow">
                  <span className="text-3xl">🔐</span>
                </div>
                <h1 className="text-3xl font-bold text-airtel-dark mb-2">Welcome Back!</h1>
                <p className="text-gray-600">Login to continue your recharge journey</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email Field */}
                <div className="space-y-2 group">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <span className="text-lg">📧</span> Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 pl-12 focus:outline-none focus:border-airtel-primary focus:ring-2 focus:ring-airtel-primary/20 transition-all"
                      placeholder="your@email.com"
                    />
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">✉️</span>
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2 group">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <span className="text-lg">🔒</span> Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 pl-12 pr-12 focus:outline-none focus:border-airtel-primary focus:ring-2 focus:ring-airtel-primary/20 transition-all"
                      placeholder="••••••••"
                    />
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">🔑</span>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-xl hover:scale-110 transition-transform"
                    >
                      {showPassword ? '👁️' : '👁️‍🗨️'}
                    </button>
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm flex items-center gap-2 animate-shake">
                    <span>⚠️</span> {error}
                  </div>
                )}

                {/* Login Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-airtel-primary to-red-700 text-white font-bold py-4 rounded-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  <span>Login Now</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </form>

              {/* Divider */}
              <div className="flex items-center gap-4 my-6">
                <div className="flex-1 h-px bg-gray-200"></div>
                <span className="text-sm text-gray-500">OR</span>
                <div className="flex-1 h-px bg-gray-200"></div>
              </div>

              {/* Social Login Buttons */}
              <div className="space-y-3 flex justify-center">
                <GoogleLogin
                  onSuccess={async (credentialResponse) => {
                    try {
                      const res = await fetch(`${config.API_URL}/users/google-login`, {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                          token: credentialResponse.credential,
                        }),
                      });
                      const data = await res.json();
                      if (res.ok) {
                        login(data);
                        navigate('/plans');
                      } else {
                        setError(data.error || 'Google Login Failed');
                      }
                    } catch (err) {
                      setError('Network error during Google Login');
                    }
                  }}
                  onError={() => {
                    setError('Google Login Failed');
                  }}
                  useOneTap
                />
              </div>

              {/* Footer Link */}
              <p className="text-sm text-gray-600 mt-6 text-center">
                New to Airtel?{' '}
                <Link to="/signup" className="text-airtel-primary font-bold hover:underline animate-pulse-slow">
                  Create an account 🚀
                </Link>
              </p>
            </div>
          </div>

          {/* Right Side - Benefits & Image */}
          <div className="relative hidden lg:block animate-slide-in-right">
            <div className="relative">
              {/* Decorative Circles */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full blur-2xl opacity-50 animate-pulse"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full blur-2xl opacity-50 animate-pulse animation-delay-2000"></div>

              {/* Main Image/Illustration */}
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 animate-float">
                <img
                  src="/login-illustration.png"
                  alt="Login Illustration"
                  className="w-full h-auto rounded-2xl mb-6"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?w=800&q=80'
                  }}
                />

                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-airtel-dark">Why Login?</h2>
                  <div className="space-y-3">
                    {[
                      { icon: '💰', text: 'Track cashback & rewards', color: 'from-green-400 to-emerald-500' },
                      { icon: '📊', text: 'View recharge history', color: 'from-blue-400 to-cyan-500' },
                      { icon: '🎁', text: 'Access exclusive offers', color: 'from-purple-400 to-pink-500' },
                      { icon: '⚡', text: 'Faster checkout process', color: 'from-yellow-400 to-orange-500' },
                    ].map((benefit, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 hover:scale-105 transition-transform cursor-pointer group"
                      >
                        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${benefit.color} flex items-center justify-center text-lg group-hover:rotate-12 transition-transform`}>
                          {benefit.icon}
                        </div>
                        <span className="text-gray-700 font-medium">{benefit.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-around text-center">
                    <div className="animate-bounce-slow">
                      <div className="text-2xl mb-1">🔒</div>
                      <p className="text-xs text-gray-600 font-semibold">Secure</p>
                    </div>
                    <div className="animate-bounce-slow animation-delay-1000">
                      <div className="text-2xl mb-1">⚡</div>
                      <p className="text-xs text-gray-600 font-semibold">Fast</p>
                    </div>
                    <div className="animate-bounce-slow animation-delay-2000">
                      <div className="text-2xl mb-1">✅</div>
                      <p className="text-xs text-gray-600 font-semibold">Trusted</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
