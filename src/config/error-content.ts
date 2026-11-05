import type { ErrorCode, ErrorContent } from "@/types/error";

export const ERROR_CONTENT_MAP: Record<ErrorCode, ErrorContent> = {
  "404": {
    code: "404",
    title: "Lost on Campus?",
    description: "The listing, internship or campus page you requested could not be found",
    primaryAction: {
      label: "Back to Campus Hub",
      href: "/",
    },
  },
  "500": {
    code: "500",
    title: "CampusOS Hit a Snag",
    description:
      "An unexpected server issue occurred while processing your request. Please try again.",
    primaryAction: {
      label: "Try Again",
    },
    secondaryAction: {
      label: "Back to Campus Hub",
      href: "/",
      variant: "outline",
    },
  },
  "403": {
    code: "403",
    title: "Access Restricted",
    description: "You do not have permission to view this campus resource or admin area.",
    primaryAction: {
      label: "Return Home",
      href: "/",
    },
  },
  default: {
    code: "Error",
    title: "Something Went Wrong",
    description: "An unexpected error occurred. Please navigate back or try again.",
    primaryAction: {
      label: "Back to Campus Hub",
      href: "/",
    },
  },
};

export function getErrorContent(code?: string): ErrorContent {
  if (code && code in ERROR_CONTENT_MAP) {
    return ERROR_CONTENT_MAP[code as ErrorCode];
  }
  return ERROR_CONTENT_MAP.default;
}
