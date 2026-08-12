import { notFound } from "next/navigation";
import { getTrackBySlug, tracks } from "@/lib/data/mock-data";
import { createMetadata, musicRecordingJsonLd } from "@/lib/seo";
import { TrackPageClient } from "@/components/music/TrackPageClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return tracks.map((track) => ({ slug: track.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const track = getTrackBySlug(slug);
  if (!track) return {};

  return createMetadata({
    title: `${track.title} — ${track.artist}`,
    description: track.description ?? `Écoutez ${track.title} par ${track.artist} sur DICHA STUDIO.`,
    path: `/musique/${slug}`,
    image: track.coverUrl,
    type: "music.song",
  });
}

export default async function TrackPage({ params }: PageProps) {
  const { slug } = await params;
  const track = getTrackBySlug(slug);
  if (!track) notFound();

  const jsonLd = musicRecordingJsonLd(track);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TrackPageClient slug={slug} />
    </>
  );
}
