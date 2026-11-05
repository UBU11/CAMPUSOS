import { db } from "@/db";
import { internships } from "@/db/schema/internships";
import { zValidator } from "@hono/zod-validator";
import { and, desc, eq } from "drizzle-orm";
import { Hono } from "hono";
import { z } from "zod";
import type { HonoEnv } from "../context";
import { requireCompany, requireStudent } from "../middleware/auth";

const createInternshipSchema = z.object({
  title: z.string().min(5).max(120),
  description: z.string().min(20).max(3000),
  department: z.string().min(2).max(50),
  stipendInr: z.number().int().nonnegative().default(0),
  durationWeeks: z.number().int().positive().max(52),
  requirements: z.array(z.string().min(2)).min(1).max(10),
  locationType: z.enum(["remote", "on_campus", "hybrid"]).default("on_campus"),
});

const applyInternshipSchema = z.object({
  internshipId: z.string().uuid(),
  coverNote: z.string().min(10).max(1000),
});

export const internshipRoutes = new Hono<HonoEnv>()
  .get("/", async (c) => {
    const activeInternships = await db
      .select()
      .from(internships)
      .where(eq(internships.isActive, true))
      .orderBy(desc(internships.createdAt))
      .limit(30);

    return c.json({ internships: activeInternships }, 200);
  })
  .post("/", requireCompany, zValidator("json", createInternshipSchema), async (c) => {
    const input = c.req.valid("json");
    const companyUser = c.get("user");

    const [created] = await db
      .insert(internships)
      .values({
        ...input,
        companyId: companyUser.id,
      })
      .returning();

    return c.json({ internship: created }, 201);
  })
  .post("/apply", requireStudent, zValidator("json", applyInternshipSchema), async (c) => {
    const { internshipId, coverNote } = c.req.valid("json");
    const student = c.get("user");

    const [targetInternship] = await db
      .select()
      .from(internships)
      .where(and(eq(internships.id, internshipId), eq(internships.isActive, true)))
      .limit(1);

    if (!targetInternship) {
      return c.json({ error: "Internship posting not found or no longer active" }, 404);
    }

    return c.json(
      {
        success: true,
        message: "Application submitted successfully",
        application: {
          internshipId,
          studentId: student.id,
          coverNote,
        },
      },
      201,
    );
  });
