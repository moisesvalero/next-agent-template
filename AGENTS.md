# AGENTS.md

Guia operativa para agentes que trabajen en esta plantilla Next.js.

## Prioridades

1. Respeta primero las instrucciones directas del usuario.
2. Lee este archivo antes de tocar codigo.
3. En esta version de Next.js puede haber cambios posteriores a tu entrenamiento. Antes de modificar APIs de Next, consulta `node_modules/next/dist/docs/` o la documentacion oficial actual.
4. Mantén los cambios pequenos, verificables y faciles de revertir.

## Flujo recomendado para agentes

- Ejecuta `npx autoskills` al iniciar un proyecto clonado desde esta plantilla para instalar o actualizar skills utiles para el stack.
- Si usas Superpowers, activa primero la skill adecuada al tipo de tarea:
  - `brainstorming` para definir funciones nuevas o cambios de producto.
  - `test-driven-development` para bugfixes o logica nueva.
  - `systematic-debugging` para fallos, regresiones o errores de tests.
  - `verification-before-completion` antes de afirmar que algo esta terminado.
- Antes de editar, revisa `package.json`, la estructura de `src/` y los scripts disponibles.
- No reviertas cambios del usuario. Si encuentras cambios ajenos, trabaja con ellos o pregunta si bloquean la tarea.

## Comandos de verificacion

Ejecuta los que apliquen antes de terminar cualquier cambio de codigo:

```bash
npm run format:check
npm run lint
npm run check
npm test
npm run build
```

Para una pasada completa:

```bash
npm run verify
```

Si una comprobacion no puede ejecutarse, explica el motivo y el riesgo.

## Convenciones del proyecto

- TypeScript estricto.
- App Router de Next.js en `src/app`.
- Componentes reutilizables en `src/components`.
- Utilidades y validadores en `src/lib`.
- Tests junto al codigo o en carpetas `__tests__`, con extension `.test.ts` o `.test.tsx`.
- Usa Prettier para formato y ESLint para calidad.

## Seguridad basica

- No subas secretos. Usa `.env.local` para valores locales y `.env.example` como contrato publico.
- Valida variables de entorno desde `src/lib/env.ts`.
- Mantén los headers de seguridad de `next.config.ts` salvo que haya una razon clara para cambiarlos.
- Evita `dangerouslySetInnerHTML`. Si es imprescindible, documenta el origen del HTML y sanitizalo.
- No anadas dependencias sin justificar su uso en el README o en el resumen final.
