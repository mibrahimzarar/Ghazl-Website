"use client";

import { useEffect, useState } from "react";
import { readWaliLinkStatus, unlockWaliPortal } from "@/app/wali/actions";
import { WaliUnlocked } from "@/components/wali/WaliUnlocked";
import type { WaliChaperoneView, WaliLinkState } from "@/lib/wali/chaperone";
import type { WaliDiscoverCard, WaliSection } from "@/lib/wali/profileView";

type WaliAccessGateProps = {
  token: string;
};

export function WaliAccessGate({ token }: WaliAccessGateProps) {
  const [status, setStatus] = useState<WaliLinkState | "loading">("loading");
  const [code, setCode] = useState("");
  const [acceptedCode, setAcceptedCode] = useState<string | null>(null);
  const [view, setView] = useState<WaliChaperoneView | null>(null);
  const [card, setCard] = useState<WaliDiscoverCard | null>(null);
  const [sections, setSections] = useState<WaliSection[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    let cancelled = false;
    void readWaliLinkStatus(token).then((next) => {
      if (!cancelled) setStatus(next);
    });
    return () => {
      cancelled = true;
    };
  }, [token]);

  const submit = async () => {
    if (code.length !== 6 || pending) return;
    setPending(true);
    setError(null);
    const result = await unlockWaliPortal(token, code);
    setPending(false);
    if (!result.view || !result.card) {
      setError(result.error ?? "That code is not right.");
      if (result.error?.includes("few minutes")) setStatus("locked");
      return;
    }
    setAcceptedCode(code);
    setView(result.view);
    setCard(result.card);
    setSections(result.sections);
  };

  if (view && card && acceptedCode) {
    return (
      <WaliUnlocked
        token={token}
        code={acceptedCode}
        view={view}
        card={card}
        sections={sections}
      />
    );
  }

  const locked = status === "locked";
  const invalid = status === "invalid";

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md items-center px-5">
      <div
        className="w-full rounded-2xl border px-5 py-6"
        style={{
          background: "#FFFCF8",
          borderColor: "#D0C7B6",
          borderBottomWidth: 4,
          borderBottomColor: "#D2C4A8",
        }}
      >
        <p className="text-center text-[11px] font-medium tracking-[0.18em]" style={{ color: "#1B6B4A" }}>
          GHAZL · WALI
        </p>
        <h1
          className="mt-2 text-center text-2xl"
          style={{ fontFamily: "var(--font-wali-serif), serif" }}
        >
          {invalid ? "Chaperone link unavailable" : "Enter the code your ward gave you"}
        </h1>
        <p className="mt-2 text-center text-sm leading-6" style={{ color: "#6B7280" }}>
          {invalid
            ? "This link may have expired or been revoked."
            : status === "unavailable"
              ? "This Wali page is not ready yet."
              : locked
                ? "Too many tries. Wait a few minutes and try again."
                : "The link alone does not open this conversation."}
        </p>
        {invalid || status === "loading" || status === "unavailable" ? null : (
          <form
            className="mt-4"
            onSubmit={(event) => {
              event.preventDefault();
              void submit();
            }}
          >
            <label className="sr-only" htmlFor="wali-code">
              Wali code
            </label>
            <input
              id="wali-code"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              value={code}
              disabled={locked || pending}
              onChange={(event) => setCode(event.target.value.replace(/\D/g, "").slice(0, 6))}
              className="w-full rounded-xl border px-3 py-3 text-center text-lg tracking-[0.4em]"
              style={{ borderColor: "#D0C7B6", background: "#F3EFE8" }}
              placeholder="••••••"
            />
            {error ? (
              <p className="mt-2 text-center text-sm" style={{ color: "#8A3D3D" }}>
                {error}
              </p>
            ) : null}
            <button
              type="submit"
              disabled={locked || pending || code.length !== 6}
              className="mt-3 w-full rounded-[10px] py-2.5 text-sm font-medium text-white disabled:opacity-50"
              style={{ background: "#1B6B4A" }}
            >
              {pending ? "Opening…" : "Open"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
