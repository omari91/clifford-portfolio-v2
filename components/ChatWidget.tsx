"use client";

import { useMemo, useState } from "react";
import { sendChatMessage, type ChatMessage } from "@/lib/chat";

const starterMessages: ChatMessage[] = [
  {
    role: "assistant",
    content: "Hi! I can answer questions about Clifford’s research, projects, and experience.",
  },
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(starterMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const canSend = input.trim().length > 0 && !loading;

  const thread = useMemo(() => messages, [messages]);

  const handleSend = async () => {
    if (!canSend) return;
    const content = input.trim();
    setInput("");
    const nextMessages = [...thread, { role: "user", content }];
    setMessages(nextMessages);
    setLoading(true);
    try {
      const reply = await sendChatMessage(nextMessages);
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I’m having trouble right now. Please try again in a moment.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      {open && (
        <div className="w-[340px] sm:w-[380px] rounded-2xl shadow-2xl border border-slate-200 bg-white overflow-hidden mb-3">
          <div className="flex items-center justify-between px-4 py-3 bg-indigo-900 text-white">
            <div className="font-semibold text-sm">Clifford AI</div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-white/80 hover:text-white text-xs"
            >
              Close
            </button>
          </div>
          <div className="max-h-[320px] overflow-y-auto px-4 py-3 space-y-3 text-sm">
            {messages.map((m, idx) => (
              <div
                key={`${m.role}-${idx}`}
                className={`rounded-xl px-3 py-2 ${
                  m.role === "user"
                    ? "bg-indigo-50 text-indigo-900 ml-6"
                    : "bg-slate-100 text-slate-700 mr-6"
                }`}
              >
                {m.content}
              </div>
            ))}
            {loading && (
              <div className="text-xs text-slate-400">Thinking…</div>
            )}
          </div>
          <div className="border-t border-slate-200 p-3 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Ask about projects or research..."
              className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="button"
              onClick={handleSend}
              disabled={!canSend}
              className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                canSend
                  ? "bg-indigo-700 text-white hover:bg-indigo-600"
                  : "bg-slate-200 text-slate-500"
              }`}
            >
              Send
            </button>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="rounded-full bg-indigo-700 text-white px-4 py-3 shadow-lg hover:bg-indigo-600 transition"
      >
        {open ? "Hide Chat" : "Chat"}
      </button>
    </div>
  );
}
