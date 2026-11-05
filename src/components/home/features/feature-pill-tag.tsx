interface FeaturePillTagProps {
  readonly label: string;
}

export function FeaturePillTag({ label }: FeaturePillTagProps) {
  return (
    <div className="bg-muted dark:bg-muted/10 inline-flex rounded-lg p-0.5">
      <div className="text-muted-foreground inline-flex items-center rounded-md bg-white/80 px-2 py-1 text-[10px] font-medium shadow-[inset_0_-2px_0.5px_0px_rgba(0,0,0,0),inset_0px_2px_0_2px_rgba(255,255,255,1),0_0px_2px_0_rgba(0,0,0,0.08),0_1px_4px_0_rgba(0,0,0,0.05)] dark:bg-black/20 dark:shadow-[inset_0_-1px_0px_0px_rgba(0,0,0,0.1),inset_0px_1px_0px_0px_rgba(255,255,255,0.04),0_0px_2px_0_rgba(0,0,0,0.08),0_1px_4px_0_rgba(0,0,0,0.05)]">
        {label}
      </div>
    </div>
  );
}
