"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SendHorizonal } from "lucide-react";

interface ChatInputProps {
  conversationId: string;
}

export default function ChatInput({ conversationId }: ChatInputProps) {
  const router = useRouter();

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const send = async () => {
    if (!message.trim() || loading) return;

    try {
      setLoading(true);

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          conversationId,
          message,
        }),
      });

      if (!res.ok) {
        throw new Error("Something went wrong.");
      }

      setMessage("");

      // Refresh Server Component
      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <footer className="border-t border-zinc-800 bg-[#212121] p-5">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-end gap-3 rounded-3xl border border-zinc-700 bg-zinc-900 p-3">
          <textarea
            rows={1}
            value={message}
            disabled={loading}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Message Nebula AI..."
            className="max-h-40 min-h-12 flex-1 resize-none bg-transparent px-2 py-2 text-white outline-none placeholder:text-zinc-500"
          />

          <button
            onClick={send}
            disabled={loading || !message.trim()}
            className="rounded-xl bg-indigo-600 p-3 transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <SendHorizonal size={18} />
          </button>
        </div>

        <p className="mt-3 text-center text-xs text-zinc-500">
          Nebula AI can make mistakes. Check important information.
        </p>
      </div>
    </footer>
  );
}
