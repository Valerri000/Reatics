import { describe, expect, it } from 'vitest'

import { phaseBOpenItems } from '@/lib/phaseBClose'

describe('phase B open items', () => {
  it('keeps Terms, Privacy, the manager name, GitHub, and contact email open', () => {
    expect(phaseBOpenItems.map((item) => item.id)).toEqual([
      'terms',
      'privacy',
      'content-manager',
      'github',
      'contact-email',
    ])
    expect(phaseBOpenItems.find((item) => item.id === 'terms')?.label).toContain('unpublished and noindex')
    expect(phaseBOpenItems.find((item) => item.id === 'privacy')?.label).toContain('unpublished and noindex')
    expect(phaseBOpenItems.find((item) => item.id === 'contact-email')?.label).toContain('not connected')
  })
})
