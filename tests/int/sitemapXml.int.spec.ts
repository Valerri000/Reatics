import { describe, expect, it } from 'vitest'

import { phaseBHost } from '@/lib/phaseB'
import { sitemapDocument, sitemapOrigin } from '@/lib/sitemapXml'

describe('sitemap document', () => {
  it('writes the address list', () => {
    const origin = sitemapOrigin(undefined, phaseBHost)
    const xml = sitemapDocument([`${origin}/about`, `${origin}/blog/how-to-read-a-listing`])
    expect(origin).toBe('https://18.118.84.127')
    expect(sitemapOrigin('https://18.118.84.127/', phaseBHost)).toBe('https://18.118.84.127')
    expect(xml).toContain('<loc>https://18.118.84.127/about</loc>')
    expect(xml).toContain('<loc>https://18.118.84.127/blog/how-to-read-a-listing</loc>')
    expect(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>')).toBe(true)
  })
})
