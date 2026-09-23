import { describe, expect, it } from "vitest";

import { defaultLocale, isSupportedLocale, supportedLocales } from "./locale";

describe("locale helpers", () => {
  it("defines default and supported locales", () => {
    expect(defaultLocale).toBe("es");
    expect(supportedLocales).toContain("es");
    expect(supportedLocales).toContain("en");
  });

  it("validates supported locales", () => {
    expect(isSupportedLocale("es")).toBe(true);
    expect(isSupportedLocale("en")).toBe(true);
    expect(isSupportedLocale("fr")).toBe(false);
    expect(isSupportedLocale("")).toBe(false);
  });
});
