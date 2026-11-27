import { describe, expect, it } from 'vitest'

import { listingHeartClass } from '@/lib/listingHeart'

describe('listing heart', () => {
  it('places the heart at the top right of the card', () => {
    expect(listingHeartClass).toContain('absolute')
    expect(listingHeartClass).toContain('right-4')
    expect(listingHeartClass).toContain('top-4')
    expect(listingHeartClass).toContain('h-10')
    expect(listingHeartClass).toContain('w-10')
    expect(listingHeartClass).toContain('rounded-full')
  })
})
