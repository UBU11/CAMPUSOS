"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Briefcase,
  ChevronRight,
  GraduationCap,
  HelpCircle,
  LogIn,
  Menu,
  PlusCircle,
  ShoppingBag,
} from "lucide-react";
import Link from "next/link";
import * as React from "react";

export function MobileSheetMenu() {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white p-2 text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 md:hidden cursor-pointer"
        aria-label="Open Mobile Navigation"
      >
        <Menu className="h-5 w-5" />
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[300px] sm:w-[360px] flex flex-col justify-between bg-white dark:bg-slate-900 shadow-2xl"
      >
        <div className="space-y-4">
          <SheetHeader className="mb-2">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600 font-bold text-white text-base shadow-xs">
                C
              </div>
              <div>
                <SheetTitle className="text-xl font-bold">CampusOS</SheetTitle>
                <SheetDescription className="text-xs">
                  Exclusive for GEC Sreekrishnapuram
                </SheetDescription>
              </div>
            </div>
            <div className="pt-2">
              <Badge
                variant="outline"
                className="bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800"
              >
                Verified Students & Faculty
              </Badge>
            </div>
          </SheetHeader>

          <Separator />

          <nav className="flex flex-col space-y-2">
            <Link
              href="/marketplace"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between rounded-xl border border-slate-200/90 bg-slate-50 px-3.5 py-3 text-sm font-semibold text-slate-900 hover:border-emerald-300 hover:bg-emerald-50/50 dark:border-slate-800 dark:bg-slate-800/80 dark:text-slate-100 dark:hover:border-emerald-800 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                  <ShoppingBag className="h-4 w-4" />
                </div>
                <span>Marketplace</span>
              </div>
              <ChevronRight className="h-4 w-4 text-slate-400" />
            </Link>

            <Link
              href="/internships"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between rounded-xl border border-slate-200/90 bg-slate-50 px-3.5 py-3 text-sm font-semibold text-slate-900 hover:border-blue-300 hover:bg-blue-50/50 dark:border-slate-800 dark:bg-slate-800/80 dark:text-slate-100 dark:hover:border-blue-800 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                  <Briefcase className="h-4 w-4" />
                </div>
                <span>Internship Portal</span>
              </div>
              <ChevronRight className="h-4 w-4 text-slate-400" />
            </Link>

            <Link
              href="/talent"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between rounded-xl border border-slate-200/90 bg-slate-50 px-3.5 py-3 text-sm font-semibold text-slate-900 hover:border-purple-300 hover:bg-purple-50/50 dark:border-slate-800 dark:bg-slate-800/80 dark:text-slate-100 dark:hover:border-purple-800 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
                  <GraduationCap className="h-4 w-4" />
                </div>
                <span>Talent Directory</span>
              </div>
              <ChevronRight className="h-4 w-4 text-slate-400" />
            </Link>

            <Separator className="my-1" />

            <Link
              href="/sell"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between rounded-xl border border-emerald-300/80 bg-emerald-50 px-3.5 py-3 text-sm font-semibold text-emerald-800 hover:bg-emerald-100 dark:border-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white">
                  <PlusCircle className="h-4 w-4" />
                </div>
                <span>Post an Item (Sell / Lend)</span>
              </div>
              <ChevronRight className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            </Link>

            <Link
              href="/guidelines"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
            >
              <HelpCircle className="h-3.5 w-3.5" />
              <span>Campus Safety & Lending Terms</span>
            </Link>
          </nav>
        </div>

        <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
          <Link href="/auth" onClick={() => setOpen(false)} className="w-full block">
            <Button className="w-full justify-center gap-2 shadow-xs">
              <LogIn className="h-4 w-4" />
              College Sign In
            </Button>
          </Link>
          <p className="mt-2 text-center text-xs text-slate-500">
            Sign in with @gecskp.ac.in Google Account
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
