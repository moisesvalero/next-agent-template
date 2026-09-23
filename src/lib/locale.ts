import { cookies, headers } from "next/headers";

import { locales } from "@/dictionaries/locales";

export type Locale = keyof typeof locales;

export const defaultLocale: Locale = "es";
export const supportedLocales: Locale[] = Object.keys(locales) as Locale[];

export function isSupportedLocale(locale: string): locale is Locale {
  return supportedLocales.includes(locale as Locale);
}

export async function getRequestLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get("NEXT_LOCALE")?.value;

  if (localeCookie && isSupportedLocale(localeCookie)) {
    return localeCookie;
  }

  const acceptLanguage = (await headers()).get("accept-language") || "";
  if (acceptLanguage.startsWith("en")) {
    return "en";
  }

  return defaultLocale;
}
