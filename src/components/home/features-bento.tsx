import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, Briefcase, GraduationCap, ShoppingBag } from "lucide-react";
import Link from "next/link";

export function FeaturesBento() {
  const pillars = [
    {
      title: "Marketplace & Lending",
      description:
        "Buy, sell, or rent textbooks, lab kits, calculators, and cycles from peers in verified INR rates.",
      icon: ShoppingBag,
      href: "/marketplace",
      tag: "Live on Campus",
      accentBg: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
      borderHover: "hover:border-emerald-300 dark:hover:border-emerald-800",
    },
    {
      title: "Internship Portal",
      description:
        "Discover vetted opportunities curated by industry partners specifically for college students.",
      icon: Briefcase,
      href: "/internships",
      tag: "Verified Partners",
      accentBg: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
      borderHover: "hover:border-blue-300 dark:hover:border-blue-800",
    },
    {
      title: "Student Talent Directory",
      description:
        "Showcase technical projects, design portfolios, and freelance capabilities to campus teams and recruiters.",
      icon: GraduationCap,
      href: "/talent",
      tag: "Peer Network",
      accentBg: "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
      borderHover: "hover:border-purple-300 dark:hover:border-purple-800",
    },
  ];

  return (
    <section className="py-6 sm:py-10">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {pillars.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <Link key={pillar.title} href={pillar.href} className="group block">
              <Card
                className={`h-full transition-all duration-200 border-slate-200 shadow-xs hover:shadow-md dark:border-slate-800 ${pillar.borderHover}`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div
                      className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ${pillar.accentBg}`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-medium text-slate-500 group-hover:text-slate-900 dark:text-slate-400 dark:group-hover:text-slate-100 flex items-center gap-0.5">
                      {pillar.tag}
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                  <CardTitle className="mt-3 text-lg font-bold text-slate-900 dark:text-white">
                    {pillar.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {pillar.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
