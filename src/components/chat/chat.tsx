"use client";

import { useEffect } from "react";
import { useChatStore } from "@/store/useChatStore";

import MessageList from "./message-list";
import ChatInput from "./chat-input";
import { Message } from "@/types/message";

export default function Chat({
  conversation,
}: {
  conversation: { id: string; messages: Message[] };
}) {
  const hydrate = useChatStore((state) => state.hydrate);

  useEffect(() => {
    hydrate({
      conversationId: conversation.id,
      messages: conversation.messages,
    });
  }, [conversation, hydrate]);

  return (
    <div className="flex min-h-screen flex-col">
      <MessageList />
      <ChatInput />
    </div>
  );
}
