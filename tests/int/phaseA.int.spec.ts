import { describe, expect, it } from 'vitest'

import { phaseAFrozen, phaseAReviewDay, phaseB } from '@/lib/phaseA'

describe('phase A freeze', () => {
  it('freezes the review on October 23', () => {
    expect(phaseAFrozen).toBe(true)
    expect(phaseAReviewDay).toBe('2026-10-23')
    expect(phaseB).toBe('Phase B starts after this review is accepted.')
  })
})
