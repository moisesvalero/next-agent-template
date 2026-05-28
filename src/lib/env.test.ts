import { describe, expect, it } from "vitest";

import { env } from "./env";

describe("env", () => {
  it("provides a safe default app url for local development", () => {
    expect(env.NEXT_PUBLIC_APP_URL).toBe("http://localhost:3000");
  });
});
