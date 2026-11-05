import type { RefObject } from "react";

export interface HeroParallaxElements {
  containerRef: RefObject<HTMLElement | null>;
  heroRef?: RefObject<HTMLElement | null>;
  backgroundRef: RefObject<HTMLElement | null>;
  contentRef: RefObject<HTMLElement | null>;
  nextSectionRef: RefObject<HTMLElement | null>;
  vignetteRef?: RefObject<HTMLElement | null>;
}

export interface HeroParallaxConfig {
  backgroundSpeed?: number;
  contentFadeRate?: number;
  contentTranslateY?: number;
  nextSectionOverlap?: number;
  scrubFriction?: number;
  enablePinning?: boolean;
  pinDuration?: string | number;
}
