import { db } from "@/db";
import { talentProfiles } from "@/db/schema/talent";
import { zValidator } from "@hono/zod-validator";
import { desc, eq } from "drizzle-orm";
import { Hono } from "hono";
import { z } from "zod";
import type { HonoEnv } from "../context";
import { requireStudent } from "../middleware/auth";

const upsertTalentSchema = z.object({
  department: z.string().min(2).max(50),
  graduationYear: z.number().int().min(2020).max(2035),
  headline: z.string().min(5).max(120),
  bio: z.string().min(10).max(1000),
  skills: z.array(z.string().min(1)).min(1).max(20),
  portfolioUrl: z.string().url().optional(),
  resumeR2Key: z.string().optional(),
  isAvailable: z.boolean().default(true),
});

export const talentRoutes = new Hono<HonoEnv>()
  .get("/", async (c) => {
    const profiles = await db
      .select()
      .from(talentProfiles)
      .where(eq(talentProfiles.isAvailable, true))
      .orderBy(desc(talentProfiles.updatedAt))
      .limit(30);

    return c.json({ profiles }, 200);
  })
  .post("/", requireStudent, zValidator("json", upsertTalentSchema), async (c) => {
    const input = c.req.valid("json");
    const student = c.get("user");

    const [existing] = await db
      .select({ id: talentProfiles.id })
      .from(talentProfiles)
      .where(eq(talentProfiles.studentId, student.id))
      .limit(1);

    if (existing) {
      const [updated] = await db
        .update(talentProfiles)
        .set({
          ...input,
          updatedAt: new Date(),
        })
        .where(eq(talentProfiles.id, existing.id))
        .returning();

      return c.json({ profile: updated }, 200);
    }

    const [created] = await db
      .insert(talentProfiles)
      .values({
        ...input,
        studentId: student.id,
      })
      .returning();

    return c.json({ profile: created }, 201);
  });
