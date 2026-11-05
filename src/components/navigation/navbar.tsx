import { MobileSheetMenu } from "@/components/navigation/mobile-sheet-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/80 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600 font-bold text-white shadow-xs">
              C
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              CampusOS
            </span>
          </Link>

          <Badge variant="outline" className="hidden lg:inline-flex text-xs font-normal">
            GEC SKP Exclusive
          </Badge>

          <nav className="hidden md:flex items-center gap-5 text-sm font-medium text-slate-600 dark:text-slate-300">
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
            <Button variant="outline" size="sm" className="gap-1.5">
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
