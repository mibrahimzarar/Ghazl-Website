"use client";

import { useState } from "react";
import { blessWaliCourtship } from "@/app/wali/actions";

type BlessingButtonProps = {
  token: string;
  blessed: boolean;
};

export function BlessingButton({ token, blessed }: BlessingButtonProps) {
  const [done, setDone] = useState(blessed);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onBless = async () => {
    if (done || pending) return;
    setPending(true);
    setError(null);
    const result = await blessWaliCourtship(token);
    setPending(false);
    if (!result.success) {
      setError(result.error ?? "Could not record the blessing.");
      return;
    }
    setDone(true);
  };

  return (
    <div className="flex flex-col items-stretch gap-2 sm:items-end">
      <button
        type="button"
        disabled={done || pending}
        onClick={() => {
          void onBless();
        }}
        className="rounded-full bg-gold px-4 py-2 text-sm font-semibold text-bg-deep transition-opacity disabled:cursor-default disabled:opacity-80"
      >
        {done ? "Approved ✓" : pending ? "Saving…" : "Send Blessing"}
      </button>
      {error ? <p className="text-xs text-gradient-mid">{error}</p> : null}
    </div>
  );
}
