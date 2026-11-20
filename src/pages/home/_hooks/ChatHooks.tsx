import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstants } from "../../../instant";
import type { ChatMessage as MessageType, Conversation } from "../../../../types/chat";

export const useFetchConversationHook = () => {
    return useQuery<Conversation[]>({
        queryKey: ['conversation',"message"],
        queryFn: fetchConversation
    })
};

export const useGetAllMessageHook = (conversation_id: number | null, user_id: number) => {
    return useQuery<MessageType[]>({
        queryFn: () =>getMessages(conversation_id, user_id),
        queryKey: ['message', conversation_id, user_id],
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
                    queryKey: ["message", conversation_id, "conversation"]
                });
            }
        },
        onError: (err) => {
            console.error("Message sending failed:", err);
        }
    });
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