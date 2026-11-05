"use client";

import { MobileSheetMenu } from "@/components/navigation/mobile-sheet-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isTransparent = isHome && !isScrolled;

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-colors duration-200",
        isTransparent
          ? "border-b border-transparent bg-transparent"
          : "border-b border-slate-200/60 bg-white/85 backdrop-blur-md shadow-2xs dark:border-slate-800/60 dark:bg-slate-950/85",
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              CampusOS
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-5 text-sm font-medium text-slate-700 dark:text-slate-200">
            <Link
              href="/marketplace"
              className="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400"
            >
              Marketplace
            </Link>
            <Link
              href="/internships"
              className="transition-colors hover:text-blue-600 dark:hover:text-blue-400"
            >
              Internships
            </Link>
            <Link
              href="/talent"
              className="transition-colors hover:text-purple-600 dark:hover:text-purple-400"
            >
              Talent Directory
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link href="/sell" className="hidden sm:inline-flex">
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5 border-slate-300 bg-white/90 text-slate-800 hover:bg-slate-100 hover:border-slate-400 dark:border-slate-700 dark:bg-slate-900/90 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <PlusCircle className="h-4 w-4 text-emerald-600" />
              Post Listing
            </Button>
          </Link>

          <Link href="/auth">
            <Button size="sm">College Sign In</Button>
          </Link>

          <MobileSheetMenu />
        </div>
      </div>
    </header>
  );
}
