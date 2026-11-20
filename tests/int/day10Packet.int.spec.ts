import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const note = readFileSync('docs/phase-c-day-10-packet.md', 'utf8')

describe('day 10 packet', () => {
  it('sends the staging link and the click list', () => {
    expect(note).toContain('https://18.118.84.127')
    expect(note).toContain('Review-day9-shell')
    expect(note).toContain('staging-owner@example.com')
    expect(note).toContain('/map')
    expect(note).toContain('/listings/201-n-brand')
    expect(note).toContain('/map?city=Glendale')
    expect(note).toContain('/map?type=Office')
    expect(note).toContain('1-888-518-9168')
    expect(note).toContain('docs/phase-c-day-10-walk.md')
  })
})
