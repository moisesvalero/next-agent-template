# Security & Hardening Module Rules

## Core Responsibilities

- **Reverse Proxy Rate Limiting**: Accurately read client IP addresses through reverse proxies (Coolify, Traefik, Cloudflare) using `TRUSTED_PROXY_HOPS` to prevent IP header spoofing.
- **HMAC Unsubscribe Tokens**: Generate cryptographic HMAC tokens for email unsubscription links without requiring user authentication.
- **Audit Logging**: Maintain an append-only `AuditLog` of security and administrative operations.
- **GDPR Compliance**: Support scheduled user deletion (`scheduledDeletionAt`) with grace period.

## Security Prohibitions (NON-NEGOTIABLE)

- ❌ **NEVER** trust raw `x-forwarded-for` headers blindly without accounting for trusted proxy hops.
- ❌ **NEVER** expose internal HMAC signing secrets.
- ❌ **NEVER** allow insecure direct object references (IDOR) on unsubscribe endpoints.
- ✅ **ALWAYS** sanitize user input when rendering external HTML.

## Barrel Files Prohibition

- ❌ **NEVER** create `index.ts` barrel files in this directory. Import directly from specific files:
  - `@/lib/security/rate-limit`
  - `@/lib/security/tokens`
  - `@/lib/security/audit`
