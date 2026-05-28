# Security Policy

## Supported versions

This template tracks the `main` branch.

## Reporting a vulnerability

Open a private GitHub security advisory when the repository is used as a real product. For template issues, open a normal issue without secrets, tokens, database URLs, or customer data.

## Defaults

- Keep secrets in `.env.local`, never in Git.
- Validate new environment variables in `src/lib/env.ts`.
- Run `npm run verify` before shipping changes.
- Keep `npm audit --audit-level=high` green.
