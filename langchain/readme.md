# 🤖 LangChain Agent + Email Tool (Nodemailer)

AI agent that can **send emails using a tool**.

---

## 🧠 Concept

- **Agent** → decides what to do
- **Tool** → sends email
- **LLM (Mistral)** → understands user request

👉 Example:
`"Send email to dhruv@gmail.com"` → Agent → Tool → Email sent

---

## ⚙️ Setup

```bash
npm install @langchain/core @langchain/mistralai @langchain/langgraph nodemailer dotenv
```

---

## 🔐 Environment

Create `.env`:

```
MISTRAL_API_KEY=your_api_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

⚠️ Use **App Password**, not your real Gmail password.

---

## 📦 Code

```javascript
import "dotenv/config";

import nodemailer from "nodemailer";
import { tool } from "@langchain/core/tools";
import { ChatMistralAI } from "@langchain/mistralai";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { HumanMessage } from "@langchain/core/messages";

// 🔹 Email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// 🔹 Email Tool
const sendEmailTool = tool(
  async ({ to, subject, text }) => {
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject,
        text,
      });
      return "Email sent successfully";
    } catch (err) {
      return "Failed to send email";
    }
  },
  {
    name: "send_email",
    description:
      "Send an email. Input should include 'to', 'subject', and 'text'.",
  },
);

// 🔹 Model
const model = new ChatMistralAI({
  model: "mistral-small-latest",
  apiKey: process.env.MISTRAL_API_KEY,
});

// 🔹 Agent
const agent = createReactAgent({
  llm: model,
  tools: [sendEmailTool],
});

// 🔹 Run
const response = await agent.invoke({
  messages: [
    new HumanMessage(
      "Send email to example@gmail.com with subject Hello and message Hi there",
    ),
  ],
});

console.log(response.messages.at(-1).content);
```

---

## 💬 How to Use

Run:

```bash
node index.js
```

Try:

```
Send email to xyz@gmail.com with subject Test and message Hello bro
```

---

## ⚠️ Important

- Enable **2-step verification in Gmail**
- Generate **App Password**
- Never expose `.env`

---

## 🚀 Upgrade Ideas

- Add CLI input
- Add multiple tools
- Build AI assistant
- Add logging

---
