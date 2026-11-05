import { cn } from "@/lib/utils";
import type * as React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variantStyles = {
    default: "border-transparent bg-emerald-600 text-white shadow hover:bg-emerald-700",
    secondary:
      "border-transparent bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100",
    destructive: "border-transparent bg-red-500 text-white shadow hover:bg-red-600",
    outline: "text-slate-950 dark:text-slate-50 border-slate-200 dark:border-slate-800",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        variantStyles[variant],
        className,
      )}
      {...props}
    />
  );
}

export { Badge };
