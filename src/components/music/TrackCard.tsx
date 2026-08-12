"use client";

import Image from "next/image";
import Link from "next/link";
import { Play, Plus, Share2 } from "lucide-react";
import { useAudioStore } from "@/stores/audio-store";
import type { Track } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { formatDate, formatDuration, getShareUrl } from "@/lib/utils";
import { tracks as allTracks } from "@/lib/data/mock-data";

interface TrackCardProps {
  track: Track;
  variant?: "default" | "compact";
  showShare?: boolean;
}

export function TrackCard({ track, variant = "default", showShare = false }: TrackCardProps) {
  const { currentTrack, isPlaying, playTrack, addToQueue } = useAudioStore();
  const isCurrent = currentTrack?.id === track.id;
  const isCurrentlyPlaying = isCurrent && isPlaying;

  const handlePlay = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    playTrack(track, allTracks);
  };

  const handleAddToQueue = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToQueue(track);
  };

  if (variant === "compact") {
    return (
      <div className="flex items-center gap-4 group">
        <button onClick={handlePlay} className="relative w-12 h-12 shrink-0 overflow-hidden">
          <Image src={track.coverUrl} alt="" fill className="object-cover" sizes="48px" />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Play className="w-4 h-4 fill-white text-white" />
          </div>
        </button>
        <div className="flex-1 min-w-0">
          <Link href={`/musique/${track.slug}`} className="text-sm font-medium hover:text-accent truncate block">
            {track.title}
          </Link>
          <p className="text-xs text-muted-foreground truncate">{track.artist}</p>
        </div>
        <span className="text-xs text-muted-foreground tabular-nums">{formatDuration(track.duration)}</span>
      </div>
    );
  }

  return (
    <article className="lift-hover group relative border border-border-subtle bg-surface transition-all duration-500 hover:border-accent/40">
      <Link href={`/musique/${track.slug}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-surface-elevated">
          <Image
            src={track.coverUrl}
            alt={track.coverAlt ?? track.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/20 opacity-80 transition-opacity duration-500 group-hover:opacity-90" />
          <div className="absolute inset-0 bg-accent/5 mix-blend-overlay opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <div className="absolute inset-x-0 bottom-0 flex gap-2 p-3 translate-y-0 opacity-100 transition-all duration-300 sm:translate-y-full sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 md:p-4">
            <button
              onClick={handlePlay}
              className="flex flex-1 items-center justify-center gap-2 bg-accent py-2.5 text-xs font-semibold uppercase tracking-widest text-background transition-colors hover:bg-accent-hover"
              aria-label={isCurrentlyPlaying ? "En lecture" : "Lecture"}
            >
              <Play className={cnPlayIcon(isCurrentlyPlaying)} />
              {isCurrentlyPlaying ? "En lecture" : "Play"}
            </button>
            <button
              onClick={handleAddToQueue}
              className="border border-border bg-surface-elevated p-2.5 transition-colors hover:border-accent"
              aria-label="Ajouter à la file"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="p-4">
          <Badge variant="accent" className="mb-2">
            {track.genre}
          </Badge>
          <h3 className="font-display text-base font-bold uppercase leading-tight group-hover:text-accent transition-colors">
            {track.title}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">{track.artist}</p>
          <p className="text-xs text-muted mt-2">{formatDate(track.releaseDate)}</p>
        </div>
      </Link>
      {showShare && (
        <a
          href={`https://wa.me/?text=${encodeURIComponent(`${track.title} — ${track.artist} ${getShareUrl(`/musique/${track.slug}`)}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-3 right-3 p-2 bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Partager"
        >
          <Share2 className="w-4 h-4" />
        </a>
      )}
    </article>
  );
}

function cnPlayIcon(playing: boolean) {
  return playing ? "w-4 h-4 fill-current" : "w-4 h-4 fill-current ml-0.5";
}
