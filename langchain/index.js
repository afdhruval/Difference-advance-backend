import "dotenv/config"
import readline from "readline/promises";
import { ChatMistralAI } from "@langchain/mistralai"
import { HumanMessage, tool, createAgent } from "langchain";
import { sendEmail } from "./mail.services.js";
import * as z from "zod";


const emailTool = tool(
    sendEmail,
    {
        name: "emailTool",
        description: "Use this tool to send an email",
        schema: z.object({
            to: z.string().describe("The recipient's email address"),
            html: z.string().describe("The HTML content of the email"),
            subject: z.string().describe("The subject of the email"),
        })
    }
)



const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const model = new ChatMistralAI({
    model: "mistral-small-latest",
})

const agent = createAgent({
    model,
    tools: [emailTool]
})

const messages = []

while (true) {

    console.log("===========================================");
    
    const userInput = await rl.question("you :  ")
    messages.push(new HumanMessage(userInput))
    
    const response = await agent.invoke({
        messages
    })
    console.log("===========================================");    
    messages.push(response.messages[response.messages.length - 1])
    
    console.log("===========================================");
    console.log(`\ Ai :  ${response.messages[response.messages.length - 1].content}`)
}