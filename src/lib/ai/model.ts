import { ChatGroq } from "@langchain/groq";
import { ChatGoogle } from "@langchain/google";

const groq = new ChatGroq({
  model: "openai/gpt-oss-120b",
  temperature: 0,
  maxTokens: undefined,
  maxRetries: 2,
});

const gemini = new ChatGoogle("gemini-2.5-flash");

export const getModel = async (agent: string) => {
  if (agent === "coding") return gemini;

  return groq;
};
