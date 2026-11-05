import { ListingBadge } from "@/components/marketplace/listing-badge";
import { Card, CardContent } from "@/components/ui/card";
import type { MarketplaceListing } from "@/types/marketplace";
import { BookOpen, Cpu, ShoppingBag } from "lucide-react";

interface ItemCardProps {
  listing: MarketplaceListing;
}

export function ItemCard({ listing }: ItemCardProps) {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "textbook":
        return <BookOpen className="h-8 w-8" />;
      case "electronics":
      case "lab_equipment":
        return <Cpu className="h-8 w-8" />;
      default:
        return <ShoppingBag className="h-8 w-8" />;
    }
  };

  const formattedCondition =
    listing.condition === "like_new" ? "Like New" : listing.condition === "good" ? "Good" : "Fair";

  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md border-slate-200 dark:border-slate-800">
      <div className="relative aspect-video w-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500">
        {listing.imageUrl ? (
          <img
            src={listing.imageUrl}
            alt={listing.title}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          getCategoryIcon(listing.category)
        )}
      </div>

      <CardContent className="p-4 sm:p-5">
        <div className="flex items-center justify-between gap-2">
          <ListingBadge
            listingType={listing.listingType}
            sellPriceInr={listing.sellPriceInr}
            dailyRentInr={listing.dailyRentInr}
          />

          <div className="text-right">
            {listing.listingType === "lend" && listing.dailyRentInr ? (
              <span className="font-bold text-slate-900 dark:text-white">
                ₹{listing.dailyRentInr}
                <span className="text-xs font-normal text-slate-500"> /day</span>
              </span>
            ) : listing.sellPriceInr ? (
              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                ₹{listing.sellPriceInr}
              </span>
            ) : null}
          </div>
        </div>

        <h3 className="mt-3 font-semibold text-slate-900 line-clamp-1 dark:text-white text-base">
          {listing.title}
        </h3>

        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
          {listing.description}
        </p>

        <div className="mt-4 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 border-t border-slate-100 pt-3 dark:border-slate-800">
          <span>{listing.department}</span>
          <span className="font-medium text-slate-700 dark:text-slate-300">
            {formattedCondition}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
