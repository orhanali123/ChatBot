export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  generatedCode?: string;
  timestamp: Date;
}

export interface ChatState {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
}

export interface CodePreviewProps {
  code: string;
  language: 'html' | 'css' | 'javascript';
}