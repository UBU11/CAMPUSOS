import type { ReactNode } from "react";

export type ErrorCode = "404" | "500" | "403" | "default";

export interface ErrorAction {
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: "default" | "outline" | "secondary" | "ghost";
  icon?: ReactNode;
}

export interface ErrorContent {
  code: string;
  title: string;
  description: string;
  primaryAction: ErrorAction;
  secondaryAction?: ErrorAction;
}

export interface ErrorViewProps {
  code?: string;
  title?: string;
  description?: string;
  primaryAction?: ErrorAction;
  secondaryAction?: ErrorAction;
  reset?: () => void;
  className?: string;
}
