export type WaliLinkMessage = {
  id: string;
  sender_role: "woman" | "suitor";
  body: string;
  created_at: string;
};

export type WaliLinkView = {
  conversation_id: string;
  wali_blessing_at: string | null;
  woman: {
    first_name: string | null;
    wali_name: string | null;
    wali_relationship: string | null;
  };
  suitor: {
    display_name: string;
    age: number | null;
    city: string | null;
    country: string | null;
    marital_status: string | null;
    occupation: string | null;
    highest_education: string | null;
    salah: string | null;
    madhhab: string | null;
    marriage_timeline: string | null;
    is_verified: boolean;
  };
  suitor_profile: Record<string, unknown> | null;
  messages: WaliLinkMessage[];
};

export type SuitorFact = { label: string; value: string };

export function buildSuitorFacts(view: WaliLinkView): SuitorFact[] {
  const suitor = view.suitor;
  const location = [suitor.city, suitor.country].filter(Boolean).join(", ");
  const facts: Array<SuitorFact | null> = [
    suitor.age ? { label: "Age", value: String(suitor.age) } : null,
    location ? { label: "Location", value: location } : null,
    suitor.marital_status
      ? { label: "Marital status", value: suitor.marital_status }
      : null,
    suitor.salah ? { label: "Salah", value: suitor.salah } : null,
    suitor.madhhab ? { label: "Madhhab", value: suitor.madhhab } : null,
    suitor.occupation
      ? { label: "Occupation", value: suitor.occupation }
      : null,
    suitor.highest_education
      ? { label: "Education", value: suitor.highest_education }
      : null,
    suitor.marriage_timeline
      ? { label: "Timeline", value: suitor.marriage_timeline }
      : null,
  ];
  return facts.filter((fact): fact is SuitorFact => fact !== null);
}

function supabaseConfig(): { url: string; key: string } | null {
  const url =
    process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const key =
    process.env.SUPABASE_ANON_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    "";
  if (!url || !key) return null;
  return { url: url.replace(/\/+$/, ""), key };
}

async function callRpc<T>(
  fn: string,
  args: Record<string, unknown>,
): Promise<{ data: T | null; error: string | null }> {
  const config = supabaseConfig();
  if (!config) {
    return {
      data: null,
      error: "Wali portal is not configured yet.",
    };
  }

  const response = await fetch(`${config.url}/rest/v1/rpc/${fn}`, {
    method: "POST",
    headers: {
      apikey: config.key,
      Authorization: `Bearer ${config.key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(args),
    cache: "no-store",
  });

  if (!response.ok) {
    return {
      data: null,
      error: "This Wali link could not be opened.",
    };
  }

  const data = (await response.json()) as T | null;
  return { data, error: null };
}

export type WaliLinkState = "invalid" | "ready" | "locked" | "unavailable";

export function waliAccessErrorMessage(error: string | null | undefined): string {
  if (error === "wrong_code") return "That code is not right.";
  if (error === "locked") return "Too many tries. Wait a few minutes and try again.";
  if (error === "invalid") return "This Wali link was not found or has been revoked.";
  return error?.trim() || "This Wali link could not be opened.";
}

function readGate(data: unknown): { ok: boolean; error: string | null } {
  if (!data || typeof data !== "object") {
    return { ok: false, error: "invalid" };
  }
  const gate = data as { ok?: boolean; error?: string };
  if (gate.ok === false) return { ok: false, error: gate.error ?? "invalid" };
  if (gate.ok === true) return { ok: true, error: null };
  return { ok: false, error: "invalid" };
}

export async function fetchWaliLinkStatus(token: string): Promise<WaliLinkState> {
  const trimmed = token.trim();
  if (trimmed.length < 16) return "invalid";
  const result = await callRpc<{ state?: string }>("wali_link_status", {
    p_token: trimmed,
  });
  if (result.error || !result.data?.state) return "unavailable";
  if (
    result.data.state === "invalid" ||
    result.data.state === "ready" ||
    result.data.state === "locked"
  ) {
    return result.data.state;
  }
  return "invalid";
}

export async function fetchWaliLinkView(
  token: string,
  accessCode: string,
): Promise<{ view: WaliLinkView | null; error: string | null }> {
  const trimmed = token.trim();
  const code = accessCode.trim();
  if (trimmed.length < 16 || code.length !== 6) {
    return { view: null, error: waliAccessErrorMessage("invalid") };
  }

  const result = await callRpc<WaliLinkView & { ok?: boolean; error?: string }>(
    "get_wali_chaperone_view",
    { p_token: trimmed, p_code: code },
  );

  if (result.error) return { view: null, error: result.error };
  const gate = readGate(result.data);
  if (!gate.ok || !result.data) {
    return { view: null, error: waliAccessErrorMessage(gate.error) };
  }

  return {
    view: {
      ...result.data,
      suitor_profile: result.data.suitor_profile ?? null,
    },
    error: null,
  };
}

export async function recordWaliBlessing(
  token: string,
  accessCode: string,
): Promise<{ success: boolean; error: string | null }> {
  const trimmed = token.trim();
  const code = accessCode.trim();
  if (trimmed.length < 16 || code.length !== 6) {
    return { success: false, error: waliAccessErrorMessage("invalid") };
  }

  const result = await callRpc<{ ok?: boolean; error?: string }>("wali_record_blessing", {
    p_token: trimmed,
    p_code: code,
  });
  const gate = readGate(result.data);
  if (result.error || !gate.ok) {
    return {
      success: false,
      error: result.error ?? waliAccessErrorMessage(gate.error),
    };
  }
  return { success: true, error: null };
}

export async function revokeWaliBlessing(
  token: string,
  accessCode: string,
): Promise<{ success: boolean; error: string | null }> {
  const trimmed = token.trim();
  const code = accessCode.trim();
  if (trimmed.length < 16 || code.length !== 6) {
    return { success: false, error: waliAccessErrorMessage("invalid") };
  }

  const result = await callRpc<{ ok?: boolean; error?: string }>("wali_revoke_blessing", {
    p_token: trimmed,
    p_code: code,
  });
  const gate = readGate(result.data);
  if (result.error || !gate.ok) {
    return {
      success: false,
      error: result.error ?? waliAccessErrorMessage(gate.error),
    };
  }
  return { success: true, error: null };
}
