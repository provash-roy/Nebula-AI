import { agentState } from "@/agents/shared/state";
import { StateGraph } from "@langchain/langgraph";

const agent = new StateGraph(agentState)
  