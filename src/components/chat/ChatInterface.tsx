"use client";

import { useState } from "react";
import { useChat } from "@/hooks/useChat";
import { Button } from "@/components/ui/button";
import { MessageBubble, Textarea } from "@/components/ui/textarea";
import CodePreview from "./CodePreview";
import { Send, Loader2 } from "lucide-react";

interface ChatInterfaceProps {
  sessionId?: string;
}

export function ChatInterface({ sessionId }: ChatInterfaceProps) {
  const [input, setInput] = useState("");
  const { messages, isLoading, sendMessage } = useChat(sessionId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    await sendMessage(input);
    setInput("");
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            <p>Start a conversation to generate HTML and CSS code!</p>
            <p className="text-sm mt-2">
              Try: "Create a landing page for a coffee shop"
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <div key={message.id}>
              <MessageBubble message={message} />
              {message.generatedCode && (
                <div className="mt-4">
                  <CodePreview code={message.generatedCode} language="html" />
                </div>
              )}
            </div>
          ))
        )}
        {isLoading && (
          <div className="flex items-center justify-center py-4">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span className="ml-2">Generating code...</span>
          </div>
        )}
      </div>

      <div className="border-t p-4">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe the HTML/CSS you want to generate..."
            className="flex-1 min-h-[60px] resize-none"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
          <Button type="submit" disabled={!input.trim() || isLoading}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
