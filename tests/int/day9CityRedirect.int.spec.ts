import { describe, expect, it } from 'vitest'

import { citySlugRedirect } from '@/lib/contentManagerPass'

describe('city slug change', () => {
  it('stores a 301 from the old city address to the new one', () => {
    expect(citySlugRedirect('glendale', 'glendale-ca')).toEqual({
      fromPath: '/glendale',
      toPath: '/glendale-ca',
      statusCode: 301,
    })
  })

  it('does not store a redirect when the slug stays the same', () => {
    expect(citySlugRedirect('glendale', 'glendale')).toBeNull()
  })
})
