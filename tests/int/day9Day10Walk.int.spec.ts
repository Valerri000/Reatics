import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const note = readFileSync('docs/phase-c-day-9-walkthrough.md', 'utf8')

describe('day 10 walkthrough', () => {
  it('walks the map, a listing, Glendale, and Office', () => {
    expect(note).toContain('Thursday, November 19')
    expect(note).toContain('https://18.118.84.127')
    expect(note).toContain('Review-day9-shell')
    expect(note).toContain('/map')
    expect(note).toContain('No listings yet.')
    expect(note).toContain('/listings/201-n-brand')
    expect(note).toContain('1-888-518-9168')
    expect(note).toContain('/glendale')
    expect(note).toContain('/map?city=Glendale')
    expect(note).toContain('/office')
    expect(note).toContain('/map?type=Office')
  })
})
