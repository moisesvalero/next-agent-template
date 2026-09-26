import { env } from "@/lib/env";

export interface CreditPack {
  id: string;
  name: string;
  credits: number;
  priceInCents: number;
  polarProductId?: string;
  stripePriceId?: string;
}

export const CREDIT_PACKS: CreditPack[] = [
  {
    id: "pack-starter",
    name: "Starter Pack",
    credits: 100,
    priceInCents: 1000, // $10.00
  },
  {
    id: "pack-pro",
    name: "Pro Pack",
    credits: 500,
    priceInCents: 4000, // $40.00
  },
  {
    id: "pack-scale",
    name: "Scale Pack",
    credits: 2000,
    priceInCents: 12000, // $120.00
  },
];

export const paymentConfig = {
  provider: env.PAYMENT_PROVIDER,
  polar: {
    accessToken: env.POLAR_ACCESS_TOKEN || "",
    webhookSecret: env.POLAR_WEBHOOK_SECRET || "",
    server: env.POLAR_SERVER,
  },
  stripe: {
    secretKey: env.STRIPE_SECRET_KEY || "",
    webhookSecret: env.STRIPE_WEBHOOK_SECRET || "",
    publishableKey: env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "",
  },
};
