import { createHmac, timingSafeEqual } from 'node:crypto'

const maxAgeMs = 5 * 60 * 1000

export type SignedStripeEvent = {
  id?: string
  type?: string
  livemode?: boolean
  data?: {
    object?: {
      id?: string
      status?: string
      customer?: string | { id?: string } | null
    }
  }
}

export function verifyStripeSignature(payload: string, header: string, secret: string, now = Date.now()) {
  if (!secret.startsWith('whsec_') || !payload || !header) return { ok: false as const, event: null }
  const pairs = header.split(',').map((part) => part.split('='))
  const timestamp = Number(pairs.find((pair) => pair[0] === 't')?.[1])
  const signatures = pairs.filter((pair) => pair[0] === 'v1').map((pair) => pair[1] || '')
  if (!Number.isFinite(timestamp) || signatures.length === 0) return { ok: false as const, event: null }
  if (Math.abs(now - timestamp * 1000) > maxAgeMs) return { ok: false as const, event: null }
  const expected = createHmac('sha256', secret).update(`${timestamp}.${payload}`).digest('hex')
  const expectedBuffer = Buffer.from(expected)
  const match = signatures.some((signature) => {
    const actual = Buffer.from(signature)
    return actual.length === expectedBuffer.length && timingSafeEqual(actual, expectedBuffer)
  })
  if (!match) return { ok: false as const, event: null }
  try {
    const event = JSON.parse(payload) as SignedStripeEvent
    if (!event || typeof event !== 'object') return { ok: false as const, event: null }
    return { ok: true as const, event }
  } catch {
    return { ok: false as const, event: null }
  }
}
