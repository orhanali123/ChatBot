'use client'

import { useState } from 'react'
import { signIn, getSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SignInForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError('Invalid credentials')
      } else {
        await getSession()
        router.push('/chat')
        router.refresh()
      }
    } catch (error) {
      setError('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: '/chat' })
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-red-950 to-gray-900 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large floating orbs */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-red-600 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-red-800 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-red-500 rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-pulse-slow animation-delay-4000"></div>
        
        {/* Enhanced geometric shapes */}
        <div className="absolute top-20 left-20 w-4 h-4 bg-red-500 transform rotate-45 animate-float"></div>
        <div className="absolute top-40 right-32 w-6 h-6 bg-red-400 rounded-full animate-float animation-delay-1000"></div>
        <div className="absolute bottom-32 left-16 w-3 h-12 bg-red-600 animate-float animation-delay-3000"></div>
        <div className="absolute bottom-20 right-20 w-8 h-2 bg-red-500 animate-float animation-delay-2000"></div>
        <div className="absolute top-32 left-1/3 w-5 h-5 bg-red-400 transform rotate-12 animate-float animation-delay-1500"></div>
        <div className="absolute bottom-40 right-1/3 w-7 h-1 bg-red-600 animate-float animation-delay-3500"></div>
      </div>

      {/* Enhanced matrix-style falling particles */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-8 bg-gradient-to-b from-red-500 to-transparent opacity-20 animate-fall"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Enhanced glowing orbs */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-red-400 rounded-full animate-glow opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Main container - Compact and centered */}
      <div className="w-full max-w-4xl mx-auto flex items-center justify-center min-h-screen py-8">
        <div className="w-full max-w-xl lg:max-w-2xl z-10">
          {/* Glassmorphism container with compact layout */}
          <div className="bg-black/40 backdrop-blur-xl rounded-2xl shadow-2xl border border-red-900/30 p-6 lg:p-8 space-y-6 hover:bg-black/50 hover:border-red-800/50 transition-all duration-500 animate-slide-up relative">
            {/* Enhanced glowing border effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-600/20 via-transparent to-red-600/20 blur-sm -z-10 animate-pulse-glow"></div>
            
            {/* Header with compact gradient text */}
            <div className="text-center space-y-4 animate-fade-in">
              <div className="inline-block p-3 bg-gradient-to-r from-red-600 to-red-800 rounded-xl shadow-lg transform hover:scale-110 transition-transform duration-300 animate-bounce-in">
                <svg className="w-6 h-6 text-white animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent animate-text-shimmer">
                Welcome Back!
              </h1>
              <p className="text-gray-300 text-base lg:text-lg animate-fade-in-up">
                Sign in to continue or{' '}
                <Link
                  href="/auth/signup"
                  className="font-semibold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent hover:from-red-300 hover:to-red-500 transition-all duration-300 underline decoration-red-500 hover:decoration-red-400 animate-pulse-text"
                >
                  create account
                </Link>
              </p>
            </div>

            <div className="space-y-6">
              {error && (
                <div className="bg-red-900/30 backdrop-blur-sm border border-red-500/50 text-red-300 px-4 py-3 rounded-xl text-center font-medium animate-shake-error">
                  <div className="flex items-center justify-center space-x-2">
                    <svg className="w-5 h-5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    <span>{error}</span>
                  </div>
                </div>
              )}

              {/* Form fields in compact layout */}
              <div className="space-y-4">
                <div className="group animate-slide-in-left">
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-300 mb-2 group-focus-within:text-red-400 transition-colors duration-300"
                  >
                    Email address
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-black/30 backdrop-blur-sm border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/20 focus:bg-black/40 transition-all duration-300 hover:border-red-600 hover:shadow-lg hover:shadow-red-900/20"
                      placeholder="you@example.com"
                      autoComplete="email"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                      <svg className="w-5 h-5 text-gray-500 group-focus-within:text-red-400 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="group animate-slide-in-right">
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-gray-300 mb-2 group-focus-within:text-red-400 transition-colors duration-300"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-black/30 backdrop-blur-sm border border-gray-700 rounded-xl px-4 py-3 pr-12 text-white placeholder-gray-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/20 focus:bg-black/40 transition-all duration-300 hover:border-red-600 hover:shadow-lg hover:shadow-red-900/20"
                      placeholder="Enter your password"
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500 hover:text-red-400 focus:text-red-400 transition-colors duration-300"
                    >
                      {showPassword ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Action buttons in compact layout */}
              <div className="space-y-4 animate-slide-up">
                <button
                  type="submit"
                  disabled={isLoading}
                  onClick={handleSubmit}
                  className="group relative w-full flex justify-center items-center py-3 px-4 border-0 text-lg font-bold rounded-xl text-white bg-gradient-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 focus:outline-none focus:ring-4 focus:ring-red-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-red-900/50 disabled:hover:scale-100 shadow-lg overflow-hidden"
                >
                  {/* Enhanced animated background shimmer */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  
                  {isLoading && (
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  )}
                  <span className="relative z-10">{isLoading ? 'Signing in...' : 'Sign In'}</span>
                </button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-gray-600"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="px-4 bg-gradient-to-r from-black via-red-950 to-black text-gray-400 text-sm">
                      or
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  className="group w-full inline-flex justify-center items-center gap-3 py-3 px-4 bg-black/30 backdrop-blur-sm border border-gray-700 rounded-xl text-white hover:bg-black/40 hover:border-red-600 focus:outline-none focus:ring-4 focus:ring-red-500/20 transition-all duration-300 transform hover:scale-105 font-semibold hover:shadow-lg hover:shadow-red-900/20"
                >
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  <span>Continue with Google</span>
                </button>
              </div>
            </div>
          </div>

          {/* Enhanced decorative elements */}
          <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-[800px] h-[600px] bg-gradient-to-r from-red-600/10 to-red-800/10 rounded-full filter blur-3xl animate-pulse-glow"></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shake-error {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-12px); }
          75% { transform: translateX(12px); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(180deg); }
        }
        @keyframes fall {
          0% { transform: translateY(-100vh); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        @keyframes glow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.3); }
        }
        @keyframes slide-up {
          0% { transform: translateY(40px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes slide-in-left {
          0% { transform: translateX(-60px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        @keyframes slide-in-right {
          0% { transform: translateX(60px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce-in {
          0% { transform: scale(0.3); opacity: 0; }
          50% { transform: scale(1.05); }
          70% { transform: scale(0.9); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes text-shimmer {
          0% { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }
        @keyframes pulse-text {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        
        .animate-shake-error {
          animation: shake-error 0.6s ease-in-out;
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        .animate-pulse-glow {
          animation: pulse-glow 4s ease-in-out infinite;
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-fall {
          animation: fall linear infinite;
        }
        .animate-glow {
          animation: glow 3s ease-in-out infinite;
        }
        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }
        .animate-slide-in-left {
          animation: slide-in-left 0.8s ease-out;
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.8s ease-out;
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out;
        }
        .animate-bounce-in {
          animation: bounce-in 1s ease-out;
        }
        .animate-text-shimmer {
          background-size: 400px 100%;
          animation: text-shimmer 3s linear infinite;
        }
        .animate-pulse-text {
          animation: pulse-text 2s ease-in-out infinite;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .animation-delay-1500 {
          animation-delay: 1.5s;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-3000 {
          animation-delay: 3s;
        }
        .animation-delay-3500 {
          animation-delay: 3.5s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}