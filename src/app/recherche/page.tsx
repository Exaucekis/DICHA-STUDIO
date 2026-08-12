import { Suspense } from "react";
import RechercheContent from "./RechercheContent";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Recherche",
  description: "Recherche globale DICHA STUDIO.",
  path: "/recherche",
});

export default function RecherchePage() {
  return (
    <Suspense fallback={<div className="section-padding container-dicha h-96 animate-pulse bg-surface" />}>
      <RechercheContent />
    </Suspense>
  );
}
