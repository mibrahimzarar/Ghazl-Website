import Link from "next/link";
import { Mail } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { GlassCard } from "@/components/ui/GlassCard";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { supportContent } from "@/lib/content";

export default function SupportPage() {
  return (
    <PageShell title={supportContent.title} subtitle={supportContent.subtitle}>
      <div className="space-y-12">
        <GlassCard className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-gradient-start/20 to-gradient-mid/10">
            <Mail className="h-6 w-6 text-gradient-mid" />
          </div>
          <h2 className="font-display text-2xl font-semibold text-text-primary">
            {supportContent.contact.title}
          </h2>
          <a
            href={`mailto:${supportContent.contact.email}`}
            className="mt-3 inline-block text-lg gradient-text transition-opacity hover:opacity-80"
          >
            {supportContent.contact.email}
          </a>
          <p className="mt-2 text-sm text-text-muted">
            {supportContent.contact.responseTime}
          </p>
        </GlassCard>

        <section>
          <h2 className="mb-6 text-center font-display text-2xl font-semibold text-text-primary">
            {supportContent.faq.title}
          </h2>

          {supportContent.faq.categories.map((category) => (
            <div key={category.name} className="mb-8">
              <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-gold">
                {category.name}
              </h3>
              <FAQAccordion items={category.items} />
            </div>
          ))}
        </section>

        <p className="text-center text-sm text-text-muted">
          For legal inquiries, see our{" "}
          <Link href="/privacy" className="text-gradient-mid hover:underline">
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link href="/terms" className="text-gradient-mid hover:underline">
            Terms of Service
          </Link>
          .
        </p>
      </div>
    </PageShell>
  );
}
