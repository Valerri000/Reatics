import { describe, expect, it } from 'vitest'

import { refundCopy } from '@/lib/refundCopy'

describe('refund copy', () => {
  it('names the confirmation and the error', () => {
    expect(refundCopy.recorded).toBe('Refund recorded in Stripe.')
    expect(refundCopy.error).toBe('The refund was not recorded.')
    expect(refundCopy.refused).toContain('owner admin')
  })
})
