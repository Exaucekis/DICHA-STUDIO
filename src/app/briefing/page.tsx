import Link from "next/link";
import Image from "next/image";
import { episodes } from "@/lib/data/mock-data";
import { createMetadata } from "@/lib/seo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { formatDate } from "@/lib/utils";

export const metadata = createMetadata({
  title: "DICHA Briefing",
  description: "Émission audiovisuelle DICHA STUDIO — épisodes, invités et culture.",
  path: "/briefing",
});

export default function BriefingPage() {
  return (
    <div className="section-padding">
      <div className="container-dicha">
        <SectionHeading
          title="DICHA Briefing"
          subtitle="Le programme audiovisuel de DICHA STUDIO. Épisodes, invités et coulisses."
        />
        <div className="space-y-8">
          {episodes.map((episode) => (
            <Link
              key={episode.id}
              href={`/briefing/${episode.slug}`}
              className="group grid md:grid-cols-3 gap-6 border border-border-subtle hover:border-border p-4 md:p-6 transition-colors"
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={episode.thumbnailUrl}
                  alt={episode.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="md:col-span-2">
                <p className="text-xs text-accent uppercase tracking-widest">
                  S{episode.seasonNumber} · E{String(episode.episodeNumber).padStart(2, "0")}
                </p>
                <h2 className="font-display text-xl md:text-2xl font-bold uppercase mt-2 group-hover:text-accent transition-colors">
                  {episode.title}
                </h2>
                {episode.description && (
                  <p className="text-muted-foreground mt-3 line-clamp-2">
                    {episode.description}
                  </p>
                )}
                <div className="flex flex-wrap gap-4 mt-4 text-sm text-muted">
                  <span>{formatDate(episode.releaseDate)}</span>
                  {episode.presenter && <span>· {episode.presenter}</span>}
                  {episode.guests && episode.guests.length > 0 && (
                    <span>· Invités : {episode.guests.join(", ")}</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
