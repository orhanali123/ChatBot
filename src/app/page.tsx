"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-red-950 to-gray-900 relative overflow-hidden">
      {/* Background Elements - Responsive */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 sm:-top-40 -right-20 sm:-right-40 w-48 h-48 sm:w-96 sm:h-96 bg-red-600 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse-slow"></div>
        <div className="absolute -bottom-20 sm:-bottom-40 -left-20 sm:-left-40 w-48 h-48 sm:w-96 sm:h-96 bg-red-800 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 sm:w-80 sm:h-80 bg-red-500 rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-pulse-slow animation-delay-4000"></div>

        {/* Floating Elements - Responsive */}
        <div className="absolute top-10 sm:top-20 left-10 sm:left-20 w-2 h-2 sm:w-4 sm:h-4 bg-red-500 transform rotate-45 animate-float"></div>
        <div className="absolute top-20 sm:top-40 right-16 sm:right-32 w-3 h-3 sm:w-6 sm:h-6 bg-red-400 rounded-full animate-float animation-delay-1000"></div>
        <div className="absolute bottom-16 sm:bottom-32 left-8 sm:left-16 w-2 h-6 sm:w-3 sm:h-12 bg-red-600 animate-float animation-delay-3000"></div>
        <div className="absolute bottom-10 sm:bottom-20 right-10 sm:right-20 w-4 h-1 sm:w-8 sm:h-2 bg-red-500 animate-float animation-delay-2000"></div>
        <div className="absolute top-16 sm:top-32 left-1/3 w-3 h-3 sm:w-5 sm:h-5 bg-red-400 transform rotate-12 animate-float animation-delay-1500"></div>
        <div className="absolute bottom-20 sm:bottom-40 right-1/3 w-4 h-0.5 sm:w-7 sm:h-1 bg-red-600 animate-float animation-delay-3500"></div>
        <div className="absolute top-30 sm:top-60 right-8 sm:right-16 w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full animate-float animation-delay-2500"></div>
        <div className="absolute bottom-30 sm:bottom-60 left-1/4 w-1 h-4 sm:w-2 sm:h-8 bg-red-400 animate-float animation-delay-1800"></div>
      </div>

      {/* Falling Rain Effect - Responsive */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-4 sm:w-1 sm:h-8 bg-gradient-to-b from-red-500 to-transparent opacity-20 animate-fall"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Glowing Dots - Responsive */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 sm:w-2 sm:h-2 bg-red-400 rounded-full animate-glow opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content - Fully Responsive */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-7xl mx-auto">
          <div className="bg-black/40 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-red-900/30 p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16 hover:bg-black/50 hover:border-red-800/50 transition-all duration-500 animate-slide-up relative">
            <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-red-600/20 via-transparent to-red-600/20 blur-sm -z-10 animate-pulse-glow"></div>

            <div className="text-center space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12">
              {/* Logo/Icon - Responsive */}
              <div className="flex justify-center animate-bounce-in">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-800 rounded-xl sm:rounded-2xl blur-lg opacity-75 animate-pulse-glow"></div>
                  <div className="relative bg-gradient-to-r from-red-600 to-red-800 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 lg:p-6 shadow-2xl transform hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 text-white animate-pulse"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Main Heading - Fully Responsive */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold tracking-tight bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent animate-text-shimmer leading-tight px-2">
                HTML & CSS Chatbot Generator
              </h1>

              {/* Description - Responsive */}
              <div className="relative animate-fade-in-up">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/10 to-transparent blur-sm animate-pulse-glow"></div>
                <p className="relative text-sm sm:text-base md:text-lg lg:text-xl leading-6 sm:leading-7 md:leading-8 lg:leading-9 text-gray-300 max-w-4xl mx-auto font-light px-2">
                  Generate{" "}
                  <span className="font-semibold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                    beautiful landing pages
                  </span>{" "}
                  with AI. Simply describe what you want, and our chatbot will
                  create
                  <span className="font-semibold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                    {" "}
                    complete HTML and CSS code
                  </span>{" "}
                  with live preview.
                </p>
              </div>

              {/* Buttons - Fully Responsive */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 animate-slide-up px-2">
                <Button
                  asChild
                  size="lg"
                  className="group relative w-full sm:w-auto px-4 py-3 sm:px-6 sm:py-3 md:px-8 md:py-4 lg:px-10 lg:py-5 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold rounded-lg sm:rounded-xl md:rounded-2xl text-white bg-gradient-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 focus:outline-none focus:ring-2 sm:focus:ring-3 md:focus:ring-4 focus:ring-red-500/50 transition-all duration-300 transform hover:scale-105 hover:shadow-lg md:hover:shadow-xl lg:hover:shadow-2xl hover:shadow-red-900/50 shadow-md sm:shadow-lg overflow-hidden border-0 min-w-[140px] sm:min-w-[160px] md:min-w-[180px] lg:min-w-[200px]"
                >
                  <Link href="/auth/signin" className="flex items-center justify-center gap-2 sm:gap-2.5 md:gap-3 lg:gap-4">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    <span className="relative z-10 whitespace-nowrap">Get Started</span>
                    <svg
                      className="relative z-10 w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="group w-full sm:w-auto px-4 py-3 sm:px-6 sm:py-3 md:px-8 md:py-4 text-sm sm:text-base md:text-lg font-semibold rounded-lg sm:rounded-xl md:rounded-2xl bg-black/30 backdrop-blur-sm border-2 border-red-500 text-red-500 hover:bg-red-600 hover:text-white hover:border-red-500 focus:outline-none focus:ring-4 focus:ring-red-500/20 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-red-900/20"
                >
                  <Link href="/chat" className="flex items-center justify-center space-x-2">
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-12 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>Try Demo</span>
                  </Link>
                </Button>
              </div>

              {/* Feature Cards - Fully Responsive */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 pt-6 sm:pt-8 animate-fade-in-up px-2">
                <div className="group bg-black/20 backdrop-blur-sm rounded-xl p-4 sm:p-5 md:p-6 border border-red-900/20 hover:border-red-600/40 hover:bg-black/30 transition-all duration-300 transform hover:scale-105">
                  <div className="flex items-center justify-center mb-3 sm:mb-4">
                    <div className="p-2 sm:p-3 bg-gradient-to-r from-red-600/20 to-red-800/20 rounded-lg group-hover:scale-110 transition-transform duration-300">
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-red-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-sm sm:text-base md:text-lg font-semibold text-white mb-1 sm:mb-2">
                    Lightning Fast
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm">Generate in seconds</p>
                </div>

                <div className="group bg-black/20 backdrop-blur-sm rounded-xl p-4 sm:p-5 md:p-6 border border-red-900/20 hover:border-red-600/40 hover:bg-black/30 transition-all duration-300 transform hover:scale-105">
                  <div className="flex items-center justify-center mb-3 sm:mb-4">
                    <div className="p-2 sm:p-3 bg-gradient-to-r from-red-600/20 to-red-800/20 rounded-lg group-hover:scale-110 transition-transform duration-300">
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-red-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-sm sm:text-base md:text-lg font-semibold text-white mb-1 sm:mb-2">
                    Live Preview
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm">Real-time results</p>
                </div>

                <div className="group bg-black/20 backdrop-blur-sm rounded-xl p-4 sm:p-5 md:p-6 border border-red-900/20 hover:border-red-600/40 hover:bg-black/30 transition-all duration-300 transform hover:scale-105 sm:col-span-2 lg:col-span-1">
                  <div className="flex items-center justify-center mb-3 sm:mb-4">
                    <div className="p-2 sm:p-3 bg-gradient-to-r from-red-600/20 to-red-800/20 rounded-lg group-hover:scale-110 transition-transform duration-300">
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-red-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"
                        />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-sm sm:text-base md:text-lg font-semibold text-white mb-1 sm:mb-2">
                    Responsive
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm">Mobile-friendly</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Large Background Glow - Responsive */}
      <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-[400px] h-[300px] sm:w-[600px] sm:h-[500px] md:w-[800px] md:h-[600px] lg:w-[1000px] lg:h-[800px] bg-gradient-to-r from-red-600/10 to-red-800/10 rounded-full filter blur-3xl animate-pulse-glow"></div>
      </div>

      <style jsx>{`
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.8;
          }
        }
        @keyframes pulse-glow {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-25px) rotate(180deg);
          }
        }
        @keyframes fall {
          0% {
            transform: translateY(-100vh);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(100vh);
            opacity: 0;
          }
        }
        @keyframes glow {
          0%,
          100% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.3);
          }
        }
        @keyframes slide-up {
          0% {
            transform: translateY(40px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes bounce-in {
          0% {
            transform: scale(0.3);
            opacity: 0;
          }
          50% {
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        @keyframes text-shimmer {
          0% {
            background-position: -400px 0;
          }
          100% {
            background-position: 400px 0;
          }
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

        @media (max-width: 640px) {
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
        }
      `}</style>
    </main>
  );
}