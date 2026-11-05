import type { HeroTrustBadgeItem } from "@/types/hero";
import { CheckCircle2, type LucideIcon, ShieldCheck, Zap } from "lucide-react";

interface ConfiguredTrustBadge extends HeroTrustBadgeItem {
  icon: LucideIcon;
}

const trustItems: ConfiguredTrustBadge[] = [
  {
    icon: ShieldCheck,
    iconColor: "text-emerald-600 dark:text-emerald-400",
    label: "@gecskp.ac.in Verified",
  },
  {
    icon: Zap,
    iconColor: "text-blue-600 dark:text-blue-400",
    label: "Rent in INR Daily",
  },
  {
    icon: CheckCircle2,
    iconColor: "text-purple-600 dark:text-purple-400",
    label: "Zero Platform Fees",
  },
];

export function HeroTrustBadges() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-slate-500 sm:gap-6 dark:text-slate-400">
      {trustItems.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.label}
            className="flex items-center gap-1.5 rounded-full border border-slate-200/60 bg-white/60 px-3 py-1 shadow-2xs backdrop-blur-xs dark:border-slate-800/60 dark:bg-slate-900/60"
          >
            <Icon className={`h-4 w-4 ${item.iconColor}`} />
            <span>{item.label}</span>
          </div>
        );
      })}
    </div>
  );
}
