export type WaliChaperoneMessage = {
  id: string;
  sender_role: "woman" | "suitor";
  body: string;
  created_at: string;
};

export type WaliChaperoneView = {
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
  messages: WaliChaperoneMessage[];
};

export type SuitorFact = { label: string; value: string };

export function buildSuitorFacts(view: WaliChaperoneView): SuitorFact[] {
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

export async function fetchWaliChaperoneView(
  token: string,
): Promise<{ view: WaliChaperoneView | null; error: string | null }> {
  const trimmed = token.trim();
  if (trimmed.length < 16) {
    return { view: null, error: "This Wali link is not valid." };
  }

  const result = await callRpc<WaliChaperoneView>(
    "get_wali_chaperone_view",
    { p_token: trimmed },
  );

  if (result.error) return { view: null, error: result.error };
  if (!result.data) {
    return {
      view: null,
      error: "This Wali link was not found or has been revoked.",
    };
  }

  return { view: result.data, error: null };
}

export async function recordWaliBlessing(
  token: string,
): Promise<{ success: boolean; error: string | null }> {
  const trimmed = token.trim();
  if (trimmed.length < 16) {
    return { success: false, error: "This Wali link is not valid." };
  }

  const result = await callRpc<boolean>("wali_record_blessing", {
    p_token: trimmed,
  });

  if (result.error || !result.data) {
    return {
      success: false,
      error: result.error ?? "Could not record the blessing.",
    };
  }

  return { success: true, error: null };
}
