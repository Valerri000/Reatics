import { describe, expect, it } from 'vitest'

import { homepageCopy, homepageHeadline, homepageSeed } from '@/lib/homePageCopy'

describe('homepage copy', () => {
  it('reads the title and description saved in the admin', () => {
    expect(homepageSeed.slug).toBe('home')
    expect(homepageSeed.status).toBe('draft')
    expect(homepageSeed.sitemap).toBe(false)
    expect(
      homepageCopy({
        h1: 'A new headline',
        pageTitle: 'Reatics search',
        metaDescription: 'Find a workplace.',
      }),
    ).toEqual({
      headline: 'A new headline',
      title: 'Reatics search',
      description: 'Find a workplace.',
    })
    expect(homepageCopy(null).headline).toBe(homepageHeadline)
  })
})
