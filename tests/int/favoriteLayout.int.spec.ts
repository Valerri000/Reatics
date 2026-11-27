import { describe, expect, it } from 'vitest'

import { favoriteLayout } from '@/lib/favoriteLayout'

describe('favorite layout', () => {
  it('stacks favorites on a phone and uses two columns on a desktop', () => {
    expect(favoriteLayout.phone).toContain('grid-cols-1')
    expect(favoriteLayout.desktop).toContain('md:grid-cols-2')
    expect(favoriteLayout.frame).toContain('px-inset-phone')
  })
})
