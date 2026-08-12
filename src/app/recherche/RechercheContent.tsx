"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { searchContent } from "@/lib/data/mock-data";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default function RechercheContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const results = query.length >= 2 ? searchContent(query) : null;
  const total = results
    ? results.tracks.length +
      results.artists.length +
      results.videos.length +
      results.articles.length +
      results.services.length +
      results.episodes.length
    : 0;

  return (
    <div className="section-padding">
      <div className="container-dicha max-w-3xl">
        <SectionHeading title="Recherche" subtitle="Trouvez morceaux, artistes, vidéos et plus." />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher..."
          className="form-input w-full text-lg"
          autoFocus
          aria-label="Recherche"
        />

        {query.length >= 2 && total === 0 && (
          <p className="mt-8 text-muted-foreground">Aucun résultat pour &quot;{query}&quot;</p>
        )}

        {results && total > 0 && (
          <div className="mt-10 space-y-8">
            {results.tracks.length > 0 && (
              <ResultBlock title="Morceaux">
                {results.tracks.map((t) => (
                  <Link key={t.id} href={`/musique/${t.slug}`} className="block py-2 hover:text-accent">
                    {t.title} — {t.artist}
                  </Link>
                ))}
              </ResultBlock>
            )}
            {results.artists.length > 0 && (
              <ResultBlock title="Artistes">
                {results.artists.map((a) => (
                  <Link key={a.id} href={`/artistes/${a.slug}`} className="block py-2 hover:text-accent">
                    {a.name}
                  </Link>
                ))}
              </ResultBlock>
            )}
            {results.videos.length > 0 && (
              <ResultBlock title="Vidéos">
                {results.videos.map((v) => (
                  <Link key={v.id} href={`/videos/${v.slug}`} className="block py-2 hover:text-accent">
                    {v.title}
                  </Link>
                ))}
              </ResultBlock>
            )}
            {results.episodes.length > 0 && (
              <ResultBlock title="Émissions">
                {results.episodes.map((e) => (
                  <Link key={e.id} href={`/briefing/${e.slug}`} className="block py-2 hover:text-accent">
                    {e.title}
                  </Link>
                ))}
              </ResultBlock>
            )}
            {results.articles.length > 0 && (
              <ResultBlock title="Actualités">
                {results.articles.map((a) => (
                  <Link key={a.id} href={`/actualites/${a.slug}`} className="block py-2 hover:text-accent">
                    {a.title}
                  </Link>
                ))}
              </ResultBlock>
            )}
            {results.services.length > 0 && (
              <ResultBlock title="Services">
                {results.services.map((s) => (
                  <Link key={s.id} href={`/services/${s.slug}`} className="block py-2 hover:text-accent">
                    {s.title}
                  </Link>
                ))}
              </ResultBlock>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function ResultBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-xs uppercase tracking-widest text-accent mb-3">{title}</h2>
      <div className="space-y-1">{children}</div>
    </div>
  );
}
