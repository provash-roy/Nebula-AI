"use client";

import { Bot, Copy, User } from "lucide-react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MessageBubbleProps {
  role: "user" | "assistant";
  content: string;
}

export default function MessageBubble({ role, content }: MessageBubbleProps) {
  const [copied, setCopied] = useState(false);

  const copyMessage = async () => {
    await navigator.clipboard.writeText(content);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const isUser = role === "user";

  return (
    <div className={`flex gap-4 ${isUser ? "justify-end" : "justify-start"}`}>
      {/* AI Avatar */}
      {!isUser && (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-600">
          <Bot size={18} />
        </div>
      )}

      {/* Message */}
      <div
        className={`group relative max-w-3xl rounded-2xl px-5 py-4 shadow-md transition-all
        ${isUser ? "bg-indigo-600 text-white" : "bg-zinc-800 text-zinc-100"}`}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code(props) {
              return (
                <code className="rounded bg-zinc-900 px-1 py-0.5 text-green-400">
                  {props.children}
                </code>
              );
            },

            pre(props) {
              return (
                <pre className="my-4 overflow-x-auto rounded-xl bg-black p-4">
                  {props.children}
                </pre>
              );
            },
          }}
        >
          {content}
        </ReactMarkdown>

        {/* Copy */}
        <button
          onClick={copyMessage}
          className="absolute -bottom-3 right-2 hidden rounded-lg bg-zinc-700 p-2 transition hover:bg-zinc-600 group-hover:block"
        >
          {copied ? (
            <span className="text-xs">Copied</span>
          ) : (
            <Copy size={15} />
          )}
        </button>
      </div>

      {/* User Avatar */}
      {isUser && (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-700">
          <User size={18} />
        </div>
      )}
    </div>
  );
}
