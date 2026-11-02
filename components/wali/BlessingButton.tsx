"use client";

import { useState } from "react";
import { blessWaliCourtship, withdrawWaliBlessing } from "@/app/wali/actions";

type BlessingButtonProps = {
  token: string;
  code: string;
  blessed: boolean;
};

export function BlessingButton({ token, code, blessed }: BlessingButtonProps) {
  const [approved, setApproved] = useState(blessed);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const run = async (next: boolean) => {
    if (pending || approved === next) return;
    setPending(true);
    setError(null);
    const result = next
      ? await blessWaliCourtship(token, code)
      : await withdrawWaliBlessing(token, code);
    setPending(false);
    if (!result.success) {
      setError(result.error ?? "Could not update the approval.");
      return;
    }
    setApproved(next);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          disabled={approved || pending}
          onClick={() => {
            void run(true);
          }}
          className="rounded-[10px] px-4 py-2 text-[13px] font-medium text-white disabled:cursor-default"
          style={{
            background: approved ? "#D8E6CC" : "#1B6B4A",
            color: approved ? "#1B6B4A" : "#FFFFFF",
          }}
        >
          {approved ? "Approved ✓" : pending && !approved ? "Saving…" : "Send Blessing"}
        </button>
        {approved ? (
          <button
            type="button"
            disabled={pending}
            onClick={() => {
              void run(false);
            }}
            className="rounded-[10px] border px-4 py-2 text-[13px] font-medium disabled:opacity-50"
            style={{
              borderColor: "#D0C7B6",
              background: "#FFFCF8",
              color: "#1A1A1A",
            }}
          >
            {pending ? "Saving…" : "Remove approval"}
          </button>
        ) : null}
      </div>
      {error ? (
        <p className="text-xs" style={{ color: "#8A3D3D" }}>
          {error}
        </p>
      ) : null}
    </div>
  );
}
