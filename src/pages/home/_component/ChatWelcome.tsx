
"use client";

import { useState } from "react";
import {
  ArrowUp,
  Bot,
  Code2,
  BookOpen,
  Lightbulb,
  FileText,
  Paperclip,
  Plus,
  Sparkles,
} from "lucide-react";

import { Button } from "../../../components/ui/button";
import { Textarea } from "../../../components/ui/textarea";
import { Card } from "../../../components/ui/card";

const suggestions = [
  {
    title: "Write code",
    description: "Build and debug applications",
    icon: Code2,
    prompt: "Help me write code",
  },
  {
    title: "Learn something",
    description: "Explore new concepts",
    icon: BookOpen,
    prompt: "Teach me something new",
  },
  {
    title: "Get ideas",
    description: "Brainstorm creative solutions",
    icon: Lightbulb,
    prompt: "Help me brainstorm ideas",
  },
  {
    title: "Analyze documents",
    description: "Understand your documents",
    icon: FileText,
    prompt: "Help me analyze a document",
  },
];

interface ChatWelcomeProps {
  onSendMessage: (message: string) => void;
}

export default function ChatWelcome({
  onSendMessage,
}: ChatWelcomeProps) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage) return;

    onSendMessage(trimmedMessage);
    setMessage("");
  };

  const handleSuggestion = (prompt: string) => {
    onSendMessage(prompt);
  };

  return (
    <main className="flex min-h-screen flex-col bg-background">

      {/* Header */}
      <header className="flex h-16 items-center border-b px-6">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Bot size={23} />
          </div>

          <span className="text-lg font-semibold tracking-tight">
            AI Assistant
          </span>
        </div>
      </header>

      {/* Welcome section */}
      <section className="flex flex-1 flex-col items-center justify-center px-4 py-10">

        <div className="mb-5 flex size-16 items-center justify-center rounded-2xl bg-secondary text-primary">
          <Sparkles size={32} />
        </div>

        <h1 className="text-center text-3xl font-bold tracking-tight md:text-4xl">
          How can I help you today?
        </h1>

        <p className="mt-3 max-w-lg text-center text-sm text-muted-foreground md:text-base">
          Your AI assistant for learning, creating,
          and exploring new ideas.
        </p>

        {/* Suggestion cards */}
        <div className="mt-10 grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2">
          {suggestions.map((item) => {
            const Icon = item.icon;

            return (
              <Card
                key={item.title}
                onClick={() => handleSuggestion(item.prompt)}
                className="cursor-pointer gap-2 rounded-xl border bg-card p-5 shadow-none transition-all hover:-translate-y-1 hover:border-primary/40 hover:bg-secondary/40 hover:shadow-sm"
              >
                <Icon className="size-6 text-primary" />

                <h3 className="font-semibold">
                  {item.title}
                </h3>

                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </Card>
            );
          })}
        </div>

        {/* Message input */}
        <div className="mt-8 w-full max-w-2xl">
          <div className="rounded-2xl border bg-card p-3 shadow-sm transition-colors focus-within:border-primary/50">

            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Ask me anything..."
              className="min-h-16 resize-none border-0 bg-transparent shadow-none focus-visible:ring-0"
            />

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Button
                  variant="ghost"
                  size="icon"
                  type="button"
                  aria-label="Attach file"
                >
                  <Paperclip />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  type="button"
                  aria-label="More options"
                >
                  <Plus />
                </Button>
              </div>

              <Button
                size="icon"
                onClick={handleSend}
                disabled={!message.trim()}
                className="rounded-xl"
                aria-label="Send message"
              >
                <ArrowUp />
              </Button>
            </div>
          </div>

          <p className="mt-3 text-center text-xs text-muted-foreground">
            AI can make mistakes. Verify important information.
          </p>
        </div>
      </section>
    </main>
  );
}
