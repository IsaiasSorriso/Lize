# 🤖 LIZE 

Este projeto é um **chatbot com inteligência artificial** feito em **Next.js (App Router)** e pronto para deploy no **Vercel**.  
Ele permite enviar mensagens de texto, receber respostas da IA e também conta com **botão de áudio (TTS)** direto no front, sem API externa para voz.

---

## 🚀 Tecnologias usadas

- Next.js 14+
- React
- OpenAI API
- Web Speech API (Text-to-Speech no navegador)
- Vercel

---

## 📦 Requisitos

- Node.js 18+
- Conta na OpenAI
- Conta no Vercel

---

## 📁 Estrutura do projeto

/app
├─ /api
│ └─ /chat
│ └─ route.ts # Backend da IA
│
├─ /page.tsx # Front do chatbot
│
/styles
└─ globals.css

.env.local

yaml
Copy code

---

## 🔑 Configurando a OpenAI

Crie o arquivo `.env.local` na raiz:

```env
OPENAI_API_KEY=sk-sua-chave-aqui
👉 Pegue sua chave em:
https://platform.openai.com/api-keys

⚙️ Backend da IA (/app/api/chat/route.ts)
ts
Copy code
import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        { role: "system", content: "Você é um assistente útil e educado." },
        { role: "user", content: message }
      ],
    });

    const response = completion.choices[0].message.content;

    return NextResponse.json({ response });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { response: "Erro ao se conectar com a IA." },
      { status: 500 }
    );
  }
}
💬 Front do Chat (/app/page.tsx)
Inclui:

UI estilizada

Mensagens de usuário e IA

Botão de áudio (TTS)

Botão lateral estilo menu acessibilidade

tsx
Copy code
"use client";

import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<
    { sender: string; text: string }[]
  >([]);
  const [loading, setLoading] = useState(false);

  function speak(text: string) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "pt-BR";
    speechSynthesis.speak(utterance);
  }

  async function sendMessage() {
    if (!input) return;

    setLoading(true);

    setMessages((prev) => [
      ...prev,
      { sender: "Você", text: input }
    ]);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input })
    });

    const data = await res.json();

    setMessages((prev) => [
      ...prev,
      { sender: "IA", text: data.response }
    ]);

    setInput("");
    setLoading(false);
  }

  return (
    <div className="container">

      {/* Botão lateral estilo acessibilidade */}
      <div className="side-menu">
        🔊
      </div>

      <div className="chat-box">
        <h1>Chat com IA</h1>

        <div className="messages">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={
                msg.sender === "Você" ? "msg user" : "msg bot"
              }
            >
              <b>{msg.sender}:</b> {msg.text}

              {msg.sender === "IA" && (
                <button
                  onClick={() => speak(msg.text)}
                  className="tts-btn"
                >
                  🔊
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="input-area">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Digite sua mensagem..."
          />
          <button onClick={sendMessage}>
            {loading ? "..." : "Enviar"}
          </button>
        </div>
      </div>
    </div>
  );
}
🎨 Estilo Base (/styles/globals.css)
css
Copy code
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: #0f172a;
  color: white;
}

.container {
  display: flex;
}

.side-menu {
  width: 60px;
  background: #1e293b;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  cursor: pointer;
}

.chat-box {
  flex: 1;
  padding: 20px;
  max-width: 900px;
  margin: auto;
}

.messages {
  background: #1e293b;
  padding: 15px;
  border-radius: 8px;
  height: 400px;
  overflow-y: auto;
  margin-bottom: 10px;
}

.msg {
  margin-bottom: 12px;
  padding: 8px;
  border-radius: 6px;
  position: relative;
}

.user {
  background: #2563eb;
  align-self: flex-end;
}

.bot {
  background: #334155;
}

.tts-btn {
  margin-left: 10px;
  background: none;
  border: none;
  cursor: pointer;
  color: white;
  font-size: 16px;
}

.input-area {
  display: flex;
  gap: 8px;
}

input {
  flex: 1;
  padding: 10px;
  border-radius: 6px;
  border: none;
}

button {
  padding: 10px 15px;
  border-radius: 6px;
  border: none;
  background: #2563eb;
  color: white;
  cursor: pointer;
}

button:hover {
  background: #1d4ed8;
}

@media (max-width: 700px) {
  .side-menu {
    display: none;
  }
}
🧪 Rodando localmente
bash
Copy code
npm install
npm run dev
Acesse:

arduino
Copy code
http://localhost:3000
☁️ Deploy no Vercel
Suba o projeto no GitHub.

Vá em: https://vercel.com

Clique em Import Project.

Configure a variável:

OPENAI_API_KEY

Clique em Deploy.

✅ Funcionalidades
✅ Chat com IA

✅ Enviar texto

✅ Resposta em tempo real

✅ Botão de ouvir resposta (TTS)

✅ Interface moderna

✅ Botão lateral de acessibilidade

✅ Responsivo

✅ Pronto para Vercel
