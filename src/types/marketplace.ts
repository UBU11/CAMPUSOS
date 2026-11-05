export type ListingType = "sell" | "lend" | "both";

export type MarketplaceCategory =
  | "all"
  | "textbook"
  | "electronics"
  | "lab_equipment"
  | "cycle"
  | "other";

export interface MarketplaceListing {
  id: string;
  title: string;
  description: string;
  department: string;
  category: MarketplaceCategory;
  listingType: ListingType;
  sellPriceInr?: number;
  dailyRentInr?: number;
  securityDepositInr?: number;
  imageUrl?: string;
  condition: "like_new" | "good" | "fair";
  postedAt: string;
  sellerName: string;
}
