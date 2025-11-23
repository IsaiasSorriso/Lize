"use client";

import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!input) return;

    setLoading(true);
    setMessages((prev) => [...prev, "Você: " + input]);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input })
    });

    const data = await res.json();

    setMessages((prev) => [
      ...prev,
      "IA: " + data.response
    ]);

    setInput("");
    setLoading(false);
  }

  return (
    <main style={{ padding: 20, maxWidth: 600, margin: "auto" }}>
      <h1>Chat IA - OpenAI</h1>

      <div style={{
        border: "1px solid #ccc",
        padding: 10,
        height: 400,
        overflowY: "auto",
        marginBottom: 10
      }}>
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>

      <div style={{ display: "flex", gap: 10 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Digite sua mensagem..."
          style={{ flex: 1, padding: 8 }}
        />
        <button onClick={sendMessage}>
          {loading ? "Enviando..." : "Enviar"}
        </button>
      </div>
    </main>
  );
}
