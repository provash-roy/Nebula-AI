import { getModel } from "@/lib/ai/model";
import { AgentState } from "../shared/state";

export const codingAgent = async (state: AgentState) => {
  const llm = await getModel("router");

  const response = await llm.invoke([
    {
      role: "system",
      content: ,
    },
    {
      role: "user",
      content: state.prompt,
    },
  ]);

  console.log(response);

  return {
    ...state,
    agent:
      typeof response.content === "string"
        ? response.content.trim().toLowerCase()
        : response.content,
  };
};
