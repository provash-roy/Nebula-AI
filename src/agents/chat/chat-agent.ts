import { getModel } from "@/lib/ai/model";

export const chatAgent = async (state) => {
  const llm = getModel("chat");

  const systemPrompt = `You are Nebula AI. an intelligent AI assistant.`;

  const response = (await llm).invoke([
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
    aiResponse: response.content,
  };
};
