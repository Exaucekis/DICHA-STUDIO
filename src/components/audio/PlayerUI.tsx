"use client";

import { FullPlayer } from "@/components/audio/FullPlayer";
import { MiniPlayer } from "@/components/audio/MiniPlayer";
import { MobilePlayer } from "@/components/audio/MobilePlayer";
import { useAudioStore } from "@/stores/audio-store";

/**
 * Couche UI du lecteur — aucun élément <audio> ici.
 * Lit uniquement l'état Zustand ; le moteur est dans AudioEngine.
 */
export function PlayerUI() {
  const { currentTrack, isExpanded } = useAudioStore();

  if (!currentTrack) return null;

  return (
    <>
      {isExpanded ? (
        <FullPlayer />
      ) : (
        <>
          <MobilePlayer />
          <MiniPlayer />
        </>
      )}
    </>
  );
}
