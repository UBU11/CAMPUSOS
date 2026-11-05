"use client";

import { getOAuthSignInUrlAction } from "@/server/actions/auth";
import type { GoogleAuthButtonProps } from "@/types/auth";
import { Loader2 } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.16v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.16C1.43 8.55 1 10.22 1 12s.43 3.45 1.16 4.93l3.68-2.84z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.16 7.07l3.68 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

export function GoogleAuthButton({
  collegeDomain = "gecskp.ac.in",
  className = "",
  onSuccessRedirect,
}: GoogleAuthButtonProps) {
  const [authError, setAuthError] = useState<string | null>(null);

  const { execute, isExecuting } = useAction(getOAuthSignInUrlAction, {
    onSuccess: ({ data }) => {
      if (data?.url) {
        if (onSuccessRedirect) {
          onSuccessRedirect(data.url);
        } else {
          window.location.href = data.url;
        }
      }
    },
    onError: ({ error }) => {
      setAuthError(error.serverError ?? "Google OAuth initialization failed");
    },
  });

  return (
    <div className="w-full">
      <button
        type="button"
        disabled={isExecuting}
        onClick={() => {
          setAuthError(null);
          execute();
        }}
        className={`group relative flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-semibold text-slate-700 shadow-xs transition-all hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-700 dark:hover:bg-slate-800/80 ${className}`}
      >
        {isExecuting ? (
          <Loader2 className="h-5 w-5 animate-spin text-emerald-600" />
        ) : (
          <GoogleIcon />
        )}
        <span>Continue with College Google Account</span>
      </button>

      {collegeDomain && (
        <p className="mt-2 text-center text-xs text-slate-500 dark:text-slate-400">
          Restricted to{" "}
          <span className="font-semibold text-emerald-600 dark:text-emerald-400">
            @{collegeDomain}
          </span>{" "}
          accounts
        </p>
      )}

      {authError && (
        <p className="mt-2 rounded-lg bg-rose-50 p-2 text-center text-xs font-medium text-rose-600 dark:bg-rose-950/40 dark:text-rose-400">
          {authError}
        </p>
      )}
    </div>
  );
}
