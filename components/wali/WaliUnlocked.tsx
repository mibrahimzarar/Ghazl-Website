import { BlessingButton } from "@/components/wali/BlessingButton";
import type { WaliChaperoneView } from "@/lib/wali/chaperone";
import {
  SECTION_TONES,
  type WaliDiscoverCard,
  type WaliSection,
} from "@/lib/wali/profileView";

type WaliUnlockedProps = {
  token: string;
  code: string;
  view: WaliChaperoneView;
  card: WaliDiscoverCard;
  sections: WaliSection[];
};

const PILL_TONES = ["#D8E6CC", "#E0D9F0", "#F3EBB8", "#F0DFD0"];

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

function SectionCard({ section }: { section: WaliSection }) {
  return (
    <section
      className="rounded-2xl border px-4 py-4"
      style={{
        background: SECTION_TONES[section.tone],
        borderColor: "#D0C7B6",
        borderBottomWidth: 4,
        borderBottomColor: "#D2C4A8",
      }}
    >
      <h2
        className="text-[22px] leading-7"
        style={{ fontFamily: "var(--font-wali-serif), serif" }}
      >
        {section.title}
      </h2>
      <p className="mt-1 text-[13px] leading-5" style={{ color: "#6B7280" }}>
        {section.subtitle}
      </p>
      {section.fields.length > 0 ? (
        <dl className="mt-3 grid gap-2 sm:grid-cols-2">
          {section.fields.map((field) => (
            <div key={field.label}>
              <dt className="text-[11px] uppercase tracking-wide" style={{ color: "#6B7280" }}>
                {field.label}
              </dt>
              <dd className="text-sm">{field.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}
      {section.paragraphs.map((paragraph) => (
        <div key={paragraph.label} className="mt-3">
          <p className="text-[11px] uppercase tracking-wide" style={{ color: "#6B7280" }}>
            {paragraph.label}
          </p>
          <p className="mt-1 text-sm leading-6 whitespace-pre-wrap">{paragraph.value}</p>
        </div>
      ))}
      {section.chips.length > 0 ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {section.chips.map((chip) => (
            <span
              key={chip}
              className="rounded-full px-3 py-1 text-xs"
              style={{ background: "#FFFCF8", border: "1px solid #D0C7B6" }}
            >
              {chip}
            </span>
          ))}
        </div>
      ) : null}
      {section.traits.length > 0 ? (
        <ul className="mt-3 space-y-2">
          {section.traits.map((trait) => (
            <li key={trait.label}>
              <div className="mb-1 flex justify-between text-xs">
                <span>{trait.label}</span>
                <span style={{ color: "#6B7280" }}>{trait.value}/10</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full" style={{ background: "#FFFCF8" }}>
                <div
                  className="h-full rounded-full"
                  style={{ width: `${trait.value * 10}%`, background: "#1B6B4A" }}
                />
              </div>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}

export function WaliUnlocked({ token, code, view, card, sections }: WaliUnlockedProps) {
  const wardName = view.woman.first_name?.trim() || "Your ward";
  const relationship = view.woman.wali_relationship?.trim() || "Guardian";
  const guardian = view.woman.wali_name?.trim() || `${wardName}'s ${relationship}`;
  const blessed = Boolean(view.wali_blessing_at);

  return (
    <div className="mx-auto w-full max-w-[440px] px-4 py-6 sm:py-10">
      <p className="text-center text-[11px] font-medium tracking-[0.2em]" style={{ color: "#1B6B4A" }}>
        GHAZL · WALI CHAPERONE
      </p>
      <p className="mt-2 text-center text-sm leading-6" style={{ color: "#6B7280" }}>
        {wardName}&apos;s conversation with {card.displayName}, shared with {guardian} ({relationship}).
      </p>

      <article
        className="mt-5 overflow-hidden rounded-[28px] border"
        style={{
          background: "#FFFCF8",
          borderColor: "#D0C7B6",
          borderWidth: 1.5,
          borderBottomWidth: 6,
          borderBottomColor: "#D2C4A8",
          boxShadow: "0 8px 16px rgba(26,26,26,0.08)",
        }}
      >
        <div className="relative m-3 overflow-hidden rounded-[18px]" style={{ aspectRatio: "0.92", background: "#E4E0D5" }}>
          {card.photoUrl ? (
            // Storage photos are already public URLs from the app bucket.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={card.photoUrl}
              alt={`${card.displayName}'s photo`}
              className="h-full w-full object-cover"
            />
          ) : (
            <div
              className="flex h-full w-full items-center justify-center text-6xl text-white"
              style={{ background: "#4A6585", fontFamily: "var(--font-wali-serif), serif" }}
            >
              {card.initial}
            </div>
          )}
          {card.verified ? (
            <span
              className="absolute right-3 bottom-3 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white"
              style={{ background: "#4A6585" }}
            >
              ✓
            </span>
          ) : null}
        </div>

        <div className="px-5 pb-5">
          <h1
            className="text-[26px] leading-8"
            style={{ fontFamily: "var(--font-wali-serif), serif", letterSpacing: "-0.3px" }}
          >
            {card.displayName}
          </h1>
          {card.caste ? (
            <p className="mt-1 text-sm" style={{ color: "#6B7280" }}>
              {card.caste}
            </p>
          ) : null}
          <div className="mt-2 h-[2.5px] w-9 rounded-full" style={{ background: "#4A6585" }} />
          {card.metaLine ? (
            <p className="mt-2 text-sm" style={{ color: "#6B7280" }}>
              {card.metaLine}
            </p>
          ) : null}
          {card.careerLine ? (
            <p className="mt-1 text-sm" style={{ color: "#3F4654" }}>
              {card.careerLine}
            </p>
          ) : null}
          {card.salahLabel || card.madhhabLabel ? (
            <div className="mt-4 flex flex-col items-center gap-1 text-center">
              <div className="h-px w-9" style={{ background: "#5C564C", opacity: 0.55 }} />
              {card.salahLabel ? (
                <>
                  <p className="text-[11px] font-bold tracking-[0.22em]" style={{ color: "#5C564C" }}>
                    SALAH
                  </p>
                  <p
                    className="text-[19px] leading-6"
                    style={{ fontFamily: "var(--font-wali-serif), serif" }}
                  >
                    {card.salahLabel}
                  </p>
                </>
              ) : null}
              {card.madhhabLabel ? (
                <>
                  <p className="mt-1 text-[10px] font-bold tracking-[0.18em]" style={{ color: "#5C564C" }}>
                    MADHHAB
                  </p>
                  <p className="text-sm" style={{ color: "#3F4654" }}>
                    {card.madhhabLabel}
                  </p>
                </>
              ) : null}
              <div className="mt-1 h-px w-9" style={{ background: "#5C564C", opacity: 0.55 }} />
            </div>
          ) : null}
          {card.pills.length > 0 ? (
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {card.pills.map((pill, index) => (
                <span
                  key={pill}
                  className="rounded-xl border px-3 py-1 text-[11px]"
                  style={{
                    background: PILL_TONES[index % PILL_TONES.length],
                    borderColor: "#D0C7B6",
                    borderBottomWidth: 3,
                    borderBottomColor: "#D2C4A8",
                  }}
                >
                  {pill}
                </span>
              ))}
            </div>
          ) : null}
          {card.galleryUrls.length > 0 ? (
            <div className="mt-4 flex gap-2 overflow-x-auto">
              {card.galleryUrls.map((url) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={url}
                  src={url}
                  alt=""
                  className="h-20 w-20 shrink-0 rounded-xl object-cover"
                />
              ))}
            </div>
          ) : null}
        </div>
      </article>

      <div
        className="mt-4 rounded-2xl border px-4 py-4"
        style={{
          background: blessed ? "#D8E6CC" : "#FFFCF8",
          borderColor: "#D0C7B6",
          borderBottomWidth: 4,
          borderBottomColor: "#D2C4A8",
        }}
      >
        <p className="text-sm font-medium">
          {blessed ? "Family call approved" : "Approve for a family call"}
        </p>
        <p className="mt-1 mb-3 text-xs leading-5" style={{ color: "#6B7280" }}>
          {blessed
            ? "You can remove this approval if you change your mind."
            : "Let both of them know you have reviewed this profile and welcome a family call."}
        </p>
        <BlessingButton token={token} code={code} blessed={blessed} />
      </div>

      {sections.length > 0 ? (
        <div className="mt-4 space-y-3">
          {sections.map((item) => (
            <SectionCard key={item.id} section={item} />
          ))}
        </div>
      ) : (
        <p className="mt-4 text-center text-sm" style={{ color: "#6B7280" }}>
          The full profile appears after the latest Wali update is applied.
        </p>
      )}

      <h2
        className="mt-8 mb-3 text-lg"
        style={{ fontFamily: "var(--font-wali-serif), serif" }}
      >
        Conversation
      </h2>
      {view.messages.length === 0 ? (
        <p className="text-sm" style={{ color: "#6B7280" }}>
          No messages yet.
        </p>
      ) : (
        <div className="space-y-2 pb-8">
          {view.messages.map((message) => {
            const fromWoman = message.sender_role === "woman";
            return (
              <div key={message.id} className={fromWoman ? "flex justify-start" : "flex justify-end"}>
                <div
                  className="max-w-[85%] rounded-2xl border px-3 py-2"
                  style={{
                    background: fromWoman ? "#D8E6CC" : "#FFFCF8",
                    borderColor: fromWoman ? "#1B6B4A" : "#D0C7B6",
                  }}
                >
                  <div className="mb-1 flex items-baseline justify-between gap-3">
                    <span className="text-xs font-medium" style={{ color: "#1B6B4A" }}>
                      {fromWoman ? wardName : card.displayName}
                    </span>
                    <span className="text-[11px]" style={{ color: "#6B7280" }}>
                      {formatWhen(message.created_at)}
                    </span>
                  </div>
                  <p className="text-sm leading-6 whitespace-pre-wrap">{message.body}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
