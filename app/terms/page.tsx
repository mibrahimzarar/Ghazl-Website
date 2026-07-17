import { PageShell } from "@/components/layout/PageShell";
import { GlassCard } from "@/components/ui/GlassCard";
import { termsContent } from "@/lib/content";

export default function TermsPage() {
  return (
    <PageShell title={termsContent.title}>
      <GlassCard>
        <p className="mb-8 text-sm text-text-muted">
          Last updated: {termsContent.lastUpdated}
        </p>
        <div className="prose-legal">
          {termsContent.sections.map((section) => (
            <div key={section.title}>
              <h2>{section.title}</h2>
              <p>{section.content}</p>
            </div>
          ))}
        </div>
      </GlassCard>
    </PageShell>
  );
}
