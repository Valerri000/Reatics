export function portalSession(input: { customerId: string; origin: string }) {
  if (!/^cus_[A-Za-z0-9]+$/.test(input.customerId)) return { ok: false as const, body: '' }
  const origin = input.origin.trim().replace(/\/$/, '')
  if (!/^https?:\/\/\S+$/.test(origin)) return { ok: false as const, body: '' }
  const body = new URLSearchParams()
  body.set('customer', input.customerId)
  body.set('return_url', `${origin}/billing/portal?result=return`)
  return { ok: true as const, body: body.toString() }
}
