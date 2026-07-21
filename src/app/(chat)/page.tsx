"use client";

import ChatInput from "@/components/chat/chat-input";
import MessageList from "@/components/chat/message-list";
import { useChatStore } from "@/store/useChatStore";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

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
      {/* {isNewChat && (
        <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center space-y-4 p-6">
          <div className="flex flex-col items-center justify-center gap-2 text-center">
            <p className="font-semibold text-slate-400">How can I help You?</p>

            <p className="font-semibold text-slate-600">
              Ask me anything - code, ideas, explanations or just simple
              questions.
            </p>
          </div>
        </div>
      )} */}
      <MessageList />
      <div className="mx-auto  w-full max-w-4xl p-6">
        <ChatInput />
      </div>
    </div>
  );
}
