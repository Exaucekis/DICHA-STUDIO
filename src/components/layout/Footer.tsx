"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteSettings } from "@/lib/data/mock-data";
import { BrandLogo } from "@/components/ui/BrandLogo";

const footerLinks = {
  navigation: [
    { href: "/musique", label: "Musique" },
    { href: "/videos", label: "Vidéos" },
    { href: "/artistes", label: "Artistes" },
    { href: "/briefing", label: "Briefing" },
    { href: "/services", label: "Services" },
    { href: "/a-propos", label: "À propos" },
    { href: "/contact", label: "Contact" },
  ],
  legal: [
    { href: "/mentions-legales", label: "Mentions légales" },
    { href: "/confidentialite", label: "Politique de confidentialité" },
    { href: "/conditions", label: "Conditions d'utilisation" },
  ],
};

export function Footer() {
  const pathname = usePathname();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  if (pathname.startsWith("/admin")) return null;

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setSubscribed(true);
      setEmail("");
    } catch {
      setSubscribed(true);
    }
  };

  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <div className="container-dicha section-padding !pb-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <BrandLogo size="lg" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Création musicale et audiovisuelle. {siteSettings.tagline}.
            </p>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-widest text-accent mb-4">
              Navigation
            </h3>
            <ul className="space-y-2">
              {footerLinks.navigation.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-widest text-accent mb-4">
              Légal
            </h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-widest text-accent mb-4">
              Newsletter DICHA STUDIO
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Recevez nos nouvelles sorties, vidéos, annonces et actualités
              directement dans votre boîte mail.
            </p>
            {subscribed ? (
              <p className="text-sm text-accent">Merci pour votre inscription !</p>
            ) : (
              <form onSubmit={handleNewsletter} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Votre email"
                  required
                  className="flex-1 bg-surface-elevated border border-border px-4 py-2.5 text-sm outline-none focus:border-accent transition-colors"
                  aria-label="Email newsletter"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-accent text-background text-xs uppercase tracking-widest font-semibold hover:bg-accent-hover transition-colors shrink-0"
                >
                  S&apos;abonner
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} DICHA STUDIO — Tous droits réservés.
          </p>
          {siteSettings.socialLinks.length > 0 && (
            <div className="flex gap-4">
              {siteSettings.socialLinks.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-muted-foreground hover:text-accent uppercase tracking-widest"
                >
                  {link.label ?? link.platform}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
