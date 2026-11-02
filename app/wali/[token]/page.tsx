import type { Metadata } from "next";
import { BlessingButton } from "@/components/wali/BlessingButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { buildSuitorFacts, fetchWaliChaperoneView } from "@/lib/wali/chaperone";

type PageProps = {
  params: Promise<{ token: string }>;
};

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Wali Chaperone — Ghazl",
  robots: { index: false, follow: false },
};

function formatWhen(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default async function WaliChaperonePage({ params }: PageProps) {
  const { token } = await params;
  const { view, error } = await fetchWaliChaperoneView(token);

  if (!view) {
    return (
      <div className="mx-auto flex min-h-[70vh] w-full max-w-lg items-center px-4 py-16">
        <GlassCard strong className="w-full text-center">
          <p className="text-xs font-medium tracking-[0.18em] text-gold">
            GHAZL · WALI
          </p>
          <h1 className="mt-3 font-display text-2xl font-semibold text-text-primary">
            Chaperone link unavailable
          </h1>
          <p className="mt-3 text-sm leading-6 text-text-muted">
            {error ?? "This link may have expired or been revoked."}
          </p>
        </GlassCard>
      </div>
    );
  }

  const wardName = view.woman.first_name?.trim() || "Your ward";
  const relationship = view.woman.wali_relationship?.trim() || "Guardian";
  const guardian =
    view.woman.wali_name?.trim() || `${wardName}'s ${relationship}`;
  const facts = buildSuitorFacts(view);
  const blessed = Boolean(view.wali_blessing_at);

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-8 sm:py-12">
      <GlassCard strong className="mb-4">
        <p className="text-xs font-medium tracking-[0.18em] text-gold">
          GHAZL · WALI CHAPERONE
        </p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-text-primary">
          {wardName} & {view.suitor.display_name}
        </h1>
        <p className="mt-2 text-sm leading-6 text-text-muted">
          Read-only courtship transcript for {guardian} ({relationship}). Chat
          with sincerity stays private to this link.
        </p>
      </GlassCard>

      <GlassCard className="mb-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium tracking-[0.16em] text-text-muted">
              SUITOR
            </p>
            <h2 className="mt-1 font-display text-2xl font-semibold text-text-primary">
              {view.suitor.display_name}
            </h2>
          </div>
          {view.suitor.is_verified ? (
            <span className="rounded-full border border-gold/40 px-3 py-1 text-xs font-medium text-gold">
              ID verified
            </span>
          ) : null}
        </div>

        {facts.length > 0 ? (
          <dl className="mt-4 grid grid-cols-2 gap-2">
            {facts.map((fact) => (
              <div
                key={fact.label}
                className="rounded-xl border border-white/10 bg-white/5 px-3 py-2"
              >
                <dt className="text-[11px] uppercase tracking-wide text-text-muted">
                  {fact.label}
                </dt>
                <dd className="mt-0.5 text-sm text-text-primary">{fact.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}

        <div className="mt-5 flex flex-col gap-3 border-t border-white/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-text-primary">
              {blessed
                ? "Wali blessing recorded"
                : "Approve for a family call"}
            </p>
            <p className="mt-1 text-xs leading-5 text-text-muted">
              {blessed
                ? "You have marked this courtship as approved for a family call."
                : "Let both of them know you have reviewed this and welcome a family call."}
            </p>
          </div>
          <BlessingButton token={token} blessed={blessed} />
        </div>
      </GlassCard>

      <h2 className="mb-3 px-1 font-display text-lg font-semibold text-text-primary">
        Conversation
      </h2>
      {view.messages.length === 0 ? (
        <GlassCard>
          <p className="text-sm text-text-muted">No messages yet.</p>
        </GlassCard>
      ) : (
        <div className="space-y-2">
          {view.messages.map((message) => {
            const fromWoman = message.sender_role === "woman";
            const sender = fromWoman ? wardName : view.suitor.display_name;
            return (
              <div
                key={message.id}
                className={fromWoman ? "flex justify-start" : "flex justify-end"}
              >
                <div
                  className={
                    fromWoman
                      ? "max-w-[85%] rounded-2xl border border-white/10 bg-white/10 px-3 py-2"
                      : "max-w-[85%] rounded-2xl border border-gold/25 bg-gold/10 px-3 py-2"
                  }
                >
                  <div className="mb-1 flex items-baseline justify-between gap-3">
                    <span className="text-xs font-medium text-gold">{sender}</span>
                    <span className="text-[11px] text-text-muted">
                      {formatWhen(message.created_at)}
                    </span>
                  </div>
                  <p className="text-sm leading-6 whitespace-pre-wrap text-text-primary">
                    {message.body}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
