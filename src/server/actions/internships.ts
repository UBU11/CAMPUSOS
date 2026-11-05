"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { insertInternshipSchema, internships } from "@/db/schema/internships";
import { authenticatedActionClient } from "@/lib/safe-action";

const createInternshipInputSchema = insertInternshipSchema.omit({
  id: true,
  companyId: true,
  createdAt: true,
  updatedAt: true
});

export const createInternshipAction = authenticatedActionClient
  .schema(createInternshipInputSchema)
  .action(async ({ parsedInput, ctx }) => {
    if (ctx.user.role !== "company" && ctx.user.role !== "admin") {
      throw new Error("Only verified company accounts can post internships");
    }

    if (!ctx.user.isVerified) {
      throw new Error(
        "Company account verification pending. An admin must verify your account before publishing."
      );
    }

    const [internship] = await db
      .insert(internships)
      .values({
        ...parsedInput,
        companyId: ctx.user.id
      })
      .returning();

    revalidatePath("/internships");
    revalidatePath("/");

    return { internship };
  });
