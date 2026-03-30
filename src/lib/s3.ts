import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const region = process.env.NEXT_PUBLIC_S3_REGION!;
const bucket = process.env.NEXT_PUBLIC_S3_BUCKET_NAME!;

const s3 = new S3Client({
  region,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY!,
  },
});

export async function uploadToS3(file: File) {
  try {
    const file_key =
      "uploads/" + Date.now().toString() + file.name.replace(/\s+/g, "-");

    await s3.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: file_key,
        Body: file,
        ContentType: file.type || "application/octet-stream",
      }),
    );

    console.log("Successfully upload to S3!", file_key);

    return Promise.resolve({
      file_key,
      file_name: file.name,
    });
  } catch (error) {
    console.error("Error configuring AWS:", error);
  }
}

export function getS3Url(file_key: string) {
  const url = `https://${bucket}.s3.${region}.amazonaws.com/${file_key}`;

  return url;
}
