"use client";

import { useState, useRef, useEffect, } from "react";
import React from "react";
import {
  X,
  Code,
  Eye,
  Smartphone,
  Tablet,
  Monitor,
  Copy,
  Check,
  Download,
  Maximize2,
  Minimize2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface CodePreviewProps {
  code: string;
  language?: string;
  onClose?: () => void;
  className?: string;
}

export default function CodePreview({
  code,
  language = "html",
  onClose,
}: CodePreviewProps) {
  const [viewMode, setViewMode] = useState<"desktop" | "tablet" | "mobile">(
    "desktop"
  );
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const viewModes = [
    { id: "desktop", label: "Desktop", icon: Monitor, width: "100%" },
    { id: "tablet", label: "Tablet", icon: Tablet, width: "768px" },
    { id: "mobile", label: "Mobile", icon: Smartphone, width: "375px" },
  ];

  useEffect(() => {
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (doc) {
        doc.open();
        doc.write(code);
        doc.close();
      }
    }
  }, [code]);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "generated-page.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div
      className={`fixed inset-0 z-50 bg-black/90 backdrop-blur-sm ${
        isFullscreen ? "p-0" : "p-2 sm:p-4"
      }`}
    >
      <div
        className={`bg-gray-900/95 backdrop-blur-xl border border-red-500/20 shadow-2xl flex flex-col ${
          isFullscreen
            ? "w-full h-full rounded-none"
            : "w-full h-full max-w-7xl mx-auto rounded-xl sm:rounded-3xl"
        }`}
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 lg:p-6 border-b border-red-500/20 space-y-3 sm:space-y-0">
          {/* Title Section */}
          <div className="flex items-center justify-between sm:justify-start">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-red-600 to-red-800 rounded-xl flex items-center justify-center shadow-lg">
                <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-white">Live Preview</h2>
                <p className="text-xs sm:text-sm text-gray-400 hidden sm:block">
                  Interactive preview of your generated code
                </p>
              </div>
            </div>
            
            {/* Mobile close button */}
            <button
              onClick={onClose}
              className="sm:hidden p-2 rounded-lg bg-red-600/20 text-red-400 hover:text-red-300 transition-colors"
              title="Close Preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Controls Section */}
          <div className="flex items-center justify-between sm:justify-end space-x-2">
            {/* Desktop View Mode Selector */}
            <div className="hidden lg:flex items-center space-x-1 bg-black/30 p-1 rounded-xl">
              {viewModes.map((mode) => {
                const Icon = mode.icon;
                return (
                  <button
                    key={mode.id}
                    onClick={() => setViewMode(mode.id as any)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                      viewMode === mode.id
                        ? "bg-red-600/20 text-red-400"
                        : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm">{mode.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Mobile View Mode Dropdown */}
            <div className="lg:hidden relative">
              <button
                onClick={toggleMobileMenu}
                className="flex items-center space-x-2 px-3 py-2 bg-black/30 rounded-xl text-gray-400 hover:text-white transition-colors"
              >
                {React.createElement(viewModes.find(m => m.id === viewMode)?.icon || Monitor, { className: "w-4 h-4" })}
                <span className="text-sm hidden sm:inline">
                  {viewModes.find(m => m.id === viewMode)?.label}
                </span>
                {mobileMenuOpen ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
              
              {mobileMenuOpen && (
                <div className="absolute top-full mt-2 right-0 bg-gray-800/95 backdrop-blur-xl border border-red-500/20 rounded-xl shadow-xl z-10 min-w-[140px]">
                  {viewModes.map((mode) => {
                    const Icon = mode.icon;
                    return (
                      <button
                        key={mode.id}
                        onClick={() => {
                          setViewMode(mode.id as any);
                          setMobileMenuOpen(false);
                        }}
                        className={`w-full flex items-center space-x-2 px-4 py-3 transition-all text-left first:rounded-t-xl last:rounded-b-xl ${
                          viewMode === mode.id
                            ? "bg-red-600/20 text-red-400"
                            : "text-gray-400 hover:text-white hover:bg-gray-700/50"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-sm">{mode.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-1 sm:space-x-2">
              <button
                onClick={() => setShowCode(!showCode)}
                className={`p-2 rounded-lg transition-colors ${
                  showCode
                    ? "bg-red-600/20 text-red-400"
                    : "bg-gray-800/50 text-gray-400 hover:text-white"
                }`}
                title="Toggle Code View"
              >
                <Code className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              <button
                onClick={handleCopyCode}
                className="p-2 rounded-lg bg-gray-800/50 text-gray-400 hover:text-white transition-colors"
                title="Copy Code"
              >
                {copied ? (
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4 sm:w-5 sm:h-5" />
                )}
              </button>

              <button
                onClick={handleDownload}
                className="p-2 rounded-lg bg-gray-800/50 text-gray-400 hover:text-white transition-colors"
                title="Download HTML"
              >
                <Download className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              <button
                onClick={toggleFullscreen}
                className="hidden sm:block p-2 rounded-lg bg-gray-800/50 text-gray-400 hover:text-white transition-colors"
                title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
              >
                {isFullscreen ? (
                  <Minimize2 className="w-5 h-5" />
                ) : (
                  <Maximize2 className="w-5 h-5" />
                )}
              </button>

              <button
                onClick={onClose}
                className="hidden sm:block p-2 rounded-lg bg-red-600/20 text-red-400 hover:text-red-300 transition-colors"
                title="Close Preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* Preview Section */}
          <div
            className={`${
              showCode ? "lg:w-1/2" : "w-full"
            } flex flex-col ${
              showCode ? "h-1/2 lg:h-full border-b lg:border-b-0 lg:border-r border-red-500/20" : "h-full"
            }`}
          >
            {/* Preview Content */}
            <div className="flex-1 flex items-center justify-center p-2 sm:p-4 bg-gradient-to-br from-gray-800/30 to-black/30 overflow-auto">
              <div
                className="bg-white rounded-lg shadow-2xl overflow-hidden transition-all duration-300"
                style={{
                  width: viewMode === "desktop" 
                    ? "100%" 
                    : viewMode === "tablet" 
                    ? "min(768px, 100%)" 
                    : "min(375px, 100%)",
                  maxWidth: "100%",
                  height: viewMode === "mobile"
                    ? "min(667px, calc(100vh - 300px))"
                    : viewMode === "tablet"
                    ? "min(1024px, calc(100vh - 300px))"
                    : "100%",
                  minHeight: "200px",
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

            {/* Preview Status Bar */}
            <div className="p-3 bg-black/20 border-t border-red-500/10">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <div className="flex items-center space-x-2 text-gray-400">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="hidden sm:inline">Live Preview Active</span>
                  <span className="sm:hidden">Active</span>
                </div>
                <div className="text-gray-500">
                  {viewMode.charAt(0).toUpperCase() + viewMode.slice(1)}
                  <span className="hidden sm:inline"> View</span>
                </div>
              </div>
            </div>
          </div>

          {/* Code Section */}
          {showCode && (
            <div className={`${
              showCode ? "h-1/2 lg:h-full lg:w-1/2" : "hidden"
            } flex flex-col`}>
              {/* Code Header */}
              <div className="p-3 sm:p-4 bg-black/20 border-b border-red-500/10">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-300 flex items-center">
                    <Code className="w-4 h-4 mr-2 text-red-400" />
                    <span className="hidden sm:inline">Source Code</span>
                    <span className="sm:hidden">Code</span>
                  </h3>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handleCopyCode}
                      className="text-xs px-2 sm:px-3 py-1 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white rounded-lg transition-colors"
                    >
                      {copied ? "Copied!" : "Copy"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Code Content */}
              <div className="flex-1 overflow-auto">
                <pre className="p-3 sm:p-4 text-xs text-gray-300 bg-black/40 h-full overflow-auto">
                  <code className="language-html break-all sm:break-normal">{code}</code>
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 bg-black/20 border-t border-red-500/10">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <span className="hidden sm:inline">Ready for download</span>
              <span className="sm:hidden">Ready</span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden lg:inline">Interactive preview</span>
              <span className="hidden xl:inline">•</span>
              <span className="hidden xl:inline">Responsive design testing</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>{Math.round(code.length / 1000)}k chars</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}