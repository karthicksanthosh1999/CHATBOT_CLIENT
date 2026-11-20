
export type MessageRole = "user" | "assistant";

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  created_at: Date;
}

export interface Conversation {
  id: number;
  title: string;
  created_at: Date;
}
