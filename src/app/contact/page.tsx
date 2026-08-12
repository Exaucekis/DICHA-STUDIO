import { createMetadata } from "@/lib/seo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/forms/ContactForm";

export const metadata = createMetadata({
  title: "Contact",
  description: "Contactez DICHA STUDIO pour vos projets musicaux et audiovisuels.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="section-padding">
      <div className="container-dicha">
        <SectionHeading
          title="Contact"
          subtitle="Une question, un projet ? Écrivez-nous."
        />
        <ContactForm />
      </div>
    </div>
  );
}
