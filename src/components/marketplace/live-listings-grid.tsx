"use client";

import { ItemCard } from "@/components/marketplace/item-card";
import type { MarketplaceListing } from "@/types/marketplace";
import { PackageOpen } from "lucide-react";
import { useQueryState } from "nuqs";

const SAMPLE_LISTINGS: MarketplaceListing[] = [
  {
    id: "item-1",
    title: "Engineering Drawing Instrument Box",
    description: "Complete mini drafter, compass set, set squares, and roll-n-draw in good case.",
    department: "Mechanical Dept",
    category: "lab_equipment",
    listingType: "both",
    sellPriceInr: 850,
    dailyRentInr: 25,
    securityDepositInr: 500,
    condition: "like_new",
    postedAt: "2 hours ago",
    sellerName: "Rahul K.",
  },
  {
    id: "item-2",
    title: "Casio FX-991EX ClassWiz Calculator",
    description: "Non-programmable scientific calculator with spreadsheet mode. Ideal for exams.",
    department: "ECE Dept",
    category: "electronics",
    listingType: "lend",
    dailyRentInr: 30,
    securityDepositInr: 600,
    condition: "like_new",
    postedAt: "5 hours ago",
    sellerName: "Ananya M.",
  },
  {
    id: "item-3",
    title: "Discrete Mathematical Structures (Rosen)",
    description: "Standard KTU S3 CSE curriculum reference book. Clean margins, no markings.",
    department: "CSE Dept",
    category: "textbook",
    listingType: "sell",
    sellPriceInr: 450,
    condition: "good",
    postedAt: "Yesterday",
    sellerName: "Aditya S.",
  },
  {
    id: "item-4",
    title: "Hercules Geared Cycle (Single Suspension)",
    description: "Daily campus commuter cycle. New rear tube, front basket included.",
    department: "EEE Dept",
    category: "cycle",
    listingType: "sell",
    sellPriceInr: 2800,
    condition: "good",
    postedAt: "2 days ago",
    sellerName: "Vishnu P.",
  },
  {
    id: "item-5",
    title: "Digital Multimeter + Breadboard Kit",
    description: "Includes probes, 9V battery, and 830-point solderless breadboard for lab work.",
    department: "ECE Dept",
    category: "lab_equipment",
    listingType: "both",
    sellPriceInr: 350,
    dailyRentInr: 15,
    securityDepositInr: 200,
    condition: "like_new",
    postedAt: "3 days ago",
    sellerName: "Sneha R.",
  },
  {
    id: "item-6",
    title: "Design and Analysis of Algorithms (Cormen)",
    description: "CLRS 3rd Edition. Essential reference for CS core subjects and placements.",
    department: "CSE Dept",
    category: "textbook",
    listingType: "lend",
    dailyRentInr: 20,
    securityDepositInr: 400,
    condition: "fair",
    postedAt: "4 days ago",
    sellerName: "Farhan M.",
  },
];

export function LiveListingsGrid() {
  const [query] = useQueryState("q", { defaultValue: "" });
  const [category] = useQueryState("category", { defaultValue: "all" });
  const [listingType] = useQueryState("type", { defaultValue: "all" });

  const filteredListings = SAMPLE_LISTINGS.filter((item) => {
    if (query && !item.title.toLowerCase().includes(query.toLowerCase())) {
      return false;
    }
    if (category && category !== "all" && item.category !== category) {
      return false;
    }
    if (listingType && listingType !== "all") {
      if (listingType === "sell" && item.listingType !== "sell" && item.listingType !== "both") {
        return false;
      }
      if (listingType === "lend" && item.listingType !== "lend" && item.listingType !== "both") {
        return false;
      }
    }
    return true;
  });

  if (filteredListings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 py-12 text-center dark:border-slate-800">
        <PackageOpen className="h-10 w-10 text-slate-400" />
        <h4 className="mt-3 font-semibold text-slate-900 dark:text-slate-100">
          No listings match your search
        </h4>
        <p className="mt-1 text-sm text-slate-500 max-w-sm">
          Try clearing some filters or searching for different campus essentials.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {filteredListings.map((listing) => (
        <ItemCard key={listing.id} listing={listing} />
      ))}
    </div>
  );
}
