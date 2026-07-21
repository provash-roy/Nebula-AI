"use client";

import { useChatStore } from "@/store/useChatStore";
import MessageBubble from "./message-bubble";

export default function MessageList() {
  const messages = useChatStore((state) => state.messages);
  return (
    <div className="mx-auto max-w-4x flex-1 overflow-y-auto">
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
