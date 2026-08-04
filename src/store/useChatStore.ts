"use client";

import { create } from "zustand";
import { Message } from "@/types/message";

interface ChatState {
  conversationId?: string;

  messages: Message[];

  setConversationId: (id: string) => void;

  addMessage: (message: Message) => void;

  addAssistantMessage: () => void;

  appendAssistantChunk: (text: string) => void;

  hydrate: (data: { conversationId: string; messages: Message[] }) => void;

  clear: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
  conversationId: undefined,

  messages: [],

  // Set current conversation id
  setConversationId: (id) =>
    set({
      conversationId: id,
    }),

  // Add user message
  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),

  // Create empty AI message before streaming
  addAssistantMessage: () =>
    set((state) => ({
      messages: [
        ...state.messages,
        {
          id: crypto.randomUUID(),
          role: "AI",
          content: "",
          loading: true,
        },
      ],
    })),

  // Append streaming AI response chunk
  appendAssistantChunk: (text) =>
    set((state) => {
      const messages = [...state.messages];

      const lastAssistantIndex = messages
        .map((message) => message.role)
        .lastIndexOf("AI");

      if (lastAssistantIndex === -1) {
        return state;
      }

      messages[lastAssistantIndex] = {
        ...messages[lastAssistantIndex],
        content: messages[lastAssistantIndex].content + text,
        loading: false,
      };

      return {
        messages,
      };
    }),

  // Hydrate store from server data
  hydrate: ({ conversationId, messages }) =>
    set({
      conversationId,
      messages,
    }),

  // Clear current chat
  clear: () =>
    set({
      conversationId: undefined,
      messages: [],
    }),
}));
