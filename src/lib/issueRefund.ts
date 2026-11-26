'use server'

import { headers as getHeaders } from 'next/headers'
import { getPayload } from 'payload'

import { canIssueRefund } from '@/lib/refundAccess'
import { refundCopy } from '@/lib/refundCopy'
import { refundForm } from '@/lib/refundForm'
import { recordRefund } from '@/lib/recordRefund'
import { postRefund } from '@/lib/stripeRefund'
import config from '@/payload.config'

export async function issueRefund(chargeId: string, amountCents: number) {
  const headers = await getHeaders()
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers })
  if (!canIssueRefund(user)) return { ok: false as const, message: refundCopy.refused }
  const built = refundForm({ chargeId, amountCents })
  if (!built.ok) return { ok: false as const, message: refundCopy.error }
  const posted = await postRefund(process.env.STRIPE_SECRET_KEY || '', built.body)
  if (!posted.ok) return { ok: false as const, message: refundCopy.error }
  await recordRefund({ amountCents, stripeRefundId: posted.id })
  return { ok: true as const, message: refundCopy.recorded }
}
