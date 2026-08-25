import { Annotation } from "@langchain/langgraph";

export const agentState = Annotation.Root({
  prompt: Annotation<string>(),

  conversationId: Annotation<string>(),

  useRag: Annotation<boolean>(),

  agent: Annotation<"chat" | "search" | "coding" | "image" | "rag">(),

  aiResponse: Annotation<string>(),
});

export type AgentState = typeof agentState.State;
