"use client";

import { useState, useRef, useEffect } from "react";

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

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
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [listening, setListening] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // 🔊 Função TTS
  function speak(text: string) {
    if (!voiceEnabled) return;

    if ("speechSynthesis" in window) {
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(text);

      utterance.lang = "pt-BR";
      utterance.rate = 1;
      utterance.pitch = 1;

      synth.cancel();
      synth.speak(utterance);
    }
  }

  // 🎤 Inicializar reconhecimento de voz
  useEffect(() => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      console.warn("Reconhecimento de voz não suportado neste navegador.");
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();

    recognition.lang = "pt-BR";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setListening(true);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.onerror = (e: any) => {
      console.error("Erro no microfone:", e);
      setListening(false);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      console.log("🎤 Você falou:", transcript);

      setInput(transcript);
      sendMessage(transcript);
    };

    recognitionRef.current = recognition;
  }, []);

  function startListening() {
    if (recognitionRef.current) {
      recognitionRef.current.start();
    }
  }

  async function sendMessage(text?: string) {
    const messageToSend = text || input;

    if (!messageToSend.trim()) return;

    const newMsg = { sender: "user" as const, text: messageToSend };

    setMessages((prev) => [...prev, newMsg]);
    setLoading(true);
    setInput("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: messageToSend }),
      });

      const data = await res.json();

      const botReply = {
        sender: "bot" as const,
        text: data.response || "Tive um problema pra responder 😅",
      };

      setMessages((prev) => [...prev, botReply]);

      // 🗣️ Falar
      speak(botReply.text);

    } catch {
      const errorMsg = "Erro de conexão 😢";

      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: errorMsg },
      ]);

      speak(errorMsg);
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

          <div className="headerButtons">
            <button onClick={() => setVoiceEnabled(!voiceEnabled)} className="voiceToggle">
              {voiceEnabled ? "🔊 Voz ligada" : "🔇 Voz desligada"}
            </button>

            <button 
              onClick={startListening} 
              className={`micButton ${listening ? "active" : ""}`}
            >
              {listening ? "🎤" : "🎙"}
            </button>
          </div>
        </div>

        {/* MENSAGENS */}
        <div className="messages">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.sender === "user" ? "user" : "bot"}`}
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
          placeholder="Digite ou use o microfone..."
        />

        {/* BOTÃO DO MICROFONE */}
        <button 
          onClick={startListening} 
          className={`micButtonBottom ${listening ? "active" : ""}`}
        >
          🎤
        </button>

        <button onClick={() => sendMessage()} disabled={loading}>
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

        .header {
          background: linear-gradient(135deg, #2563eb, #3b82f6);
          color: white;
          text-align: center;
          padding: 16px;
        }

        .headerButtons {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-top: 10px;
        }

        .voiceToggle, .micButton {
          padding: 6px 10px;
          border-radius: 6px;
          border: none;
          cursor: pointer;
          background: white;
          color: #2563eb;
          font-size: 12px;
          font-weight: bold;
        }

        .micButton.active {
          background: #ef4444;
          color: white;
        }

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
        }

        .message.bot {
          align-self: flex-start;
          background: #e5e7eb;
        }

        .message.user {
          align-self: flex-end;
          background: #2563eb;
          color: white;
        }

        .inputBox {
          display: flex;
          padding: 10px;
          border-top: 1px solid #e5e7eb;
          gap: 8px;
        }

        .inputBox input {
          flex: 1;
          padding: 10px;
          border-radius: 8px;
          border: 1px solid #d1d5db;
        }

        .inputBox button {
          padding: 10px 16px;
          border-radius: 8px;
          background: #2563eb;
          color: white;
          border: none;
        }

        @media (max-width: 480px) {
          .chatBox {
            height: 95vh;
          }
        }
      `}</style>
    </main>
  );
}
