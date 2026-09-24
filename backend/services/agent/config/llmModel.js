import dotenv from "dotenv";
dotenv.config();

import { ChatGroq } from "@langchain/groq"
import { ChatGoogleGenerativeAI } from "@langchain/google-genai"

import { ChatOpenRouter } from "@langchain/openrouter";

const gemini = new ChatGoogleGenerativeAI({
    model: "gemini-3.6-flash",
   
})

const groq = new ChatGroq({
    model: "openai/gpt-oss-120b"
})

const openrouter = new ChatOpenRouter({
  model: "openrouter/free",
  temperature: 0,
  maxTokens:  4096,
 
});

export const getModel=async (agent) => {
    
    switch (agent) {
        case "chat":  
            return groq;    
         case "search":  
            return groq;
         case "coding":  
            return openrouter;        
         case "imageAnalyzer":  
            return gemini;        
        default:
            return groq;
    }
       

}