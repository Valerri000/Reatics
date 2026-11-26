import { stripeReady } from '@/lib/stripeMode'

export async function postRefund(secret: string, body: string, fetchImpl: typeof fetch = fetch) {
  if (!stripeReady(secret)) return { ok: false as const, id: '' }
  const response = await fetchImpl('https://api.stripe.com/v1/refunds', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${secret}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  })
  const payload = (await response.json().catch(() => ({}))) as { id?: string }
  const id = payload.id || ''
  if (!response.ok || !/^re_[A-Za-z0-9]+$/.test(id)) return { ok: false as const, id: '' }
  return { ok: true as const, id }
}
