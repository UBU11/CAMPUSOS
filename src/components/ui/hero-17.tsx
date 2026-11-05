"use client";

import {
  heroDriftUpVariants,
  heroImageVariants,
  heroNavDropVariants,
  heroSectionVariants,
  heroStaggerWordsVariants,
} from "@/components/ui/hero-17-motion";
import { cn } from "@/lib/utils";
import type { Hero17Props, HeroNavLink } from "@/types/hero";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

const defaultNavLinks: HeroNavLink[] = [
  { label: "Marketplace", href: "/marketplace" },
  { label: "Internships", href: "/internships" },
  { label: "Talent Directory", href: "/talent" },
];

function toWordTokens(text: string, prefix: string) {
  return text.split(" ").map((word, index) => ({
    key: `${prefix}-${word}-${index}`,
    word,
  }));
}

export function Hero17({
  brandName = "CampusOS",
  navLinks = defaultNavLinks,
  showNav = false,
  eyebrow = "GEC SKP Exclusive Campus Network",
  headingLine1Prefix = "The Operating System for",
  headingHighlight = "Campus Life",
  headingLine2 = "Buy, Sell & Lend Essentials",
  description = "Buy, sell, and lend campus essentials, discover verified internships, and showcase your student talent within your verified college community.",
  primaryCtaLabel = "Explore Marketplace",
  primaryCtaHref = "/marketplace",
  secondaryCtaLabel = "Post an Item",
  secondaryCtaHref = "/sell",
  loginLabel = "College Sign In",
  loginHref = "/auth",
  signupLabel = "Get Started",
  signupHref = "/auth",
  backgroundImage = "https://assets.watermelon.sh/hero-17-bg.avif",
  className,
  children,
}: Hero17Props) {
  const line1Tokens = toWordTokens(headingLine1Prefix, "line1");
  const line2Tokens = toWordTokens(headingLine2, "line2");

  return (
    <section
      className={cn(
        "relative isolate min-h-[600px] sm:min-h-[720px] w-full overflow-hidden text-slate-950 antialiased dark:text-white",
        className,
      )}
    >
      <motion.div
        className="relative flex h-full min-h-[600px] sm:min-h-[720px] w-full flex-col overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={heroSectionVariants}
      >
        <motion.img
          variants={heroImageVariants}
          src={backgroundImage}
          alt="Campus backdrop"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/60 dark:from-slate-950/60 dark:via-transparent dark:to-slate-950/70" />

        {showNav && (
          <motion.nav
            variants={heroNavDropVariants}
            className="relative z-10 mx-auto flex min-h-14 w-full max-w-7xl items-center justify-between px-6 py-3 sm:px-10 lg:px-16"
          >
            <Link
              href="/"
              className="inline-flex min-h-10 items-center text-xl font-bold tracking-tight text-slate-900 transition-opacity hover:opacity-80 active:scale-95 dark:text-white"
            >
              {brandName}
            </Link>

            <div className="hidden items-center gap-8 md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="inline-flex min-h-10 items-center text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 active:scale-95 dark:text-slate-300 dark:hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <Link
                href={loginHref}
                className="hidden min-h-9 items-center text-sm font-medium text-slate-700 transition-colors hover:text-slate-900 active:scale-95 sm:inline-flex dark:text-slate-300 dark:hover:text-white"
              >
                {loginLabel}
              </Link>
              <Link
                href={signupHref}
                className="inline-flex min-h-9 items-center justify-center rounded-lg bg-emerald-600 px-4 text-sm font-medium text-white shadow-xs transition-transform hover:bg-emerald-700 active:scale-95"
              >
                {signupLabel}
              </Link>
            </div>
          </motion.nav>
        )}

        <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col items-center px-6 pt-12 pb-12 text-center sm:px-10 sm:pt-16 lg:px-16">
          <motion.div
            variants={heroDriftUpVariants}
            className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50/90 px-3.5 py-1 text-xs font-semibold text-emerald-800 shadow-xs backdrop-blur-md dark:border-emerald-800/60 dark:bg-emerald-950/50 dark:text-emerald-300"
          >
            {eyebrow}
          </motion.div>

          <motion.h1
            variants={heroStaggerWordsVariants}
            className="mt-6 max-w-4xl text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white"
          >
            <span className="block">
              {line1Tokens.map((token) => (
                <motion.span
                  key={token.key}
                  variants={heroDriftUpVariants}
                  className="mr-[0.25em] inline-block"
                >
                  {token.word}
                </motion.span>
              ))}
              <motion.span
                variants={heroDriftUpVariants}
                className="inline-block text-emerald-600 dark:text-emerald-400"
              >
                {headingHighlight}
              </motion.span>
            </span>
            <span className="mt-2 block">
              {line2Tokens.map((token) => (
                <motion.span
                  key={token.key}
                  variants={heroDriftUpVariants}
                  className="mr-[0.25em] inline-block"
                >
                  {token.word}
                </motion.span>
              ))}
            </span>
          </motion.h1>

          <motion.p
            variants={heroDriftUpVariants}
            className="mt-5 max-w-2xl text-base text-slate-600 sm:text-lg dark:text-slate-300"
          >
            {description}
          </motion.p>

          <motion.div
            variants={heroDriftUpVariants}
            className="mt-8 flex flex-wrap items-center justify-center gap-3.5"
          >
            <Link
              href={primaryCtaHref}
              className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-emerald-600 px-6 text-sm font-semibold text-white shadow-sm transition-all hover:bg-emerald-700 active:scale-95"
            >
              {primaryCtaLabel}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href={secondaryCtaHref}
              className="inline-flex min-h-11 items-center justify-center rounded-lg border border-slate-300 bg-white/80 px-6 text-sm font-semibold text-slate-800 shadow-xs backdrop-blur-xs transition-all hover:bg-slate-100 active:scale-95 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              {secondaryCtaLabel}
            </Link>
          </motion.div>

          {children && (
            <motion.div variants={heroDriftUpVariants} className="mt-8 w-full">
              {children}
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
