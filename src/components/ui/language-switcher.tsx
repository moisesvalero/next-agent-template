"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Globe } from "lucide-react";

export function LanguageSwitcher({ currentLocale }: { currentLocale: "es" | "en" }) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleLocale = () => {
    const nextLocale = currentLocale === "es" ? "en" : "es";
    document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=31536000; SameSite=Lax`;
    router.refresh();
  };

  if (!mounted) return null;

  return (
    <button
      onClick={toggleLocale}
      className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 shadow-sm transition-colors hover:bg-zinc-50 hover:text-zinc-950 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-zinc-50"
      aria-label={currentLocale === "es" ? "Cambiar a inglés" : "Switch to English"}
    >
      <Globe className="size-3.5" aria-hidden="true" />
      <span>{currentLocale.toUpperCase()}</span>
    </button>
  );
}
