
import { checkAgentLimit } from "../config/agentLimit.js"
import { getModel } from "../config/llmModel.js"
import { deductCredits } from "../utils/deductCredits.js"


export const router = async (state) => {
    

    let selectedAgent

    if (state.file?.mimetype === "application/pdf") {
    selectedAgent = "pdfRag"

  } else if (state.file?.mimetype?.startsWith("image/")) {
   
    selectedAgent = "imageAnalyzer"

  }else if (state.agent && state.agent !== "auto") {

        selectedAgent = state.agent

    } else {

        const llm = await getModel("router")

        const prompt = `You are an agent router.

Your job is to select the correct agent for the user's query.

Available agents:

- chat
- search
- coding
- pdf
- ppt
- vision

IMPORTANT ROUTING RULE:

If the user asks for information that requires current, live, latest, recent, real-time, today's, or up-to-date data, ALWAYS choose "search".

search includes:
- Current weather
- Current temperature
- Weather forecast
- Latest news
- Current events
- Latest sports scores
- Current sports updates
- Latest prices
- Current stock/crypto prices
- Recent information
- Today's information
- Any information that may have changed recently
- Any query containing words such as:
  current, latest, today, now, recently, real-time, up-to-date

chat includes:
- General conversation
- General explanations
- Learning concepts
- Casual questions
- Questions that do NOT require current or real-time information

coding includes:
- Generate code
- Debug code
- Build projects
- Architecture
- API design
- Programming questions

pdf includes:
- Generate PDFs
- Questions about PDF documents
- Questions based on PDF context

ppt includes:
- Generate presentations
- Questions about PPT/PPTX documents
- Questions based on PPT context

vision includes:
- Generate an image
- Create an image
- Edit an image
- Analyze an image

IMPORTANT:
If a query matches both chat and search, choose search.

Return ONLY ONE word:

chat
search
coding
pdf
ppt
vision

User Query:
${state.prompt}
`

        const response = await llm.invoke(prompt)

   
        selectedAgent = response.content.trim().toLowerCase()
    }

    // 👇 Agent decide hone ke BAAD credit deduct
  console.log("SELECTED AGENT:", selectedAgent)
 await checkAgentLimit(
     state.userId,
        selectedAgent
    )
    const result = await deductCredits(
        state.userId,
        selectedAgent
    )

    // 👇 Agar credits deduct nahi hue
    if (!result?.success) {
        throw new Error(
            result?.message || "Unable to deduct credits"
        )
    }
    // 👇 Final state
    return {
        ...state,
        agent: selectedAgent,
        
    }
}