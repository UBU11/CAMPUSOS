import { db } from "@/db";
import { marketplaceListings } from "@/db/schema/marketplace";
import { zValidator } from "@hono/zod-validator";
import { and, desc, eq, ilike, or } from "drizzle-orm";
import { Hono } from "hono";
import { z } from "zod";
import type { HonoEnv } from "../context";
import { requireAuth, requireStudent } from "../middleware/auth";

const listQuerySchema = z.object({
  category: z.string().optional(),
  listingType: z.enum(["sell", "lend", "both"]).optional(),
  search: z.string().optional(),
  limit: z.coerce.number().min(1).max(50).default(20),
});

const createListingSchema = z
  .object({
    title: z.string().min(3).max(120),
    description: z.string().min(10).max(2000),
    category: z.string().min(2).max(50),
    listingType: z.enum(["sell", "lend", "both"]),
    sellPriceInr: z.number().int().positive().optional(),
    dailyRentInr: z.number().int().positive().optional(),
    securityDepositInr: z.number().int().nonnegative().default(0),
    images: z.array(z.string().url()).min(1).max(5),
  })
  .refine(
    (data) => {
      if (data.listingType === "sell" || data.listingType === "both") {
        return typeof data.sellPriceInr === "number";
      }
      return true;
    },
    {
      message: "Sale price is required for sell or both listing types",
      path: ["sellPriceInr"],
    },
  )
  .refine(
    (data) => {
      if (data.listingType === "lend" || data.listingType === "both") {
        return typeof data.dailyRentInr === "number";
      }
      return true;
    },
    {
      message: "Daily rent is required for lend or both listing types",
      path: ["dailyRentInr"],
    },
  );

const verifyQrParamSchema = z.object({
  id: z.string().uuid(),
});

const verifyQrBodySchema = z.object({
  qrToken: z.string().min(6),
  targetStatus: z.enum(["sold", "rented"]),
});

export const marketplaceRoutes = new Hono<HonoEnv>()
  .get("/", zValidator("query", listQuerySchema), async (c) => {
    const { category, listingType, search, limit } = c.req.valid("query");

    const conditions = [eq(marketplaceListings.status, "active")];

    if (category && category !== "All") {
      conditions.push(eq(marketplaceListings.category, category));
    }

    if (listingType) {
      conditions.push(eq(marketplaceListings.listingType, listingType));
    }

    if (search) {
      const searchFilter = or(
        ilike(marketplaceListings.title, `%${search}%`),
        ilike(marketplaceListings.description, `%${search}%`),
      );
      if (searchFilter) {
        conditions.push(searchFilter);
      }
    }

    const items = await db
      .select()
      .from(marketplaceListings)
      .where(and(...conditions))
      .orderBy(desc(marketplaceListings.createdAt))
      .limit(limit);

    return c.json({ items }, 200);
  })
  .post("/", requireStudent, zValidator("json", createListingSchema), async (c) => {
    const input = c.req.valid("json");
    const user = c.get("user");

    const [created] = await db
      .insert(marketplaceListings)
      .values({
        ...input,
        sellerId: user.id,
      })
      .returning();

    return c.json({ listing: created }, 201);
  })
  .post(
    "/:id/verify-qr",
    requireAuth,
    zValidator("param", verifyQrParamSchema),
    zValidator("json", verifyQrBodySchema),
    async (c) => {
      const { id } = c.req.valid("param");
      const { targetStatus } = c.req.valid("json");
      const user = c.get("user");

      const [listing] = await db
        .select()
        .from(marketplaceListings)
        .where(eq(marketplaceListings.id, id))
        .limit(1);

      if (!listing) {
        return c.json({ error: "Marketplace listing not found" }, 404);
      }

      if (listing.sellerId === user.id) {
        return c.json({ error: "Seller cannot perform buyer QR handover confirmation" }, 400);
      }

      const [updated] = await db
        .update(marketplaceListings)
        .set({
          status: targetStatus,
          updatedAt: new Date(),
        })
        .where(eq(marketplaceListings.id, id))
        .returning();

      return c.json({ success: true, listing: updated }, 200);
    },
  );
