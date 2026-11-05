import type { ReactNode } from "react";

export interface HeroNavLink {
  label: string;
  href: string;
}

export interface HeroTrustBadgeItem {
  iconColor: string;
  label: string;
}

export interface Hero17Props {
  brandName?: string;
  navLinks?: HeroNavLink[];
  showNav?: boolean;
  eyebrow?: string;
  headingLine1Prefix?: string;
  headingHighlight?: string;
  headingLine2?: string;
  description?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  loginLabel?: string;
  loginHref?: string;
  signupLabel?: string;
  signupHref?: string;
  backgroundImage?: string;
  className?: string;
  children?: ReactNode;
}
