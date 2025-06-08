"use client";

import { useState, useRef, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  Send,
  Sparkles,
  Code,
  Zap,
  Bot,
  User,
  Copy,
  Check,
  Menu,
  X,
  Download,
  Eye,
  Settings,
  LogOut,
} from "lucide-react";
import CodePreview from "@/components/chat/CodePreview";

const genAI = new GoogleGenerativeAI(
  process.env.NEXT_PUBLIC_GEMINI_API_KEY || ""
);

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  generatedCode?: string;
}

interface ChatInterfaceProps {
  onCodeGenerated?: (code: string) => void;
  onLogout?: () => void;
}

export default function ChatInterface({
  onCodeGenerated,
  onLogout,
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewCode, setPreviewCode] = useState("");
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const suggestions = [
    {
      text: "Create a modern SaaS landing page with hero section",
      icon: "🚀",
      color: "bg-gradient-to-r from-red-600 to-red-800",
      category: "Landing Pages",
    },
    {
      text: "Build a creative portfolio with image gallery",
      icon: "🎨",
      color: "bg-gradient-to-r from-gray-800 to-red-700",
      category: "Portfolio",
    },
    {
      text: "Design a restaurant website with menu cards",
      icon: "🍽️",
      color: "bg-gradient-to-r from-red-700 to-black",
      category: "Business",
    },
    {
      text: "Create an elegant pricing table with animations",
      icon: "💰",
      color: "bg-gradient-to-r from-black to-red-600",
      category: "Components",
    },
    {
      text: "Build a dashboard with charts and widgets",
      icon: "📊",
      color: "bg-gradient-to-r from-red-800 to-gray-900",
      category: "Dashboard",
    },
    {
      text: "Design a blog layout with sidebar",
      icon: "📝",
      color: "bg-gradient-to-r from-gray-900 to-red-700",
      category: "Blog",
    },
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const generateCodeWithGemini = async (
    userPrompt: string
  ): Promise<{ code: string; description: string }> => {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `
You are an expert web designer and developer. Create a complete, modern HTML page with embedded CSS based on this request: "${userPrompt}"

Requirements:
1. Generate a complete HTML5 document with embedded CSS
2. Use modern CSS features like flexbox, grid, gradients, and animations
3. Make it responsive and mobile-friendly
4. Use a sophisticated color scheme (prefer dark themes with accent colors)
5. Include hover effects and smooth transitions
6. Ensure the design is visually appealing and professional
7. Add appropriate semantic HTML tags
8. Include some interactive elements if relevant

Please provide:
1. The complete HTML code (with embedded CSS in <style> tags)
2. A brief description of what you created

Format your response as:
DESCRIPTION: [Brief description of the webpage]
CODE: [Complete HTML code starting with <!DOCTYPE html>]
`;

      const result = await model.generateContent(prompt);
      const response = result.response.text();
      console.log("Gemini AI Response:", response);

      const descriptionMatch = response.match(
        /DESCRIPTION:\s*([\s\S]*?)(?=CODE:|$)/
      );
      const codeMatch = response.match(/CODE:\s*([\s\S]*)/);

      const description = descriptionMatch
        ? descriptionMatch[1].trim()
        : "Generated a modern webpage based on your request.";
      let code = codeMatch ? codeMatch[1].trim() : "";

      code = code.replace(/```html|```/g, "").trim();

      if (!code.includes("<!DOCTYPE html>")) {
        code = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generated Page</title>
    <style>
        body {
            margin: 0;
            padding: 40px;
            background: linear-gradient(135deg, #1a1a1a, #2d2d2d);
            color: #ffffff;
            font-family: 'Arial', sans-serif;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .container {
            text-align: center;
            padding: 40px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 20px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }
        h1 {
            color: #ff6b6b;
            font-size: 3em;
            margin-bottom: 20px;
            text-shadow: 0 0 20px rgba(255, 107, 107, 0.5);
        }
        p {
            font-size: 1.2em;
            margin: 20px 0;
            opacity: 0.9;
        }
        .btn {
            background: linear-gradient(45deg, #ff6b6b, #ee5a24);
            color: white;
            padding: 15px 30px;
            border: none;
            border-radius: 50px;
            font-size: 1.1em;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
        }
        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(255, 107, 107, 0.4);
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Welcome!</h1>
        <p>This page was generated based on your request: "${userPrompt}"</p>
        <button class="btn">Get Started</button>
    </div>
</body>
</html>`;
      }

      return { code, description };
    } catch (error) {
      console.error("Gemini API Error:", error);
      throw new Error("Failed to generate code. Please try again.");
    }
  };

  const handleLogout = () => {
    setShowLogoutPopup(true);

    setTimeout(() => {
      setShowLogoutPopup(false);
      if (onLogout) {
        onLogout();
      } else {
        window.location.href = "/auth/signin";
      }
    }, 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
      alert(
        "Gemini API key is not configured. Please add NEXT_PUBLIC_GEMINI_API_KEY to your environment variables."
      );
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const { code, description } = await generateCodeWithGemini(
        userMessage.content
      );

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: description,
        timestamp: new Date(),
        generatedCode: code,
      };

      setMessages((prev) => [...prev, assistantMessage]);

      if (onCodeGenerated) {
        onCodeGenerated(code);
      }
    } catch (error) {
      console.error("Error generating code:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "Sorry, I encountered an error while generating your code. Please check your API key and try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    inputRef.current?.focus();
    setIsSidebarOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);

    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + "px";
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  const handleCopyCode = async (code: string, messageId: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(messageId);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  const handleDownloadCode = (
    code: string,
    filename: string = "generated-page.html"
  ) => {
    const blob = new Blob([code], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handlePreviewCode = (code: string) => {
    setPreviewCode(code);
    setShowPreview(true);
  };

return (
    <div className="flex h-screen bg-gradient-to-br from-black via-gray-900 to-red-950 relative overflow-hidden">
      {showLogoutPopup && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center px-4">
          <div className="bg-gray-900/95 backdrop-blur-xl p-6 sm:p-8 rounded-3xl shadow-2xl border border-red-500/20 max-w-md w-full mx-4 transform transition-all duration-300 scale-100">
            <div className="text-center space-y-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-green-600 to-green-700 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-green-500/30">
                <Check className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                Logout Successful!
              </h3>
              <p className="text-sm sm:text-base text-gray-300">
                You have been logged out successfully. Redirecting to sign in
                page...
              </p>
              <div className="flex space-x-1 justify-center">
                <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-red-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-red-600 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 sm:-top-40 -right-20 sm:-right-40 w-40 h-40 sm:w-80 sm:h-80 bg-red-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div
          className="absolute -bottom-20 sm:-bottom-40 -left-20 sm:-left-40 w-40 h-40 sm:w-80 sm:h-80 bg-red-700/20 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 sm:w-80 sm:h-80 bg-gray-800/20 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 sm:w-80 bg-black/95 backdrop-blur-xl border-r border-red-500/20 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 sm:p-6 border-b border-red-500/20">
            <div className="flex items-center justify-between">
              <h2 className="text-base sm:text-lg font-semibold text-white flex items-center">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-red-500" />
                Quick Start
              </h2>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="lg:hidden p-2 rounded-lg hover:bg-red-500/10 transition-colors text-white"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-2 sm:space-y-3">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion.text)}
                className="w-full text-left p-3 sm:p-4 rounded-xl bg-gray-900/50 hover:bg-gray-800/70 border border-red-500/20 hover:border-red-500/40 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-red-500/10 group"
              >
                <div className="flex items-start space-x-2 sm:space-x-3">
                  <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg ${suggestion.color} flex items-center justify-center text-white text-base sm:text-lg shadow-lg flex-shrink-0`}
                  >
                    {suggestion.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium text-red-400 mb-1">
                      {suggestion.category}
                    </div>
                    <div className="text-xs sm:text-sm font-medium text-gray-200 group-hover:text-white line-clamp-2">
                      {suggestion.text}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col min-w-0 relative z-10">
        <div className="bg-black/80 backdrop-blur-xl shadow-2xl border-b border-red-500/20 p-3 sm:p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-red-500/10 transition-colors text-white"
              >
                <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-red-600 to-red-800 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/30">
                  <Code className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                </div>
                <div className="min-w-0">
                  <h1 className="text-base sm:text-lg lg:text-2xl font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent truncate">
                    AI Code Generator
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-400 flex items-center">
                    <Sparkles className="w-2 h-2 sm:w-3 sm:h-3 mr-1" />
                    Powered by Gemini AI
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="hidden sm:flex items-center space-x-2 text-xs text-gray-400"></div>

              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-2 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white rounded-lg sm:rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-lg shadow-lg shadow-red-500/20 group"
                title="Logout"
              >
                <LogOut className="w-3 h-3 sm:w-4 sm:h-4 group-hover:rotate-12 transition-transform duration-200" />
                <span className="text-xs sm:text-sm font-medium hidden sm:inline">
                  Logout
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6 space-y-3 sm:space-y-4 lg:space-y-6">
          {messages.length === 0 && (
            <>
              <div className="flex justify-center">
                <div className="max-w-2xl w-full">
                  <div className="bg-gray-900/80 backdrop-blur-xl p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl shadow-2xl border border-red-500/20">
                    <div className="text-center space-y-3 sm:space-y-4">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-red-600 to-red-800 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-red-500/30">
                        <Bot className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                      </div>

                      <div>
                        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-2">
                          Welcome to AI Code Generator! 🔥
                        </h2>
                        <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                          Powered by Gemini AI, I'll help you create stunning
                          HTML & CSS code with sleek designs. Just describe what
                          you want to build!
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-4 sm:mt-6">
                        <div className="text-center p-3 sm:p-4 bg-red-500/10 rounded-xl sm:rounded-2xl border border-red-500/20">
                          <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-red-400 mx-auto mb-2" />
                          <div className="text-xs sm:text-sm font-medium text-white">
                            AI Powered
                          </div>
                          <div className="text-xs text-gray-400">
                            Gemini AI integration
                          </div>
                        </div>
                        <div className="text-center p-3 sm:p-4 bg-gray-800/50 rounded-xl sm:rounded-2xl border border-gray-700/50">
                          <Code className="w-6 h-6 sm:w-8 sm:h-8 text-gray-300 mx-auto mb-2" />
                          <div className="text-xs sm:text-sm font-medium text-white">
                            Modern Code
                          </div>
                          <div className="text-xs text-gray-400">
                            Latest HTML & CSS
                          </div>
                        </div>
                        <div className="text-center p-3 sm:p-4 bg-red-500/10 rounded-xl sm:rounded-2xl border border-red-500/20">
                          <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-red-400 mx-auto mb-2" />
                          <div className="text-xs sm:text-sm font-medium text-white">
                            Responsive
                          </div>
                          <div className="text-xs text-gray-400">
                            Mobile-first designs
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:hidden">
                <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4 flex items-center">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-red-500" />
                  Quick Ideas
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {suggestions.slice(0, 4).map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion.text)}
                      className="text-left p-3 sm:p-4 bg-gray-900/50 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-red-500/20 hover:border-red-500/40 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-red-500/10"
                    >
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <div
                          className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl ${suggestion.color} flex items-center justify-center text-white shadow-lg flex-shrink-0`}
                        >
                          {suggestion.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs sm:text-sm font-medium text-gray-200 line-clamp-2">
                            {suggestion.text}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[90%] sm:max-w-[85%] lg:max-w-3xl ${
                  message.role === "user" ? "order-2" : ""
                }`}
              >
                <div
                  className={`p-3 sm:p-4 lg:p-6 rounded-2xl sm:rounded-3xl shadow-2xl backdrop-blur-xl border ${
                    message.role === "user"
                      ? "bg-gradient-to-r from-red-600 to-red-800 text-white border-red-500/30 shadow-red-500/20"
                      : "bg-gray-900/80 border-red-500/20 shadow-black/50"
                  }`}
                >
                  <div className="flex items-start space-x-2 sm:space-x-3">
                    <div
                      className={`w-6 h-6 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 ${
                        message.role === "user"
                          ? "bg-white/20 text-white"
                          : "bg-gradient-to-r from-red-600 to-red-800 text-white shadow-lg shadow-red-500/30"
                      }`}
                    >
                      {message.role === "user" ? (
                        <User className="w-3 h-3 sm:w-4 sm:h-4" />
                      ) : (
                        <Bot className="w-3 h-3 sm:w-4 sm:h-4" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p
                        className={`whitespace-pre-wrap leading-relaxed text-sm sm:text-base ${
                          message.role === "user"
                            ? "text-white"
                            : "text-gray-200"
                        }`}
                      >
                        {message.content}
                      </p>

                      {message.generatedCode && (
                        <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-black/50 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-red-500/20">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
                            <div className="flex items-center text-xs sm:text-sm font-medium text-gray-300">
                              <Code className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-red-400" />
                              Generated Code Ready!
                            </div>
                            <div className="flex items-center space-x-1 sm:space-x-2">
                              <button
                                onClick={() =>
                                  handlePreviewCode(message.generatedCode!)
                                }
                                className="flex items-center space-x-1 px-2 sm:px-3 py-1 bg-red-600/20 hover:bg-red-600/30 rounded-lg transition-colors text-xs font-medium text-red-300 hover:text-red-200"
                              >
                                <Eye className="w-3 h-3" />
                                <span>Preview</span>
                              </button>
                              <button
                                onClick={() =>
                                  handleDownloadCode(message.generatedCode!)
                                }
                                className="flex items-center space-x-1 px-2 sm:px-3 py-1 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg transition-colors text-xs font-medium text-gray-300 hover:text-white"
                              >
                                <Download className="w-3 h-3" />
                                <span className="hidden xs:inline">Download</span>
                                <span className="xs:hidden">DL</span>
                              </button>
                              <button
                                onClick={() =>
                                  handleCopyCode(
                                    message.generatedCode!,
                                    message.id
                                  )
                                }
                                className="flex items-center space-x-1 px-2 sm:px-3 py-1 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg transition-colors text-xs font-medium text-gray-300 hover:text-white"
                              >
                                {copiedCode === message.id ? (
                                  <>
                                    <Check className="w-3 h-3 text-green-400" />
                                    <span className="text-green-400 hidden xs:inline">
                                      Copied!
                                    </span>
                                    <span className="text-green-400 xs:hidden">
                                      ✓
                                    </span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3 h-3" />
                                    <span className="hidden xs:inline">Copy</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                          <div className="text-xs text-gray-400 bg-black/30 p-2 sm:p-3 rounded-lg">
                            Your HTML/CSS code has been generated using Gemini
                            AI and is ready! You can preview it, download the
                            file, or copy the code to use in your project.
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-3xl bg-gray-900/80 backdrop-blur-xl p-3 sm:p-4 lg:p-6 rounded-2xl sm:rounded-3xl shadow-2xl border border-red-500/20">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-red-600 to-red-800 rounded-lg sm:rounded-xl flex items-center justify-center text-white shadow-lg shadow-red-500/30">
                    <Bot className="w-3 h-3 sm:w-4 sm:h-4" />
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <span className="text-gray-300 text-xs sm:text-sm font-medium">
                      AI is generating your code
                    </span>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-red-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-red-600 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="p-3 sm:p-4 lg:p-6 bg-black/80 backdrop-blur-xl border-t border-red-500/20">
          <div className="flex items-end space-x-2 sm:space-x-3 lg:space-x-4">
            <div className="flex-1">
              <textarea
                ref={inputRef}
                value={input}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Describe what you want to create... 🔥"
                className="w-full p-3 sm:p-4 lg:p-5 border border-red-500/30 rounded-xl sm:rounded-2xl lg:rounded-3xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500/50 resize-none min-h-[48px] sm:min-h-[56px] max-h-[120px] bg-gray-900/70 backdrop-blur-sm placeholder-gray-500 text-white transition-all duration-200 text-sm sm:text-base"
                disabled={isLoading}
                rows={1}
              />
            </div>
            <button
              onClick={(e) => handleSubmit(e)}
              disabled={!input.trim() || isLoading}
              className="p-3 sm:p-4 lg:p-5 bg-gradient-to-r from-red-600 to-red-800 text-white rounded-xl sm:rounded-2xl lg:rounded-3xl hover:from-red-700 hover:to-red-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 hover:shadow-lg shadow-lg shadow-red-500/30"
            >
              <Send className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          <div className="mt-2 sm:mt-3 text-xs text-gray-500 text-center flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-2">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-3 h-3" />
              <span>Press Enter to send</span>
            </div>
            <span className="hidden sm:inline">•</span>
            <span>Shift+Enter for new line</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">Be specific for better results</span>
          </div>
        </div>
      </div>

      {showPreview && (
        <CodePreview code={previewCode} onClose={() => setShowPreview(false)} />
      )}
    </div>
  );
}