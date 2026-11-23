
import { Bot, Check, Ellipsis, Loader2, MessageSquare, Plus, X } from "lucide-react";

import { Button } from "../../../components/ui/button";
import { Separator } from "../../../components/ui/separator";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "../../../components/ui/dropdown-menu";
import { Input } from "#components/ui/input";
import { useNavigate } from "react-router-dom";
import { useDeleteMessageHook, useFetchConversationHook, useUpdateMessageTitleHook } from "../_hooks/ChatHooks";
import DeleteModel from "#components/delete-model";
import { useSessionHook } from "../../../hooks/use-auth";
import { toast } from "#components/ui/toast";
import type { Conversation } from "../../../../types/chat";

interface Props {
  onNewChat: () => void;
  onSelectChat: (id: number) => void;
}

export default function ChatSidebar({
  onNewChat,
  onSelectChat,
}: Props) {
  const navigate = useNavigate();
  const { user } = useSessionHook();
   const { mutate } = useDeleteMessageHook();
   const { data: conversations, isLoading: conversationLoading } = useFetchConversationHook();
   const { mutate: updateMessageTitleMutation } = useUpdateMessageTitleHook()
  
  const [selectedChat, setSelectedChat] = useState<Conversation | null>(null);
  const [editMode, setEditMode] = useState(false)
  const [deleteModelOpen, setDeleteModelOpen] = useState(false)
  const [title, setTitle] = useState("")

  const handleSelectChat = (chat: Conversation, mode: "DELETE" | "EDIT" = 'EDIT') => {
    if(chat && mode === 'EDIT'){
      setEditMode(true)
      setSelectedChat(chat)
      setTitle(String(chat.title))
    }else if( chat?.id && mode === "DELETE"){
      setSelectedChat(chat)
      setDeleteModelOpen(true)
    }
  };

  const handleRename = (chat: Conversation) => {
    if(chat.id && title){
      updateMessageTitleMutation(
        { conversationId: chat.id, title }, 
        {
          onSuccess: () => {
            toast.add({
              title: "Message Rename",
              description: "Renamed Successfully"
            })
             setEditMode(false)
            setSelectedChat(null)
          }
      })
    }
  };

  const confirmDelete = (conversationId: number) => {
    if (conversationId == null || user?.id == null) return;
    mutate(
      { conversationId, userId: user.id },
      {
        onSuccess: () => {
          setDeleteModelOpen(false);
          setSelectedChat(null);
        },
      }
    );
  };

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
        {
          conversationLoading ? (
            <div className="flex items-center gap-2 h-screen justify-center">
              <Loader2 size={18} className="animate-spin" /> 
              <h1>Loading Chats...</h1>
            </div>
          ) : (
            <div className="space-y-1">
              {
              conversations && conversations.length === 0 ? 
                <h1 className="text-sm font-normal tracking-wide text-center text-gray-500">No Chats Found</h1>
              :
              conversations && conversations.map((chat) => (
                editMode && chat?.id === selectedChat?.id ? (
                  <>
                  <Input
                    type="text"
                    name="conversation"
                    value={title}
                    placeholder="Enter conversation title"
                    readOnly={!editMode}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <Button className={'bg-red-700 cursor-pointer hover:bg-red-500 transition duration-300 ease-in-out'} onClick={()=>{
                    setSelectedChat(null)
                    setEditMode(false)
                  }}><X/></Button>
                  <Button onClick={()=>handleRename(chat)} className={'bg-blue-700 cursor-pointer hover:bg-blue-500 transition duration-300 ease-in-out'}><Check/></Button>
                  </>
                ) : 
                <div
                  key={chat.id}
                  className="w-full gap-2 text-sm overflow-hidden text-left font-normal flex items-center justify-between"
                >
                  <div className="flex items-center gap-1.5 w-50 cursor-pointer" onClick={()=>{
                    onSelectChat(chat.id)
                    navigate(`/home/${chat.id}`)
                  }}>
                    <MessageSquare className="size-4 shrink-0" />
                    <p className="truncate text-start">{chat.title}</p>
                  </div>
                   <DropdownMenu>
                    <DropdownMenuTrigger render={
                      <Button type="button" variant='link' className="cursor-pointer">
                        <Ellipsis className="cursor-pointer" />
                      </Button>
                    } />
                    <DropdownMenuContent className="w-32">
                      <DropdownMenuGroup>
                        <DropdownMenuItem className="cursor-pointer" onClick={()=>handleSelectChat(chat, "EDIT")}>Rename</DropdownMenuItem>
                        <DropdownMenuItem className='bg-red-100 cursor-pointer' onClick={()=>handleSelectChat(chat, "DELETE")}>Delete</DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </div>
          )
        }
      </div>

      <div className="mt-auto">
        <Separator className="mb-4" />
        <p className="px-2 text-xs text-muted-foreground">
          AI Assistant - Developed By JK Industries
        </p>
      </div>

      {
        selectedChat && 
        <DeleteModel
          title="Delete Chat"
          selectedId= {selectedChat.id}
          confirmDelete={confirmDelete}
          modelClose={setDeleteModelOpen}
          modelOpen={deleteModelOpen}
        />
    }

    </aside>
  );
}
