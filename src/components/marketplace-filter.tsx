"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQueryState } from "nuqs";

const CATEGORIES = [
  "All",
  "Textbooks",
  "Lab Equipment",
  "Electronics",
  "Calculators",
  "Bicycles",
  "Stationery",
] as const;

export function MarketplaceFilter() {
  const [search, setSearch] = useQueryState("search", {
    defaultValue: "",
    shallow: false,
  });
  const [category, setCategory] = useQueryState("category", {
    defaultValue: "All",
    shallow: false,
  });
  const [listingType, setListingType] = useQueryState("listingType", {
    defaultValue: "all",
    shallow: false,
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          placeholder="Search listings..."
          value={search}
          onChange={(event) => setSearch(event.target.value || null)}
          className="max-w-md"
        />
        <div className="flex gap-2">
          {(["all", "sell", "lend", "both"] as const).map((type) => (
            <Button
              key={type}
              variant={listingType === type ? "default" : "outline"}
              size="sm"
              onClick={() => setListingType(type === "all" ? null : type)}
            >
              {type.toUpperCase()}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <Button
            key={cat}
            variant={category === cat ? "default" : "secondary"}
            size="sm"
            onClick={() => setCategory(cat === "All" ? null : cat)}
          >
            {cat}
          </Button>
        ))}
      </div>
    </div>
  );
}
