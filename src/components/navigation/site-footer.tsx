import { Footer11 } from "@/components/ui/footer-11";
import { footerConfig } from "@/config/footer";

export function SiteFooter() {
  return (
    <div className="w-full pb-16 md:pb-0">
      <Footer11
        badgeText={footerConfig.badgeText}
        heading={footerConfig.heading}
        contactLabel={footerConfig.contactLabel}
        contactEmail={footerConfig.contactEmail}
        contactEmailHref={footerConfig.contactEmailHref}
        brandName={footerConfig.brandName}
        navLinks={footerConfig.navLinks}
      />
    </div>
  );
}
