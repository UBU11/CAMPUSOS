import { boolean, integer, jsonb, pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { users } from "./users";

export const locationTypeEnum = pgEnum("internship_location_type", [
  "remote",
  "on_campus",
  "hybrid"
]);

export const internships = pgTable("internships", {
  id: uuid("id").primaryKey().defaultRandom(),
  companyId: uuid("company_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  department: text("department").notNull(),
  stipendInr: integer("stipend_inr").default(0).notNull(),
  durationWeeks: integer("duration_weeks").notNull(),
  requirements: jsonb("requirements").$type<string[]>().default([]).notNull(),
  locationType: locationTypeEnum("location_type").default("on_campus").notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull()
});

export const insertInternshipSchema = createInsertSchema(internships);
export const selectInternshipSchema = createSelectSchema(internships);

export type Internship = typeof internships.$inferSelect;
export type NewInternship = typeof internships.$inferInsert;
