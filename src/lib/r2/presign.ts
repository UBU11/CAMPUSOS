import { env } from "@/env";
import { AwsClient } from "aws4fetch";

const r2Client = new AwsClient({
  accessKeyId: env.R2_ACCESS_KEY_ID,
  secretAccessKey: env.R2_SECRET_ACCESS_KEY,
  service: "s3",
  region: "auto",
});

export async function createPresignedUploadUrl(
  key: string,
  contentType: string,
  expiresInSeconds = 3600,
) {
  const url = new URL(
    `https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com/${env.R2_BUCKET_NAME}/${key}`,
  );
  url.searchParams.set("X-Amz-Expires", expiresInSeconds.toString());

  const signed = await r2Client.sign(
    new Request(url.toString(), {
      method: "PUT",
      headers: {
        "Content-Type": contentType,
      },
    }),
    {
      aws: { signQuery: true },
    },
  );

  return {
    uploadUrl: signed.url,
    publicUrl: `${env.NEXT_PUBLIC_R2_PUBLIC_URL}/${key}`,
    key,
  };
}
