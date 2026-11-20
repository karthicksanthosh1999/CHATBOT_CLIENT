
"use client";

import { useState } from "react";
import { ArrowUp, Paperclip } from "lucide-react";

import { Button } from "../../../components/ui/button";
import { Textarea } from "../../../components/ui/textarea";
import { axiosInstants } from "../../../instant";

interface Props {
  onSend: (message: string) => void;
}

export default function ChatInput({ onSend }: Props) {

  const [message, setMessage] = useState("");

  const handleSend = async() => {
    try {      
      const trimmedMessage = message.trim();
      if (!trimmedMessage) return;
      await axiosInstants.post(`/chat`, { question : trimmedMessage });
      onSend(trimmedMessage)
      setMessage("");
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="rounded-2xl border bg-card p-3 shadow-sm focus-within:border-primary/50">

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

        <Button
          variant="ghost"
          size="icon"
          type="button"
          aria-label="Attach file (demo only)"
        >
          <Paperclip className="size-5" />
        </Button>

        <Button
          size="icon"
          onClick={handleSend}
          disabled={!message.trim()}
          className="rounded-xl bg-blue-700"
          aria-label="Send message"
        >
          <ArrowUp className="size-5" />
        </Button>

      </div>
    </div>
  );
}
