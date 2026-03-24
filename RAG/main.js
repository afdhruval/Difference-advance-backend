import "dotenv/config"
import { PDFParse } from "pdf-parse"
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { MistralAIEmbeddings } from "@langchain/mistralai";
import { Pinecone } from '@pinecone-database/pinecone';
import fs from "fs"
import { text } from "stream/consumers";
import { promises } from "dns";

let databuffer = fs.readFileSync("./DHRUVAL_RESeME1.pdf")

const pc = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY
})

const index = pc.Index("rag-pdf")



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

const docs = await Promise.all(chunks.map(async (chunk) => {
    const embedding = await embeddings.embedQuery(chunk)

    return {
        text: chunk,
        embedding
    }
}))


const results = await index.upsert({
    records: docs.map((doc, i) => ({
        id: `doc-${i}`,
        values: doc.embedding,
        metadata: {
            text: doc.text
        }
    }))
})

console.log(results);
