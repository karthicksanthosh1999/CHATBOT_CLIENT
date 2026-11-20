
import { Bot, User, Copy, Check } from "lucide-react";
import { useState } from "react";

import { Button } from "../../../components/ui/button";
import type { ChatMessage as MessageType } from "../../../../types/chat";
import MarkdownRenderer from "#components/MarkdownRenderer";

interface Props {
  message: MessageType;
}

export default function ChatMessage({ message }: Props) {
  const isUser = message.role === "user";
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard may be unavailable in some browser contexts.
    }
  };

  return (
    <div className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}>

      {!isUser && (
        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-blue-700 text-primary-foreground">
          <Bot size={18} />
        </div>
      )}

      <div className={`group max-w-[85%] space-y-2 ${isUser ? "items-end" : "items-start"}`}>

        <div
          className={`whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-7 ${
            isUser
              ? "rounded-br-sm bg-blue-700 text-primary-foreground"
              : "rounded-bl-sm border bg-card text-card-foreground"
          }`}
        >
          <MarkdownRenderer content={message.content} />
        </div>

        {!isUser && (
          <Button
            variant="ghost"
            size="icon"
            className="size-7 opacity-0 transition-opacity group-hover:opacity-100"
            onClick={handleCopy}
            aria-label="Copy response"
          >
            {copied ? <Check size={15} /> : <Copy size={15} />}
          </Button>
        )}
      </div>

      {isUser && (
        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
          <User size={18} />
        </div>
      )}

    </div>
  );
}
