import { Card, CardContent } from "@/components/ui/card";
import type { FeatureItem } from "@/types/features";
import Link from "next/link";
import { FeatureIconBadge } from "./feature-icon-badge";
import { FeaturePillTag } from "./feature-pill-tag";

interface FeatureStandardCardProps {
  readonly feature: FeatureItem;
}

export function FeatureStandardCard({ feature }: FeatureStandardCardProps) {
  return (
    <Link href={feature.href} className="group block focus:outline-hidden">
      <Card className="bg-muted/50 h-full rounded-3xl ring-0 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
        <CardContent className="flex h-full flex-col justify-between p-6">
          <div>
            <FeatureIconBadge icon={feature.icon} colorClass={feature.iconColorClass} />
            <h3 className="text-lg font-semibold text-slate-900 group-hover:text-emerald-600 dark:text-white dark:group-hover:text-emerald-400 transition-colors">
              {feature.title}
            </h3>
            <p className="text-muted-foreground mt-2 mb-4 text-sm leading-relaxed">
              {feature.description}
            </p>
          </div>
          <div>
            <FeaturePillTag label={feature.tag} />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
