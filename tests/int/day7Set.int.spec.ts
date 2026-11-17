import { describe, expect, it } from 'vitest'

import { reviewListingSlugs } from '@/lib/reviewSet'

describe('review set', () => {
  it('names the six sample listings', () => {
    expect(reviewListingSlugs).toEqual([
      '201-n-brand',
      '450-n-brand',
      '260-s-los-robles',
      '1000-e-walnut',
      '700-s-flower',
      '1313-ocean',
    ])
  })
})