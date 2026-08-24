import { getModel } from "@/lib/ai/model";
import { getVectorStore } from "@/lib/ai/qdrant";
import { AgentState } from "../shared/state";

export const ragAgent = async (state: AgentState) => {
  const llm = await getModel("rag");
  const vectorStore = await getVectorStore();

  const relevantDocs = await vectorStore.similaritySearch(state.prompt, 5);

  const context = relevantDocs
    .map((doc, index) => {
      return `
--- Document ${index + 1} ---
${doc.pageContent}
`;
    })
    .join("\n");

  const systemPrompt = `
You are Nebula AI, an intelligent RAG-based AI assistant.

Your responsibilities:
- Answer the user's question using the provided context.
- Do not invent information that is not present in the context.
- If the answer cannot be found in the context, clearly say that you don't have enough information.
- Explain concepts clearly and simply.
- Be accurate, helpful, friendly, and professional.

Retrieved Context:
${context}
`;

  const response = await llm.invoke([
    {
      role: "system",
      content: systemPrompt,
    },
    {
      role: "user",
      content: state.prompt,
    },
  ]);

  return {
    ...state,
    aiResponse: response.content.toString(),
  };
};
