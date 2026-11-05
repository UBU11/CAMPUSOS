import { BottomNavBar } from "@/components/navigation/bottom-nav-bar";
import { Navbar } from "@/components/navigation/navbar";
import type { Metadata } from "next";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import "./globals.css";

export const metadata: Metadata = {
  title: "CampusOS — Campus Student Marketplace, Internships & Talent",
  description:
    "Campus-exclusive student marketplace, verified internship portal, and student talent pool.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-50">
        <NuqsAdapter>
          <div className="relative flex min-h-screen flex-col">
            <Navbar />
            <div className="flex-1 pb-20 md:pb-8">{children}</div>
            <BottomNavBar />
          </div>
        </NuqsAdapter>
      </body>
    </html>
  );
}
