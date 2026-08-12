/** Images artistiques — URLs Unsplash vérifiées (studio / musique / nuit) */
const q = "w=1600&q=90&auto=format&fit=crop";

export const visuals = {
  hero: `https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=2400&q=90&auto=format&fit=crop`,
  sidebar: `https://images.unsplash.com/photo-1514525253161-7a46d19cd819?${q}`,
  sidebarAccent: `https://images.unsplash.com/photo-1520444451380-ebe0f7b9cfd5?w=800&q=90&auto=format&fit=crop`,
  studio: `https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?${q}`,
  vinyl: `https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?${q}`,
  concert: `https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?${q}`,
  neon: `https://images.unsplash.com/photo-1470225620780-dba8ba36b745?${q}`,
  portrait: `https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=1200&q=90&auto=format&fit=crop`,
  amapiano: `https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=1200&q=90&auto=format&fit=crop`,
  trap: `https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&q=90&auto=format&fit=crop`,
  rnb: `https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=1200&q=90&auto=format&fit=crop`,
  sebene: `https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&q=90&auto=format&fit=crop`,
  briefing: `https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?${q}`,
  video: `https://images.unsplash.com/photo-1571330735066-03aaa9429d89?${q}`,
  headphones: `https://images.unsplash.com/photo-1484704849700-f032a568e944?${q}`,
  crowd: `https://images.unsplash.com/photo-1501386761578-eac5c94b800a?${q}`,
  guitar: `https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?${q}`,
  vinylClose: `https://images.unsplash.com/photo-1619983081563-430f63602796?${q}`,
  event: `https://images.unsplash.com/photo-1492684223066-81342ee5ff30?${q}`,
  festival: `https://images.unsplash.com/photo-1506157786151-b8491531f063?${q}`,
  mixer: `https://images.unsplash.com/photo-1593697821252-0c9137d9fc45?${q}`,
  stage: `https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?${q}`,
  records: `https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?${q}`,
  social: `https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&q=80`,
  design: `https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80`,
  artistAlt: `https://images.unsplash.com/photo-1598387181032-a3103a2db5b3?w=1200&q=90&auto=format&fit=crop`,
} as const;

export const genreVisuals: Record<string, string> = {
  trap: visuals.trap,
  amapiano: visuals.amapiano,
  rnb: visuals.rnb,
  sebene: visuals.sebene,
};
