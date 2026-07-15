import { Bot, Sparkles } from "lucide-react";

export default function ConversationIdPage() {
  return (
    <div className="flex h-screen flex-col bg-[#212121] text-white">
      {/* Header */}
      <header className="border-b border-zinc-800 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-indigo-600 p-2">
            <Bot className="h-5 w-5" />
          </div>

          <div>
            <h1 className="font-semibold text-lg">Nebula AI</h1>
            <p className="text-sm text-zinc-400">GPT-4.1 • Ready</p>
          </div>
        </div>
      </header>

      {/* Messages */}
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto flex max-w-4xl flex-col gap-8 px-6 py-10">
          {/* Assistant */}
          <div className="flex gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600">
              <Bot size={20} />
            </div>

            <div className="max-w-3xl rounded-2xl bg-zinc-800 px-5 py-4">
              <p className="leading-7 text-zinc-200">
                👋 Hello! I'm Nebula AI.
                <br />
                How can I help you today?
              </p>
            </div>
          </div>

          {/* User */}
          <div className="flex justify-end">
            <div className="max-w-3xl rounded-2xl bg-indigo-600 px-5 py-4">
              Explain LangGraph memory.
            </div>
          </div>

          {/* Assistant */}
          <div className="flex gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600">
              <Sparkles size={18} />
            </div>

            <div className="max-w-3xl rounded-2xl bg-zinc-800 px-5 py-4">
              LangGraph Memory allows an agent to remember previous
              conversations and use them in future interactions...
            </div>
          </div>
        </div>
      </main>

      {/* Input */}
      <footer className="border-t border-zinc-800 bg-[#212121] p-5">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-end gap-3 rounded-3xl border border-zinc-700 bg-zinc-900 p-3">
            <textarea
              placeholder="Message Nebula AI..."
              rows={1}
              className="max-h-40 flex-1 resize-none bg-transparent outline-none placeholder:text-zinc-500"
            />

            <button className="rounded-xl bg-indigo-600 px-5 py-2 font-medium transition hover:bg-indigo-500">
              Send
            </button>
          </div>

          <p className="mt-3 text-center text-xs text-zinc-500">
            Nebula AI can make mistakes. Verify important information.
          </p>
        </div>
      </footer>
    </div>
  );
}
