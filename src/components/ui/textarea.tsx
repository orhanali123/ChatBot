import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 resize-none",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";

// Message interface based on your ChatInterface usage
export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp?: Date;
  generatedCode?: string;
}

export interface MessageBubbleProps {
  message: Message;
  className?: string;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, className }) => {
  const isUser = message.role === 'user';
  
  return (
    <div
      className={cn(
        "flex w-full",
        isUser ? "justify-end" : "justify-start",
        className
      )}
    >
      <div
        className={cn(
          "max-w-[80%] rounded-lg px-4 py-2 text-sm",
          isUser
            ? "bg-primary text-primary-foreground ml-4"
            : "bg-muted text-muted-foreground mr-4"
        )}
      >
        <div className="whitespace-pre-wrap break-words">
          {message.content}
        </div>
        {message.timestamp && (
          <div
            className={cn(
              "text-xs mt-1 opacity-70",
              isUser ? "text-right" : "text-left"
            )}
          >
            {message.timestamp.toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
        )}
      </div>
    </div>
  );
};

MessageBubble.displayName = "MessageBubble";

export { Textarea, MessageBubble };