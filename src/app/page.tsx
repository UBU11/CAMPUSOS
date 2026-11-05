import { ArrowRight, Briefcase, GraduationCap, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { MarketplaceFilter } from "@/components/marketplace-filter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <header className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600 text-white font-bold">
              C
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              CampusOS
            </span>
            <Badge variant="outline" className="hidden sm:inline-flex">
              GEC SKP Exclusive
            </Badge>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/auth">
              <Button size="sm">College Sign In</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 sm:px-6">
        <section className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
            The Operating System for Campus Life
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
            Buy, sell, and lend campus essentials, discover verified internships,
            and showcase your student talent within your verified college community.
          </p>
        </section>

        <section className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <Card>
            <CardHeader>
              <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                <ShoppingBag className="h-5 w-5" />
              </div>
              <CardTitle>Marketplace</CardTitle>
              <CardDescription>
                Buy, sell, or rent textbooks, lab kits, calculators, and cycles from peers in INR.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                <Briefcase className="h-5 w-5" />
              </div>
              <CardTitle>Internship Portal</CardTitle>
              <CardDescription>
                Explore opportunities from verified industry partners curated specifically for students.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
                <GraduationCap className="h-5 w-5" />
              </div>
              <CardTitle>Talent Directory</CardTitle>
              <CardDescription>
                Showcase student skills, projects, and portfolio to recruiters and campus teams.
              </CardDescription>
            </CardHeader>
          </Card>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                Live Listings
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Browse verified campus listings with instant URL search filtering.
              </p>
            </div>
            <Link href="/sell">
              <Button size="sm">
                Post an Item
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <MarketplaceFilter />

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="overflow-hidden">
              <div className="aspect-video w-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                <ShoppingBag className="h-8 w-8" />
              </div>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">Sell & Lend</Badge>
                  <span className="font-semibold text-emerald-600">₹850</span>
                </div>
                <h4 className="mt-2 font-medium text-slate-900 dark:text-white">
                  Engineering Drawing Instrument Box
                </h4>
                <p className="mt-1 text-xs text-slate-500">Mechanical Dept • Like New</p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="aspect-video w-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                <ShoppingBag className="h-8 w-8" />
              </div>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <Badge variant="outline">Lend (₹30/day)</Badge>
                  <span className="font-semibold text-emerald-600">₹30 / day</span>
                </div>
                <h4 className="mt-2 font-medium text-slate-900 dark:text-white">
                  Casio FX-991EX Scientific Calculator
                </h4>
                <p className="mt-1 text-xs text-slate-500">ECE Dept • Deposit ₹500</p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="aspect-video w-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                <ShoppingBag className="h-8 w-8" />
              </div>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <Badge variant="default">Sell</Badge>
                  <span className="font-semibold text-emerald-600">₹400</span>
                </div>
                <h4 className="mt-2 font-medium text-slate-900 dark:text-white">
                  Discrete Mathematical Structures Textbook
                </h4>
                <p className="mt-1 text-xs text-slate-500">CSE Dept • S3 Curriculum</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </main>
  );
}
