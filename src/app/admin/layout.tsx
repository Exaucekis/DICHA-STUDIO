"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { visuals } from "@/lib/data/visuals";
import { BrandLogo } from "@/components/ui/BrandLogo";

const adminNav = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/morceaux", label: "Morceaux" },
  { href: "/admin/videos", label: "Vidéos" },
  { href: "/admin/artistes", label: "Artistes" },
  { href: "/admin/emissions", label: "Émissions" },
  { href: "/admin/articles", label: "Articles" },
  { href: "/admin/services", label: "Services" },
  { href: "/admin/devis", label: "Devis" },
  { href: "/admin/utilisateurs", label: "Utilisateurs" },
  { href: "/admin/analytics", label: "Analytics" },
  { href: "/admin/parametres", label: "Paramètres" },
];

function AdminSidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity lg:hidden",
          open ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        onClick={onClose}
      />
      <aside
        className={cn(
          "fixed lg:static z-50 h-full w-[min(100vw,280px)] lg:w-64 shrink-0 flex flex-col border-r border-border",
          "transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <div className="absolute inset-0 lg:relative">
          <Image src={visuals.studio} alt="" fill className="object-cover opacity-30 lg:opacity-20" sizes="280px" />
          <div className="absolute inset-0 bg-surface/95 lg:bg-surface" />
        </div>
        <div className="relative flex flex-col h-full">
          <div className="flex items-center justify-between border-b border-border p-5">
            <Link href="/admin" onClick={onClose} className="flex items-center gap-3">
              <BrandLogo size="sm" href={null} />
              <div>
                <p className="font-display text-sm font-bold uppercase text-accent">Admin</p>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground">CMS</p>
              </div>
            </Link>
            <button type="button" onClick={onClose} className="p-2 text-muted-foreground lg:hidden">
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto p-4 space-y-0.5">
            {adminNav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "block px-4 py-2.5 text-sm transition-all duration-300 border-l-2",
                    active
                      ? "text-accent bg-accent/10 border-accent"
                      : "text-muted-foreground hover:text-foreground hover:bg-surface-hover border-transparent",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="p-4 border-t border-border">
            <Link href="/" className="text-xs text-muted-foreground hover:text-accent">
              ← Retour au site
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-background">
      <AdminSidebar open={open} onClose={() => setOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="lg:hidden sticky top-0 z-30 flex items-center gap-3 px-4 h-14 border-b border-border glass">
          <button type="button" onClick={() => setOpen(true)} className="p-2 text-muted-foreground">
            <Menu className="w-5 h-5" />
          </button>
          <span className="font-display text-sm uppercase tracking-widest">Admin</span>
        </header>
        <main className="flex-1 p-4 sm:p-6 md:p-10 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
