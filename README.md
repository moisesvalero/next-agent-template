# Next Agent Template

Plantilla Next.js para crear webs y web apps simples trabajando con agentes de IA. Viene con TypeScript, App Router, Tailwind CSS, oxlint, knip, Prettier, tests, hooks de pre-commit, validación de entorno, headers de seguridad y una guía `AGENTS.md` lista para Codex, Claude, Cursor u otros agentes.

![Captura de la plantilla](docs/images/home-screenshot.png)

Demo: [https://next-agent-template.vercel.app](https://next-agent-template.vercel.app)

## Stack

- Next.js 16 con App Router.
- React 19 y TypeScript estricto.
- Tailwind CSS 4.
- Oxlint para análisis estático rápido.
- Knip para detectar dependencias, exports y archivos sin uso.
- Prettier con ordenación de clases Tailwind.
- Vitest, jsdom y Testing Library.
- Husky y lint-staged para validar antes de cada commit.
- Zod para validar variables de entorno.
- shadcn-style components con `components.json`, `cn()` y `Button`.
- Supabase y Sanity preconfigurados como integraciones opcionales.
- SEO/AEO/GEO base con metadata, sitemap, robots, manifest, Open Graph dinámico, `llms.txt` y JSON-LD.

## Arranque rápido

```bash
pnpm install
pnpm run agent:skills
pnpm run dev
```

Abre `http://localhost:3000`.

## Trabajar con agentes

1. Clona esta plantilla para cada proyecto nuevo.
2. Abre la carpeta con tu agente favorito.
3. Pídele que lea `AGENTS.md` antes de modificar código.
4. Ejecuta `pnpm run agent:skills` si quieres que `pnpm dlx autoskills` detecte skills útiles para el proyecto.
5. Antes de cerrar una tarea, pide siempre `pnpm run verify`.

## Scripts

```bash
pnpm run dev           # servidor local
pnpm run build         # build de producción
pnpm run start         # servir build
pnpm run lint          # oxlint
pnpm run lint:fix      # oxlint con fixes
pnpm run knip          # dependencias, exports y archivos sin uso
pnpm run ui:add        # añadir componentes con shadcn
pnpm run check         # TypeScript sin emitir archivos
pnpm run format        # formatear con Prettier
pnpm run format:check  # comprobar formato
pnpm test              # tests unitarios
pnpm run test:watch    # tests en modo watch
pnpm run audit         # auditoria de vulnerabilidades high+
pnpm run verify        # lint, knip, tipos, formato, tests, build y audit
pnpm run agent:skills  # pnpm dlx autoskills
pnpm run agent:impeccable # instala la skill Impeccable en el harness detectado
pnpm run design:audit  # detecta patrones visuales flojos con Impeccable
```

## Herramientas opcionales para diseño con agentes

### Impeccable

[Impeccable](https://impeccable.style/) es una skill para que el agente diseñe, critique, pula y audite interfaces con mejor criterio visual. Vale la pena para esta plantilla porque vive cerca del código, funciona con Codex/Cursor/Claude/Gemini y permite comandos como audit, polish, typeset o colorize.

Instalación recomendada en cada proyecto clonado:

```bash
pnpm run agent:impeccable
```

Auditoria visual rapida:

```bash
pnpm run design:audit
```

### Windframe MCP

[Windframe MCP](https://windframe.dev/mcp) conecta tu agente a sistemas de diseño, componentes y tokens Tailwind. Es útil cuando quieres que el agente genere UI con estilos tipo Linear, ShadCN, Notion o Enterprise sin inventarse valores.

No va como dependencia fija de esta plantilla porque requiere cuenta/OAuth y se configura en el cliente MCP del agente, no dentro de Next.js. Úsalo cuando el proyecto necesite una dirección visual más concreta:

```bash
# Ejemplo Claude Code
claude mcp add --transport http windframe-mcp https://mcp.windframe.dev/mcp
```

## Estructura

```text
src/
  app/             # rutas, layouts, sitemap, robots y estilos globales
  components/      # componentes reutilizables, UI y SEO
  config/          # configuración del sitio
  lib/             # utilidades, env, SEO, servicios y Supabase
  sanity/          # cliente y queries de Sanity
  test/            # setup de tests
```

## SEO, AEO y GEO

La plantilla trae una base razonable para buscadores clásicos y motores de respuesta:

- `src/config/site.ts`: nombre, descripción, URL, locale y keywords.
- `src/lib/seo.ts`: helper `createPageMetadata()` y JSON-LD.
- `src/components/seo/json-ld.tsx`: inserta datos estructurados de forma segura.
- `src/app/sitemap.ts`: genera `/sitemap.xml`.
- `src/app/robots.ts`: genera `/robots.txt`.
- `src/app/manifest.ts`: genera `/manifest.webmanifest`.
- `src/app/opengraph-image.tsx`: genera la imagen social por defecto.
- `src/app/llms.txt/route.ts`: publica `/llms.txt` para agentes y motores de respuesta.

Para cada proyecto, cambia primero `src/config/site.ts` y `NEXT_PUBLIC_APP_URL`. Luego usa `createPageMetadata()` en páginas concretas cuando necesites title, description o canonical propios.

## UI con shadcn

No se instala shadcn como caja cerrada. La plantilla deja la base compatible:

- `components.json` para que el CLI de shadcn sepa donde poner componentes.
- `src/lib/utils.ts` con `cn()`.
- `src/components/ui/button.tsx` como primer componente.
- Variables de color en `src/app/globals.css`.

Puedes añadir componentes con:

```bash
pnpm dlx shadcn@latest add card input textarea form
```

## Supabase

Supabase queda preparado para auth, base de datos y storage sin obligarte a crear cuenta desde el día uno.

Archivos:

- `src/lib/supabase/browser.ts`: cliente para componentes cliente.
- `src/lib/supabase/server.ts`: cliente para Server Components, Route Handlers y Server Actions.
- `src/lib/services.ts`: detecta si Supabase está configurado.

Variables:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Uso en cliente:

```tsx
"use client";

import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

const supabase = createSupabaseBrowserClient();
```

Uso en servidor:

```tsx
import { createSupabaseServerClient } from "@/lib/supabase/server";

const supabase = await createSupabaseServerClient();
```

## Sanity

Sanity queda preparado como CMS headless opcional para blogs, landing pages, portfolios o contenido editable.

Archivos:

- `src/sanity/client.ts`: cliente Sanity.
- `src/sanity/queries.ts`: query de ejemplo para posts.
- `src/lib/services.ts`: detecta si Sanity está configurado.

Variables:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=
```

Uso:

```ts
import { createSanityClient } from "@/sanity/client";
import { latestPostsQuery } from "@/sanity/queries";

const posts = await createSanityClient().fetch(latestPostsQuery);
```

## Variables de entorno

Copia `.env.example` a `.env.local`:

```bash
cp .env.example .env.local
```

El contrato de entorno vive en `src/lib/env.ts`. Añade ahí cada variable nueva para fallar pronto si falta o tiene mal formato. Supabase y Sanity son opcionales: si faltan sus variables, la app sigue funcionando.

## Seguridad incluida

- `poweredByHeader: false`.
- Headers base: `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`.
- HSTS solo en producción.
- `.env*` ignorado por Git.
- `pnpm audit --audit-level high` en la verificación completa.
- Dependabot para dependencias JavaScript y GitHub Actions.
- Hook pre-commit con lint-staged, TypeScript y Vitest.

## Crear un proyecto desde esta plantilla

Cuando la subas a GitHub, puedes usarla como template o clonarla:

```bash
git clone <tu-repo> mi-proyecto
cd mi-proyecto
pnpm install
pnpm run agent:skills
pnpm run verify
```

Después cambia `name`, `metadata`, textos de la home y variables de entorno según el proyecto.
