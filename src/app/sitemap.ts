import type { MetadataRoute } from "next";
import {
  tracks,
  artists,
  videos,
  episodes,
  articles,
  services,
} from "@/lib/data/mock-data";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/musique",
    "/videos",
    "/artistes",
    "/briefing",
    "/services",
    "/a-propos",
    "/contact",
    "/devis",
    "/actualites",
    "/realisations",
    "/recherche",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const dynamicPages = [
    ...tracks.map((t) => `/musique/${t.slug}`),
    ...artists.map((a) => `/artistes/${a.slug}`),
    ...videos.map((v) => `/videos/${v.slug}`),
    ...episodes.map((e) => `/briefing/${e.slug}`),
    ...articles.map((a) => `/actualites/${a.slug}`),
    ...services.map((s) => `/services/${s.slug}`),
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...dynamicPages];
}
