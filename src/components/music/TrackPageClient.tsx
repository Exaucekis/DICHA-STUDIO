"use client";

import Image from "next/image";
import Link from "next/link";
import { Play, Download, Plus } from "lucide-react";
import { notFound } from "next/navigation";
import {
  getTrackBySlug,
  getRelatedTracks,
  tracks,
} from "@/lib/data/mock-data";
import { useAudioStore } from "@/stores/audio-store";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ShareButtons } from "@/components/ui/ShareButtons";
import { TrackCard } from "@/components/music/TrackCard";
import { formatDate, formatDuration, getShareUrl } from "@/lib/utils";

interface TrackPageClientProps {
  slug: string;
}

export function TrackPageClient({ slug }: TrackPageClientProps) {
  const track = getTrackBySlug(slug);
  const { playTrack, addToQueue, currentTrack, isPlaying } = useAudioStore();

  if (!track) notFound();

  const related = getRelatedTracks(slug);
  const isCurrent = currentTrack?.id === track.id;
  const isCurrentlyPlaying = isCurrent && isPlaying;

  return (
    <div className="section-padding">
      <div className="container-dicha">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="relative aspect-square max-w-lg mx-auto lg:mx-0 w-full overflow-hidden border border-border">
            <Image
              src={track.coverUrl}
              alt={track.coverAlt ?? track.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 500px"
              priority
            />
          </div>

          <div>
            <Badge variant="accent">{track.genre}</Badge>
            <h1 className="font-display text-4xl md:text-5xl font-bold uppercase mt-4">
              {track.title}
            </h1>
            {track.artistSlug ? (
              <Link
                href={`/artistes/${track.artistSlug}`}
                className="text-xl text-muted-foreground hover:text-accent mt-2 inline-block transition-colors"
              >
                {track.artist}
              </Link>
            ) : (
              <p className="text-xl text-muted-foreground mt-2">{track.artist}</p>
            )}

            <div className="flex flex-wrap gap-4 mt-4 text-sm text-muted-foreground">
              <span>{formatDuration(track.duration)}</span>
              <span>·</span>
              <span>{formatDate(track.releaseDate)}</span>
              {track.playCount && (
                <>
                  <span>·</span>
                  <span>{track.playCount.toLocaleString("fr-FR")} lectures</span>
                </>
              )}
            </div>

            <div className="flex flex-wrap gap-3 mt-8">
              <Button
                onClick={() => playTrack(track, tracks)}
                size="lg"
              >
                <Play className="w-4 h-4 fill-current" />
                {isCurrentlyPlaying ? "En lecture" : "Écouter"}
              </Button>
              <Button
                variant="outline"
                onClick={() => addToQueue(track)}
              >
                <Plus className="w-4 h-4" />
                File d&apos;attente
              </Button>
              {track.downloadEnabled && (
                <Button variant="ghost" href={track.audioUrl}>
                  <Download className="w-4 h-4" />
                  Télécharger
                </Button>
              )}
            </div>

            <ShareButtons
              url={getShareUrl(`/musique/${track.slug}`)}
              title={`${track.title} — ${track.artist}`}
              className="mt-8"
            />

            {track.description && (
              <div className="mt-10">
                <h2 className="text-xs uppercase tracking-widest text-accent mb-3">
                  Description
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {track.description}
                </p>
              </div>
            )}

            {(track.producer || track.composer || track.writers || track.credits) && (
              <div className="mt-8 border border-border p-6 bg-surface">
                <h2 className="text-xs uppercase tracking-widest text-accent mb-4">
                  Crédits
                </h2>
                <dl className="space-y-2 text-sm">
                  {track.producer && (
                    <>
                      <dt className="text-muted-foreground">Producteur</dt>
                      <dd>{track.producer}</dd>
                    </>
                  )}
                  {track.composer && (
                    <>
                      <dt className="text-muted-foreground mt-2">Compositeur</dt>
                      <dd>{track.composer}</dd>
                    </>
                  )}
                  {track.writers && (
                    <>
                      <dt className="text-muted-foreground mt-2">Auteurs</dt>
                      <dd>{track.writers}</dd>
                    </>
                  )}
                  {track.credits && (
                    <>
                      <dt className="text-muted-foreground mt-2">Crédits</dt>
                      <dd>{track.credits}</dd>
                    </>
                  )}
                </dl>
              </div>
            )}

            {track.lyrics && (
              <div className="mt-8">
                <h2 className="text-xs uppercase tracking-widest text-accent mb-3">
                  Paroles
                </h2>
                <pre className="text-muted-foreground whitespace-pre-wrap font-sans text-sm leading-relaxed">
                  {track.lyrics}
                </pre>
              </div>
            )}
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-20">
            <h2 className="font-display text-2xl font-bold uppercase mb-8">
              Vous pourriez aussi aimer
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {related.map((t) => (
                <TrackCard key={t.id} track={t} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
