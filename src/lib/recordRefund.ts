import { sql } from '@payloadcms/db-postgres'
import { getPayload } from 'payload'

import config from '@/payload.config'

export async function recordRefund(input: { amountCents: number; stripeRefundId: string }) {
  if (!/^re_[A-Za-z0-9]+$/.test(input.stripeRefundId)) return { ok: false as const, stored: false as const }
  if (!Number.isInteger(input.amountCents) || input.amountCents <= 0) return { ok: false as const, stored: false as const }
  const payload = await getPayload({ config })
  await payload.db.drizzle.execute(sql`
    insert into "billing" ("action", "amount", "note", "updated_at", "created_at")
    values ('refund', ${input.amountCents}, ${input.stripeRefundId}, now(), now())
  `)
  return { ok: true as const, stored: true as const }
}
