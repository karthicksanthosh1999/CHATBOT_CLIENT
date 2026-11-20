
import { Bot, Check, Ellipsis, MessageSquare, Plus, X } from "lucide-react";

import { Button } from "../../../components/ui/button";
import { Separator } from "../../../components/ui/separator";
import { useCallback, useEffect, useMemo, useState } from "react";
import { axiosInstants } from "../../../instant";
import type { Conversation } from "../../../../types/chat";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "../../../components/ui/dropdown-menu";
import { Input } from "#components/ui/input";

interface Props {
  onNewChat: () => void;
  onSelectChat: (id: number) => void;
}

export default function ChatSidebar({
  onNewChat,
  onSelectChat,
}: Props) {


  const [chats, setChats] = useState<Conversation[]>([]);
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [editMode, setEditMode] = useState(false)

  const deleteChat = useCallback(async() =>{
    try {
      if(selectedChat){
        const response = await axiosInstants.delete(`/chat/${selectedChat}`);
        console.log(response.data)
      }
    } catch (error) {
      console.log(error)
    }
  },[selectedChat])

  const fetchUserChats = async() => {
    try {
      const response = await axiosInstants.get(`/chat`)
      setChats(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  
  useEffect(()=>{
    fetchUserChats()
  },[])

  const handleSelectChat = (chatId: number) => {
    if(chatId){
      setSelectedChat(chatId)
    }
  };

  const handleRename = (chatId: number) => {
    if(chatId){
      setEditMode(true)
      setSelectedChat(chatId)
    }
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

        <div className="space-y-1">
          {
          chats.length === 0 ? 
            <h1 className="text-sm font-normal tracking-wide text-center text-gray-500">No Chats Found</h1>
          :
          chats.map((chat) => (
            editMode && chat?.id === selectedChat ? (
              <>
              <Input type="text" value={chat.title} />
              <Button className={'bg-red-700 cursor-pointer hover:bg-red-500 transition duration-300 ease-in-out'} onClick={()=>{
                setSelectedChat(null)
                setEditMode(false)
              }}><X/></Button>
              <Button className={'bg-blue-700 cursor-pointer hover:bg-blue-500 transition duration-300 ease-in-out'}><Check/></Button>
              </>
            ) : 
            <div
              key={chat.id}
              className="w-full gap-2 text-sm overflow-hidden text-left font-normal flex items-center justify-between"
            >
              <div className="flex">
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
                    <DropdownMenuItem className="cursor-pointer" onClick={()=>handleRename(chat.id)}>Rename</DropdownMenuItem>
                    <DropdownMenuItem className='bg-red-100 cursor-pointer' onClick={()=>handleSelectChat(chat.id)}>Delete</DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
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
