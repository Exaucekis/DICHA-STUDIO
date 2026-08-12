import type {
  Artist,
  Article,
  Episode,
  PortfolioItem,
  Service,
  SiteSettings,
  Track,
  Video,
} from "@/types";
import { visuals } from "@/lib/data/visuals";

const DEMO_AUDIO =
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

export const siteSettings: SiteSettings = {
  accentColor: "#03A7A8",
  siteName: "DICHA STUDIO",
  tagline: "Dicha Multi Services",
  contactEmail: "contact@dichastudio.com",
  contactPhone: "0977 893 094",
  contactWhatsApp: "243977893094",
  socialLinks: [],
};

export const genres = [
  { name: "TRAP", slug: "trap", color: "#03A7A8" },
  { name: "AMAPIANO", slug: "amapiano", color: "#7B5EA7" },
  { name: "R&B", slug: "rnb", color: "#E85D75" },
  { name: "SÉBÈNE", slug: "sebene", color: "#4ECDC4" },
];

export const tracks: Track[] = [
  {
    id: "1",
    slug: "midnight-pulse",
    title: "Midnight Pulse",
    artist: "DICHA Collective",
    artistSlug: "dicha-collective",
    genre: "AMAPIANO",
    genreSlug: "amapiano",
    coverUrl: visuals.amapiano,
    coverAlt: "Pochette Midnight Pulse",
    audioUrl: DEMO_AUDIO,
    duration: 245,
    releaseDate: "2026-03-15",
    description:
      "Un morceau amapiano immersif, pensé pour les nuits urbaines et les scènes créatives.",
    producer: "DICHA STUDIO",
    composer: "DICHA Collective",
    downloadEnabled: false,
    featured: true,
    playCount: 1240,
    tags: ["amapiano", "nouvelle sortie", "dicha studio"],
  },
  {
    id: "2",
    slug: "urban-echo",
    title: "Urban Echo",
    artist: "KZ Flow",
    artistSlug: "kz-flow",
    genre: "TRAP",
    genreSlug: "trap",
    coverUrl: visuals.trap,
    coverAlt: "Pochette Urban Echo",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    duration: 198,
    releaseDate: "2026-02-28",
    description: "Trap moderne, textures sombres et énergie cinématographique.",
    producer: "DICHA STUDIO",
    downloadEnabled: true,
    featured: true,
    playCount: 890,
    tags: ["trap", "urbain"],
  },
  {
    id: "3",
    slug: "velours-noir",
    title: "Velours Noir",
    artist: "Maya R.",
    artistSlug: "maya-r",
    genre: "R&B",
    genreSlug: "rnb",
    coverUrl: visuals.rnb,
    coverAlt: "Pochette Velours Noir",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    duration: 214,
    releaseDate: "2026-01-20",
    description: "R&B sensuel et élégant, production soignée au studio DICHA.",
    producer: "DICHA STUDIO",
    featured: true,
    playCount: 654,
  },
  {
    id: "4",
    slug: "rituel-urbain",
    title: "Rituel Urbain",
    artist: "DICHA Collective",
    artistSlug: "dicha-collective",
    genre: "SÉBÈNE",
    genreSlug: "sebene",
    coverUrl: visuals.sebene,
    coverAlt: "Pochette Rituel Urbain",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    duration: 267,
    releaseDate: "2025-12-10",
    description: "Fusion contemporaine entre tradition et modernité sonore.",
    producer: "DICHA STUDIO",
    playCount: 432,
  },
  {
    id: "5",
    slug: "night-drive",
    title: "Night Drive",
    artist: "KZ Flow",
    artistSlug: "kz-flow",
    genre: "TRAP",
    genreSlug: "trap",
    coverUrl: visuals.neon,
    coverAlt: "Pochette Night Drive",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    duration: 183,
    releaseDate: "2025-11-05",
    producer: "DICHA STUDIO",
    playCount: 321,
  },
  {
    id: "6",
    slug: "golden-hour",
    title: "Golden Hour",
    artist: "Maya R.",
    artistSlug: "maya-r",
    genre: "R&B",
    genreSlug: "rnb",
    coverUrl: visuals.concert,
    coverAlt: "Pochette Golden Hour",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    duration: 201,
    releaseDate: "2025-10-18",
    producer: "DICHA STUDIO",
    playCount: 567,
  },
];

