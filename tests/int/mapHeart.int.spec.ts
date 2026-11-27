import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

import { listingHeartClass } from '@/lib/listingHeart'

describe('map heart', () => {
  it('matches the map heart to the Phase C card', () => {
    const card = readFileSync('src/components/listing/ListingCard.tsx', 'utf8')
    const map = readFileSync('src/components/market/MapSearch.tsx', 'utf8')
    const heart = readFileSync('src/components/listing/ListingHeart.tsx', 'utf8')
    expect(card).toContain('listingHeartClass')
    expect(map).toContain('ListingHeart')
    expect(map).not.toContain('>Save<')
    expect(heart).toContain('listingHeartClass')
    expect(heart).toContain('HeartIcon')
    expect(heart).toContain('Save listing')
    expect(listingHeartClass).toContain('h-10')
    expect(listingHeartClass).toContain('rounded-full')
    expect(listingHeartClass).toContain('right-4')
    expect(listingHeartClass).toContain('top-4')
  })
})
