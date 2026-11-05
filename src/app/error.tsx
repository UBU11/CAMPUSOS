"use client";

import { ErrorView } from "@/components/feedback/error-view";

interface RouteErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function RouteError({ reset }: RouteErrorProps) {
  return <ErrorView code="500" reset={reset} />;
}
