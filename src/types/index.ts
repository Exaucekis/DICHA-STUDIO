export type GenreSlug = "trap" | "amapiano" | "rnb" | "sebene" | string;

export interface Track {
  id: string;
  slug: string;
  title: string;
  artist: string;
  artistSlug?: string;
  genre: string;
  genreSlug: GenreSlug;
  coverUrl: string;
  coverAlt?: string;
  audioUrl: string;
  duration: number;
  releaseDate: string;
  description?: string;
  lyrics?: string;
  credits?: string;
  producer?: string;
  composer?: string;
  writers?: string;
  tags?: string[];
  downloadEnabled?: boolean;
  featured?: boolean;
  playCount?: number;
}

export interface Artist {
  id: string;
  slug: string;
  name: string;
  bio: string;
  photoUrl: string;
  photoAlt?: string;
  genre: string;
  genreSlug: GenreSlug;
  featured?: boolean;
  socialLinks?: SocialLink[];
}

export interface SocialLink {
  platform: string;
  url: string;
  label?: string;
}

export interface Video {
  id: string;
  slug: string;
  title: string;
  description?: string;
  thumbnailUrl: string;
  videoUrl: string;
  platform: "YOUTUBE" | "VIMEO" | "EXTERNAL" | "SELF_HOSTED";
  duration: number;
  releaseDate: string;
  category: string;
  categorySlug: string;
  artist?: string;
  artistSlug?: string;
  tags?: string[];
  featured?: boolean;
}

export interface Episode {
  id: string;
  slug: string;
  title: string;
  description?: string;
  thumbnailUrl: string;
  videoUrl?: string;
  platform?: "YOUTUBE" | "VIMEO" | "EXTERNAL" | "SELF_HOSTED";
  seasonNumber: number;
  episodeNumber: number;
  presenter?: string;
  guests?: string[];
  releaseDate: string;
  showSlug: string;
  showTitle: string;
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  description: string;
  imageUrl?: string;
  gallery?: string[];
  process?: { step: number; title: string; description: string }[];
  benefits?: string[];
  pricing?: string;
  faq?: { question: string; answer: string }[];
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverUrl?: string;
  category: string;
  tags: string[];
  publishedAt: string;
}

export interface PortfolioItem {
  id: string;
  slug: string;
  title: string;
  description?: string;
  imageUrl: string;
  type: string;
  projectDate: string;
  artist?: string;
  service?: string;
}

export interface SiteSettings {
  accentColor: string;
  siteName: string;
  tagline: string;
  contactEmail?: string;
  contactPhone?: string;
  contactWhatsApp?: string;
  socialLinks: SocialLink[];
}

export type RepeatMode = "off" | "all" | "one";

export interface SearchResults {
  tracks: Track[];
  artists: Artist[];
  videos: Video[];
  articles: Article[];
  services: Service[];
  episodes: Episode[];
}
