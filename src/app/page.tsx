const checklist = [
  "Next.js App Router con TypeScript estricto",
  "ESLint, Prettier, Tailwind y tests listos",
  "AGENTS.md preparado para agentes y Superpowers",
  "Headers de seguridad y validacion de entorno",
];

const commands = ["npm run dev", "npm run agent:skills", "npm run verify"];

export default function Home() {
  return (
    <main className="bg-background text-foreground min-h-screen">
      <section className="mx-auto flex min-h-screen w-full max-w-5xl flex-col justify-center gap-10 px-6 py-16 sm:px-10">
        <div className="max-w-3xl space-y-6">
          <p className="text-sm font-medium tracking-[0.18em] text-emerald-700 uppercase">
            Plantilla base
          </p>
          <h1 className="text-4xl font-semibold tracking-normal text-balance sm:text-6xl">
            Next.js listo para crear webs con agentes desde el minuto uno.
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-zinc-700">
            Clona, instala dependencias, abre tu agente favorito y empieza con
            una base moderna, verificada y documentada.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Incluye</h2>
            <ul className="mt-5 grid gap-3 text-sm text-zinc-700 sm:grid-cols-2">
              {checklist.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1 size-2 rounded-full bg-emerald-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg border border-zinc-900 bg-zinc-950 p-6 text-zinc-50 shadow-sm">
            <h2 className="text-lg font-semibold">Primeros comandos</h2>
            <div className="mt-5 space-y-3 font-mono text-sm">
              {commands.map((command) => (
                <div
                  key={command}
                  className="rounded-md border border-white/10 bg-white/5 px-3 py-2"
                >
                  {command}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
