"use client";

import { useEffect } from "react";

import { useChatStore } from "@/store/useChatStore";
import MessageList from "./message-list";
import ChatInput from "./chat-input";

import { Message } from "@/types/message";

interface Conversation {
  id: string;
  messages: Message[];
}

export default function Chat({ conversation }: { conversation: Conversation }) {
  const hydrate = useChatStore((state) => state.hydrate);

  useEffect(() => {
    hydrate({
      conversationId: conversation.id,
      messages: conversation.messages,
    });
  }, [conversation.id, conversation.messages, hydrate]);

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto">
        <MessageList />
      </div>

      <ChatInput />
    </div>
  );
}
