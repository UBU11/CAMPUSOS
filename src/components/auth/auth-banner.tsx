"use client";

import { authBannerVariants } from "@/components/auth/auth-motion";
import { Building2, GraduationCap, ShieldCheck, ShoppingBag } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

export function AuthBanner() {
  return (
    <div className="relative hidden w-full flex-col p-6 lg:flex lg:min-h-screen lg:w-1/2">
      <motion.div
        variants={authBannerVariants}
        initial="hidden"
        animate="visible"
        className="relative flex h-full w-full flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950 p-10 text-white shadow-2xl"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/20 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="text-2xl font-bold tracking-tight text-white">
              Campus<span className="text-emerald-400">OS</span>
            </span>
          </Link>
          <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
            GEC SKP Exclusive
          </span>
        </div>

        <div className="relative z-10 my-auto py-12">
          <div className="max-w-md">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              One platform for your entire campus life.
            </h2>
            <p className="mt-4 text-base text-slate-300">
              Buy, sell, or lend books and lab equipment, discover verified internships, and
              showcase your skills directly to hiring partners.
            </p>
          </div>

          <div className="mt-10 grid gap-4">
            <div className="flex items-start gap-3.5 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
              <div className="rounded-xl bg-emerald-500/20 p-2.5 text-emerald-400">
                <ShoppingBag className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Student Marketplace</h3>
                <p className="mt-0.5 text-xs text-slate-300">
                  Zero commission peer-to-peer buying, selling, and lending inside campus.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
              <div className="rounded-xl bg-blue-500/20 p-2.5 text-blue-400">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Verified Internships</h3>
                <p className="mt-0.5 text-xs text-slate-300">
                  Curated technical and management opportunities from verified company partners.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
              <div className="rounded-xl bg-purple-500/20 p-2.5 text-purple-400">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Talent Directory</h3>
                <p className="mt-0.5 text-xs text-slate-300">
                  Get discovered for hackathons, engineering projects, and research initiatives.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-6 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>Govt. Engineering College Sreekrishnapuram</span>
          </div>
          <span>v0.1.0</span>
        </div>
      </motion.div>
    </div>
  );
}
