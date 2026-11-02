import { describe, expect, it } from 'vitest'

import { legalFrames, legalWidths, missingPageLine } from '@/lib/legalFrames'

describe('legal frames', () => {
  it('keeps Terms, Privacy, and the missing page at desktop and phone', () => {
    expect(legalWidths.map((item) => item.width)).toEqual([1920, 320])
    expect(legalFrames.map((frame) => frame.id)).toEqual(['terms', 'privacy', 'missing'])
    expect(missingPageLine).toBe('This page is missing.')
  })
})
