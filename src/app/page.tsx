import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import type { Metadata } from "next";
import { cookies, headers } from "next/headers";

import { JsonLd } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { siteConfig } from "@/config/site";
import { locales } from "@/dictionaries/locales";
import {
  createOrganizationJsonLd,
  createSoftwareApplicationJsonLd,
  createWebsiteJsonLd,
} from "@/lib/seo";

const commands = ["pnpm run dev", "pnpm run agent:skills", "pnpm run verify"];

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get("NEXT_LOCALE")?.value;
  const acceptLanguage = (await headers()).get("accept-language") || "";
  const locale = (localeCookie === "en" || localeCookie === "es") 
    ? localeCookie 
    : (acceptLanguage.startsWith("en") ? "en" : "es");

  const t = locales[locale];

  return {
    title: t.title,
    description: t.description,
  };
}

export default async function Home() {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get("NEXT_LOCALE")?.value;
  const acceptLanguage = (await headers()).get("accept-language") || "";
  const locale = (localeCookie === "en" || localeCookie === "es") 
    ? localeCookie 
    : (acceptLanguage.startsWith("en") ? "en" : "es");

  const t = locales[locale];

  return (
    <main className="bg-background text-foreground min-h-screen relative">
      <div className="absolute top-6 right-6 z-50">
        <LanguageSwitcher currentLocale={locale} />
      </div>

      <JsonLd data={createWebsiteJsonLd()} />
      <JsonLd data={createOrganizationJsonLd()} />
      <JsonLd data={createSoftwareApplicationJsonLd()} />

      <section className="mx-auto flex min-h-screen w-full max-w-5xl flex-col justify-center gap-10 px-6 py-16 sm:px-10">
        <div className="max-w-3xl space-y-6">
          <p className="text-primary flex items-center gap-2 text-sm font-medium tracking-[0.18em] uppercase">
            <Sparkles className="size-4" aria-hidden="true" />
            {t.baseTemplate}
          </p>
          <h1 className="text-4xl font-semibold tracking-normal text-balance sm:text-6xl">
            {t.title}
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-zinc-700">
            {t.description}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild>
              <a href="https://github.com/moisesvalero/next-agent-template/generate">
                {t.createProject}
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
            </Button>
            <Button asChild variant="outline">
              <a href="https://github.com/moisesvalero/next-agent-template#readme">
                {t.readReadme}
              </a>
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
          <div className="border-border bg-card text-card-foreground rounded-lg border p-6 shadow-sm">
            <h2 className="text-lg font-semibold">{t.includes}</h2>
            <ul className="mt-5 grid gap-3 text-sm text-zinc-700 sm:grid-cols-2">
              {t.checklist.map((item) => (
                <li key={item} className="flex gap-3">
                  <CheckCircle2
                    className="text-primary mt-0.5 size-4 shrink-0"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg border border-zinc-900 bg-zinc-950 p-6 text-zinc-50 shadow-sm">
            <h2 className="text-lg font-semibold">{t.firstCommands}</h2>
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
