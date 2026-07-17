import { PageShell } from "@/components/layout/PageShell";
import { GlassCard } from "@/components/ui/GlassCard";
import { privacyContent } from "@/lib/content";

export default function PrivacyPage() {
  return (
    <PageShell title={privacyContent.title}>
      <GlassCard>
        <p className="mb-8 text-sm text-text-muted">
          Last updated: {privacyContent.lastUpdated}
        </p>
        <div className="prose-legal">
          {privacyContent.sections.map((section) => (
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
