"use client";

import { gsap, useGSAP } from "@/lib/gsap";
import type { HeroParallaxConfig, HeroParallaxElements } from "@/types/parallax";

const DEFAULT_CONFIG: Required<HeroParallaxConfig> = {
  backgroundSpeed: 0.2,
  contentFadeRate: 0,
  contentTranslateY: 100,
  nextSectionOverlap: 60,
  scrubFriction: 1.8,
  enablePinning: true,
  pinDuration: "+=650px",
};

export function useHeroParallax(elements: HeroParallaxElements, config: HeroParallaxConfig = {}) {
  const { containerRef, heroRef, backgroundRef, contentRef, nextSectionRef, vignetteRef } =
    elements;
  const mergedConfig = { ...DEFAULT_CONFIG, ...config };

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion || !containerRef.current) {
        return;
      }

      const matchMedia = gsap.matchMedia(containerRef);

      matchMedia.add("(min-width: 768px)", () => {
        const desktopTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: mergedConfig.pinDuration,
            pin: mergedConfig.enablePinning && heroRef?.current ? heroRef.current : false,
            pinSpacing: false,
            anticipatePin: 1,
            scrub: mergedConfig.scrubFriction,
            invalidateOnRefresh: true,
          },
        });

        if (backgroundRef.current) {
          desktopTimeline.fromTo(
            backgroundRef.current,
            { scale: 1.12, yPercent: 0 },
            {
              scale: 1.02,
              yPercent: mergedConfig.backgroundSpeed * 100,
              ease: "power1.out",
              force3D: true,
            },
            0,
          );
        }

        if (vignetteRef?.current) {
          desktopTimeline.fromTo(
            vignetteRef.current,
            { opacity: 0 },
            {
              opacity: 0.55,
              ease: "power2.inOut",
              force3D: true,
            },
            0,
          );
        }

        if (contentRef.current) {
          desktopTimeline.fromTo(
            contentRef.current,
            { opacity: 1, scale: 1, y: 0 },
            {
              opacity: mergedConfig.contentFadeRate,
              scale: 0.94,
              y: -mergedConfig.contentTranslateY,
              ease: "power2.out",
              force3D: true,
            },
            0,
          );
        }

        if (nextSectionRef.current) {
          desktopTimeline.fromTo(
            nextSectionRef.current,
            { y: mergedConfig.nextSectionOverlap },
            {
              y: 0,
              ease: "power1.out",
              force3D: true,
            },
            0,
          );
        }
      });

      matchMedia.add("(max-width: 767px)", () => {
        const mobileTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });

        if (backgroundRef.current) {
          mobileTimeline.fromTo(
            backgroundRef.current,
            { scale: 1.08, yPercent: 0 },
            {
              scale: 1.0,
              yPercent: 12,
              ease: "none",
              force3D: true,
            },
            0,
          );
        }

        if (contentRef.current) {
          mobileTimeline.fromTo(
            contentRef.current,
            { opacity: 1, y: 0 },
            {
              opacity: 0.15,
              y: -50,
              ease: "power1.out",
              force3D: true,
            },
            0,
          );
        }
      });
    },
    {
      scope: containerRef,
      dependencies: [
        mergedConfig.backgroundSpeed,
        mergedConfig.contentFadeRate,
        mergedConfig.contentTranslateY,
        mergedConfig.nextSectionOverlap,
        mergedConfig.scrubFriction,
        mergedConfig.enablePinning,
        mergedConfig.pinDuration,
      ],
    },
  );
}