export const artists: Artist[] = [
  {
    id: "1",
    slug: "dicha-collective",
    name: "DICHA Collective",
    bio: "Collectif créatif porté par DICHA STUDIO, à la croisée de la musique, de l'image et de la culture urbaine.",
    photoUrl: visuals.portrait,
    photoAlt: "DICHA Collective",
    genre: "AMAPIANO",
    genreSlug: "amapiano",
    featured: true,
    socialLinks: [],
  },
  {
    id: "2",
    slug: "kz-flow",
    name: "KZ Flow",
    bio: "Artiste trap aux productions cinématographiques, signé DICHA STUDIO.",
    photoUrl: visuals.neon,
    photoAlt: "KZ Flow",
    genre: "TRAP",
    genreSlug: "trap",
    featured: true,
    socialLinks: [],
  },
  {
    id: "3",
    slug: "maya-r",
    name: "Maya R.",
    bio: "Voix R&B contemporaine, esthétique premium et écritures sensibles.",
    photoUrl: visuals.artistAlt,
    genre: "R&B",
    genreSlug: "rnb",
    featured: true,
    socialLinks: [],
  },
];

export const videos: Video[] = [
  {
    id: "1",
    slug: "midnight-pulse-clip",
    title: "Midnight Pulse — Clip officiel",
    description: "Clip officiel du morceau Midnight Pulse.",
    thumbnailUrl: visuals.video,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    platform: "YOUTUBE",
    duration: 245,
    releaseDate: "2026-03-20",
    category: "CLIPS",
    categorySlug: "clips",
    artist: "DICHA Collective",
    artistSlug: "dicha-collective",
    featured: true,
  },
  {
    id: "2",
    slug: "urban-echo-teaser",
    title: "Urban Echo — Teaser",
    thumbnailUrl: visuals.crowd,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    platform: "YOUTUBE",
    duration: 45,
    releaseDate: "2026-02-25",
    category: "TEASERS",
    categorySlug: "teasers",
    artist: "KZ Flow",
    featured: true,
  },
  {
    id: "3",
    slug: "studio-session-behind",
    title: "Session studio — Coulisses",
    thumbnailUrl: visuals.studio,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    platform: "YOUTUBE",
    duration: 312,
    releaseDate: "2026-01-15",
    category: "BEHIND THE SCENES",
    categorySlug: "behind-the-scenes",
    featured: true,
  },
  {
    id: "4",
    slug: "dicha-briefing-s1e1",
    title: "DICHA Briefing — Épisode 01",
    thumbnailUrl: visuals.briefing,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    platform: "YOUTUBE",
    duration: 1840,
    releaseDate: "2026-02-01",
    category: "ÉMISSIONS",
    categorySlug: "emissions",
    featured: true,
  },
];

export const episodes: Episode[] = [
  {
    id: "1",
    slug: "episode-01-lancement",
    title: "Lancement — La vision DICHA",
    description:
      "Premier épisode de DICHA Briefing : musique, image et culture au cœur du studio.",
    thumbnailUrl: visuals.briefing,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    platform: "YOUTUBE",
    seasonNumber: 1,
    episodeNumber: 1,
    presenter: "DICHA STUDIO",
    guests: ["DICHA Collective"],
    releaseDate: "2026-02-01",
    showSlug: "dicha-briefing",
    showTitle: "DICHA Briefing",
  },
  {
    id: "2",
    slug: "episode-02-trap-culture",
    title: "Trap & Culture urbaine",
    description: "Exploration de la scène trap et des tendances créatives.",
    thumbnailUrl: visuals.trap,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    platform: "YOUTUBE",
    seasonNumber: 1,
    episodeNumber: 2,
    presenter: "DICHA STUDIO",
    guests: ["KZ Flow"],
    releaseDate: "2026-02-15",
    showSlug: "dicha-briefing",
    showTitle: "DICHA Briefing",
  },
];

