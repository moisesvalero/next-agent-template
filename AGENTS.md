# AGENTS.md

Guía operativa para agentes que trabajen en esta plantilla Next.js.

## Prioridades

1. Respeta primero las instrucciones directas del usuario.
2. Lee este archivo antes de tocar código.
3. En esta versión de Next.js puede haber cambios posteriores a tu entrenamiento. Antes de modificar APIs de Next, consulta `node_modules/next/dist/docs/` o la documentación oficial actual.
4. Mantén los cambios pequeños, verificables y fáciles de revertir.

## Flujo recomendado para agentes

- Este proyecto usa pnpm. No uses npm ni generes `package-lock.json` salvo petición explícita.
- Ejecuta `pnpm dlx autoskills` al iniciar un proyecto clonado desde esta plantilla para instalar o actualizar skills útiles para el stack.
- Para trabajo visual, puedes instalar Impeccable con `pnpm run agent:impeccable` y después usarlo para auditar, pulir o documentar la interfaz.
- Windframe MCP es opcional y depende de la cuenta del usuario. No lo instales como dependencia del proyecto: configúralo en el agente MCP del usuario cuando necesites estilos/tokens de Windframe.
- Si usas Superpowers, activa primero la skill adecuada al tipo de tarea:
  - `brainstorming` para definir funciones nuevas o cambios de producto.
  - `test-driven-development` para bugfixes o lógica nueva.
  - `systematic-debugging` para fallos, regresiones o errores de tests.
  - `verification-before-completion` antes de afirmar que algo está terminado.
- Antes de editar, revisa `package.json`, la estructura de `src/` y los scripts disponibles.
- No reviertas cambios del usuario. Si encuentras cambios ajenos, trabaja con ellos o pregunta si bloquean la tarea.

## Comandos de verificación

Ejecuta los que apliquen antes de terminar cualquier cambio de código:

```bash
pnpm run format:check
pnpm run lint
pnpm run check
pnpm test
pnpm run build
pnpm run design:audit
```

Para una pasada completa:

```bash
pnpm run verify
```

Si una comprobación no puede ejecutarse, explica el motivo y el riesgo.

## Convenciones del proyecto

- TypeScript estricto.
- App Router de Next.js en `src/app`.
- Componentes reutilizables en `src/components`.
- Utilidades y validadores en `src/lib`.
- Configuración de producto y SEO en `src/config/site.ts` y `src/lib/seo.ts`.
- Componentes tipo shadcn en `src/components/ui`. Usa `components.json` como contrato para nuevos componentes.
- Supabase es opcional y vive en `src/lib/supabase`. No llames clientes Supabase si faltan variables de entorno.
- Sanity es opcional y vive en `src/sanity`. No llames clientes Sanity si faltan variables de entorno.
- Tests junto al código o en carpetas `__tests__`, con extensión `.test.ts` o `.test.tsx`.
- Usa Prettier para formato y ESLint para calidad.

## Seguridad básica

- No subas secretos. Usa `.env.local` para valores locales y `.env.example` como contrato público.
- Valida variables de entorno desde `src/lib/env.ts`.
- Mantén `robots.ts`, `sitemap.ts`, `manifest.ts`, `opengraph-image.tsx`, `llms.txt` y JSON-LD coherentes con el contenido real del proyecto.
- Mantén los headers de seguridad de `next.config.ts` salvo que haya una razón clara para cambiarlos.
- Evita `dangerouslySetInnerHTML`. Si es imprescindible, documenta el origen del HTML y sanitízalo.
- No añadas dependencias sin justificar su uso en el README o en el resumen final.
