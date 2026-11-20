import { describe, expect, it } from 'vitest'

import { moveSkipsGeocode } from '@/lib/phaseCMilestone'

describe('stored coordinates', () => {
  it('does not geocode on pan or zoom', () => {
    expect(moveSkipsGeocode()).toBe(true)
  })
})
