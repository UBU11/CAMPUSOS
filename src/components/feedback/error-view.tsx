"use client";

import { ErrorOne } from "@/components/ui/error-1";
import { getErrorContent } from "@/config/error-content";
import type { ErrorAction, ErrorViewProps } from "@/types/error";
import { RiHome5Fill, RiRefreshLine } from "react-icons/ri";

export function ErrorView({
  code,
  title,
  description,
  primaryAction,
  secondaryAction,
  reset,
  className,
}: ErrorViewProps) {
  const content = getErrorContent(code);

  const resolvedPrimaryAction: ErrorAction = primaryAction ?? {
    ...content.primaryAction,
    onClick: reset ?? content.primaryAction.onClick,
    icon: reset ? (
      <RiRefreshLine className="ml-1.5 text-base" aria-hidden="true" />
    ) : (
      <RiHome5Fill className="ml-1.5 text-base" aria-hidden="true" />
    ),
  };

  const resolvedSecondaryAction = secondaryAction ?? content.secondaryAction;

  return (
    <ErrorOne
      code={code ?? content.code}
      title={title ?? content.title}
      description={description ?? content.description}
      action={resolvedPrimaryAction}
      secondaryAction={resolvedSecondaryAction}
      className={className}
    />
  );
}
