import { boolean, integer, jsonb, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { users } from "./users";

export const talentProfiles = pgTable("talent_profiles", {
  id: uuid("id").primaryKey().defaultRandom(),
  studentId: uuid("student_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull()
    .unique(),
  department: text("department").notNull(),
  graduationYear: integer("graduation_year").notNull(),
  headline: text("headline").notNull(),
  bio: text("bio").notNull(),
  skills: jsonb("skills").$type<string[]>().default([]).notNull(),
  portfolioUrl: text("portfolio_url"),
  resumeR2Key: text("resume_r2_key"),
  isAvailable: boolean("is_available").default(true).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const insertTalentProfileSchema = createInsertSchema(talentProfiles);
export const selectTalentProfileSchema = createSelectSchema(talentProfiles);

export type TalentProfile = typeof talentProfiles.$inferSelect;
export type NewTalentProfile = typeof talentProfiles.$inferInsert;
