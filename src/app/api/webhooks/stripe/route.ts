import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { addCredits } from "@/lib/payments/credits";

export async function POST(req: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: "Stripe webhook secret not configured" },
      { status: 500 },
    );
  }

  const rawBody = await req.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 },
    );
  }

  try {
    const payload = JSON.parse(rawBody);

    if (payload.type === "checkout.session.completed") {
      const session = payload.data?.object;
      const userId = session?.metadata?.userId;
      const credits = Number(session?.metadata?.credits || 0);

      if (userId && credits > 0) {
        await addCredits({
          userId,
          amount: credits,
          description: `Stripe checkout session: ${session.id}`,
          type: "PURCHASE",
          metadata: { sessionId: session.id },
        });
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Stripe webhook processing error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 400 },
    );
  }
}
