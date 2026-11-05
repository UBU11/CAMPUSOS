import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-8 sm:py-14 text-center">
      <div className="mx-auto flex max-w-3xl flex-col items-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50/80 px-3.5 py-1 text-xs font-medium text-emerald-800 dark:border-emerald-800/60 dark:bg-emerald-950/40 dark:text-emerald-300">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          GEC SKP Exclusive Campus Network
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white">
          The Operating System for <span className="text-emerald-600">Campus Life</span>
        </h1>

        <p className="mt-4 max-w-2xl text-base text-slate-600 sm:text-lg dark:text-slate-300">
          Buy, sell, and lend campus essentials, discover verified internships, and showcase your
          student talent within your verified college community.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link href="/marketplace">
            <Button size="lg" className="gap-2 shadow-sm">
              Explore Marketplace
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/sell">
            <Button variant="outline" size="lg">
              Post an Item
            </Button>
          </Link>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-slate-500 sm:gap-6 dark:text-slate-400">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span>@gecskp.ac.in Verified</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Zap className="h-4 w-4 text-blue-600" />
            <span>Rent in INR Daily</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-purple-600" />
            <span>Zero Platform Fees</span>
          </div>
        </div>
      </div>
    </section>
  );
}
