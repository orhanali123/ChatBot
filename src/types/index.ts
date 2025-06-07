export interface User {
  id: string;
  name?: string | null;
  email: string;
  image?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatSession {
  id: string;
  title?: string | null;
  userId: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  generatedCode?: string | null;
  chatSessionId: string;
  createdAt: Date;
}

export interface ChatResponse {
  message: string;
  generatedCode?: string;
}

export interface GenerateCodeRequest {
  prompt: string;
  sessionId?: string;
}

export interface GenerateCodeResponse {
  code: string;
  explanation: string;
}