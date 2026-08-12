import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import { siteSettings } from "@/lib/data/mock-data";
import { AudioProvider } from "@/components/audio/AudioProvider";
import { AppShell } from "@/components/layout/AppShell";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: {
    default: `${siteSettings.siteName} — Musique, Visuels & Culture`,
    template: `%s | ${siteSettings.siteName}`,
  },
  description:
    "Création musicale et audiovisuelle au cœur d'un univers pensé pour les artistes, les créateurs et les passionnés.",
  keywords: [
    "DICHA STUDIO",
    "musique",
    "trap",
    "amapiano",
    "R&B",
    "sébène",
    "production audiovisuelle",
    "studio",
  ],
  icons: {
    icon: "/brand/logo-dicha.png",
    apple: "/brand/logo-dicha.png",
  },
  other: {
    "theme-color": "#03A7A8",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: siteSettings.siteName,
    images: [{ url: "/brand/logo-dicha.png", alt: "DICHA STUDIO" }],
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${syne.variable} ${dmSans.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-background text-foreground antialiased">
        <AudioProvider>
          <AppShell>{children}</AppShell>
        </AudioProvider>
      </body>
    </html>
  );
}
