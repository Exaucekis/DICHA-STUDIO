"use client";

import { useEffect, useRef } from "react";
import { useAudioStore } from "@/stores/audio-store";

/**
 * Moteur audio unique — UN SEUL <audio> pour toute l'application.
 * Monté une fois dans AudioProvider, jamais recréé au changement de route.
 *
 * Responsabilités :
 * - currentTrack / src
 * - play / pause
 * - volume / mute
 * - progress / seek
 * - sync store ↔ DOM
 */
export function AudioEngine() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const seekingRef = useRef(false);

  const {
    currentTrack,
    isPlaying,
    volume,
    isMuted,
    currentTime,
    setCurrentTime,
    setDuration,
    setPlaying,
    next,
  } = useAudioStore();

  // Charger la source quand le morceau change
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    if (audio.src !== currentTrack.audioUrl) {
      audio.src = currentTrack.audioUrl;
      audio.load();
    }
  }, [currentTrack]);

  // Play / Pause
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(() => setPlaying(false));
    } else {
      audio.pause();
    }
  }, [isPlaying, setPlaying]);

  // Volume
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  // Seek depuis le store (UI)
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack || seekingRef.current) return;

    const diff = Math.abs(audio.currentTime - currentTime);
    if (diff > 0.5) {
      audio.currentTime = currentTime;
    }
  }, [currentTime, currentTrack]);

  // Événements DOM → store
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => {
      if (!seekingRef.current) {
        setCurrentTime(audio.currentTime);
      }
    };

    const onLoadedMetadata = () => setDuration(audio.duration || 0);
    const onEnded = () => next();
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);

    const onSeeking = () => {
      seekingRef.current = true;
    };

    const onSeeked = () => {
      seekingRef.current = false;
      setCurrentTime(audio.currentTime);
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("seeking", onSeeking);
    audio.addEventListener("seeked", onSeeked);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("seeking", onSeeking);
      audio.removeEventListener("seeked", onSeeked);
    };
  }, [setCurrentTime, setDuration, next, setPlaying]);

  return (
    <audio
      ref={audioRef}
      id="dicha-audio-engine"
      preload="metadata"
      crossOrigin="anonymous"
      aria-hidden
      tabIndex={-1}
      className="sr-only"
    />
  );
}
