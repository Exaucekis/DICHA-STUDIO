import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Politique de confidentialité",
  description: "Politique de confidentialité — DICHA STUDIO.",
  path: "/confidentialite",
});

export default function ConfidentialitePage() {
  return (
    <div className="section-padding container-dicha max-w-3xl">
      <h1 className="font-display text-3xl uppercase">Politique de confidentialité</h1>
      <p className="text-muted-foreground mt-6 leading-relaxed">
        DICHA STUDIO s&apos;engage à protéger vos données personnelles. Les informations
        collectées via les formulaires de contact, devis et newsletter sont utilisées
        uniquement dans le cadre de la relation commerciale et ne sont pas revendues.
        Contenu complet administrable depuis le CMS.
      </p>
    </div>
  );
}
