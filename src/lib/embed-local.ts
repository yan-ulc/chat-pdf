import {pipeline} from "@xenova/transformers"

let embedder : any = null

export async function embedLocal(text: string) {
    if(!embedder){
        embedder = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2")
    }

    const output = await embedder(text, {
        pooling: "mean",
        normalize: true
    })
    const vector = Array.from(output.data) as number[]
    console.log("Embedding success:", vector);
    return vector;
}