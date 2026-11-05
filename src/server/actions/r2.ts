"use server";

import { createPresignedUploadUrl } from "@/lib/r2/presign";
import { authenticatedActionClient } from "@/lib/safe-action";
import { z } from "zod";

const presignedUrlInputSchema = z.object({
  fileName: z.string().min(1),
  contentType: z.string().regex(/^image\/(webp|jpeg|png)$|^application\/pdf$/),
});

export const getPresignedUploadUrlAction = authenticatedActionClient
  .schema(presignedUrlInputSchema)
  .action(async ({ parsedInput, ctx }) => {
    const fileExtension = parsedInput.fileName.split(".").pop() ?? "webp";
    const uniqueKey = `uploads/${ctx.user.id}/${Date.now()}-${crypto.randomUUID()}.${fileExtension}`;

    const presigned = await createPresignedUploadUrl(uniqueKey, parsedInput.contentType, 900);

    return presigned;
  });
