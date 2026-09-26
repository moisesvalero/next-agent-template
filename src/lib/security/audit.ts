import { db } from "@/lib/db/client";

export interface RecordAuditLogParams {
  userId?: string;
  action: string;
  entity: string;
  entityId?: string;
  metadata?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
}

export async function recordAuditLog({
  userId,
  action,
  entity,
  entityId,
  metadata,
  ipAddress,
  userAgent,
}: RecordAuditLogParams) {
  try {
    return await db.auditLog.create({
      data: {
        userId,
        action,
        entity,
        entityId,
        metadata: metadata ? JSON.parse(JSON.stringify(metadata)) : undefined,
        ipAddress,
        userAgent,
      },
    });
  } catch (error) {
    console.error("Failed to write to audit log:", error);
    return null;
  }
}
