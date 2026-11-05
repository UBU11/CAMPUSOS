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
      <SheetContent side="right" className="w-[300px] sm:w-[360px] flex flex-col justify-between">
        <div>
          <SheetHeader className="mb-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-emerald-600 font-bold text-white text-sm">
                C
              </div>
              <SheetTitle className="text-xl">CampusOS</SheetTitle>
            </div>
            <SheetDescription>Campus-exclusive portal for GEC SKP</SheetDescription>
            <div className="pt-1">
              <Badge variant="outline" className="text-emerald-700 dark:text-emerald-300">
                Verified Students & Faculty
              </Badge>
            </div>
          </SheetHeader>

          <Separator className="my-4" />

          <nav className="flex flex-col space-y-1">
            <Link
              href="/marketplace"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-800 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <ShoppingBag className="h-4 w-4 text-emerald-600" />
              Marketplace
            </Link>

            <Link
              href="/internships"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-800 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <Briefcase className="h-4 w-4 text-blue-600" />
              Internship Portal
            </Link>

            <Link
              href="/talent"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-800 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <GraduationCap className="h-4 w-4 text-purple-600" />
              Talent Directory
            </Link>

            <Separator className="my-2" />

            <Link
              href="/sell"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-300 dark:hover:bg-emerald-950/70"
            >
              <PlusCircle className="h-4 w-4 text-emerald-600" />
              Post an Item (Sell / Lend)
            </Link>

            <Link
              href="/guidelines"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
            >
              <HelpCircle className="h-4 w-4" />
              Safety & Lending Terms
            </Link>
          </nav>
        </div>

        <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
          <Link href="/auth" onClick={() => setOpen(false)} className="w-full">
            <Button className="w-full justify-center gap-2">
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
