import { describe, expect, it } from 'vitest'

import { phaseBPages, stagingOrigin } from '@/lib/phaseBClose'

describe('phase B pages', () => {
  it('names the pages for the Friday review', () => {
    expect(stagingOrigin).toBe('https://18.118.84.127')
    expect(phaseBPages.map((page) => page.path)).toEqual([
      '/',
      '/about',
      '/services',
      '/contact',
      '/scholarship',
      '/steps',
      '/blog',
      '/glossary',
      '/glendale',
      '/office',
    ])
  })
})
