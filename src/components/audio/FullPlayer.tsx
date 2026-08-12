"use client";

import Image from "next/image";
import {
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  X,
  Shuffle,
  Repeat,
  Repeat1,
  Heart,
  Share2,
  Download,
  Trash2,
  GripVertical,
} from "lucide-react";
import { useAudioStore } from "@/stores/audio-store";
import { formatDuration, getShareUrl } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { ShareButtons } from "@/components/ui/ShareButtons";

export function FullPlayer() {
  const {
    currentTrack,
    isPlaying,
    isExpanded,
    currentTime,
    duration,
    volume,
    isMuted,
    shuffle,
    repeat,
    queue,
    favorites,
    togglePlay,
    next,
    previous,
    setCurrentTime,
    setVolume,
    toggleMute,
    toggleExpanded,
    toggleShuffle,
    cycleRepeat,
    toggleFavorite,
    removeFromQueue,
    clearQueue,
    playTrack,
  } = useAudioStore();

  if (!currentTrack || !isExpanded) return null;

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const isFavorite = favorites.includes(currentTrack.id);

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    setCurrentTime(percent * duration);
  };

  return (
    <div
      className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl flex flex-col"
      role="dialog"
      aria-label="Lecteur audio complet"
    >
      <div className="flex items-center justify-between p-4 md:p-6 border-b border-border">
        <button
          onClick={toggleExpanded}
          className="p-2 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Réduire le lecteur"
        >
          <X className="w-6 h-6" />
        </button>
        <p className="text-xs uppercase tracking-widest text-muted-foreground">
          En lecture
        </p>
        <div className="w-10" />
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="container-dicha py-8 md:py-12 grid lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col items-center">
            <div className="relative w-full max-w-md aspect-square overflow-hidden bg-surface-elevated shadow-2xl">
              <Image
                src={currentTrack.coverUrl}
                alt={currentTrack.coverAlt ?? currentTrack.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 400px"
                priority
              />
              {isPlaying && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              )}
            </div>

            <div className="mt-8 text-center w-full max-w-md">
              <h2 className="font-display text-2xl md:text-3xl font-bold uppercase">
                {currentTrack.title}
              </h2>
              <p className="text-muted-foreground mt-2">{currentTrack.artist}</p>
              <p className="text-accent text-xs uppercase tracking-widest mt-1">
                {currentTrack.genre}
              </p>
            </div>

            <div className="w-full max-w-md mt-8 space-y-2">
              <div
                className="h-1 bg-surface-hover cursor-pointer group"
                onClick={handleSeek}
                role="slider"
                aria-label="Progression"
              >
                <div
                  className="h-full bg-accent group-hover:bg-accent-hover transition-colors"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground tabular-nums">
                <span>{formatDuration(currentTime)}</span>
                <span>{formatDuration(duration)}</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 md:gap-6 mt-8">
              <button
                onClick={toggleShuffle}
                className={cn(
                  "p-2 transition-colors",
                  shuffle ? "text-accent" : "text-muted-foreground hover:text-foreground",
                )}
                aria-label="Lecture aléatoire"
              >
                <Shuffle className="w-5 h-5" />
              </button>
              <button
                onClick={previous}
                className="p-3 text-foreground hover:text-accent transition-colors"
                aria-label="Précédent"
              >
                <SkipBack className="w-6 h-6" />
              </button>
              <button
                onClick={togglePlay}
                className="p-5 bg-accent text-background hover:bg-accent-hover transition-colors"
                aria-label={isPlaying ? "Pause" : "Lecture"}
              >
                {isPlaying ? (
                  <Pause className="w-8 h-8 fill-current" />
                ) : (
                  <Play className="w-8 h-8 fill-current ml-1" />
                )}
              </button>
              <button
                onClick={next}
                className="p-3 text-foreground hover:text-accent transition-colors"
                aria-label="Suivant"
              >
                <SkipForward className="w-6 h-6" />
              </button>
              <button
                onClick={cycleRepeat}
                className={cn(
                  "p-2 transition-colors",
                  repeat !== "off" ? "text-accent" : "text-muted-foreground hover:text-foreground",
                )}
                aria-label="Répéter"
              >
                {repeat === "one" ? (
                  <Repeat1 className="w-5 h-5" />
                ) : (
                  <Repeat className="w-5 h-5" />
                )}
              </button>
            </div>

            <div className="flex items-center gap-4 mt-6">
              <button
                onClick={() => toggleFavorite(currentTrack.id)}
                className={cn(
                  "p-2 transition-colors",
                  isFavorite ? "text-accent" : "text-muted-foreground hover:text-foreground",
                )}
                aria-label="Favori"
              >
                <Heart className={cn("w-5 h-5", isFavorite && "fill-current")} />
              </button>
              <ShareButtons
                url={getShareUrl(`/musique/${currentTrack.slug}`)}
                title={`${currentTrack.title} — ${currentTrack.artist}`}
              />
              {currentTrack.downloadEnabled && (
                <a
                  href={currentTrack.audioUrl}
                  download
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Télécharger"
                >
                  <Download className="w-5 h-5" />
                </a>
              )}
            </div>

            <div className="flex items-center gap-3 mt-6 w-full max-w-md">
              <button onClick={toggleMute} aria-label="Volume">
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <Volume2 className="w-5 h-5 text-muted-foreground" />
                )}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={isMuted ? 0 : volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="flex-1 accent-accent"
                aria-label="Volume"
              />
            </div>
          </div>

          <div className="border border-border bg-surface p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-lg uppercase tracking-wide">
                File d&apos;attente
              </h3>
              {queue.length > 1 && (
                <button
                  onClick={clearQueue}
                  className="text-xs text-muted-foreground hover:text-accent uppercase tracking-widest flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" />
                  Vider
                </button>
              )}
            </div>
            <ul className="space-y-2 max-h-[50vh] overflow-y-auto hide-scrollbar">
              {queue.map((track, index) => (
                <li
                  key={`${track.id}-${index}`}
                  className={cn(
                    "flex items-center gap-3 p-3 group transition-colors",
                    track.id === currentTrack.id
                      ? "bg-accent-muted border-l-2 border-accent"
                      : "hover:bg-surface-hover",
                  )}
                >
                  <GripVertical className="w-4 h-4 text-muted shrink-0 opacity-0 group-hover:opacity-100" />
                  <button
                    onClick={() => playTrack(track, queue)}
                    className="flex items-center gap-3 flex-1 min-w-0 text-left"
                  >
                    <div className="relative w-10 h-10 shrink-0 overflow-hidden">
                      <Image
                        src={track.coverUrl}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="40px"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{track.title}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        {track.artist}
                      </p>
                    </div>
                  </button>
                  <span className="text-xs text-muted-foreground tabular-nums shrink-0">
                    {formatDuration(track.duration)}
                  </span>
                  {queue.length > 1 && track.id !== currentTrack.id && (
                    <button
                      onClick={() => removeFromQueue(track.id)}
                      className="p-1 text-muted-foreground hover:text-accent opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label="Retirer de la file"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
