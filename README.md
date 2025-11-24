# 🤖 Lize IA — Chatbot Educacional com Acessibilidade

A **Lize IA** é um chatbot educacional desenvolvido em **Next.js + React**, com foco em **acessibilidade digital**, incluindo leitura de texto em voz alta, integração com **VLibras** e menu de acessibilidade.

---

## 🚀 Funcionalidades

- ✅ Chatbot educacional com interface moderna  
- ✅ Design responsivo (Desktop e Mobile)  
- ✅ Leitura de texto (Text-to-Speech)  
- ✅ Leitura de texto selecionado  
- ✅ Botão flutuante no lado esquerdo junto ao menu de acessibilidade  
- ✅ Integração com **VLibras**  
- ✅ Integração com **Sienna Accessibility**  
- ✅ Pronto para deploy na **Vercel**

---

## 🛠 Tecnologias utilizadas

- Next.js 14  
- React  
- TypeScript  
- Tailwind CSS  
- Shadcn/UI  
- Web Speech API (TTS)  
- VLibras  
- Sienna Accessibility  
- Vercel  

---

## 📂 Estrutura do Projeto

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
┣ 📜 tsconfig.json
┗ 📜 README.md

yaml
Copy code

---

## 💻 Como rodar localmente

### 1. Clone o repositório

```bash
git clone https://github.com/SEU-USUARIO/lize-ia.git
cd lize-ia
2. Instale as dependências
bash
Copy code
npm install
3. Configure o ambiente
Crie o arquivo .env.local:

env
Copy code
OPENAI_API_KEY=SUA_CHAVE_AQUI
4. Rode o projeto
bash
Copy code
npm run dev
Acesse em:

arduino
Copy code
http://localhost:3000
🌍 Deploy na Vercel
Suba o projeto no GitHub

Vá até: https://vercel.com

Clique em New Project

Importe seu repositório

Em Environment Variables, adicione:

env
Copy code
OPENAI_API_KEY=SUA_CHAVE_AQUI
Clique em Deploy

♿ Recursos de Acessibilidade
🧏 VLibras
Integração com o plugin oficial do VLibras, permitindo tradução do conteúdo do site para Libras.

Botão flutuante oficial

Widget dinâmico carregado via script

Compatível com Vercel

🎛 Sienna Accessibility
Menu de acessibilidade com:

Aumento/redução de fonte

Contraste alto

Navegação assistiva

Leitura facilitada

O menu fica fixo no lado esquerdo da tela, junto ao botão de leitura.

🔊 Leitura de Texto (TTS)
Leitura de qualquer texto selecionado

Botão flutuante no lado esquerdo

Usa a Web Speech API

Compatível com Chrome, Edge e Firefox

📌 Como usar
Acesse o site

Clique no botão flutuante da Lize 🤖

Digite sua dúvida

Para ouvir algum texto:

Selecione o texto na tela

Clique no botão de áudio 🔊 no lado esquerdo

📄 Licença
Este projeto está sob a licença MIT.
Você pode usar, modificar e distribuir livremente.
