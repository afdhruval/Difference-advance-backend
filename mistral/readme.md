# 🤖 Mistral CLI 

Simple command-line chatbot using **Mistral AI + LangChain (Node.js)**.

---

## ⚙️ Setup

```bash
git clone https://github.com/your-username/mistral-chatbot.git
cd mistral-chatbot
npm install
npm install @langchain/core @langchain/mistralai dotenv
```

---

## 🔐 Environment

Create `.env`:

```
MISTRAL_API_KEY=your_api_key_here
```

---

## ▶️ Run

```bash
node index.js
```

---

## 💬 Usage

- Type anything → get AI response
- Type `exit` → quit

---

## 🧠 Core Idea

- **Mistral** → AI model
- **LangChain** → handles messages & flow
- **messages[]** → stores chat history

---

## 📦 Code

```javascript
import "dotenv/config";
import readline from "readline/promises";
import { stdin as input, stdout as output } from "process";

import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { ChatMistralAI } from "@langchain/mistralai";

const rl = readline.createInterface({ input, output });

const model = new ChatMistralAI({
  model: "mistral-small-latest",
  apiKey: process.env.MISTRAL_API_KEY,
  temperature: 0.7,
});

const messages = [new SystemMessage("You are a helpful AI assistant.")];

while (true) {
  const inputText = await rl.question("You: ");

  if (inputText.toLowerCase() === "exit") break;

  messages.push(new HumanMessage(inputText));

  const response = await model.invoke(messages);
  messages.push(response);

  console.log("AI:", response.content, "\n");
}

rl.close();
```

---

## ⚠️ Fixes

- API error → check `.env`
- Module error → `npm install`
- ES module → `"type": "module"` in `package.json`

---

## 🚀 Next

- Add UI (React)
- Add DB memory
- Build RAG chatbot

---
