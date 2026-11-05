"use client";

import { signInWithPasswordAction } from "@/server/actions/auth";
import type { CredentialsFormValues } from "@/types/auth";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface CredentialsAuthFormProps {
  returnUrl?: string;
}

export function CredentialsAuthForm({ returnUrl = "/" }: CredentialsAuthFormProps) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState<CredentialsFormValues>({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { execute, isExecuting } = useAction(signInWithPasswordAction, {
    onSuccess: () => {
      router.push(returnUrl);
      router.refresh();
    },
    onError: ({ error }) => {
      setErrorMessage(
        error.serverError ?? "Invalid credentials. Please verify your email and password.",
      );
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);

    if (!formValues.email || !formValues.password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }

    execute({
      email: formValues.email.trim(),
      password: formValues.password,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {errorMessage && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs font-medium text-rose-700 dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-300">
          {errorMessage}
        </div>
      )}

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="email-input"
          className="text-xs font-semibold tracking-wide text-slate-700 uppercase dark:text-slate-300"
        >
          Email address
        </label>
        <input
          id="email-input"
          type="email"
          autoComplete="email"
          required
          value={formValues.email}
          onChange={(event) => setFormValues((prev) => ({ ...prev, email: event.target.value }))}
          placeholder="name@gecskp.ac.in or partner@company.com"
          className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 transition-colors placeholder:text-slate-400 focus:border-emerald-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-emerald-500 dark:focus:ring-emerald-500"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <label
            htmlFor="password-input"
            className="text-xs font-semibold tracking-wide text-slate-700 uppercase dark:text-slate-300"
          >
            Password
          </label>
          <a
            href="/auth/reset-password"
            className="text-xs font-medium text-emerald-600 transition-colors hover:text-emerald-700 hover:underline dark:text-emerald-400"
          >
            Forgot?
          </a>
        </div>
        <div className="relative">
          <input
            id="password-input"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            required
            value={formValues.password}
            onChange={(event) =>
              setFormValues((prev) => ({ ...prev, password: event.target.value }))
            }
            placeholder="••••••••••••"
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 pr-11 text-sm text-slate-900 transition-colors placeholder:text-slate-400 focus:border-emerald-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-emerald-500 dark:focus:ring-emerald-500"
          />
          <button
            type="button"
            aria-label={showPassword ? "Hide password" : "Show password"}
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 transition-colors hover:text-slate-600 dark:hover:text-slate-200"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2.5 pt-1">
        <input
          id="remember-checkbox"
          type="checkbox"
          checked={formValues.rememberMe}
          onChange={(event) =>
            setFormValues((prev) => ({ ...prev, rememberMe: event.target.checked }))
          }
          className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-900"
        />
        <label
          htmlFor="remember-checkbox"
          className="text-xs text-slate-600 select-none dark:text-slate-400"
        >
          Keep me signed in on this device
        </label>
      </div>

      <button
        type="submit"
        disabled={isExecuting}
        className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3.5 text-sm font-semibold text-white shadow-xs transition-all hover:bg-emerald-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 dark:bg-emerald-500 dark:hover:bg-emerald-600"
      >
        {isExecuting && <Loader2 className="h-4 w-4 animate-spin text-white" />}
        <span>Sign In</span>
      </button>
    </form>
  );
}
