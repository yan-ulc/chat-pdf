// s3-server.ts

import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";

const region = process.env.NEXT_PUBLIC_S3_REGION!;
const bucket = process.env.NEXT_PUBLIC_S3_BUCKET_NAME!;

const s3 = new S3Client({
  region,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY!,
  },
});

async function bodyToBuffer(body: unknown): Promise<Buffer> {
  if (body && typeof body === "object") {
    const withTransform = body as {
      transformToByteArray?: () => Promise<Uint8Array>;
    };
    if (typeof withTransform.transformToByteArray === "function") {
      const bytes = await withTransform.transformToByteArray();
      return Buffer.from(bytes);
    }
  }

  if (body instanceof Uint8Array) {
    return Buffer.from(body);
  }

  if (typeof body === "string") {
    return Buffer.from(body);
  }

  throw new Error("Unsupported S3 object body type");
}

export async function downloadFromS3(filekey: string) {
  try {
    const obj = await s3.send(
      new GetObjectCommand({
        Bucket: bucket,
        Key: filekey,
      }),
    );

    if (!obj.Body) throw new Error("Empty file from S3");

    return await bodyToBuffer(obj.Body);
  } catch (err) {
    console.error("Error downloading from S3:", err);
    return null;
  }
}
