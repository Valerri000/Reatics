import { addons } from '@/lib/addons'
import { inactiveProductBody } from '@/lib/inactiveProductForm'
import { stripeReady } from '@/lib/stripeMode'

export async function syncInactiveAddons(secret: string, fetchImpl: typeof fetch = fetch) {
  if (!stripeReady(secret)) return { ok: false as const, created: 0 }
  let created = 0
  for (const addon of addons) {
    const response = await fetchImpl('https://api.stripe.com/v1/products', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secret}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: inactiveProductBody(addon).toString(),
    })
    if (!response.ok) return { ok: false as const, created }
    created += 1
  }
  return { ok: true as const, created }
}
