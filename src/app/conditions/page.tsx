import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Conditions d'utilisation",
  description: "Conditions d'utilisation — DICHA STUDIO.",
  path: "/conditions",
});

export default function ConditionsPage() {
  return (
    <div className="section-padding container-dicha max-w-3xl">
      <h1 className="font-display text-3xl uppercase">Conditions d&apos;utilisation</h1>
      <p className="text-muted-foreground mt-6 leading-relaxed">
        En utilisant la plateforme DICHA STUDIO, vous acceptez les présentes conditions.
        Les contenus musicaux et audiovisuels sont protégés par le droit d&apos;auteur.
        Le téléchargement n&apos;est autorisé que lorsque explicitement activé par morceau.
      </p>
    </div>
  );
}
