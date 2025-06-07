'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import styled from 'styled-jsx/style';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-red-950 to-gray-900 relative overflow-hidden">
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
        <div className="absolute top-60 right-16 w-3 h-3 bg-red-500 rounded-full animate-float animation-delay-2500"></div>
        <div className="absolute bottom-60 left-1/4 w-2 h-8 bg-red-400 animate-float animation-delay-1800"></div>
      </div>

      {/* Enhanced matrix-style falling particles */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
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
        {[...Array(30)].map((_, i) => (
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

      {/* Main content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center p-8">
        {/* Glassmorphism container */}
        <div className="w-full max-w-6xl mx-auto">
          <div className="bg-black/40 backdrop-blur-xl rounded-3xl shadow-2xl border border-red-900/30 p-8 lg:p-16 hover:bg-black/50 hover:border-red-800/50 transition-all duration-500 animate-slide-up relative">
            {/* Enhanced glowing border effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-red-600/20 via-transparent to-red-600/20 blur-sm -z-10 animate-pulse-glow"></div>
            
            <div className="text-center space-y-12">
              {/* Icon with enhanced animation */}
              <div className="flex justify-center animate-bounce-in">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-800 rounded-2xl blur-lg opacity-75 animate-pulse-glow"></div>
                  <div className="relative bg-gradient-to-r from-red-600 to-red-800 rounded-2xl p-6 shadow-2xl transform hover:scale-110 transition-transform duration-300">
                    <svg className="w-16 h-16 text-white animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Main heading with enhanced styling */}
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent animate-text-shimmer leading-tight">
                HTML & CSS Chatbot Generator
              </h1>

              {/* Enhanced description */}
              <div className="relative animate-fade-in-up">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/10 to-transparent blur-sm animate-pulse-glow"></div>
                <p className="relative text-lg leading-8 lg:text-xl lg:leading-9 text-gray-300 max-w-4xl mx-auto font-light">
                  Generate <span className="font-semibold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">beautiful landing pages</span> with AI. 
                  Simply describe what you want, and our chatbot will create 
                  <span className="font-semibold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent"> complete HTML and CSS code</span> with live preview.
                </p>
              </div>

              {/* Enhanced action buttons */}
              <div className="flex items-center justify-center gap-6 animate-slide-up">
                <Button
                  asChild
                  size="lg"
                  className="group relative px-8 py-4 text-lg font-bold rounded-2xl text-white bg-gradient-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 focus:outline-none focus:ring-4 focus:ring-red-500/50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-red-900/50 shadow-lg overflow-hidden border-0"
                >
                  <Link href="/auth/signin" className="flex items-center space-x-2">
                    {/* Enhanced animated background shimmer */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    <span className="relative z-10">Get Started</span>
                    <svg className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="group px-8 py-4 text-lg font-semibold rounded-2xl bg-black/30 backdrop-blur-sm border-2 border-red-500 text-red-500 hover:bg-red-600 hover:text-white hover:border-red-500 focus:outline-none focus:ring-4 focus:ring-red-500/20 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-red-900/20"
                >
                  <Link href="/chat" className="flex items-center space-x-2">
                    <svg className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Try Demo</span>
                  </Link>
                </Button>
              </div>

              {/* Additional feature highlights */}
              <div className="grid md:grid-cols-3 gap-6 pt-8 animate-fade-in-up">
                <div className="group bg-black/20 backdrop-blur-sm rounded-xl p-4 border border-red-900/20 hover:border-red-600/40 hover:bg-black/30 transition-all duration-300 transform hover:scale-105">
                  <div className="flex items-center justify-center mb-3">
                    <div className="p-2 bg-gradient-to-r from-red-600/20 to-red-800/20 rounded-lg group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-1">Lightning Fast</h3>
                  <p className="text-gray-400 text-xs">Generate in seconds</p>
                </div>

                <div className="group bg-black/20 backdrop-blur-sm rounded-xl p-4 border border-red-900/20 hover:border-red-600/40 hover:bg-black/30 transition-all duration-300 transform hover:scale-105">
                  <div className="flex items-center justify-center mb-3">
                    <div className="p-2 bg-gradient-to-r from-red-600/20 to-red-800/20 rounded-lg group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-1">Live Preview</h3>
                  <p className="text-gray-400 text-xs">Real-time results</p>
                </div>

                <div className="group bg-black/20 backdrop-blur-sm rounded-xl p-4 border border-red-900/20 hover:border-red-600/40 hover:bg-black/30 transition-all duration-300 transform hover:scale-105">
                  <div className="flex items-center justify-center mb-3">
                    <div className="p-2 bg-gradient-to-r from-red-600/20 to-red-800/20 rounded-lg group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-1">Responsive</h3>
                  <p className="text-gray-400 text-xs">Mobile-friendly</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced decorative elements */}
      <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-[1000px] h-[800px] bg-gradient-to-r from-red-600/10 to-red-800/10 rounded-full filter blur-3xl animate-pulse-glow"></div>
      </div>

      <style jsx>{`
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
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .animation-delay-1500 {
          animation-delay: 1.5s;
        }
        .animation-delay-1800 {
          animation-delay: 1.8s;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-2500 {
          animation-delay: 2.5s;
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
    </main>
  )
}