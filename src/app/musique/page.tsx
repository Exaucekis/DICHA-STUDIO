import { createMetadata } from "@/lib/seo";
import { MusiqueCatalog } from "@/components/music/MusiqueCatalog";

export const metadata = createMetadata({
  title: "Musique",
  description:
    "Catalogue musical DICHA STUDIO — Trap, Amapiano, R&B, Sébène. Écoutez et découvrez nos productions.",
  path: "/musique",
});

export default function MusiquePage() {
  return <MusiqueCatalog />;
}
