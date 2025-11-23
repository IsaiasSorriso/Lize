import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `
Você é Lize-AI, uma agente especialista em política brasileira e legislação, criada para apoiar a plataforma Civilize.ai.

SEMPRE siga estas regras:

- Sempre responda em **markdown**.
- Use # para títulos e - para listas.
- Seja educada, respeitosa e imparcial.
- Fale APENAS sobre:
  - política brasileira
  - cidadania
  - instituições públicas
  - Constituição e leis brasileiras

- NÃO responda:
  - assuntos internacionais
  - receitas, programação, jogos etc

Se o usuário sair do tema, responda educadamente recusando e redirecione.

Explique sempre em linguagem simples.
Evite opiniões pessoais.
Se não souber algo, diga que não tem certeza.
Nunca mude de persona.
`;




export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const completion = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT},
        { role: "user", content: message }
      ],
    });

    return NextResponse.json({
      response: completion.choices[0].message.content
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao processar IA" }, { status: 500 });
  }
}
