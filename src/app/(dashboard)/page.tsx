"use client";

import { useState } from "react";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import ChatInput from "@/components/conversation/chat-input";

export default function Home() {
 

  return (
    <div className="flex flex-col relative h-full  bg-[#0d0f14]">
      <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center space-y-4 p-6">
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <h2 className="font-semibold text-slate-200">Nebula AI</h2>

          <p className="font-semibold text-slate-400">How can I help You?</p>

          <p className="font-semibold text-slate-600">
            Ask me anything - code, ideas, explanations or just simple
            questions.
          </p>
        </div>
      </div>

      <div className="mx-auto  w-full max-w-4xl p-6">
        <ChatInput />
      </div>
    </div>
  );
}
