'use client'

import { useState, useRef, useEffect } from 'react'
import { X, Code, Eye, Smartphone, Tablet, Monitor, Copy, Check, Download, Maximize2, Minimize2 } from 'lucide-react'

interface CodePreviewProps {
  code: string
  language?: string
  onClose?: () => void
  className?: string
}

export default function CodePreview({ code, language = 'html', onClose }: CodePreviewProps) {
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')
  const [showCode, setShowCode] = useState(false)
  const [copied, setCopied] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const viewModes = [
    { id: 'desktop', label: 'Desktop', icon: Monitor, width: '100%' },
    { id: 'tablet', label: 'Tablet', icon: Tablet, width: '768px' },
    { id: 'mobile', label: 'Mobile', icon: Smartphone, width: '375px' }
  ]

  useEffect(() => {
    if (iframeRef.current) {
      const iframe = iframeRef.current
      const doc = iframe.contentDocument || iframe.contentWindow?.document
      if (doc) {
        doc.open()
        doc.write(code)
        doc.close()
      }
    }
  }, [code])

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy code:', err)
    }
  }

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'generated-page.html'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  return (
    <div className={`fixed inset-0 z-50 bg-black/90 backdrop-blur-sm ${isFullscreen ? 'p-0' : 'p-4'}`}>
      <div className={`bg-gray-900/95 backdrop-blur-xl border border-red-500/20 shadow-2xl flex flex-col ${
        isFullscreen ? 'w-full h-full rounded-none' : 'w-full h-full max-w-7xl mx-auto rounded-3xl'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 lg:p-6 border-b border-red-500/20">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-red-800 rounded-xl flex items-center justify-center shadow-lg">
              <Eye className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Live Preview</h2>
              <p className="text-sm text-gray-400">Interactive preview of your generated code</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* View Mode Buttons */}
            <div className="hidden md:flex items-center space-x-1 bg-black/30 p-1 rounded-xl">
              {viewModes.map((mode) => {
                const Icon = mode.icon
                return (
                  <button
                    key={mode.id}
                    onClick={() => setViewMode(mode.id as any)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                      viewMode === mode.id
                        ? 'bg-red-600/20 text-red-400'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm hidden lg:block">{mode.label}</span>
                  </button>
                )
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowCode(!showCode)}
                className={`p-2 rounded-lg transition-colors ${
                  showCode
                    ? 'bg-red-600/20 text-red-400'
                    : 'bg-gray-800/50 text-gray-400 hover:text-white'
                }`}
                title="Toggle Code View"
              >
                <Code className="w-5 h-5" />
              </button>

              <button
                onClick={handleCopyCode}
                className="p-2 rounded-lg bg-gray-800/50 text-gray-400 hover:text-white transition-colors"
                title="Copy Code"
              >
                {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
              </button>

              <button
                onClick={handleDownload}
                className="p-2 rounded-lg bg-gray-800/50 text-gray-400 hover:text-white transition-colors"
                title="Download HTML"
              >
                <Download className="w-5 h-5" />
              </button>

              <button
                onClick={toggleFullscreen}
                className="p-2 rounded-lg bg-gray-800/50 text-gray-400 hover:text-white transition-colors"
                title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
              >
                {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
              </button>

              <button
                onClick={onClose}
                className="p-2 rounded-lg bg-red-600/20 text-red-400 hover:text-red-300 transition-colors"
                title="Close Preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Preview Panel */}
          <div className={`${showCode ? 'w-1/2' : 'w-full'} flex flex-col border-r ${showCode ? 'border-red-500/20' : 'border-transparent'}`}>
            {/* Mobile View Mode Selector */}
            <div className="md:hidden flex items-center justify-center space-x-1 p-3 bg-black/20 border-b border-red-500/10">
              {viewModes.map((mode) => {
                const Icon = mode.icon
                return (
                  <button
                    key={mode.id}
                    onClick={() => setViewMode(mode.id as any)}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all text-sm ${
                      viewMode === mode.id
                        ? 'bg-red-600/20 text-red-400'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{mode.label}</span>
                  </button>
                )
              })}
            </div>

            {/* Preview Container */}
            <div className="flex-1 flex items-center justify-center p-4 bg-gradient-to-br from-gray-800/30 to-black/30">
              <div
                className="bg-white rounded-lg shadow-2xl overflow-hidden transition-all duration-300"
                style={{
                  width: viewModes.find(m => m.id === viewMode)?.width,
                  maxWidth: '100%',
                  height: viewMode === 'mobile' ? '667px' : viewMode === 'tablet' ? '1024px' : '100%',
                  maxHeight: 'calc(100vh - 200px)'
                }}
              >
                <iframe
                  ref={iframeRef}
                  className="w-full h-full border-0"
                  title="Code Preview"
                  sandbox="allow-scripts allow-same-origin"
                />
              </div>
            </div>

            {/* Preview Footer */}
            <div className="p-3 bg-black/20 border-t border-red-500/10">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2 text-gray-400">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>Live Preview Active</span>
                </div>
                <div className="text-gray-500">
                  {viewMode.charAt(0).toUpperCase() + viewMode.slice(1)} View
                </div>
              </div>
            </div>
          </div>

          {/* Code Panel */}
          {showCode && (
            <div className="w-1/2 flex flex-col">
              <div className="p-4 bg-black/20 border-b border-red-500/10">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-300 flex items-center">
                    <Code className="w-4 h-4 mr-2 text-red-400" />
                    Source Code
                  </h3>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handleCopyCode}
                      className="text-xs px-3 py-1 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white rounded-lg transition-colors"
                    >
                      {copied ? 'Copied!' : 'Copy All'}
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 overflow-auto">
                <pre className="p-4 text-xs text-gray-300 bg-black/40 h-full overflow-auto">
                  <code className="language-html">{code}</code>
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Bar */}
        <div className="p-4 bg-black/20 border-t border-red-500/10">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center space-x-4">
              <span>Ready for download</span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline">Interactive preview</span>
              <span className="hidden md:inline">•</span>
              <span className="hidden md:inline">Responsive design testing</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>{code.length} characters</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}