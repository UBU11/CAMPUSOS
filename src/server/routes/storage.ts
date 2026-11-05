import { createPresignedUploadUrl } from "@/lib/r2/presign";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import type { HonoEnv } from "../context";
import { requireAuth } from "../middleware/auth";

const presignInputSchema = z.object({
  fileName: z.string().min(1).max(255),
  contentType: z.string().regex(/^image\/(webp|jpeg|png)$|^application\/pdf$/),
});

export const storageRoutes = new Hono<HonoEnv>().post(
  "/presign",
  requireAuth,
  zValidator("json", presignInputSchema),
  async (c) => {
    const { fileName, contentType } = c.req.valid("json");
    const user = c.get("user");

    const fileExtension = fileName.split(".").pop() ?? "webp";
    const storageKey = `uploads/${user.id}/${Date.now()}-${crypto.randomUUID()}.${fileExtension}`;

    const presigned = await createPresignedUploadUrl(storageKey, contentType, 900);

    return c.json(presigned, 201);
  },
);
