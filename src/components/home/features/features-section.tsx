import { CAMPUS_HIGHLIGHT_FEATURE, CAMPUS_STANDARD_FEATURES } from "@/config/features";
import { FeatureHighlightCard } from "./feature-highlight-card";
import { FeatureStandardCard } from "./feature-standard-card";

export function FeaturesSection() {
  const [firstCard, secondCard, thirdCard, fourthCard] = CAMPUS_STANDARD_FEATURES;

  return (
    <section className="flex w-full flex-col items-center justify-center py-10 sm:py-16">
      <div className="mb-10 text-center sm:mb-14">
        <span className="inline-flex items-center rounded-full border border-emerald-200/80 bg-emerald-50/80 px-3 py-1 text-xs font-semibold text-emerald-800 dark:border-emerald-800/40 dark:bg-emerald-950/60 dark:text-emerald-300">
          CampusOS Ecosystem
        </span>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl dark:text-white">
          Built exclusively for GEC Palakkad
        </h2>
        <p className="text-muted-foreground mx-auto mt-3 max-w-2xl text-base sm:text-lg">
          Zero outside noise, verified student identities, and peer-to-peer exchanges engineered for
          seamless college life.
        </p>
      </div>

      <div className="grid w-full max-w-6xl grid-cols-1 gap-4 md:grid-cols-3">
        {firstCard && <FeatureStandardCard feature={firstCard} />}
        {secondCard && <FeatureStandardCard feature={secondCard} />}

        <FeatureHighlightCard feature={CAMPUS_HIGHLIGHT_FEATURE} />

        {thirdCard && <FeatureStandardCard feature={thirdCard} />}
        {fourthCard && <FeatureStandardCard feature={fourthCard} />}
      </div>
    </section>
  );
}
