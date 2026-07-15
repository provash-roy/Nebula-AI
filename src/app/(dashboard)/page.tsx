"use client";

import { useState } from "react";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!prompt.trim()) return;

    try {
      setLoading(true);

      const res = await axios.post("/api/chat", {
        prompt,
      });

      setResponse(res.data.response);
      setPrompt("");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0d0f14] ">
      <div className="w-full max-w-3xl space-y-4 p-6">
        <div className="bg-gray-800/40 p-4 rounded-lg min-h-25 text-white">
          {prompt}
        </div>
        {/* Response */}
        <div className="bg-gray-800/40 p-4 rounded-lg min-h-25 text-white">
          {response || "Ask something..."}
        </div>

        {/* Input + Button */}
        <div className="flex gap-2">
          <Input
            placeholder="Type your message..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />

          <Button onClick={handleSend} disabled={loading}>
            {loading ? "Sending..." : "Send"}
          </Button>
        </div>
      </div>
    </div>
  );
}
