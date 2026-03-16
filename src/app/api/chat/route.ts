import { askDO } from "@/lib/do-chat";
import { retrieveContext } from "@/lib/retriever";
import { NextResponse } from "next/server";

type ChatMessage = {
  role?: string;
  content?: string;
};

type ChatRequestBody = {
  messages?: ChatMessage[];
};

export async function POST(req: Request) {
  try {
    const { messages }: ChatRequestBody = await req.json();

    if (!Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid messages payload" },
        { status: 400 },
      );
    }

    // ambil message terakhir dari user
    const lastUserMessage = messages
      .filter((message) => message.role === "user")
      .at(-1);

    if (!lastUserMessage || typeof lastUserMessage.content !== "string") {
      return NextResponse.json(
        { error: "Invalid messages payload" },
        { status: 400 },
      );
    }

    const question = lastUserMessage.content; // ← ini string
    const context = await retrieveContext(question);
    const answer = await askDO(question, context);

    return new Response(answer);
  } catch (err) {
    console.error("Chat error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
