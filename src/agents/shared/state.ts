import { Annotation } from "@langchain/langgraph";

export const agentState = Annotation.Root({
  prompt: Annotation<string>(),

  conversationId: Annotation<string>(),

  agent: Annotation<"chat" | "search" | "coding" | "image">(),

  aiResponse: Annotation<string>(),
});

export type AgentState = typeof agentState.State;