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
import defaultHeroMobile from "@assets/images/hero-mobile.png";
import defaultHeroDesktop from "@assets/images/hero.png";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
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
  description = "Buy, sell and lend campus essentials, discover verified internships and showcase your student talent within your verified college community",
  primaryCtaLabel = "Explore Marketplace",
  primaryCtaHref = "/marketplace",
  secondaryCtaLabel = "Post an Item",
  secondaryCtaHref = "/sell",
  loginLabel = "College Sign In",
  loginHref = "/auth",
  signupLabel = "Get Started",
  signupHref = "/auth",
  backgroundImage = defaultHeroDesktop,
  mobileBackgroundImage = defaultHeroMobile,
  className,
  children,
  backgroundRef,
  contentRef,
  vignetteRef,
}: Hero17Props) {
  const line1Tokens = toWordTokens(headingLine1Prefix, "line1");
  const line2Tokens = toWordTokens(headingLine2, "line2");

  return (
    <section
      className={cn(
        "relative isolate min-h-[580px] sm:min-h-[760px] w-full overflow-hidden text-slate-950 antialiased dark:text-white",
        className,
      )}
    >
      <motion.div
        className="relative flex h-full min-h-[580px] sm:min-h-[760px] w-full flex-col overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={heroSectionVariants}
      >
        {/* Background Images with crisp responsive switching */}
        <div
          ref={backgroundRef}
          className="absolute -top-[10%] inset-x-0 h-[120%] w-full pointer-events-none select-none will-change-transform"
        >
          <motion.div variants={heroImageVariants} className="relative h-full w-full">
            {/* Desktop Background Image (Hidden on mobile, visible from sm screen up) */}
            <div
              className={cn(
                "relative h-full w-full",
                mobileBackgroundImage ? "hidden sm:block" : "block",
              )}
            >
              <Image
                src={backgroundImage}
                alt="Campus backdrop"
                fill
                priority
                quality={90}
                sizes="100vw"
                className="object-cover object-center"
              />
            </div>

            {/* Mobile Background Image (Visible on mobile, hidden from sm screen up) */}
            {mobileBackgroundImage && (
              <div className="relative h-full w-full block sm:hidden">
                <Image
                  src={mobileBackgroundImage}
                  alt="Campus backdrop mobile"
                  fill
                  priority
                  quality={90}
                  sizes="100vw"
                  className="object-cover object-center"
                />
              </div>
            )}
          </motion.div>
        </div>

        {/* Responsive Contrast Overlay - anchored over the background image */}
        <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-white/90 via-white/70 to-white/95 dark:from-slate-950/90 dark:via-slate-950/75 dark:to-slate-950/95" />

        <div
          ref={vignetteRef}
          className="pointer-events-none absolute inset-0 z-[2] bg-slate-950/0 will-change-[opacity]"
        />

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

        <div
          ref={contentRef}
          className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col items-center px-4 pt-24 pb-16 text-center will-change-transform sm:px-10 sm:pt-26 sm:pb-18 lg:px-16 lg:pt-28 lg:pb-20"
        >
          {eyebrow && (
            <motion.div
              variants={heroDriftUpVariants}
              className="inline-flex items-center rounded-full border border-emerald-300/80 bg-white/90 px-3.5 py-1 text-xs font-semibold text-emerald-800 shadow-xs dark:border-emerald-800/80 dark:bg-emerald-950/80 dark:text-emerald-300"
            >
              {eyebrow}
            </motion.div>
          )}

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
            className="mt-5 max-w-2xl text-base font-medium text-slate-700 sm:text-lg dark:text-slate-200"
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
              className="inline-flex min-h-11 items-center justify-center rounded-lg border border-slate-300 bg-white/90 px-6 text-sm font-semibold text-slate-800 shadow-xs transition-all hover:bg-slate-100 hover:border-slate-400 active:scale-95 dark:border-slate-700 dark:bg-slate-900/90 dark:text-slate-200 dark:hover:bg-slate-800"
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
