import { getModel } from "@/lib/ai/model";
import { AgentState } from "../shared/state";
import { intentClassifier } from "./prompt";

export const codingAgent = async (state: AgentState) => {
  const llm = await getModel("intent");
  const codingLlm = await getModel("coding");

  const response = await llm.invoke([
    {
      role: "system",
      content: intentClassifier,
    },
    {
      role: "user",
      content: state.prompt,
    },
  ]);

  return {
    ...state,
    agent:
      typeof response.content === "string"
        ? response.content.trim().toLowerCase()
        : response.content,
  };
};
