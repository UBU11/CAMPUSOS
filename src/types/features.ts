import type { LucideIcon } from "lucide-react";

export interface FeatureSecurityMetric {
  readonly label: string;
  readonly value: string;
}

export interface FeatureItem {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly tag: string;
  readonly icon: LucideIcon;
  readonly iconColorClass: string;
  readonly href: string;
}

export interface FeatureHighlight {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly tag: string;
  readonly icon: LucideIcon;
  readonly iconColorClass: string;
  readonly metrics: readonly FeatureSecurityMetric[];
}
