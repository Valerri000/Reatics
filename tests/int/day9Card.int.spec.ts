import { describe, expect, it } from 'vitest'

import { openFromCard } from '@/lib/reviewClicks'

describe('open a listing from a card', () => {
  it('uses the listing URL', () => {
    expect(openFromCard('201-n-brand')).toBe('/listings/201-n-brand')
  })
})
