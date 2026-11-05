"use client";

import { HeroSection } from "@/components/home/hero-section";
import { useHeroParallax } from "@/hooks/use-hero-parallax";
import { type ReactNode, useRef } from "react";

interface HeroScrollTransitionProps {
  children: ReactNode;
}

export function HeroScrollTransition({ children }: HeroScrollTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const nextSectionRef = useRef<HTMLDivElement>(null);
  const vignetteRef = useRef<HTMLDivElement>(null);

  useHeroParallax({
    containerRef,
    heroRef,
    backgroundRef,
    contentRef,
    nextSectionRef,
    vignetteRef,
  });

  return (
    <div ref={containerRef} className="relative w-full">
      <div ref={heroRef} className="relative z-0 w-full will-change-transform">
        <HeroSection
          backgroundRef={backgroundRef}
          contentRef={contentRef}
          vignetteRef={vignetteRef}
        />
      </div>

      <div ref={nextSectionRef} className="relative z-20 w-full will-change-transform">
        {children}
      </div>
    </div>
  );
}
