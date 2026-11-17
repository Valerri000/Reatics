import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

import { launchMapCharges, mapQuoteStatus } from '@/lib/mapQuote'

const note = readFileSync('docs/phase-c-day-7-mapbox.md', 'utf8')

describe('Mapbox launch charges', () => {
  it('keeps the scope planning range while the quote is pending', () => {
    expect(mapQuoteStatus).toBe('pending')
    expect(note).toContain(launchMapCharges.early)
    expect(note).toContain(launchMapCharges.busy)
    expect(note).toContain('planning range in the scope stays the note until that quote')
    expect(note).toContain('Tuesday, November 17')
    expect(note).not.toContain('pk.')
  })
})
