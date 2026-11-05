import { describe, expect, it } from 'vitest'

import { cityListedWhenChecked, citySitemapPath } from '@/lib/contentManagerPass'

describe('city sitemap checkbox', () => {
  it('adds the city when the box is checked', () => {
    expect(cityListedWhenChecked(true)).toBe(true)
    expect(citySitemapPath(true)).toBe('/glendale')
  })

  it('removes the city when the box is cleared', () => {
    expect(cityListedWhenChecked(false)).toBe(false)
    expect(citySitemapPath(false)).toBeNull()
  })
})
