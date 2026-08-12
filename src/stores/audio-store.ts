"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { RepeatMode, Track } from "@/types";

interface AudioState {
  currentTrack: Track | null;
  queue: Track[];
  history: Track[];
  isPlaying: boolean;
  isExpanded: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  shuffle: boolean;
  repeat: RepeatMode;
  favorites: string[];

  playTrack: (track: Track, queue?: Track[]) => void;
  togglePlay: () => void;
  pause: () => void;
  resume: () => void;
  next: () => void;
  previous: () => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  toggleShuffle: () => void;
  cycleRepeat: () => void;
  toggleExpanded: () => void;
  addToQueue: (track: Track) => void;
  removeFromQueue: (trackId: string) => void;
  reorderQueue: (fromIndex: number, toIndex: number) => void;
  clearQueue: () => void;
  toggleFavorite: (trackId: string) => void;
  setPlaying: (playing: boolean) => void;
}

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export const useAudioStore = create<AudioState>()(
  persist(
    (set, get) => ({
      currentTrack: null,
      queue: [],
      history: [],
      isPlaying: false,
      isExpanded: false,
      currentTime: 0,
      duration: 0,
      volume: 0.85,
      isMuted: false,
      shuffle: false,
      repeat: "off",
      favorites: [],

      playTrack: (track, queue) => {
        const state = get();
        const newQueue = queue ?? state.queue.length ? state.queue : [track];
        const trackIndex = newQueue.findIndex((t) => t.id === track.id);
        const orderedQueue =
          trackIndex >= 0 ? newQueue : [track, ...newQueue.filter((t) => t.id !== track.id)];

        set({
          currentTrack: track,
          queue: orderedQueue,
          isPlaying: true,
          currentTime: 0,
          history:
            state.currentTrack && state.currentTrack.id !== track.id
              ? [state.currentTrack, ...state.history].slice(0, 50)
              : state.history,
        });
      },

      togglePlay: () => set((s) => ({ isPlaying: !s.isPlaying })),
      pause: () => set({ isPlaying: false }),
      resume: () => set({ isPlaying: true }),
      setPlaying: (playing) => set({ isPlaying: playing }),

      next: () => {
        const { queue, currentTrack, shuffle, repeat } = get();
        if (!currentTrack || queue.length === 0) return;

        const currentIndex = queue.findIndex((t) => t.id === currentTrack.id);

        if (repeat === "one") {
          set({ currentTime: 0, isPlaying: true });
          return;
        }

        let nextTrack: Track | null = null;

        if (shuffle) {
          const others = queue.filter((t) => t.id !== currentTrack.id);
          nextTrack = others[Math.floor(Math.random() * others.length)] ?? null;
        } else if (currentIndex < queue.length - 1) {
          nextTrack = queue[currentIndex + 1];
        } else if (repeat === "all") {
          nextTrack = queue[0];
        }

        if (nextTrack) {
          set({
            currentTrack: nextTrack,
            isPlaying: true,
            currentTime: 0,
            history: [currentTrack, ...get().history].slice(0, 50),
          });
        } else {
          set({ isPlaying: false });
        }
      },

      previous: () => {
        const { queue, currentTrack, currentTime, history } = get();
        if (!currentTrack) return;

        if (currentTime > 3) {
          set({ currentTime: 0 });
          return;
        }

        const prevFromHistory = history[0];
        if (prevFromHistory) {
          set({
            currentTrack: prevFromHistory,
            history: history.slice(1),
            isPlaying: true,
            currentTime: 0,
          });
          return;
        }

        const currentIndex = queue.findIndex((t) => t.id === currentTrack.id);
        if (currentIndex > 0) {
          set({
            currentTrack: queue[currentIndex - 1],
            isPlaying: true,
            currentTime: 0,
          });
        }
      },

      setCurrentTime: (time) => set({ currentTime: time }),
      setDuration: (duration) => set({ duration }),
      setVolume: (volume) => set({ volume, isMuted: volume === 0 }),
      toggleMute: () => set((s) => ({ isMuted: !s.isMuted })),
      toggleShuffle: () => set((s) => ({ shuffle: !s.shuffle })),
      cycleRepeat: () =>
        set((s) => ({
          repeat: s.repeat === "off" ? "all" : s.repeat === "all" ? "one" : "off",
        })),
      toggleExpanded: () => set((s) => ({ isExpanded: !s.isExpanded })),

      addToQueue: (track) =>
        set((s) => ({
          queue: s.queue.some((t) => t.id === track.id) ? s.queue : [...s.queue, track],
        })),

      removeFromQueue: (trackId) =>
        set((s) => ({ queue: s.queue.filter((t) => t.id !== trackId) })),

      reorderQueue: (fromIndex, toIndex) =>
        set((s) => {
          const newQueue = [...s.queue];
          const [moved] = newQueue.splice(fromIndex, 1);
          newQueue.splice(toIndex, 0, moved);
          return { queue: newQueue };
        }),

      clearQueue: () => {
        const { currentTrack } = get();
        set({ queue: currentTrack ? [currentTrack] : [] });
      },

      toggleFavorite: (trackId) =>
        set((s) => ({
          favorites: s.favorites.includes(trackId)
            ? s.favorites.filter((id) => id !== trackId)
            : [...s.favorites, trackId],
        })),
    }),
    {
      name: "dicha-audio-store",
      partialize: (state) => ({
        currentTrack: state.currentTrack,
        queue: state.queue,
        volume: state.volume,
        shuffle: state.shuffle,
        repeat: state.repeat,
        favorites: state.favorites,
        currentTime: state.currentTime,
        isPlaying: state.isPlaying,
      }),
    },
  ),
);
