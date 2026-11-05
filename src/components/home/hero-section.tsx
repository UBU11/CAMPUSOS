import { Hero17 } from "@/components/ui/hero-17";
import heroMobile from "@assets/images/hero-mobile.png";
import heroDesktop from "@assets/images/hero.png";
import type { RefObject } from "react";

interface HeroSectionProps {
  backgroundRef?: RefObject<HTMLDivElement | null>;
  contentRef?: RefObject<HTMLDivElement | null>;
  vignetteRef?: RefObject<HTMLDivElement | null>;
  className?: string;
}

export function HeroSection({
  backgroundRef,
  contentRef,
  vignetteRef,
  className,
}: HeroSectionProps = {}) {
  return (
    <Hero17
      brandName="CampusOS"
      eyebrow="GEC SKP Exclusive Campus Network"
      headingLine1Prefix="The Operating System for"
      headingHighlight="Campus Life"
      headingLine2="Buy, Sell & Lend Essentials"
      description="Buy, sell and lend campus essentials, discover verified internships and showcase your student talent within your verified college community"
      primaryCtaLabel="Explore Marketplace"
      primaryCtaHref="/marketplace"
      secondaryCtaLabel="Post an Item"
      secondaryCtaHref="/sell"
      backgroundImage={heroDesktop}
      mobileBackgroundImage={heroMobile}
      backgroundRef={backgroundRef}
      contentRef={contentRef}
      vignetteRef={vignetteRef}
      className={className ?? "-mt-16"}
    />
  );
}
