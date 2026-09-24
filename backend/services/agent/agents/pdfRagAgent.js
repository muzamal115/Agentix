import fs from "fs"
import { PDFParse } from "pdf-parse"
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters"
import { vectorStore } from "../config/vectorDb.js"

import { HumanMessage, SystemMessage } from "@langchain/core/messages"
import { getModel } from "../config/llmModel.js"

export const pdfRag = async (state) => {

  let pdf; 

  try {
    const buffer = fs.readFileSync(state.file.path)
    pdf = new PDFParse({ data: buffer })

    const result = await pdf.getText() 
    const text = result.text
  

    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200
    })

    const docs = await splitter.createDocuments([text])

    const collectionName = `pdf-${Date.now()}`
    const store = await vectorStore(docs, collectionName)
   

    const relevantDocs = await store.similaritySearch(state.prompt, 5)
  

    const context = relevantDocs.map(d => d.pageContent).join("\n\n")

    const llm = await getModel("pdf-rag")

    const messages = [
      new SystemMessage(
        `You are CortexAI PDF Assistant.

Rules:

- Answer ONLY from the uploaded PDF.

- Never make up information.

- If the answer is not present in the PDF, reply:

"I couldn't find this information in the uploaded PDF."

- Use Markdown formatting.
`
      ),
      new HumanMessage(`
Context:${context}
Question:${state.prompt}
`)
    ]

    const response = await llm.invoke(messages)
    return {
      ...state,
      aiResponse: response.content
    }

  } catch (error) {
    console.log(error)
    return {
      ...state,
      aiResponse: "Failed to Analyze pdf"
    }
  } finally {
    if (pdf) await pdf.destroy() 
    fs.unlinkSync(state.file.path)
  }
}