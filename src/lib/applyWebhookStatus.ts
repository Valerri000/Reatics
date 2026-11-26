import { sql } from '@payloadcms/db-postgres'
import { getPayload } from 'payload'

import config from '@/payload.config'

export async function applyWebhookStatus(update: { customerId: string; status: 'active' | 'past_due' | 'canceled' }) {
  if (!/^cus_[A-Za-z0-9]+$/.test(update.customerId)) return { ok: false as const, stored: false as const }
  const payload = await getPayload({ config })
  await payload.db.drizzle.execute(sql`
    update "subscriptions"
    set "status" = ${update.status}, "updated_at" = now()
    where "stripe_customer_id" = ${update.customerId}
  `)
  await payload.db.drizzle.execute(sql`
    update "users"
    set "subscription_status" = ${update.status}
    where "id" in (
      select "user_id" from "subscriptions" where "stripe_customer_id" = ${update.customerId}
    )
    and "subscription_status" is distinct from 'comped'
  `)
  return { ok: true as const, stored: true as const }
}
