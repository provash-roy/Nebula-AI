import { getModel } from "@/lib/ai/model";
import { AgentState } from "../shared/state";

import {
  intentClassifier,
  CODE_GENERATION_SYSTEM_PROMPT,
  CODE_REVIEW_SYSTEM_PROMPT,
  DEBUGGING_SYSTEM_PROMPT,
  EXPLANATION_SYSTEM_PROMPT,
  OPTIMIZATION_SYSTEM_PROMPT,
  DOCUMENTATION_SYSTEM_PROMPT,
} from "./prompt";

const agentPromptMap = {
  CODE_GENERATION: CODE_GENERATION_SYSTEM_PROMPT,
  CODE_REVIEW: CODE_REVIEW_SYSTEM_PROMPT,
  DEBUGGING: DEBUGGING_SYSTEM_PROMPT,
  EXPLANATION: EXPLANATION_SYSTEM_PROMPT,
  OPTIMIZATION: OPTIMIZATION_SYSTEM_PROMPT,
  DOCUMENTATION: DOCUMENTATION_SYSTEM_PROMPT,
};

export const codingAgent = async (state: AgentState) => {
  const intentLLM = await getModel("intent");

  const codingLLM = await getModel("coding");

  const intentResponse = await intentLLM.invoke([
    {
      role: "system",
      content: intentClassifier,
    },
    {
      role: "user",
      content: state.prompt,
    },
  ]);

  const intent =
    typeof intentResponse.content === "string"
      ? intentResponse.content.trim()
      : "";

  const selectedPrompt = agentPromptMap[intent as keyof typeof agentPromptMap];

  if (!selectedPrompt) {
    return {
      ...state,
      aiResponse:
        "I could not understand your request type. Please provide more details.",
      intent: "UNKNOWN",
    };
  }

  const response = await codingLLM.invoke([
    {
      role: "system",
      content: selectedPrompt,
    },
    {
      role: "user",
      content: state.prompt,
    },
  ]);

  const aiResponse =
    typeof response.content === "string"
      ? response.content
      : JSON.stringify(response.content);

  return {
    ...state,

    aiResponse,
  };
};
