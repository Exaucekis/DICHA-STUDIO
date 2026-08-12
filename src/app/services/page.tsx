import Link from "next/link";
import Image from "next/image";
import { services } from "@/lib/data/mock-data";
import { createMetadata } from "@/lib/seo";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata = createMetadata({
  title: "Services",
  description:
    "Enregistrement, mixage, mastering, production musicale, tournage, montage — DICHA STUDIO.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <div className="section-padding">
      <div className="container-dicha">
        <SectionHeading
          title="Services"
          subtitle="Prestations professionnelles pour vos projets musicaux et audiovisuels."
        />
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <Link
              key={service.id}
              href={`/services/${service.slug}`}
              className="group grid sm:grid-cols-2 border border-border-subtle hover:border-accent overflow-hidden transition-colors"
            >
              {service.imageUrl && (
                <div className="relative aspect-square sm:aspect-auto min-h-[200px]">
                  <Image
                    src={service.imageUrl}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="50vw"
                  />
                </div>
              )}
              <div className="p-6 flex flex-col justify-center">
                <span className="text-accent text-sm font-display font-bold">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="font-display text-xl font-bold uppercase mt-2 group-hover:text-accent transition-colors">
                  {service.title}
                </h2>
                <p className="text-sm text-muted-foreground mt-3 line-clamp-3">
                  {service.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
