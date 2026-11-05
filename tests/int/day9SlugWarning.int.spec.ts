import { describe, expect, it } from 'vitest'

import { citySlugWarning } from '@/lib/contentManagerPass'

describe('duplicate city URL', () => {
  it('warns when the city slug is already used by a page', () => {
    expect(citySlugWarning()).toBe('This URL is already used by a page.')
  })
})
