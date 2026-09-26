import {
  ArrowLeft,
  Building2,
  Coins,
  CreditCard,
  ShieldCheck,
  User,
  Zap,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { CREDIT_PACKS } from "@/lib/payments/config";

export const metadata: Metadata = {
  title: "SaaS Dashboard | Next Agent Template",
  description:
    "Private user dashboard managing teams, credit balances, billing, and two-factor authentication.",
};

export default function DashboardPage() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <header className="border-border bg-card border-b px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm transition-colors"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              <span>Back to Home</span>
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="font-semibold">Dashboard</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="bg-primary/10 text-primary border-primary/20 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium">
              <Zap className="size-3.5" aria-hidden="true" />
              SaaS Engine Ready
            </span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-8 px-6 py-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Account & Workspaces
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Manage your personal profile, multi-tenant organizations, and credit
            balance.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* User Profile Card */}
          <div className="border-border bg-card rounded-xl border p-6 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 text-primary rounded-lg p-2.5">
                <User className="size-5" aria-hidden="true" />
              </div>
              <div>
                <h2 className="text-base font-semibold">User Session</h2>
                <p className="text-muted-foreground text-xs">Better Auth</p>
              </div>
            </div>

            <div className="mt-5 space-y-3 text-sm">
              <div className="bg-muted/40 rounded-lg p-3">
                <div className="text-muted-foreground text-xs">Role</div>
                <div className="font-medium">Administrator</div>
              </div>
              <div className="bg-muted/40 rounded-lg p-3">
                <div className="text-muted-foreground text-xs">Status</div>
                <div className="font-medium text-emerald-600 dark:text-emerald-400">
                  Active (Verified)
                </div>
              </div>
            </div>
          </div>

          {/* Organizations / Multitenancy Card */}
          <div className="border-border bg-card rounded-xl border p-6 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 text-primary rounded-lg p-2.5">
                <Building2 className="size-5" aria-hidden="true" />
              </div>
              <div>
                <h2 className="text-base font-semibold">Organization</h2>
                <p className="text-muted-foreground text-xs">
                  B2B Multi-tenancy
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-3 text-sm">
              <div className="bg-muted/40 rounded-lg p-3">
                <div className="text-muted-foreground text-xs">
                  Current Team
                </div>
                <div className="font-medium">Acme Engineering (Owner)</div>
              </div>
              <div className="bg-muted/40 rounded-lg p-3">
                <div className="text-muted-foreground text-xs">
                  Member Invites
                </div>
                <div className="font-medium">3 active members</div>
              </div>
            </div>
          </div>

          {/* Two-Factor Auth (2FA) Card */}
          <div className="border-border bg-card rounded-xl border p-6 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 text-primary rounded-lg p-2.5">
                <ShieldCheck className="size-5" aria-hidden="true" />
              </div>
              <div>
                <h2 className="text-base font-semibold">Security (2FA)</h2>
                <p className="text-muted-foreground text-xs">
                  TOTP & Backup Codes
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-3 text-sm">
              <div className="bg-muted/40 rounded-lg p-3">
                <div className="text-muted-foreground text-xs">
                  Two-Factor Status
                </div>
                <div className="font-medium text-emerald-600 dark:text-emerald-400">
                  TOTP Configured
                </div>
              </div>
              <div className="bg-muted/40 rounded-lg p-3">
                <div className="text-muted-foreground text-xs">
                  Protection Level
                </div>
                <div className="font-medium">High (Session Guard)</div>
              </div>
            </div>
          </div>
        </div>

        {/* Credit Ledger & Billing Section */}
        <div className="border-border bg-card rounded-xl border p-6 shadow-xs">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 text-primary rounded-lg p-2.5">
                <Coins className="size-5" aria-hidden="true" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">
                  Credit Balance & Billing
                </h2>
                <p className="text-muted-foreground text-sm">
                  Atomic transactional ledger powered by Prisma & Polar
                  (Merchant of Record).
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-muted-foreground text-xs">
                  Available Balance
                </div>
                <div className="text-2xl font-bold">500 Credits</div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-sm font-semibold tracking-wide uppercase">
              Purchase Additional Credit Packs
            </h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              {CREDIT_PACKS.map((pack) => (
                <div
                  key={pack.id}
                  className="border-border/60 bg-muted/20 flex flex-col justify-between rounded-lg border p-4"
                >
                  <div>
                    <div className="font-medium">{pack.name}</div>
                    <div className="text-primary mt-1 text-2xl font-bold">
                      {pack.credits}{" "}
                      <span className="text-xs font-normal">credits</span>
                    </div>
                    <p className="text-muted-foreground mt-1 text-xs">
                      ${(pack.priceInCents / 100).toFixed(2)} USD one-time
                    </p>
                  </div>

                  <div className="mt-5">
                    <Button variant="outline" className="w-full text-xs">
                      <CreditCard
                        className="mr-1.5 size-3.5"
                        aria-hidden="true"
                      />
                      Buy via Polar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
