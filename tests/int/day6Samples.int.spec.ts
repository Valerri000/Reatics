import { describe, expect, it } from 'vitest'

import { designSampleRecords, designSamplesIndexed } from '@/lib/featuredSamples'

describe('design samples', () => {
  it('keeps the design samples off the listing index', () => {
    expect(designSampleRecords).toEqual([])
    expect(designSamplesIndexed()).toBe(false)
  })
})
