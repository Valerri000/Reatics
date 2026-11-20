import { describe, expect, it } from 'vitest'

import { openFromCard } from '@/lib/reviewClicks'

describe('listing card', () => {
  it('opens the listing page', () => {
    expect(openFromCard('201-n-brand')).toBe('/listings/201-n-brand')
  })
})
