import { pipeline } from "@xenova/transformers";

type EmbeddingOutput = {
  data: Iterable<number> | ArrayLike<number>;
};

type Embedder = (
  input: string,
  options: {
    pooling: "mean";
    normalize: boolean;
  },
) => Promise<EmbeddingOutput>;

let embedder: Embedder | null = null;

export async function embedLocal(text: string) {
  if (!embedder) {
    embedder = (await pipeline(
      "feature-extraction",
      "Xenova/all-MiniLM-L6-v2",
    )) as unknown as Embedder;
  }

  const output = await embedder(text, {
    pooling: "mean",
    normalize: true,
  });
  const vector = Array.from(output.data) as number[];
  console.log("Embedding success:", vector);
  return vector;
}
