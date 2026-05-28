# Next Agent Template

Plantilla Next.js para crear webs y web apps simples trabajando con agentes de IA. Viene con TypeScript, App Router, Tailwind CSS, ESLint, Prettier, tests, validacion de entorno, headers de seguridad y una guia `AGENTS.md` lista para Codex, Claude, Cursor u otros agentes.

![Captura de la plantilla](docs/images/home-screenshot.png)

## Stack

- Next.js 16 con App Router.
- React 19 y TypeScript estricto.
- Tailwind CSS 4.
- ESLint 9 con reglas de Next y seguridad.
- Prettier con ordenacion de clases Tailwind.
- Vitest, jsdom y Testing Library.
- Zod para validar variables de entorno.

## Arranque rapido

```bash
npm install
npm run agent:skills
npm run dev
```

Abre `http://localhost:3000`.

## Trabajar con agentes

1. Clona esta plantilla para cada proyecto nuevo.
2. Abre la carpeta con tu agente favorito.
3. Pidele que lea `AGENTS.md` antes de modificar codigo.
4. Ejecuta `npm run agent:skills` si quieres que `npx autoskills` detecte skills utiles para el proyecto.
5. Antes de cerrar una tarea, pide siempre `npm run verify`.

## Scripts

```bash
npm run dev           # servidor local
npm run build         # build de produccion
npm run start         # servir build
npm run lint          # ESLint
npm run lint:fix      # ESLint con fixes
npm run check         # TypeScript sin emitir archivos
npm run format        # formatear con Prettier
npm run format:check  # comprobar formato
npm test              # tests unitarios
npm run test:watch    # tests en modo watch
npm run audit         # auditoria de vulnerabilidades high+
npm run verify        # formato, lint, tipos, tests, build y audit
npm run agent:skills  # npx autoskills
```

## Estructura

```text
src/
  app/        # rutas, layouts y estilos globales
  lib/        # utilidades compartidas y validadores
  test/       # setup de tests
```

## Variables de entorno

Copia `.env.example` a `.env.local`:

```bash
cp .env.example .env.local
```

El contrato de entorno vive en `src/lib/env.ts`. Anade ahi cada variable nueva para fallar pronto si falta o tiene mal formato.

## Seguridad incluida

- `poweredByHeader: false`.
- Headers base: `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`.
- HSTS solo en produccion.
- `.env*` ignorado por Git.
- `npm audit --audit-level=high` en la verificacion completa.
- Dependabot para npm y GitHub Actions.

## Crear un proyecto desde esta plantilla

Cuando la subas a GitHub, puedes usarla como template o clonarla:

```bash
git clone <tu-repo> mi-proyecto
cd mi-proyecto
npm install
npm run agent:skills
npm run verify
```

Despues cambia `name`, `metadata`, textos de la home y variables de entorno segun el proyecto.
