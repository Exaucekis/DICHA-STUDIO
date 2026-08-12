import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  artists,
  getArtistBySlug,
  getTracksByArtist,
  getVideosByArtist,
} from "@/lib/data/mock-data";
import { createMetadata } from "@/lib/seo";
import { Badge } from "@/components/ui/Badge";
import { TrackCard } from "@/components/music/TrackCard";
import { ShareButtons } from "@/components/ui/ShareButtons";
import { getShareUrl } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return artists.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const artist = getArtistBySlug(slug);
  if (!artist) return {};
  return createMetadata({
    title: artist.name,
    description: artist.bio,
    path: `/artistes/${slug}`,
    image: artist.photoUrl,
    type: "profile",
  });
}

export default async function ArtistPage({ params }: PageProps) {
  const { slug } = await params;
  const artist = getArtistBySlug(slug);
  if (!artist) notFound();

  const artistTracks = getTracksByArtist(slug);
  const artistVideos = getVideosByArtist(slug);

  return (
    <div>
      <section className="relative h-[50vh] min-h-[400px]">
        <Image
          src={artist.photoUrl}
          alt={artist.photoAlt ?? artist.name}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute bottom-0 container-dicha section-padding pb-8">
          <Badge variant="accent">{artist.genre}</Badge>
          <h1 className="font-display text-4xl md:text-6xl font-bold uppercase mt-4">
            {artist.name}
          </h1>
        </div>
      </section>

      <div className="container-dicha section-padding">
        <section className="max-w-3xl">
          <h2 className="text-xs uppercase tracking-widest text-accent mb-4">Bio</h2>
          <p className="text-muted-foreground text-lg leading-relaxed">{artist.bio}</p>
          <ShareButtons
            url={getShareUrl(`/artistes/${artist.slug}`)}
            title={artist.name}
            className="mt-8"
          />
        </section>

        {artistTracks.length > 0 && (
          <section className="mt-16">
            <h2 className="font-display text-2xl font-bold uppercase mb-8">Musique</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {artistTracks.map((track) => (
                <TrackCard key={track.id} track={track} />
              ))}
            </div>
          </section>
        )}

        {artistVideos.length > 0 && (
          <section className="mt-16">
            <h2 className="font-display text-2xl font-bold uppercase mb-8">Vidéos</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {artistVideos.map((video) => (
                <Link key={video.id} href={`/videos/${video.slug}`} className="group">
                  <div className="relative aspect-video overflow-hidden border border-border">
                    <Image
                      src={video.thumbnailUrl}
                      alt={video.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                      sizes="33vw"
                    />
                  </div>
                  <h3 className="mt-3 font-display uppercase text-sm group-hover:text-accent">
                    {video.title}
                  </h3>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
