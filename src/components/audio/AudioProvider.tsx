"use client";

import { AudioEngine } from "@/components/audio/AudioEngine";
import { PlayerUI } from "@/components/audio/PlayerUI";

/**
 * Architecture audio globale — montée UNE FOIS dans le Root Layout.
 *
 * ROOT LAYOUT
 *     └── AudioProvider
 *             ├── {children}        ← pages (aucun <audio>)
 *             ├── AudioEngine       ← moteur unique (currentTrack, queue, volume, progress, playing)
 *             └── PlayerUI          ← Mini / Full / Mobile (UI seulement)
 */
export function AudioProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <AudioEngine />
      <PlayerUI />
    </>
  );
}
