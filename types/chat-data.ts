
import { Conversation } from "./chat";

export const dummyConversations: Conversation[] = [
  {
    id: "chat-1",
    title: "Understanding React Hooks",
    updatedAt: new Date(),
    messages: [],
  },
  {
    id: "chat-2",
    title: "Python Learning Roadmap",
    updatedAt: new Date(),
    messages: [],
  },
  {
    id: "chat-3",
    title: "What is RAG in AI?",
    updatedAt: new Date(),
    messages: [],
  },
];

export const dummyResponses = [
  "That's a great question! Let me explain it step by step.",
  "Absolutely! Here's a simple explanation with a practical example.",
  "Let's break this concept into smaller parts so it's easier to understand.",
  "Great! This is an important concept. Here are the key things you should know.",
];

export function getDummyResponse(message: string) {
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes("react")) {
    return `React is a JavaScript library for building user interfaces.

Some important React concepts include:

1. Components – Reusable UI building blocks.
2. Props – Passing data between components.
3. State – Managing component data.
4. Hooks – Reusing stateful logic.
5. Context API – Sharing state across components.

Would you like to explore any of these concepts?`;
  }

  if (
    lowerMessage.includes("python") ||
    lowerMessage.includes("ai")
  ) {
    return `Let's explore this topic!

A good learning approach is:

1. Understand the fundamentals.
2. Learn the important concepts.
3. Practice with small examples.
4. Build a real-world project.
5. Review and improve your implementation.

This is a dummy response for your frontend chatbot.`;
  }

  if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
    return "Hello! 👋 Welcome to your AI Assistant. What would you like to learn or explore today?";
  }

  return dummyResponses[
    Math.floor(Math.random() * dummyResponses.length)
  ] + "\n\nThis is a simulated AI response. Once you connect your backend, actual LLM-generated answers will appear here.";
}
