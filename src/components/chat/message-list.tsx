"use client";

import { useChatStore } from "@/store/useChatStore";
import MessageBubble from "./message-bubble";

export default function MessageList() {
  const messages = useChatStore((state) => state.messages);
  return (
    <div className="mx-auto flex h-full w-full max-w-4xl flex-1 flex-col gap-4 overflow-y-auto px-4 pb-40 pt-24">
      {messages.map((message) => (
        <MessageBubble
          key={message.id}
          role={message.role}
          content={message.content}
          loading={message.loading ?? false}
        />
      ))}
    </div>
  );
}