export const services: Service[] = [
  {
    id: "1",
    slug: "enregistrement",
    title: "Enregistrement",
    description:
      "Sessions d'enregistrement professionnelles dans un environnement studio optimisé pour la voix, les instruments et les performances live.",
    imageUrl: visuals.studio,
    process: [
      { step: 1, title: "Brief", description: "Compréhension du projet et des attentes artistiques." },
      { step: 2, title: "Préparation", description: "Configuration studio et tests sonores." },
      { step: 3, title: "Session", description: "Enregistrement guidé par nos ingénieurs." },
      { step: 4, title: "Livraison", description: "Fichiers bruts ou pré-mix selon le besoin." },
    ],
    benefits: ["Acoustique professionnelle", "Ingénieurs expérimentés", "Workflow optimisé"],
  },
  {
    id: "2",
    slug: "mixage-mastering",
    title: "Mixage & Mastering",
    description:
      "Traitement audio premium pour donner profondeur, clarté et impact à vos productions musicales.",
    imageUrl: visuals.studio,
    process: [
      { step: 1, title: "Évaluation", description: "Analyse des stems et objectifs sonores." },
      { step: 2, title: "Traitement", description: "Nettoyage et préparation des pistes." },
      { step: 3, title: "Mixage", description: "Équilibre, spatialisation et dynamique." },
      { step: 4, title: "Mastering", description: "Finition pour toutes les plateformes." },
      { step: 5, title: "Livraison", description: "Formats streaming et haute qualité." },
    ],
    benefits: ["Rendu professionnel", "Compatible streaming", "Révisions incluses"],
    faq: [
      {
        question: "Quels formats acceptez-vous ?",
        answer: "WAV, AIFF, stems ou projet selon votre workflow.",
      },
    ],
  },
  {
    id: "3",
    slug: "production-musicale",
    title: "Production musicale",
    description:
      "Création de beats, arrangements et direction artistique pour vos projets musicaux.",
    imageUrl: visuals.rnb,
    benefits: ["TRAP", "AMAPIANO", "R&B", "SÉBÈNE"],
  },
  {
    id: "4",
    slug: "tournage-realisation",
    title: "Tournage & Réalisation",
    description:
      "Production audiovisuelle complète : clips, trailers, teasers et contenus premium.",
    imageUrl: visuals.video,
    benefits: ["Direction artistique", "Équipe complète", "Post-production intégrée"],
  },
  {
    id: "5",
    slug: "montage-video",
    title: "Montage vidéo",
    description: "Montage cinématographique, étalonnage et finition pour tous formats.",
    imageUrl: visuals.mixer,
  },
  {
    id: "6",
    slug: "design-graphique",
    title: "Design graphique",
    description: "Identité visuelle, pochettes, visuels promo et direction créative.",
    imageUrl: visuals.design,
  },
  {
    id: "7",
    slug: "promotion",
    title: "Promotion",
    description: "Stratégie de visibilité digitale pour vos sorties et projets artistiques.",
    imageUrl: visuals.social,
  },
  {
    id: "8",
    slug: "emissions",
    title: "Émissions",
    description: "Production et diffusion de programmes audiovisuels comme DICHA Briefing.",
    imageUrl: visuals.briefing,
  },
];

