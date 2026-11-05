"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { insertTalentProfileSchema, talentProfiles } from "@/db/schema/talent";
import { authenticatedActionClient } from "@/lib/safe-action";

const upsertTalentInputSchema = insertTalentProfileSchema.omit({
  id: true,
  studentId: true,
  createdAt: true,
  updatedAt: true
});

export const upsertTalentProfileAction = authenticatedActionClient
  .schema(upsertTalentInputSchema)
  .action(async ({ parsedInput, ctx }) => {
    if (ctx.user.role !== "student") {
      throw new Error("Only student accounts can create talent profiles");
    }

    const [existing] = await db
      .select({ id: talentProfiles.id })
      .from(talentProfiles)
      .where(eq(talentProfiles.studentId, ctx.user.id))
      .limit(1);

    if (existing) {
      const [updated] = await db
        .update(talentProfiles)
        .set({
          ...parsedInput,
          updatedAt: new Date()
        })
        .where(eq(talentProfiles.id, existing.id))
        .returning();

      revalidatePath("/talent");
      revalidatePath("/");
      return { profile: updated };
    }

    const [created] = await db
      .insert(talentProfiles)
      .values({
        ...parsedInput,
        studentId: ctx.user.id
      })
      .returning();

    revalidatePath("/talent");
    revalidatePath("/");
    return { profile: created };
  });
