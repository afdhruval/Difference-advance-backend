import "dotenv/config"
import { PDFParse } from "pdf-parse"
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { MistralAIEmbeddings } from "@langchain/mistralai";
import fs from "fs"

let databuffer = fs.readFileSync("./DHRUVAL_RESeME1.pdf")

const parser = new PDFParse({
    data: databuffer
})

const data = await parser.getText()

const embeddings = new MistralAIEmbeddings({
    apiKey: process.env.MISTRAL_API_KEY,
    model: "mistral-embed"
})

const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 100,
    chunkOverlap: 0
})

const chunks = await splitter.splitText(data.text)

const docs = await embeddings.embedDocuments(chunks)

console.log(docs);