export const articles: Article[] = [
  {
    id: "1",
    slug: "nouvelle-sortie-midnight-pulse",
    title: "Nouvelle sortie : Midnight Pulse",
    excerpt: "Découvrez la dernière production amapiano signée DICHA STUDIO.",
    content:
      "DICHA STUDIO annonce la sortie de Midnight Pulse, un morceau amapiano immersif porté par DICHA Collective.",
    coverUrl: visuals.amapiano,
    category: "Sorties",
    tags: ["amapiano", "sortie", "dicha studio"],
    publishedAt: "2026-03-15",
  },
  {
    id: "2",
    slug: "dicha-briefing-saison-1",
    title: "DICHA Briefing — Saison 1",
    excerpt: "Le programme audiovisuel de DICHA STUDIO démarre sa première saison.",
    content:
      "DICHA Briefing explore la culture musicale et audiovisuelle à travers des épisodes, invités et coulisses du studio.",
    coverUrl: visuals.briefing,
    category: "Émissions",
    tags: ["briefing", "émission", "studio"],
    publishedAt: "2026-02-01",
  },
];

export const portfolioItems: PortfolioItem[] = [
  {
    id: "1",
    slug: "midnight-pulse-production",
    title: "Midnight Pulse — Production complète",
    description: "Production, mixage et visuel pour la sortie amapiano.",
    imageUrl: visuals.amapiano,
    type: "Production musicale",
    projectDate: "2026-03-15",
    artist: "DICHA Collective",
    service: "Production musicale",
  },
  {
    id: "2",
    slug: "urban-echo-clip",
    title: "Urban Echo — Clip",
    imageUrl: visuals.video,
    type: "Clip",
    projectDate: "2026-02-28",
    artist: "KZ Flow",
    service: "Tournage & Réalisation",
  },
];

export function getTrackBySlug(slug: string): Track | undefined {
  return tracks.find((t) => t.slug === slug);
}

export function getArtistBySlug(slug: string): Artist | undefined {
  return artists.find((a) => a.slug === slug);
}

export function getVideoBySlug(slug: string): Video | undefined {
  return videos.find((v) => v.slug === slug);
}

export function getEpisodeBySlug(slug: string): Episode | undefined {
  return episodes.find((e) => e.slug === slug);
}

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getTracksByArtist(artistSlug: string): Track[] {
  return tracks.filter((t) => t.artistSlug === artistSlug);
}

export function getVideosByArtist(artistSlug: string): Video[] {
  return videos.filter((v) => v.artistSlug === artistSlug);
}

export function getTracksByGenre(genreSlug: string): Track[] {
  if (genreSlug === "tous" || genreSlug === "all") return tracks;
  return tracks.filter((t) => t.genreSlug === genreSlug);
}

export function getFeaturedTracks(): Track[] {
  return tracks.filter((t) => t.featured);
}

export function getLatestTracks(limit = 4): Track[] {
  return [...tracks]
    .sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime())
    .slice(0, limit);
}

export function getRelatedTracks(currentSlug: string, limit = 4): Track[] {
  const current = getTrackBySlug(currentSlug);
  if (!current) return tracks.slice(0, limit);
  return tracks
    .filter((t) => t.slug !== currentSlug && t.genreSlug === current.genreSlug)
    .slice(0, limit);
}

export function getRelatedVideos(currentSlug: string, limit = 3): Video[] {
  return videos.filter((v) => v.slug !== currentSlug).slice(0, limit);
}

export function searchContent(query: string) {
  const q = query.toLowerCase().trim();
  if (!q) {
    return { tracks: [], artists: [], videos: [], articles: [], services: [], episodes: [] };
  }

  const match = (text: string) => text.toLowerCase().includes(q);

  return {
    tracks: tracks.filter(
      (t) =>
        match(t.title) ||
        match(t.artist) ||
        match(t.genre) ||
        t.tags?.some(match),
    ),
    artists: artists.filter(
      (a) => match(a.name) || match(a.bio) || match(a.genre),
    ),
    videos: videos.filter(
      (v) =>
        match(v.title) ||
        match(v.category) ||
        (v.artist && match(v.artist)),
    ),
    articles: articles.filter(
      (a) =>
        match(a.title) ||
        match(a.excerpt) ||
        a.tags.some(match),
    ),
    services: services.filter(
      (s) => match(s.title) || match(s.description),
    ),
    episodes: episodes.filter(
      (e) =>
        match(e.title) ||
        match(e.description ?? "") ||
        match(e.showTitle),
    ),
  };
}
