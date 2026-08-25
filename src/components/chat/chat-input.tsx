"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { FileText, Mic, Paperclip, Send, X } from "lucide-react";
import { toast } from "sonner";

import { Button } from "../ui/button";
import { useChatStore } from "@/store/useChatStore";

export default function ChatInput() {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const {
    conversationId,
    addMessage,
    addAssistantMessage,
    setConversationId,
    appendAssistantChunk,
  } = useChatStore();

  // =========================
  // File Upload
  // =========================
  const handleFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setSelectedFile(file);

    try {
      const form = new FormData();
      form.append("file", file);

      const res = await fetch("/api/ingest", {
        method: "POST",
        body: form,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "File upload failed");
      }

      const data = await res.json();

      console.log("File uploaded:", data);
    } catch (error) {
      console.error("File upload error:", error);
      toast.error(
        error instanceof Error ? error.message : "File upload failed",
      );

      // Upload failed হলে selected file remove করে দিচ্ছি
      setSelectedFile(null);

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  // =========================
  // Remove Selected File
  // =========================
  const handleRemoveFile = () => {
    setSelectedFile(null);

    // Same file আবার select করার জন্য input reset
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  // =========================
  // Send Message
  // =========================
  const handleSend = async () => {
    const message = prompt.trim();

    if (!message) return;

    try {
      setLoading(true);

      let currentConversationId = conversationId;

      // =========================
      // Create Conversation
      // =========================
      if (!currentConversationId) {
        const res = await fetch("/api/conversations", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: message,
          }),
        });

        if (!res.ok) {
          throw new Error("Failed to create conversation");
        }

        const data = await res.json();

        currentConversationId = data.id;

        setConversationId(data.id);

        router.replace(`/c/${data.id}`);
      }

      // =========================
      // Add User Message
      // =========================
      addMessage({
        id: crypto.randomUUID(),
        role: "USER",
        content: message,
      });

      // =========================
      // Add Empty Assistant Message
      // =========================
      addAssistantMessage();

      setPrompt("");

      // =========================
      // Chat API
      // =========================
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: message,
          conversationId: currentConversationId,
          useRag: Boolean(selectedFile),
        }),
      });

      if (!response.ok) {
        throw new Error("Chat request failed");
      }

      // =========================
      // Read Stream
      // =========================
      const reader = response.body?.getReader();

      if (!reader) {
        throw new Error("No stream available");
      }

      const decoder = new TextDecoder();

      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        buffer += decoder.decode(value, {
          stream: true,
        });

        const events = buffer.split("\n\n");

        buffer = events.pop() || "";

        for (const event of events) {
          if (!event.startsWith("data:")) {
            continue;
          }

          const json = event.replace("data:", "").trim();

          try {
            const parsed = JSON.parse(json);

            if (parsed.type === "token") {
              appendAssistantChunk(parsed.content);
            }
          } catch (error) {
            console.error("Stream parse error:", error);
          }
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
    } finally {
      setLoading(false);
    }
  };

 
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 border-zinc-800 bg-[#0d0f14] p-5 md:left-64">
      <div className="mx-auto max-w-4xl">
       
        <div className="rounded-2xl border border-zinc-700 bg-zinc-900 p-3">
       
          {selectedFile && (
            <div className="relative mb-3 w-fit max-w-[480px] rounded-2xl border border-zinc-600 bg-zinc-800 px-4 py-3">
              <div className="flex items-center gap-3 pr-5">
              
                <div className="flex h-10 w-10 shrink-0 items-center justify-center">
                  <FileText
                    size={28}
                    strokeWidth={1.8}
                    className="text-blue-400"
                  />
                </div>

               
                <div className="min-w-0">
                  <p className="truncate text-[15px] font-semibold text-white">
                    {selectedFile.name}
                  </p>

                  <p className="mt-0.5 text-sm text-zinc-400">Document</p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleRemoveFile}
                className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-white text-zinc-700 shadow-md transition hover:bg-zinc-200"
              >
                <X size={15} strokeWidth={2.5} />
              </button>
            </div>
          )}

        
          <div className="flex items-end gap-3">
        
            <div className="flex items-center gap-1">
              <input
                ref={inputRef}
                type="file"
                accept=".pdf"
                onChange={handleFile}
                hidden
              />

            
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="text-slate-400 hover:text-white"
                onClick={() => inputRef.current?.click()}
              >
                <Paperclip size={20} />
              </Button>

        
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="text-slate-400 hover:text-white"
              >
                <Mic size={20} />
              </Button>
            </div>

            <textarea
              rows={1}
              value={prompt}
              disabled={loading}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();

                  if (!loading && prompt.trim()) {
                    handleSend();
                  }
                }
              }}
              placeholder="Ask anything..."
              className="flex-1 max-h-40 min-h-10 resize-none bg-transparent px-2 py-2 text-slate-200 outline-none placeholder:text-zinc-500"
            />

            <Button
              type="button"
              size="icon-lg"
              onClick={handleSend}
              disabled={loading || !prompt.trim()}
              className="rounded-full bg-indigo-600 p-3 transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Send size={18} />
            </Button>
          </div>
        </div>

        {/* Footer Text */}
        <p className="mt-3 text-center text-xs text-zinc-500">
          Nebula AI can make mistakes. Check important information.
        </p>
      </div>
    </footer>
  );
}
