import { stripeReady } from '@/lib/stripeMode'

export type StripeSession = {
  id?: string
  url?: string | null
  status?: string | null
  payment_status?: string | null
  customer?: string | { id?: string } | null
  subscription?: string | { id?: string } | null
  client_reference_id?: string | null
  metadata?: { plan_id?: string } | null
}

export function stripeId(value: string, prefix: 'cus' | 'sub' | 'cs') {
  if (!new RegExp(`^${prefix}_[A-Za-z0-9]+$`).test(value)) return ''
  return value
}

export function customerId(session: StripeSession) {
  const value = typeof session.customer === 'string' ? session.customer : session.customer?.id || ''
  return stripeId(value, 'cus')
}

export function subscriptionId(session: StripeSession) {
  const value = typeof session.subscription === 'string' ? session.subscription : session.subscription?.id || ''
  return stripeId(value, 'sub')
}

export async function postCheckout(secret: string, body: string, fetchImpl: typeof fetch = fetch) {
  if (!stripeReady(secret)) return { ok: false as const, url: '', id: '' }
  const response = await fetchImpl('https://api.stripe.com/v1/checkout/sessions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${secret}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  })
  const payload = (await response.json().catch(() => ({}))) as StripeSession
  const url = payload.url || ''
  const id = stripeId(payload.id || '', 'cs')
  if (!response.ok || !id || !url.startsWith('https://checkout.stripe.com/')) {
    return { ok: false as const, url: '', id: '' }
  }
  return { ok: true as const, url, id }
}

export async function getCheckout(secret: string, sessionId: string, fetchImpl: typeof fetch = fetch) {
  const id = stripeId(sessionId, 'cs')
  if (!stripeReady(secret) || !id) return { ok: false as const, session: null }
  const response = await fetchImpl(`https://api.stripe.com/v1/checkout/sessions/${id}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${secret}` },
  })
  const payload = (await response.json().catch(() => null)) as StripeSession | null
  if (!response.ok || !payload) return { ok: false as const, session: null }
  return { ok: true as const, session: payload }
}
