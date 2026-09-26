import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { addCredits } from "@/lib/payments/credits";

export async function POST(req: Request) {
  const secret = process.env.POLAR_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: "Webhook secret not configured" },
      { status: 500 },
    );
  }

  const rawBody = await req.text();
  const headersList = await headers();
  const signature =
    headersList.get("webhook-signature") ||
    headersList.get("polar-webhook-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing signature header" },
      { status: 400 },
    );
  }

  try {
    const payload = JSON.parse(rawBody);
    const eventType = payload.type;

    // Handle checkout / order completion to credit user account
    if (eventType === "order.created" || eventType === "checkout.updated") {
      const metadata = payload.data?.metadata || {};
      const userId = metadata.userId;
      const creditsGranted = Number(metadata.credits || 0);

      if (userId && creditsGranted > 0) {
        await addCredits({
          userId,
          amount: creditsGranted,
          description: `Polar order: ${payload.data?.id || "checkout"}`,
          type: "PURCHASE",
          metadata: { orderId: payload.data?.id },
        });
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Polar webhook error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 400 },
    );
  }
}
