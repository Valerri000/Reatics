import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

import { listingAccountFields } from '@/lib/listingAccount'

describe('listing account', () => {
  it('reads the subscription status from the account linked to the listing', () => {
    expect(listingAccountFields(4)).toEqual({ subscriptionStatus: null, verified: null })
    expect(listingAccountFields({ subscriptionStatus: 'canceled', verified: true })).toEqual({
      subscriptionStatus: 'canceled',
      verified: true,
    })
    const places = readFileSync('src/lib/loadPlaces.ts', 'utf8')
    const sitemap = readFileSync('src/lib/loadSitemap.ts', 'utf8')
    const home = readFileSync('src/lib/loadHome.ts', 'utf8')
    const page = readFileSync('src/app/(frontend)/listings/[slug]/page.tsx', 'utf8')
    expect(places).toContain('listingAccountFields')
    expect(places).toContain('listingOnMap')
    expect(sitemap).toContain('listingAccountFields')
    expect(home).toContain('listingAccountFields')
    expect(page).toContain('listingAccountFields')
    expect(page).toContain('publicListing')
  })
})
