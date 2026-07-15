"use client";

import MessageBubble from "./message-bubble";

interface Props {
  messages: Message[];
}

export default function ConversationMessages({ messages }: Props) {
  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
    </div>
  );
}
