import { PageShell } from "@/components/layout/PageShell";
import { GlassCard } from "@/components/ui/GlassCard";
import { PublisherSection } from "@/components/about/PublisherSection";
import { aboutContent } from "@/lib/content";

export default function AboutPage() {
  return (
    <PageShell title={aboutContent.title} subtitle={aboutContent.subtitle}>
      <div className="space-y-8">
        <GlassCard>
          <h2 className="font-display text-2xl font-semibold text-text-primary">
            {aboutContent.mission.title}
          </h2>
          <div className="mt-4 space-y-4">
            {aboutContent.mission.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="leading-relaxed text-text-muted">
                {paragraph}
              </p>
            ))}
          </div>
        </GlassCard>

        <GlassCard>
          <h2 className="font-display text-2xl font-semibold text-text-primary">
            {aboutContent.story.title}
          </h2>
          <div className="mt-4 space-y-4">
            {aboutContent.story.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="leading-relaxed text-text-muted">
                {paragraph}
              </p>
            ))}
          </div>
        </GlassCard>

        <div>
          <h2 className="mb-6 text-center font-display text-2xl font-semibold text-text-primary">
            {aboutContent.values.title}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {aboutContent.values.items.map((value) => (
              <GlassCard key={value.title} hover>
                <h3 className="font-display text-lg font-semibold text-text-primary">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">
                  {value.description}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>

        <PublisherSection />
      </div>
    </PageShell>
  );
}
