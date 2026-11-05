import { describe, expect, it } from 'vitest'

import { canEditMarketing } from '@/lib/roles'
import { contentManager, contentManagerEmail, day9Clicks } from '@/lib/contentManagerPass'

describe('content manager pass', () => {
  it('signs in the content manager and opens the review pages', () => {
    const account = contentManager()
    expect(account?.email).toBe(contentManagerEmail)
    expect(canEditMarketing({ adminRole: account?.adminRole })).toBe(true)
    expect(day9Clicks.map((item) => item.href)).toEqual([
      '/',
      '/about',
      '/blog',
      '/glossary',
      '/glendale',
      '/office',
      '/steps',
      '/scholarship',
    ])
  })
})
