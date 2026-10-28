import { describe, expect, it } from 'vitest'

import { hasBody } from '@/lib/bodyText'
import { firstResponse } from '@/lib/pageResponse'
import { seededPagesMatchPublicSlugs, publicPageSeeds } from '@/lib/publicPageSeed'

describe('seeded public pages', () => {
  it('seeds About, Services, Contact, Scholarship, and Steps', () => {
    expect(seededPagesMatchPublicSlugs()).toBe(true)
    expect(publicPageSeeds.map((page) => page.slug)).toEqual([
      'about',
      'services',
      'contact',
      'scholarship',
      'steps',
    ])
  })

  it('gives each page a title, an H1, and a body', () => {
    for (const page of publicPageSeeds) {
      expect(page.status).toBe('published')
      expect(page.pageTitle?.trim().length).toBeGreaterThan(0)
      expect(page.h1?.trim().length).toBeGreaterThan(0)
      expect(hasBody(page.content)).toBe(true)
      expect(page.canonicalUrl).toBe(`/${page.slug}`)
      expect(page.robots).toBe('index')
      const response = firstResponse(page)
      expect(response.title).toBe(page.pageTitle)
      expect(response.h1).toBe(page.h1)
      expect(response.body.length).toBeGreaterThan(0)
    }
  })
})
