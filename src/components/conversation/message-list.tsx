"use client";

import { Role } from "../../../generated/prisma/enums";
import MessageBubble from "./message-bubble";

type Message = {
  id: string;
  role: Role;
  content: string;
};

interface Props {
  messages: Message[];
}

export default function MessageList({ messages }: Props) {
  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message) => (
        <MessageBubble
          key={message.id}
          role={message.role}
          content={message.content}
        />
      ))}
    </div>
  );
}
