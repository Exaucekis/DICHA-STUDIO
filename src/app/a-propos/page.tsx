import { createMetadata } from "@/lib/seo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { BrandLogo } from "@/components/ui/BrandLogo";

export const metadata = createMetadata({
  title: "À propos",
  description:
    "DICHA STUDIO — Dicha Multi Services. Structure créative et audiovisuelle.",
  path: "/a-propos",
});

const sections = [
  {
    title: "Notre histoire",
    content:
      "DICHA STUDIO est né de la volonté de réunir musique, image et culture dans un même écosystème créatif. Porté par Dicha Multi Services, le studio accompagne artistes et créateurs dans leurs projets.",
  },
  {
    title: "Notre vision",
    content:
      "Construire un univers digital premium où la musique et l'audiovisuel dialoguent naturellement — pour les artistes, les passionnés et les professionnels.",
  },
  {
    title: "Notre mission",
    content:
      "Produire, promouvoir et diffuser des contenus musicaux et visuels de qualité. Offrir des services professionnels accessibles et une plateforme évolutive.",
  },
  {
    title: "Nos valeurs",
    content:
      "Excellence créative, authenticité culturelle, innovation technique et respect des artistes. Chaque production reflète l'identité DICHA.",
  },
  {
    title: "Notre approche",
    content:
      "Écoute, direction artistique, workflow optimisé et livraison soignée. Du brief à la diffusion, DICHA STUDIO centralise l'expérience.",
  },
];

export default function AboutPage() {
  return (
    <div>
      <section className="section-padding relative overflow-hidden border-b border-border bg-surface">
        <div className="ambient-glow pointer-events-none absolute -right-20 top-0 h-64 w-64 rounded-full bg-accent/15 blur-[100px]" />
        <div className="container-dicha relative flex max-w-4xl flex-col items-start gap-8 sm:flex-row sm:items-center">
          <BrandLogo size="lg" href={null} />
          <SectionHeading
            className="mb-0"
            eyebrow="Identité"
            title="À propos"
            subtitle="DICHA STUDIO — Dicha Multi Services. Structure créative et audiovisuelle."
          />
        </div>
      </section>

      <div className="container-dicha section-padding space-y-16 max-w-4xl">
        {sections.map((section) => (
          <section key={section.title}>
            <h2 className="font-display text-2xl font-bold uppercase text-accent">
              {section.title}
            </h2>
            <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
              {section.content}
            </p>
          </section>
        ))}

        <section className="border border-border p-8 bg-surface-elevated">
          <h2 className="font-display text-xl uppercase">Équipe & équipements</h2>
          <p className="mt-4 text-muted-foreground">
            Les contenus relatifs à l&apos;équipe et aux équipements sont administrables
            depuis le back-office. Configurez-les une fois vos informations officielles
            disponibles.
          </p>
        </section>

        <div className="flex gap-4">
          <Button href="/realisations">Nos réalisations</Button>
          <Button href="/devis" variant="outline">
            Demander un devis
          </Button>
        </div>
      </div>
    </div>
  );
}
