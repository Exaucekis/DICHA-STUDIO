import Link from "next/link";
import Image from "next/image";
import { artists } from "@/lib/data/mock-data";
import { createMetadata } from "@/lib/seo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";

export const metadata = createMetadata({
  title: "Artistes",
  description: "Découvrez les artistes accompagnés par DICHA STUDIO.",
  path: "/artistes",
});

export default function ArtistesPage() {
  return (
    <div className="section-padding">
      <div className="container-dicha">
        <SectionHeading
          title="Artistes"
          subtitle="Talents, créateurs et voix de l'univers DICHA STUDIO."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {artists.map((artist) => (
            <Link
              key={artist.id}
              href={`/artistes/${artist.slug}`}
              className="group relative aspect-[3/4] overflow-hidden border border-border-subtle hover:border-accent transition-colors"
            >
              <Image
                src={artist.photoUrl}
                alt={artist.photoAlt ?? artist.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              <div className="absolute bottom-0 p-6">
                <Badge variant="accent">{artist.genre}</Badge>
                <h2 className="font-display text-2xl font-bold uppercase mt-2">
                  {artist.name}
                </h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
