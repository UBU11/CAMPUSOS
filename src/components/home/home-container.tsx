import { FeaturesSection } from "@/components/home/features/features-section";
import { HeroScrollTransition } from "@/components/home/hero-scroll-transition";
import { FilterBar } from "@/components/marketplace/filter-bar";
import { LiveListingsGrid } from "@/components/marketplace/live-listings-grid";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export function HomeContainer() {
  return (
    <div className="w-full pb-16 sm:pb-24">
      <HeroScrollTransition>
        <div className="relative -mt-6 sm:-mt-10 rounded-t-3xl border-t border-slate-200/80 bg-slate-50/95 px-4 pt-6 pb-12 shadow-2xl backdrop-blur-xs sm:px-6 sm:pt-10 dark:border-slate-800/80 dark:bg-slate-950/95">
          <div className="container mx-auto">
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
                    Browse textbooks, lab tools, and campus rentals with instant URL search
                    filtering.
                  </p>
                </div>

                <Link href="/sell">
                  <Button size="sm" className="gap-1.5 w-full sm:w-auto">
                    Post an Item
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>

              <Suspense
                fallback={<div className="h-10 w-full animate-pulse rounded-md bg-muted" />}
              >
                <FilterBar />
              </Suspense>

              <div className="mt-8">
                <Suspense
                  fallback={<div className="h-48 w-full animate-pulse rounded-md bg-muted" />}
                >
                  <LiveListingsGrid />
                </Suspense>
              </div>
            </section>
          </div>
        </div>
      </HeroScrollTransition>
    </div>
  );
}
