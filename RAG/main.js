import "dotenv/config"
import { PDFParse } from "pdf-parse"
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { MistralAIEmbeddings } from "@langchain/mistralai";
import { Pinecone } from '@pinecone-database/pinecone';
import fs from "fs"



// =============================
// 🔹 PHASE 1: READ PDF
// =============================

// Read PDF file as buffer
let databuffer = fs.readFileSync("./DHRUVAL_RESeME1.pdf")

// Parse PDF and extract text
const parser = new PDFParse({
    data: databuffer
})

// Extracted text from PDF
const data = await parser.getText()



// =============================
// 🔹 PHASE 2: TEXT SPLITTING
// =============================

// Create text splitter (chunking)
const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 100,
    chunkOverlap: 0
})

// Split full text into chunks
const chunks = await splitter.splitText(data.text)



// =============================
// 🔹 PHASE 3: EMBEDDING MODEL
// =============================

// Initialize embedding model
const embeddings = new MistralAIEmbeddings({
    apiKey: process.env.MISTRAL_API_KEY,
    model: "mistral-embed"
})



// =============================
// 🔹 PHASE 4: VECTOR DATABASE (PINECONE)
// =============================

// Initialize Pinecone client
const pc = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY
})

// Connect to index
const index = pc.Index("rag-pdf")



// =============================
// 🔹 PHASE 5: STORE EMBEDDINGS (INGESTION)
// =============================

// ❗ Currently commented (good for testing step by step)

/*
const docs = await Promise.all(
    chunks.map(async (chunk) => {
        const embedding = await embeddings.embedQuery(chunk)

        return {
            text: chunk,
            embedding
        }
    })
)

// Store embeddings in Pinecone
const results = await index.upsert({
    records: docs.map((doc, i) => ({
        id: `doc-${i}`,
        values: doc.embedding,
        metadata: {
            text: doc.text
        }
    }))
})
*/



// =============================
// 🔹 PHASE 6: QUERY EMBEDDING
// =============================

// Convert user query into embedding
const queryEmbedding = await embeddings.embedQuery(
    "give me the react topic the dhruval known ?"
)

console.log(queryEmbedding)



// =============================
// 🔹 PHASE 7: RETRIEVAL
// =============================

// Search similar vectors in Pinecone
const result = await index.query({
    vector: queryEmbedding,
    topK: 2,
    includeMetadata: true
})



// =============================
// 🔹 PHASE 8: OUTPUT
// =============================

// Print retrieved results
console.log(JSON.stringify(result))