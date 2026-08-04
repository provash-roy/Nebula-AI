"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import ChatInput from "@/components/chat/chat-input";
import MessageList from "@/components/chat/message-list";
import { useChatStore } from "@/store/useChatStore";

export default function Chat() {
  const pathname = usePathname();

  const clear = useChatStore((state) => state.clear);

  useEffect(() => {
    if (pathname === "/") {
      clear();
    }
  }, [pathname, clear]);

  return (
    <div className="flex flex-col h-screen">
      <MessageList />
      <div className="mx-auto w-full max-w-4xl p-6">
        <ChatInput />
      </div>
    </div>
  );
}
