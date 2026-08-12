import { notFound } from "next/navigation";
import Image from "next/image";
import { getServiceBySlug, services } from "@/lib/data/mock-data";
import { createMetadata } from "@/lib/seo";
import { Button } from "@/components/ui/Button";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return createMetadata({
    title: service.title,
    description: service.description,
    path: `/services/${slug}`,
    image: service.imageUrl,
  });
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  return (
    <div>
      {service.imageUrl && (
        <div className="relative h-[40vh] min-h-[300px]">
          <Image
            src={service.imageUrl}
            alt={service.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        </div>
      )}

      <div className="container-dicha section-padding">
        <h1 className="font-display text-4xl md:text-5xl font-bold uppercase">
          {service.title}
        </h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-3xl leading-relaxed">
          {service.description}
        </p>

        {service.process && service.process.length > 0 && (
          <section className="mt-16">
            <h2 className="text-xs uppercase tracking-widest text-accent mb-8">
              Processus
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.process.map((step) => (
                <div
                  key={step.step}
                  className="border border-border p-6 bg-surface"
                >
                  <span className="font-display text-3xl font-bold text-accent">
                    {String(step.step).padStart(2, "0")}
                  </span>
                  <h3 className="font-display uppercase font-bold mt-4">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {service.benefits && service.benefits.length > 0 && (
          <section className="mt-16">
            <h2 className="text-xs uppercase tracking-widest text-accent mb-6">
              Avantages
            </h2>
            <ul className="grid sm:grid-cols-2 gap-3">
              {service.benefits.map((benefit) => (
                <li
                  key={benefit}
                  className="flex items-center gap-3 text-muted-foreground"
                >
                  <span className="w-1.5 h-1.5 bg-accent shrink-0" />
                  {benefit}
                </li>
              ))}
            </ul>
          </section>
        )}

        {service.faq && service.faq.length > 0 && (
          <section className="mt-16">
            <h2 className="text-xs uppercase tracking-widest text-accent mb-6">FAQ</h2>
            <div className="space-y-6 max-w-3xl">
              {service.faq.map((item) => (
                <div key={item.question} className="border-b border-border pb-6">
                  <h3 className="font-semibold">{item.question}</h3>
                  <p className="text-muted-foreground mt-2">{item.answer}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="mt-16 p-8 bg-accent-muted border border-accent/20 text-center">
          <p className="font-display text-xl uppercase">Intéressé par ce service ?</p>
          <Button href={`/devis?service=${service.slug}`} className="mt-6">
            Demander un devis
          </Button>
        </div>
      </div>
    </div>
  );
}
