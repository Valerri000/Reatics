export type StripeMode = 'test' | 'live' | 'missing'

export function stripeMode(secret: string | undefined) {
  const value = (secret || '').trim()
  if (value.startsWith('sk_test_') || value.startsWith('rk_test_')) return 'test'
  if (value.startsWith('sk_live_') || value.startsWith('rk_live_')) return 'live'
  return 'missing'
}

export function stripeReady(secret: string | undefined) {
  return stripeMode(secret) === 'test'
}

export function stripeConnection(secret: string | undefined) {
  const mode = stripeMode(secret)
  if (mode === 'test') return { connected: true, mode: 'test' as const }
  if (mode === 'live') return { connected: false, mode: 'refused' as const }
  return { connected: false, mode: 'missing' as const }
}
