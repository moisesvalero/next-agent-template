import { describe, expect, it } from "vitest";

import { getSanityConfig, getSupabaseConfig } from "./services";

describe("service config helpers", () => {
  it("reports Supabase as disabled when credentials are missing", () => {
    expect(getSupabaseConfig()).toMatchObject({
      enabled: false,
      reason:
        "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY",
    });
  });

  it("reports Sanity as disabled when project config is missing", () => {
    expect(getSanityConfig()).toMatchObject({
      enabled: false,
      reason:
        "Missing NEXT_PUBLIC_SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_DATASET",
    });
  });
});
