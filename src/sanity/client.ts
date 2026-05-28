import { createClient } from "@sanity/client";

import { env } from "@/lib/env";

export const sanityApiVersion = "2026-05-28";

export function createSanityClient() {
  if (!env.NEXT_PUBLIC_SANITY_PROJECT_ID || !env.NEXT_PUBLIC_SANITY_DATASET) {
    throw new Error(
      "Sanity is not configured. Add NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET to .env.local.",
    );
  }

  return createClient({
    projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: sanityApiVersion,
    useCdn: process.env.NODE_ENV === "production",
    token: env.SANITY_API_READ_TOKEN,
  });
}
