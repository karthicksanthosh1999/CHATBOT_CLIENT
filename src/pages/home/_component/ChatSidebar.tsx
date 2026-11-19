
import { Bot, MessageSquare, Plus, PanelLeftClose } from "lucide-react";

import { Button } from "../../../components/ui/button";
import { Separator } from "../../../components/ui/separator";

import { dummyConversations } from "../../../../types/chat-data";

interface Props {
  onNewChat: () => void;
  onSelectChat: (id: string) => void;
}

export default function ChatSidebar({
  onNewChat,
  onSelectChat,
}: Props) {
  return (
    <aside className="flex h-full w-72 shrink-0 flex-col border-r bg-card p-4">

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex size-9 items-center justify-center rounded-xl bg-blue-600 text-primary-foreground">
            <Bot size={21} />
          </div>
          <span className="font-semibold">AI Assistant</span>
        </div>
      </div>

      <Button
        onClick={onNewChat}
        className="mt-8 w-full justify-start gap-2 rounded-xl bg-blue-600 cursor-pointer hover:bg-blue-700 transition duration-300 ease-in-out"
      >
        <Plus size={18} />
        New Chat
      </Button>

      <div className="mt-8">
        <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Recent Chats
        </p>

        <div className="space-y-1">
          {dummyConversations.map((chat) => (
            <Button
              key={chat.id}
              variant="ghost"
              onClick={() => onSelectChat(chat.id)}
              className="w-full justify-start gap-3 overflow-hidden text-left font-normal"
            >
              <MessageSquare className="size-4 shrink-0" />
              <span className="truncate">{chat.title}</span>
            </Button>
          ))}
        </div>
      </div>

      <div className="mt-auto">
        <Separator className="mb-4" />
        <p className="px-2 text-xs text-muted-foreground">
          AI Assistant - Developed By JK Industries
        </p>
      </div>

    </aside>
  );
}
