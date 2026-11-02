"use server";

import { recordWaliBlessing } from "@/lib/wali/chaperone";

export async function blessWaliCourtship(token: string) {
  return recordWaliBlessing(token);
}
