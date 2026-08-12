import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getVideoBySlug, getRelatedVideos, videos } from "@/lib/data/mock-data";
import { createMetadata } from "@/lib/seo";
import { Badge } from "@/components/ui/Badge";
import { ShareButtons } from "@/components/ui/ShareButtons";
import { formatDate, formatDuration, getShareUrl } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return videos.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const video = getVideoBySlug(slug);
  if (!video) return {};
  return createMetadata({
    title: video.title,
    description: video.description ?? video.title,
    path: `/videos/${slug}`,
    image: video.thumbnailUrl,
  });
}

export default async function VideoPage({ params }: PageProps) {
  const { slug } = await params;
  const video = getVideoBySlug(slug);
  if (!video) notFound();

  const related = getRelatedVideos(slug);

  return (
    <div className="section-padding">
      <div className="container-dicha">
        <div className="aspect-video w-full bg-black border border-border overflow-hidden">
          <iframe
            src={video.videoUrl}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>

        <div className="mt-8 max-w-3xl">
          <Badge variant="accent">{video.category}</Badge>
          <h1 className="font-display text-3xl md:text-4xl font-bold uppercase mt-4">
            {video.title}
          </h1>
          {video.artist && (
            <p className="text-muted-foreground mt-2">{video.artist}</p>
          )}
          <div className="flex gap-4 mt-2 text-sm text-muted">
            <span>{formatDate(video.releaseDate)}</span>
            <span>{formatDuration(video.duration)}</span>
          </div>
          {video.description && (
            <p className="mt-6 text-muted-foreground leading-relaxed">
              {video.description}
            </p>
          )}
          <ShareButtons
            url={getShareUrl(`/videos/${video.slug}`)}
            title={video.title}
            className="mt-8"
          />
        </div>

        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="font-display text-2xl font-bold uppercase mb-6">
              Vidéos associées
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {related.map((v) => (
                <Link key={v.id} href={`/videos/${v.slug}`} className="group">
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={v.thumbnailUrl}
                      alt={v.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                      sizes="33vw"
                    />
                  </div>
                  <h3 className="mt-3 font-display uppercase text-sm group-hover:text-accent">
                    {v.title}
                  </h3>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
