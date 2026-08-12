import { notFound } from "next/navigation";
import Image from "next/image";
import { articles, getArticleBySlug } from "@/lib/data/mock-data";
import { createMetadata } from "@/lib/seo";
import { Badge } from "@/components/ui/Badge";
import { ShareButtons } from "@/components/ui/ShareButtons";
import { formatDate, getShareUrl } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return createMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/actualites/${slug}`,
    image: article.coverUrl,
    type: "article",
  });
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  return (
    <article className="section-padding">
      <div className="container-dicha max-w-3xl">
        <Badge>{article.category}</Badge>
        <h1 className="font-display text-3xl md:text-5xl font-bold uppercase mt-4">
          {article.title}
        </h1>
        <p className="text-muted mt-4">{formatDate(article.publishedAt)}</p>
        {article.coverUrl && (
          <div className="relative aspect-[16/9] mt-8 overflow-hidden">
            <Image
              src={article.coverUrl}
              alt={article.title}
              fill
              className="object-cover"
              sizes="800px"
              priority
            />
          </div>
        )}
        <div className="prose prose-invert mt-8 text-muted-foreground leading-relaxed">
          <p>{article.content}</p>
        </div>
        <ShareButtons
          url={getShareUrl(`/actualites/${article.slug}`)}
          title={article.title}
          className="mt-10"
        />
      </div>
    </article>
  );
}
