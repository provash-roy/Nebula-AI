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

  const { conversationId, addMessage, setConversationId } = useChatStore();

  const handleSend = async () => {
    const message = prompt.trim();
    if (!message) return;

    try {
      setLoading(true);
      addMessage({
        id: crypto.randomUUID(),
        role: "USER",
        content: prompt,
      });

      addMessage({
        id: crypto.randomUUID(),
        role: "AI",
        content: "",
        loading: true,
      });

      const res = await axios.post("/api/chat", {
        prompt: message,
        conversationId,
      });

      setPrompt("");

      if (!conversationId) {
        setConversationId(res.data.conversationId);

        router.replace(`/c/${res.data.conversationId}`);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="fixed bottom-0 left-0 right-0 md:left-64 z-50 border-zinc-800 bg-[#0d0f14] p-5">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-3 flex items-end gap-3">
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
            className="flex-1 max-h-40 min-h-[40px] resize-none bg-transparent px-2 py-2 text-slate-200 outline-none placeholder:text-zinc-500"
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
