"use server";

import { db } from "@/db";
import { insertMarketplaceListingSchema, marketplaceListings } from "@/db/schema/marketplace";
import { authenticatedActionClient } from "@/lib/safe-action";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const createListingInputSchema = insertMarketplaceListingSchema
  .omit({
    id: true,
    sellerId: true,
    createdAt: true,
    updatedAt: true,
  })
  .refine(
    (data) => {
      if (data.listingType === "sell" || data.listingType === "both") {
        return typeof data.sellPriceInr === "number" && data.sellPriceInr > 0;
      }
      return true;
    },
    {
      message: "Sale price in INR is required for sell or both listing types",
      path: ["sellPriceInr"],
    },
  )
  .refine(
    (data) => {
      if (data.listingType === "lend" || data.listingType === "both") {
        return typeof data.dailyRentInr === "number" && data.dailyRentInr > 0;
      }
      return true;
    },
    {
      message: "Daily rent in INR is required for lend or both listing types",
      path: ["dailyRentInr"],
    },
  );

export const createMarketplaceListingAction = authenticatedActionClient
  .schema(createListingInputSchema)
  .action(async ({ parsedInput, ctx }) => {
    const [listing] = await db
      .insert(marketplaceListings)
      .values({
        ...parsedInput,
        sellerId: ctx.user.id,
      })
      .returning();

    revalidatePath("/marketplace");
    revalidatePath("/");

    return { listing };
  });

const updateStatusInputSchema = z.object({
  listingId: z.string().uuid(),
  status: z.enum(["active", "sold", "rented", "archived"]),
});

export const updateMarketplaceListingStatusAction = authenticatedActionClient
  .schema(updateStatusInputSchema)
  .action(async ({ parsedInput, ctx }) => {
    const [updated] = await db
      .update(marketplaceListings)
      .set({
        status: parsedInput.status,
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(marketplaceListings.id, parsedInput.listingId),
          eq(marketplaceListings.sellerId, ctx.user.id),
        ),
      )
      .returning();

    if (!updated) {
      throw new Error("Listing not found or you are not authorized to update it");
    }

    revalidatePath("/marketplace");
    revalidatePath("/");

    return { listing: updated };
  });
