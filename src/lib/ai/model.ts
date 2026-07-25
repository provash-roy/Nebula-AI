import { ChatGroq } from "@langchain/groq";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const groq = new ChatGroq({
  model: "openai/gpt-oss-120b",

  maxTokens: undefined,
});

const gemini = new ChatGoogleGenerativeAI({
  model: "gemini-2.0-flash",
  temperature: 0,
});

export const getModel = async (agent: string) => {
  if (agent === "coding") return groq;

  return groq;
};
