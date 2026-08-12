"use client";

import { useState, useCallback, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Footer } from "@/components/layout/Footer";
import { SearchModal } from "@/components/layout/SearchModal";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const closeSidebar = useCallback(() => setSidebarOpen(false), []);
  const openSidebar = useCallback(() => setSidebarOpen(true), []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (mq.matches) setSidebarOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  if (pathname.startsWith("/admin")) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen lg:pl-[var(--sidebar-width)]">
      <Sidebar
        open={sidebarOpen}
        onClose={closeSidebar}
        onSearch={() => setSearchOpen(true)}
      />

      <div className="flex min-h-screen flex-col transition-[padding] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
        <Header
          onMenuOpen={openSidebar}
          onSearchOpen={() => setSearchOpen(true)}
          menuOpen={sidebarOpen}
        />
        <main className="flex-1 player-safe-area">{children}</main>
        <Footer />
      </div>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
