
"use client";

import { useState } from "react";
import { Menu } from "lucide-react";

import { Button } from "../../../components/ui/button";
import { Separator } from "../../../components/ui/separator";

import type { ChatMessage as MessageType } from "../../../../types/chat";

import ChatSidebar from "./ChatSidebar";
import ChatWelcome from "./ChatWelcome";
import ChatWindow from "./ChatWindow";

import { getDummyResponse } from "../../../../types/chat-data";

export default function ChatLayout() {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleSend = (content: string) => {
    if (loading || !content.trim()) return;

    const userMessage: MessageType = {
      id: crypto.randomUUID(),
      role: "user",
      content,
      createdAt: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const response: MessageType = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: getDummyResponse(content),
        createdAt: new Date(),
      };

      setMessages((prev) => [...prev, response]);
      setLoading(false);
    }, 1200);
  };

  const handleNewChat = () => {
    setMessages([]);
    setLoading(false);
  };

  const handleSelectChat = () => {
    setMessages([
      {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "This is a demo conversation. Start a new chat to try the dummy AI assistant.",
        createdAt: new Date(),
      },
    ]);
  };

  return (
    <div className="flex h-dvh overflow-hidden bg-background">

      {sidebarOpen && (
        <div className="hidden md:block">
          <ChatSidebar
            onNewChat={handleNewChat}
            onSelectChat={handleSelectChat}
          />
        </div>
      )}

      <main className="flex min-w-0 flex-1 flex-col">

        <header className="flex h-14 shrink-0 items-center gap-3 border-b px-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle sidebar"
          >
            <Menu size={20} />
          </Button>

          <Separator orientation="vertical" className="h-6" />

          <span className="text-sm font-semibold">
            New Conversation
          </span>
        </header>

        {messages.length === 0 ? (
          <ChatWelcome onSend={handleSend} />
        ) : (
          <ChatWindow
            messages={messages}
            loading={loading}
            onSend={handleSend}
          />
        )}

      </main>
    </div>
  );
}
