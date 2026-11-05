import type { FooterConfig } from "@/types/footer";

export const footerConfig: FooterConfig = {
  badgeText: "GEC SKP Exclusive Campus Network",
  heading: "Empowering student commerce, peer lending, and verified internships across campus.",
  contactLabel: "Campus Lead & Support:",
  contactEmail: "campusos@gecskp.ac.in",
  contactEmailHref: "mailto:campusos@gecskp.ac.in",
  brandName: "CampusOS",
  navLinks: [
    { label: "Marketplace", href: "/marketplace" },
    { label: "Internships", href: "/internships" },
    { label: "Talent Pool", href: "/talent" },
    { label: "Post Item", href: "/sell" },
    { label: "GEC SKP Portal", href: "https://gecskp.ac.in", isExternal: true },
  ],
};
