import { Card, CardContent } from "@/components/ui/card";
import type { FeatureHighlight } from "@/types/features";
import { FeatureIconBadge } from "./feature-icon-badge";
import { FeaturePillTag } from "./feature-pill-tag";

interface FeatureHighlightCardProps {
  readonly feature: FeatureHighlight;
}

export function FeatureHighlightCard({ feature }: FeatureHighlightCardProps) {
  return (
    <Card className="bg-muted/50 row-span-2 flex flex-col justify-between rounded-3xl ring-0 transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_12px_40px_rgba(0,0,0,0.7)]">
      <CardContent className="p-6">
        <FeatureIconBadge icon={feature.icon} colorClass={feature.iconColorClass} />
        <h3 className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">
          {feature.title}
        </h3>
        <p className="text-muted-foreground mt-2 mb-6 text-sm leading-relaxed">
          {feature.description}
        </p>

        <div className="space-y-2.5">
          {feature.metrics.map((metric) => (
            <div
              key={metric.label}
              className="bg-muted dark:bg-muted/10 flex items-center justify-between rounded-lg px-3.5 py-2.5 text-xs"
            >
              <span className="text-muted-foreground font-medium">{metric.label}</span>
              <span className="font-semibold text-slate-900 dark:text-slate-100">
                {metric.value}
              </span>
            </div>
          ))}
        </div>
      </CardContent>

      <div className="px-6 pb-6">
        <FeaturePillTag label={feature.tag} />
      </div>
    </Card>
  );
}
