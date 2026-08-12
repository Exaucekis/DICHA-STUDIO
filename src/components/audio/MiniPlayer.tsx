"use client";

import Image from "next/image";
import {
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Maximize2,
  Heart,
  ListMusic,
} from "lucide-react";
import { useAudioStore } from "@/stores/audio-store";
import { formatDuration } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function MiniPlayer() {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    isExpanded,
    favorites,
    togglePlay,
    next,
    previous,
    setCurrentTime,
    setVolume,
    toggleMute,
    toggleExpanded,
    toggleFavorite,
  } = useAudioStore();

  if (!currentTrack || isExpanded) return null;

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const isFavorite = favorites.includes(currentTrack.id);

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    setCurrentTime(percent * duration);
  };

  return (
    <div
      className="hidden md:block fixed bottom-0 left-0 right-0 z-50 glass border-t border-border"
      role="region"
      aria-label="Lecteur audio"
    >
      <div
        className="absolute top-0 left-0 h-0.5 bg-accent transition-all duration-150"
        style={{ width: `${progress}%` }}
      />

      <div className="container-dicha flex items-center gap-3 md:gap-6 px-4 h-[var(--player-height)]">
        <button
          onClick={toggleExpanded}
          className="flex items-center gap-3 min-w-0 flex-1 group"
          aria-label="Ouvrir le lecteur complet"
        >
          <div className="relative w-12 h-12 shrink-0 overflow-hidden bg-surface-elevated">
            <Image
              src={currentTrack.coverUrl}
              alt={currentTrack.coverAlt ?? currentTrack.title}
              fill
              className="object-cover"
              sizes="48px"
            />
            {isPlaying && (
              <div className="absolute inset-0 bg-black/40 flex items-end justify-center gap-0.5 pb-1">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-0.5 bg-accent equalizer-bar"
                    style={{ height: "40%" }}
                  />
                ))}
              </div>
            )}
          </div>
          <div className="min-w-0 text-left hidden sm:block">
            <p className="text-sm font-semibold truncate group-hover:text-accent transition-colors">
              {currentTrack.title}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {currentTrack.artist} · {currentTrack.genre}
            </p>
          </div>
        </button>

        <div className="flex items-center gap-2 md:gap-4">
          <button
            onClick={previous}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Morceau précédent"
          >
            <SkipBack className="w-4 h-4" />
          </button>
          <button
            onClick={togglePlay}
            className="p-2.5 bg-accent text-background hover:bg-accent-hover transition-colors"
            aria-label={isPlaying ? "Pause" : "Lecture"}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-current" />
            ) : (
              <Play className="w-5 h-5 fill-current ml-0.5" />
            )}
          </button>
          <button
            onClick={next}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Morceau suivant"
          >
            <SkipForward className="w-4 h-4" />
          </button>
        </div>

        <div className="hidden md:flex items-center gap-3 flex-1 max-w-md">
          <span className="text-xs text-muted-foreground tabular-nums w-10 text-right">
            {formatDuration(currentTime)}
          </span>
          <div
            className="flex-1 h-1 bg-surface-hover cursor-pointer group"
            onClick={handleSeek}
            role="slider"
            aria-label="Progression"
            aria-valuemin={0}
            aria-valuemax={duration}
            aria-valuenow={currentTime}
          >
            <div
              className="h-full bg-accent group-hover:bg-accent-hover transition-colors"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-xs text-muted-foreground tabular-nums w-10">
            {formatDuration(duration)}
          </span>
        </div>

        <div className="hidden lg:flex items-center gap-2">
          <button
            onClick={() => toggleFavorite(currentTrack.id)}
            className={cn(
              "p-2 transition-colors",
              isFavorite ? "text-accent" : "text-muted-foreground hover:text-foreground",
            )}
            aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
          >
            <Heart className={cn("w-4 h-4", isFavorite && "fill-current")} />
          </button>
          <button
            onClick={toggleExpanded}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="File d'attente"
          >
            <ListMusic className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleMute}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label={isMuted ? "Activer le son" : "Couper le son"}
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={isMuted ? 0 : volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-20 accent-accent"
              aria-label="Volume"
            />
          </div>
          <button
            onClick={toggleExpanded}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Agrandir le lecteur"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

        <button
          type="button"
          onClick={toggleExpanded}
          className="p-2 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Agrandir le lecteur"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
