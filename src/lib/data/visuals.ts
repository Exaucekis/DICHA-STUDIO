/** Images artistiques — haute qualité, univers studio / musique / nuit */
export const visuals = {
  hero: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=2400&q=90&auto=format&fit=crop",
  sidebar: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&q=90&auto=format&fit=crop",
  sidebarAccent: "https://images.unsplash.com/photo-1614149164567-affc2a7ba8d?w=800&q=90&auto=format&fit=crop",
  studio: "https://images.unsplash.com/photo-1598488035139-bdbb2231ceea?w=1600&q=90&auto=format&fit=crop",
  vinyl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1600&q=90&auto=format&fit=crop",
  concert: "https://images.unsplash.com/photo-1459749411175-04bf8534fc33?w=1600&q=90&auto=format&fit=crop",
  neon: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1600&q=90&auto=format&fit=crop",
  portrait: "https://images.unsplash.com/photo-1516280440614-379684bb231d?w=1200&q=90&auto=format&fit=crop",
  amapiano: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=1200&q=90&auto=format&fit=crop",
  trap: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&q=90&auto=format&fit=crop",
  rnb: "https://images.unsplash.com/photo-1511379938549-c8f198794bb6?w=1200&q=90&auto=format&fit=crop",
  sebene: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&q=90&auto=format&fit=crop",
  briefing: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1600&q=90&auto=format&fit=crop",
  video: "https://images.unsplash.com/photo-1611162617474-5b21e939e113?w=1600&q=90&auto=format&fit=crop",
} as const;

export const genreVisuals: Record<string, string> = {
  trap: visuals.trap,
  amapiano: visuals.amapiano,
  rnb: visuals.rnb,
  sebene: visuals.sebene,
};
