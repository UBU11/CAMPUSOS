import type { LucideIcon } from "lucide-react";

interface FeatureIconBadgeProps {
  readonly icon: LucideIcon;
  readonly colorClass: string;
}

export function FeatureIconBadge({ icon: Icon, colorClass }: FeatureIconBadgeProps) {
  return (
    <div className="bg-muted dark:bg-muted/10 mb-2 size-fit rounded-lg p-px">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/80 shadow-[inset_0_-2px_0.5px_0px_rgba(0,0,0,0),inset_0px_2px_0_2px_rgba(255,255,255,1),0_0px_6px_0_rgba(0,0,0,0.07),0_2px_4px_0_rgba(0,0,0,0.05)] dark:bg-black/20 dark:shadow-[inset_0_-1px_0px_0px_rgba(0,0,0,0.1),inset_0px_1px_0px_0px_rgba(255,255,255,0.05),0_0px_2px_0_rgba(0,0,0,0.2),0_1px_4px_0_rgba(0,0,0,0.05)]">
        <Icon className={`h-5 w-5 ${colorClass}`} />
      </div>
    </div>
  );
}
