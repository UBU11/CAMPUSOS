"use client";

import LogoIcon from "@/assets/logo-icon";
import { cn } from "@/lib/utils";
import type { Footer11Props } from "@/types/footer";
import Link from "next/link";
import { FaArrowRight, FaArrowUp, FaCircle } from "react-icons/fa6";

export function Footer11({
  badgeText = "GEC SKP Exclusive Campus Network",
  heading = "Empowering student commerce, peer lending, and verified internships across campus.",
  contactLabel = "Campus Lead & Support:",
  contactEmail = "campusos@gecskp.ac.in",
  contactEmailHref = "mailto:campusos@gecskp.ac.in",
  navLinks = [
    { label: "Marketplace", href: "/marketplace" },
    { label: "Internships", href: "/internships" },
    { label: "Talent Pool", href: "/talent" },
    { label: "Post Item", href: "/sell" },
  ],
  brandName = "CampusOS",
  brandLogo,
  accentGlowClassName,
  className,
  onScrollToTop,
}: Footer11Props) {
  const handleScrollToTop = () => {
    if (onScrollToTop) {
      onScrollToTop();
      return;
    }

    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className={cn("w-full overflow-hidden", className)}>
      <div className="relative bg-zinc-950 px-6 pt-8 pb-10 sm:px-10 md:px-16 lg:px-20 border-t border-zinc-800/80">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2">
            <FaCircle className="h-2 w-2 fill-emerald-500" />
            <span className="text-sm sm:text-base font-light text-zinc-100">{badgeText}</span>
          </div>

          <button
            type="button"
            onClick={handleScrollToTop}
            className="group inline-flex items-center gap-1.5 text-sm sm:text-base font-light tracking-wide text-zinc-300 transition-colors duration-200 hover:text-white cursor-pointer"
          >
            <span>Scroll to Top</span>
            <FaArrowUp className="size-3.5 sm:size-4 fill-zinc-300 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:fill-white" />
          </button>
        </div>

        <div className="mt-8 max-w-2xl sm:mt-10 md:mt-12">
          <h2 className="text-2xl leading-snug font-light tracking-tight text-zinc-100 sm:text-3xl md:text-4xl">
            {heading}
          </h2>
        </div>

        <div className="mt-14 flex flex-col gap-8 sm:mt-18 md:mt-22 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-1.5">
            <span className="text-sm sm:text-base font-light tracking-wide text-zinc-400">
              {contactLabel}
            </span>
            <a
              href={contactEmailHref}
              className="group inline-flex items-center gap-2 text-xl sm:text-2xl font-medium text-emerald-400 transition-colors duration-200 hover:text-emerald-300"
            >
              <span>{contactEmail}</span>
              <FaArrowRight className="size-5 sm:size-6 fill-emerald-400 transition-transform duration-200 group-hover:translate-x-1 group-hover:fill-emerald-300" />
            </a>
          </div>

          <nav className="flex flex-wrap items-center gap-5 sm:gap-8 lg:gap-10">
            {navLinks.map((link) => {
              if (link.isExternal) {
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm sm:text-base font-medium text-zinc-300 transition-colors duration-200 hover:text-white"
                  >
                    {link.label}
                  </a>
                );
              }

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm sm:text-base font-medium text-zinc-300 transition-colors duration-200 hover:text-white"
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      <div className="relative bg-zinc-950 px-6 pt-10 pb-12 sm:px-10 md:px-16 lg:px-20 lg:pt-14 lg:pb-16 border-t border-zinc-900">
        <div
          className={cn(
            "pointer-events-none absolute right-0 bottom-0 h-full w-3/4 blur-2xl sm:w-2/3 opacity-70",
            accentGlowClassName,
          )}
        >
          <div className="absolute right-0 bottom-0 h-full w-full bg-gradient-to-tl from-emerald-500/40 via-emerald-800/20 to-transparent" />
          <div className="absolute -right-20 -bottom-20 h-80 w-80 rounded-full bg-emerald-600/30 blur-3xl sm:h-96 sm:w-96" />
          <div className="absolute right-1/4 bottom-0 h-64 w-64 rounded-full bg-emerald-900/20 blur-3xl" />
        </div>

        <div className="relative z-10 flex w-full flex-col items-center justify-center gap-6 overflow-hidden sm:flex-row sm:gap-8">
          <div className="shrink-0">{brandLogo || <LogoIcon className="size-20 lg:size-28" />}</div>

          <svg
            role="img"
            className="h-auto w-full flex-1 select-none"
            viewBox={`0 0 ${Math.max(brandName.length * 80, 360)} 100`}
            preserveAspectRatio="xMidYMid meet"
            aria-label={brandName}
          >
            <text
              x="0%"
              y="90%"
              dominantBaseline="alphabetic"
              textAnchor="start"
              textLength="100%"
              lengthAdjust="spacing"
              className="fill-white/15 font-sans font-black tracking-tight"
              fontSize="120"
            >
              {brandName}
            </text>
          </svg>
        </div>
      </div>
    </footer>
  );
}
