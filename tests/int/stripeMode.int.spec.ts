import { describe, expect, it } from 'vitest'

import { stripeConnection, stripeMode, stripeReady } from '@/lib/stripeMode'

describe('stripe test mode', () => {
  it('accepts a test key and refuses a live key', () => {
    const testKey = 'sk_test_example'
    const liveKey = 'sk_live_example'
    expect(stripeMode(testKey)).toBe('test')
    expect(stripeReady(testKey)).toBe(true)
    expect(stripeMode(liveKey)).toBe('live')
    expect(stripeReady(liveKey)).toBe(false)
    expect(stripeMode('')).toBe('missing')
    expect(stripeConnection(testKey)).toEqual({ connected: true, mode: 'test' })
    expect(stripeConnection(liveKey)).toEqual({ connected: false, mode: 'refused' })
    expect(JSON.stringify(stripeConnection(testKey))).not.toContain(testKey)
  })
})
