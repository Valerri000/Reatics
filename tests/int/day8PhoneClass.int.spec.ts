import { describe, expect, it } from 'vitest'

import { listingPhonePx, listingPhoneSize } from '@/lib/listingPhone'

describe('listing phone treatment', () => {
  it('uses the 21px style-board size', () => {
    expect(listingPhonePx).toBe(21)
    expect(listingPhoneSize).toBe('footer')
  })
})
