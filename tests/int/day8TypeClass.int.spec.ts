import { describe, expect, it } from 'vitest'

import { desktopHeadingClass, listingHeadingClass, phoneHeadingClass } from '@/lib/listingType'

describe('listing type', () => {
  it('uses 28px on a phone and 40px on desktop', () => {
    expect(phoneHeadingClass).toBe('text-[28px] leading-8')
    expect(desktopHeadingClass).toBe('xl:text-[40px] xl:leading-[48px]')
    expect(listingHeadingClass).toContain(phoneHeadingClass)
    expect(listingHeadingClass).toContain(desktopHeadingClass)
  })
})
