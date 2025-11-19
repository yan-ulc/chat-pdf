import { Pinecone, PineconeRecord } from "@pinecone-database/pinecone";
import { downloadFromS3 } from "./s3-server";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

export const pinecone = new Pinecone({
  apiKey: process.env.NEXT_PUBLIC_PINECONE_API_KEY!,
});

export const index = pinecone.index(process.env.PINECONE_INDEX_NAME!);


export async function loadS3IntoPinecone(filekey : string ) {
    // obtain the pdf -> download and read form s3
    console.log("downloading file from S3 into Pinecone:", filekey);
    const file_name = await downloadFromS3(filekey);
    if (!file_name) {
        throw new Error ("Failed to download file from S3");
    }
    const loader = new PDFLoader(file_name!);
    const pages = await loader.load();
    return pages 
}   