"use client";

import { Bubble, BubbleContent } from "@/components/ui/bubble";
import { Role } from "../../../generated/prisma/enums";
interface Props {
  role: Role;
  content: string;
  loading: boolean;
}

export default function MessageBubble({ role, content, loading }: Props) {
  const isUser = role === "USER";

  return (
    <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}>
      <Bubble
        align={isUser ? "end" : "start"}
        variant="default"
        className="max-w-[80%]"
      >
        <BubbleContent
          className={
            isUser
              ? "bg-indigo-600 text-white border-indigo-500"
              : "bg-zinc-900 text-slate-200 border-zinc-700"
          }
        >
          <div className="whitespace-pre-wrap break-words">
            {content}
            {loading && (
              <span className="ml-2 text-sm text-slate-400">Thinking...</span>
            )}
          </div>
        </BubbleContent>
      </Bubble>
    </div>
  );
}
