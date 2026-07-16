"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mic, Paperclip, Send } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";

export default function ChatInput() {
  const router = useRouter();

  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (loading) return;

    const message = prompt.trim();
    if (!message) return;

    try {
      setLoading(true);

      const res = await axios.post("/api/chat", {
        prompt: message,
      });

      setPrompt("");

      router.push(`/c/${res.data.conversationId}`);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <footer className="border-t border-zinc-800 bg-[#0d0f14] p-5">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-3">
          <textarea
            rows={2}
            value={prompt}
            disabled={loading}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything..."
            className="max-h-40 min-h-12 w-full resize-none bg-transparent px-2 py-2 text-slate-200 outline-none [scrollbar-width:none] placeholder:text-zinc-500"
          />

          <div className="mt-2 flex items-center justify-between">
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

            <Button
              size="icon-lg"
              onClick={handleSend}
              disabled={loading || !prompt.trim()}
              className="rounded-xl bg-indigo-600 p-3 transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Send size={18} />
            </Button>
          </div>
        </div>

        <p className="mt-3 text-center text-xs text-zinc-500">
          Nebula AI can make mistakes. Check important information.
        </p>
      </div>
    </footer>
  );
}
