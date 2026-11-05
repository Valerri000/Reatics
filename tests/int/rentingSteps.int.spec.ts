import { describe, expect, it } from 'vitest'

import { rentingSteps } from '@/lib/rentingSteps'

describe('renting steps', () => {
  it('keeps the five steps from the homepage', () => {
    expect(rentingSteps.map((step) => step.title)).toEqual([
      'Budget',
      'Location',
      'Properties',
      'Letter of intent',
      'Lease',
    ])
    expect(rentingSteps[0].text).toContain('common area maintenance')
    expect(rentingSteps[4].text).toContain('legal team')
  })
})
