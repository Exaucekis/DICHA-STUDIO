import Link from "next/link";
import Image from "next/image";
import { portfolioItems } from "@/lib/data/mock-data";
import { createMetadata } from "@/lib/seo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { formatDate } from "@/lib/utils";

export const metadata = createMetadata({
  title: "Réalisations",
  description: "Portfolio DICHA STUDIO — clips, mixages, productions et émissions.",
  path: "/realisations",
});

export default function PortfolioPage() {
  return (
    <div className="section-padding">
      <div className="container-dicha">
        <SectionHeading
          title="Réalisations"
          subtitle="Clips, mixages, design, émissions et productions signées DICHA STUDIO."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map((item) => (
            <article
              key={item.id}
              className="border border-border-subtle hover:border-border transition-colors group"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="33vw"
                />
              </div>
              <div className="p-5">
                <p className="text-xs text-accent uppercase tracking-widest">{item.type}</p>
                <h2 className="font-display font-bold uppercase mt-2">{item.title}</h2>
                {item.artist && (
                  <p className="text-sm text-muted-foreground mt-1">{item.artist}</p>
                )}
                <p className="text-xs text-muted mt-2">{formatDate(item.projectDate)}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
