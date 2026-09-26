import { describe, expect, it } from "vitest";

import {
  getBetterAuthConfig,
  getPaymentConfig,
  getSanityConfig,
  getSupabaseConfig,
} from "./services";

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

  it("reports Better Auth as disabled when database or secret is missing", () => {
    expect(getBetterAuthConfig()).toMatchObject({
      enabled: false,
      reason: "Missing DATABASE_URL or BETTER_AUTH_SECRET",
    });
  });

  it("reports Payment provider config according to active provider", () => {
    expect(getPaymentConfig()).toMatchObject({
      enabled: false,
      reason: "Missing POLAR_ACCESS_TOKEN",
    });
  });
});
