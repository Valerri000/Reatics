'use server'

import { headers as getHeaders } from 'next/headers'
import { getPayload } from 'payload'

import { checkoutOrigin } from '@/lib/checkoutForm'
import { compedSkipsCharge } from '@/lib/compedPlan'
import { portalCopy } from '@/lib/portalCopy'
import { portalSession } from '@/lib/portalSession'
import { postPortal } from '@/lib/stripePortal'
import config from '@/payload.config'

export async function openCustomerPortal() {
  const headers = await getHeaders()
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers })
  if (!user) return { ok: false as const, message: portalCopy.signIn }
  if (compedSkipsCharge(user.subscriptionStatus)) {
    return { ok: false as const, message: 'This account is comped. No charge is made.' }
  }
  const found = await payload.find({
    collection: 'subscriptions',
    depth: 0,
    limit: 10,
    overrideAccess: true,
    sort: '-updatedAt',
    where: { user: { equals: user.id } },
  })
  const customerId = found.docs.map((doc) => doc.stripeCustomerId || '').find((id) => id.startsWith('cus_')) || ''
  const built = portalSession({
    customerId,
    origin: checkoutOrigin({ NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL }),
  })
  if (!built.ok) return { ok: false as const, message: portalCopy.error }
  const opened = await postPortal(process.env.STRIPE_SECRET_KEY || '', built.body)
  if (!opened.ok) return { ok: false as const, message: portalCopy.error }
  return { ok: true as const, url: opened.url }
}
