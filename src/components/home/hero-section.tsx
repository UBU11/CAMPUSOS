import { HeroTrustBadges } from "@/components/home/hero-trust-badges";
import { Hero17 } from "@/components/ui/hero-17";

export function HeroSection() {
  return (
    <div className="py-4 sm:py-6">
      <Hero17
        brandName="CampusOS"
        eyebrow="GEC SKP Exclusive Campus Network"
        headingLine1Prefix="The Operating System for"
        headingHighlight="Campus Life"
        headingLine2="Buy, Sell & Lend Essentials"
        description="Buy, sell, and lend campus essentials, discover verified internships, and showcase your student talent within your verified college community."
        primaryCtaLabel="Explore Marketplace"
        primaryCtaHref="/marketplace"
        secondaryCtaLabel="Post an Item"
        secondaryCtaHref="/sell"
        scrollLabel="Scroll to Explore Listings"
      >
        <HeroTrustBadges />
      </Hero17>
    </div>
  );
}
