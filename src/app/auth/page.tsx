import { AuthContainer } from "@/components/auth/auth-container";
import { env } from "@/env";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Sign In — CampusOS",
  description: "Sign in to CampusOS with your official college credentials.",
};

interface AuthPageProps {
  searchParams: Promise<{
    error?: string;
    next?: string;
  }>;
}

async function AuthContent({ searchParams }: AuthPageProps) {
  const params = await searchParams;

  const errorMessage =
    params.error === "auth_callback_failed"
      ? "Authentication failed. Please verify you are using your official college Google account."
      : params.error;

  return (
    <AuthContainer
      collegeDomain={env.NEXT_PUBLIC_COLLEGE_DOMAIN}
      returnUrl={params.next ?? "/"}
      errorMessage={errorMessage}
    />
  );
}

export default function AuthPage(props: AuthPageProps) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 dark:bg-slate-950" />}>
      <AuthContent {...props} />
    </Suspense>
  );
}
