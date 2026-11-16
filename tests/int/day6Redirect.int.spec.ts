import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

import { listingSlugRedirect } from '@/lib/listingRedirect'
import { skipRedirectLookup } from '@/lib/publicRedirect'

describe('listing slug redirect', () => {
  it('answers a changed listing slug with a 301', () => {
    expect(skipRedirectLookup('/listings/brand-glendale')).toBe(false)
    expect(listingSlugRedirect('brand-glendale', '201-n-brand')).toEqual({
      toPath: '/listings/201-n-brand',
      statusCode: 301,
    })
    const proxy = readFileSync('src/proxy.ts', 'utf8')
    expect(proxy).toContain('loadPublicRedirect')
    expect(proxy).toContain('NextResponse.redirect')
  })
})
