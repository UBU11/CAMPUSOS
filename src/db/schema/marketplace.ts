import { integer, jsonb, pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { users } from "./users";

export const listingTypeEnum = pgEnum("listing_type", ["sell", "lend", "both"]);
export const listingStatusEnum = pgEnum("listing_status", [
  "active",
  "sold",
  "rented",
  "archived"
]);

export const marketplaceListings = pgTable("marketplace_listings", {
  id: uuid("id").primaryKey().defaultRandom(),
  sellerId: uuid("seller_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  listingType: listingTypeEnum("listing_type").notNull(),
  sellPriceInr: integer("sell_price_inr"),
  dailyRentInr: integer("daily_rent_inr"),
  securityDepositInr: integer("security_deposit_inr"),
  images: jsonb("images").$type<string[]>().default([]).notNull(),
  status: listingStatusEnum("status").default("active").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull()
});

export const insertMarketplaceListingSchema = createInsertSchema(marketplaceListings);
export const selectMarketplaceListingSchema = createSelectSchema(marketplaceListings);

export type MarketplaceListing = typeof marketplaceListings.$inferSelect;
export type NewMarketplaceListing = typeof marketplaceListings.$inferInsert;
