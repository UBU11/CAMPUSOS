import type { ReactNode } from "react";

export interface FooterNavLink {
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface Footer11Props {
  badgeText?: string;
  heading?: string;
  contactLabel?: string;
  contactEmail?: string;
  contactEmailHref?: string;
  navLinks?: FooterNavLink[];
  brandName?: string;
  brandLogo?: ReactNode;
  accentGlowClassName?: string;
  className?: string;
  onScrollToTop?: () => void;
}

export interface FooterConfig {
  badgeText: string;
  heading: string;
  contactLabel: string;
  contactEmail: string;
  contactEmailHref: string;
  brandName: string;
  navLinks: FooterNavLink[];
}
