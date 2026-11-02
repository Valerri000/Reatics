import { describe, expect, it } from 'vitest'

import {
  footerAreaLinks,
  footerLinks,
  headerLinks,
  headerUtilityLinks,
  offRouteLinks,
} from '@/lib/siteLinks'

describe('header and footer routes', () => {
  it('points every header and footer link at a live route', () => {
    expect(offRouteLinks(headerLinks)).toEqual([])
    expect(offRouteLinks(headerUtilityLinks)).toEqual([])
    expect(offRouteLinks(footerLinks)).toEqual([])
    expect(offRouteLinks(footerAreaLinks)).toEqual([])
    expect(headerUtilityLinks[0]).toEqual({ href: '/brokers', label: 'Find a broker' })
    expect(footerLinks.find((link) => link.href === '/about')?.label).toBe('About us')
    expect(headerLinks.find((link) => link.href === '/about')?.label).toBe('About Us')
  })
})
