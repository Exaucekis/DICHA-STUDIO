"use client";

import { usePathname } from "next/navigation";
import { Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { cn } from "@/lib/utils";

interface HeaderProps {
  onMenuOpen: () => void;
  onSearchOpen: () => void;
  menuOpen?: boolean;
}

export function Header({ onMenuOpen, onSearchOpen, menuOpen = false }: HeaderProps) {
  const pathname = usePathname();
  const pageTitle = getPageTitle(pathname);
  const isHome = pathname === "/";

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-colors duration-500",
        isHome
          ? "border-transparent bg-gradient-to-b from-background/85 to-transparent backdrop-blur-md"
          : "glass border-border-subtle",
      )}
    >
      <div className="flex h-[var(--header-height)] items-center justify-between px-4 md:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={onMenuOpen}
            className="group -ml-2 p-2 text-muted-foreground transition-colors hover:text-accent lg:hidden"
            aria-label="Ouvrir le menu"
            aria-controls="main-sidebar"
            aria-expanded={menuOpen}
          >
            <Menu className="h-6 w-6 transition-transform duration-300 group-hover:scale-105" />
          </button>

          <BrandLogo size="sm" className="lg:hidden" priority />

          {pageTitle && (
            <div className="hidden min-w-0 items-center gap-3 sm:flex">
              <span className="hidden h-4 w-px bg-border lg:block" aria-hidden />
              <p className="truncate text-xs uppercase tracking-[0.22em] text-muted-foreground">
                {pageTitle}
              </p>
            </div>
          )}

          {!pageTitle && (
            <p className="hidden text-[10px] uppercase tracking-[0.3em] text-accent/80 lg:block">
              Studio créatif
            </p>
          )}
        </div>

        <div className="flex items-center gap-1.5 md:gap-3">
          <button
            type="button"
            onClick={onSearchOpen}
            className="p-2.5 text-muted-foreground transition-all duration-300 hover:bg-accent/10 hover:text-accent"
            aria-label="Rechercher"
          >
            <Search className="h-5 w-5" />
          </button>
          <Button href="/devis" size="sm" className="hidden sm:inline-flex">
            Devis
          </Button>
        </div>
      </div>
    </header>
  );
}

function getPageTitle(pathname: string): string | null {
  if (pathname === "/") return null;
  const map: Record<string, string> = {
    "/musique": "Musique",
    "/videos": "Vidéos",
    "/artistes": "Artistes",
    "/briefing": "DICHA Briefing",
    "/services": "Services",
    "/a-propos": "À propos",
    "/contact": "Contact",
    "/devis": "Devis",
    "/actualites": "Actualités",
    "/realisations": "Réalisations",
    "/recherche": "Recherche",
  };
  if (map[pathname]) return map[pathname];
  if (pathname.startsWith("/musique/")) return "Morceau";
  if (pathname.startsWith("/artistes/")) return "Artiste";
  if (pathname.startsWith("/videos/")) return "Vidéo";
  return null;
}
