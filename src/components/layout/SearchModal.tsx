"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { searchContent } from "@/lib/data/mock-data";
import type { SearchResults } from "@/types";

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

export function SearchModal({ open, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResults | null>(null);

  useEffect(() => {
    if (!open) {
      setQuery("");
      setResults(null);
    }
  }, [open]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  useEffect(() => {
    if (query.length >= 2) {
      setResults(searchContent(query));
    } else {
      setResults(null);
    }
  }, [query]);

  if (!open) return null;

  const totalResults = results
    ? results.tracks.length +
      results.artists.length +
      results.videos.length +
      results.articles.length +
      results.services.length +
      results.episodes.length
    : 0;

  return (
    <div className="fixed inset-0 z-[90] flex items-start justify-center px-4 pt-[max(5rem,12vh)]">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      <div className="relative w-full max-w-2xl animate-[hero-fade-up_0.4s_cubic-bezier(0.16,1,0.3,1)] border border-border bg-surface shadow-2xl">
        <div className="flex items-center gap-3 border-b border-border p-4">
          <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher un morceau, artiste, vidéo..."
            className="flex-1 bg-transparent text-base text-foreground outline-none placeholder:text-muted"
            autoFocus
            aria-label="Recherche globale"
          />
          <button
            onClick={onClose}
            className="p-1 text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Fermer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-4">
          {query.length < 2 && (
            <p className="text-muted-foreground text-sm text-center py-8">
              Saisissez au moins 2 caractères pour rechercher
            </p>
          )}

          {results && totalResults === 0 && query.length >= 2 && (
            <p className="text-muted-foreground text-sm text-center py-8">
              Aucun résultat pour &quot;{query}&quot;
            </p>
          )}

          {results && totalResults > 0 && (
            <div className="space-y-6">
              {results.tracks.length > 0 && (
                <ResultSection title="Morceaux">
                  {results.tracks.map((track) => (
                    <Link
                      key={track.id}
                      href={`/musique/${track.slug}`}
                      onClick={onClose}
                      className="block py-2 hover:text-accent transition-colors"
                    >
                      {track.title} — {track.artist}
                    </Link>
                  ))}
                </ResultSection>
              )}
              {results.artists.length > 0 && (
                <ResultSection title="Artistes">
                  {results.artists.map((artist) => (
                    <Link
                      key={artist.id}
                      href={`/artistes/${artist.slug}`}
                      onClick={onClose}
                      className="block py-2 hover:text-accent transition-colors"
                    >
                      {artist.name}
                    </Link>
                  ))}
                </ResultSection>
              )}
              {results.videos.length > 0 && (
                <ResultSection title="Vidéos">
                  {results.videos.map((video) => (
                    <Link
                      key={video.id}
                      href={`/videos/${video.slug}`}
                      onClick={onClose}
                      className="block py-2 hover:text-accent transition-colors"
                    >
                      {video.title}
                    </Link>
                  ))}
                </ResultSection>
              )}
              {results.episodes.length > 0 && (
                <ResultSection title="Émissions">
                  {results.episodes.map((ep) => (
                    <Link
                      key={ep.id}
                      href={`/briefing/${ep.slug}`}
                      onClick={onClose}
                      className="block py-2 hover:text-accent transition-colors"
                    >
                      {ep.title}
                    </Link>
                  ))}
                </ResultSection>
              )}
              {results.articles.length > 0 && (
                <ResultSection title="Actualités">
                  {results.articles.map((article) => (
                    <Link
                      key={article.id}
                      href={`/actualites/${article.slug}`}
                      onClick={onClose}
                      className="block py-2 hover:text-accent transition-colors"
                    >
                      {article.title}
                    </Link>
                  ))}
                </ResultSection>
              )}
              {results.services.length > 0 && (
                <ResultSection title="Services">
                  {results.services.map((service) => (
                    <Link
                      key={service.id}
                      href={`/services/${service.slug}`}
                      onClick={onClose}
                      className="block py-2 hover:text-accent transition-colors"
                    >
                      {service.title}
                    </Link>
                  ))}
                </ResultSection>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ResultSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="text-xs uppercase tracking-widest text-accent mb-2">{title}</h3>
      <div className="space-y-1 text-sm">{children}</div>
    </div>
  );
}
