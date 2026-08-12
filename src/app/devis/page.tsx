import { Suspense } from "react";
import { createMetadata } from "@/lib/seo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DevisForm } from "@/components/forms/DevisForm";

export const metadata = createMetadata({
  title: "Demander un devis",
  description: "Demandez un devis pour vos projets musicaux et audiovisuels — DICHA STUDIO.",
  path: "/devis",
});

export default function DevisPage() {
  return (
    <div className="section-padding">
      <div className="container-dicha">
        <SectionHeading
          title="Demander un devis"
          subtitle="Décrivez votre projet. Notre équipe vous répondra dans les meilleurs délais."
        />
        <Suspense fallback={<div className="h-96 animate-pulse bg-surface" />}>
          <DevisForm />
        </Suspense>
      </div>
    </div>
  );
}
