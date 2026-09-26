# Payments & Billing Module Rules

## Supported Providers

- Supports **Polar.sh** (default, Merchant of Record handling global taxes & VAT) and **Stripe**.
- Provider selection is driven by `PAYMENT_PROVIDER` env variable (`polar` or `stripe`).

## Security Prohibitions (NON-NEGOTIABLE)

- ❌ **NEVER** log or expose API secret keys (`POLAR_ACCESS_TOKEN`, `STRIPE_SECRET_KEY`).
- ❌ **NEVER** trust payment amounts, tier names, or credit packages sent from client requests.
- ❌ **NEVER** process webhooks without cryptographic signature verification:
  - Polar: Standard Webhooks signature verification headers.
  - Stripe: `stripe.webhooks.constructEvent(body, signature, secret)`.
- ❌ **NEVER** deduct or grant credits client-side.
- ❌ **NEVER** allow negative credit balances.
- ✅ **ALWAYS** use atomic transactions (`prisma.$transaction`) for credit modifications to avoid race conditions.

## Barrel Files Prohibition

- ❌ **NEVER** create `index.ts` barrel files in this directory. Import directly from specific files:
  - `@/lib/payments/config`
  - `@/lib/payments/service`
  - `@/lib/payments/credits`
