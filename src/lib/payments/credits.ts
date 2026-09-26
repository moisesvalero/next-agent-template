import { db } from "@/lib/db/client";

export interface ConsumeCreditsParams {
  userId: string;
  amount: number;
  description?: string;
  metadata?: Record<string, unknown>;
}

export interface AddCreditsParams {
  userId: string;
  amount: number;
  description?: string;
  type?: "PURCHASE" | "ADJUSTMENT" | "REFUND";
  metadata?: Record<string, unknown>;
}

export async function getCreditBalance(userId: string): Promise<number> {
  const record = await db.creditBalance.findUnique({
    where: { userId },
  });

  return record ? record.balance : 0;
}

export async function addCredits({
  userId,
  amount,
  description = "Credits purchase",
  type = "PURCHASE",
  metadata,
}: AddCreditsParams) {
  if (amount <= 0) {
    throw new Error("Credit amount must be greater than zero");
  }

  return db.$transaction(async (tx) => {
    let creditBalance = await tx.creditBalance.findUnique({
      where: { userId },
    });

    const balanceBefore = creditBalance ? creditBalance.balance : 0;
    const balanceAfter = balanceBefore + amount;

    if (!creditBalance) {
      creditBalance = await tx.creditBalance.create({
        data: {
          userId,
          balance: balanceAfter,
          totalPurchased: amount,
          totalConsumed: 0,
        },
      });
    } else {
      creditBalance = await tx.creditBalance.update({
        where: { userId },
        data: {
          balance: balanceAfter,
          totalPurchased: { increment: amount },
        },
      });
    }

    await tx.creditTransaction.create({
      data: {
        balanceId: creditBalance.id,
        type,
        amount,
        balanceBefore,
        balanceAfter,
        description,
        metadata: metadata ? JSON.parse(JSON.stringify(metadata)) : undefined,
      },
    });

    return creditBalance;
  });
}

export async function consumeCredits({
  userId,
  amount,
  description = "Service consumption",
  metadata,
}: ConsumeCreditsParams): Promise<{
  success: boolean;
  balance: number;
  error?: string;
}> {
  if (amount <= 0) {
    throw new Error("Credit amount must be greater than zero");
  }

  return db.$transaction(async (tx) => {
    const creditBalance = await tx.creditBalance.findUnique({
      where: { userId },
    });

    const balanceBefore = creditBalance ? creditBalance.balance : 0;

    if (balanceBefore < amount) {
      return {
        success: false,
        balance: balanceBefore,
        error: "Insufficient credits",
      };
    }

    const balanceAfter = balanceBefore - amount;

    const updated = await tx.creditBalance.update({
      where: { userId },
      data: {
        balance: balanceAfter,
        totalConsumed: { increment: amount },
      },
    });

    await tx.creditTransaction.create({
      data: {
        balanceId: updated.id,
        type: "CONSUMPTION",
        amount,
        balanceBefore,
        balanceAfter,
        description,
        metadata: metadata ? JSON.parse(JSON.stringify(metadata)) : undefined,
      },
    });

    return {
      success: true,
      balance: balanceAfter,
    };
  });
}
