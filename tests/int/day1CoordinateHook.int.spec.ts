import { describe, expect, it } from 'vitest'

import { Listings } from '@/collections/Listings'

describe('listing save hook', () => {
  it('runs before the listing is saved', () => {
    const hooks = Listings.hooks?.beforeChange
    expect(hooks?.length).toBe(1)
    const saved = hooks?.[0]?.({
      data: { street: '201 N Brand Blvd', city: 'Glendale' },
    } as unknown as Parameters<NonNullable<typeof hooks>[number]>[0])
    expect(saved).toMatchObject({ latitude: 34.1478, longitude: -118.2551 })
  })
})
