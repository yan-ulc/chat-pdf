import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { Document } from "@langchain/core/documents";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import md5 from "md5";
import { embedLocal } from "./embed-local";
import { index } from "./pinecone-index";
import { downloadFromS3 } from "./s3-server";
import { convertToAscii } from "./utils";

export type PDFPage = {
  pageContent: string;
  metadata: {
    loc: { pageNumber: number };
    pageNumber: number;
  };
};

export async function loadS3IntoPinecone(filekey: string) {
  console.log("Downloading:", filekey);

  const buffer = await downloadFromS3(filekey);
  if (!buffer) throw new Error("Failed to download from S3");

  const blob = new Blob([new Uint8Array(buffer)], {
    type: "application/pdf",
  });

  const loader = new PDFLoader(blob, { splitPages: true });
  const pages = (await loader.load()) as PDFPage[];

  console.log("PDF pages:", pages.length);

  const docsNested = await Promise.all(pages.map(prepareDocuments));
  const docs = docsNested.flat();

  console.log("Total chunks:", docs.length);

  await embedAndUpsert(docs);

  return docs;
}

export async function embedAndUpsert(docs: Document[]) {
  console.log("Embedding + upserting...");

  const vectors = [];

  for (let i = 0; i < docs.length; i++) {
    const doc = docs[i];
    const embedding = await embedLocal(doc.pageContent);
    console.log("Embedding vector for chunk", i, ":", embedding);

    const hash = md5(convertToAscii(doc.pageContent));

    vectors.push({
      id: hash,
      values: embedding,
      metadata: {
        text: doc.pageContent,
        pageNumber: doc.metadata?.pageNumber,
      },
    });
  }

  await index.upsert(vectors);

  console.log("Upsert done:", vectors.length, "vectors");
}

export async function prepareDocuments(page: PDFPage) {
  let { pageContent } = page;
  const { metadata } = page;

  if (!pageContent) return [];

  pageContent = pageContent.replace(/\n/g, " ");

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });

  const docs = await splitter.splitDocuments([
    new Document({
      pageContent,
      metadata: {
        pageNumber: metadata.loc.pageNumber,
        raw: pageContent,
      },
    }),
  ]);
  console.log(
    "Prepared",
    docs.length,
    "chunks for page",
    metadata.loc.pageNumber,
  );
  return docs;
}
