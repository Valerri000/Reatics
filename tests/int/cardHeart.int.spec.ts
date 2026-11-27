import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

describe('card heart', () => {
  it('saves a listing from the heart on the card', () => {
    const featured = readFileSync('src/components/home/FeaturedListings.tsx', 'utf8')
    const grid = readFileSync('src/components/market/ResultGrid.tsx', 'utf8')
    const place = readFileSync('src/components/place/PlaceCards.tsx', 'utf8')
    const hubs = readFileSync('src/components/market/CoworkingHubs.tsx', 'utf8')
    expect(featured).toContain('saveHeart')
    expect(featured).not.toContain('onSave={auth.user ? undefined : auth.openSignIn}')
    expect(grid).toContain('SavedListingCard')
    expect(place).toContain('SavedListingCard')
    expect(hubs).toContain('saveHeart')
  })
})
