import { useCallback, useState } from "react";
import { LogOut, Menu } from "lucide-react";
import { Button } from "../../../components/ui/button";
import ChatSidebar from "./ChatSidebar";
import ChatWelcome from "./ChatWelcome";
import ChatWindow from "./ChatWindow";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "#components/ui/toast";
import { useSessionHook } from "../../../hooks/use-auth";
import { useGetAllMessageHook, usePostMessageHook } from "../_hooks/ChatHooks";

export default function ChatLayout() {

  const {chatId} = useParams();
  const { user } = useSessionHook();
  const navigate = useNavigate();
  const {
    data: allMessages = [],
    isLoading,
    isError
} = useGetAllMessageHook( Number(chatId), Number(user?.id));
  const {mutateAsync: sendMessage, isPending} = usePostMessageHook(Number(chatId));

  const [loading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleSend = async (content: string) => {
      if (isPending || !content.trim()) return;
      try {
          await sendMessage(content);
          toast.add({
              title: "Success",
              description: "Message sent successfully"
          });
      } catch (error) {
          console.error(error);
          toast.add({
              title: "Error",
              description: "Failed to send message"
          });
      }
  };

  const handleSelectChat = useCallback((id: number) => {
      navigate(`/home/${id}`);
  }, [navigate]);

  const handleNewChat = () => {
      navigate("/home");
  };

  const handleLogout = () => {
    navigate("/")
    toast.add(
      {
        title: "Logout",
        description:"User Logout Successfully"
      }
    )
  }

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

        <header className="flex h-14 shrink-0 items-center justify-between gap-3 border-b px-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className={'cursor-pointer'}
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Toggle sidebar"
            >
              <Menu size={20} />
            </Button>
            <span className="text-sm font-semibold">
              New Conversation
            </span>
          </div>
          <Button title="Logout" size={'icon'} className={'bg-blue-700 hover:bg-blue-500 transition duration-200 ease-in cursor-pointer'} onClick={handleLogout}>
            <LogOut size={18}  />
          </Button>
        </header>
          {isLoading ? (
              <div className="flex flex-1 items-center justify-center">
                  Loading conversation...
              </div>
          ) : allMessages.length === 0 ? (
            <ChatWelcome
                onSendMessage={handleSend}
                conversation_id={Number(chatId)}
            />
          ) : isError ? (
              <div className="flex flex-1 items-center justify-center">
                  Failed to load conversation.
              </div>
          ) : (
            <ChatWindow
                messages={allMessages}
                loading={isPending}
                onSend={handleSend}
            />
          )}
      </main>
    </div>
  );
}
