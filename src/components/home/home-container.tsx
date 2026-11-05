import { FeaturesSection } from "@/components/home/features/features-section";
import { HeroSection } from "@/components/home/hero-section";
import { FilterBar } from "@/components/marketplace/filter-bar";
import { LiveListingsGrid } from "@/components/marketplace/live-listings-grid";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function HomeContainer() {
  return (
    <div className="w-full pb-16 sm:pb-24">
      <HeroSection />

      <div className="container mx-auto mt-6 px-4 sm:px-6">
        <FeaturesSection />

        <section className="mt-6 rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-8 shadow-xs dark:border-slate-800/90 dark:bg-slate-900">
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                  Live Campus Listings
                </h2>
                <span className="inline-flex items-center rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                  Active Feed
                </span>
              </div>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Browse textbooks, lab tools, and campus rentals with instant URL search filtering.
              </p>
            </div>

            <Link href="/sell">
              <Button size="sm" className="gap-1.5 w-full sm:w-auto">
                Post an Item
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <FilterBar />

          <div className="mt-8">
            <LiveListingsGrid />
          </div>
        </section>
      </div>
    </div>
  );
}
