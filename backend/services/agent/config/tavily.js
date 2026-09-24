import { TavilySearch } from "@langchain/tavily";

export const searchToole = new TavilySearch({
  maxResults: 5,
  topic: "general",
  includeImages: true,
  
});