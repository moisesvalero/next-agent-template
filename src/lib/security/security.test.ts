import { describe, expect, it } from "vitest";

import { checkRateLimit, getClientIp } from "./rate-limit";
import { createUnsubscribeToken, verifyUnsubscribeToken } from "./tokens";

describe("security utilities", () => {
  it("extracts client IP with proxy hop consideration", () => {
    const req = new Request("http://localhost", {
      headers: {
        "x-forwarded-for": "203.0.113.195, 70.41.3.18, 150.172.238.178",
      },
    });

    const ip = getClientIp(req, 1);
    expect(ip).toBe("150.172.238.178");
  });

  it("handles rate limiting properly", () => {
    const key = `test-ip-${Date.now()}`;
    const first = checkRateLimit(key, { limit: 2, windowMs: 10000 });
    expect(first.allowed).toBe(true);

    const second = checkRateLimit(key, { limit: 2, windowMs: 10000 });
    expect(second.allowed).toBe(true);

    const third = checkRateLimit(key, { limit: 2, windowMs: 10000 });
    expect(third.allowed).toBe(false);
  });

  it("creates and verifies HMAC unsubscribe tokens", () => {
    const email = "user@example.com";
    const token = createUnsubscribeToken(email);

    expect(typeof token).toBe("string");
    expect(token.length).toBe(64); // SHA-256 hex is 64 chars

    expect(verifyUnsubscribeToken(email, token)).toBe(true);
    expect(verifyUnsubscribeToken("attacker@example.com", token)).toBe(false);
    expect(verifyUnsubscribeToken(email, "invalid-token")).toBe(false);
  });
});
