"use client";

import { ErrorView } from "@/components/feedback/error-view";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ reset }: GlobalErrorProps) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-zinc-950 font-sans text-zinc-100 antialiased">
        <ErrorView code="500" reset={reset} />
      </body>
    </html>
  );
}
