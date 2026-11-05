"use client";

import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { MarketplaceCategory } from "@/types/marketplace";
import { Search } from "lucide-react";
import { useQueryState } from "nuqs";

const CATEGORIES: { label: string; value: MarketplaceCategory }[] = [
  { label: "All Items", value: "all" },
  { label: "Textbooks", value: "textbook" },
  { label: "Electronics", value: "electronics" },
  { label: "Lab Kits", value: "lab_equipment" },
  { label: "Cycles", value: "cycle" },
  { label: "Other", value: "other" },
];

export function FilterBar() {
  const [query, setQuery] = useQueryState("q", { defaultValue: "" });
  const [category, setCategory] = useQueryState("category", { defaultValue: "all" });
  const [listingType, setListingType] = useQueryState("type", { defaultValue: "all" });

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value || null)}
            placeholder="Search textbooks, calculators, mini drafters, cycles..."
            className="pl-9 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <button
            type="button"
            onClick={() => setListingType("all")}
            className={`rounded-md px-3 py-1.5 text-xs font-medium cursor-pointer transition-colors ${
              listingType === "all"
                ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400"
            }`}
          >
            All Types
          </button>
          <button
            type="button"
            onClick={() => setListingType("sell")}
            className={`rounded-md px-3 py-1.5 text-xs font-medium cursor-pointer transition-colors ${
              listingType === "sell"
                ? "bg-emerald-600 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400"
            }`}
          >
            Sell Only
          </button>
          <button
            type="button"
            onClick={() => setListingType("lend")}
            className={`rounded-md px-3 py-1.5 text-xs font-medium cursor-pointer transition-colors ${
              listingType === "lend"
                ? "bg-blue-600 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400"
            }`}
          >
            Lend / Rent
          </button>
        </div>
      </div>

      <Tabs value={category} onValueChange={(val) => setCategory(val === "all" ? null : val)}>
        <TabsList className="w-full justify-start overflow-x-auto py-1">
          {CATEGORIES.map((cat) => (
            <TabsTrigger key={cat.value} value={cat.value}>
              {cat.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
}
