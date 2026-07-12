import { chatAgent } from "@/agents/chat/chat-agent";
import { codingAgent } from "@/agents/coding/coding-agent";
import { imageAgent } from "@/agents/image/image-agent";
import { routerAgent } from "@/agents/router/router-agent";
import { searchAgent } from "@/agents/search/search-agent";
import { agentState } from "@/agents/shared/state";
import { StateGraph } from "@langchain/langgraph";

const agent = new StateGraph(agentState)
  .addNode("router", routerAgent)
  .addNode("chat", chatAgent)
  .addNode("search", searchAgent)
  .addNode("coding", codingAgent)
  .addNode("image", imageAgent)
  .addEdge("__start__", "router")
  .addConditionalEdges(
    "router",
    (state) => {
      if (state.agent === "chat") {
        return "chat";
      }

      if (state.agent === "search") {
        return "search";
      }

      if (state.agent === "coding") {
        return "coding";
      }

      if (state.agent === "image") {
        return "image";
      }

      return "chat";
    },
    {
      chat: "chat",
      coding: "coding",
      search: "search",
      image: "image",
    },
  )
  .addEdge("search", "chat")
  .addEdge("chat", "__end__")
  .addEdge("coding", "__end__")
  .addEdge("image", "__end__");

export const graph = agent.compile();
