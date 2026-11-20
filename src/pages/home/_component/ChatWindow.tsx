
"use client";

import { useEffect, useRef } from "react";

import { ScrollArea } from "../../../components/ui/scroll-area";
import type { ChatMessage as MessageType } from "../../../../types/chat";

import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import TypingIndicator from "./TypingIndicator";

interface Props {
  messages: MessageType[];
  loading: boolean;
  onSend: (message: string) => void;
}

export default function ChatWindow({
  messages,
  loading,
  onSend,
}: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="flex min-h-0 flex-1 flex-col">

      <ScrollArea className="min-h-0 flex-1">
        <div className="mx-auto flex max-w-4xl flex-col gap-6 px-4 py-8">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {loading && <TypingIndicator />}
          <div ref={bottomRef} />
        </div>
      </ScrollArea>

      <div className="border-t bg-background px-4 py-4">
        <div className="mx-auto max-w-4xl">
          <ChatInput onSend={onSend} />

          <p className="mt-2 text-center text-xs text-muted-foreground">
            AI can make mistakes. Verify important information.
          </p>
        </div>
      </div>

    </div>
  );
}
