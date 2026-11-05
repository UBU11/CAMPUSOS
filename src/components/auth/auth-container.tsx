"use client";

import { AuthBanner } from "@/components/auth/auth-banner";
import { authContainerVariants, authItemVariants } from "@/components/auth/auth-motion";
import { CredentialsAuthForm } from "@/components/auth/credentials-auth-form";
import { GoogleAuthButton } from "@/components/auth/google-auth-button";
import type { AuthBlockProps } from "@/types/auth";
import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

interface AuthContainerProps extends AuthBlockProps {
  errorMessage?: string | null;
}

export function AuthContainer({
  collegeDomain = "gecskp.ac.in",
  returnUrl = "/",
  errorMessage,
}: AuthContainerProps) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-slate-50 font-sans text-slate-900 antialiased selection:bg-emerald-500/20 selection:text-emerald-700 lg:flex-row dark:bg-slate-950 dark:text-slate-100">
      <AuthBanner />

      <div className="flex w-full flex-1 flex-col items-center justify-center p-6 sm:p-12 lg:w-1/2">
        <motion.div
          variants={authContainerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-[420px]"
        >
          <motion.div
            variants={authItemVariants}
            className="mb-6 flex items-center justify-between"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to home</span>
            </Link>

            <span className="text-xs font-semibold tracking-wide text-emerald-600 uppercase dark:text-emerald-400">
              Campus Access
            </span>
          </motion.div>

          <motion.div variants={authItemVariants} className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
              Welcome to CampusOS
            </h1>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Sign in with your official college credentials to access the marketplace, internships,
              and talent portal.
            </p>
          </motion.div>

          {errorMessage && (
            <motion.div
              variants={authItemVariants}
              className="mb-6 rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs font-medium text-rose-700 dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-300"
            >
              {errorMessage}
            </motion.div>
          )}

          <motion.div variants={authItemVariants} className="mb-6">
            <GoogleAuthButton collegeDomain={collegeDomain} />
          </motion.div>

          <motion.div variants={authItemVariants} className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-200 dark:border-slate-800" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-slate-50 px-3 font-medium text-slate-400 dark:bg-slate-950 dark:text-slate-500">
                Or continue with password
              </span>
            </div>
          </motion.div>

          <motion.div variants={authItemVariants}>
            <CredentialsAuthForm returnUrl={returnUrl} />
          </motion.div>

          <motion.div
            variants={authItemVariants}
            className="mt-8 border-t border-slate-200 pt-6 text-center text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400"
          >
            Hiring partner or recruiter without an institutional email?{" "}
            <a
              href="mailto:placement@gecskp.ac.in"
              className="font-semibold text-emerald-600 underline underline-offset-2 transition-colors hover:text-emerald-700 dark:text-emerald-400"
            >
              Request Company Access
            </a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
