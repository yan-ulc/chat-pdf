export async function embedWithDO(text: string) {
  const res = await fetch("https://api.digitalocean.com/v1/ai/embeddings", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.DO_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "text-embedding-3-small",
      input: text,
    }),
  });

  const json = await res.json();
  console.log("Embedding response from DO:", json);
  return json.data[0].embedding;

}
