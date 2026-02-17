// s3-server.ts

import AWS from "aws-sdk";

export async function downloadFromS3(filekey: string) {
  try {
    AWS.config.update({
      accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID!,
      secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY!,
    });

    const s3 = new AWS.S3({
      params: { Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME! },
      region: process.env.NEXT_PUBLIC_S3_REGION!,
    });

    const obj = await s3
      .getObject({
        Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
        Key: filekey,
      })
      .promise();

    if (!obj.Body) throw new Error("Empty file from S3");

    return obj.Body as Buffer;
  } catch (err) {
    console.error("Error downloading from S3:", err);
    return null;
  }
}