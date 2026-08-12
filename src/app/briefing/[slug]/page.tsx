import { notFound } from "next/navigation";
import Link from "next/link";
import { episodes, getEpisodeBySlug } from "@/lib/data/mock-data";
import { createMetadata } from "@/lib/seo";
import { ShareButtons } from "@/components/ui/ShareButtons";
import { formatDate, getShareUrl } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return episodes.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const episode = getEpisodeBySlug(slug);
  if (!episode) return {};
  return createMetadata({
    title: episode.title,
    description: episode.description ?? episode.title,
    path: `/briefing/${slug}`,
    image: episode.thumbnailUrl,
  });
}

export default async function EpisodePage({ params }: PageProps) {
  const { slug } = await params;
  const episode = getEpisodeBySlug(slug);
  if (!episode) notFound();

  const otherEpisodes = episodes.filter((e) => e.slug !== slug);

  return (
    <div className="section-padding">
      <div className="container-dicha">
        {episode.videoUrl && (
          <div className="aspect-video w-full bg-black border border-border overflow-hidden mb-8">
            <iframe
              src={episode.videoUrl}
              title={episode.title}
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        )}

        <p className="text-xs text-accent uppercase tracking-widest">
          {episode.showTitle} · S{episode.seasonNumber} E
          {String(episode.episodeNumber).padStart(2, "0")}
        </p>
        <h1 className="font-display text-3xl md:text-4xl font-bold uppercase mt-4">
          {episode.title}
        </h1>
        <div className="flex flex-wrap gap-4 mt-4 text-sm text-muted-foreground">
          <span>{formatDate(episode.releaseDate)}</span>
          {episode.presenter && <span>Présentateur : {episode.presenter}</span>}
          {episode.guests && episode.guests.length > 0 && (
            <span>Invités : {episode.guests.join(", ")}</span>
          )}
        </div>
        {episode.description && (
          <p className="mt-6 text-muted-foreground max-w-3xl leading-relaxed">
            {episode.description}
          </p>
        )}
        <ShareButtons
          url={getShareUrl(`/briefing/${episode.slug}`)}
          title={episode.title}
          className="mt-8"
        />

        {otherEpisodes.length > 0 && (
          <section className="mt-16 border-t border-border pt-12">
            <h2 className="font-display text-xl font-bold uppercase mb-6">
              Épisodes précédents
            </h2>
            <ul className="space-y-4">
              {otherEpisodes.map((ep) => (
                <li key={ep.id}>
                  <Link
                    href={`/briefing/${ep.slug}`}
                    className="text-muted-foreground hover:text-accent transition-colors"
                  >
                    S{ep.seasonNumber}E{ep.episodeNumber} — {ep.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
