"use client";

import { getLatestTracks } from "@/lib/data/mock-data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TrackCard } from "@/components/music/TrackCard";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function LatestReleases() {
  const tracks = getLatestTracks(4);

  return (
    <section className="section-padding relative overflow-hidden bg-surface">
      <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-accent/5 blur-[100px]" />
      <div className="container-dicha relative">
        <Reveal>
          <SectionHeading
            eyebrow="Fresh"
            title="Dernières sorties"
            subtitle="Les productions les plus récentes signées DICHA STUDIO."
            action={
              <Button href="/musique" variant="outline" size="sm">
                Voir tout
              </Button>
            }
          />
        </Reveal>
        <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
          {tracks.map((track, i) => (
            <Reveal key={track.id} delay={(Math.min(i + 1, 4) as 1 | 2 | 3 | 4)}>
              <TrackCard track={track} showShare />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
