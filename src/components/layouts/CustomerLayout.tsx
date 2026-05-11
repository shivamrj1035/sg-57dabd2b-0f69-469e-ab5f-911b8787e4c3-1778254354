import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Home, Search, ShoppingBag, User, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface CustomerLayoutProps {
  children: React.ReactNode;
}

export const CustomerLayout = ({ children }: CustomerLayoutProps) => {
  const router = useRouter();

  const navItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Search, label: "Search", href: "/discover" },
    { icon: ShoppingBag, label: "Orders", href: "/orders" },
    { icon: User, label: "Profile", href: "/profile" },
  ];

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      {/* Top Bar (Mobile) */}
      <header className="sticky top-0 z-40 w-full glass-morphism border-b border-white/10 md:hidden">
        <div className="container px-4 h-16 flex items-center justify-between">
          <Link href="/" className="font-heading font-black text-2xl text-gradient">
            LocalHub
          </Link>
          <button className="flex items-center gap-1 text-sm font-bold bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
            <MapPin className="h-3.5 w-3.5 text-primary" />
            <span>Select Area</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {children}
      </main>

      {/* Bottom Nav (Mobile Only) */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 glass-morphism border-t border-white/10 md:hidden pb-safe">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => {
            const isActive = router.pathname === item.href;
            return (
              <Link 
                key={item.label} 
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 w-full h-full transition-colors",
                  isActive ? "text-primary font-bold" : "text-muted-foreground"
                )}
              >
                <item.icon className={cn("h-6 w-6", isActive && "animate-pulse")} />
                <span className="text-[10px] uppercase tracking-widest">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Desktop Sidebar (Optional, but let's keep it clean for now) */}
    </div>
  );
};
