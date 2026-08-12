import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

interface SEOProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article" | "music.song" | "profile";
}

export function createMetadata({
  title,
  description,
  path,
  image,
  type = "website",
}: SEOProps): Metadata {
  const url = `${siteUrl}${path}`;
  const ogImage = image ?? `${siteUrl}/og-default.jpg`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "DICHA STUDIO",
      locale: "fr_FR",
      type: type === "music.song" || type === "profile" ? "website" : type,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export function musicRecordingJsonLd(track: {
  title: string;
  artist: string;
  slug: string;
  coverUrl: string;
  releaseDate: string;
  duration: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "MusicRecording",
    name: track.title,
    byArtist: { "@type": "MusicGroup", name: track.artist },
    url: `${siteUrl}/musique/${track.slug}`,
    image: track.coverUrl,
    datePublished: track.releaseDate,
    duration: `PT${Math.floor(track.duration / 60)}M${track.duration % 60}S`,
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "DICHA STUDIO",
    alternateName: "Dicha Multi Services",
    url: siteUrl,
    description:
      "Structure créative et audiovisuelle — production musicale et visuelle.",
  };
}
