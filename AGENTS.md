# AGENTS.md

Operational guide for AI agents working on this Next.js template.

## Priorities

1. Always prioritize the user's direct instructions first.
2. Read this file before modifying any code.
3. Next.js might have received updates after your knowledge cutoff. Before modifying Next.js APIs, consult `node_modules/next/dist/docs/` or the official up-to-date documentation.
4. Keep changes small, testable, and easy to roll back.

## Recommended Flow for Agents

- This project uses **pnpm**. Do not use `npm` or generate a `package-lock.json` file unless explicitly requested.
- Run `pnpm dlx autoskills` (or use the helper script `pnpm run agent:skills`) when starting a project cloned from this template to install or update helpful system skills tailored for this stack. Learn more at [AutoSkills](https://www.autoskills.sh/).
- For UI/UX work, you can install the Impeccable skill with `pnpm run agent:impeccable` and use it to audit, polish, or document the interface.
- If you support Superpowers or specialized skill sets, activate the appropriate skill before starting the task:
  - `brainstorming`: Defining new features or product changes.
  - `test-driven-development`: Writing bugfixes or new business logic.
  - `systematic-debugging`: Debugging errors, regressions, or test failures.
  - `verification-before-completion`: Verifying your changes before declaring a task finished.
- Before editing, review `package.json`, the structure under `src/`, and the available scripts.
- Do not revert user changes. If you encounter changes made by the user, adapt to them or ask for clarification if they block your progress.

## Verification Commands

Run the commands that apply to your changes before concluding any task:

```bash
pnpm run lint          # Run oxlint check
pnpm run knip          # Detect unused dependencies and files
pnpm run check         # Run TypeScript type check
pnpm run format:check  # Check formatting with Prettier
pnpm test              # Run unit tests with Vitest
pnpm run build         # Build the application
pnpm run design:audit  # Perform visual audit with Impeccable (if installed)
```

To run all checks at once:

```bash
pnpm run verify
```

If a check cannot be executed, explain why and state the associated risks.

## Project Conventions

- Strict TypeScript usage.
- Next.js App Router under `src/app`.
- Reusable components under `src/components`.
- Utilities and validators under `src/lib`.
- Site config and SEO metadata definitions in `src/config/site.ts` and `src/lib/seo.ts`.
- shadcn-style components in `src/components/ui`. Use `components.json` as the configuration contract for new components.
- Supabase integrations are optional and reside in `src/lib/supabase`. Do not instantiate Supabase clients if env variables are missing.
- Sanity integrations are optional and reside in `src/sanity`. Do not instantiate Sanity clients if env variables are missing.
- Write tests alongside the code or in `__tests__` folders, using `.test.ts` or `.test.tsx` extensions.
- Use Prettier for formatting, oxlint for fast static analysis, and knip to detect unused dependencies, exports, or orphan files.

## Basic Security

- Never commit secrets or API keys. Use `.env.local` for local secrets and `.env.example` as a public contract.
- Validate all environment variables through `src/lib/env.ts`.
- Keep `robots.ts`, `sitemap.ts`, `manifest.ts`, `opengraph-image.tsx`, `llms.txt`, and JSON-LD structured data in sync with the actual project content.
- Do not change security headers in `next.config.ts` unless there is a clear and justified reason.
- Avoid `dangerouslySetInnerHTML`. If strictly necessary, document the HTML source and sanitize it properly.
- Do not add new dependencies without justifying their usage in the final summary or README.
