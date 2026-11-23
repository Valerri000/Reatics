import { sql } from '@payloadcms/db-postgres'
import { getPayload } from 'payload'

import config from '@/payload.config'
import type { SubscriptionRecord } from '@/lib/subscriptionRecord'

export async function saveSubscription(record: SubscriptionRecord) {
  const payload = await getPayload({ config })
  await payload.db.drizzle.execute(sql`
    insert into "subscriptions" (
      "user_id",
      "plan_id",
      "status",
      "amount_cents",
      "stripe_customer_id",
      "stripe_subscription_id",
      "stripe_checkout_session_id",
      "updated_at",
      "created_at"
    ) values (
      ${record.userId},
      ${record.planId},
      ${record.status},
      ${record.amountCents},
      ${record.stripeCustomerId},
      ${record.stripeSubscriptionId},
      ${record.stripeCheckoutSessionId},
      now(),
      now()
    )
    on conflict ("stripe_checkout_session_id")
    do update set
      "status" = excluded."status",
      "stripe_customer_id" = excluded."stripe_customer_id",
      "stripe_subscription_id" = excluded."stripe_subscription_id",
      "amount_cents" = excluded."amount_cents",
      "updated_at" = now()
  `)
  return { ok: true as const, stored: true as const }
}
