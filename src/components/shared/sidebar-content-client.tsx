"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface Props {
  conversations: {
    id: string;
    title: string;
  }[];
}

export default function SidebarContentClient({ conversations }: Props) {
  const router = useRouter();

  return (
    <>
      <Button
        className="w-full bg-indigo-600"
        onClick={() => router.push("/")}
      >
        New Chat
      </Button>

      <div className="space-y-2 mt-4">
        {conversations.map((conversation) => (
          <Button
            key={conversation.id}
            variant="ghost"
            className="w-full justify-start"
            onClick={() => router.push(`/c/${conversation.id}`)}
          >
            {conversation.title}
          </Button>
        ))}
      </div>
    </>
  );
}
