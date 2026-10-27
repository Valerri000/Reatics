import { describe, expect, it } from 'vitest'

import { homepageSearchIsField, homepageSections, homepageWidths, searchFields } from '@/lib/homepageLock'

describe('homepage lock', () => {
  it('covers desktop, tablet, and phone', () => {
    expect(homepageWidths.map((item) => item.width)).toEqual([1920, 768, 320])
  })

  it('keeps the search entry as fields', () => {
    expect(homepageSearchIsField()).toBe(true)
    expect(searchFields).toEqual(['place', 'kind', 'use'])
    expect(homepageSections.map((section) => section.id)).not.toContain('map')
  })

  it('marks the lines that come from the admin', () => {
    const admin = homepageSections.filter((section) => section.source === 'admin').map((section) => section.id)
    const template = homepageSections
      .filter((section) => section.source === 'template')
      .map((section) => section.id)
    expect(admin).toEqual(['hero', 'featured', 'about', 'services', 'steps', 'blog', 'areas'])
    expect(template).toEqual(['header', 'search', 'signup', 'contact', 'footer'])
  })
})
