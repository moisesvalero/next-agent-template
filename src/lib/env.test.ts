import { describe, expect, it } from "vitest";

import { env } from "./env";

describe("env", () => {
  it("provides a safe default app url", () => {
    expect(env.NEXT_PUBLIC_APP_URL).toBe(
      "https://next-agent-template.vercel.app",
    );
  });
});
