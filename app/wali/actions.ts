"use server";

import {
  fetchWaliChaperoneView,
  fetchWaliLinkStatus,
  recordWaliBlessing,
  revokeWaliBlessing,
  type WaliChaperoneView,
  type WaliLinkState,
} from "@/lib/wali/chaperone";
import {
  buildWaliDiscoverCard,
  buildWaliProfileSections,
  type WaliDiscoverCard,
  type WaliSection,
} from "@/lib/wali/profileView";

export async function readWaliLinkStatus(token: string): Promise<WaliLinkState> {
  return fetchWaliLinkStatus(token);
}

export async function unlockWaliPortal(
  token: string,
  code: string,
): Promise<{
  view: WaliChaperoneView | null;
  card: WaliDiscoverCard | null;
  sections: WaliSection[];
  error: string | null;
}> {
  const result = await fetchWaliChaperoneView(token, code);
  if (!result.view) {
    return { view: null, card: null, sections: [], error: result.error };
  }
  const supabaseUrl =
    process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  return {
    view: result.view,
    card: buildWaliDiscoverCard(
      result.view.suitor_profile,
      result.view.suitor.display_name,
      supabaseUrl,
    ),
    sections: buildWaliProfileSections(result.view.suitor_profile),
    error: null,
  };
}

export async function blessWaliCourtship(token: string, code: string) {
  return recordWaliBlessing(token, code);
}

export async function withdrawWaliBlessing(token: string, code: string) {
  return revokeWaliBlessing(token, code);
}
