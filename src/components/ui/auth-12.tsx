"use client";

import { AuthContainer } from "@/components/auth/auth-container";
import type { AuthBlockProps } from "@/types/auth";

export default function Auth12(props: AuthBlockProps) {
  return <AuthContainer {...props} />;
}

export { Auth12 };
