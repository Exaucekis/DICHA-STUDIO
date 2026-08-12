"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { tracks, genres, getTracksByGenre } from "@/lib/data/mock-data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TrackCard } from "@/components/music/TrackCard";
import { cn } from "@/lib/utils";

function MusiqueCatalogInner() {
  const searchParams = useSearchParams();
  const genreParam = searchParams.get("genre");
  const [activeGenre, setActiveGenre] = useState("tous");

  useEffect(() => {
    if (genreParam && genres.some((g) => g.slug === genreParam)) {
      setActiveGenre(genreParam);
    }
  }, [genreParam]);

  const filtered =
    activeGenre === "tous" ? tracks : getTracksByGenre(activeGenre);

  const filters = [{ name: "TOUS", slug: "tous" }, ...genres];

  return (
    <div className="section-padding">
      <div className="container-dicha">
        <SectionHeading
          title="Musique"
          subtitle="Explorez le catalogue DICHA STUDIO. Filtrez par genre et écoutez en continu."
        />

        <div className="flex flex-wrap gap-2 mb-10">
          {filters.map((genre) => (
            <button
              key={genre.slug}
              type="button"
              onClick={() => setActiveGenre(genre.slug)}
              className={cn(
                "px-4 py-2.5 text-xs uppercase tracking-widest border transition-all duration-300",
                activeGenre === genre.slug
                  ? "bg-accent text-background border-accent scale-[1.02]"
                  : "border-border text-muted-foreground hover:border-accent hover:text-accent",
              )}
            >
              {genre.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {filtered.map((track) => (
            <TrackCard key={track.id} track={track} showShare />
          ))}
        </div>
      </div>
    </div>
  );
}

export function MusiqueCatalog() {
  return (
    <Suspense fallback={<div className="section-padding container-dicha h-96 animate-pulse bg-surface" />}>
      <MusiqueCatalogInner />
    </Suspense>
  );
}
