import { QdrantVectorStore } from "@langchain/qdrant";
import { Document } from "@langchain/core/documents";
import { embeddings } from "./embeddings";

const vectorStoreConfig = {
  url: process.env.QDRANT_URL!,
  apiKey: process.env.QDRANT_API_KEY!,
  collectionName: "nebula-ai",
};

export async function getVectorStore(documents?: Document[]) {
  if (documents?.length) {
    return await QdrantVectorStore.fromDocuments(
      documents,
      embeddings,
      vectorStoreConfig,
    );
  }

  return await QdrantVectorStore.fromExistingCollection(embeddings, {
    ...vectorStoreConfig,
  });
}
