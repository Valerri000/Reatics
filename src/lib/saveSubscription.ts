import { sql } from '@payloadcms/db-postgres'
import { getPayload } from 'payload'

import { statusFromSubscription } from '@/lib/accountBilling'
import { graceNotice } from '@/lib/graceNotice'
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
  const accountStatus = statusFromSubscription(record.status)
  if (accountStatus) {
    await payload.db.drizzle.execute(sql`
      update "users" set "subscription_status" = ${accountStatus} where "id" = ${record.userId}
    `)
  }
  const notice = graceNotice(record.status)
  if (notice) {
    await payload.db.drizzle.execute(sql`
      insert into "mailbox" (
        "kind",
        "to_address",
        "subject",
        "body",
        "status",
        "user_id",
        "updated_at",
        "created_at"
      )
      select
        ${notice.kind},
        "email",
        ${notice.subject},
        ${notice.body},
        ${notice.status},
        "id",
        now(),
        now()
      from "users"
      where "id" = ${record.userId}
    `)
  }
  return { ok: true as const, stored: true as const }
}
