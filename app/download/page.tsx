import { PageShell } from "@/components/layout/PageShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { StoreBadges } from "@/components/download/StoreBadges";
import { downloadContent } from "@/lib/content";

export default function DownloadPage() {
  return (
    <PageShell
      title={downloadContent.title}
      subtitle={downloadContent.subtitle}
    >
      <div className="space-y-16 sm:space-y-24">
        <StoreBadges />

        <section>
          <SectionHeading title={downloadContent.faq.title} />
          <FAQAccordion items={[...downloadContent.faq.items]} />
        </section>
      </div>
    </PageShell>
  );
}
