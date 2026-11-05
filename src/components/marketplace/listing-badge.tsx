import { Badge } from "@/components/ui/badge";
import type { ListingType } from "@/types/marketplace";

interface ListingBadgeProps {
  listingType: ListingType;
  sellPriceInr?: number;
  dailyRentInr?: number;
}

export function ListingBadge({ listingType, sellPriceInr, dailyRentInr }: ListingBadgeProps) {
  if (listingType === "both") {
    return (
      <Badge
        variant="secondary"
        className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
      >
        Sell & Lend
      </Badge>
    );
  }

  if (listingType === "lend") {
    return (
      <Badge variant="outline" className="border-blue-300 text-blue-700 dark:text-blue-300">
        Lend {dailyRentInr ? `(₹${dailyRentInr}/day)` : ""}
      </Badge>
    );
  }

  return (
    <Badge variant="default" className="bg-emerald-600 text-white hover:bg-emerald-700">
      Sell {sellPriceInr ? `₹${sellPriceInr}` : ""}
    </Badge>
  );
}
