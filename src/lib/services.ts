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

export function getBetterAuthConfig(): OptionalServiceConfig {
  if (!env.DATABASE_URL || !env.BETTER_AUTH_SECRET) {
    return {
      enabled: false,
      reason: "Missing DATABASE_URL or BETTER_AUTH_SECRET",
    };
  }

  return {
    enabled: true,
    url: env.BETTER_AUTH_URL || env.NEXT_PUBLIC_APP_URL,
  };
}

export function getPaymentConfig(): OptionalServiceConfig {
  const provider = env.PAYMENT_PROVIDER;
  if (provider === "polar") {
    if (!env.POLAR_ACCESS_TOKEN) {
      return {
        enabled: false,
        reason: "Missing POLAR_ACCESS_TOKEN",
      };
    }
    return {
      enabled: true,
      url: env.POLAR_SERVER,
    };
  }

  if (!env.STRIPE_SECRET_KEY) {
    return {
      enabled: false,
      reason: "Missing STRIPE_SECRET_KEY",
    };
  }

  return {
    enabled: true,
  };
}
