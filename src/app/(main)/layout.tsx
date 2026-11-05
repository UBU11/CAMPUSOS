import { BottomNavBar } from "@/components/navigation/bottom-nav-bar";
import { Navbar } from "@/components/navigation/navbar";
import { SiteFooter } from "@/components/navigation/site-footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Navbar />
      <div className="flex-1">{children}</div>
      <SiteFooter />
      <BottomNavBar />
    </div>
  );
}
