import { useState, useCallback } from 'react';
import { ChatMessage, ChatState } from '@/types/chat';
import { generateRandomId } from '@/lib/utils';
import axios from 'axios';
import toast from 'react-hot-toast';

export function useChat(sessionId?: string) {
  const [state, setState] = useState<ChatState>({
    messages: [],
    isLoading: false,
    error: null,
  });

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    const userMessage: ChatMessage = {
      id: generateRandomId(),
      content,
      role: 'user',
      timestamp: new Date(),
    };

    setState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isLoading: true,
      error: null,
    }));

    try {
      const response = await axios.post('/api/chat', {
        message: content,
        sessionId,
      });

      const assistantMessage: ChatMessage = {
        id: generateRandomId(),
        content: response.data.message,
        role: 'assistant',
        generatedCode: response.data.generatedCode,
        timestamp: new Date(),
      };

      setState(prev => ({
        ...prev,
        messages: [...prev.messages, assistantMessage],
        isLoading: false,
      }));
    } catch (error) {
      const errorMessage = axios.isAxiosError(error) 
        ? error.response?.data?.message || 'Failed to send message'
        : 'An unexpected error occurred';
      
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
      
      toast.error(errorMessage);
    }
  }, [sessionId]);

  const clearChat = useCallback(() => {
    setState({
      messages: [],
      isLoading: false,
      error: null,
    });
  }, []);

  return {
    ...state,
    sendMessage,
    clearChat,
  };
}