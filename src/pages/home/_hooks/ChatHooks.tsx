import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstants } from "../../../instant";
import type { ChatMessage as MessageType, Conversation } from "../../../../types/chat";

type DeleteConversationParams = {
  conversationId: number;
  userId?: number;
};

type UpdateConversationParams = {
    conversationId: number,
    title: string
}


export const chatKeys = {
    all: ['chat'] as const,
    conversations: () => [...chatKeys.all, "conversations"] as const,
    messages: (conversationId: number | null, userId: number) => 
    [...chatKeys.all, "messages", conversationId, userId] as const
}

export const useFetchConversationHook = () => {
    return useQuery<Conversation[]>({
        queryKey: chatKeys.conversations(),
        queryFn: fetchConversation
    })
};

export const useGetAllMessageHook = (conversation_id: number | null, user_id: number) => {
    return useQuery<MessageType[]>({
        queryFn: () =>getMessages(conversation_id, user_id),
        queryKey: chatKeys.messages(conversation_id, user_id),
        enabled: Boolean(conversation_id && user_id),
        staleTime: 0,
        refetchOnMount: "always"
    })
};


export const usePostMessageHook = ( conversation_id: number | null) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (question: string) => postMessage(conversation_id, question),
        onSuccess: () => {
            if (conversation_id) {
                queryClient.invalidateQueries({
                    queryKey: chatKeys.conversations()
                });
            }
        },
        onError: (err) => {
            console.error("Message sending failed:", err);
        }
    });
};

export const useDeleteMessageHook = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({conversationId, userId}: DeleteConversationParams)=>deleteMessage(conversationId, Number(userId)),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: chatKeys.conversations()
            });
        },
        onError: (err) => {
            console.error("Message sending failed:", err);
        }
    })
};

export const useUpdateMessageTitleHook = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({conversationId, title} : UpdateConversationParams)=>updateMessageTitle(conversationId, title),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: chatKeys.conversations()
            });
        },
        onError: (err) => {
            console.error("Message sending failed:", err);
        }
    })
};

const fetchConversation = async():Promise<Conversation[]> => {
    const response = await axiosInstants.get<Conversation[]>(`/chat`)
    return response.data
};

const getMessages = async(conversation_id: number | null, user_id: number) => {
    const response = await axiosInstants.get<MessageType[]>(`/chat/${conversation_id}/${user_id}/messages`)
    return response.data
};

const postMessage = async(conversation_id: number | null, question: string) => {
    const response = await axiosInstants.post(`/chat`, {conversation_id, question})
    return response.data
}

const updateMessageTitle = async(conversation_id: number, title: string) => {
    const response = await axiosInstants.patch(`/chat/${conversation_id}`, {title})
    return response.data
}

const deleteMessage = async(conversation_id: number, user_id: number) => {
    const response = await axiosInstants.delete(`/chat/${conversation_id}/${user_id}`)
    return response.data
}