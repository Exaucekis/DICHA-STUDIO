import Link from "next/link";
import Image from "next/image";
import { videos } from "@/lib/data/mock-data";
import { createMetadata } from "@/lib/seo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { formatDate, formatDuration } from "@/lib/utils";

export const metadata = createMetadata({
  title: "Vidéos",
  description: "Clips, trailers, émissions, interviews et coulisses — DICHA STUDIO.",
  path: "/videos",
});

export default function VideosPage() {
  return (
    <div className="section-padding">
      <div className="container-dicha">
        <SectionHeading
          title="Vidéos"
          subtitle="Productions audiovisuelles, clips et contenus premium."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <Link
              key={video.id}
              href={`/videos/${video.slug}`}
              className="group border border-border-subtle hover:border-border transition-colors"
            >
              <div className="relative aspect-video overflow-hidden bg-surface-elevated">
                <Image
                  src={video.thumbnailUrl}
                  alt={video.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <Badge className="absolute top-3 left-3" variant="accent">
                  {video.category}
                </Badge>
                <span className="absolute bottom-3 right-3 text-xs bg-black/70 px-2 py-1 tabular-nums">
                  {formatDuration(video.duration)}
                </span>
              </div>
              <div className="p-5">
                <h2 className="font-display font-bold uppercase group-hover:text-accent transition-colors">
                  {video.title}
                </h2>
                {video.artist && (
                  <p className="text-sm text-muted-foreground mt-1">{video.artist}</p>
                )}
                <p className="text-xs text-muted mt-2">{formatDate(video.releaseDate)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
