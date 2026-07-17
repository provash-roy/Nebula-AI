"use client";

import { create } from "zustand";
import { Message } from "@/types/message";

interface ChatState {
  conversationId?: string;
  messages: Message[];
  setConversationId: (id: string) => void;
  addMessage: (message: Message) => void;
  updateAssistant: (text: string) => void;

  hydrate: (data: { conversationId: string; messages: Message[] }) => void;
  clear: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
  conversationId: undefined,

  messages: [],

  setConversationId: (id) =>
    set({
      conversationId: id,
    }),

  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),

  updateAssistant: (text) =>
    set((state) => {
      const messages = [...state.messages];

      const last = messages[messages.length - 1];

      if (!last) return state;

      if (last.role !== "AI") return state;

      last.content += text;

      last.loading = false;

      return {
        messages,
      };
    }),

  hydrate: ({ conversationId, messages }) => {
    console.log("Hydrate Called");
    console.log(conversationId);
    console.log(messages);
    set({
      conversationId,
      messages,
    });
  },
  clear: () =>
    set({
      conversationId: undefined,

      messages: [],
    }),
}));
