"use client";

import { Briefcase, GraduationCap, PlusCircle, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function BottomNavBar() {
  const pathname = usePathname();

  const navItems = [
    {
      label: "Marketplace",
      href: "/marketplace",
      icon: ShoppingBag,
      isActive: pathname === "/" || pathname === "/marketplace",
      activeColor: "text-emerald-600 dark:text-emerald-400",
    },
    {
      label: "Internships",
      href: "/internships",
      icon: Briefcase,
      isActive: pathname.startsWith("/internships"),
      activeColor: "text-blue-600 dark:text-blue-400",
    },
    {
      label: "Talent",
      href: "/talent",
      icon: GraduationCap,
      isActive: pathname.startsWith("/talent"),
      activeColor: "text-purple-600 dark:text-purple-400",
    },
    {
      label: "Post Item",
      href: "/sell",
      icon: PlusCircle,
      isActive: pathname === "/sell",
      activeColor: "text-emerald-600 dark:text-emerald-400 font-semibold",
    },
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="fixed bottom-0 left-0 right-0 z-40 block md:hidden border-t border-slate-200/90 bg-white/95 backdrop-blur-md dark:border-slate-800/90 dark:bg-slate-900/95 shadow-lg"
    >
      <div className="grid h-16 grid-cols-4 items-center px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center min-h-[44px] py-1 transition-colors ${
                item.isActive
                  ? item.activeColor
                  : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="mt-1 text-[11px] font-medium tracking-tight leading-none">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
