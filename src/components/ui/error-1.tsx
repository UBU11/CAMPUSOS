"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import type { ReactNode } from "react";
import { RiHome5Fill } from "react-icons/ri";

export interface ErrorOneAction {
  label: string;
  icon?: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "default" | "outline" | "secondary" | "ghost";
}

export interface ErrorOneProps {
  code?: string;
  title?: string;
  description?: string;
  action?: ErrorOneAction;
  secondaryAction?: ErrorOneAction;
  className?: string;
}

function GradientCode({ code }: { code: string }) {
  return (
    <svg
      viewBox="0 0 800 300"
      className="w-full max-w-[20rem] select-none sm:max-w-md"
      aria-hidden="true"
    >
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        className="fill-primary/20 stroke-primary font-black tracking-tighter"
        style={{ fontSize: "20rem" }}
        strokeWidth="2"
        strokeDasharray="40 20"
      >
        {code}
      </text>
    </svg>
  );
}

function ActionButton({ label, icon, href, onClick, variant = "default" }: ErrorOneAction) {
  const pillClasses =
    "h-10 rounded-full px-6 text-sm font-semibold transition-opacity hover:opacity-90 shadow-[inset_0_2px_4px_0_rgba(255,255,255,0.7),inset_0_-2px_4px_0_rgba(0,0,0,0.2)] dark:shadow-[inset_0_-2px_4px_0_rgba(0,0,0,0.2),inset_0_2px_4px_0_rgba(255,255,255,0.5)] cursor-pointer";

  const content = (
    <>
      <span>{label}</span>
      {icon}
    </>
  );

  if (href) {
    return (
      <Button asChild variant={variant} className={pillClasses}>
        <Link href={href}>{content}</Link>
      </Button>
    );
  }

  return (
    <Button variant={variant} className={pillClasses} onClick={onClick} type="button">
      {content}
    </Button>
  );
}

export const defaultErrorOneAction: ErrorOneAction = {
  label: "Go Back Home",
  href: "/",
  icon: <RiHome5Fill className="ml-1.5 text-base" aria-hidden="true" />,
};

export function ErrorOne({
  code = "404",
  title = "Lost on Campus?",
  description = "This page could not be found on CampusOS.",
  action = defaultErrorOneAction,
  secondaryAction,
  className,
}: ErrorOneProps) {
  return (
    <main
      className={cn(
        "theme-injected bg-background text-foreground relative flex min-h-screen items-center justify-center px-6 py-16",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-10 dark:opacity-20"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 19px, var(--primary) 19px, var(--primary) 20px, transparent 20px, transparent 39px, var(--primary) 39px, var(--primary) 40px),
            repeating-linear-gradient(90deg, transparent, transparent 19px, var(--primary) 19px, var(--primary) 20px, transparent 20px, transparent 39px, var(--primary) 39px, var(--primary) 40px),
            radial-gradient(circle at 20px 20px, var(--primary) 2px, transparent 2px),
            radial-gradient(circle at 40px 40px, var(--primary) 2px, transparent 2px)
          `,
          backgroundSize: "40px 40px, 40px 40px, 40px 40px, 40px 40px",
        }}
      />

      <section
        aria-labelledby="error-title"
        className="z-10 mx-auto flex w-full max-w-lg flex-col items-center text-center"
      >
        <GradientCode code={code} />

        <div className="flex flex-col items-center gap-2">
          <h1 id="error-title" className="text-xl font-bold tracking-tight sm:text-2xl">
            {title}
          </h1>
          <p className="text-muted-foreground mx-auto max-w-xs text-sm leading-relaxed sm:max-w-sm sm:text-base">
            {description}
          </p>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <ActionButton {...action} />
          {secondaryAction && <ActionButton {...secondaryAction} />}
        </div>
      </section>
    </main>
  );
}
