import {
  Hero,
} from "@/components/home/Hero";
import { LatestReleases } from "@/components/home/LatestReleases";
import {
  MusicSection,
  VideosSection,
  ArtistsSection,
  BriefingSection,
  ServicesSection,
  AboutPreview,
  ContactCTA,
} from "@/components/home/HomeSections";

export default function HomePage() {
  return (
    <>
      <Hero />
      <LatestReleases />
      <MusicSection />
      <VideosSection />
      <ArtistsSection />
      <BriefingSection />
      <ServicesSection />
      <AboutPreview />
      <ContactCTA />
    </>
  );
}
