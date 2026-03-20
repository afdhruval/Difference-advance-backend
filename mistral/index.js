import "dotenv/config";
import readline from "readline/promises";
import { stdin as input, stdout as output } from "process";
// import { humanmessage } from "@langchain/core";
import { HumanMessage } from "@langchain/core/messages";

import { ChatMistralAI } from "@langchain/mistralai";

const rl = readline.createInterface({ input, output });

const model = new ChatMistralAI({
    model: "mistral-small-latest",
    apiKey: process.env.MISTRAL_API_KEY,
});

const messages = []

while (true) {

    
    const userInput = await rl.question("you: ");
    
    messages.push(new HumanMessage(userInput))
    
    console.log("================");

    const response = await model.invoke(messages);
    
    messages.push(response)

    console.log("================");

    console.log("AI  :  ", response.content);

}

rl.close();