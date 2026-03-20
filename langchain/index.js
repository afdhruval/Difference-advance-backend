import { config } from "dotenv";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

config();

async function run() {
    try {
        const model = new ChatGoogleGenerativeAI({
            model: "gemini-pro",  // ✅ FIXED
            apiKey: process.env.GOOGLE_API_KEY
        });

        const res = await model.invoke([
            { role: "user", content: "Who are you?" }
        ]);

        console.log("OUTPUT:", res.content);

    } catch (err) {
        console.error("ERROR:", err);
    }
}

run();