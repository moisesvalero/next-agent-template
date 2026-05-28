import { env } from "./env";

export type OptionalServiceConfig =
  | {
      enabled: true;
      url?: string;
      projectId?: string;
      dataset?: string;
    }
  | {
      enabled: false;
      reason: string;
    };

export function getSupabaseConfig(): OptionalServiceConfig {
  if (!env.NEXT_PUBLIC_SUPABASE_URL || !env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return {
      enabled: false,
      reason:
        "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY",
    };
  }

  return {
    enabled: true,
    url: env.NEXT_PUBLIC_SUPABASE_URL,
  };
}

export function getSanityConfig(): OptionalServiceConfig {
  if (!env.NEXT_PUBLIC_SANITY_PROJECT_ID || !env.NEXT_PUBLIC_SANITY_DATASET) {
    return {
      enabled: false,
      reason:
        "Missing NEXT_PUBLIC_SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_DATASET",
    };
  }

  return {
    enabled: true,
    projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  };
}
