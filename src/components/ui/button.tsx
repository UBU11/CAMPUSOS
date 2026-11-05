import { cn } from "@/lib/utils";
import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 cursor-pointer";

    const variantStyles = {
      default:
        "bg-primary text-primary-foreground hover:bg-primary/90 bg-emerald-600 text-white hover:bg-emerald-700",
      destructive: "bg-red-600 text-white hover:bg-red-700",
      outline:
        "border border-input bg-background hover:bg-accent hover:text-accent-foreground border-slate-300 dark:border-slate-700",
      secondary:
        "bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100",
      ghost:
        "hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-100",
      link: "text-emerald-600 underline-offset-4 hover:underline",
    };

    const sizeStyles = {
      default: "h-9 px-4 py-2",
      sm: "h-8 rounded-md px-3 text-xs",
      lg: "h-10 rounded-md px-8 text-base",
      icon: "h-9 w-9",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button };
