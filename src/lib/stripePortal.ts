import { stripeReady } from '@/lib/stripeMode'

export async function postPortal(secret: string, body: string, fetchImpl: typeof fetch = fetch) {
  if (!stripeReady(secret)) return { ok: false as const, url: '' }
  const response = await fetchImpl('https://api.stripe.com/v1/billing_portal/sessions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${secret}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  })
  const payload = (await response.json().catch(() => ({}))) as { url?: string }
  const url = payload.url || ''
  if (!response.ok || !url.startsWith('https://billing.stripe.com/')) return { ok: false as const, url: '' }
  return { ok: true as const, url }
}
