import { getModel } from "@/lib/ai/model";
import { routerPrompt } from "./prompt";

export const routerAgent = async (state) => {
  const llm = await getModel("router");

  const response = await llm.invoke(routerPrompt);
  console.log(response);

  return {
    ...state,
    agent:
      typeof response.content === "string"
        ? response.content.trim().toLowerCase()
        : response.content,
  };
};
