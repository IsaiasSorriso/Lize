"use client";

import { useState, useRef, useEffect } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<
    { sender: "bot" | "user"; text: string }[]
  >([
    {
      sender: "bot",
      text: "Olá! Sou a Lize, sua assistente de aprendizado! Como posso ajudar você hoje? 🐧",
    },
  ]);

  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  async function sendMessage() {
    if (!input.trim()) return;

    const newMsg = { sender: "user" as const, text: input };

    setMessages((prev) => [...prev, newMsg]);
    setLoading(true);
    setInput("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();

      const botReply = {
        sender: "bot" as const,
        text: data.response || "Tive um problema pra responder 😅",
      };

      setMessages((prev) => [...prev, botReply]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Erro de conexão 😢" },
      ]);
    }

    setLoading(false);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") sendMessage();
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <main className="container">
      <div className="chatBox">

        {/* HEADER */}
        <div className="header">
          <h1>Chat com Lize ✨</h1>
          <p>Sua assistente de aprendizado</p>
        </div>

        {/* MENSAGENS */}
        <div className="messages">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${
                msg.sender === "user" ? "user" : "bot"
              }`}
            >
              {msg.text}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* INPUT */}
        <div className="inputBox">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Digite sua mensagem..."
          />
          <button onClick={sendMessage} disabled={loading}>
            {loading ? "..." : "Enviar ↵"}
          </button>
        </div>
      </div>

      <style jsx>{`
        .container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: #f2f5f9;
          padding: 10px;
        }

        .chatBox {
          background: white;
          width: 100%;
          max-width: 450px;
          height: 85vh;
          display: flex;
          flex-direction: column;
          border-radius: 16px;
          box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.15);
          overflow: hidden;
        }

        /* HEADER */
        .header {
          background: linear-gradient(135deg, #2563eb, #3b82f6);
          color: white;
          text-align: center;
          padding: 16px;
        }

        .header h1 {
          font-size: 20px;
          margin: 0;
        }

        .header p {
          font-size: 14px;
          margin: 5px 0 0;
          opacity: 0.9;
        }

        /* MENSAGENS */
        .messages {
          flex: 1;
          padding: 15px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          overflow-y: auto;
          background: #f9fafb;
        }

        .message {
          max-width: 75%;
          padding: 10px 14px;
          border-radius: 14px;
          font-size: 14px;
          word-wrap: break-word;
        }

        .message.bot {
          align-self: flex-start;
          background: #e5e7eb;
          color: #111827;
        }

        .message.user {
          align-self: flex-end;
          background: #2563eb;
          color: white;
        }

        /* INPUT */
        .inputBox {
          display: flex;
          padding: 10px;
          border-top: 1px solid #e5e7eb;
          gap: 8px;
          background: white;
        }

        .inputBox input {
          flex: 1;
          padding: 10px;
          border-radius: 8px;
          border: 1px solid #d1d5db;
          outline: none;
        }

        .inputBox input:focus {
          border-color: #2563eb;
        }

        .inputBox button {
          padding: 10px 16px;
          border: none;
          border-radius: 8px;
          background: #2563eb;
          color: white;
          cursor: pointer;
          transition: 0.2s ease;
        }

        .inputBox button:hover {
          background: #1d4ed8;
        }

        .inputBox button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        /* MOBILE */
        @media (max-width: 480px) {
          .chatBox {
            height: 95vh;
            border-radius: 12px;
          }
        }
      `}</style>
    </main>
  );
}
