"use client";

import Image from "next/image";
import {
  Pause,
  Play,
  SkipBack,
  SkipForward,
  ChevronUp,
} from "lucide-react";
import { useAudioStore } from "@/stores/audio-store";
import { formatDuration } from "@/lib/utils";

/**
 * Lecteur compact mobile — visible uniquement < md.
 * Contrôles larges, ergonomie tactile.
 */
export function MobilePlayer() {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    togglePlay,
    next,
    previous,
    setCurrentTime,
    toggleExpanded,
  } = useAudioStore();

  if (!currentTrack) return null;

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleSeek = (e: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const percent = (clientX - rect.left) / rect.width;
    setCurrentTime(Math.max(0, Math.min(1, percent)) * duration);
  };

  return (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass border-t border-border"
      role="region"
      aria-label="Lecteur audio mobile"
    >
      <div
        className="absolute top-0 left-0 h-1 bg-accent transition-all duration-150"
        style={{ width: `${progress}%` }}
      />

      <div
        className="absolute top-0 left-0 right-0 h-2 -translate-y-full"
        onClick={handleSeek}
        onTouchStart={handleSeek}
        role="slider"
        aria-label="Progression"
        aria-valuemin={0}
        aria-valuemax={duration}
        aria-valuenow={currentTime}
      />

      <div className="flex items-center gap-3 px-4 py-3 min-h-[64px]">
        <button
          type="button"
          onClick={toggleExpanded}
          className="flex items-center gap-3 min-w-0 flex-1"
          aria-label="Ouvrir le lecteur complet"
        >
          <div className="relative w-11 h-11 shrink-0 overflow-hidden bg-surface-elevated">
            <Image
              src={currentTrack.coverUrl}
              alt={currentTrack.coverAlt ?? currentTrack.title}
              fill
              className="object-cover"
              sizes="44px"
            />
          </div>
          <div className="min-w-0 text-left">
            <p className="text-sm font-semibold truncate leading-tight">
              {currentTrack.title}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {currentTrack.artist}
            </p>
          </div>
        </button>

        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={previous}
            className="p-3 text-muted-foreground active:text-foreground"
            aria-label="Précédent"
          >
            <SkipBack className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={togglePlay}
            className="p-3.5 bg-accent text-background active:bg-accent-hover"
            aria-label={isPlaying ? "Pause" : "Lecture"}
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 fill-current" />
            ) : (
              <Play className="w-6 h-6 fill-current ml-0.5" />
            )}
          </button>
          <button
            type="button"
            onClick={next}
            className="p-3 text-muted-foreground active:text-foreground"
            aria-label="Suivant"
          >
            <SkipForward className="w-5 h-5" />
          </button>
        </div>

        <button
          type="button"
          onClick={toggleExpanded}
          className="p-2 text-muted-foreground shrink-0"
          aria-label="Agrandir"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      </div>

      <div className="px-4 pb-2 flex justify-between text-[10px] text-muted tabular-nums">
        <span>{formatDuration(currentTime)}</span>
        <span>{formatDuration(duration)}</span>
      </div>
    </div>
  );
}
