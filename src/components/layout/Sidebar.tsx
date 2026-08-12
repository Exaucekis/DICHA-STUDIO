"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Music2,
  Video,
  Users,
  Radio,
  Briefcase,
  Info,
  Mail,
  Search,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { visuals } from "@/lib/data/visuals";
import { genres } from "@/lib/data/mock-data";

const navItems = [
  { href: "/", label: "Accueil", icon: Home },
  { href: "/musique", label: "Musique", icon: Music2 },
  { href: "/videos", label: "Vidéos", icon: Video },
  { href: "/artistes", label: "Artistes", icon: Users },
  { href: "/briefing", label: "Émissions", icon: Radio },
  { href: "/services", label: "Services", icon: Briefcase },
  { href: "/a-propos", label: "À propos", icon: Info },
  { href: "/contact", label: "Contact", icon: Mail },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  onSearch: () => void;
}

export function Sidebar({ open, onClose, onSearch }: SidebarProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    if (mq.matches) onClose();
  }, [pathname, onClose]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <>
      <div
        className={cn(
          "sidebar-overlay fixed inset-0 z-[60] bg-black/75 backdrop-blur-md lg:hidden",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        )}
        onClick={onClose}
        aria-hidden
      />

      <aside
        id="main-sidebar"
        className={cn(
          "sidebar-drawer fixed top-0 left-0 z-[70] flex h-[100dvh] flex-col",
          "w-[min(100vw,300px)] sm:w-[300px] lg:w-[var(--sidebar-width)]",
          "border-r border-white/8",
          "lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
        aria-label="Navigation principale"
        aria-hidden={!open ? undefined : false}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={visuals.sidebar}
            alt=""
            fill
            className="object-cover scale-105 animate-ken-burns"
            sizes="300px"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/97 via-background/92 to-background/98" />
          <div className="ambient-glow absolute -top-20 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-accent/25 blur-[80px]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(3,167,168,0.12),_transparent_60%)]" />
        </div>

        <div className="relative flex h-full flex-col">
          <div className="flex items-center justify-between gap-3 border-b border-white/8 px-4 py-4">
            <BrandLogo
              size="md"
              onClick={onClose}
              priority
              className="transition-transform duration-500 group-hover:scale-[1.02]"
            />
            <button
              type="button"
              onClick={onClose}
              className="shrink-0 p-2.5 text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground lg:hidden"
              aria-label="Fermer le menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="relative mx-4 mt-4 overflow-hidden border border-accent/20 brand-ring sm:mt-5">
            <div className="relative aspect-[16/9]">
              <Image
                src={visuals.sidebarAccent}
                alt="Univers DICHA STUDIO"
                fill
                className="object-cover transition-transform duration-1000 ease-out hover:scale-110"
                sizes="280px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <p className="text-[10px] uppercase tracking-[0.28em] text-accent">
                  Music · Visuals · Culture
                </p>
              </div>
            </div>
          </div>

          <nav className="hide-scrollbar flex-1 space-y-0.5 overflow-y-auto overscroll-contain px-3 py-5">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href));
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  data-active={isActive}
                  onClick={onClose}
                  className={cn(
                    "nav-link-studio group flex items-center gap-3 rounded-sm px-4 py-3.5",
                    "text-sm uppercase tracking-[0.18em] transition-all duration-300",
                    isActive
                      ? "bg-accent/12 text-accent"
                      : "text-muted-foreground hover:bg-white/5 hover:text-foreground",
                  )}
                >
                  <Icon
                    className={cn(
                      "h-4 w-4 shrink-0 transition-transform duration-300",
                      isActive ? "text-accent" : "group-hover:scale-110 group-hover:text-accent",
                    )}
                  />
                  <span className="truncate">{item.label}</span>
                  {isActive && (
                    <span className="ml-auto h-1.5 w-1.5 shrink-0 rounded-full bg-accent animate-pulse-glow" />
                  )}
                </Link>
              );
            })}

            <button
              type="button"
              onClick={() => {
                onSearch();
                onClose();
              }}
              className="nav-link-studio flex w-full items-center gap-3 px-4 py-3.5 text-sm uppercase tracking-[0.18em] text-muted-foreground transition-all duration-300 hover:bg-white/5 hover:text-foreground"
            >
              <Search className="h-4 w-4" />
              Rechercher
            </button>
          </nav>

          <div className="border-t border-white/8 px-5 py-4">
            <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-muted">
              Genres
            </p>
            <div className="flex flex-wrap gap-2">
              {genres.map((g) => (
                <Link
                  key={g.slug}
                  href={`/musique?genre=${g.slug}`}
                  onClick={onClose}
                  className="border border-white/10 px-2.5 py-1 text-[10px] uppercase tracking-wider text-muted-foreground transition-all duration-300 hover:border-accent hover:text-accent"
                >
                  {g.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-2.5 border-t border-white/8 p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
            <Button href="/devis" className="w-full" size="sm" onClick={onClose}>
              Demander un devis
            </Button>
            <Button
              href="/musique"
              variant="outline"
              className="w-full"
              size="sm"
              onClick={onClose}
            >
              Écouter maintenant
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}
