import type { FeatureHighlight, FeatureItem } from "@/types/features";
import { ArrowLeftRight, Briefcase, GraduationCap, ShieldCheck, ShoppingBag } from "lucide-react";

export const CAMPUS_HIGHLIGHT_FEATURE: FeatureHighlight = {
  id: "campus-trust-verification",
  title: "Verified Student Trust & Escrow",
  description:
    "Exclusive to verified @gecskp.ac.in credentials. Zero outside spam, transparent pricing in INR, and peer reputation safeguards.",
  tag: "100% Student Verified",
  icon: ShieldCheck,
  iconColorClass: "text-emerald-500",
  metrics: [
    { label: "Campus Domain", value: "@gecskp.ac.in" },
    { label: "Student Platform Fee", value: "₹0 Always" },
    { label: "Identity Verification", value: "Active SSO" },
  ],
};

export const CAMPUS_STANDARD_FEATURES: readonly FeatureItem[] = [
  {
    id: "marketplace-exchange",
    title: "Buy & Sell Exchange",
    description:
      "Trade pre-owned engineering textbooks, lab kits, calculators, and drafters in fair INR prices with campus peers.",
    tag: "Direct Peer-to-Peer",
    icon: ShoppingBag,
    iconColorClass: "text-amber-500",
    href: "/marketplace",
  },
  {
    id: "campus-rentals",
    title: "Lending & Daily Rentals",
    description:
      "Borrow cycles, scientific tools, or project gear with flexible daily rental rates and refundable security deposits.",
    tag: "Flexible Deposits",
    icon: ArrowLeftRight,
    iconColorClass: "text-indigo-500",
    href: "/marketplace?listingType=lend",
  },
  {
    id: "curated-internships",
    title: "Vetted Industry Internships",
    description:
      "Browse curated internships posted exclusively by verified tech partners and alumni hiring directly from campus.",
    tag: "Verified Companies",
    icon: Briefcase,
    iconColorClass: "text-blue-500",
    href: "/internships",
  },
  {
    id: "student-talent-pool",
    title: "Student Talent Directory",
    description:
      "Showcase your software engineering, UI/UX, or technical portfolios to peer founders and campus recruiters.",
    tag: "Campus Talent Network",
    icon: GraduationCap,
    iconColorClass: "text-purple-500",
    href: "/talent",
  },
];
