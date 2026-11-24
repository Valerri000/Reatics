import { describe, expect, it } from 'vitest'

import { asksForDre } from '@/lib/dreRequirement'

describe('DRE requirement', () => {
  it('asks a broker and an owner, and does not ask a space seeker', () => {
    expect(asksForDre('broker')).toBe(true)
    expect(asksForDre('owner')).toBe(true)
    expect(asksForDre('broker-owner')).toBe(true)
    expect(asksForDre('space-seeker')).toBe(false)
    expect(asksForDre('coworking')).toBe(false)
  })
})
