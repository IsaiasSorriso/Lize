🤖 Lize IA — Chatbot Educacional com Acessibilidade

Projeto de chatbot educacional desenvolvido em Next.js + React, com foco em acessibilidade digital, integração com VLibras, leitura de texto (TTS) e interface moderna.

A Lize foi criada para auxiliar estudantes, com recursos inclusivos que permitem maior acessibilidade para pessoas com deficiência visual e auditiva.

🚀 Funcionalidades

✅ Chatbot com interface moderna
✅ Design responsivo
✅ Leitura de texto em voz alta (Text To Speech)
✅ Leitura de texto selecionado
✅ Botão flutuante de acessibilidade
✅ Integração com VLibras
✅ Integração com Sienna Accessibility
✅ Pronto para deploy na Vercel

🛠️ Tecnologias utilizadas

Next.js 14

React

TypeScript

Tailwind CSS

Shadcn/UI

Web Speech API (TTS)

VLibras

Sienna Accessibility

Vercel

📂 Estrutura do projeto
📦 lize-ia
 ┣ 📂 src
 ┃ ┣ 📂 app
 ┃ ┃ ┣ 📂 api
 ┃ ┃ ┃ ┗ 📜 chat/route.ts
 ┃ ┃ ┣ 📜 layout.tsx
 ┃ ┃ ┗ 📜 page.tsx
 ┃ ┣ 📂 components
 ┃ ┃ ┣ 📜 ExpandableChatDemo.tsx
 ┃ ┃ ┣ 📜 AccessibilityTools.tsx
 ┃ ┃ ┣ 📂 ui/
 ┣ 📜 .env.local
 ┣ 📜 package.json
 ┣ 📜 README.md
 ┗ 📜 tsconfig.json

📥 Como rodar o projeto
1️⃣ Clone o repositório
git clone https://github.com/SEU-USUARIO/lize-ia.git
cd lize-ia

2️⃣ Instale as dependências
npm install
# ou
yarn install

3️⃣ Configure o ambiente

Crie um arquivo .env.local na raiz:

OPENAI_API_KEY=SUA_CHAVE_AQUI


Mesmo que você use só front em algumas partes, se o backend usar a OpenAI, isso é obrigatório.

4️⃣ Inicie o servidor
npm run dev


O projeto vai rodar em:

http://localhost:3000

🌐 Deploy na Vercel

Suba o projeto para o GitHub

Acesse: https://vercel.com

Clique em New Project

Conecte o repositório

Em Environment Variables adicione:

OPENAI_API_KEY = sua_chave


Clique em Deploy

♿ Acessibilidade

O projeto inclui:

🔊 Leitor de Texto (TTS)

Botão flutuante no lado esquerdo

Lê automaticamente textos selecionados

Usa Web Speech API nativa do navegador

🧏 VLibras

Tradutor automático para Libras

Plugin oficial do governo

Inicializado direto no componente AccessibilityTools.tsx

🎛️ Sienna Accessibility

Ferramentas de contraste

Aumento de fonte

Navegação acessível

📌 Como usar

Abra o site

Clique no botão da Lize 💬

Digite sua pergunta

Para ouvir um texto:

Selecione qualquer texto da tela

Ou clique no botão 🔊 "Ler texto"

🖼️ Preview

📄 Licença

Este projeto está sob a licença MIT.
Você pode usar, modificar e distribuir livremente.
