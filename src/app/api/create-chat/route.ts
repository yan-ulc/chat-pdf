import { NextResponse } from "next/server";
import { loadS3IntoPinecone } from "@/lib/pinecone";

export async function POST(req: Request) {
try{
  const body = await req.json()
  const { file_key, file_name } = body;
  if (!file_key || !file_name) {
    return NextResponse.json(
      { error : "file_key or file_name missing" },
      { status: 400 }
    )
  }

  console.log("Received:", {file_key, file_name});
  console.log({"loading file into pinecone": file_key});
  const pages = await loadS3IntoPinecone(file_key);
  console.log("Loaded pages:", pages.length);
  return NextResponse.json({ pages } );
} catch(err : any){
  console.error ("Error in api/ceate-chat", err);
  return NextResponse.json(
     { error : err.message || "internal server errror" }, 
     { status: 500 } 
    )
  }

}
