import type { StaticImageData } from "next/image";
import type { ReactNode, RefObject } from "react";

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
  backgroundImage?: string | StaticImageData;
  mobileBackgroundImage?: string | StaticImageData;
  className?: string;
  children?: ReactNode;
  backgroundRef?: RefObject<HTMLDivElement | null>;
  contentRef?: RefObject<HTMLDivElement | null>;
  vignetteRef?: RefObject<HTMLDivElement | null>;
}
