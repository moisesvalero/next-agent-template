# Auth Module Rules

## Architectural Boundaries

- Authentication is managed via **Better Auth** with Prisma adapter as the primary engine.
- Supabase Auth remains supported as an optional secondary service.
- Never import auth server code (`src/lib/auth/server.ts`) into Client Components (`"use client"`). Use `src/lib/auth/client.ts` instead.
- Auth route handler is located at `src/app/api/auth/[...all]/route.ts`.

## Security Prohibitions (NON-NEGOTIABLE)

- ❌ **NEVER** expose `BETTER_AUTH_SECRET` or database credentials to the client.
- ❌ **NEVER** trust client-supplied user roles or permissions without server-side verification.
- ❌ **NEVER** bypass session checks in mutation endpoints (Server Actions / Route Handlers).
- ✅ **ALWAYS** verify active session using `auth.api.getSession({ headers: await headers() })` in Server Components and route handlers.
- ✅ **ALWAYS** record administrative actions (bans, impersonation, role changes) in `AuditLog`.

## Barrel Files Prohibition

- ❌ **NEVER** create `index.ts` barrel files in this directory. Import directly from specific files:
  - `@/lib/auth/server`
  - `@/lib/auth/client`
