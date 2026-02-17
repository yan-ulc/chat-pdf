export async function askDO(question: string, context: string) {
  const res = await fetch("https://inference.do-ai.run/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.DO_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama3-8b-instruct",
      messages: [
        {
          role: "system",
          content: "You are a RAG assistant. Use the context to answer accurately.",
        },
        {
          role: "user",
          content: `Context:\n${context}\n\nQuestion:\n${question}`,
        },
      ],
      temperature: 0.2,
    }),
  });

  const json = await res.json();
  return json.choices[0].message.content;
}
