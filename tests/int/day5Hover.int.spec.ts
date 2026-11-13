import { describe, expect, it } from 'vitest'

import { activePinRadius, cardIsActive, favoriteNeedsSignIn, pinRadius, pinRadiusFor } from '@/lib/mapHover'

describe('map hover pair', () => {
  it('enlarges the active pin and marks the matching card', () => {
    expect(pinRadiusFor('201-n-brand', null)).toBe(pinRadius)
    expect(pinRadiusFor('201-n-brand', '201-n-brand')).toBe(activePinRadius)
    expect(activePinRadius).toBeGreaterThan(pinRadius)
    expect(cardIsActive('201-n-brand', '201-n-brand')).toBe(true)
    expect(cardIsActive('201-n-brand', 'other')).toBe(false)
    expect(favoriteNeedsSignIn(null)).toBe(true)
    expect(favoriteNeedsSignIn({ id: 1 })).toBe(false)
  })
})
