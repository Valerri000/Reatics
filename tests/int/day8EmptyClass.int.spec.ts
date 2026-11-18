import { describe, expect, it } from 'vitest'

import { emptySearchMessage } from '@/lib/emptySearch'

describe('empty search message', () => {
  it('names the empty state and the result count', () => {
    expect(emptySearchMessage(0)).toBe('No listings yet.')
    expect(emptySearchMessage(2)).toBe('2 listings')
  })
})
