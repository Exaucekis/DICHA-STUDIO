import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Mentions légales",
  description: "Mentions légales — DICHA STUDIO.",
  path: "/mentions-legales",
});

export default function MentionsLegalesPage() {
  return (
    <div className="section-padding container-dicha max-w-3xl prose prose-invert">
      <h1 className="font-display text-3xl uppercase">Mentions légales</h1>
      <p className="text-muted-foreground mt-6">
        Contenu administrable depuis le back-office DICHA STUDIO. Renseignez ici les
        informations légales officielles de Dicha Multi Services.
      </p>
    </div>
  );
}
