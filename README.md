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
npm run agent:impeccable # instala la skill Impeccable en el harness detectado
npm run design:audit  # detecta patrones visuales flojos con Impeccable
```

## Herramientas opcionales para diseno con agentes

### Impeccable

[Impeccable](https://impeccable.style/) es una skill para que el agente disene, critique, pula y audite interfaces con mejor criterio visual. Vale la pena para esta plantilla porque vive cerca del codigo, funciona con Codex/Cursor/Claude/Gemini y permite comandos como audit, polish, typeset o colorize.

Instalacion recomendada en cada proyecto clonado:

```bash
npm run agent:impeccable
```

Auditoria visual rapida:

```bash
npm run design:audit
```

### Windframe MCP

[Windframe MCP](https://windframe.dev/mcp) conecta tu agente a sistemas de diseno, componentes y tokens Tailwind. Es util cuando quieres que el agente genere UI con estilos tipo Linear, ShadCN, Notion o Enterprise sin inventarse valores.

No va como dependencia fija de esta plantilla porque requiere cuenta/OAuth y se configura en el cliente MCP del agente, no dentro de Next.js. Usalo cuando el proyecto necesite una direccion visual mas concreta:

```bash
# Ejemplo Claude Code
claude mcp add --transport http windframe-mcp https://mcp.windframe.dev/mcp
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
