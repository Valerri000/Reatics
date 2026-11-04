import { describe, expect, it } from 'vitest'

import { cityAreaLinks } from '@/lib/homeAreas'

describe('homepage area links', () => {
  it('points a published city at its record', () => {
    expect(
      cityAreaLinks([
        { title: 'Glendale', slug: 'glendale', status: 'published' },
        { title: 'Pasadena', slug: 'pasadena', status: 'draft' },
        { title: ' ', slug: 'blank', status: 'published' },
      ]),
    ).toEqual([{ href: '/glendale', label: 'Glendale' }])
  })
})
