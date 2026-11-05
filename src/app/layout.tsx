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
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className="min-h-screen bg-slate-50 text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-50"
      >
        <NuqsAdapter>{children}</NuqsAdapter>
      </body>
    </html>
  );
}
