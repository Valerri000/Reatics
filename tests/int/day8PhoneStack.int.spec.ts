import { describe, expect, it } from 'vitest'

import { desktopWidth, phoneWidth, stacksOnPhone, stacksOnTablet, tabletWidth } from '@/lib/phoneStack'

describe('phone stack widths', () => {
  it('stacks results on a phone and a tablet', () => {
    expect(phoneWidth).toBe(320)
    expect(tabletWidth).toBe(768)
    expect(desktopWidth).toBe(1920)
    expect(stacksOnPhone(320)).toBe(true)
    expect(stacksOnPhone(768)).toBe(false)
    expect(stacksOnTablet(768)).toBe(true)
    expect(stacksOnTablet(1920)).toBe(false)
  })
})
