import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const note = readFileSync('docs/phase-c-day-4.md', 'utf8')

describe('November 12 map filters', () => {
  it('records the launch filters and the drawn area', () => {
    expect(note).toContain('Thursday, November 12')
    expect(note).toContain('sale, lease, or coworking')
    expect(note).toContain('state, city, county, or ZIP')
    expect(note).toContain('1–2')
    expect(note).toContain('Lot size, cap rate, year built, units, and listing ID')
    expect(note).toContain('does not reload the map')
  })
})
