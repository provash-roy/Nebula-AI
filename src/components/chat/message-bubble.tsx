"use client";

import { Bubble, BubbleContent } from "@/components/ui/bubble";
import { Role } from "../../../generated/prisma/enums";
interface Props {
  role: Role;
  content: string;
  loading: boolean;
}

export default function MessageBubble({ role, content, loading }: Props) {
  console.log(role);
  return (
    <div className="flex w-full max-w-3xl flex-col justify-center gap-8 py-12">
      <Bubble
        align={role === "USER" ? "end" : "start"}
        variant={role === "AI" ? "muted" : "default"}
      >
        <BubbleContent>
          {content} {loading && <span>Thinking...</span>}
        </BubbleContent>
      </Bubble>
    </div>
  );
}
