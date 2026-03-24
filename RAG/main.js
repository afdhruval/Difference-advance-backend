import { PDFParse } from "pdf-parse"
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import fs from "fs"

let databuffer = fs.readFileSync("./DHRUVAL_RESeME1.pdf")

const parser = new PDFParse({
    data: databuffer
})

const data = await parser.getText()

const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 100,
    chunkOverlap: 0
})

const chunks = await splitter.splitText(data.text)

console.log(chunks, chunks.length);
