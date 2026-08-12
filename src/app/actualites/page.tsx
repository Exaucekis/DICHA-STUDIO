import Link from "next/link";
import Image from "next/image";
import { articles } from "@/lib/data/mock-data";
import { createMetadata } from "@/lib/seo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";

export const metadata = createMetadata({
  title: "Actualités",
  description: "Nouvelles sorties, annonces et actualités DICHA STUDIO.",
  path: "/actualites",
});

export default function ActualitesPage() {
  return (
    <div className="section-padding">
      <div className="container-dicha">
        <SectionHeading
          title="Actualités"
          subtitle="Sorties, événements, coulisses et annonces du studio."
        />
        <div className="grid md:grid-cols-2 gap-8">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/actualites/${article.slug}`}
              className="group border border-border-subtle hover:border-border transition-colors"
            >
              {article.coverUrl && (
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={article.coverUrl}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="50vw"
                  />
                </div>
              )}
              <div className="p-6">
                <Badge>{article.category}</Badge>
                <h2 className="font-display text-xl font-bold uppercase mt-3 group-hover:text-accent transition-colors">
                  {article.title}
                </h2>
                <p className="text-muted-foreground mt-2 line-clamp-2">
                  {article.excerpt}
                </p>
                <p className="text-xs text-muted mt-4">{formatDate(article.publishedAt)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
