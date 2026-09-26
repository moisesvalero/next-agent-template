import crypto from "node:crypto";

export function createUnsubscribeToken(
  email: string,
  secret = process.env.BETTER_AUTH_SECRET ||
    "default-secret-salt-change-in-production",
): string {
  return crypto
    .createHmac("sha256", secret)
    .update(email.toLowerCase().trim())
    .digest("hex");
}

export function verifyUnsubscribeToken(
  email: string,
  token: string,
  secret = process.env.BETTER_AUTH_SECRET ||
    "default-secret-salt-change-in-production",
): boolean {
  if (!email || !token) {
    return false;
  }

  const expected = createUnsubscribeToken(email, secret);
  if (expected.length !== token.length) {
    return false;
  }

  try {
    return crypto.timingSafeEqual(
      Buffer.from(token, "utf-8"),
      Buffer.from(expected, "utf-8"),
    );
  } catch {
    return false;
  }
}
