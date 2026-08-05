"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mic, Paperclip, Send } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";

import { useChatStore } from "@/store/useChatStore";

export default function ChatInput() {
  const router = useRouter();

  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    conversationId,
    addMessage,
    addAssistantMessage,
    setConversationId,
    appendAssistantChunk,
  } = useChatStore();

  const handleSend = async () => {
    const message = prompt.trim();

    if (!message) return;

    try {
      setLoading(true);

      let currentConversationId = conversationId;

      // 1. Create new conversation if not exists
      if (!currentConversationId) {
        const res = await fetch("/api/conversations", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error("Failed to create conversation");
        }

        const data = await res.json();

        currentConversationId = data.id;

        setConversationId(data.id);

        router.replace(`/c/${data.id}`);
      }

      // 2. Add user message instantly
      addMessage({
        id: crypto.randomUUID(),
        role: "USER",
        content: message,
      });

      // 3. Add empty AI message for streaming
      addAssistantMessage();

      setPrompt("");

      // 4. Start AI streaming request
      const response = await fetch("/api/chat", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          prompt: message,
          conversationId: currentConversationId,
        }),
      });

      if (!response.ok) {
        throw new Error("Chat request failed");
      }

      // 5. Read stream
      const reader = response.body?.getReader();

      if (!reader) {
        throw new Error("No stream available");
      }

      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          break;
        }

        const chunk = decoder.decode(value, {
          stream: true,
        });

        console.log("Received chunk:", chunk);
        // 6. Update AI message in real time
        appendAssistantChunk(chunk);
      }
    } catch (error) {
      console.error("Chat error:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <footer className="fixed bottom-0 left-0 right-0 md:left-64 z-50 border-zinc-800 bg-[#0d0f14] p-5">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-end gap-3 rounded-xl border border-zinc-700 bg-zinc-900 p-3">
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="text-slate-400 hover:text-white"
            >
              <Paperclip size={18} />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="text-slate-400 hover:text-white"
            >
              <Mic size={18} />
            </Button>
          </div>

          <textarea
            rows={1}
            value={prompt}
            disabled={loading}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask anything..."
            className="flex-1 max-h-40 min-h-10 resize-none bg-transparent px-2 py-2 text-slate-200 outline-none placeholder:text-zinc-500"
          />

          <Button
            size="icon-lg"
            onClick={handleSend}
            disabled={loading || !prompt.trim()}
            className="rounded-xl bg-indigo-600 p-3 transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Send size={18} />
          </Button>
        </div>

        <p className="mt-3 text-center text-xs text-zinc-500">
          Nebula AI can make mistakes. Check important information.
        </p>
      </div>
    </footer>
  );
}
