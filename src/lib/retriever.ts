import { embedLocal } from "./embed-local";
import { index } from "./pinecone-index";

export async function retrieveContext(query: string) {
  const queryEmbedding = await embedLocal(query);

  const results = await index.query({
    vector: queryEmbedding,
    topK: 5,
    includeMetadata: true,
  });

  return results.matches
    .map((m) => m.metadata?.text || "")
    .join("\n\n");
}
