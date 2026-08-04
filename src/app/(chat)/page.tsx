"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

import ChatInput from "@/components/chat/chat-input";
import MessageList from "@/components/chat/message-list";
import { useChatStore } from "@/store/useChatStore";



export default function Chat() {
  const pathname = usePathname();

  const clear = useChatStore((state) => state.clear);

  const isNewChat = pathname === "/";

  useEffect(() => {
    if (isNewChat) {
      clear();
    }
  }, [isNewChat, clear]);

  return (
    <div className="flex flex-col relative h-full  bg-[#0d0f14]">
      <MessageList />
      <div className="mx-auto  w-full max-w-4xl p-6">
        <ChatInput />
      </div>
    </div>
  );
}
