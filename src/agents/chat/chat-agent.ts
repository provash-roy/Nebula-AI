import { getModel } from "@/lib/ai/model";
import { AgentState } from "../shared/state";


export const chatAgent = async (state: AgentState) => {
  const llm = await getModel("chat");

  const systemPrompt = `
You are Nebula AI, an intelligent AI assistant.

Your responsibilities:
- Answer user questions clearly.
- Provide accurate and helpful responses.
- Explain concepts in a simple way.
- Be friendly and professional.
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
